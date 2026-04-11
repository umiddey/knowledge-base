---
title: Wiki Index
updated: 2026-04-11
---

# finAPI Wiki Index

> Master index of all articles in this wiki. Auto-maintained by LLM.

## Concepts

### Platform & Regulatory Foundation
- [[finapi-platform]] — What finAPI is: BaFin-licensed PIS/AIS platform, product suite, 13 European markets, €7B+/month payment volume
- [[psd2-open-banking]] — The EU regulation (PSD2/ZAG) that created the legal basis for open banking; AIS/PIS license requirements; Berlin Group NextGenPSD2
- [[sepa-payment-schemes]] — SCT vs SCT Inst vs SDD: speed, reversibility, settlement guarantees; 93% of eurozone payment value; IBAN/BIC model

### Authentication & Identity
- [[oauth2-token-model]] — Two-token OAuth2 model: client_credentials for admin ops, password grant for bank ops; token caching, 1-hour TTL
- [[finapi-access-user]] — Synthetic service account for Web Form operations; provisioned once per tenant; credentials stored encrypted

### Payment Initiation Flow
- [[web-form-2-0]] — finAPI's hosted SCA interface: one-time URL, 20-min TTL, status lifecycle, callback vs polling
- [[standalone-payment-initiation]] — Full 5-step flow: create web form → user auth → get paymentId → check payment status → optional delete
- [[payment-initiation-status]] — Status semantics: SUCCESSFUL ≠ money moved (for SCT); PENDING edge cases; finAPI→Aetherios status mapping
- [[strong-customer-authentication]] — PSD2 SCA: 3 factors, 3 bank approaches (Redirect/Embedded/Decoupled); what Web Form 2.0 abstracts

### Operational & Configuration
- [[finapi-environments]] — Sandbox (sandbox.finapi.io) vs Live (live.finapi.io); matching web form domains; no SLA on sandbox
- [[payment-data-validation]] — SEPA character set rules (a-z, 0-9, limited symbols), 140-char purpose limit, 35-char endToEndId, umlaut substitution
- [[licensed-vs-unlicensed-tpp]] — Comparison table: Web Form 2.0 vs Direct API; eIDAS certs; when each path makes sense

## Connections

- [[web-form-2-0-vs-direct-api]] — Decision framework: unlicensed (Web Form) vs licensed (direct API); tradeoffs, when to choose each
- [[finapi-in-aetherios]] — Protocol→Code map: every finAPI step mapped to exact file/function in the Aetherios codebase

## Statistics

- Total concepts: 12
- Total connections: 2
- Total sources: 14 raw files
- Processed: 14
- Unprocessed: 0 (6 reference URLs pending future scraping)
