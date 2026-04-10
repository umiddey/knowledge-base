# Architecture Decision Records (ADRs)

An ADR is a short document that captures a single architecture decision, its context, and its consequences. ADRs are stored in version control alongside the code they affect, creating a decision log that future team members can consult to understand why the system is designed the way it is.

A good ADR includes: title, status (proposed/accepted/deprecated/superseded), context (what situation triggers the decision), decision (what was chosen), alternatives considered, and consequences (positive and negative). A strong decision connects to a business problem, acknowledges trade-offs, and is specific about why the chosen option fits current constraints. A weak decision says "this tool is modern" or "we may need this later." ADRs should be reviewed, time-bounded for revisit, and tracked for outcomes.

## Key Points
- Short document capturing one architecture decision with context and consequences
- Template: title, status, context, decision, alternatives, consequences
- Stored in version control alongside relevant code
- Strong decisions connect to business problems and acknowledge trade-offs
- Weak decisions use trend-justification ("it is modern") or fear-justification ("we may need this")
- Should be reviewed, time-bounded, and revisited when conditions change

## Related Concepts
- [[data-mesh]] - data mesh decisions (domain boundaries, platform standards) should be documented as ADRs
- [[platform-reliability]] - reliability patterns chosen should be documented in ADRs
- [[cost-optimization]] - cost-related decisions (batch vs streaming, materialization strategy) benefit from ADRs

## Examples

### Good ADR: specific, trade-off-aware
```markdown
# ADR-0014: Use Apache Iceberg as the open table format

## Status: Accepted (2024-03-15)

## Context
We need an open table format for the lakehouse layer to enable ACID transactions,
schema evolution, and time travel on S3-stored data. Delta Lake, Apache Iceberg,
and Apache Hudi are the three candidates.

## Decision
Use Apache Iceberg for all new lakehouse tables.

## Alternatives Considered
- Delta Lake: Strongest Spark integration, but we use Trino and Snowflake
  alongside Spark. Iceberg has broader engine support.
- Apache Hudi: Best for streaming upserts, but our workloads are primarily
  batch with occasional incremental loads.

## Consequences
- Positive: Multi-engine support (Spark, Trino, Snowflake all read Iceberg natively)
- Positive: Strong schema evolution without table rebuilds
- Negative: Less mature Spark integration than Delta Lake (occasional compatibility gaps)
- Negative: Requires Iceberg catalog infrastructure (we use AWS Glue Catalog)
- Revisit: Evaluate Delta Lake integration if Databricks adoption increases

## Business Driver
Multi-engine access saves $8K/month by avoiding data duplication between
Spark (ML) and Snowflake (BI) environments.
```

### Bad ADR: vague, trend-driven
```markdown
# ADR: Use a data lakehouse

## Decision
We will use a data lakehouse because it is the modern approach.

## Consequences
We will be able to do both BI and ML on the same platform.
```
Why this is bad: No specific context, no alternatives, no trade-offs, no connection to business problems.

## Sources
- [[raw/articles/adr-github-io]] - ADR GitHub documentation and templates
