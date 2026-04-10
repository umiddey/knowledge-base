# Reliability and Observability

Platform reliability and data observability are two sides of the same coin. Reliability defines what "good" looks like through SLOs; observability measures whether "good" is happening through automated monitoring. Without observability, reliability is aspirational. Without reliability targets, observability is noise.

## Why this connection matters

You cannot meet an SLO you cannot measure. If the SLO says "sales data fresh by 6 AM, 95% of business days," then you need automated freshness monitoring that detects when data exceeds expected staleness. If the SLO says "pipeline error rate below 1%," then you need error rate monitoring with alerting. Every reliability target requires a corresponding observability capability.

Incident response connects both: observability detects the problem, lineage helps trace the root cause, and the incident process resolves it. A mature platform has lineage-aware alerting — when a pipeline fails, the team immediately sees which downstream dashboards are affected, who owns them, and what the SLO implications are.

## Key insights

- Every SLO requires a corresponding observability metric and alert
- Freshness monitoring is the most fundamental data observability capability
- Lineage-aware alerting shows blast radius of failures
- Incident response connects detection (observability) to resolution (reliability)
- Operational maturity progresses: reactive → managed → proactive → optimized
- Observability without reliability targets creates alert fatigue

## Concepts Linked
- [[platform-reliability]] - SLOs, SLIs, and incident response
- [[data-observability]] - automated monitoring of freshness, volume, schema, lineage
- [[data-lineage]] - lineage enables impact analysis during incidents
- [[data-quality]] - quality SLOs need quality observability to be enforceable
- [[checkpointing-and-replay]] - recovery mechanisms that reliability depends on

## Examples

### SLO → observability mapping
```
Defined SLO                              → Required observability capability
─────────────────────────────────────────────────────────────────────────────
"Sales data fresh by 6 AM, 95% of days" → Freshness monitor on fact_sales._loaded_at
                                           Alert at 7 AM if not fresh
                                           Track rolling 30-day compliance %

"Pipeline error rate < 1%"               → Error rate monitor on Airflow task instances
                                           Alert at 2% (before SLO breach)
                                           Per-DAG breakdown

"Quality tests 100% on certified data"   → dbt test results → Monte Carlo
                                           Alert on ANY certified test failure
                                           Auto-block mart refresh on failure

"Query p95 latency < 30 seconds"         → Snowflake query history monitor
                                           Alert at p95 > 60 seconds
                                           Warehouse auto-scale trigger
```

### Lineage-aware incident workflow
```
06:02 AM — Monte Carlo alert: "Volume anomaly on stg_payments. Expected 50K rows, got 12K."

With lineage-aware observability:
  Marquez/Atlan immediately shows blast radius:
    stg_payments → int_payment_refunds → fct_revenue → [revenue_dashboard, exec_report, finance_close]
    stg_payments → fct_fraud          → [fraud_alerts]

  Incident page includes:
    "stg_payments has 76% fewer rows than expected.
     Downstream impact: 2 fact tables, 3 dashboards, 47 weekly users.
     Owner: payments-data-team. SLO: finance close by 8 AM."

  Without lineage: "Something is wrong with payments data. Not sure what else is affected."
  With lineage:    Full blast radius visible in the alert. Triage is immediate.
```

## Sources
- [[raw/articles/blog-how-to-make-your-data-pipelines-more-reliable]] - pipeline reliability with SLAs
