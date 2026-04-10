# Semantic Layer

The semantic layer is a governed abstraction between curated data and business consumers. It provides shared definitions for metrics, dimensions, joins, filters, and time logic so that every dashboard, report, and analysis uses the same logic. Without it, every team rebuilds "net sales" differently, and the organization argues about numbers instead of acting on them.

The metric fragmentation problem is the core pain point the semantic layer solves: finance defines net sales one way, marketing another, and BI creates a third version. The semantic layer defines it once, version-controls the definition, and exposes it through a consistent interface. Tools include the dbt Semantic Layer (MetricFlow, YAML definitions in dbt projects), Looker (LookML), AtScale (semantic layer on existing warehouses), and Cube.js (open source, API-first). A mature semantic layer also enforces row-level and column-level access control.

## Key Points
- Governed abstraction providing shared definitions for metrics and dimensions
- Solves metric fragmentation: "net sales" defined once, used everywhere
- Tools: dbt Semantic Layer (MetricFlow), Looker (LookML), AtScale, Cube.js
- Includes metric definitions, dimension logic, join paths, filters, and time intelligence
- Should also enforce row-level and column-level access control
- Certification: trusted datasets are marked as certified for reliable use

## Related Concepts
- [[data-marts]] - marts are the structured models that feed the semantic layer
- [[data-governance]] - the semantic layer is a governance mechanism for metric consistency
- [[access-control]] - the semantic layer enforces access rules for consuming applications
- [[conformed-dimensions]] - conformed dimensions provide the dimensional foundation for the semantic layer

## Examples

### Metric fragmentation: the problem
```
Three teams, three dashboards, three definitions of "net revenue":

Finance Looker dashboard:
  net_revenue = SUM(amount) - SUM(refunds) - SUM(taxes)
  Filter: order_status IN ('completed', 'shipped')

Marketing Tableau dashboard:
  net_revenue = SUM(amount) - SUM(refunds)
  Filter: order_status = 'completed' (excludes 'shipped'!)

Executive PowerBI dashboard:
  net_revenue = SUM(amount) - SUM(refunds) - SUM(taxes) - SUM(discounts)
  Filter: all statuses

The CFO asks: "Why does the finance dashboard show $12M but marketing shows $14M?"
Nobody can explain it. Trust erodes. Meetings ensue.
```

### dbt Semantic Layer (MetricFlow): defining it once
```yaml
# metrics/net_revenue.yml
metrics:
  - name: net_revenue
    description: "Revenue after refunds and taxes, for completed and shipped orders"
    label: Net Revenue
    type: measure_proxy
    filter:
      - "{{ Dimension('order_status') }} in ('completed', 'shipped')"
    measures:
      - net_amount
    meta:
      owner: finance-data-team@company.com
      certification: certified

# Every dashboard, report, and ad-hoc query uses this ONE definition.
# If the definition changes, it changes everywhere simultaneously.
```

### LookML (Looker) semantic layer
```lookml
# views/fact_sales.view.lkml
measure: net_revenue {
  type: sum
  sql: ${amount} - ${refunds} - ${taxes} ;;
  filters: [order_status: "completed,shipped"]
  label: "Net Revenue"
  description: "Revenue after refunds and taxes for completed/shipped orders"
}

# Every Looker explore uses this measure. No per-dashboard variation possible.
# If finance wants to change the definition, it changes in ONE place.
```

## Sources
- [[raw/articles/how-the-dbt-semantic-layer-works]] - dbt Semantic Layer with MetricFlow
- [[raw/articles/semantic-layer]] - AtScale semantic layer definition
