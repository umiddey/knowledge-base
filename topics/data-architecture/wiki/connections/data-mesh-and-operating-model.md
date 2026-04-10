# Data Mesh and Operating Model

Data mesh is not just a technical architecture — it is an operating model. It redefines how teams are structured, how decisions are made, and how data flows through an organization. The four principles of data mesh (domain ownership, data as a product, self-serve platform, federated governance) map directly to organizational design choices: how teams are organized, who owns what, how standards are enforced, and how delivery happens.

## Why this connection matters

Many organizations fail at data mesh because they treat it as a technology problem rather than an organizational one. Buying a platform and saying "domains own their data" does not create a mesh if the domains lack skilled data practitioners, the platform team cannot provide adequate self-serve tooling, or there is no federated governance framework to maintain consistency. Data mesh succeeds only when the operating model supports it.

The three common operating models — centralized, embedded/decentralized, and federated — each have different strengths. Centralized is easier for consistency but creates bottlenecks. Embedded gives domains closeness to data but risks fragmentation. Federated (the data mesh model) balances both but requires strong standards and capable domain teams. The architect must design for the organization that exists, not the one they wish existed.

## Key insights

- Data mesh is a sociotechnical approach — it changes organization, not just technology
- Domain ownership requires domains that actually have data capability
- The self-serve platform must reduce friction, not add bureaucracy
- Federated governance needs both global standards and local enforcement mechanisms
- The operating model must match organizational reality, not theoretical ideals
- Migration to data mesh is gradual, not a big-bang transformation

## Concepts Linked
- [[data-mesh]] - the four principles of data mesh architecture
- [[data-governance]] - federated governance is the governance model for data mesh
- [[data-contracts]] - contracts between domain data products enable safe autonomy
- [[semantic-layer]] - shared semantic definitions prevent metric fragmentation across domains
- [[architecture-decision-records]] - the decision to adopt mesh should be an explicit ADR

## Examples

### Three operating models compared
```
CENTRALIZED (traditional):
  Structure: One data team owns all models and definitions
  Example: The central team builds dim_customer, fact_orders, and the revenue semantic layer
  Request flow: Marketing → Jira ticket → central backlog → wait 2-6 weeks → delivery
  Strengths: Consistency, one set of standards, no duplication
  Weaknesses: Bottleneck, slow delivery, team doesn't understand domain deeply
  Best for: Small orgs (<100 people), early-stage data teams, simple source landscape

EMBEDDED (decentralized):
  Structure: Data people embedded in each domain team
  Example: Finance owns fct_revenue, marketing owns customer_lifetime_value, supply chain owns fct_inventory
  Request flow: Each domain ships its own marts and metrics directly
  Strengths: Domain expertise, fast iteration
  Weaknesses: Fragmented standards, duplicated work, hard to do cross-domain analysis
  Best for: Companies with strong domain autonomy, data-mature product teams

FEDERATED (data mesh):
  Structure: Platform team + domain data teams
  Example: Domains publish certified data products into a shared catalog with common contracts
  Request flow:
    Domain team builds stg_*/marts models using self-serve platform tooling
    Platform team maintains shared infrastructure, lineage, and quality standards
    Federated governance council resolves cross-domain metric disputes
  Strengths: Combines domain expertise WITH shared standards
  Weaknesses: Requires mature platform engineering AND domain data capability
  Best for: Large orgs (>500 people), multiple domains, central-team bottleneck pain
```

### Failed data mesh adoption (anti-pattern)
```
What went wrong at a mid-size SaaS company:

Step 1: CTO reads "Data Mesh" by Zhamak Dehghani
Step 2: Announces "We're doing data mesh!" at all-hands
Step 3: Domains told "you now own your data" with no additional headcount
Step 4: Platform team has 1 engineer (was 3, 2 reassigned to "domain teams")
Step 5: Finance builds fct_revenue one way, marketing builds customer_lifetime_value another way
Step 6: No shared catalog, no data contracts, no lineage standard
Step 7: 6 months later: 5 incompatible customer definitions, zero trusted data products
Step 8: CTO declares "data mesh doesn't work"

Root cause: Data mesh is an operating model, not a technology.
You need: capable domains + mature platform + federated governance framework.
Missing any of these = failure.
```

## Sources
- [[raw/articles/data-mesh-principles-html]] - Martin Fowler's data mesh principles
- [[raw/articles/www-datamesh-architecture-com]] - data mesh from an engineering perspective
- [[raw/papers/s12599-024-00876-5]] - Data products, data mesh, and data fabric (Springer)
