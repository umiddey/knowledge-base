# Data Architecture Wiki Index

Master index of all concepts and connections in the data-architecture knowledge base.

## Concepts

### Layering and Platform Architecture
- [[data-platform-layers]] - Raw/standardized/curated/serving layers, medallion architecture
- [[data-warehouse]] - Warehouse pattern, strengths/weaknesses, cloud warehouses
- [[data-lake]] - Lake pattern, object storage, flexibility vs governance
- [[data-lakehouse]] - Combining lake and warehouse with open table formats (Delta/Iceberg/Hudi)
- [[etl-vs-elt]] - Transformation placement, modern data stack, dbt
- [[reverse-etl]] - Pushing analytical outputs back to operational systems

### Data Modeling
- [[dimensional-modeling]] - Fact tables, dimension tables, star/snowflake schemas
- [[grain]] - The most important modeling concept: what one row represents
- [[slowly-changing-dimensions]] - SCD Type 1/2/3 for handling attribute changes over time
- [[data-vault]] - Hubs, links, satellites for auditable enterprise integration
- [[normalization-vs-denormalization]] - Trade-offs for operational vs analytical systems
- [[conformed-dimensions]] - Shared dimensions across subject areas, bus matrix
- [[surrogate-keys]] - System-generated keys for integration and Type 2 history

### Ingestion and Integration
- [[change-data-capture]] - CDC pattern, Debezium, high-fidelity change streams
- [[data-ingestion-patterns]] - Full extract, incremental, CDC, events, files, SaaS
- [[data-contracts]] - Producer/consumer agreements for schema, quality, change process
- [[batch-vs-streaming]] - Trade-offs, when each is appropriate, micro-batch

### Distributed Systems
- [[idempotency]] - Safe reruns through upserts, offset tracking, deterministic transforms
- [[eventual-consistency]] - CAP awareness, when stale data is acceptable
- [[checkpointing-and-replay]] - Recovery from failure without data loss

### Governance and Trust
- [[data-governance]] - Ownership, glossary, quality, proportional governance, DAMA-DMBOK
- [[data-quality]] - Six dimensions: accuracy, completeness, timeliness, consistency, validity, uniqueness
- [[data-lineage]] - OpenLineage, tracing data from source to output
- [[data-catalog]] - Atlan, Collibra, DataHub, OpenMetadata — discovery and metadata management
- [[master-data-management]] - MDM patterns: registry, consolidation, coexistence, centralized

### Security and Access
- [[access-control]] - RBAC, ABAC, row-level and column-level security
- [[data-masking]] - Dynamic masking, static masking, tokenization

### Metrics and Serving
- [[semantic-layer]] - Governed metric definitions, solving metric fragmentation
- [[data-marts]] - Domain-focused dimensional serving models

### Operations and Design
- [[data-observability]] - Freshness, volume, schema monitoring (Monte Carlo, Soda, Elementary)
- [[platform-reliability]] - SLI/SLO/SLA, incident response, failure isolation
- [[cost-optimization]] - FinOps, right-sizing, storage vs compute trade-offs
- [[architecture-decision-records]] - ADR template, decision framework, anti-patterns
- [[data-mesh]] - Domain ownership, data as product, federated governance

## Connections

- [[modeling-and-governance]] - How governance decisions shape modeling choices
- [[ingestion-and-distributed-systems]] - Distributed systems concerns in ingestion patterns
- [[security-and-serving]] - Sensitivity classification and serving layer design
- [[reliability-and-observability]] - How observability enables reliability through SLOs
- [[cost-and-architecture-choices]] - How every architecture decision creates cost structures
- [[data-mesh-and-operating-model]] - How data mesh connects to org design and delivery
