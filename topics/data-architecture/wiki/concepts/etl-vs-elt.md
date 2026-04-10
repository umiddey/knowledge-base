# ETL vs ELT

ETL (Extract, Transform, Load) and ELT (Extract, Load, Transform) represent two approaches to where transformation logic lives in a data pipeline. The distinction is not academic — it affects data retention, replay capability, lineage clarity, operational complexity, and cost.

In ETL, data is transformed before loading into the target system. This was the standard when warehouse compute was expensive and teams wanted strict pre-processing. In ELT, raw data is loaded first and transformations run inside the analytical platform using its compute power. ELT has become the modern default because it preserves raw data for replay, leverages cheap warehouse compute, and is often simpler for analytics teams to manage using SQL-based tools like dbt. The real question is not which pattern is "right" — it is where the transformation is easiest to understand, where lineage is clearest, where quality checks run best, and what is cheapest to operate.

## Key Points
- ETL transforms before loading — good for strict pre-processing, weaker for raw retention
- ELT loads first then transforms inside the platform — preserves raw data, leverages warehouse compute
- dbt has popularized the ELT pattern with version-controlled SQL models, tests, and documentation
- The real question: where is transformation easiest to understand, debug, and maintain?
- Most modern platforms use ELT for analytics workloads but may still use ETL for specific integration needs
- dbt organizes models into staging, intermediate, and mart layers with configurable materialization

## Related Concepts
- [[data-platform-layers]] - transformation placement determines layer responsibilities
- [[data-warehouse]] - warehouses provide the compute for ELT transformations
- [[data-lineage]] - ELT with dbt generates automatic lineage from ref() calls
- [[data-quality]] - dbt tests run quality checks at each transformation stage
- [[dimensional-modeling]] - the curated output of ELT pipelines is often dimensional models

## Examples

### ETL (traditional Informatica-style)
```
Source: CRM exports 50,000 customer records daily as CSV
  → Informatica job validates emails, standardizes phone numbers,
    removes duplicates, maps status codes to canonical values
  → Loads clean records into warehouse dim_customer table
  → Raw CSV is discarded after successful load
Problem: A year later, the business redefines "active customer."
         The original CSV files are gone. Full reprocessing is impossible.
```

### ELT (modern dbt-style)
```sql
-- models/staging/stg_stripe_payments.sql
-- Raw data loaded FIRST, then transformed inside Snowflake
SELECT
    id AS payment_id,
    PARSE_JSON(payload):amount::DECIMAL(10,2) AS amount,
    PARSE_JSON(payload):currency::STRING AS currency,
    PARSE_JSON(payload):created_at::TIMESTAMP AS created_at
FROM {{ source('raw', 'stripe_payments') }}
WHERE _loaded_at >= DATEADD('day', -1, CURRENT_TIMESTAMP())

-- models/marts/fct_payments.sql
-- Business logic applied in a second layer
SELECT
    payment_id,
    amount * exchange_rate AS amount_usd,
    customer_key,
    date_key
FROM {{ ref('stg_stripe_payments') }}
JOIN {{ ref('dim_exchange_rates') }} ON ...
```

### dbt project layering
```
models/
  staging/         — 1:1 with source tables, light type casting
    stg_customers.sql
    stg_orders.sql
  intermediate/    — business logic joins, filtering
    int_customer_orders.sql
    int_order_items.sql
  marts/           — dimensional models for BI consumption
    finance/
      fct_revenue.sql
      dim_customer.sql
    marketing/
      fct_campaigns.sql
```
Each layer materializes differently: staging = views (cheap), intermediate = ephemeral (computed on demand), marts = tables (fast for BI).

## Sources
- [[raw/articles/etl-vs-elt]] - dbt's detailed comparison of ETL and ELT approaches
- [[raw/articles/understanding-dbt]] - comprehensive dbt overview and best practices
- [[raw/articles/analytics-engineering-six-best-practices]] - analytics engineering practices with dbt
