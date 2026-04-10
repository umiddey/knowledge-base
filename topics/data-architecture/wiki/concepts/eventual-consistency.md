# Eventual Consistency

Eventual consistency means that not all consumers see the same truth at the same time in a distributed system. Different parts of the data platform may be at different points in time — a dashboard may lag behind the operational system by minutes or hours, a CDC pipeline may deliver events slightly out of order, and different regions may see data at different times.

This is acceptable for most analytical workloads. Monthly finance reporting does not need second-level consistency. Executive dashboards reviewed daily can tolerate 15-minute staleness. It becomes dangerous when the business acts on data in real time — fraud detection, inventory reservation, and operational alerting need near-current state. The architect must understand which use cases tolerate eventual consistency and which demand stronger guarantees, then design accordingly.

## Key Points
- Different parts of the system may be at different points in time
- Acceptable for most analytical workloads (reporting, BI, historical analysis)
- Dangerous for real-time operational use cases (fraud, inventory, alerts)
- The CAP theorem explains why: under network partition, you choose consistency or availability
- Most data platforms favor availability and partition tolerance over strong consistency
- Ask: "What happens if this data is 1 minute late? 15 minutes? 1 hour?"

## Related Concepts
- [[batch-vs-streaming]] - batch workloads inherently have eventual consistency
- [[idempotency]] - eventual consistency makes idempotent reprocessing more important
- [[platform-reliability]] - SLOs should account for the consistency delay acceptable for each dataset
- [[data-observability]] - freshness monitoring detects when consistency delay exceeds expectations

## Examples

### Consistency windows in a typical data platform
```
Source system (CRM):        Customer segment updated at 10:02 AM
  ↓ CDC (5 min lag)        → Raw layer reflects change at 10:07 AM
  ↓ dbt batch (15 min)     → Curated layer reflects change at 10:22 AM
  ↓ Reverse ETL (4 hours)  → Salesforce shows new segment at 2:07 PM

At 11:00 AM, the CRM and the warehouse disagree on Acme's segment.
This is eventual consistency. Is it acceptable?

For daily reporting:  YES. The daily report runs at 6 AM on yesterday's data.
For real-time alerts: NO. If a fraud alert fires based on stale segment data,
                       a high-risk customer might be treated as low-risk.
```

### CAP theorem in practice
```
Your data platform uses S3 (partition-tolerant) and multi-region replication.

Network partition between us-east-1 and eu-west-1:
  Option A (Consistency):  Block all writes until partition resolves
                           → Platform is DOWN during network issues
  Option B (Availability): Accept writes in both regions, sync later
                           → Data may temporarily differ between regions
                           → This is eventual consistency

Almost all data platforms choose Option B (AP) because availability matters more
than millisecond consistency for analytical workloads.
```

### Designing for acceptable staleness
```yaml
# SLO definitions per dataset
datasets:
  sales_daily:
    max_staleness: 6 hours    # Daily report, loaded nightly
    acceptable_for: [executive_dashboards, finance_reporting]

  fraud_alerts:
    max_staleness: 30 seconds # Real-time fraud detection
    acceptable_for: [operational_alerts]

  customer_segments:
    max_staleness: 4 hours    # Reverse ETL back to CRM
    acceptable_for: [sales_rep_lookup]

  inventory_levels:
    max_staleness: 15 minutes # Operational inventory management
    acceptable_for: [warehouse_management]
```