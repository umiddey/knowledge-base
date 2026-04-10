# Data Lakehouse

A data lakehouse combines the flexible storage of a data lake with the structured query capabilities of a data warehouse, using open table formats that add ACID transactions, schema enforcement, and better SQL performance on top of object storage. Rather than maintaining separate lake and warehouse systems, a lakehouse aims to serve both BI and ML workloads from a single platform.

The three main open table formats enabling lakehouse architecture are Delta Lake (Databricks, ACID on Parquet), Apache Iceberg (vendor-neutral, strong schema evolution, multi-engine), and Apache Hudi (optimized for incremental upserts and streaming). Each has different strengths: Delta has the strongest Spark integration, Iceberg has the broadest engine support, and Hudi excels at streaming upserts. The choice between them affects query performance, write behavior, schema evolution, and vendor lock-in risk.

## Key Points
- Combines flexible lake storage with warehouse-like table behavior
- Open table formats (Delta Lake, Apache Iceberg, Apache Hudi) are the enabling technology
- Supports both BI and ML workloads on the same data without separate systems
- ACID transactions, schema enforcement, and time travel on file-based tables
- Reduces data duplication between lake and warehouse layers
- Governance and access control are still maturing compared to dedicated warehouses
- Requires more operational expertise than fully managed warehouse services

## Related Concepts
- [[data-warehouse]] - lakehouses aim to replace separate warehouse layers
- [[data-lake]] - lakehouses build warehouse capabilities on top of lake storage
- [[data-platform-layers]] - medallion architecture (bronze/silver/gold) is the standard lakehouse pattern
- [[etl-vs-elt]] - lakehouses strongly favor the ELT pattern
- [[cost-optimization]] - lakehouses can reduce costs by eliminating separate lake + warehouse

## Examples

### The problem the lakehouse solves: the TWO-SYSTEM nightmare
```
BEFORE lakehouse — you ran TWO separate systems:

Data Lake (S3 + Spark):
  - Raw JSON, Parquet, CSV files dumped in folders
  - Great for ML (train models on raw data)
  - Terrible for BI (no SQL, no transactions, no schema enforcement)
  - Data scientists love it, analysts hate it

Data Warehouse (Snowflake):
  - Structured tables with SQL, ACID transactions, fast aggregations
  - Great for BI (dashboards, reports, ad-hoc queries)
  - Terrible for ML (can't easily train models on warehouse tables)
  - Analysts love it, data scientists hate it

The nightmare:
  1. Same data stored TWICE — once in the lake, once in the warehouse
  2. Data pipeline: Source → Lake → ETL → Warehouse → BI
                      Lake → Spark → ML model
  3. Two copies = drift. The warehouse says 10,000 customers.
     The lake says 10,247 customers. Which is right?
  4. Two systems = two teams, two sets of access controls, two cost centers
  5. Total platform cost: Lake ($5K/mo) + Warehouse ($15K/mo) + ETL tooling ($3K/mo) = $23K/mo
```

### How the lakehouse combines them: ONE system, both workloads
```
AFTER lakehouse — you run ONE system on S3:

s3://company-lakehouse/
  ┌─────────────────────────────────────────────────────────────────┐
  │                     OBJECT STORAGE (S3/ADLS/GCS)               │
  │                                                                 │
  │  All data lives here as Parquet files — cheap, scalable,       │
  │  durable. This is the "lake" part.                             │
  │                                                                 │
  │  But on TOP of these files, you add a METADATA LAYER           │
  │  (Delta Lake, Iceberg, or Hudi) that gives them:              │
  │                                                                 │
  │  ✅ ACID transactions  (atomic MERGE/UPDATE/DELETE)            │
  │  ✅ Schema enforcement  (columns have types, nullability rules) │
  │  ✅ Time travel        (query data as of any past point)        │
  │  ✅ Fast SQL reads     (statistics, partition pruning, caching) │
  │  ✅ Concurrent writes  (multiple writers don't corrupt data)    │
  │                                                                 │
  │  This metadata layer is what makes it a "lakeHOUSE"            │
  │  instead of just a "lake."                                      │
  └─────────────────────────────────────────────────────────────────┘

Now the SAME Parquet files on S3 serve BOTH workloads:

  BI Analyst (via Trino/Snowflake reading Iceberg tables):
    SELECT region, SUM(amount) FROM ice.sales GROUP BY region;
    — Gets fast, transactional, warehouse-like query performance
    — On the SAME files the ML person is using

  Data Scientist (via Spark reading the same Iceberg tables):
    df = spark.read.format("iceberg").load("ice.sales")
    model.fit(df)  # Train ML model directly on the table
    — Gets raw access to all the data for ML training
    — No need to export from a warehouse first

One copy of data. One set of access controls. One governance framework.
```

