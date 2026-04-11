---
title: "Web Form 2.0 Basics"
source: https://documentation.finapi.io/webform/web-form-2-0-basics
date: 2026-04-11
type: documentation
tier: 1
---

# Web Form 2.0 Basics

## How it all starts

When the customer application calls a finAPI Web Form 2.0 service the API responds with HTTP code 201:

```json
{
  "id": "c512b6b7-259d-451e-8eec-0ae4ed993c6f",
  "url": "https://webform-sandbox.finapi.io/wf/c512b6b7-259d-451e-8eec-0ae4ed993c6f",
  "createdAt": "2021-03-02T13:51:08.973+0000",
  "expiresAt": "2021-03-02T14:11:08.973+0000",
  "type": "STANDALONE_PAYMENT",
  "status": "NOT_YET_OPENED",
  "payload": {
    "paymentId": null
  }
}
```

The `id` = Web Form instance ID. Needed to query the result later.
The `url` = where you direct your end-user. Format: `https://<domain>/wf/<webFormId>`

The rest of the interaction is directly between the end-user and the Web Form. At completion, if a `callbackUrl` was set, finAPI notifies the customer application.

## Remember!

1. Web Form token is a **one-time token** — URL can only be opened once. Further attempts → error page.
2. Web Form URLs are valid for **20 minutes** only. Expired forms → abandoned.
3. Default language from browser (DE, EN, CZ, SK). User can change via language picker.
   - ⚠ Language preference not stored if customer deletes users after one-time use
   - ⚠ Use white labeling endpoint to force a single language for all forms

## Web Form Statuses

`GET /api/webForms/{id}` returns:

```json
{
  "id": "e0337037-1228-4db7-bcdb-32b0c5f64af4",
  "url": "https://webform-sandbox.finapi.io/wf/e0337037-1228-4db7-bcdb-32b0c5f64af4",
  "createdAt": "2021-03-09T08:36:15.000+0000",
  "expiresAt": "2021-03-09T08:56:15.000+0000",
  "type": "STANDALONE_PAYMENT",
  "status": "COMPLETED",
  "payload": {
    "paymentId": 22718
  }
}
```

Status values:
- **NOT_YET_OPENED** — URL not accessed yet
- **IN_PROGRESS** — Web Form page opened, flow in progress
- **COMPLETED** — Web Form successfully executed
- **COMPLETED_WITH_ERROR** — Executed but something unexpected happened (unsuccessful)
- **ABORTED** — User clicked CANCEL during the flow
- **EXPIRED** — Abandoned in non-final state for >20 minutes (internally forced)

Final states: COMPLETED, COMPLETED_WITH_ERROR, ABORTED

## Important: User Token Required

The "Get a web form" service is a user-related service — pass `Authorization` header with the **user's** access token (not client token). Add user identifier to `callbacks.finalised` or `redirectUrl` to resolve user context. Never include access token itself in the Web Form URL.
