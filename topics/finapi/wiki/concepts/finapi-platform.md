# finAPI Platform

finAPI is a Munich-based open banking platform, operational since 2008, that holds a BaFin Payment Initiation Service (PIS) license and is registered as an Account Information Service (AIS) provider. It sits between businesses that want to move money or read bank data and the banks that actually hold the accounts. The core value proposition: **businesses using finAPI inherit its regulatory license** — they don't need their own PSD2 license to initiate SEPA payments on behalf of customers.

The platform processes over 20 million API calls per day and €7 billion+ in monthly payment volume. It connects to 100M+ potential bank accounts across 13 European markets, with particular depth in the DACH region (Germany, Austria, Switzerland). All servers are located in Germany. finAPI holds a TÜV "Trusted Site Privacy" certification for data handling.

finAPI's product surface is wider than most open banking providers. Beyond payment initiation, it offers data intelligence (transaction categorization, cash flow analysis, contract detection, credit risk scoring via SCHUFA integration, digital account checks for lending) and KYC/identity verification (GiroIdent). This makes it a full financial data platform, not just a payment API.

## Key Points

- **BaFin PIS license**: finAPI is a licensed Third Party Provider (TPP) under PSD2. Customers use finAPI's license, avoiding the cost and complexity of their own PSD2 registration
- **13 European markets**: Deep DACH coverage; competitors like Yapily (19 countries), Tink (18), Salt Edge (44) offer broader geographic reach at the cost of less DACH depth
- **Web Form 2.0**: finAPI's hosted SCA layer — unlicensed customers route bank authentication through finAPI's hosted domain, keeping them compliant without handling credentials
- **Data Intelligence**: Categorization, cash flow, credit risk, contract detection — differentiates it from pure-play payment providers
- **Free 30-day sandbox trial** via sandbox.finapi.io; live requires a license agreement
- **Operational since 2008**: Pre-dates PSD2 (2018). Built for German open banking before it was mandated.

## Example

A property management SaaS wants to pay contractors via SEPA bank transfer. Without finAPI, it would need its own BaFin PIS license (expensive, slow to obtain) to initiate payments from customer bank accounts. With finAPI, the SaaS stores the property manager's finAPI credentials, calls `POST /api/webForms/standalonePayment`, redirects the user to finAPI's hosted web form where they authenticate with their bank, and finAPI (under its own license) initiates the SEPA credit transfer. The SaaS never touches banking credentials and never needs a banking license.

## Related Concepts

- [[psd2-open-banking]] — The regulatory framework that created the legal basis for finAPI's existence
- [[web-form-2-0]] — finAPI's hosted SCA layer that enables unlicensed customers
- [[oauth2-token-model]] — How API access is authorized (client token → user token)
- [[sepa-payment-schemes]] — The payment rails finAPI initiates payments on
- [[licensed-vs-unlicensed-tpp]] — Whether you need your own PSD2 license or use finAPI's

## Sources

- [[raw/articles/finapi.io-company-overview.md]] — Company facts, product portfolio, scale metrics, regulatory status
- [[raw/articles/finapi.io-products-payments-transfer-api.md]] — Payments product detail, SEPA types, BaFin PIS positioning
- [[raw/articles/yapily.com-finapi-alternatives-open-banking-comparison.md]] — Competitor context: finAPI's coverage (13 markets) vs alternatives, DACH depth
