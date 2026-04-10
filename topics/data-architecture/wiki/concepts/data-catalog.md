# Data Catalog

A data catalog is an organized inventory of data assets that helps users discover, understand, and manage available data. It stores metadata (descriptions, owners, lineage, quality status, sensitivity) and makes it searchable and navigable. Without a catalog, finding the right dataset relies on tribal knowledge, and trusting it relies on guesswork.

The catalog landscape includes commercial tools (Atlan, Collibra, Alation, Secoda) and open-source options (DataHub, OpenMetadata). A good catalog provides automated metadata ingestion (not manual entry), search and discovery, lineage visualization, ownership tracking, quality status integration, glossary management, and usage analytics. The catalog is the discovery layer that makes a data platform usable at scale — without it, even well-modeled data is invisible to most potential consumers.

## Key Points
- Organized inventory of data assets with metadata, search, and discovery
- Makes data findable, understandable, and trustworthy without tribal knowledge
- Key tools: Atlan, Collibra, Alation, DataHub, OpenMetadata, Secoda
- Should automate metadata ingestion rather than relying on manual documentation
- Integrates lineage, quality, ownership, and sensitivity information
- A catalog is the discovery layer that makes the platform usable at scale

## Related Concepts
- [[data-governance]] - catalogs are the primary governance interface for data consumers
- [[data-lineage]] - catalogs visualize lineage for discoverability and troubleshooting
- [[data-quality]] - catalogs show quality status alongside dataset information
- [[data-observability]] - observability data feeds into catalogs for health visibility

## Examples

### What a catalog entry looks like (Atlan-style)
```
Dataset: marts.finance.fct_revenue
┌─────────────────────────────────────────────────────────────┐
│ Description: Revenue fact table at invoice line item grain   │
│ Owner: finance-data-team@company.com                        │
│ Certified: ✅ Yes (reviewed by Finance)                      │
│ Freshness: Updated daily at 3 AM UTC                        │
│ Quality:     12/12 tests passing                            │
│ Sensitivity: Internal                                      │
│                                                             │
│ Lineage:                                                    │
│   source('stripe', 'payments') → stg_payments → this table │
│   source('salesforce', 'accounts') → dim_customer → here   │
│                                                             │
│ Columns:                                                    │
│   revenue_key     INT       PK, surrogate key               │
│   customer_key    INT       FK → dim_customer               │
│   date_key        INT       FK → dim_date                   │
│   amount          DECIMAL   Revenue in USD                  │
│   refund_flag     BOOLEAN   True if this row is a refund    │
│                                                             │
│ Used by:                                                    │
│   Revenue dashboard (Looker) — 47 weekly users             │
│   Executive P&L report (Tableau) — 12 weekly users          │
│   Finance close workbook — used monthly                     │
│                                                             │
│ Tags: #finance #certified #revenue #daily-refresh           │
└─────────────────────────────────────────────────────────────┘
```

### Finding data without a catalog
```
Analyst (new hire): "I need to find customer revenue data."
Without catalog: Slack #data-help → "Try fct_rev? Or fct_revenue? Or the one in the finance schema? Ask Dave, he knows."
With catalog:    Search "customer revenue" → fct_revenue is the top result, certified, with documentation.
```

## Sources
- [[raw/articles/data-catalog-tools]] - comprehensive catalog tool comparison
