---
title: "How finAPI is Integrated in Aetherios Property Management (Bridge Article)"
source: internal - aetherios-property-management codebase
date: 2026-04-11
type: other
tier: 1
---

# finAPI Integration in Aetherios: Protocol → Code Map

This article bridges the finAPI protocol (external docs) with the actual implementation in the Aetherios codebase. Every step of the finAPI Web Form 2.0 standalone payment flow is mapped to the exact file and function that implements it.

---

## Why finAPI in Aetherios

Aetherios is a property management SaaS. Property managers need to pay contractors (plumbers, electricians, etc.) for work orders. These are outbound SEPA payouts from the property manager's bank account to the contractor's IBAN.

Rather than building banking integrations from scratch, Aetherios uses finAPI as a BaFin-licensed PIS provider. This means:
- Aetherios itself doesn't need a PSD2 license
- The bank authentication (SCA) is handled entirely inside the finAPI Web Form 2.0
- Aetherios just redirects the operator to the web form URL, then polls status

---

## The Protocol Flow (finAPI Docs → Our Code)

### Step 1: Store finAPI config for the tenant

**Protocol requirement**: You need `client_id`, `client_secret`, and a provisioned Access User (id + password).

**Our implementation**:
- UI: `frontend/src/components/settings/PaymentProcessorSettings.jsx`
  - Operator enters client_id, client_secret, sandbox/live URL, sender IBAN, mock vs real
- API: `backend/admin_platform/admin/api/payment_processor_setup.py`
  - `POST /admin/payment-processor/setup` — saves config
- Service: `backend/services/payment_processor_config_service.py`
  - `create_or_update_finapi_config()` — on real mode, calls `FinapiService.provision_access_user()` to create the finAPI Access user and stores credentials encrypted
- DB: `payment_processor_config` table — encrypted_credentials column stores client_id, client_secret, access_user_id, access_user_password, sender_iban

---

### Step 2: Load config at request time (Dependency Injection)

**Protocol requirement**: Every API call needs either a client token or user token.

**Our implementation**:
- `backend/utils/dependencies.py` → `_build_finapi_service_for_client()`
  - Reads `payment_processor_config` for the current tenant
  - Decrypts credentials
  - Instantiates `FinapiService(client_id=..., client_secret=..., access_user_id=..., ...)`
  - `FinapiService` caches tokens in memory (60s safety margin before expiry)

Token hierarchy in `FinapiService`:
- `_ensure_client_access_token()` → `POST /oauth/token` with `grant_type=client_credentials`
- `_ensure_user_access_token()` → `POST /oauth/token` with `grant_type=password` + access user creds

---

### Step 3: Operator initiates a payout from invoice detail page

**Protocol requirement**: `POST /api/webForms/standalonePayment` with user access token

**Our implementation**:
- UI: `frontend/src/components/invoices/InvoiceDetailPage.jsx`
  - Operator clicks "Pay via finAPI" → hits backend
- API: `backend/api/v1/invoice_zugferd.py`
  - `POST /api/v1/invoices/{id}/payout` — calls `payment_processor_service.dispatch_finapi_payout()`
- Service: `backend/services/core/payment_processor_service.py`
  - Calls `FinapiService.create_payment(amount, currency, recipient_iban, recipient_name, reference, idempotency_key)`
- Adapter: `backend/services/payments/finapi_service.py` → `_real_create_payment()`
  - Calls `GET webform-sandbox.finapi.io/api/webForms/standalonePayment` with user token
  - Payload includes: `orders[].recipient.iban`, `orders[].amount.value`, `orders[].purpose`, `sender.iban`, `executionDate`
  - Response: `{ id, url, status: "NOT_YET_OPENED", payload: { paymentId: null } }`
  - Returns: `{ requires_user_action: true, authorization_url: <webform URL>, web_form_id: ... }`
- DB: Creates `payments` row with `payment_processor="finapi"`, status="processing", stores `web_form_id`

---

### Step 4: Operator completes bank auth on finAPI Web Form

**Protocol requirement**: Direct user to `url` from Step 3. User logs into their bank, authorizes payment. Web Form handles all SCA.

**Our implementation**:
- UI: `InvoiceDetailPage.jsx`
  - Opens `authorization_url` in new tab (appended with `returnUrl` pointing back to invoice page)
  - Starts polling `GET /api/v1/payments/finapi/{payment_id}/status` every 3 seconds
  - Shows "Waiting for bank authorization..." state

