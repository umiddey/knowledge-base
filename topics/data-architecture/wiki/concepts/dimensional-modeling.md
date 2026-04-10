# Dimensional Modeling

Dimensional modeling is the dominant approach for structuring data in analytical systems, designed to make business data easy to understand and safe to analyze. Introduced by Ralph Kimball in 1996, it organizes data into fact tables (measurable business events) and dimension tables (descriptive context), typically arranged in a star schema pattern.

A fact table stores business events — one row per sale, per refund, per website session. Each fact has a defined grain (what one row represents), foreign keys to dimensions, and numeric measures that can be aggregated. Dimension tables provide descriptive context — customer details, product attributes, store information, date hierarchies. The star schema puts the fact table in the center with dimensions around it, enabling analysts to slice data by any combination of dimensions without complex joins. The snowflake schema normalizes dimensions further, which can reduce redundancy but creates more joins and is harder for business users.

## Key Points
- Fact tables store measurable business events with a defined grain
- Dimension tables provide descriptive context for slicing and filtering
- Grain is the single most important concept — what exactly does one row represent?
- Star schema: fact in the center, dimensions around it — easiest for BI and analysts
- Snowflake schema: normalized dimensions — less redundancy but harder to use
- Conformed dimensions enable cross-subject-area analysis
- Kimball's approach remains the gold standard for warehouse presentation layers

## Related Concepts
- [[grain]] - the foundational concept that determines fact table design
- [[slowly-changing-dimensions]] - how dimension attributes change over time
- [[conformed-dimensions]] - shared dimensions across subject areas
- [[surrogate-keys]] - warehouse-generated keys that enable dimensional modeling
- [[normalization-vs-denormalization]] - the trade-off that dimensional modeling resolves for analytics
- [[semantic-layer]] - dimensional models feed semantic layers for governed metrics

## Examples

### Star schema: e-commerce sales
```
                    +------------------+
                    | dim_customer     |
                    |------------------|
                    | customer_key (PK)|
                    | customer_id (BK) |
                    | name             |
                    | segment          |
                    | region           |
                    +--------+---------+
                             |
+------------------+   +-----+--------+   +------------------+
| dim_product      |   | fact_sales   |   | dim_date         |
|------------------|   |--------------|   |------------------|
| product_key (PK) |<--| product_key  |-->| date_key (PK)    |
| product_id (BK)  |   | customer_key |   | calendar_date    |
| name             |   | date_key     |   | month_name       |
| category         |   | store_key    |   | quarter          |
| subcategory      |   |--------------|   | year             |
+------------------+   | quantity (A) |   +------------------+
                       | amount   (A) |
                       | discount (A) |   +------------------+
                       +-----+--------+   | dim_store        |
                             |            |------------------|
                             +----------->| store_key (PK)   |
                                          | store_id (BK)    |
                                          | name             |
                                          | region           |
                                          +------------------+
```
(A) = additive measure. Every query joins fact to one or more dimensions.

### Fact table with defined grain
```sql
-- Grain statement: "One row per product line item per completed order"
CREATE TABLE fact_sales (
    order_key       INTEGER REFERENCES dim_order(order_key),
    product_key     INTEGER REFERENCES dim_product(product_key),
    customer_key    INTEGER REFERENCES dim_customer(customer_key),
    date_key        INTEGER REFERENCES dim_date(date_key),
    store_key       INTEGER REFERENCES dim_store(store_key),
    quantity        INTEGER NOT NULL,    -- additive
    unit_price      DECIMAL(10,2),       -- additive
    discount_amount DECIMAL(10,2),       -- additive
    net_amount      DECIMAL(10,2)        -- additive (quantity * unit_price - discount)
);

-- Valid query: total sales by region and month
SELECT d.region, dt.month_name, SUM(f.net_amount)
FROM fact_sales f
JOIN dim_customer d ON f.customer_key = d.customer_key
JOIN dim_date dt ON f.date_key = dt.date_key
GROUP BY d.region, dt.month_name;
```

### Snowflake schema: normalized dimensions
```
Star schema (denormalized):
  dim_product: product_key, product_id, name, category, subcategory, department
  — 1 table, 1 join, easy for analysts

Snowflake schema (normalized):
  dim_product: product_key, product_id, name, subcategory_key
  dim_subcategory: subcategory_key, subcategory_name, category_key
  dim_category: category_key, category_name, department_key
  dim_department: department_key, department_name
  — 4 tables, 4 joins, less redundancy but harder for business users
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball Group's official dimensional modeling techniques
- [[raw/articles/kimball-dimensional-model]] - building Kimball dimensional models with dbt
