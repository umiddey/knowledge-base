# filters-and-masks

Source: https://docs.databricks.com/aws/en/data-governance/unity-catalog/filters-and-masks/

Row filters and column masks | Databricks on AWS

[Skip to main content](#__docusaurus_skipToContent_fallback)

[

![Databricks Logo](/aws/en/img/logo.svg)![Databricks Logo](/aws/en/img/logo-dark.svg)

](https://www.databricks.com)[Home](/aws/en/)[Get started](/aws/en/getting-started/)[Develop](/aws/en/getting-started/connect/)[Reference](/aws/en/reference/api)[Resources](/aws/en/resources/)[Release notes](/aws/en/release-notes/)

[Help](#)

*   [Support](https://help.databricks.com)
*   [Knowledge Base](https://kb.databricks.com)
*   [Community](https://community.databricks.com)
*   [Training](https://customer-academy.databricks.com)

[English](#)

*   [English](/aws/en/data-governance/unity-catalog/filters-and-masks/)
*   [日本語](/aws/en/aws/ja/data-governance/unity-catalog/filters-and-masks/)
*   [Português](/aws/en/aws/pt/data-governance/unity-catalog/filters-and-masks/)

[AWS](#)

*   [Azure](https://learn.microsoft.com/azure/databricks/data-governance/unity-catalog/filters-and-masks/)
*   [GCP](/aws/en/gcp/en/data-governance/unity-catalog/filters-and-masks/)
*   [SAP](/aws/en/sap)

[Try Databricks](https://signup.databricks.com/?dbx_source=docs)

*   [](/aws/en/)
*   [Tables](/aws/en/tables/)
*   Table functionality
*   Row and column filters

On this page

Last updated on **Apr 3, 2026**

# Row filters and column masks

This page provides guidance for using row filters and column masks to filter sensitive data in your tables.

## What are row filters?[​](#what-are-row-filters "Direct link to What are row filters?")

Row filters let you control which rows a user can access in a table based on custom logic. At query time, a row filter evaluates a condition and returns only the rows that meet it. This is commonly used to implement row-level security—for example, restricting users to records from a specific region, department, or account.

Row filters are defined as SQL user-defined functions (UDFs), and can also incorporate Python or Scala logic when wrapped in a SQL UDF. You can apply row filters per table, or centrally through ABAC policies using governed tags.

## What are column masks?[​](#what-are-column-masks "Direct link to What are column masks?")

Column masks control what values users see in specific columns, depending on who they are. At query time, the mask replaces each reference to a column with the result of a masking function. This allows sensitive data, such as SSNs or emails, to be redacted or transformed based on user identity or role.

Each column can have one mask. The mask must be defined as a SQL UDF that returns a value of the same type as the column being masked. The SQL UDF can optionally [call Python or Scala UDFs](/aws/en/data-governance/unity-catalog/filters-and-masks/manually-apply#wrapper-example) to implement complex masking logic. Column masks can also take other columns as inputs, for example, to vary behavior based on multiple attributes.

Like row filters, column masks can be applied per table or managed centrally through ABAC policies. They operate at query time and integrate seamlessly with standard SQL, notebooks, and dashboards.

## When should you use dynamic views vs. filters and masks?[​](#when-should-you-use-dynamic-views-vs-filters-and-masks "Direct link to When should you use dynamic views vs. filters and masks?")

Dynamic views, row filters, and column masks all let you apply filtering or transformation logic at query time — but they differ in how they are managed, scoped, and exposed to users.

Feature

Applies to

Managed using

Naming impact

Best used for…

**Dynamic views**

Views

SQL logic

Creates a new object name

Sharing filtered data or spanning multiple tables

**Row filters**

Tables

ABAC or mapping tables

Table name unchanged

Row-level access control tied to user or data tags

**Column masks**

Tables/columns

ABAC or mapping tables

Table name unchanged

Redacting sensitive column data based on identity

*   **Use dynamic views** when you need a read-only layer across one or more source tables, especially for data sharing or applying logic across multiple inputs.
*   **Use row filters and column masks** when you want to apply logic directly to a table, without changing the table name or introducing new objects. These can be managed using either ABAC policies (recommended) or manually on tables.

For a full comparison, see [Access control methods compared](/aws/en/data-governance/unity-catalog/access-control#compare).

## How to apply filters and masks[​](#how-to-apply-filters-and-masks "Direct link to How to apply filters and masks")

You can implement row filters and column masks in two main ways:

*   **Using ABAC policies** (Public Preview): Apply filters and masks centrally using governed tags and reusable policies. This approach scales across catalogs and schemas and reduces the need for table-by-table configuration. ABAC policies are more secure than manual table-level policies because they can be defined by higher-level admins and cannot be overridden by table owners, which helps enforce centralized access controls. They are also more performant in many cases, since filtering and masking logic in ABAC policies is evaluated more efficiently than in table-specific UDFs. Databricks recommends using ABAC for most use cases. To apply filters and mask using ABAC see [Unity Catalog attribute-based access control (ABAC)](/aws/en/data-governance/unity-catalog/abac/).
    
*   **Manual assignment per table**: Apply filters and masks by assigning functions directly to individual tables and columns. This method can use mapping tables or other custom logic. It allows for fine-grained, table-specific control but is harder to scale and maintain. For more information, see [Manually apply row filters and column masks](/aws/en/data-governance/unity-catalog/filters-and-masks/manually-apply).
    

## Performance recommendations[​](#performance-recommendations "Direct link to performance-recommendations")

Row filters and column masks control data visibility by ensuring that users cannot view the contents of values of the base tables before filtering and masking operations. They perform well in response to queries under common use cases. In less common applications, where the query engine must choose between optimizing query performance and protecting against leaking information from the filtered/masked values, it will always make the secure decision at the expense of some impact on query performance. To minimize this performance impact, apply the following recommendations:

*   **Use simple policy functions:** Policy functions with fewer expressions often perform better than more complex expressions. Avoid using mapping tables and expression subqueries in favor of simple CASE functions.
*   **Limit the number of column masks and masking functions:** Multiple unique column masks on large tables can hurt query performance. Each distinct mask requires evaluation during queries, increasing processing overhead. Apply masks only to columns that contain truly sensitive data, and reuse masking functions where possible.
*   **Reduce the number of function arguments:** Databricks cannot optimize away column references to the source table resulting from policy function arguments, even if these columns are not used in the query. Use policy functions with fewer arguments, as the queries from these tables will perform better.
*   **Avoid adding row filters with too many AND conjuncts:** Because only one distinct row filter can resolve at runtime for a given user and table, a common approach is to combine multiple desired policy functions with `AND`. However, with each additional conjunct, the chances increase that conjunct(s) include components mentioned elsewhere in this table that could affect performance (such as mapping tables). Use fewer conjuncts to improve performance.
*   **Use deterministic expressions that cannot throw errors in table policies and queries from these tables:** Some expressions may throw errors if the provided inputs are not valid, such as ANSI division. In such cases, the SQL compiler must not push operations with those expressions (such as filters) too far down in the query plan to avoid the possibility of errors like “division by zero” that reveal information about values before filtering and/or masking operations. Use deterministic expressions that never throw errors, such as `try_divide`.
*   **Prefer SQL to Python UDFs**: Python UDFs are typically less performant than SQL, and they offer fewer opportunities for optimization. If you must use Python, explicitly mark UDFs as `DETERMINISTIC` when they don’t involve non-deterministic logic or dependencies.
*   **Run test queries over your table to gauge performance:** Construct realistic queries that represent the workload you expect for your table with row filters or column masks and measure the performance. Make small modifications to the policy functions and observe their effects until you reach a good balance between performance and expressiveness of the filtering and masking logic.

For more best practices and example UDFs, see [UDFs for ABAC policies best practices](/aws/en/data-governance/unity-catalog/abac/udf-best-practices).

## Data type mismatch behavior[​](#data-type-mismatch-behavior "Direct link to data-type-mismatch-behavior")

When you create a row filter or column mask, the data type of each table column passed to the function must match the corresponding parameter type in the UDF. If there is a type mismatch, such as a `STRING` column passed to an `INT` parameter, Databricks implicitly casts the column value to the parameter type, which can cause unexpected behavior when the column contains values that can't be converted.

With ANSI mode disabled (`spark.sql.ansi.enabled = false`), uncastable values are silently converted to `NULL`, no error is raised, and the UDF receives `NULL` instead of the actual column value. This can produce incorrect results, such as a row filter that returns all rows instead of filtering them, or a column mask that masks the wrong values. Databricks recommends enabling ANSI mode (`spark.sql.ansi.enabled = true`), which raises an error when a cast fails, making the problem immediately visible, instead of silently returning `NULL`.

### Example: Row filter with a type mismatch[​](#example-row-filter-with-a-type-mismatch "Direct link to Example: Row filter with a type mismatch")

Consider a table with a `STRING` column and a row filter whose parameter is accidentally declared as `INT` instead of `STRING`:

SQL

    SET spark.sql.ansi.enabled = false;CREATE TABLE employees (  id INT,  salary INT,  department STRING);INSERT INTO employees VALUES  (91, 200000, null),  (1, 200000, 'exec'),  (2, 50000, 'engineering'),  (3, 150000, 'exec');-- Bug: parameter type is INT, but the column is STRINGCREATE FUNCTION salary_filter(dept INT) RETURNS BOOLEANRETURN dept IS NULL;ALTER TABLE employees SET ROW FILTER salary_filter ON (department);

When queried, the `department` values `'exec'` and `'engineering'` can't be cast to `INT`, so they are silently converted to `NULL`. Because the filter returns `true` when the input is `NULL`, all rows are returned instead of only the rows where `department` is actually `NULL`:

SQL

    SELECT * FROM employees;

id

salary

department

91

200000

null

1

200000

exec

2

50000

engineering

3

150000

exec

The correct UDF definition uses `STRING` as the parameter type to match the column:

SQL

    CREATE FUNCTION salary_filter(dept STRING) RETURNS BOOLEANRETURN dept IS NULL;

With this fix, the query returns only the row where `department` is `NULL`.

## Limitations[​](#limitations "Direct link to limitations")

*   Databricks Runtime versions below 12.2 LTS do not support row filters or column masks. These runtimes fail securely, meaning that if you try to access tables from these runtimes, no data is returned.
*   You cannot apply row-level security or column masks to a view.
*   You cannot use Iceberg REST catalog or Unity REST APIs to access tables with row filters or column masks.
*   Delta Lake APIs are not supported.
*   Delta Sharing providers cannot share tables with row-level security or column masks. However, Delta Sharing recipients can apply row filters and column masks only to shared tables and foreign tables—not to streaming tables or materialized views.
*   Path-based access to files in tables with policies is not supported.
*   `MERGE` statements do not support tables with row filter or column-mask policies that contain nesting, aggregations, windows, limits, or non-deterministic functions.
*   Databricks Runtime versions below 17.2 do not support `DELETE`, `UPDATE`, and `MERGE` on partitioned tables with row filter or column-mask policies defined on the partition column.
*   Row-filter or column-mask policies with circular dependencies back to the original policies are not supported.
*   Row filters and column masks cannot reference tables that also have active row filters or column masks. In ABAC configurations, you can work around this by excluding the policy function owner from the referenced table's policy.
*   Time travel does not work with row-level security or column masks. In ABAC configurations, users who are explicitly excluded from a policy can still run time travel queries on the underlying data.
*   Deep and shallow clones are not supported on tables that have row-level security or column masks. In ABAC configurations, users who are explicitly excluded from a policy can still perform clone operations on the underlying data.
*   You cannot create a vector search index from a table that has row filters or column masks applied.

### Dedicated access mode limitation[​](#dedicated-access-mode-limitation "Direct link to dedicated-access-mode-limitation")

You cannot access a table with row filters or column masks from a dedicated access compute resource on Databricks Runtime 15.3 or below. You can use dedicated access mode on Databricks Runtime 15.4 LTS or above if your workspace is enabled for serverless compute. However, only read operations are supported on Databricks Runtime 15.4 through 16.2. Write operations (including `INSERT`, `UPDATE`, and `DELETE`) require Databricks Runtime 16.3 or above and must use supported patterns such as `MERGE INTO`.

When you query tables with row filters or column masks from dedicated access mode compute, Databricks uses serverless compute to enforce fine-grained access controls (FGAC). As a result, all FGAC limitations and considerations apply. See [Fine-grained access control on dedicated compute](/aws/en/compute/single-user-fgac).

FGAC uses [Cloud Fetch](/aws/en/integrations/jdbc/capability#cloud-fetch-in-jdbc) to write temporary result sets to internal workspace storage. If you have S3 bucket versioning enabled, this can lead to exponential storage growth. See [S3 bucket versioning considerations](/aws/en/integrations/jdbc/capability#advanced-configurations) for configuration recommendations.

*   [What are row filters?](#what-are-row-filters)
*   [What are column masks?](#what-are-column-masks)
*   [When should you use dynamic views vs. filters and masks?](#when-should-you-use-dynamic-views-vs-filters-and-masks)
*   [How to apply filters and masks](#how-to-apply-filters-and-masks)
*   [Performance recommendations](#performance-recommendations)
*   [Data type mismatch behavior](#data-type-mismatch-behavior)
    *   [Example: Row filter with a type mismatch](#example-row-filter-with-a-type-mismatch)
*   [Limitations](#limitations)
    *   [Dedicated access mode limitation](#dedicated-access-mode-limitation)

[Privacy Notice](https://www.databricks.com/legal/privacynotice)·[Terms of Use](https://www.databricks.com/terms-of-use)·[Modern Slavery Statement](https://www.databricks.com/legal/modern-slavery-policy-statement)·[California Privacy](https://www.databricks.com/legal/supplemental-privacy-notice-california-residents)·[Your Privacy Choices ![](https://www.databricks.com/sites/default/files/2022-12/gpcicon_small.png)](javascript:OneTrust.ToggleInfoDisplay\(\)) 

© Databricks 2026. All rights reserved. Apache, Apache Spark, Spark and the Spark logo are trademarks of the [Apache 