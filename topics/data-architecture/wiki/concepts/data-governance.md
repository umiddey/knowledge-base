# Data Governance

Data governance is the system of rules, roles, standards, and processes that help data stay defined, owned, controlled, trustworthy, and safe to use. It is not only about restriction — good governance also makes reuse easier by creating clear definitions, known owners, and visible quality expectations that multiple teams can rely on.

The core components include: ownership (who is accountable for each dataset's meaning and quality), a business glossary (controlled definitions for terms like "active customer" and "net revenue"), metadata and cataloging (descriptions, lineage, sensitivity, quality status), data quality management (explicit checks for accuracy, completeness, timeliness, consistency, validity, and uniqueness), and access control (who can see what, based on sensitivity). Governance can be too weak (no owners, conflicting definitions, sensitive data everywhere) or too heavy (everything requires committee approval, teams avoid official processes). Good governance is proportional — stricter where risk is high, lighter where experimentation is safe.

## Key Points
- The system that makes data trustworthy, safe, understandable, and reusable
- Core components: ownership, business glossary, metadata, quality management, access control
- Too weak: conflicting definitions, unowned data, sensitive data spread too broadly
- Too heavy: committee approval for everything, teams create shadow spreadsheets instead
- Proportional governance: strict for finance and regulated data, lighter for exploratory analytics
- DAMA-DMBOK provides a globally recognized framework for data management practices
- DCAM provides a maturity assessment model for benchmarking capabilities

## Related Concepts
- [[data-quality]] - quality management is a core governance component
- [[data-catalog]] - catalogs make governance visible and navigable
- [[data-lineage]] - lineage supports governance by showing data provenance
- [[access-control]] - access governance enforces who can see what
- [[semantic-layer]] - the semantic layer is a governance mechanism for metric consistency
- [[data-mesh]] - data mesh requires federated governance across domains

## Examples

### Business glossary entry (what governance produces)
```
Term: "Active Customer"
Definition: A customer who has placed at least one paid order in the last 12 months
Owner: Sarah Chen (Revenue Operations)
Related Terms: Customer, Net Revenue, Churn Rate
Source System: CRM (Salesforce) + Ecommerce (Shopify) reconciliation
Approval Status: Reviewed and approved by Finance and Revenue Ops
Last Updated: 2024-03-15

WITHOUT this definition:
  Marketing says: "We have 50,000 active customers" (anyone who opened an email)
  Finance says:    "We have 12,000 active customers" (paid in last 12 months)
  Board asks:      "How many customers do we have?"
  Answer:           "It depends who you ask." ← governance failure
```

### Proportional governance in practice
```
Strict governance (Finance models):
  ✅ Owner must approve all changes
  ✅ Every column has a documented definition
  ✅ dbt tests run on every PR
  ✅ Schema changes require ADR review
  ✅ Row-level security enforced
  ✅ Certified in the catalog

Lighter governance (Exploratory analytics):
  ✅ Owner documented
  ✅ Basic dbt tests (not null, unique)
  ⬜ Definitions are best-effort
  ⬜ Schema can evolve freely
  ⬜ Accessible to all analysts
  ⬜ Not certified (marked as "exploratory" in catalog)
```

## Sources
- [[raw/articles/the-6-dimensions-of-data-quality]] - Collibra's data quality dimensions
- [[raw/articles/data-quality-dimensions]] - IBM's data quality dimensions overview
