# Security and Serving

Data security and the serving layer are fundamentally connected. The serving layer is where data meets consumers, and every consumer has different access rights. Designing a serving architecture without considering security leads to either over-exposure of sensitive data or over-restriction that prevents legitimate analytics.

## Why this connection matters

The semantic layer and data marts are the most consumer-facing parts of the platform. They are also where access control must be enforced most precisely. A marketing analyst needs customer segment data but not payment details. A regional manager needs their region's data but not other regions'. An executive needs aggregate metrics but not individual records. The serving layer must deliver the right data to the right consumer with the right protections.

Sensitivity classification drives serving design. Public and internal data can be served through open marts. Confidential data requires role-based views. Restricted data requires row-level and column-level controls. Personal data needs masking and deletion capabilities. The architect must classify data first, then design serving patterns that match each classification level.

## Key insights

- Sensitivity classification should drive serving layer design, not be added afterward
- The semantic layer is the natural enforcement point for row-level and column-level security
- Different consumer personas need different views of the same underlying data
- Dynamic masking allows one table to serve multiple audiences safely
- Self-service analytics without access guardrails becomes a security liability
- Certified datasets should have clearly documented access restrictions

## Concepts Linked
- [[access-control]] - RBAC and ABAC models for serving-layer security
- [[data-masking]] - dynamic and static masking for column-level protection
- [[semantic-layer]] - the serving interface where access control meets consumers
- [[data-marts]] - domain-focused serving models with appropriate access controls
- [[data-governance]] - governance defines the classification rules that serving enforces

## Examples

### Serving layer with layered access controls
```
Same dim_customer table, different consumers, different access levels:

  ┌──────────────────────────────────────────────────────┐
  │ dim_customer (full table)                            │
  │ customer_key, name, email, phone, ssn, segment,     │
  │ revenue, region, loyalty_tier                        │
  └────────────┬────────────┬────────────┬───────────────┘
               │            │            │
     ┌─────────▼──┐  ┌──────▼─────┐  ┌──▼───────────────┐
     │ Marketing  │  │ Sales Ops  │  │ Finance          │
     │ Analyst    │  │ Manager    │  │ Analyst          │
     ├────────────┤  ├────────────┤  ├──────────────────┤
     │ name ✅    │  │ name ✅    │  │ name ✅          │
     │ email 🔒   │  │ email ✅   │  │ email 🔒         │
     │ phone 🔒   │  │ phone ✅   │  │ phone 🔒         │
     │ ssn 🔒🔒   │  │ ssn 🔒🔒   │  │ ssn 🔒🔒         │
     │ segment ✅ │  │ segment ✅ │  │ segment ✅       │
     │ revenue 🔒 │  │ revenue ✅ │  │ revenue ✅       │
     │ region ✅  │  │ region 🔒  │  │ region ✅        │
     │            │  │ (own only) │  │                  │
     └────────────┘  └────────────┘  └──────────────────┘

  ✅ = visible    🔒 = masked    🔒🔒 = hidden completely
  Regional filtering on Sales Ops: only sees customers in assigned region
```

### Sensitivity classification drives serving design
```
Data classification matrix:

  PUBLIC (stock prices, product catalog):
    → Serve through open marts. No access restrictions.
    → Example: dim_product, dim_date

  INTERNAL (revenue by region, employee headcount):
    → Serve through role-based marts. Analyst+ access.
    → Example: fct_revenue (aggregate), dim_store

  CONFIDENTIAL (customer PII, individual revenue):
    → Row-level + column-level controls. Named access only.
    → Example: dim_customer (email, phone, address columns restricted)

  RESTRICTED (SSN, payment cards, health records):
    → Encrypted at rest. Access requires approval. Audit-logged.
    → Example: payment_tokens, health_records (separate secured schema)
```

## Sources
- [[raw/articles/access-controls-in-data-engineering-2086aa215ad3]] - access controls in data engineering
- [[raw/articles/filters-and-masks]] - Databricks row filters and column masks
