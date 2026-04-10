# Batch vs Streaming

Batch processing moves and transforms data on a schedule (hourly, daily, every 15 minutes). Streaming processes data continuously or near-continuously as it arrives. The choice between them is one of the most consequential architecture decisions, affecting cost, complexity, freshness, and operational burden.

Batch is simpler, cheaper, easier to debug, and easier to replay. It is the right choice when the business can tolerate some delay — which is most of the time. Finance reporting, executive dashboards, and most BI workloads do not need second-level freshness. Streaming is justified when low latency changes business outcomes: fraud detection, real-time alerts, operational monitoring, and event-driven customer experiences. The common mistake is choosing streaming because it sounds advanced rather than because the business value of low latency is clear and worth the operational cost.

## Key Points
- Batch: scheduled processing — simpler, cheaper, easier to debug and replay
- Streaming: continuous processing — lower latency, higher complexity and cost
- Most business workloads do not need streaming-level freshness
- Micro-batch (15-minute refreshes) is often the pragmatic middle ground
- Kafka is the dominant streaming platform; Flink and Spark Streaming are the processing engines
- Choose streaming only when the business value of low latency is provably worth the complexity
- Lambda architecture uses both batch and streaming; Kappa uses streaming only

## Related Concepts
- [[data-ingestion-patterns]] - ingestion pattern determines whether downstream processing is batch or streaming
- [[idempotency]] - streaming pipelines especially need idempotent operations for fault tolerance
- [[eventual-consistency]] - streaming systems often exhibit eventual consistency
- [[cost-optimization]] - streaming is almost always more expensive than batch for the same data

## Examples

### Cost comparison: same workload, batch vs streaming
```
Scenario: Process 1M order events per day

Batch (daily at 2 AM):
  - Snowflake Medium warehouse: 2 credits/hour × 1 hour = 2 credits/day
  - 2 credits × $3/credit × 30 days = $180/month
  - Data fresh by 3 AM: fine for daily reporting

Streaming (Kafka + Flink, 24/7):
  - Kafka cluster (3 brokers): ~$1,500/month
  - Flink cluster (3 task managers): ~$800/month
  - Monitoring and ops overhead: ~$500/month
  - Total: ~$2,800/month

Same data, 15x the cost. Only justified if the business ACTUALLY needs sub-minute freshness.
```

### When streaming IS justified
```
Fraud detection:
  Batch approach:   Fraud detected tomorrow → transaction already completed → money lost
  Streaming approach: Fraud detected in 200ms → transaction blocked → money saved
  If fraud losses > streaming cost, streaming is justified.

Real-time inventory:
  Batch approach:   Stockout detected in morning report → already disappointing customers
  Streaming approach: Low stock triggers reorder in real time → continuous availability

Executive dashboard:
  Batch approach:   Data updated every 15 minutes → executives check once/day anyway
  Streaming approach: Complete waste of money. Use micro-batch.
```

### Micro-batch: the pragmatic middle ground
```sql
-- dbt Cloud job running every 15 minutes
-- Gives near-real-time freshness without streaming complexity
-- Cost: same warehouse runs 4x/hour but auto-suspends between runs

-- Airflow DAG
schedule_interval = "*/15 * * * *"  -- every 15 minutes
-- Simpler to debug, replay, and monitor than a Kafka consumer
-- Good enough for 95% of "we need fresher data" requests
```

## Sources
- [[raw/articles/batch-processing-vs-stream-processing-architecture]] - detailed trade-off analysis
- [[raw/articles/exactly-once-semantics-are-possible-heres-how-apac]] - Kafka exactly-once semantics
