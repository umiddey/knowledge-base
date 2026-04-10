# Data Lineage

Data lineage shows how data moved and changed from source to output. It traces the path from a dashboard metric back through the semantic layer, curated model, standardized stage, raw ingestion, and original source system. Lineage is not a nice-to-have — it is essential for troubleshooting, impact analysis, change review, trust building, and compliance.

When a CFO asks why net sales dropped sharply, lineage helps the team trace from the dashboard metric through the semantic definition, fact table logic, refund source, and upstream pipeline change — potentially discovering that a source API change modified order_status values. Without lineage, this investigation takes hours of tribal knowledge hunting. OpenLineage is the open standard for collecting lineage metadata from pipelines, integrating with Airflow, dbt, Spark, and Flink. Marquez provides the reference implementation for lineage visualization.

## Key Points
- Traces data from source to output, showing every transformation step
- Essential for troubleshooting, impact analysis, change review, trust, and compliance
- Enables "blast radius" analysis before making changes to upstream models
- OpenLineage is the open standard; Marquez is the reference implementation
- dbt generates automatic lineage from ref() and source() calls
- Platform-native lineage exists in Snowflake Access History, Databricks Unity Catalog
- Without lineage, problem diagnosis relies on tribal knowledge

## Related Concepts
- [[data-governance]] - lineage is a governance capability that enables trust and auditability
- [[data-catalog]] - catalogs visualize and serve lineage information
- [[data-observability]] - lineage-aware alerting shows which downstream assets are affected by failures
- [[platform-reliability]] - incident response depends on lineage for root cause tracing

## Examples

### dbt-generated lineage graph
```
When you use ref() and source() in dbt, lineage is automatic:

  source('stripe', 'payments')
    → stg_payments (staging)
      → int_payment_refunds (intermediate)
        → fct_revenue (mart)
          → semantic_layer.revenue_metric (semantic)

If a CFO asks "why did net revenue drop $2M yesterday?":
  1. Check fct_revenue → see the drop
  2. Follow lineage to int_payment_refunds → see refund spike
  3. Follow lineage to stg_payments → see specific refund transactions
  4. Follow lineage to source → check Stripe dashboard for API changes
  5. Discovery: Stripe changed order_status enum values, mapping broke

Without lineage: this takes hours of Slack messages and tribal knowledge hunting.
With lineage:    this takes 10 minutes of following the graph.
```

### OpenLineage event
```json
{
  "eventType": "COMPLETE",
  "run": {"runId": "abc-123"},
  "job": {"namespace": "production", "name": "dbt_run.fct_revenue"},
  "inputs": [
    {"namespace": "snowflake", "name": "raw.stripe.payments"},
    {"namespace": "snowflake", "name": "curated.dim_customer"}
  ],
  "outputs": [
    {"namespace": "snowflake", "name": "marts.finance.fct_revenue"}
  ]
}
// Airflow emits this automatically. Marquez visualizes the graph.
// When fct_revenue fails, Marquez shows all downstream dashboards affected.
```

### Blast radius analysis
```
Proposed change: Rename column 'amount' to 'gross_amount' in stg_payments

Lineage shows downstream impact:
  stg_payments → int_payment_refunds → fct_revenue → revenue_dashboard
  stg_payments → int_payment_fraud   → fct_fraud    → fraud_alerts
  stg_payments → marketing.segment_revenue_model

3 intermediate models, 2 fact tables, 3 consumers affected.
Without lineage: you discover each broken consumer one by one after the change.
With lineage:    you see the full blast radius BEFORE making the change.
```

## Sources
- [[raw/articles/openlineage-io]] - OpenLineage open standard for lineage metadata
