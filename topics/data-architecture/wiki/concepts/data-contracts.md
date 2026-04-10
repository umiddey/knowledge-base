# Data Contracts

A data contract is a formal, explicit agreement between a data producer and a data consumer that defines the schema, semantics, quality expectations, freshness requirements, and change process for a dataset. Without contracts, expectations are implicit and assumptions diverge — leading to silent breakage, conflicting definitions, and trust erosion between teams.

A good contract specifies: the schema (required fields, types, nullable rules), the meaning (business definitions of each field), the owner (who is responsible), the freshness expectation (how quickly data should arrive), the quality expectation (what validation rules apply), and the change process (how schema or logic changes are communicated). Contracts reduce surprises, make expectations visible, and provide a basis for automated validation. They are especially critical at system boundaries — between microservices and the data platform, between domains in a data mesh, and between the platform and external consumers.

## Key Points
- Formal agreement between producer and consumer on schema, meaning, quality, and change process
- Reduces surprises by making implicit expectations explicit
- Especially critical at system boundaries and in data mesh architectures
- Should include: schema, definitions, owner, freshness, quality rules, change notification process
- Enables automated validation at ingestion boundaries
- Tools: Confluent Schema Registry, dbt tests, custom contract validation frameworks

## Related Concepts
- [[data-ingestion-patterns]] - contracts protect ingestion boundaries from silent breakage
- [[data-mesh]] - data mesh relies heavily on contracts between domain data products
- [[data-quality]] - contracts specify quality expectations that can be automatically validated
- [[data-governance]] - contracts are a governance mechanism that makes rules enforceable

## Examples

### Data contract for a payment events topic
```yaml
# contracts/stripe_payments.v2.yaml
dataset: stripe_payments
version: "2.1"
owner: payments-team@company.com
freshness: events available within 5 minutes of occurrence

schema:
  - name: event_id
    type: STRING
    nullable: false
    description: "Unique event identifier from Stripe"
  - name: amount
    type: DECIMAL(12,2)
    nullable: false
    description: "Payment amount in original currency"
  - name: currency
    type: STRING(3)
    nullable: false
    description: "ISO 4217 currency code"
    validation: "regex: ^[A-Z]{3}$"
  - name: status
    type: STRING
    nullable: false
    allowed_values: [succeeded, pending, failed, refunded]
  - name: created_at
    type: TIMESTAMP_TZ
    nullable: false

quality:
  - rule: "amount > 0 when status = 'succeeded'"
    severity: error
  - rule: "no duplicate event_id"
    severity: error
  - rule: "created_at within 24 hours of processing time"
    severity: warning

change_process:
  notification_channel: "#data-contracts"
  breaking_change_notice: 14 days
  consumer_review_required: true
```

### Contract enforcement at ingestion
```sql
-- dbt test acting as contract enforcement
-- tests/stripe_payments_contract.sql
SELECT event_id
FROM {{ source('raw', 'stripe_payments') }}
WHERE amount <= 0 AND status = 'succeeded'
-- Any rows returned = contract violation. Pipeline should alert and optionally halt.
```

### What happens without contracts
```
Scenario: Payments team renames "amount" to "gross_amount" in the API response
Without contract:
  - Warehouse ingestion silently receives NULL for "amount" (column no longer exists)
  - fact_sales shows $0 revenue for 3 days before anyone notices
  - Finance team escalates: "Why is revenue zero?"

With contract:
  - Schema validation at ingestion detects missing "amount" column
  - Pipeline fails immediately with clear error: "Contract violation: required field 'amount' not found"
  - Payments team notified via #data-contracts channel
  - Fix deployed before any business impact
```

## Sources
- [[raw/articles/the-what-why-and-how-of-data-contracts]] - practical guide to data contracts
