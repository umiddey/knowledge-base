# Data Ingestion Patterns

Data ingestion is how data enters the platform from source systems. The choice of ingestion pattern affects data freshness, reliability, replay capability, and operational complexity. The five main patterns are: full extract, incremental load, change data capture (CDC), event-driven ingestion, and file-based batch loads.

The simplest pattern that meets business needs is usually the best choice. Full extract works for small, slowly changing datasets. Incremental load handles larger tables with reliable change markers. CDC provides high fidelity for systems where every change matters. Event-driven ingestion captures application-level behavior in real time. File-based loads remain common in enterprise environments with legacy systems. SaaS connectors provide managed ingestion for common platforms. Each pattern has specific trade-offs around freshness, complexity, and operational burden.

## Key Points
- Full extract: pull everything each time — simple but wasteful at scale
- Incremental load: pull only changes — efficient but needs reliable change markers
- CDC: capture from transaction logs — high fidelity, higher complexity
- Event-driven: applications publish events — good for behavior analysis and low-latency needs
- File-based: files delivered on schedule — still common in enterprise environments
- Choose the simplest pattern that provides enough fidelity for the business need
- Every ingestion boundary should be designed with failure modes in mind

## Related Concepts
- [[change-data-capture]] - CDC is the highest-fidelity ingestion pattern
- [[batch-vs-streaming]] - ingestion pattern determines whether processing is batch or streaming
- [[data-contracts]] - ingestion boundaries benefit from explicit producer-consumer agreements
- [[idempotency]] - ingestion pipelines must handle retries without creating duplicates
- [[data-platform-layers]] - ingested data lands in the raw layer

## Examples

### Choosing the right pattern by source characteristics
| Source | Pattern | Why |
|--------|---------|-----|
| Salesforce (50K records, daily change <1%) | Full extract nightly | Small enough to pull everything; simpler than CDC |
| PostgreSQL orders (10M rows, frequent updates) | CDC via Debezium | Every change matters; deletes must be captured |
| Stripe webhooks (event stream) | Event-driven | Source already publishes events; natural fit |
| Legacy ERP (daily CSV dump via FTP) | File-based batch | Source only supports scheduled file exports |
| Shopify (medium table, updated_at column) | Incremental load | Reliable change marker; CDC would be overkill |

### Incremental load implementation
```sql
-- Track last processed timestamp in a watermark table
CREATE TABLE ingestion_watermarks (
    source_table VARCHAR,
    last_processed_at TIMESTAMP
);
INSERT INTO ingestion_watermarks VALUES ('shopify.orders', '2024-01-14 23:59:59');

-- Each run pulls only new/updated records
SELECT * FROM shopify.orders
WHERE updated_at > (SELECT last_processed_at FROM ingestion_watermarks WHERE source_table = 'shopify.orders');

-- After successful load, update the watermark
UPDATE ingestion_watermarks SET last_processed_at = CURRENT_TIMESTAMP WHERE source_table = 'shopify.orders';
```

### Failure modes at each pattern
```
Full extract:     Source times out → entire load fails → retry entire extract
Incremental:      Watermark not updated after partial load → missed records
CDC:              Connector loses offset → must replay from checkpoint (risk of duplicates)
Event-driven:     Schema changes in event payload → deserialization failure → dead letter queue
File-based:       Partial file uploaded → validation catches incomplete file → reject and alert
```

## Sources
- [[raw/articles/choosing-the-right-data-ingestion-method-batch-str]] - ingestion method comparison
- [[raw/articles/enterprise-integration-patterns]] - enterprise integration patterns for streaming and AI
