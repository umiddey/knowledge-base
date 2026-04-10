# Cost Optimization

Every architecture decision creates a cost structure. Streaming costs more than batch. Keeping raw data forever costs more than tiered retention. Materializing too many marts wastes compute and storage. Bad partitioning makes queries expensive. The architect's job is not to minimize cost — it is to ensure that cost is proportional to business value.

Common cost drivers include compute (warehouse query processing, transformation jobs), storage (raw retention, duplicated layers), data transfer (cross-region movement), licensing (third-party tools), and over-processing (refreshing data nobody uses). FinOps practices apply to data platforms: visibility (know what each workload costs), optimization (right-size warehouses, auto-suspend, tiered storage), accountability (teams own their costs), and forecasting (predict future costs from growth patterns). The question is never "how do we make cost tiny?" — it is "is the cost proportional to the business value?"

## Key Points
- Every architecture decision creates a cost structure
- Main drivers: compute, storage, data transfer, licensing, over-processing
- Streaming costs more than batch; large warehouses cost more than auto-suspended ones
- FinOps practices: visibility, optimization, accountability, forecasting
- Right-size warehouses, use auto-suspend, implement tiered storage, monitor idle resources
- The question: "Is the cost proportional to the business value?"

## Related Concepts
- [[batch-vs-streaming]] - streaming is almost always more expensive than batch
- [[data-platform-layers]] - each layer has different cost characteristics
- [[platform-reliability]] - reliability and cost often trade off against each other
- [[data-lakehouse]] - lakehouses can reduce costs by unifying lake and warehouse

## Examples

### Snowflake cost breakdown
```
Monthly data platform spend: $45,000

Breakdown:
  Warehouse compute:    $28,000 (62%)  ← largest driver
    - ETL warehouse (LARGE, 4hrs/day):     $7,200
    - BI warehouse (MEDIUM, 12hrs/day):     $10,800
    - Ad-hoc queries (SMALL, always on):    $5,400  ← AUTO-SUSPEND THIS
    - Data science (XL, 2hrs/day):          $4,600

  Storage:               $3,500 (8%)
    - Raw layer (5TB, 90-day retention):    $1,150
    - Curated (500GB):                      $175
    - Duplicated test/staging data:          $2,175  ← CLEAN THIS UP

  Data transfer:         $1,500 (3%)
  Tool licensing:        $12,000 (27%)  — dbt Cloud, Monte Carlo, Fivetran

Quick wins (save $8,000/month):
  1. Auto-suspend ad-hoc warehouse after 5 min:     saves $4,600/month
  2. Clean up duplicated test/staging data:          saves $2,175/month
  3. Reduce ETL warehouse to MEDIUM (right-sized):   saves $1,225/month
```

### Partitioning impact on query cost
```sql
-- Bad partitioning: partitioned by customer_id (2M distinct values)
-- Each query scans all 2M tiny files regardless of filter
SELECT SUM(amount) FROM fact_sales WHERE order_date = '2024-01-15';
-- Scans: 2 TB. Cost: $12. Time: 45 min.

-- Good partitioning: partitioned by order_date (365 values/year)
SELECT SUM(amount) FROM fact_sales WHERE order_date = '2024-01-15';
-- Scans: 5 GB (partition pruning). Cost: $0.03. Time: 3 seconds.
-- 400x cheaper, 900x faster.
```

### The "is cost proportional to value?" test
```
Pipeline: Marketing attribution model
  Cost: $3,500/month (large warehouse, complex joins, 4x daily refresh)
  Value: Optimizes $2M/month in ad spend. Attribution insights drive 15% budget reallocation.
  Verdict: YES. $3,500 cost is proportional to $300K estimated ROI.

Pipeline: Legacy inventory report
  Cost: $800/month (medium warehouse, daily refresh, 500GB of raw data retained)
  Value: Last viewed 3 months ago. No active consumers.
  Verdict: NO. Deprecate or reduce refresh frequency to weekly.
```

## Sources
- [[raw/articles/intro-key-concepts]] - Snowflake cost model (credits, warehouse sizing)
- [[raw/articles/state-of-workflow-orchestration-ecosystem-2025]] - orchestration tool comparison
