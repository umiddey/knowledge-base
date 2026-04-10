# Platform Reliability

Platform reliability is the practice of ensuring that a data platform delivers data predictably, recovers from failure gracefully, and communicates its health clearly. It is measured through SLIs (Service Level Indicators — measurable metrics like freshness or latency), SLOs (Service Level Objectives — targets like "sales data fresh by 6 AM, 95% of days"), and SLAs (Service Level Agreements — contractual commitments to consumers).

For internal data platforms, SLOs are more useful than SLAs. Define what "good enough" means for each critical dataset, then monitor against those targets. Key reliability patterns include retries with backoff, dead-letter handling for failed records, checkpointing for resumable processing, replay capability for recovery from corruption, failure isolation between workloads, and run-state visibility. Incident response should be structured: detect, triage, communicate, resolve, and postmortem.

## Key Points
- SLI: measurable metric (freshness, latency, error rate)
- SLO: target for an SLI (fresh by 6 AM, 95% of days)
- SLA: contractual commitment (usually for external consumers)
- Key patterns: retries, dead-letter handling, checkpointing, replay, failure isolation
- Incident response: detect → triage → communicate → resolve → postmortem
- Operational maturity levels: reactive → managed → proactive → optimized

## Related Concepts
- [[data-observability]] - observability provides the monitoring that SLOs require
- [[checkpointing-and-replay]] - core reliability mechanisms for recovery
- [[cost-optimization]] - reliability and cost often trade off against each other
- [[data-quality]] - quality SLOs define what "good enough" means for each dataset

## Examples

### SLO definitions for a data platform
```yaml
service: data-platform
slos:
  - name: sales_data_freshness
    sli: time_since_last_load(fact_sales)
    target: "fresh by 6:00 AM UTC on 95% of business days"
    alert_if: data older than 7:00 AM UTC

  - name: pipeline_success_rate
    sli: successful_runs / total_runs
    target: "99% success rate over rolling 7 days"
    alert_if: success rate drops below 97%

  - name: query_latency_p95
    sli: query_duration_seconds(p95)
    target: "p95 under 30 seconds for curated mart queries"
    alert_if: p95 exceeds 60 seconds

  - name: data_quality_pass_rate
    sli: passing_tests / total_tests
    target: "100% on certified datasets, 95% on exploratory datasets"
    alert_if: any certified dataset test fails
```

### Incident response timeline
```
06:02 AM — Observability detects: fact_sales freshness SLO violated
06:03 AM — PagerDuty pages oncall data engineer
06:05 AM — Engineer acknowledges, triages: stg_payments failed at 3 AM
06:08 AM — Root cause: Stripe API returned 503, Airflow task marked failed
06:10 AM — Communicates in #data-incidents: "fact_sales delayed, ETA 30 min"
06:15 AM — Reruns ingestion task manually (with backoff retry)
06:25 AM — Downstream dbt models run successfully
06:30 AM — fact_sales SLO met (fresh by 6:30 AM)
06:31 AM — Incident resolved, #data-incidents updated
06:35 AM — Postmortem scheduled: why didn't auto-retry handle the 503?
```

### Operational maturity levels
```
Level 1 - REACTIVE:
  Users report broken dashboards. Team scrambles to fix.
  No monitoring. No runbooks. Every incident is a surprise.

Level 2 - MANAGED:
  Basic monitoring in place. Team detects some issues before users.
  Some runbooks exist. Incident response is inconsistent.

Level 3 - PROACTIVE:
  Observability covers freshness, volume, schema, quality.
  SLOs defined for critical datasets. Runbooks for common failures.
  Lineage-aware alerting shows blast radius.

Level 4 - OPTIMIZED:
  Self-healing pipelines (auto-retry, auto-scale).
  Predictive alerting (detect drift before SLO violation).
  Full incident lifecycle: detect → triage → communicate → resolve → postmortem → improve.
```

## Sources
- [[raw/articles/blog-how-to-make-your-data-pipelines-more-reliable]] - SLAs for data pipelines
