# Payment Data Validation

finAPI enforces pre-submission validation rules on payment fields to prevent bank rejections. Bank rejections are worse than finAPI rejections: they happen after SCA has been completed (the user has already gone through the whole web form flow), the payment status gets stuck in a failure state, and the user experience is broken. Pre-validating before submission catches these errors early.

The character set restriction is the most surprising rule for non-European developers. SEPA's messaging standard (ISO 20022 / XML-based) is conservative about special characters because it must pass through multiple banking systems with different encoding capabilities. German umlauts in particular (ä, ö, ü, ß) are "bank-dependent" — some banks handle them, some don't. The safe play is to always substitute: ä→ae, ö→oe, ü→ue, ß→ss in the `purpose`, `endToEndId`, and `counterpartName` fields.

## Key Points

- **`purpose` (payment reference)**: Max **140 characters**. Applies to all SEPA transfers. Exceeding this is silently truncated by some banks and rejected by others.
- **Allowed character set** for `purpose`, `endToEndId`, `counterpartName`:
  ```
  a-z  A-Z  0-9  /  -  ?  :  (  )  .  ,  '  +  [space]
  ```
  Umlauts are bank-dependent: substitute ä→ae, Ä→AE, ö→oe, Ö→OE, ü→ue, Ü→UE, ß→ss
- **`endToEndId`**: Max **35 characters**. This is the idempotency key that travels through the SEPA network — must be unique per payment.
- **Qonto bank**: Max amount **€30,000** per payment. Larger amounts will be rejected at payment creation time.
- **Bank-specific constraints** via `BankInterface.paymentConstraints`:
  - Queryable at `GET /api/v2/banks/{id}` or `GET /api/v2/bankConnections/{id}`
  - If a constraint flag is `true` for a bank and your payment violates it, finAPI rejects at **creation time** (before SCA) — better than a bank-level rejection.
- **Validation timing matters**: finAPI rejects violating payments at creation time (fast feedback). Bank-level rejections happen after the user completes SCA (wasted UX).

## Example

Aetherios `FinapiService._truncate_reference()` and field construction:

```python
# In _real_create_payment():
orders = [{
    "recipient": {
        "name": recipient_name,     # counterpartName — use safe charset
        "iban": recipient_iban,
    },
    "amount": {
        "value": round(amount, 2),
        "currency": currency,
    },
    "purpose": self._truncate_reference(reference),  # max 140 chars
    "endToEndId": idempotency_key[:35],              # max 35 chars
}]

def _truncate_reference(self, reference: str) -> str:
    return reference[:140]

# What you should do before calling:
safe_name = name.replace("ä", "ae").replace("ö", "oe").replace("ü", "ue").replace("ß", "ss")
safe_purpose = purpose[:140]  # truncate to 140
safe_end_to_end = key[:35]   # truncate to 35
```

If a contractor's name is "Klaus Müller", sending it as-is risks rejection at banks that don't support umlauts. "Klaus Mueller" is universally safe.

## Related Concepts

- [[sepa-payment-schemes]] — SEPA's character set restrictions come from the underlying ISO 20022 messaging standard
- [[standalone-payment-initiation]] — Where these fields appear in the payment payload
- [[payment-initiation-status]] — What happens when validation fails: `UNSUCCESSFUL` status

## Sources

- [[raw/articles/documentation.finapi.io-payment-data-validation.md]] — Official validation rules: purpose length, character set, Qonto limit, bank-specific constraints
- [[raw/other/aetherios-finapi-integration-bridge.md]] — `_truncate_reference()` and field construction in `_real_create_payment()`
