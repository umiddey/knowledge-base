# Data Mesh

Data mesh is a sociotechnical approach to data architecture that decentralizes data ownership to domain teams, introduced by Zhamak Dehghani at ThoughtWorks in 2019. Rather than a central team owning all data, each domain (finance, marketing, supply chain) owns its data products, while a platform team provides shared standards, tooling, and infrastructure.

Data mesh rests on four principles: domain-oriented decentralized data ownership (teams own their data, not a central team), data as a product (each dataset is treated like a product with users, owners, quality expectations, and documentation), self-serve data infrastructure platform (shared tooling that domains use without central team bottleneck), and federated computational governance (global standards and policies that domains follow, enforced through tooling rather than committees). Data mesh is not the right choice for every organization — it requires strong domain capability, mature platform engineering, and leadership commitment. But for large organizations struggling with central-team bottlenecks and data quality decay, it offers a principled alternative to monolithic data platforms.

## Key Points
- Four principles: domain ownership, data as a product, self-serve platform, federated governance
- Decentralizes data ownership to domain teams who are closest to the business meaning
- A platform team provides shared standards, tooling, and infrastructure (not data definitions)
- Data products have: users, owners, quality expectations, documentation, and contracts
- Requires strong domain capability and mature platform engineering to succeed
- Not right for every organization — smaller companies may benefit more from centralized models
- The federated operating model balances central standards with domain autonomy

## Related Concepts
- [[data-governance]] - data mesh requires federated governance across domains
- [[data-contracts]] - contracts between domain data products are essential in a mesh
- [[semantic-layer]] - the semantic layer provides shared metric definitions across domains
- [[data-platform-layers]] - the self-serve platform provides the infrastructure layers domains build on
- [[architecture-decision-records]] - the decision to adopt data mesh should be documented as an ADR

## Examples

### Data product definition
```
Data Product: customer_lifetime_value
Owner: Marketing Data Team (marketing-data@company.com)
Consumers: 12 weekly users (Sales Ops, Marketing Analytics, Executive team)

Contract:
  Schema: customer_id, clv_score, clv_tier, last_purchase_date, churn_probability
  Freshness: Updated daily by 6 AM UTC
  Quality: clv_score BETWEEN 0 AND 10000, no nulls, tested daily

SLA: Available by 6 AM, 95% of business days
Access: Internal (all analysts). churn_probability restricted to Sales Ops and Marketing.

Platform provides:
  - CI/CD pipeline (dbt + Airflow)
  - Quality monitoring (Monte Carlo)
  - Catalog entry (Atlan)
  - Semantic definition (dbt Semantic Layer)

Marketing team owns the logic. Platform team owns the infrastructure.
Other domains consume via the catalog without needing to understand the model internals.
```

### Centralized vs mesh team structure
```
Centralized (monolith):
  Central Data Team (15 people)
  ├── Owns ALL pipelines, ALL models, ALL quality checks
  ├── Finance submits ticket → waits 3 weeks → gets their mart
  └── Marketing submits ticket → waits 2 weeks → gets their mart

Data Mesh (federated):
  Platform Team (5 people) — provides shared tooling, CI/CD, standards
  ├── Finance Data Team (3 people) — owns finance/ marts and data products
  ├── Marketing Data Team (3 people) — owns marketing/ marts and data products
  └── Supply Chain Data Team (2 people) — owns supply chain/ data products

  Finance needs a new metric → finance team builds it TODAY using platform tools
  Marketing needs a new pipeline → marketing team builds it without waiting
```

### When NOT to use data mesh
```
Small company (50 people, 3-person data team):
  → Centralized is simpler and more efficient.
  → Domain teams don't have data capability.
  → Overhead of mesh governance exceeds the coordination cost it saves.

Early-stage startup:
  → One data engineer builds everything. Mesh would add bureaucracy.
  → Revisit when the data team grows beyond 8-10 people.

Single-source environment:
  → If 80% of data comes from one source (e.g., one SaaS product),
     the multi-domain problem that mesh solves doesn't exist yet.
```

## Sources
- [[raw/articles/data-mesh-principles-html]] - Martin Fowler's data mesh principles article
- [[raw/articles/www-datamesh-architecture-com]] - data mesh architecture from an engineering perspective
- [[raw/papers/s12599-024-00876-5]] - Data products, data mesh, and data fabric (Springer, cited 52x)
