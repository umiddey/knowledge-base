---
title: "finAPI Environments (Sandbox vs Live)"
source: https://documentation.finapi.io/access/finapi-environments
date: 2026-04-11
type: documentation
tier: 1
---

# finAPI Environments

## Sandbox

**Purpose**: Evaluation & testing  
**URL**: https://sandbox.finapi.io  
**Web Form URL**: https://webform-sandbox.finapi.io

Rules:
- Always has latest version of finAPI services
- No load tests allowed
- Data NOT migrated to live if you switch
- Personal data stored if using real bank accounts — you're responsible for GDPR
- Delete all data yourself after use
- No SLA / availability guarantees

## Live

**Purpose**: Production usage  
**URL**: https://live.finapi.io  
**Web Form URL**: https://webform.finapi.io

Rules:
- Requires valid license agreement
- Users created count towards license
- No load/performance tests
- Can be IP-restricted for security
- SLA per license agreement applies

## Note on Base URLs in Integration

When integrating, the base URL is configurable:
- `https://sandbox.finapi.io` for testing
- `https://live.finapi.io` for production

Web Form domains differ too:
- Sandbox: `webform-sandbox.finapi.io`
- Live: `webform.finapi.io`
