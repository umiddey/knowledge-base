# Normalization vs Denormalization

Normalization reduces data duplication by separating entities into distinct tables with clear relationships. It is the standard for operational (transactional) systems where update consistency matters. Denormalization intentionally repeats descriptive values to make data easier to query and analyze. It is the standard for analytical systems where read performance and usability matter.

In an operational database, a customer's address lives in one place so that updates are clean and consistent. In a data warehouse, that same customer's name, segment, and region may appear alongside every order fact because analysts should not need six joins to answer "sales by region." The correct choice depends on the use case: normalization for writes, denormalization for reads. Neither is universally better. The architect's job is to choose the right approach for each layer and consumer.

## Key Points
- Normalization: reduces duplication, enforces consistency, good for transactional systems
- Denormalization: repeats values for easier querying, good for analytical systems
- Operational systems → normalized (3NF); Analytical systems → denormalized (star schema)
- Normalization hurts analytics because it requires too many joins and confuses business users
- Denormalization creates some redundancy but makes reporting simpler and faster
- The trade-off: data consistency vs query simplicity — choose based on the consumer

## Related Concepts
- [[dimensional-modeling]] - dimensional modeling is a structured form of denormalization for analytics
- [[data-warehouse]] - warehouses typically use denormalized models for BI workloads
- [[data-vault]] - data vault uses normalized structures upstream, before presentation-layer denormalization
- [[grain]] - grain determines the right level of denormalization for each fact table

## Examples

### Same data, two approaches: customer orders
```sql
-- NORMALIZED (3NF — for OLTP / transactional systems)
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    segment VARCHAR(20),
    region VARCHAR(50)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date DATE,
    total_amount DECIMAL
);
-- Update: one place to change customer segment
-- Query "sales by region": requires JOIN

-- DENORMALIZED (star schema — for analytics / warehouse)
CREATE TABLE fact_sales (
    order_key INT,
    customer_key INT,
    date_key INT,
    quantity INT,
    amount DECIMAL,
    -- dimensional attributes baked in for fast reads:
    customer_name VARCHAR(100),  -- repeated for every order
    customer_segment VARCHAR(20),-- repeated for every order
    customer_region VARCHAR(50)  -- repeated for every order
);
-- Update: changing customer segment updates many rows
-- Query "sales by region": simple GROUP BY, no joins needed
```

### Layer-appropriate normalization
```
Raw layer:        Source format (whatever the source sends) — no normalization decisions
Standardized:     Lightly cleaned — types cast, deduplicated, but still source-shaped
Data Vault:       Normalized (hubs, links, satellites) — full traceability
Curated/Marts:    Denormalized (star schemas) — optimized for BI consumers
Semantic layer:   View-level abstraction — no physical redundancy, governed definitions

The pattern: normalize upstream for integration, denormalize downstream for consumption.
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball guidance on normalization for analytics
