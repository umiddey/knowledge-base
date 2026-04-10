# Data Lake

A data lake stores large amounts of raw or lightly processed data in flexible formats on cheap object storage (S3, GCS, Azure Blob). Unlike warehouses, lakes accept any format — Parquet, JSON, Avro, CSV, images, logs — without requiring a predefined schema. This makes them ideal for storing raw source data, supporting data science and ML workloads, and enabling replay and reprocessing from the original source shape.

The main risk of data lakes is governance decay. Without discipline, a lake becomes a "data swamp" — a vast collection of undocumented, unowned, inconsistent files that nobody trusts. The lakehouse pattern emerged specifically to address this by adding ACID transactions, schema enforcement, and better query performance on top of lake storage through open table formats (Delta Lake, Apache Iceberg, Apache Hudi).

## Key Points
- Stores raw data in flexible formats (Parquet, JSON, Avro, CSV) on cheap object storage
- Good for data science, ML training, large-scale reprocessing, and raw data retention
- Without governance, lakes degrade into unusable data swamps
- Object storage (S3, GCS, ADLS) is the foundation — cheap, durable, virtually unlimited scale
- Partitioning strategy (typically by date) is critical for query performance
- Open table formats (Delta, Iceberg, Hudi) add warehouse-like capabilities on top of lake storage

## Related Concepts
- [[data-warehouse]] - warehouses provide structure that lakes lack
- [[data-lakehouse]] - lakehouses add warehouse capabilities to lake storage
- [[data-platform-layers]] - lakes typically serve as the raw and standardized layers
- [[data-governance]] - governance is the critical discipline that prevents lake decay
- [[change-data-capture]] - CDC data often lands in the lake's raw layer first

## Examples

### What a data lake actually is
```
A lake is NOT a database. It's a filesystem full of files.

s3://company-datalake/
  stripe_payments/
    2024-01-15/part-001.json         ← raw Stripe webhook payload, exactly as received
    2024-01-15/part-002.json         ← no schema, no types, just files
    2024-01-16/part-001.json
  salesforce_accounts/
    2024-01-15/accounts.csv          ← different format, different structure
    2024-01-16/accounts.csv
  shopify_orders/
    2024-01-15.parquet               ← different format again
    2024-01-16.parquet

That's it. A lake is cheap object storage ($0.023/GB/month in S3) holding raw files.
No schema enforcement. No transactions. No indexing. Just files.

To QUERY this lake:
  - Data scientist: spark.read.json("s3://.../*.json") → loads into Spark → trains ML model
  - Analyst: Can't query it directly. JSON files aren't SQL tables.

To ANALYZE this lake:
  - Someone has to standardize it (cast strings to ints, convert currencies, deduplicate)
  - Then materialize it as a table (Delta Lake, Iceberg) before analysts can query it
  - That process is called "curating the lake"
```

### Why lakes exist: preserve raw data for replay
```
Scenario: 6 months ago, you loaded customer data from Salesforce.
          Today, the business redefines "active customer."
          
Without a lake: You only have the processed/aggregated version.
                Can't recompute the last 6 months with the new definition.
                
With a lake: The original CSV is still in S3 (costs $0.12 to store it for 6 months).
            Reprocess it through the new definition.
            6 months of data recalculated in 2 hours.
            This is why you keep the raw files.
```

### The lake degrades into a swamp
```
A healthy lake (organized, governed):
  s3://company-datalake/
    stripe_payments/       — one owner, schema registered, quality monitored
    salesforce_accounts/   — one owner, SLA defined, documented columns
    shopify_orders/        — one owner, refresh schedule documented

A data swamp (chaos):
  s3://company-datalake/
    misc/                  — nobody remembers why this exists
    old_migration/         — "just in case we need to roll back" (2021)
    team_alpha/            — team disbanded 6 months ago, data still here
    experiments/           — 47 directories, zero documentation, zero ownership
    production/            — Jupyter notebook output dumped alongside actual tables
    
Swamp symptoms: No catalog entries. No owners. No schema. No quality checks.
                Analysts afraid to use the lake. Data scientists keep their own copies.
                The lake becomes an expensive archive, not a working platform.
```

### Lake vs Warehouse: different use cases
```
DATA LAKE (S3, ADLS, GCS):
  Use: Preserve raw data, enable ML training, support exploratory analysis
  Example: Data scientist needs raw customer data + product data to train a churn model
  Problem it solves: "Keep everything in original form so I can experiment"

DATA WAREHOUSE (Snowflake, BigQuery):
  Use: Serve business metrics, power BI dashboards, support routine reporting
  Example: Analyst needs "revenue by region" for the monthly business review
  Problem it solves: "Give me cleaned, modeled data ready to analyze"

The lake stores raw data cheaply. The warehouse serves cleaned data fast.
Most organizations need both. The lakehouse tries to be both in one system.
```

## Sources
- [[raw/articles/data-lakes-vs-data-warehouses-what-your-organizati]] - detailed lake vs warehouse comparison
- [[raw/papers/2107-11152]] - On data lake architectures and metadata management (Sawadogo & Darmont, cited 391x)
