# SEPA Payment Schemes

SEPA (Single Euro Payments Area) is the standardized payment framework covering 40 European countries for euro-denominated transfers. The European Payments Council (EPC) specifies the scheme rules; new rulebooks are published every November and take effect the following November. SEPA payments exclusively use IBAN for account identification and BIC for institution identification. All transfers are in EUR only — non-euro countries in the SEPA zone can only use SEPA for EUR payments.

The four schemes have radically different speed, reversibility, and use-case profiles. Understanding which scheme is in use is critical because the same `SUCCESSFUL` status from finAPI means something fundamentally different depending on whether it's a regular SCT (bank accepted the initiation, will settle later) or SCT Inst (funds have already moved, within 10 seconds, irrevocably).

## Key Points

- **SCT (SEPA Credit Transfer)**: Push payment, max execution 1 business day, max 2 business days to credit. Business hours only. Recall window: 10 business days (technical errors) or 13 months (fraud). No fee deductions — full amount always arrives.
- **SCT Inst (SEPA Instant Credit Transfer)**: Max 10 seconds to credit, 24/7/365. **Irrevocable** — cannot be cancelled or returned once sent. Used for emergency payments, on-demand salary advances, real-time insurance repayments.
- **SDD Core (Direct Debit)**: Creditor pulls from debtor's account via mandate. 94% executed in batch/file mode.
- **SDD B2B**: Business-to-business only direct debit variant.
- **Volume dominance**: Credit transfers account for 93% of total eurozone payment *value* (€105.6 trillion in H1 2024), though card payments dominate by count (56% of transactions).
- **IBAN validation caveat**: A syntactically valid IBAN doesn't guarantee the account exists or is active. SEPA has no built-in existence check — a valid IBAN can still result in a rejected payment.
- **EPC is not a regulator**: It represents PSPs and defines schemes, but has no mandate from the EU. The European Commission writes the actual regulations (PSD2, etc.).

## Example

Aetherios pays a contractor €1,850 for plumbing work via SEPA Credit Transfer:
```
POST /api/webForms/standalonePayment
orders[0].amount.value = 1850.00
orders[0].amount.currency = "EUR"
orders[0].recipient.iban = "DE89370400440532013000"
orders[0].purpose = "Invoice INV-2026-0042 plumbing"  ← max 140 chars
executionDate = "2026-04-11"
```

After the bank authorizes via Web Form, `GET /payments?ids=...` returns `status: "SUCCESSFUL"`. This means the bank **accepted the payment initiation**. The actual settlement (money leaving the account, arriving at contractor's bank) happens per the bank's backend procedures — typically the same or next business day. If this were SCT Inst (`instantPayment: true`), `SUCCESSFUL` would mean the funds have already arrived at the contractor's account within 10 seconds.

## Related Concepts

- [[finapi-platform]] — finAPI rides SEPA rails to initiate payments
- [[standalone-payment-initiation]] — The full flow of initiating a SEPA payment via finAPI
- [[payment-initiation-status]] — The nuance of what `SUCCESSFUL` means per scheme
- [[payment-data-validation]] — SEPA-specific character and amount rules
- [[psd2-open-banking]] — The regulation governing who can initiate SEPA payments on behalf of others

## Sources

- [[raw/articles/mambu.com-sepa-payment-schemes-explained.md]] — Comprehensive scheme comparison, volume statistics, governance, IBAN/BIC details
- [[raw/articles/documentation.finapi.io-payment-initiation-status.md]] — finAPI's SUCCESSFUL status semantics differ between SCT and SCT Inst
- [[raw/articles/documentation.finapi.io-standalone-payment-webform.md]] — SEPA Credit Transfer and SEPA Instant Credit Transfer as the two supported types
- [[raw/articles/documentation.finapi.io-payment-data-validation.md]] — SEPA-specific character set and amount constraints
