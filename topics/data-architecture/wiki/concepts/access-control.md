# Access Control

Access control determines who can see and interact with what data in the platform. It is a core security capability that must be designed into the architecture, not bolted on afterward. The two main models are RBAC (Role-Based Access Control), which grants access based on predefined roles, and ABAC (Attribute-Based Access Control), which considers additional attributes like department, region, or clearance level.

For data platforms, access control operates at multiple levels: schema-level (which databases or schemas a user can see), table-level (which tables within a schema), row-level (which rows within a table, based on region or department), and column-level (which columns are visible or masked). RBAC handles coarse-grained access well (data engineers see raw, analysts see curated). ABAC scales better for fine-grained rules (regional managers see only their region's data). Most serious platforms use both, with row-level and column-level controls enforced through the warehouse or semantic layer.

## Key Points
- RBAC: access based on roles — simpler, good for coarse-grained control
- ABAC: access based on attributes (department, region, clearance) — better for fine-grained rules
- Row-level security: different users see different rows (regional isolation)
- Column-level security: sensitive columns hidden or masked based on role
- Most platforms use both RBAC (broad categories) and ABAC (row/column-level rules)
- Access decisions should follow least privilege: only what is needed for the specific role

## Related Concepts
- [[data-masking]] - masking and tokenization enforce column-level access visually
- [[data-governance]] - access control is a core governance and security capability
- [[semantic-layer]] - the semantic layer is where access control meets consumer-facing queries
- [[data-platform-layers]] - access rules differ by layer (raw is more restricted than curated)

## Examples

### Snowflake RBAC setup
```sql
-- Role hierarchy
CREATE ROLE data_engineer;
CREATE ROLE analyst;
CREATE ROLE finance_analyst;

-- Data engineers can see raw and staging
GRANT USAGE ON SCHEMA raw TO ROLE data_engineer;
GRANT SELECT ON ALL TABLES IN SCHEMA raw TO ROLE data_engineer;

-- Analysts can only see curated marts (not raw)
GRANT USAGE ON SCHEMA marts TO ROLE analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA marts TO ROLE analyst;

-- Finance analysts see finance mart + finance-specific row-level security
GRANT USAGE ON SCHEMA marts.finance TO ROLE finance_analyst;
```

### Row-level security: regional isolation
```sql
-- Databricks: regional managers see only their region's data
CREATE FUNCTION region_filter(region VARCHAR)
RETURNS BOOLEAN
RETURN region = CAST(current_user() AS VARCHAR); -- lookup user's assigned region

ALTER TABLE marts.finance.fct_revenue
SET ROW FILTER region_filter ON (customer_region);

-- User 'sarah_eu' → sees only rows where customer_region = 'EU'
-- User 'john_us'  → sees only rows where customer_region = 'US'
-- Same table, different views per user. No separate tables needed.
```

### RBAC vs ABAC decision guide
```
Question: "Who should see this data?"

If the answer is role-based ("all analysts", "data engineers", "finance team"):
  → Use RBAC. Simpler to manage. One role assignment per user.

If the answer is attribute-based ("only their region", "only their department",
                                   "only customers they manage"):
  → Use ABAC. Scales better for fine-grained rules.
  → Implemented via row-level security policies.

Most platforms use BOTH:
  RBAC for schema/table access (coarse-grained)
  ABAC for row/column filtering (fine-grained)
```

## Sources
- [[raw/articles/access-controls-in-data-engineering-2086aa215ad3]] - access controls in data engineering
- [[raw/articles/filters-and-masks]] - Databricks row filters and column masks
