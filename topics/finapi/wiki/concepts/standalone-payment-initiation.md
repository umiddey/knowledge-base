# Standalone Payment Initiation

A standalone payment in finAPI terminology is a SEPA payment initiated **without a pre-imported bank connection** in the system. The user authenticates and authorizes the payment through the Web Form in one flow, rather than having their bank account already linked in finAPI's account data store. This is the recommended pattern for payment-only use cases (like contractor payouts) where you don't need persistent account data — it's simpler, has less regulatory surface area, and doesn't require storing bank connections.

The flow has 5 steps: create the web form → user authenticates at their bank → check web form status to get the `paymentId` → check payment initiation status with the `paymentId` → optionally delete the Access User. The first step requires a **user access token**. The payment result is only accessible after the web form completes — you can't query payment status until you have a `paymentId`, and you don't get that until the web form reaches `COMPLETED`.

The "standalone" distinction matters: there is also a "from-account" payment flow (for Direct Debits or when a bank connection is already imported). Standalone payments only support SEPA Credit Transfer and SEPA Instant Credit Transfer — no standalone Direct Debit. Including the sender's IBAN in the request is strongly recommended: without it, the user must manually select their bank/IBAN on the Web Form, which can require an extra SCA challenge.

## Key Points

- **Endpoint**: `POST /api/webForms/standalonePayment` on the webform domain
- **Supported types**: SEPA Credit Transfer, SEPA Instant Credit Transfer (`"instantPayment": true`). NOT Direct Debit.
- **Sender IBAN matters**: Including `sender.iban` in the payload avoids the user selecting their bank, reducing SCA friction and the risk of multiple authentication challenges.
- **`endToEndId`**: Use the idempotency key here (max 35 chars). This is the payment reference that travels through the banking network end-to-end.
- **`purpose`**: Max 140 chars, restricted character set (a-z, A-Z, 0-9, `/ - ? : ( ) . , ' +` and space). Umlauts are bank-dependent — safer to substitute (ä→ae, etc.).
- **Execution date**: Include `executionDate` for deferred payments. Default to today if not specified.
- **`paymentId` only available after completion**: The web form response initially has `payload.paymentId: null`. Only after `status: "COMPLETED"` does `paymentId` appear.
- **Delete user optionally**: If you don't need to retain the Access User for future payments, `DELETE /users` after finalization. Saves license headcount.

## Example

Full Aetherios contractor payout flow:

```
Operator clicks "Pay via finAPI" on invoice for contractor Max Müller, 
€1,850, invoice INV-2026-0042.

BACKEND:
1. Load FinapiService from DI (reads encrypted finAPI config for tenant)
2. Ensure user token via _ensure_user_access_token()
3. POST /api/webForms/standalonePayment
   {
     "orders": [{
       "recipient": { "name": "Max Mueller", "iban": "DE89370400440532013000" },
       "amount": { "value": 1850.00, "currency": "EUR" },
       "purpose": "INV-2026-0042 Plumbing work",
       "endToEndId": "ae-payout-0042-a3f9"  ← idempotency key (max 35 chars)
     }],
     "sender": { "iban": "DE44200400600143990005" },  ← property manager's IBAN
     "executionDate": "2026-04-11",
     "instantPayment": false,
     "callbacks": { "finalised": "https://app.com/finapi/callback?payment_id=uuid&token=HMAC" }
   }
   → { "id": "c512...", "url": "https://webform-sandbox.finapi.io/wf/c512...", "status": "NOT_YET_OPENED" }

4. Store: payments row with web_form_id="c512...", status="processing"
5. Return { requires_user_action: true, authorization_url: "https://...", web_form_id: "c512..." }

FRONTEND:
6. Open authorization_url in new tab (appended with ?returnUrl=https://app.com/invoice/42)
7. User authenticates at their bank, authorizes payment
8. finAPI redirects user to returnUrl
9. Frontend polls GET /api/v1/payments/finapi/{payment_id}/status every 3 seconds

BACKEND (polling/callback):
10. GET /api/webForms/c512...  → status: "COMPLETED", payload.paymentId: 22718
11. GET /payments?ids=22718    → status: "SUCCESSFUL"
12. Update payments row: provider_payment_id=22718, status="completed"
```

## Related Concepts

- [[web-form-2-0]] — The hosted UX that handles step 3–8 of this flow
- [[payment-initiation-status]] — Interpreting the status from step 11
- [[sepa-payment-schemes]] — SCT vs SCT Inst — what "SUCCESSFUL" means differs
- [[finapi-access-user]] — The Access User whose token is used in step 2
- [[payment-data-validation]] — Rules for `purpose`, `endToEndId`, `counterpartName` fields
- [[strong-customer-authentication]] — What the user does in steps 7–8
- [[finapi-in-aetherios]] — Full code-level walkthrough of this flow

## Sources

- [[raw/articles/documentation.finapi.io-standalone-payment-webform.md]] — Official 5-step flow documentation
- [[raw/articles/documentation.finapi.io-webform-2-0-basics.md]] — Web form status lifecycle, callback setup
- [[raw/articles/documentation.finapi.io-payment-data-validation.md]] — purpose/endToEndId/counterpartName rules
- [[raw/other/aetherios-finapi-integration-bridge.md]] — Step-by-step code implementation in Aetherios
