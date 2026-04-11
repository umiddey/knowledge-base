# Licensed vs Unlicensed TPP Integration

finAPI serves two fundamentally different integration patterns based on whether the customer holds their own PSD2 AIS/PIS license. The choice determines: how SCA is handled, how bank credentials flow, what API endpoints are available, and what upfront regulatory and technical investment is required. Most fintech companies and SaaS products start (and stay) with the unlicensed path.

**Unlicensed** (the majority of customers): You use finAPI's BaFin license. You never handle bank credentials. All SCA happens inside finAPI's hosted Web Form 2.0. You call `POST /api/webForms/standalonePayment`, get a URL, redirect the user, poll for completion. Setup: register client credentials with finAPI, create an Access User, done.

**Licensed TPP** (banks, regulated fintechs with own PSD2 license): You have your own BaFin AIS/PIS authorization. You register your eIDAS certificates (QWAC + QSeal) with finAPI, potentially do per-bank TPP registration (required for some banks), and use the direct payment API (`POST /payments/moneyTransfers`, `POST /payments/submit`). You must handle Redirect/Embedded/Decoupled SCA yourself, dynamically, per bank. Much more complex, but also more control: no hosted web form, lower per-transaction latency, ability to build custom UX throughout.

## Key Points

| | Unlicensed (Web Form 2.0) | Licensed (Direct API) |
|---|---|---|
| **Regulatory requirement** | None beyond finAPI contract | Own BaFin AIS/PIS license |
| **Setup cost** | Minutes — client credentials + Access User | Weeks/months — eIDAS certs, bank-by-bank TPP registration |
| **SCA handling** | Automatic inside Web Form | Your app handles Redirect/Embedded/Decoupled dynamically |
| **Bank credential access** | Never (finAPI handles it) | Programmatic (Embedded SCA) |
| **UX control** | Limited (finAPI's form, white-labelable) | Full |
| **Payment endpoint** | `POST /api/webForms/standalonePayment` | `POST /payments/moneyTransfers` + `POST /payments/submit` |
| **Transaction latency** | Web form open time + SCA (human-dependent) | Programmatic, lower overhead |
| **Available payment types** | SCT, SCT Inst via standalone only | All types + Direct Debit from account |
| **Regulatory permission matrix** | Web Form required for transfers, account imports | Nothing required with full PIS+AIS |

- **eIDAS certificates**: QWAC (Qualified Website Authentication Certificate) authenticates you to banks during HTTPS; QSeal (Qualified Electronic Seal) signs messages. Required for XS2A bank registration.
- **FINTS vs XS2A**: Two interface types finAPI supports. FINTS (legacy German banking protocol) requires submitting a `finTSProductRegistrationNumber`. XS2A (Berlin Group standard, PSD2-native) requires eIDAS certs.
- **When to go licensed**: When you're building a financial product at scale, need full UX control, can't tolerate web form redirect latency, or are a regulated entity that already has a PSD2 license.

## Example

The same contractor payout in both modes:

```
UNLICENSED (Aetherios current implementation):
1. POST /api/webForms/standalonePayment → get URL
2. Redirect operator to URL (finAPI web form opens in new tab)
3. Operator: selects/confirms bank (pre-filled if sender IBAN provided), enters PIN, enters TAN
4. finAPI: handles all SCA, initiates payment under its BaFin license
5. Poll or callback → web form COMPLETED, paymentId available
6. Check paymentId status → SUCCESSFUL
Total: operator-interactive, ~1-3 minutes

LICENSED:
1. POST /payments/moneyTransfers { paymentId, interface: "XS2A", loginCredentials }
2. Handle 510 REDIRECT_REQUIRED → redirect to bank
3. User authenticates at bank → redirect back with state/code
4. POST /payments/submit with redirectCallback → 200 SUCCESSFUL
Total: still operator-interactive for Redirect SCA, but you control every screen
```

## Related Concepts

- [[psd2-open-banking]] — The regulatory framework that creates the licensed/unlicensed distinction
- [[web-form-2-0]] — The unlicensed path's core mechanism
- [[strong-customer-authentication]] — What the licensed path must implement manually
- [[finapi-platform]] — finAPI's BaFin PIS license is what unlicensed customers borrow

## Sources

- [[raw/articles/documentation.finapi.io-licensed-customers.md]] — Licensed registration: eIDAS certs, FINTS, XS2A bank registration
- [[raw/articles/documentation.finapi.io-standalone-payment-no-webform.md]] — Full licensed direct API flow with all SCA variants
- [[raw/articles/finapi.zendesk.com-psd2-web-form-legacy.md]] — Regulatory permission matrix: what Web Form is required for per license level
- [[raw/other/aetherios-finapi-integration-bridge.md]] — Aetherios uses unlicensed path (Web Form 2.0)
