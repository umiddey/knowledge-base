# Change Data Capture (CDC)

CDC captures inserts, updates, and deletes from a source system's transaction log or similar mechanism, providing high-fidelity change streams with minimal impact on the source. Unlike incremental loads that rely on timestamps, CDC captures every change including deletes and corrections, preserving the full sequence of operations.

Debezium is the leading open-source CDC platform, built on Kafka Connect. It captures changes from PostgreSQL, MySQL, SQL Server, MongoDB, and other databases, streaming them as events to Kafka topics. CDC is ideal when source change history matters, when lower-latency ingestion is needed, or when the full fidelity of source operations must be preserved. However, CDC adds operational complexity: ordering matters, duplicate handling matters, and debugging is harder than with simple batch pulls.

## Key Points
- Captures every insert, update, and delete from source transaction logs
- Higher fidelity than timestamp-based incremental loads (catches deletes, corrections)
- Minimal impact on source systems — reads transaction logs, not application queries
- Debezium is the leading open-source CDC tool, built on Kafka Connect
- Good for near-real-time needs and history-aware processing
- Operational complexity: ordering, duplicate handling, and debugging are harder than batch
- Requires expertise to maintain connectors, handle schema changes, and manage offsets

## Related Concepts
- [[data-ingestion-patterns]] - CDC is one of several ingestion patterns
- [[idempotency]] - CDC pipelines must be idempotent to handle reprocessing safely
- [[data-platform-layers]] - CDC data typically lands in the raw layer first
- [[batch-vs-streaming]] - CDC bridges the gap between batch and streaming patterns

## Examples

### Debezium CDC pipeline: PostgreSQL → Kafka → Snowflake
```yaml
# Debezium connector configuration
connector.class: io.debezium.connector.postgresql.PostgresConnector
database.hostname: prod-postgres.internal
database.dbname: orders_db
database.user: cdc_replication_user
slot.name: debezium_orders_slot
publication.name: orders_publication
table.include.list: public.orders, public.order_items, public.customers

# Captures every INSERT, UPDATE, DELETE from the PostgreSQL WAL (write-ahead log)
# Streams change events to Kafka topic: debezium.orders_db.public.orders
```

### CDC event payload
```json
{
  "payload": {
    "before": {"id": 10023, "status": "pending", "amount": 299.99},
    "after":  {"id": 10023, "status": "shipped", "amount": 299.99},
    "op": "u",           // "u" = update, "c" = create, "d" = delete
    "ts_ms": 1705312800000,
    "source": {
      "db": "orders_db",
      "table": "orders",
      "lsn": 24023456     // Log Sequence Number (offset for checkpointing)
    }
  }
}
// The "before" field shows what changed. This is fidelity that incremental loads lack.
```

### CDC vs incremental load: what you miss
```
Incremental load (WHERE updated_at > last_run):
  ✅ Captures new orders
  ✅ Captures updated orders
  ❌ MISSES deletions (deleted rows don't have updated_at)
  ❌ MISSES the "before" state (only sees current values)

CDC (Debezium reading WAL):
  ✅ Captures new orders (op="c")
  ✅ Captures updated orders (op="u") WITH before/after
  ✅ Captures deletions (op="d") WITH the deleted row's values
  ✅ Captures the full sequence of changes (multiple updates to same row)
```

## Sources
- [[raw/articles/the-complete-guide-to-kafka-change-data-capture-cd]] - complete Kafka CDC guide