Web form return flow:
- finAPI web form redirects to `returnUrl` after completion
- User lands back on invoice page
- UI detects return and continues status polling until terminal state

---

### Step 5: Check Web Form status

**Protocol requirement**: `GET /api/webForms/{id}` with user access token to get `paymentId` from `payload`

**Our implementation**:
- API: `backend/api/v1/payments.py`
  - `GET /api/v1/payments/finapi/{payment_id}/status`
  - Also: `POST /api/v1/payments/finapi/callback` for finAPI server callbacks
- Adapter: `FinapiService.get_web_form_status(web_form_id)`
  - Calls `GET {webform_base}/api/webForms/{id}` with user token
  - Returns: `{ web_form_id, status, payment_id }` (payment_id populated once COMPLETED)

---

### Step 6: Check payment initiation status

**Protocol requirement**: `GET /payments?ids=$paymentId` with user access token

**Our implementation**:
- Adapter: `FinapiService.get_payment_status(provider_payment_id)`
  - Calls `GET {api_base_url}/payments?ids={provider_payment_id}` with user token
  - Maps finAPI statuses to internal statuses:
    - `SUCCESSFUL`, `EXECUTED` → `"completed"`
    - `INITIATED`, `PENDING`, `RCVD`, `PDNG` → `"processing"`
    - `UNSUCCESSFUL`, `ABORTED`, `EXPIRED` → `"failed"`
- Updates `payments` row status in DB

---

## Mock Mode

For development/testing, `mock_mode=True` bypasses all real HTTP calls:
- `_mock_create_payment()` — returns deterministic mock id based on sha256 of idempotency_key
- `_mock_get_payment_status()` — always returns EXECUTED/completed
- `get_web_form_status()` in mock — always returns COMPLETED

Mock mode is set via `PaymentProcessorConfig.mode != "live"` or the `mock_mode` flag in encrypted_credentials.

---

## Callback Flow (Alternative to Polling)

**Protocol**: finAPI POSTs to `callbacks.finalised` URL when web form completes

**Our implementation**:
- `FinapiService.build_callback_url(payment_id)` — constructs `{callback_base_url}?payment_id=...&token=HMAC`
- `FinapiService.verify_callback_token()` — validates HMAC to prevent forged callbacks
- `POST /api/v1/payments/finapi/callback` — receives finAPI POST, verifies token, calls `_parse_callback_event()`
- Normalises web form or payment callbacks into unified structure

---

## File Map Summary

| Protocol Step | File | Function |
|---|---|---|
| Config storage | `admin/api/payment_processor_setup.py` | `create_finapi_config` |
| Access user provision | `services/payments/finapi_service.py` | `provision_access_user()` |
| Config loading (DI) | `utils/dependencies.py` | `_build_finapi_service_for_client()` |
| Client token | `finapi_service.py` | `_ensure_client_access_token()` |
| User token | `finapi_service.py` | `_ensure_user_access_token()` |
| Initiate payment | `finapi_service.py` | `_real_create_payment()` |
| Payout dispatch | `services/core/payment_processor_service.py` | `dispatch_finapi_payout()` |
| Payout endpoint | `api/v1/invoice_zugferd.py` | `POST /invoices/{id}/payout` |
| Status polling | `finapi_service.py` | `get_web_form_status()`, `get_payment_status()` |
| Status endpoint | `api/v1/payments.py` | `GET /payments/finapi/{id}/status` |
| Callback handler | `api/v1/payments.py` | `POST /payments/finapi/callback` |
| UI launch flow | `components/invoices/InvoiceDetailPage.jsx` | payout section |
| UI config form | `components/settings/PaymentProcessorSettings.jsx` | finAPI config section |

---

## Key Architectural Decisions

1. **Web Form 2.0 not licensed flow** — Aetherios uses finAPI's license, not its own. This avoids needing a BaFin PSD2 license for the product itself.

2. **Access User per tenant** — Each tenant (SaaS client) gets their own finAPI access user provisioned at config-save time. This isolates payment context per client.

3. **Token caching in service instance** — Tokens are cached in `FinapiService` instance memory with a 60s safety margin. The service instance is rebuilt per-request from DI, so token cache lifetime is request-scoped unless the same instance is reused.

4. **Sender IBAN in payload** — Including `sender.iban` in the standalone payment request avoids the user needing to select their bank on the web form, reducing SCA friction.

5. **HMAC callback tokens** — App-side callback authentication prevents finAPI callback spoofing.