### The medallion architecture: how data flows through the lakehouse
```
s3://company-lakehouse/

  bronze/                          ← THE LAKE PART
    stripe_payments/               — Raw JSON from Stripe API
      2024-01-15/part-001.parquet  — Exactly as received, no processing
    salesforce_accounts/           — Raw CSV from Salesforce
      2024-01-15/part-001.parquet

  silver/                          ← THE CLEANING PART
    stripe_payments/               — Delta Lake / Iceberg TABLE (not just files)
      _delta_log/                  — Transaction log (this is the magic)
      part-00001.parquet           — Typed, deduplicated, normalized amounts
    salesforce_accounts/           — Same: cleaned, typed, deduplicated

  gold/                            ← THE WAREHOUSE PART
    fact_sales/                    — Star schema fact table (Iceberg TABLE)
      metadata/                    — Schema, partition stats, snapshots
      data/part-001.parquet        — Ready for BI: joined, aggregated
    dim_customer/                  — Dimension table with SCD Type 2

This is why it's called a "lakehouse" — it's a LAKE (S3 + files)
with a HOUSE built on top (metadata layer gives it warehouse properties).

Bronze = lake (raw files, no structure)
Silver = lake + some structure (tables with schemas, but still source-shaped)
Gold = warehouse (star schemas, optimized for BI queries)

All running on the same S3 storage, same access controls, same catalog.
```

### Lakehouse vs warehouse: when to choose which
```
Choose LAKEHOUSE when:
  - You need BOTH BI and ML on the same data
  - You want to eliminate data duplication between lake and warehouse
  - You have Spark/ML workloads AND SQL/BI workloads
  - You're cost-sensitive and want to avoid Snowflake/Databricks compute charges
  - You're on AWS/Azure/GCP and already using S3/ADLS/GCS heavily
  - Example: A company training fraud models AND building finance dashboards

Choose WAREHOUSE when:
  - You're 90% BI/SQL workloads, minimal ML
  - You want fully managed infrastructure (no Spark cluster ops)
  - Your team is SQL-heavy, not Python/Spark-heavy
  - You need the most mature governance and access controls
  - Example: A traditional finance team that only needs reporting and dashboards

Choose LAKE when:
  - You need cheap raw storage with no querying requirements
  - You're doing pure data science / ML, no BI
  - Example: A research team storing experiment logs and training data
```

### Delta Lake: ACID transactions on Parquet (the enabling technology)
```sql
-- Without Delta: appending to a Parquet directory is NOT atomic
-- If a job fails halfway, you have partial files and corrupt reads

-- With Delta Lake: atomic MERGE operation
MERGE INTO gold.dim_customer AS target
USING staged_customers AS source
ON target.customer_id = source.customer_id
WHEN MATCHED AND source.hash <> target.hash THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
-- Either all rows update atomically, or none do. No partial state.
-- This is the "warehouse-like" behavior on top of "lake-like" Parquet files.
```

### When to choose which table format
| Scenario | Best Format | Why |
|----------|------------|-----|
| All-Databricks shop | Delta Lake | Tightest Spark integration, simplest ops |
| Multi-engine (Spark + Trino + Snowflake) | Apache Iceberg | Broadest engine support, vendor-neutral |
| High-volume streaming upserts | Apache Hudi | Optimized for incremental writes on object storage |
| Simple batch analytics on S3 | Any (Delta simplest) | All three handle basic workloads well |

## Sources
- [[raw/articles/apache-hudi-vs-delta-lake-vs-apache-iceberg-lakeho]] - comprehensive table format comparison
- [[raw/papers/s0306437924001182]] - Data Lakehouse: A survey and experimental study (ScienceDirect)
- [[raw/articles/delta-lake-explained-boost-data-reliability-cloud]] - Delta Lake detailed explanation
