---
title: "Initiate a Standalone Payment - No Web Form (Licensed Customers Only)"
source: https://documentation.finapi.io/payments/initiate-a-standalone-payment-no-web-form-licensed
date: 2026-04-11
type: documentation
tier: 1
---

# Initiate a Standalone Payment - No Web Form (Licensed Customers Only)

> This flow requires a PSD2 license and TPP registration with banks. Non-licensed customers must use the Web Form 2.0 flow.

## Pre-requisites

- Access User Token created
- Bank selected (via bank search endpoint)

## Step 1 - Create a payment

    POST /payments/moneyTransfers

Provide `IBAN` to indicate sender account.

## Step 2 - Submit payment

    POST /payments/submit

The flow varies by **SCA approach** the bank offers. Applications must dynamically handle all:

### SCA Approaches

**1. Redirect SCA** (most common for PSD2/XS2A)
- Submit payment + redirectUrl
- Receive 510 with `REDIRECT_REQUIRED` + `redirectUrl` to bank
- User completes auth at bank, redirected back with query params
- Re-submit with `redirectCallback` = full query string from redirect

**2. Embedded SCA**
- Submit credentials directly to finAPI
- Bank may respond with challenge (e.g., TAN request)
- Submit answer, finAPI completes the auth chain

**3. Decoupled SCA**
- Submit payment
- Bank sends push notification to user's mobile app
- User authorizes there; polling or callback confirms completion

Combinations possible (e.g., Embedded + Decoupled).

## Redirect Flow Example (Full)

Step 1: Submit
```
POST /payments/moneyTransfers
Authorization: Bearer <user_token>
{
  "paymentId": 1,
  "interface": "XS2A",
  "redirectUrl": "https://customer1.io",
  "loginCredentials": [...]
}
```

Step 2: Receive redirect
```
HTTP/1.1 510
{
  "errors": [{
    "code": "ADDITIONAL_AUTHENTICATION_REQUIRED",
    "multiStepAuthentication": {
      "hash": "288c0a78c6596e8f02f70a21e731d46a",
      "status": "REDIRECT_REQUIRED",
      "redirectUrl": "https://demobank.finapi.io?state=...",
      "redirectContext": "976641d2-...",
      "redirectContextField": "state"
    }
  }]
}
```

Step 3: Redirect user to bank URL

Step 4: Bank redirects back to `redirectUrl?state=...&code=...`

Step 5: Re-submit with redirectCallback
```
{
  "paymentId": 1,
  "interface": "XS2A",
  "multiStepAuthentication": {
    "hash": "288c0a78c6596e8f02f70a21e731d46a",
    "redirectCallback": "state=...&code=..."
  }
}
```

Step 6: Success
```
HTTP/1.1 200
{
  "id": 1,
  "type": "MONEY_TRANSFER",
  "status": "SUCCESSFUL",
  "amount": 99.99
}
```

## Key Difference vs Web Form

The no-webform flow gives full programmatic control but requires:
- TPP PSD2 license (BaFin)
- Bank-by-bank TPP registration
- Handling of all SCA variants dynamically

Web Form 2.0 handles all SCA variants automatically inside the hosted form — this is why it's the recommended option for most customers.
