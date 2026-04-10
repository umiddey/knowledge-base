# Ingestion and Distributed Systems

Every data ingestion pattern operates across distributed system boundaries — network calls, API integrations, file transfers, and event streams. Understanding how distributed systems behave under failure directly affects ingestion design decisions. The architect who cannot explain what happens when an API call times out during a CDC pipeline is designing blind.

## Why this connection matters

Ingestion is the first place where distributed systems theory meets practical data engineering. An API pull may timeout and retry, potentially creating duplicates. A CDC connector may lose its position and need to replay from a checkpoint. An event stream may deliver messages out of order. File loads may arrive partially. Every one of these scenarios requires the ingestion layer to be designed with distributed systems concerns in mind: idempotency, ordering guarantees, error handling, and recovery strategies.

The choice of ingestion pattern also determines which distributed systems problems are most acute. CDC requires careful ordering and offset management. Event-driven ingestion requires schema versioning and deduplication. File-based loads require validation and atomicity checks. Understanding these trade-offs helps the architect choose the right pattern and design appropriate safeguards.

## Key insights

- Every ingestion boundary is a distributed system boundary that can fail
- Idempotency is the primary defense against retry-induced duplicates at ingestion time
- CDC pipelines must handle ordering, offset management, and connector restarts
- Event streams need schema registries and deduplication logic
- File loads need validation and atomicity to prevent partial file processing
- Checkpointing enables safe replay when ingestion fails partway through

## Concepts Linked
- [[data-ingestion-patterns]] - the five main ingestion patterns and their trade-offs
- [[idempotency]] - the core defense against distributed systems failures in ingestion
- [[change-data-capture]] - CDC as a high-fidelity but complex ingestion pattern
- [[checkpointing-and-replay]] - recovery mechanisms for failed ingestion pipelines
- [[eventual-consistency]] - the consistency model of most ingestion patterns
- [[data-contracts]] - contracts protect ingestion boundaries from silent breakage

## Examples

### Failure scenario: CDC connector restart
```
What happens when a Debezium connector reading PostgreSQL WAL crashes and restarts?

Without idempotency:
  1. Connector processes events at LSN 24023000-24023456
  2. Crash at LSN 24023456 (before committing offset)
  3. Restart → re-reads from LSN 24023000 (last committed offset)
  4. Events 24023000-24023456 are re-inserted into the warehouse
  5. dim_customer now has DUPLICATE rows → SUM(amount) is inflated

With idempotency:
  1-3. Same crash and restart
  4. Warehouse uses MERGE (not INSERT) with event_id as dedup key
  5. Re-delivered events match existing rows → no duplicates created
  6. Analysts never notice the connector restarted

Design principle: Every ingestion pipeline should assume it WILL run twice.
```

### Ingestion pattern → distributed systems concerns
```
Pattern: Full Extract
  Failure mode: Source API rate limits or timeouts
  Defense: Backoff retry, pagination, atomic swap (write to temp, then rename)

Pattern: Incremental Load
  Failure mode: Watermark not updated after partial load
  Defense: Transactional watermark update (update watermark AFTER load commits)

Pattern: CDC (Debezium)
  Failure mode: Connector loses position, schema change in source
  Defense: Checkpointing (LSN offsets), schema registry, dead letter queue

Pattern: Event-driven (Kafka)
  Failure mode: Out-of-order delivery, consumer lag, partition rebalancing
  Defense: Idempotent consumer, schema registry, consumer group monitoring

Pattern: File-based (S3/FTP)
  Failure mode: Partial file upload, unexpected format
  Defense: Atomic rename (write to .tmp, rename on complete), schema validation
```

### The "what happens when..." checklist for ingestion boundaries
```
For every new ingestion pipeline, answer these questions:
  □ What happens if the source API returns a 503?  → retry with backoff
  □ What happens if the network drops mid-transfer?  → idempotent retry
  □ What happens if the source schema changes?       → contract validation alerts
  □ What happens if we process the same file twice?  → deduplication key
  □ What happens if a record fails validation?        → dead letter queue
  □ How do we know the ingestion is healthy?          → freshness monitoring
```

## Sources
- [[raw/articles/data-engineering-was-hard-until-i-learned-these-15]] - system design concepts for data platforms
- [[raw/articles/enterprise-integration-patterns]] - enterprise integration patterns
