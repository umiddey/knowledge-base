---
title: "Payment Data Validation - SEPA Rejection Prevention"
source: https://documentation.finapi.io/payments/payment-data-validation
date: 2026-04-11
type: documentation
tier: 1
---

# Payment Data Validation

## Rules to Avoid Bank Rejections

1. **`purpose` field**: max 140 characters
2. **Character set** — stick to this for `purpose`, `endToEndId`, `counterpartName`:
   - a-z, A-Z, 0-9
   - `/`, `-`, `?`, `:`, `(`, `)`, `.`, `,`, `'`, `+`, Space
   - Umlauts (ä, ö, ü, etc.) are bank-dependent. Safe conversion: ä→ae, ö→oe, ü→ue, ß→ss
3. **Qonto bank**: max payment amount 30,000€

## Bank-Specific Constraints

Available via `BankInterface.paymentConstraints` in:
- `GET /api/v2/banks/{id}`
- `GET /api/v2/banks`
- `GET /api/v2/bankConnections/{id}`

If a constraint is set `true` and your payment violates it, finAPI **rejects at creation time** (before it even hits the bank). Check constraints upfront.

## Practical Impact

These validations are critical — bank rejections can be silent or delayed. Pre-validating means faster feedback and no wasted SCA flows.
