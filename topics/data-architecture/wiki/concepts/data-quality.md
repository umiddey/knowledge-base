# Data Quality

Data quality is the measurable fitness of data for its intended purpose. Rather than being a vague aspiration, quality should be assessed across specific dimensions with explicit thresholds. The six core dimensions are: accuracy (does the data match reality?), completeness (are all required values present?), timeliness (is the data fresh enough for its use case?), consistency (do related values agree across systems?), validity (do values conform to expected formats and ranges?), and uniqueness (are there unexpected duplicates?).

Different data needs different quality strictness. A finance close model requires tight controls on accuracy, completeness, and consistency. An exploratory clickstream table may tolerate lower completeness. Quality checks should happen at multiple points: at ingestion (reject malformed files), in the standardized layer (validate types and mappings), in the curated layer (check business rules), and at critical boundaries (monthly finance reconciliation). Quality should be designed into the system, not added only after a dashboard looks wrong.

## Key Points
- Six core dimensions: accuracy, completeness, timeliness, consistency, validity, uniqueness
- Different data needs different strictness levels (finance vs exploratory)
- Quality checks at multiple points: ingestion, standardization, curation, business rule boundaries
- Should be automated, not reliant on users noticing problems
- Tools: dbt tests, Soda, Monte Carlo, Elementary, Great Expectations
- Quality is designed into the system, not bolted on after problems appear

## Related Concepts
- [[data-governance]] - quality management is a core governance component
- [[data-observability]] - observability monitors quality dimensions automatically
- [[data-platform-layers]] - each layer should have its own quality expectations
- [[data-contracts]] - contracts specify quality expectations between producers and consumers

## Examples

### Quality dimensions applied to a real table
```sql
-- dim_customer quality checks (dbt tests)

-- ACCURACY: does email match expected format?
SELECT customer_key FROM dim_customer
WHERE email NOT REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';

-- COMPLETENESS: are required fields populated?
SELECT customer_key FROM dim_customer WHERE segment IS NULL;

-- TIMELINESS: is data fresh enough?
SELECT * FROM dim_customer WHERE _loaded_at < DATEADD('hour', -6, CURRENT_TIMESTAMP());

-- CONSISTENCY: do related values agree?
SELECT customer_key FROM dim_customer c
JOIN dim_store s ON c.store_key = s.store_key
WHERE c.region <> s.region;  -- customer region should match their store region

-- VALIDITY: do values conform to expected ranges?
SELECT customer_key FROM dim_customer
WHERE loyalty_tier NOT IN ('Bronze', 'Silver', 'Gold', 'Platinum');

-- UNIQUENESS: no unexpected duplicates?
SELECT customer_id, COUNT(*) FROM dim_customer GROUP BY customer_id HAVING COUNT(*) > 1;
-- (For Type 2 SCD, multiple rows per customer_id is expected, but >4 might indicate a problem)
```

### Layered quality strategy
```
Ingestion (raw → standardized):
  Tests: schema validation, file completeness, row count within 10% of previous load
  Failure mode: reject the load, alert the oncall, keep previous data intact

Standardization (standardized → curated):
  Tests: type validation, referential integrity, deduplication, null checks on required fields
  Failure mode: quarantine bad records, process the rest

Curation (curated → marts):
  Tests: business rules, grain validation, cross-model consistency, measure ranges
  Failure mode: block mart refresh, alert mart owner, previous version stays available

Serving (marts → semantic layer):
  Tests: metric reconciliation (semantic layer total = mart total), access control verification
  Failure mode: revert to previous semantic definition, alert consumers
```

## Sources
- [[raw/articles/the-6-dimensions-of-data-quality]] - Collibra's six quality dimensions with examples
- [[raw/articles/data-quality-dimensions]] - IBM's quality dimensions overview
- [[raw/articles/dbt-best-practices-7-essential-patterns-for-analyt]] - dbt testing best practices
