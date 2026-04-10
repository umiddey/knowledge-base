# Reverse ETL

Reverse ETL is the pattern of pushing analytical outputs from the data warehouse back into operational systems like CRMs, marketing platforms, and customer support tools. It completes the data loop: source systems feed the warehouse, the warehouse produces insights, and those insights are activated in the tools where teams actually work.

Common examples include pushing customer segment scores back to Salesforce, sending computed product recommendations to marketing automation platforms, and syncing inventory predictions to supply chain systems. Reverse ETL creates important architectural questions: Is the warehouse now producing a field that operations depend on? What happens if the segment is late? What happens if the CRM logic conflicts with the warehouse logic? Who owns the definition? Reverse ETL can be valuable, but it makes the architecture more interconnected and raises ownership questions that must be addressed explicitly.

## Key Points
- Pushes analytical outputs from the warehouse back to operational systems (CRM, marketing, support)
- Completes the data loop from source → warehouse → operational action
- Creates architectural questions about ownership, freshness, and conflict resolution
- Tools: Hightouch, Census, dbt Cloud integrations
- Raises the question: is the warehouse now a source of operational truth?
- When overused, can be an anti-pattern — sometimes event streaming is the better architectural choice

## Related Concepts
- [[data-ingestion-patterns]] - reverse ETL is the mirror of forward ingestion
- [[data-platform-layers]] - reverse ETL typically operates from the serving layer outward
- [[data-contracts]] - reverse ETL outputs to operational systems need explicit contracts
- [[semantic-layer]] - governed metrics from the semantic layer are often what gets pushed via reverse ETL

## Examples

### Customer 360: reverse ETL in action
```
Data flow:
1. CRM (Salesforce) → ingestion → raw → curated dim_customer
2. Warehouse computes: customer_lifetime_value, churn_risk_score, preferred_category
3. Reverse ETL (Hightouch) pushes these computed fields BACK to Salesforce:
   - churn_risk_score → Salesforce Account.custom_churn_score__c
   - preferred_category → Salesforce Account.preferred_category__c
   - customer_segment → Salesforce Account.segment__c

Result: Sales reps see AI-predicted churn scores directly in their CRM,
        without ever opening a dashboard.
```

### Anti-pattern: reverse ETL for operational decisions
```
BAD:  Warehouse computes "inventory reorder point" → pushes to ERP via reverse ETL
      If the pipeline is delayed, the ERP doesn't reorder stock → stockout

BETTER: Event-driven architecture
        Kafka event stream → real-time inventory service → ERP API
        The warehouse can still compute the reorder algorithm,
        but operational execution should use event streaming, not reverse ETL.
```

### Hightouch sync configuration (conceptual)
```yaml
# Hightouch sync: push customer segments to Salesforce
source: warehouse.marts.dim_customer_segment
destination: Salesforce Account object
mapping:
  customer_id: Account.External_ID__c
  segment_name: Account.Customer_Segment__c
  churn_score: Account.Churn_Risk__c
schedule: every 4 hours
conflict_resolution: source_of_truth = warehouse  # warehouse wins over manual CRM edits
```

## Sources
- [[raw/articles/the-state-of-reverse-etl]] - Hightouch deep-dive on reverse ETL state and patterns
