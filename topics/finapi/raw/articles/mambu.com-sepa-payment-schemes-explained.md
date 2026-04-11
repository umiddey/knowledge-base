---
title: "Everything you need to know about SEPA and its payments schemes"
source: https://mambu.com/en/insights/articles/different-sepa-payment-schemes
date: 2026-04-11
type: article
tier: 2
---

# SEPA and its Payment Schemes

## The Four SEPA Schemes

### 1. SEPA Credit Transfer (SCT)
- First launched 2008
- Max execution time: 1 business day; max credit time: 2 business days
- Only processed during business days/hours
- No min/max amount; full amount always credited (no fees deducted)
- Recall window: 10 business days (technical), 13 months (fraud)
- Use cases: consumer transfers, salary payments, insurance disbursements

### 2. SEPA Instant Credit Transfer (SCT Inst)
- Launched 2017
- Max time to credit: **10 seconds**, 24/7/365
- **Cannot be cancelled or returned** — irrevocable once sent
- Debtor bank notified by creditor bank on credit (real settlement confirmation)
- Use cases: on-demand salary advances, emergency payments, real-time insurance repayments
- Key difference from SCT: SUCCESSFUL status = funds actually settled

### 3. SEPA Direct Debit Core (SDD Core)
- Consumer-facing: creditor pulls from debtor account with mandate
- 94% of SDD executed in file/batch manner

### 4. SEPA Direct Debit B2B (SDD B2B)
- Business-to-business only

## Common Characteristics of ALL SEPA Payments
- **Currency**: EUR only
- **Account identifier**: IBAN (ISO 13616 standard)
- **Institution identifier**: BIC (ISO 9362, SWIFT-managed)
- **Geographic scope**: 40 European countries (as of April 2025), including 13 non-euro countries (only EUR payments are SEPA)

## Payment Volume Context (H1 2024)
- Total EU non-cash payments: 72.1 billion transactions, €113.5 trillion value
- Credit transfers: 15.7 billion transactions, **€105.6 trillion value (93% of total value)**
- Card payments: 56% of transaction volume but only 1% of value
- SCT dominant: 96% of all credit transfers in eurozone

## Governance
- **European Commission**: drafts regulations (PSD2, etc.)
- **EPC (European Payments Council)**: specifies scheme rules, publishes annual rulebooks
- **ECB + national central banks**: market infrastructure
- EPC is NOT a regulator — it represents PSPs

## IBAN Validation Caveat
IBAN syntax can be verified algorithmically, but SEPA has no built-in mechanism to confirm the account exists/is active. A valid IBAN can still result in rejection if account is closed, doesn't exist, or is incompatible with the payment method.
