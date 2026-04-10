# Data Vault

Data Vault is a modeling pattern designed for historical, auditable integration from many changing sources. It uses three core entity types: hubs (business keys), links (relationships between business keys), and satellites (descriptive attributes and their history). The pattern excels at enterprise-scale integration where multiple source systems provide different views of the same business entities.

Data Vault's strength is traceability: it preserves original business keys, relationship history, and complete attribute change history in a normalized, auditable structure. This makes it valuable for compliance-heavy environments and complex multi-source integration. However, business users typically do not query hubs, links, and satellites directly — they still need friendly presentation models (dimensional models) built on top. Data Vault is an upstream pattern, not a replacement for star schemas in the presentation layer.

## Key Points
- Three entity types: hubs (business keys), links (relationships), satellites (attributes + history)
- Excels at multi-source integration with full auditability and traceability
- Good for compliance-heavy environments where provenance matters
- Not suitable as the final presentation layer — business users need dimensional models on top
- Data loads follow a specific order: hubs and links before satellites
- Data Vault 2.0 added methodology and architecture guidance beyond just modeling
- Can be over-engineered for simpler environments — use when the complexity is justified

## Related Concepts
- [[dimensional-modeling]] - data vault feeds dimensional models in the presentation layer
- [[slowly-changing-dimensions]] - satellites provide a different approach to attribute history
- [[surrogate-keys]] - data vault uses hash-based surrogate keys for cross-source integration
- [[data-ingestion-patterns]] - data vault is often populated from CDC or batch integration patterns

## Examples

### Data Vault entities for a customer-order domain
```
HUB_CUSTOMER:
+-------------------+-------------+-----------+
| customer_hkey (PK)| customer_id | load_date |
+-------------------+-------------+-----------+
| 0xA3F2...         | CUST-4521   | 2024-01-15|
| 0x8B1C...         | CUST-8890   | 2024-01-20|
+-------------------+-------------+-----------+
(One row per business key. Never changes.)

HUB_ORDER:
+----------------+------------+-----------+
| order_hkey(PK) | order_id   | load_date |
+----------------+------------+-----------+
| 0xD4E7...      | ORD-10023  | 2024-02-01|
+----------------+------------+-----------+

LINK_CUSTOMER_ORDER:                    SAT_CUSTOMER:
+---------------------+----------------+-----------------+    +-------------------+-----------+--------+--------+------------+
| link_hkey (PK)      | customer_hkey  | order_hkey      |    | customer_hkey(FK) | load_date | name   | segment| email      |
+---------------------+----------------+-----------------+    +-------------------+-----------+--------+--------+------------+
| 0x7F2A...           | 0xA3F2...      | 0xD4E7...       |    | 0xA3F2...         | 2024-01-15| Acme   | SMB    | a@acme.com |
+---------------------+----------------+-----------------+    | 0xA3F2...         | 2024-07-01| Acme   | Ent.   | a@acme.com |
                                                          +-------------------+-----------+--------+--------+------------+
(Relationships between hubs.)                             (Full attribute history. New row on every change.)
```

### Data Vault → Dimensional model pipeline
```
Source Systems → [Hubs + Links + Satellites] → [Information Mart] → BI
                  (Data Vault - raw vault)     (Star schema)

The vault is NOT queried by business users directly.
Example transformation:
  HUB_CUSTOMER + SAT_CUSTOMER → dim_customer (with SCD Type 2 from satellite history)
  LINK_CUSTOMER_ORDER + HUB_ORDER → fact_sales (with grain = one row per order)
```

### When Data Vault is overkill
```
Simple scenario: One source system (Salesforce), 50 tables, no multi-source integration
  → Use dimensional modeling directly. Data Vault adds unnecessary complexity.

Complex scenario: 5 source systems all track "customer" with different IDs and attributes
  → Data Vault excels here: hub resolves CUST-4521, USR-8890, email@a.com to one entity
```

## Sources
- [[raw/articles/what-is-data-vault]] - Databricks explanation of data vault pattern
