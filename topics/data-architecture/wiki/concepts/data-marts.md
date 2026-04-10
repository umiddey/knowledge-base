# Data Marts

A data mart is a domain-focused analytical interface — a structured, business-friendly subset of the data warehouse designed for a specific business area. Finance has its mart with revenue and cost models. Marketing has its mart with campaign and attribution models. Inventory has its mart with stock and shipment models.

A good mart is not a random copy of source tables. It is a curated dimensional model with clear grain, known ownership, documented definitions, quality checks, and access controls matching domain sensitivity. Marts are typically built on top of conformed dimensions so that cross-domain analysis remains consistent. In a federated model, each domain owns its mart. In a centralized model, the central data team builds and maintains marts for all domains.

## Key Points
- Domain-focused analytical interface (finance mart, marketing mart, inventory mart)
- Not a copy of source tables — a structured dimensional model for a specific business area
- Should have: clear grain, known owner, documented definitions, quality checks, access controls
- Built on conformed dimensions for cross-domain consistency
- In federated models, domains own their marts; in centralized models, one team owns all

## Related Concepts
- [[dimensional-modeling]] - marts are typically dimensional models (facts + dimensions)
- [[semantic-layer]] - the semantic layer often serves mart logic through governed definitions
- [[conformed-dimensions]] - shared dimensions enable consistent cross-mart analysis
- [[data-governance]] - marts need governance for ownership, quality, and access

## Examples

### Mart structure by domain
```
models/marts/
  finance/
    fct_revenue.sql          -- grain: one row per invoice line item
    fct_cost_of_goods.sql    -- grain: one row per COGS entry
    dim_customer.sql         -- conformed dimension (shared with other marts)
    dim_date.sql             -- conformed dimension (shared across all marts)
    dim_product.sql          -- conformed dimension (shared with inventory mart)
    dim_account.sql          -- finance-specific dimension

  marketing/
    fct_campaigns.sql        -- grain: one row per campaign-channel-day
    fct_attribution.sql      -- grain: one row per attributed conversion
    dim_customer.sql         -- SAME conformed dim_customer as finance
    dim_campaign.sql         -- marketing-specific dimension

  inventory/
    fct_inventory_daily.sql  -- grain: one row per product per warehouse per day
    dim_product.sql          -- SAME conformed dim_product as finance
    dim_warehouse.sql        -- inventory-specific dimension
```

### Centralized vs federated mart ownership
```
Centralized model:
  Central data team owns ALL marts. Finance requests a new metric →
  data team builds it. Pro: consistency. Con: bottleneck, slow delivery.

Federated model (data mesh):
  Finance team owns finance/ marts. Marketing owns marketing/ marts.
  Platform team provides shared tools, CI/CD, and the conformed dimensions.
  Pro: domain expertise, faster delivery. Con: needs governance to prevent fragmentation.
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball Group's data mart design guidance
