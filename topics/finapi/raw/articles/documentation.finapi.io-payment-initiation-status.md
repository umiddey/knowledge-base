---
title: "How to get the payment initiation status"
source: https://documentation.finapi.io/payments/how-to-get-the-payment-initiation-status
date: 2026-04-11
type: documentation
tier: 1
---

# How to get the payment initiation status

    GET /payments?ids=$paymentId

## Status Semantics

**SUCCESSFUL**:
- For regular SEPA Credit Transfer: payment successfully **initiated** at the bank. Bank will execute on its own schedule.
- For SEPA **Instant** Credit Transfer: payment has been **settled** (debtor + creditor accounts both updated).
- For Standing Orders: standing order successfully **registered** — not necessarily executed. If user cancels at bank later, finAPI status does NOT change.

**PENDING** (edge cases):
- Issue retrieving status at bank
- Bank returned intermediary status `RCVD` (Received) or `PDNG` (Pending) — ambiguous
- User abandoned the payment flow mid-process

For PENDING cases: finAPI will attempt to re-fetch status. If successful, it updates to SUCCESSFUL or UNSUCCESSFUL.

## Key Insight

"SUCCESSFUL" ≠ "money sent." For regular SCT it just means the bank accepted the initiation. Only for SCT Inst does SUCCESSFUL mean the funds have actually moved.
