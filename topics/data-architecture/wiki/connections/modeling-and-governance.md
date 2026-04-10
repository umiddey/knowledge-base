# Modeling and Governance

Data modeling and data governance are deeply intertwined. The quality of a dimensional model depends on governance discipline — who owns the definitions, who approves changes, how quality is validated, and whether conformed dimensions are maintained across subject areas. Conversely, governance is meaningless without good models to govern.

## Why this connection matters

Many organizations treat modeling and governance as separate concerns handled by different teams. In practice, every modeling decision is a governance decision. When an architect defines the grain of fact_sales, they are also defining what "a sale" means for the organization. When they create a conformed customer dimension, they are establishing a governed entity that multiple teams must agree on. When they choose Type 2 history for loyalty tier, they are making a governance decision about what historical truth matters.

Governance failures often manifest as modeling problems: conflicting definitions across marts, mixed grains in fact tables, missing conformed dimensions, and duplicated logic across dashboards. These are not fixed by adding more governance documentation — they are fixed by better modeling discipline supported by governance processes.

## Key insights

- Every model needs an owner who is accountable for its meaning and quality
- Conformed dimensions are both a modeling technique and a governance tool
- The business glossary should drive model design, not the other way around
- Quality checks should be built into the transformation layers, not bolted on after
- Proportional governance applies to modeling: strict for finance models, lighter for exploratory work
- The semantic layer is where modeling meets governance most directly — governed metrics defined once

## Concepts Linked
- [[dimensional-modeling]] - modeling techniques that governance protects
- [[data-governance]] - governance processes that modeling needs
- [[conformed-dimensions]] - the bridge between modeling and governance
- [[semantic-layer]] - where governed modeling becomes consumer-facing
- [[data-quality]] - quality is the measurable outcome of governed modeling
- [[grain]] - grain definitions are governance commitments about data meaning

## Examples

### Governance failure that manifests as a modeling problem
```
Symptom: Executive dashboard shows $12M revenue.
         Finance dashboard shows $11.2M revenue.
         Same month, same company.

Root cause investigation:
  Executive dashboard uses fct_sales (grain: order line items, includes pending orders)
  Finance dashboard uses fct_revenue (grain: invoice line items, only completed)

These are two different facts with two different grains — but nobody documented
which one represents "company revenue." The business glossary has no entry for "revenue."
There is no owner for either model. There is no governance process to resolve the conflict.

Fix:
  1. Business glossary entry: "Revenue" = recognized revenue (fct_revenue, completed only)
  2. Rename fct_sales metric to "gross order value" to distinguish it
  3. Assign ownership: Finance team owns revenue definition
  4. Add dbt test: fct_revenue total should always be <= fct_sales total
```

### Proportional modeling governance
```
Strict modeling governance (finance domain):
  - Grain statement required before any fact table PR
  - Conformed dimensions mandatory (no domain-specific customer tables)
  - Every measure has a documented aggregation type (additive/semi-additive/non-additive)
  - SCD strategy documented for every dimension attribute
  - dbt tests must pass before merge

Lighter modeling governance (growth/marketing):
  - Grain documented but not gate-kept
  - Can create domain-specific dimensions (dim_marketing_channel is marketing-only)
  - Exploratory models allowed in staging area without full certification
  - Basic tests (unique, not null) sufficient for PR merge
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball's modeling with governance implications
- [[raw/articles/the-6-dimensions-of-data-quality]] - quality dimensions that governed models should meet
