# Cost and Architecture Choices

Every architecture decision creates a cost structure. The choice between batch and streaming, warehouse and lake, centralized and federated models, materialized and virtual views — each carries cost implications that compound over time. A responsible architect understands these cost structures and can defend them as proportional to business value.

## Why this connection matters

Cost is often treated as an operational concern separate from architecture. In reality, architecture decisions are the primary cost drivers. Streaming order events all day costs more than hourly batch. Keeping every raw clickstream event forever costs more than tiered retention with archiving. Materializing too many marts wastes compute and storage. Bad partitioning makes queries expensive through full table scans. Running large warehouses 24/7 for workloads that execute only during business hours wastes credits.

The architect should be able to answer for every pipeline: what business value does it produce, what does it cost per month, and is the cost proportional to the value? FinOps practices — visibility, optimization, accountability, and forecasting — should be applied to data platform decisions just as they are to infrastructure.

## Key insights

- Streaming is almost always more expensive than batch for the same data
- Warehouse compute is typically the largest cost driver in a data platform
- Right-sizing warehouses and using auto-suspend can cut costs dramatically
- Bad partitioning creates expensive full table scans
- Over-materialization (too many marts, too frequent refreshes) wastes compute and storage
- The question: "Is the cost proportional to the business value?"

## Concepts Linked
- [[cost-optimization]] - FinOps practices and cost management strategies
- [[batch-vs-streaming]] - streaming costs more than batch for equivalent workloads
- [[data-warehouse]] - warehouse compute is usually the biggest cost line item
- [[data-platform-layers]] - each layer has different cost characteristics
- [[platform-reliability]] - reliability and cost often trade off against each other
- [[architecture-decision-records]] - cost implications should be documented in every ADR

## Examples

### Architecture choice → cost structure (3-year projection)
```
Scenario: Process 10TB/day of order events and publish fact_orders, dim_customer, and daily finance marts for a $100M revenue company

Option A: Batch + Snowflake
  Snowflake Enterprise (Medium warehouse, 4hrs/day):     $4,800/month
  Snowflake storage (50TB):                               $625/month
  Fivetran connectors:                                    $2,000/month
  dbt Cloud:                                               $500/month
  Total: ~$8,000/month = $96,000/year = $288K/3 years

Option B: Streaming (Kafka + Flink) + Snowflake
  Kafka cluster (3 brokers, MSK):                        $1,800/month
  Flink cluster (3 task managers, Kinesis):               $900/month
  Snowflake (Small warehouse, streaming sink):            $1,200/month
  Monitoring (Confluent Control Center):                  $500/month
  Operations overhead (staff time for streaming ops):    ~$3,000/month
  Total: ~$7,400/month = $88,800/year = $266K/3 years

Option C: Lakehouse (Databricks)
  Databricks (DBU pricing, 4hrs/day):                    $6,000/month
  S3 storage (50TB):                                      $1,150/month
  Unity Catalog:                                           $300/month
  Total: ~$7,450/month = $89,400/year = $268K/3 years

All three options cost roughly the same over 3 years.
The decision should be based on team skills, workload needs, and where the data lives
— NOT on marginal cost differences that disappear into operational overhead.
```

### The "cost proportionality" test for every pipeline
```
Pipeline inventory review:

| Pipeline                  | Monthly Cost | Active Users | Business Value       | Verdict    |
|---------------------------|-------------|--------------|----------------------|------------|
| Revenue reporting         | $2,400      | 45/week      | Board reporting      | KEEP       |
| Marketing attribution     | $3,500      | 8/week       | $2M ad optimization  | KEEP       |
| Legacy inventory report   | $800        | 0 (3 months) | None                 | DEPRECATE  |
| Customer 360 enrichment   | $1,200      | 12/week      | Sales productivity   | KEEP       |
| Experiment analysis v1    | $400        | 2/month      | Superseded by v2     | DEPRECATE  |
| Fraud detection (stream)  | $5,200      | 24/7 ops     | $500K fraud prevented| KEEP       |

Quick savings from deprecation: $1,200/month = $14,400/year
Bigger savings from right-sizing warehouses and auto-suspend: ~$8,000/month
```

## Sources
- [[raw/articles/intro-key-concepts]] - Snowflake credit model and warehouse sizing
- [[raw/articles/state-of-workflow-orchestration-ecosystem-2025]] - orchestration tool cost comparison
