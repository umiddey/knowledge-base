# Surrogate Keys

Surrogate keys are system-generated identifiers created inside the data warehouse, distinct from the natural business keys that come from source systems. A customer might have customer_id "CUST-4521" from the CRM and "USR-88901" from the ecommerce platform — the warehouse creates a single surrogate customer_key (e.g., 101928) to represent the unified customer entity.

Surrogate keys are essential for Type 2 slowly changing dimensions (each historical version gets its own surrogate key), for integrating entities across multiple source systems with different natural keys, and for decoupling warehouse identity from source-system quirks. They make joins faster (integer keys vs string keys) and more stable (source system changes don't cascade through the warehouse).

## Key Points
- System-generated keys created inside the warehouse, separate from source natural keys
- Essential for Type 2 SCD — each historical version needs its own unique key
- Enable integration across multiple sources with different natural key formats
- Integer surrogate keys are faster for joins than string-based natural keys
- Decouple warehouse identity from source system changes
- Data vault uses hash-based surrogate keys for deterministic cross-source matching

## Related Concepts
- [[slowly-changing-dimensions]] - surrogate keys enable Type 2 history tracking
- [[dimensional-modeling]] - surrogate keys are standard practice in dimensional models
- [[data-vault]] - uses hash-based surrogate keys for reproducible integration

## Examples

### Surrogate keys resolve multi-source identity
```
Source 1 (CRM):    customer_id = "CUST-4521", name = "Acme Corp"
Source 2 (Ecomm):  user_id = "USR-88901",     email = "billing@acme.com"
Source 3 (ERP):    account_no = "ACC-77234",  company = "Acme Corporation"

All three represent the SAME customer. The warehouse creates:

dim_customer:
+---------------+-------------+------------+-----------+------------------+
| customer_key  | customer_id | ecomm_id   | erp_id    | canonical_name   |
+---------------+-------------+------------+-----------+------------------+
| 101928        | CUST-4521   | USR-88901  | ACC-77234 | Acme Corp        |
+---------------+-------------+------------+-----------+------------------+

Now fact_sales (from CRM) and fact_web_sessions (from Ecomm) both JOIN to
customer_key = 101928, enabling unified customer analysis.
```

### Surrogate keys enable Type 2 SCD
```
Without surrogate keys, Type 2 is impossible:
  You'd need to use natural key "CUST-4521" as the primary key,
  but you have TWO rows for that customer (SMB era + Enterprise era).
  Primary keys must be unique.

With surrogate keys:
  customer_key=101 → CUST-4521, segment=SMB,  (2023-01-15 to 2024-06-30)
  customer_key=247 → CUST-4521, segment=Enterprise (2024-07-01 to present)

  fact_sales rows in 2023 → JOIN to customer_key=101 → segment=SMB ✅
  fact_sales rows in 2024 → JOIN to customer_key=247 → segment=Enterprise ✅
```

### Performance: integer vs string joins
```sql
-- Joining on string natural keys (slow)
SELECT * FROM fact_sales f
JOIN dim_customer c ON f.customer_id = c.customer_id;
-- customer_id = 'CUST-4521' → string comparison, hash table is larger

-- Joining on integer surrogate keys (fast)
SELECT * FROM fact_sales f
JOIN dim_customer c ON f.customer_key = c.customer_key;
-- customer_key = 101928 → integer comparison, hash table is smaller, cache-friendlier
-- Typical speedup: 2-5x on large fact tables
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball Group's surrogate key guidance
