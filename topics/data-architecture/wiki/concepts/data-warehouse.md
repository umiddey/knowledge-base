# Data Warehouse

A data warehouse is an analytical system optimized for structured reporting and business analysis. It stores cleaned, modeled, historical data from multiple sources and makes it available for BI dashboards, ad-hoc queries, and governed reporting. Warehouses have been the backbone of enterprise analytics since the 1990s and remain central to modern data platforms.

Warehouses excel at structured workloads: complex SQL queries over well-modeled tables, fast aggregations for BI tools, and strong governance capabilities including access control, auditing, and data sharing. Their main limitation is cost at very large scales and less flexibility for raw, semi-structured, or unstructured data. Modern cloud warehouses (Snowflake, BigQuery, Redshift) have addressed many traditional limitations with separation of compute and storage, auto-scaling, and pay-per-query pricing.

## Key Points
- Optimized for structured analytical queries, not transactional workloads
- Strong SQL support, familiar to analysts and BI tools
- Mature security and access control (RBAC, row-level security, dynamic masking)
- Can get expensive at scale — compute costs grow with query complexity and concurrency
- Less flexible for raw, semi-structured data compared to data lakes
- Cloud warehouses (Snowflake, BigQuery, Redshift) separate compute from storage
- Warehouse design should start with consumer needs, not with which tool to buy

## Related Concepts
- [[data-platform-layers]] - warehouses typically serve as the curated and serving layers
- [[data-lake]] - lakes provide flexibility that warehouses lack
- [[data-lakehouse]] - lakehouses attempt to combine warehouse and lake strengths
- [[dimensional-modeling]] - the dominant modeling approach inside warehouses
- [[semantic-layer]] - warehouses often host the semantic layer on top of curated models
- [[cost-optimization]] - warehouse compute is usually the largest cost driver

## Examples

### What a data warehouse actually looks like
```
Internal schema: raw/
  stripe_payments/           ← raw data from source systems
  salesforce_accounts/
  shopify_orders/

Analytical schema: analytics/
  ┌──────────────────────────────────────────────────────────┐
  │ DIMENSION TABLES (descriptive context)                   │
  ├──────────────────────────────────────────────────────────┤
  │ dim_customer: customer_key, name, segment, region, ...   │
  │ dim_product: product_key, category, price, ...           │
  │ dim_date: date_key, day_of_week, month, quarter, year    │
  │ dim_store: store_key, location, manager, ...             │
  └──────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────┐
  │ FACT TABLE (measurable events)                           │
  ├──────────────────────────────────────────────────────────┤
  │ fact_sales:                                              │
  │   customer_key (FK → dim_customer)                       │
  │   product_key (FK → dim_product)                         │
  │   store_key (FK → dim_store)                             │
  │   date_key (FK → dim_date)                               │
  │   quantity, amount, discount                             │
  │   (one row per order line item)                          │
  └──────────────────────────────────────────────────────────┘

A warehouse analyst writes:
  SELECT d.region, SUM(f.amount) FROM fact_sales f
  JOIN dim_customer d ON f.customer_key = d.customer_key
  WHERE f.date_key >= 20240101
  GROUP BY d.region;

That's it. The warehouse IS this structure: star schema with facts and dimensions,
all on managed cloud infrastructure (Snowflake/BigQuery/Redshift).
```

### The warehouse solves the "multiple sources" problem
```
Your company has data scattered across systems:
  - Stripe (payments)
  - Salesforce (customers)
  - Shopify (orders)
  - Google Analytics (web traffic)

Without a warehouse: analysts write queries across 4 different systems,
                      hope the joins work, hope the IDs match up,
                      build the same customer dimension 5 different ways

With a warehouse: all data loaded to one place (fact_sales, dim_customer),
                  star schema is the single agreed-upon structure,
                  analysts write queries once, against one system,
                  everyone uses the same definitions

This is THE fundamental problem a warehouse solves: unified view of scattered data.
```

### Warehouse vs OLTP: same data, different optimization
```
OLTP database (PostgreSQL, your app's database):
  Normalized: customers, orders, order_items (separate tables)
  Optimized for: individual record writes ("INSERT new order")
  Query: SELECT * FROM orders WHERE id = 12345 (one row, 2ms)
  
Data Warehouse (Snowflake):
  Denormalized: fact_sales (all order info + customer + product denormalized into one row)
  Optimized for: bulk aggregations ("SUM sales by region")
  Query: SELECT region, SUM(amount) FROM fact_sales WHERE date >= '2024-01-01' (500M rows, 3 seconds)
  
Same data, opposite structures. The warehouse denormalizes because aggregation is its job.
```

### Why warehouses are expensive (and when they're worth it)
```
Cost structure:
  - Every SQL query scans columns from large tables
  - Scanning 1TB costs money (cloud warehouse pricing: ~$5-10 per TB scanned)
  - A poorly written query scanning 100TB costs $500-1000

Justification:
  - Revenue impact: "sales by region" dashboard guides $100M in budget allocation
  - Cost: $1,000/month for the warehouse
  - ROI: Clear and massive

Unjustified:
  - Dashboard that 2 people check once per quarter
  - Cost: $2,000/month
  - Justification: "We might use it more"
```

## Sources
- [[raw/articles/data-lakes-vs-data-warehouses-what-your-organizati]] - Databricks comparison of warehouse and lake patterns
- [[raw/papers/s0306437924001182]] - Data Lakehouse: A survey and experimental study (ScienceDirect)
- [[raw/articles/intro-key-concepts]] - Snowflake key concepts and architecture
