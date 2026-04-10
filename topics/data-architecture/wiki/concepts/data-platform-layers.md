# Data Platform Layers

A data platform is organized into distinct layers, each with a clear responsibility. This layered architecture is the single most important structural pattern in data engineering — it separates raw source fidelity from business-ready usability and ensures that each stage of data processing has well-defined inputs, outputs, and quality expectations.

The most common layer model includes: source, ingestion, raw/landing, standardized, curated/modeled, serving/semantic, governance/metadata, and platform operations. The medallion architecture (bronze/silver/gold) popularized by Databricks is a specific naming convention for the same fundamental pattern. The key insight is that each layer has a job, and mixing responsibilities across layers creates trust and maintainability problems.

Without clear layering, every new team builds its own path from source to report, and the platform becomes inconsistent. With clear layering, teams can build on shared foundations and trust that data flowing through the system has been processed according to defined standards.

## Key Points
- Raw layer preserves source truth for replay, audit, and troubleshooting — never treat it as business-ready
- Standardized layer handles type casting, deduplication, ID mapping, and status normalization
- Curated layer shapes data around business meaning (fact tables, dimensions, marts)
- Serving layer exposes governed definitions through semantic models, APIs, and dashboards
- Governance and operations are cross-cutting layers that span the entire platform
- Medallion (bronze/silver/gold) is the Databricks naming convention for the same pattern
- The critical rule: each layer has clear entry and exit criteria — gold should never contain half-cleaned raw quirks

## Related Concepts
- [[data-warehouse]] - warehouses typically implement the curated and serving layers
- [[data-lake]] - lakes typically implement the raw and standardized layers
- [[data-lakehouse]] - lakehouses attempt to cover all layers on a single platform
- [[etl-vs-elt]] - transformation placement determines which layers do the work
- [[data-observability]] - each layer needs its own quality checks and monitoring
- [[data-governance]] - governance spans all layers with different strictness levels

## Examples

### Medallion architecture in practice (Databricks-style)
```
Bronze (raw):      s3://datalake/bronze/stripe_payments/  — raw JSON exactly as received from Stripe API
Silver (standardized): s3://datalake/silver/stripe_payments/ — typed columns, deduplicated, amounts normalized to USD
Gold (curated):    s3://datalake/gold/fact_payments/        — dimensional fact table joined with dim_customer, dim_date
```

### Layer responsibility failure
A common anti-pattern: an analyst queries the bronze layer directly and builds a dashboard. The raw Stripe JSON has nested objects, duplicate events (webhook retries), and amounts in multiple currencies. The dashboard shows inflated revenue by 40%. The rule: **bronze is never business-ready.** If a consumer needs data, they consume from silver or gold.

### Entry/exit criteria example
| Layer | Entry Criteria | Exit Criteria |
|-------|---------------|---------------|
| Raw | Source data landed in original format | File integrity verified, schema registered |
| Standardized | Raw data available | Types cast, deduplicated, IDs mapped to canonical form |
| Curated | Standardized data available | Grain defined, dimensions conformed, quality tests pass |
| Serving | Curated models certified | Access controls applied, semantic definitions published |

## Sources
- [[raw/articles/what-is-medallion-architecture]] - Databricks medallion architecture detailed explanation
- [[raw/articles/data-engineering-was-hard-until-i-learned-these-15]] - system design concepts for data platforms
