# finAPI in Aetherios: Protocol → Code Map

This connection article maps every step of the finAPI Web Form 2.0 standalone payment protocol to the exact file and function in the Aetherios codebase. It is the bridge between understanding finAPI abstractly and understanding how it actually works in production code.

Aetherios is a multi-tenant property management SaaS. Property managers pay contractors (plumbers, electricians, etc.) for maintenance work. These are outbound SEPA payouts from the property manager's German bank account to the contractor's IBAN. finAPI is used as the BaFin-licensed PIS provider, so Aetherios itself doesn't need a payment license.

## Concepts Linked

- [[standalone-payment-initiation]]
- [[web-form-2-0]]
- [[oauth2-token-model]]
- [[finapi-access-user]]
- [[payment-initiation-status]]
- [[finapi-platform]]

## Example

**Full end-to-end: operator pays contractor €1,850**

```
STEP 0 — One-time setup (admin configures finAPI in Settings UI)
File: frontend/src/components/settings/PaymentProcessorSettings.jsx
  → Operator enters: client_id, client_secret, base_url, sender_iban, mock/real mode
  
File: backend/admin_platform/admin/api/payment_processor_setup.py
  → POST /admin/payment-processor/setup
  
File: backend/services/payment_processor_config_service.py
  → create_or_update_finapi_config(): if real mode, calls provision_access_user()
  
File: backend/services/payments/finapi_service.py → FinapiService.provision_access_user()
  → POST https://sandbox.finapi.io/api/v1/users
     { "id": "aetherios-a3f92b1c", "password": "Xk9mP..." }
  → Stores access_user_id + access_user_password encrypted in payment_processor_config
```

```
STEP 1 — Operator clicks "Pay via finAPI" on invoice detail page
File: frontend/src/components/invoices/InvoiceDetailPage.jsx
  → POST /api/v1/invoices/{invoice_id}/payout { payment_method: "finapi" }

File: backend/api/v1/invoice_zugferd.py
  → Endpoint handler → calls payment_processor_service.dispatch_finapi_payout()

File: backend/utils/dependencies.py → _build_finapi_service_for_client()
  → Reads payment_processor_config for tenant
  → Decrypts credentials
  → Returns FinapiService(client_id=..., access_user_id=..., sender_iban=..., mock_mode=False)
```

```
STEP 2 — Backend initiates Web Form
File: backend/services/payments/finapi_service.py → FinapiService._real_create_payment()
  → _ensure_user_access_token(): POST /oauth/token (password grant)
  → POST https://webform-sandbox.finapi.io/api/webForms/standalonePayment
     {
       "orders": [{ "recipient": { "name": "Max Mueller", "iban": "DE89..." },
                    "amount": { "value": 1850.00, "currency": "EUR" },
                    "purpose": "INV-2026-0042 plumbing work",   ← max 140 chars
                    "endToEndId": "ae-payout-0042-a3f9" }],     ← max 35 chars
       "sender": { "iban": "DE44..." },
       "executionDate": "2026-04-11",
       "instantPayment": false,
       "callbacks": { "finalised": "https://app.com/finapi/callback?payment_id=uuid&token=HMAC" }
     }
  → Returns { "id": "c512b6b7-...", "url": "https://webform-sandbox.finapi.io/wf/c512...",
               "status": "NOT_YET_OPENED", "payload": { "paymentId": null } }
  → Normalises to { requires_user_action: true, authorization_url: "...", web_form_id: "c512..." }

File: backend/services/core/payment_processor_service.py
  → Persists payments row: payment_processor="finapi", status="processing", web_form_id="c512..."
```

```
STEP 3 — Frontend launches bank auth
File: frontend/src/components/invoices/InvoiceDetailPage.jsx
  → Opens authorization_url in new tab (append ?returnUrl=https://app.com/invoice/42)
  → Shows "Waiting for bank authorization..." with spinner
  → Starts polling GET /api/v1/payments/finapi/{payment_id}/status every 3 seconds
  
User: logs into bank, authorizes payment via SCA (PIN + TAN/push notification)
finAPI: handles all Redirect/Embedded/Decoupled SCA internally
finAPI: redirects user to returnUrl on completion
```

```
STEP 4 — Status resolution (polling path)
File: backend/api/v1/payments.py
  → GET /api/v1/payments/finapi/{payment_id}/status

File: backend/services/payments/finapi_service.py → FinapiService.get_web_form_status()
  → GET https://webform-sandbox.finapi.io/api/webForms/c512b6b7-...
     Authorization: Bearer <user_token>
  → Returns { status: "COMPLETED", payload: { paymentId: 22718 } }

File: backend/services/payments/finapi_service.py → FinapiService.get_payment_status(22718)
  → GET https://sandbox.finapi.io/payments?ids=22718
  → Returns { status: "SUCCESSFUL" } → mapped to "completed"

File: backend/services/core/payment_processor_service.py
  → Updates payments row: provider_payment_id=22718, status="completed"

Frontend: polling detects "completed" → shows success, updates invoice status
```

```
STEP 4 (alt) — Callback path
finAPI: POST https://app.com/finapi/callback?payment_id=uuid&token=HMAC
  { "webFormId": "c512...", "status": "COMPLETED" }

File: backend/api/v1/payments.py
  → POST /api/v1/payments/finapi/callback

File: backend/services/payments/finapi_service.py
  → verify_callback_token(payment_id, token): HMAC-SHA256 verification
  → _parse_callback_event(): normalises web form or payment callback
  → Updates payments row status
```

## Analysis

**Key architectural decisions in Aetherios' finAPI integration**:

1. **Web Form 2.0, not licensed direct API**: Aetherios uses finAPI's BaFin license. No need for Aetherios to hold its own PSD2 registration.

2. **One Access User per tenant**: Each SaaS client (property management company) gets their own finAPI access user provisioned at config-save time. Credentials are stored encrypted in `payment_processor_config`. This isolates payment context per tenant.

3. **Token caching in service instance**: `FinapiService` caches both client and user tokens in-memory with 60s safety margin before TTL. Since the service instance is rebuilt per-request from DI, the cache is effectively request-scoped (though the same instance could be reused across requests if the DI layer caches it — check `dependencies.py` for scope details).

4. **Sender IBAN in payload**: Including `sender.iban` pre-selects the property manager's bank account in the web form, avoiding an extra SCA challenge from the user having to select their bank.

5. **HMAC callback tokens**: `build_callback_url()` includes an HMAC-SHA256 signature of `payment_id` using `callback_secret`. `verify_callback_token()` validates it. This prevents forged finAPI callbacks — an attacker who knows your callback URL can't fake a payment completion without knowing the secret.

6. **Mock mode**: `mock_mode=True` bypasses all real HTTP calls. Mock `create_payment()` returns a deterministic ID based on sha256 of the idempotency key. Mock `get_payment_status()` always returns EXECUTED/completed. Used for local dev and E2E tests.
