---
title: "Initiate a Standalone Payment - with Web Form (Recommended Option)"
source: https://documentation.finapi.io/payments/initiate-a-standalone-payment-with-web-form-recomm
date: 2026-04-11
type: documentation
tier: 1
---

# Initiate a Standalone Payment - with Web Form (Recommended Option)

## Pre-requisites

* Access User Token has been created.

## Step 1 - Initiate payment

To initiate a SEPA Credit Transfer or SEPA Instant Credit Transfer, use the **Create a standalone payment endpoint**:

    POST /api/webForms/standalonePayment

If the IBAN of the sender account is already known, we recommend including it in the payment initiation payload to avoid the possibility that several SCAs will be required.

If the IBAN of the sender account is not known, it is still possible to initiate a payment without the sender account and the user will have to select the Bank or IBAN on the Web Form.

Note: for Direct Debits initiation, standalone Direct Debit initiation is not supported — use "Initiate a Payment from an Account" instead.

## Step 2 - The user to log in at the bank and authorize the payment

As a result of Step 1, the web form is generated. You can find the URL of the web form in the response:

    url: "https://webform.finapi.io/wf/946db09e-5bfc-11eb-ae93-0242ac130002"

The web form has to be presented to the user. Options:
- Embed the web form into your application (Embedded Web Form 2.0)
- Redirect the user to the Web Form URL in the browser

## Step 3 - Check the status of the web form

To retrieve the status of the web form:
- Call the **Get a web form service**: `GET /api/webForms/{id}`
- OR set up a callback URL in the payment initiation payload (Step 1)

Note the `paymentId` returned in the response (in the `payload` object) for Step 4.

## Step 4 - Check the status of the payment initiation

Get the `paymentId` from Step 3 and execute:

    GET /payments?ids=$paymentId

## Step 5 - Delete User (Optional)

If you do not need to save the user for re-use:

    DELETE /users
