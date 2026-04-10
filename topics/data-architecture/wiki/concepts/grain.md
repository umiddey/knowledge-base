# Grain

Grain is the single most important concept in dimensional modeling. It defines exactly what one row in a fact table represents. Without a clear grain statement, measures get double-counted, joins become dangerous, and users misunderstand the data. Every fact table must have its grain stated explicitly before any columns are designed.

A clear grain statement sounds like: "One row in fact_sales represents one product line on one completed customer order." If you cannot state the grain in one simple sentence, the model is not ready. Common grain examples include: one row per order line item, one row per refund event, one row per customer per day, one row per product per store per day (periodic snapshot). Mixed grain — putting order-level totals and line-level quantities in the same fact — is one of the most common and dangerous modeling mistakes.

## Key Points
- Grain defines what one row in a fact table represents
- Must be stated in one clear sentence before designing any columns
- Common grains: transaction (one row per event), periodic snapshot (one row per entity per period), accumulating snapshot (one row per process across stages)
- Mixed grain in a single fact table is a critical modeling error
- Grain determines which measures are additive, semi-additive, or non-additive
- If grain is unclear, reporting will be unstable and unreliable

## Related Concepts
- [[dimensional-modeling]] - grain is the foundation of dimensional model design
- [[slowly-changing-dimensions]] - grain applies to facts; SCD applies to dimension history
- [[data-quality]] - grain validation is a critical quality check on fact tables
- [[conformed-dimensions]] - conformed dimensions work across facts that share the same grain definitions

## Examples

### Three common grain types
```sql
-- 1. TRANSACTION grain: one row per event
-- "One row per product line item per completed order"
CREATE TABLE fact_sales (
    order_key       INT,
    product_key     INT,
    quantity        INT,       -- additive across all dimensions
    net_amount      DECIMAL    -- additive across all dimensions
);

-- 2. PERIODIC SNAPSHOT grain: one row per entity per time period
-- "One row per product per store per day"
CREATE TABLE fact_inventory_daily (
    date_key        INT,
    product_key     INT,
    store_key       INT,
    quantity_on_hand INT,     -- semi-additive (additive by product/store, NOT by date)
    stockout_flag   BOOLEAN
);
-- You SUM quantity_on_hand across products, but NOT across dates
-- (that would double-count inventory)

-- 3. ACCUMULATING SNAPSHOT grain: one row per process lifecycle
-- "One row per order, with milestones updated as the order progresses"
CREATE TABLE fact_order_pipeline (
    order_key           INT,
    customer_key        INT,
    date_placed_key     INT,    -- milestone 1
    date_shipped_key    INT,    -- milestone 2 (NULL until shipped)
    date_delivered_key  INT,    -- milestone 3 (NULL until delivered)
    date_returned_key   INT,    -- milestone 4 (NULL if not returned)
    order_amount        DECIMAL
);
```

### Mixed grain error (critical)
```sql
-- WRONG: mixed grain in one fact table
CREATE TABLE fact_sales_bad (
    order_key    INT,
    product_key  INT,
    quantity     INT,        -- line-item level
    order_total  DECIMAL     -- order level (repeated for every line item!)
);
-- When you SUM(order_total), you get 3x the real total if the order had 3 items
-- This is one of the most common and most dangerous modeling mistakes

-- CORRECT: separate facts at different grains
-- fact_sales: one row per line item (quantity, line_amount)
-- fact_order_totals: one row per order (order_total, tax, shipping)
```

### Grain statement test
```
Can you state the grain in one clear sentence?
  ✅ "One row per product line item per completed customer order"
  ✅ "One row per customer per day"
  ✅ "One row per order tracking its lifecycle from placement to delivery"
  ❌ "It's basically order data with some product info and customer stuff"
     → This model is not ready. Keep refining until you have a clear grain statement.
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball Group's dimensional modeling techniques reference
- [[raw/articles/kimball-dimensional-model]] - building Kimball models with dbt
