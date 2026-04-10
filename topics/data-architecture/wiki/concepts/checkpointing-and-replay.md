# Checkpointing and Replay

Checkpointing saves the progress of a running job so it can resume from the last successful point rather than starting over. Replay reprocesses data from a known-good point when corruption or bugs are discovered. Together, these capabilities are what separate a fragile pipeline from a resilient one.

Without checkpointing, a failed large batch job must restart from the beginning, wasting time and compute. Without replay capability, data quality problems persist because there is no way to reprocess from the source. A platform that supports checkpointing and replay has: raw data retention (can always go back to source truth), deterministic transformations (same input always produces same output), offset tracking (knows exactly what has been processed), and idempotent operations (reprocessing does not create duplicates).

## Key Points
- Checkpointing saves job progress so it can resume from the last successful point
- Replay reprocesses data from a known-good point when bugs or corruption occur
- Requires: raw data retention, deterministic transformations, offset tracking, idempotent operations
- Spark streaming checkpoints offsets to Kafka; batch pipelines track last-processed timestamps
- CDC connectors store binlog positions for resume capability
- Without these capabilities, the platform cannot recover gracefully from failure

## Examples

### Spark streaming checkpoint
```python
# Spark Structured Streaming checkpoint to Kafka offsets
spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "orders") \
    .option("startingOffsets", "latest") \
    .load() \
    .writeStream \
    .format("parquet") \
    .option("checkpointLocation", "s3://checkpoints/orders_stream/") \
    .option("path", "s3://datalake/raw/orders/") \
    .trigger(processingTime="5 minutes") \
    .start()

# If the stream crashes, it reads the checkpoint and resumes from the last
# committed offset. No data lost, no duplicates (with idempotent sink).
```

### CDC connector offset recovery
```
Scenario: Debezium connector reading PostgreSQL WAL crashes at LSN 24023456

Without checkpointing:
  Connector restarts → must scan entire WAL from beginning → hours of reprocessing

With checkpointing:
  Connector reads stored offset: LSN=24023456
  Resumes from that exact position in the WAL
  Missed events: 0 (if idempotent sink, even double-delivery is safe)

Kafka Connect stores offsets in:
  - Kafka topic: connect-offsets (default)
  - File: /var/lib/kafka/connect/offsets/
```

### Replay scenario: bug in transformation logic
```
Day 1-30:  Pipeline runs normally. fact_sales contains 30 days of data.
Day 31:    Bug discovered! Discount calculation was wrong for the last 10 days.
           fact_sales shows inflated revenue by 12%.

Without replay capability:
  Option A: Fix the code going forward. Accept 10 days of wrong data forever.
  Option B: Manual SQL UPDATE statements. Risky, untested, error-prone.

With replay capability:
  1. Fix the transformation code
  2. Delete fact_sales for the affected date range (days 21-30)
  3. Replay from raw layer: reprocess days 21-30 with corrected logic
  4. Verify corrected data matches source truth
  5. Total time: 30 minutes. No manual SQL. Fully auditable.
```

## Related Concepts
- [[idempotency]] - replay must be idempotent to avoid creating duplicate state
- [[data-platform-layers]] - the raw layer exists specifically to enable replay
- [[platform-reliability]] - checkpointing is a core reliability pattern
- [[data-observability]] - observability detects when replay is needed
