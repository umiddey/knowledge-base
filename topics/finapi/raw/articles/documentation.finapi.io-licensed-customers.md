---
title: "Licensed Customers - TPP Registration for finAPI"
source: https://documentation.finapi.io/access/licensed-customers
date: 2026-04-11
type: documentation
tier: 1
---

# Licensed Customers

Required if you use your **own AIS/PIS license** to connect to banks (vs. using finAPI's license via Web Form 2.0).

## FINTS Registration

Submit your `finTSProductRegistrationNumber` via:

    PATCH /clientConfiguration

## XS2A Registration (PSD2/Berlin Group)

Requires:
1. **eIDAS certificates** — QWAC (Qualified Website Authentication Certificate) and QSeal (Qualified Electronic Seal)
2. **Bank-level TPP registration** — required for certain banks (ASPSPs)

Sub-steps:
- Register with ASPSP to gain TPP API access
- Submit eIDAS certificates via finAPI configuration
- Additional TPP registration/authentication for specific banks

## Unlicensed vs Licensed

| | Unlicensed (Web Form 2.0) | Licensed (Direct API) |
|---|---|---|
| Use case | Most customers | Fintech/banks with own PSD2 license |
| Auth flow | finAPI's hosted web form handles SCA | Your app handles SCA programmatically |
| Setup | Client credentials only | eIDAS cert + bank-by-bank TPP reg |
| SCA handling | Automatic in web form | You must handle Redirect/Embedded/Decoupled |
