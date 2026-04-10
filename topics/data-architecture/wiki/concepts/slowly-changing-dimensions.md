# Slowly Changing Dimensions (SCD)

Slowly Changing Dimensions handle the reality that business attributes change over time — a customer moves between loyalty tiers, a product changes categories, a sales rep switches regions. Without intentional handling, analytical queries will use current attributes for all historical events, producing wrong results. SCD types give the architect a deliberate strategy for each dimension attribute.

Type 1 overwrites the old value with the new one. Use when history does not matter (correcting a misspelled name). Type 2 creates a new row with effective dates when an important attribute changes, preserving historical truth. This is the most common pattern for analytical systems — it lets you answer "what tier was this customer in when the purchase happened?" Type 3 stores a limited previous value alongside the current value, useful when you only need simple before/after comparison. Most serious analytical platforms use Type 2 for any attribute where historical truth matters for reporting.

## Key Points
- SCD Type 1: Overwrite old value — no history preserved. Use when history does not matter.
- SCD Type 2: New row with effective dates — full history preserved. Most common for analytics.
- SCD Type 2 fields: effective_start_date, effective_end_date, is_current flag
- SCD Type 3: Store previous value alongside current — limited history, simple comparison only
- The key question: Does the business care what was true at the time of the event?
- If yes, Type 2 is usually required. If no, Type 1 suffices.
- Surrogate keys are essential for Type 2 — each historical version gets its own key

## Related Concepts
- [[dimensional-modeling]] - SCD is a core technique within dimensional modeling
- [[surrogate-keys]] - surrogate keys enable Type 2 history by giving each version a unique identifier
- [[data-vault]] - data vault satellites are an alternative approach to tracking attribute history
- [[grain]] - SCD affects dimension grain (one business key, multiple surrogate keys over time)

## Examples

### SCD Type 1: Overwrite (no history)
```sql
-- Before: customer "Acme Corp" had segment = 'SMB'
UPDATE dim_customer SET segment = 'Enterprise' WHERE customer_id = 'CUST-4521';
-- After: segment = 'Enterprise'. The SMB history is GONE.

-- Use case: correcting a misspelled name, fixing a data entry error
-- BAD use: tracking loyalty tier changes (you lose historical truth)
```

### SCD Type 2: New row with history (most common for analytics)
```
dim_customer (Type 2 on segment column):
+--------------+-------------+---------+-----------+----------------+----------------+------------+
| customer_key | customer_id | name    | segment   | effective_from | effective_to   | is_current |
+--------------+-------------+---------+-----------+----------------+----------------+------------+
| 101          | CUST-4521   | Acme    | SMB       | 2023-01-15     | 2024-06-30     | false      |
| 247          | CUST-4521   | Acme    | Enterprise| 2024-07-01     | 9999-12-31     | true       |
+--------------+-------------+---------+-----------+----------------+----------------+------------+

-- Now you can answer: "What was Acme's segment when they placed this order in March 2024?"
SELECT f.amount, c.segment
FROM fact_sales f
JOIN dim_customer c ON f.customer_key = c.customer_key
WHERE f.order_date BETWEEN '2024-03-01' AND '2024-03-31'
  AND c.customer_id = 'CUST-4521';
-- Returns: segment = 'SMB' (the historically correct value)
```

### SCD Type 3: Previous value only
```
dim_customer (Type 3 on segment column):
+-------------+---------+-------------+-----------------+
| customer_id | name    | segment     | previous_segment|
+-------------+---------+-------------+-----------------+
| CUST-4521   | Acme    | Enterprise  | SMB             |
+-------------+---------+-------------+-----------------+
-- Can answer "what changed?" but not "when did it change?" or full history
-- Useful only for simple before/after reporting
```

### dbt macro for Type 2
```sql
-- dbt snapshot for automatic Type 2 tracking
{% snapshot dim_customer_snapshot %}
{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='last_modified_at'
    )
}}
SELECT * FROM {{ source('crm', 'customers') }}
{% endsnapshot %}
-- Automatically creates effective_from, effective_to, dbt_valid_current columns
```

## Sources
- [[raw/articles/slowly-changing-dimensions-in-data-warehouse]] - comprehensive SCD types and implementation
- [[raw/articles/dimensional-modeling-techniques]] - Kimball Group's SCD guidance
