# Data Observability

Data observability is the practice of understanding the internal state of a data platform by examining its external outputs — detecting problems before users notice them through automated monitoring of freshness, volume, schema, distribution, and lineage. A platform is not mature if it only works when everything goes right. It is mature when it can explain failures, detect drift, and support rapid troubleshooting.

Key monitoring dimensions include freshness (is data up to date?), volume (are row counts within expected ranges?), schema (did columns change unexpectedly?), distribution (are values within expected ranges?), and lineage (are upstream dependencies healthy?). Tools include Monte Carlo (ML-driven anomaly detection), Soda (declarative quality checks), Elementary (dbt-native observability), Bigeye, and Sifflet. The anti-pattern is relying on users to report data problems.

## Key Points
- Automated monitoring of freshness, volume, schema, distribution, and lineage
- Detects problems before users notice them
- Tools: Monte Carlo, Soda, Elementary, Bigeye, Sifflet
- Observability data feeds into catalogs for health visibility
- Anti-pattern: relying on users to complain about broken dashboards
- Lineage-aware alerting shows which downstream assets are affected by failures

## Related Concepts
- [[data-quality]] - observability automates quality monitoring across dimensions
- [[data-lineage]] - lineage-aware observability shows blast radius of failures
- [[platform-reliability]] - observability is the monitoring foundation for reliability
- [[data-catalog]] - observability health data feeds into catalog interfaces

## Examples

### Monte Carlo anomaly detection
```
Monday 6 AM: Monte Carlo detects dim_customer row count dropped 40% overnight
  Alert: "Volume anomaly on marts.finance.dim_customer"
  Expected: 2.1M rows (±5%)
  Actual:   1.26M rows
  Blast radius: 3 downstream marts, 7 dashboards, 23 weekly active users affected

Investigation via lineage:
  dim_customer ← stg_customers ← source('salesforce', 'accounts')
  Root cause: Salesforce integration token expired at 2 AM. Half the records failed to load.
  Without observability: Finance team discovers at 9 AM when the dashboard looks wrong.
  With observability:    Data team is paged at 6:02 AM and fixes before anyone notices.
```

### Freshness monitoring setup (Soda)
```yaml
# checks/fct_revenue_freshness.yml
checks for fct_revenue:
  - freshness(updated_at) < 6 hours:
      name: Revenue data freshness
      alert: pagerduty  # page the oncall if stale
  - row_count > 1000:
      name: Minimum daily revenue rows
  - schema:
      name: Schema changes detected
      warn:
        required: [revenue_key, customer_key, date_key, amount]
        forbidden: [ssn, credit_card_number]  # no PII should appear here
  - max(amount) < 1000000:
      name: No individual transaction over $1M
```

### Anti-pattern: user-reported data problems
```
Without observability:
  9:00 AM — Finance manager: "The revenue dashboard looks wrong"
  9:15 AM — Data team: "Which dashboard? What looks wrong?"
  9:30 AM — Finance: "Net revenue is showing $0 for yesterday"
  9:45 AM — Data engineer investigates, finds broken pipeline
  10:30 AM — Pipeline re-run, data restored
  10:30 AM — 90 minutes of disruption. Trust damaged.

With observability:
  3:00 AM — Observability detects pipeline failure, pages oncall
  3:15 AM — Data engineer fixes and re-runs pipeline
  6:00 AM — Finance manager opens dashboard, data is correct
  6:00 AM — Zero business disruption. Nobody knows there was a problem.
```

## Sources
- [[raw/articles/the-6-dimensions-of-data-quality]] - quality dimensions that observability monitors
