# PSD2 and Open Banking

PSD2 (Payment Services Directive 2) is a European Union regulation that came into effect in 2018, mandating that banks expose secure APIs allowing authorized Third Party Providers (TPPs) to access account data and initiate payments on behalf of users. In Germany, the implementing law is ZAG (Zahlungsdiensteaufsichtsgesetz). The Berlin Group's NextGenPSD2 framework became the dominant technical standard for these APIs across the DACH region.

PSD2 created two regulated service types: **AIS (Account Information Services)** for reading account data, and **PIS (Payment Initiation Services)** for initiating payments. Both require a national regulator license — in Germany, this is issued by BaFin. The practical effect: any company that wants to read a user's bank transactions or push a payment from their account must either hold its own AIS/PIS license or operate under someone else's. This is the regulatory gap that open banking platforms like finAPI fill — they hold the license and expose it to customers via their API.

**Strong Customer Authentication (SCA)** is the other major PSD2 requirement. When initiating a payment, the payer must authenticate using at least 2 of 3 factors: something they know (PIN/password), something they have (phone/hardware token), something they are (biometrics). Banks implement SCA via three approaches: Redirect (user goes to bank's page), Embedded (credentials submitted programmatically through the TPP), or Decoupled (bank sends push notification to mobile app). Handling all three dynamically is the core complexity of licensed TPP integration — which is exactly what Web Form 2.0 abstracts away.

## Key Points

- **TPP categories**: AISP (Account Information Service Provider) — read-only; PISP (Payment Initiation Service Provider) — can push payments. A company can hold both.
- **BaFin license requirement**: Without your own PIS license, you cannot programmatically access user bank credentials or initiate payments under German law (ZAG). You must use a licensed intermediary.
- **SCA mandate**: Every payment initiation requires 2-factor authentication by the account owner. No exceptions for automation — though SCA exemptions exist for small amounts (<€30) in some contexts.
- **Berlin Group NextGenPSD2**: The technical standard (XS2A = Access to Account) most German/DACH banks implement. Defines the API endpoints, request/response shapes, and SCA flow contracts.
- **PSD3 on horizon**: As of 2025, PSD3 and PSR (Payment Services Regulation) are under development by the EU, expected to further tighten requirements and expand Open Finance scope (FIDA).
- **Regulatory permission matrix**: If you hold no license → you need Web Form for all banking operations. If you hold PIS only → you still need Web Form for account data access. Only full PIS+AIS gives you direct programmatic access to everything.

## Example

A property management company (no banking license) wants to pay contractors from the property manager's bank account:

```
Without PSD2/finAPI: Not legally possible — you can't access 
someone's bank account without a PSD2 license or their direct 
online banking login (which you're not allowed to store).

With finAPI (PIS license holder):
1. finAPI acts as PISP on your behalf
2. User authenticates to their bank via finAPI's Web Form (SCA)
3. finAPI initiates the SEPA transfer under its BaFin license
4. Your company never handles banking credentials
→ legally compliant, no BaFin license needed
```

## Related Concepts

- [[finapi-platform]] — finAPI as a BaFin-licensed PIS/AIS provider
- [[strong-customer-authentication]] — The SCA requirement PSD2 mandates
- [[licensed-vs-unlicensed-tpp]] — Using your own PSD2 license vs finAPI's
- [[web-form-2-0]] — finAPI's solution for unlicensed customers to satisfy SCA
- [[sepa-payment-schemes]] — The payment rails PSD2 regulates access to

## Sources

- [[raw/articles/finapi.zendesk.com-psd2-web-form-legacy.md]] — Regulatory permission matrix: what the Web Form is legally required for
- [[raw/articles/finapi.io-company-overview.md]] — finAPI's BaFin PIS + AIS registrations
- [[raw/articles/documentation.finapi.io-licensed-customers.md]] — What licensed TPP registration involves (eIDAS certs, XS2A bank registration)
- [[raw/articles/yapily.com-finapi-alternatives-open-banking-comparison.md]] — Industry context: PSD2 maturity, PSD3 horizon, open banking evolution
