# Web Form 2.0

Web Form 2.0 is finAPI's hosted bank authentication interface — a browser-based UI served from finAPI's own domain that handles the full SCA interaction between the end-user and their bank. From the integrating application's perspective, it's a redirect-and-poll pattern: you call a finAPI API to create a web form, get back a URL, send the user there, and wait for completion. The web form handles everything in between — bank selection, credential entry, TAN/push notification authorization — without the application ever touching banking credentials.

The architecture exists for a specific regulatory reason: under PSD2/ZAG in Germany, companies without their own AIS/PIS license are legally prohibited from handling bank credentials. By routing SCA through finAPI's domain, the application stays on the correct side of the regulatory line. Web Form 2.0 replaced the legacy PSD2 Web Form (v1), which used HTTP 451 error responses to trigger the form; the new version uses explicit endpoint calls and a dedicated `webform.finapi.io` domain.

A web form instance is a one-time, 20-minute token. The URL can only be opened once — a second attempt shows an error page. If the user doesn't complete it within 20 minutes, the form expires (`EXPIRED` status). The application must either poll for status or register a `callbackUrl` to receive a POST notification on completion. The form supports German, English, Czech, and Slovak; language defaults from browser headers but the user can switch.

## Key Points

- **Endpoint**: `POST /api/webForms/standalonePayment` on the webform domain (`webform-sandbox.finapi.io` or `webform-live.finapi.io`)
- **Response**: `{ id, url, status: "NOT_YET_OPENED", expiresAt, type: "STANDALONE_PAYMENT", payload: { paymentId: null } }`
- **One-time token**: URL can only be opened once. Attempting to open it again shows an error.
- **20-minute expiry**: Form must be completed within 20 minutes of creation or it expires.
- **Status lifecycle**: `NOT_YET_OPENED` → `IN_PROGRESS` → `COMPLETED` | `COMPLETED_WITH_ERROR` | `ABORTED` | `EXPIRED`
- **`paymentId` availability**: Only populated in `payload` after status reaches `COMPLETED`. This is the id needed for payment status lookups in the Access API.
- **User token required**: All web form operations (create, status check) require the user access token, not the client token.
- **Embedding**: Web Form 2.0 CAN be embedded in an iFrame (unlike the legacy v1 form which the German regulator prohibited from iFrame use). Also supports redirect mode.
- **Callback vs polling**: Set `callbacks.finalised` in the payment payload for server push on completion. Without a callback, poll `GET /api/webForms/{id}` every few seconds.

## Example

Creating and monitoring a standalone payment web form:

```
1. CREATE WEB FORM
POST https://webform-sandbox.finapi.io/api/webForms/standalonePayment
Authorization: Bearer <user_token>
{
  "orders": [{ "recipient": { "name": "Max Müller", "iban": "DE89..." },
               "amount": { "value": 1850.00, "currency": "EUR" },
               "purpose": "Invoice INV-2026-0042" }],
  "sender": { "iban": "DE44..." },
  "executionDate": "2026-04-11",
  "callbacks": { "finalised": "https://yourapp.com/finapi/callback?payment_id=abc123&token=HMAC" }
}

Response 201:
{
  "id": "c512b6b7-259d-451e-8eec-0ae4ed993c6f",
  "url": "https://webform-sandbox.finapi.io/wf/c512b6b7-...",
  "status": "NOT_YET_OPENED",
  "payload": { "paymentId": null }
}

2. REDIRECT USER to the url

3a. CALLBACK fires (if callbackUrl set):
POST https://yourapp.com/finapi/callback?payment_id=abc123&token=HMAC

3b. OR POLL:
GET https://webform-sandbox.finapi.io/api/webForms/c512b6b7-...
Authorization: Bearer <user_token>
→ { "status": "COMPLETED", "payload": { "paymentId": 22718 } }

4. LOOK UP PAYMENT STATUS with paymentId=22718:
GET https://sandbox.finapi.io/payments?ids=22718
→ { "status": "SUCCESSFUL", ... }
```

## Related Concepts

- [[standalone-payment-initiation]] — The full flow that uses Web Form 2.0
- [[oauth2-token-model]] — User token required for all web form calls
- [[strong-customer-authentication]] — What the web form handles on your behalf
- [[psd2-open-banking]] — The regulatory reason Web Form 2.0 exists
- [[licensed-vs-unlicensed-tpp]] — Web Form 2.0 is for unlicensed customers; licensed TPPs can bypass it
- [[finapi-access-user]] — The Access User whose token authorizes Web Form creation
- [[payment-initiation-status]] — What to do after getting the paymentId from web form payload

## Sources

- [[raw/articles/documentation.finapi.io-webform-2-0-basics.md]] — Status lifecycle, one-time token, 20-min expiry, callback vs polling
- [[raw/articles/documentation.finapi.io-standalone-payment-webform.md]] — 5-step flow: create → user auth → check web form → check payment → optional delete
- [[raw/articles/finapi.zendesk.com-psd2-web-form-legacy.md]] — Legacy v1 vs v2 comparison, regulatory permission matrix
- [[raw/other/aetherios-finapi-integration-bridge.md]] — Implementation: how Aetherios creates, polls, and handles web form return URLs
