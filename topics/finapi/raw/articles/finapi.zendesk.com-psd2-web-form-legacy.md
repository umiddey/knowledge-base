---
title: "finAPI PSD2 Web Form (Legacy v1 - Deprecated)"
source: https://finapi.zendesk.com/hc/en-us/articles/360002596391-finAPI-PSD2-Web-Form
date: 2022-01-26
type: documentation
tier: 2
---

# finAPI PSD2 Web Form (Legacy - DEPRECATED)

> **Note: Web Form 2.0 has replaced this. This doc is for historical context.**

## Why the Web Form Exists

Under PSD2 (ZAG law in Germany), companies without their own PIS/AIS regulatory license **cannot handle banking credentials directly**. finAPI created the Web Form so unlicensed customers could still initiate payments — the form captures credentials on finAPI's hosted domain, not the customer's.

## Regulatory Permission Matrix

| Your Regulatory Permission | Web Form Required For |
|---|---|
| None | Import/Update Bank Connection, SEPA Money Transfer, SEPA Direct Debit, Edit Bank Connection |
| PIS only | Import/Update Bank Connection, Edit Bank Connection (AIS/KID credentials) |
| AIS only | SEPA Money Transfer, SEPA Direct Debit |
| PIS + AIS | Nothing (direct API access to everything) |

## Legacy Flow

1. App calls a finAPI service requiring credentials
2. finAPI returns **HTTP 451** (not 403/401) with web form ID in `message` field
3. Response `Location` header contains the web form URL
4. Direct user to URL (no iFrame — German regulator prohibits iFrame)
5. User completes the form (credentials entered on finAPI's domain)
6. Either: poll `GET /api/v1/webForms/{id}` OR receive callback POST to `callbackUrl`
7. Status transitions: NOT_YET_OPENED → IN_PROGRESS → COMPLETED/ABORTED
8. On COMPLETED, `serviceResponseCode` and `serviceResponseBody` contain original service response

## Legacy vs Web Form 2.0 Differences

| | Legacy (v1) | Web Form 2.0 |
|---|---|---|
| Trigger | HTTP 451 response from service call | Explicit `POST /api/webForms/standalonePayment` |
| URL format | Token appended to service domain | Dedicated `webform.finapi.io/wf/{id}` domain |
| Expiry | 10 minutes | 20 minutes |
| iFrame | Not allowed | Can be embedded |
| Status check | `GET /api/v1/webForms/{id}` | `GET /api/webForms/{id}` |
