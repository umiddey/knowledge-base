# Idempotency

Idempotency means that running the same operation multiple times produces the same result as running it once. In data platforms, this is critical because pipelines retry after failures, orchestration systems may trigger duplicate runs, and network timeouts can cause partial completion. Without idempotent operations, retries create duplicate rows, inflated aggregates, and broken state.

Idempotency is achieved through deterministic keys (natural or surrogate) for upserts, merge/upsert patterns instead of blind inserts, offset tracking to avoid reprocessing, and deterministic transformations that produce the same output given the same input. Every pipeline boundary should be designed with the question: "What happens if this runs twice?"

## Key Points
- Running the same operation multiple times produces the same result as running it once
- Critical because pipelines retry, orchestration triggers duplicates, and networks timeout
- Achieved through upserts (not inserts), offset tracking, and deterministic transformations
- Every pipeline boundary should be tested with the question: "What happens if this runs twice?"
- Kafka's exactly-once semantics provide idempotency at the streaming layer
- Batch pipelines achieve idempotency through overwrite or merge strategies

## Related Concepts
- [[checkpointing-and-replay]] - checkpointing enables idempotent replay from known-good points
- [[change-data-capture]] - CDC pipelines must be idempotent to handle connector restarts
- [[batch-vs-streaming]] - both patterns need idempotency, but streaming makes it harder
- [[data-platform-layers]] - each layer should be designed for idempotent reprocessing

## Examples

### Non-idempotent vs idempotent pipeline
```sql
-- NON-IDEMPOTENT (dangerous): blind INSERT
INSERT INTO fact_sales (order_key, amount)
SELECT order_key, amount FROM staging_sales;

-- If this runs twice (retry after timeout), fact_sales has DUPLICATE rows.
-- SUM(amount) now returns 2x the real revenue. Silent corruption.

-- IDEMPOTENT: MERGE / UPSERT pattern
MERGE INTO fact_sales AS target
USING staging_sales AS source
ON target.order_key = source.order_key
WHEN MATCHED THEN UPDATE SET amount = source.amount
WHEN NOT MATCHED THEN INSERT (order_key, amount) VALUES (source.order_key, source.amount);

-- Runs 1x: inserts all new rows. Runs 2x: matches existing rows, no duplicates.
-- Same result whether it runs once or ten times.
```

### Idempotency in a streaming pipeline
```
Kafka consumer reading payment events:

Non-idempotent consumer:
  1. Read event from Kafka (offset 1000)
  2. INSERT into warehouse
  3. Crash before committing offset
  4. Restart → re-reads from offset 1000 → DUPLICATE INSERT

Idempotent consumer:
  1. Read event from Kafka (offset 1000)
  2. MERGE into warehouse using event_id as dedup key
  3. Commit offset
  4. Even if step 2-3 retry, MERGE prevents duplicates
```

### The "what happens if this runs twice?" checklist
```
For every pipeline boundary, ask:
  □ If the source extraction runs twice, does the target duplicate data?
  □ If the transformation job is re-triggered, are results consistent?
  □ If a CDC connector restarts, does reprocessing corrupt downstream state?
  □ If an Airflow DAG is manually re-run, do downstream metrics stay correct?
  □ If a dbt model runs twice in one hour, are incremental models safe?

If the answer to any of these is "no," the pipeline is NOT idempotent.
```

## Sources
- [[raw/articles/data-engineering-was-hard-until-i-learned-these-15]] - system design concepts including idempotency
