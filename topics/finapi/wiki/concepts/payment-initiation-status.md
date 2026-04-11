# Payment Initiation Status

After a SEPA payment is initiated through finAPI, you get a `paymentId` and query its status via `GET /payments?ids={paymentId}`. The critical subtlety: **`SUCCESSFUL` does not mean the money has moved**. For regular SEPA Credit Transfer, it means the bank accepted the initiation request — the actual settlement follows the bank's backend schedule, typically same-day or next business day. Only for SEPA Instant Credit Transfer does `SUCCESSFUL` confirm actual settlement.

finAPI maps its internal statuses to a narrower set of states. The full raw status set is wider than most integrators expect, and several statuses (`RCVD`, `PDNG`, `NOT_YET_EXECUTED`) are intermediate bank-side states that finAPI surfaces but cannot resolve without waiting. A payment stuck in `PENDING` does not mean it failed — finAPI will re-query the bank and update the status when it can.

## Key Points

- **`SUCCESSFUL` for SCT**: Payment **initiated** at bank. Settlement happens per bank schedule (1–2 business days). "Successful" ≠ "funds moved."
- **`SUCCESSFUL` for SCT Inst**: Payment **settled** — funds have left the sender's account and arrived at the recipient's within 10 seconds. Irrevocable.
- **`SUCCESSFUL` for Standing Orders**: Standing order **registered** at the bank. Future executions are not tracked by finAPI — if the user cancels at the bank later, finAPI status does NOT change.
- **PENDING edge cases** (finAPI retries automatically):
  - Bank returned `RCVD` (Received) or `PDNG` (Pending) — ambiguous intermediary state
  - Issue retrieving status at bank
  - User abandoned the flow before or after bank authorization
- **finAPI status → Aetherios internal status mapping**:
  ```
  INITIATED, NOT_YET_EXECUTED, OPEN, PENDING, RCVD, PDNG → "processing"
  EXECUTED, SUCCESSFUL                                     → "completed"
  DISCARDED, NOT_SUCCESSFUL, UNSUCCESSFUL,
  COMPLETED_WITH_ERROR, ABORTED, EXPIRED                  → "failed"
  ```
- **Web Form vs Payment status**: Two separate status dimensions. Web Form status (`COMPLETED`, `ABORTED`, etc.) tells you whether the user finished the SCA flow. Payment status tells you whether the bank actually initiated/settled the payment. A web form can `COMPLETE` but the payment still be `UNSUCCESSFUL` if the bank rejected it.

## Example

Polling sequence after a contractor payout web form completes:

```python
# Web form completed — now we have paymentId = 22718

# Query payment status
GET /payments?ids=22718
Authorization: Bearer <user_token>

# Possible responses and what they mean:
{ "status": "NOT_YET_EXECUTED" }  # Bank received it, hasn't executed yet → keep polling
{ "status": "PENDING" }           # finAPI can't confirm from bank yet → auto-retry
{ "status": "SUCCESSFUL" }        # Bank accepted initiation (SCT) or settled (SCT Inst)
{ "status": "UNSUCCESSFUL" }      # Bank rejected the payment (wrong IBAN, insufficient funds, etc.)

# In Aetherios, FinapiService._real_get_payment_status() handles multiple 
# response shapes (list, dict with "payments" key, dict with "items" key, plain dict)
# because finAPI's response format varies by API version
```

## Related Concepts

- [[sepa-payment-schemes]] — Why `SUCCESSFUL` means different things for SCT vs SCT Inst
- [[web-form-2-0]] — Web form status is separate from payment status; paymentId only appears after web form `COMPLETED`
- [[standalone-payment-initiation]] — How the paymentId is obtained and used
- [[finapi-in-aetherios]] — The `FINAPI_STATUS_MAP` dict and `_real_get_payment_status()` implementation

## Sources

- [[raw/articles/documentation.finapi.io-payment-initiation-status.md]] — Official status semantics: SCT vs SCT Inst vs Standing Orders, PENDING edge cases
- [[raw/articles/documentation.finapi.io-webform-2-0-basics.md]] — Web form statuses (separate concept)
- [[raw/other/aetherios-finapi-integration-bridge.md]] — FINAPI_STATUS_MAP and status polling implementation
