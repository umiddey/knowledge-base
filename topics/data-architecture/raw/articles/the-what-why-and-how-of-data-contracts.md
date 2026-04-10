# The What Why And How Of Data Contracts

Source: https://datahub.com/blog/the-what-why-and-how-of-data-contracts/

   What Are Data Contracts? A Practical Guide | DataHub                                                                                                           

[Skip to content](#main)

[![DataHub](https://datahub.com/wp-content/uploads/2026/01/dataHub_logo_color_black.svg)](https://datahub.com/)

*   [ProductExpand](https://datahub.com/products/)
    *   [Product Overview](https://datahub.com/products/)
    *   [Discovery](https://datahub.com/products/data-discovery/)
    *   [Observability](https://datahub.com/products/data-observability/)
    *   [Governance](https://datahub.com/products/data-governance/)
    *   [Lineage](https://datahub.com/products/data-lineage/)
    *   [AI](https://datahub.com/products/ai-data-management/)
    *   [Why DataHub Cloud](https://datahub.com/products/why-datahub-cloud/)
    *   [DataHub Cloud vs Core](https://datahub.com/products/cloud-vs-core/)
    *   [Integrations](https://docs.datahub.com/integrations)
    *   [Product Demos](https://datahub.com/resources/product-demos/)
*   [CommunityExpand](https://datahub.com/community/)
    *   [Join The Community](https://datahub.com/community/)
    *   [Town Halls](https://datahub.com/community/datahub-town-halls/)
    *   [Office Hours](https://datahub.com/community/office-hours/)
    *   [Slack](https://datahub.com/slack/)
    *   [YouTube](http://youtube.com/channel/UC3qFQC5IiwR5fvWEqi_tJ5w)
    *   [Docs](https://docs.datahub.com/docs/features)
    *   [Champions](https://datahub.com/champions/)
    *   [Share Your Journey](https://datahub.com/share-your-journey/)
*   [ResourcesExpand](https://datahub.com/resources/)
    *   [Blog](https://datahub.com/blog/)
    *   [Guides](https://datahub.com/resources/?2004611554=dh-guides)
    *   [Events](https://datahub.com/events/)
    *   [Customer Stories](https://datahub.com/resources/?2004611554=dh-stories)
    *   [Webinars](/resources/?2004611554=dh-webinars)
    *   [Articles](https://datahub.com/resources/?2004611554=dh-resource-articles)
    *   [Docs](https://docs.datahub.com/docs)
    *   [Get Support](https://support.datahub.com/hc/en-us)
    *   [Live Group Demo](https://datahub.com/demos/bi-weekly-demo/)
*   [CompanyExpand](https://datahub.com/company/)
    *   [About Us](/company/#where-it-began)
    *   [PartnersExpand](https://datahub.com/partners/)
        *   [AWS](https://datahub.com/partners/aws/)
        *   [Google Cloud](https://datahub.com/partners/google-cloud/)
        *   [Snowflake](https://datahub.com/partners/snowflake/)
    *   [Careers](https://datahub.com/datahub-careers/)
    *   [News](https://datahub.com/news/)

[![Slack logo in color](https://datahub.com/wp-content/uploads/2025/03/Slack_icon_20px.svg)](https://datahub.com/slack/)[Github](https://github.com/datahub-project/datahub)

[Get DataHub Cloud](https://datahub.com/get-datahub-cloud/)

[![DataHub](https://datahub.com/wp-content/uploads/2026/01/dataHub_logo_color_black.svg)](https://datahub.com/)

Toggle Menu

# What Are Data Contracts? A Practical Guide to Getting Started

By:

Lakshay Nasa

|

March 31, 2026

Table of Contents

1.  [Quick definition: Data contracts](#quick-definition-data-contracts)
2.  [What is a data contract?](#what-is-a-data-contract)
3.  [Why do data contracts matter?](#why-do-data-contracts-matter)
4.  [What's inside a data contract?](#whats-inside-a-data-contract)
5.  [Where do data contracts fit in the data stack?](#where-do-data-contracts-fit-in-the-data-stack)
6.  [How to implement data contracts (without starting from scratch)](#how-to-implement-data-contracts-without-starting-from-scratch)
7.  [Best practices for data contracts](#best-practices-for-data-contracts)
8.  [FAQs](#faqs)

## Quick definition: Data contracts

A data contract is a formal agreement between a data producer and a data consumer that defines what the data should look like, how reliable it needs to be, and what happens when those expectations aren’t met.

If you work with data at any scale, you’ve probably felt the problem data contracts are designed to solve, even if you didn’t have a name for it.

A pipeline breaks. A column changes type. A field that used to be non-null starts showing up empty. The downstream dashboard goes red, or worse, it keeps running and starts serving wrong numbers that nobody catches for a week. The person who changed the upstream schema had no idea anyone was depending on that field. The person whose report broke had no idea the schema was going to change.

Data contracts exist to close that gap. And while the concept has been discussed extensively over the last few years, many data engineers are still unclear on what a contract actually is and, just as importantly, what it _isn’t_.

## What is a data contract?

At its core, a data contract specifies the shape, quality standards, and operational guarantees for a dataset and establishes what happens when those guarantees aren’t met. It’s the agreement that turns implicit assumptions between producers and consumers into explicit, enforceable commitments.

Specifically, a contract covers:

*   **The shape of the data:** Schema, column names, data types, and semantics
*   **Quality expectations:** Column-level and table-level assertions about completeness, accuracy, and validity
*   **Freshness guarantees:** Service level objectives for how up-to-date the data will be when consumers access it
*   **Enforcement terms:** What happens when the contract is violated, who gets notified, and how violations are resolved

![ clean diagram showing the producer-consumer relationship with the contract as the layer between them.](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20451'%3E%3C/svg%3E)

This is where it’s worth drawing a distinction that often gets blurred: A data contract is typically implemented as a verifiable layer. It’s the set of assertions you can programmatically test against the physical data asset itself. Things like documentation, ownership, and tags are valuable metadata (essential, in fact) but they aren’t validated in the same way as schema or freshness constraints. You can’t apply the same type of assertion to ownership or tags as you would to schema or freshness, though these can still be validated through platform-specific checks. You can run one against a schema definition or a freshness SLA.  
  
This isn’t a pedantic distinction. It’s the difference between a commitment that can be enforced and a piece of documentation that might go stale. When people talk about data contracts, they often lump in everything that describes a dataset. But a contract, in any domain, is the part you can _actually hold someone to_.

### What a data contract is _not_

**A data contract is not a dataset DDL.** DDL defines the physical storage layer: What your database will or won’t accept. It’s a component of a contract, but it doesn’t capture semantics, freshness requirements, quality expectations, or enforcement terms.  
  
**A data contract is also not the same thing as a data product.** Think of contracts as inputs to data products: A data product is a curated, governed collection of assets packaged for consumption. A contract is the verifiable guarantee layer applied to individual assets within that product. A single data product can rely on multiple contracts, and the same contract can serve multiple products.

## Why do data contracts matter?

The problem data contracts solve is structural, not incidental.

As data moves through modern data pipelines (enriched, transformed, joined, aggregated), the people who produce the source data lose visibility into which fields and attributes are actually driving value downstream. Meanwhile, the people consuming it lose confidence in what they’re building on. By the time an asset reaches production, it may be several layers of transformation removed from its source. The producer has no idea which columns are critical. The consumer has no idea when something upstream might change.

Contracts close this gap by creating a verifiable commitment that both sides can point to. They protect data consumers from breaking changes and data quality issues (dropped columns, changed data types, unexpected nulls) and they give consumers a reliable foundation to build on. They give data producers line-of-sight into downstream impact, making it clear which fields matter and why.

This is also a cultural problem, not just a technical one: Getting producers to think about downstream data use cases requires a shift in mindset. But a contract makes that shift concrete and manageable rather than abstract. You’re not asking software engineers to “care about data quality” in the general sense; you’re asking them to honour a specific set of assertions on a specific asset.

And the stakes keep rising. As more organizations build AI and machine learning pipelines that depend on data assets, the blast radius of a contract violation grows. A broken freshness SLA isn’t just a stale dashboard. It could be a degraded model making bad predictions in production. Contracts matter more, not less, when the downstream consumer isn’t a human individual checking a report but an automated AI system that fails silently.

## What’s inside a data contract?

A well-defined contract covers four core areas. Here’s the summary:

Table of Contents

1.  [Quick definition: Data contracts](#quick-definition-data-contracts)
2.  [What is a data contract?](#what-is-a-data-contract)
3.  [Why do data contracts matter?](#why-do-data-contracts-matter)
4.  [What's inside a data contract?](#whats-inside-a-data-contract)
5.  [Where do data contracts fit in the data stack?](#where-do-data-contracts-fit-in-the-data-stack)
6.  [How to implement data contracts (without starting from scratch)](#how-to-implement-data-contracts-without-starting-from-scratch)
7.  [Best practices for data contracts](#best-practices-for-data-contracts)
8.  [FAQs](#faqs)

**Element**

**What it does**

**Schema definition**

Specifies the expected structure, column names, data types, and semantic meaning of the data

**Data quality assertions**

Defines testable rules for completeness, accuracy, and validity at the table and column level

**Freshness SLA**

Sets guarantees for how current the data will be when consumers access it

**Enforcement and violation handling**

Specifies what happens when assertions fail — alerts, blocking, quarantine, and escalation

### 1\. Schema definition

The schema contract defines the logical structure consumers can depend on: 

*   Which columns exist
*   Their data types
*   Whether they’re nullable
*   What they represent

This goes beyond DDL. A schema contract captures semantic meaning (the difference between a column called `status` that contains account lifecycle stages and one called `status` that contains HTTP response codes). 

When the schema contract is violated (a column is dropped, a type changes, a new required field appears), that violation should be caught before the change reaches consumers.

### 2\. Data quality assertions

Quality assertions are the testable rules applied at the column and table level. 

These might include constraints like: `email` must match a valid format, `revenue` must be non-negative, `customer_id` must never be null (catching missing or incomplete data before it reaches consumers), or the total row count must not drop by more than 10% between refreshes. 

The specificity matters: Vague quality goals are unenforceable. Assertions should be concrete enough that a tool can evaluate them and return a pass or fail.

### 3\. Freshness SLA

A freshness contract defines when the data will be available for consumption. 

This is an operational commitment: If your contract guarantees that a table will be refreshed by 6:00 AM UTC daily, consumers can build workflows and reports that depend on that cadence. 

When the SLA is missed, that’s a contract violation, and the contract should specify how it’s handled.

### 4\. Enforcement and violation handling

A contract without enforcement is just documentation. The enforcement layer defines what happens when an assertion fails. 

Options range and may include:

*   **Alert:** Notify the producer and consumer
*   **Block:** Prevent schema-breaking changes from deploying via CI/CD
*   **Quarantine:** Route bad records to an isolated queue for review while clean data flows through

The right approach depends on the severity and the context, but the key is that violations produce a defined response, not silence.

### Sample data contract

Here’s what a basic data contract looks like in practice—a YAML definition covering schema, freshness, and quality assertions for a single dataset:

    mutation createDataContract {
      upsertDataContract(
        input: {
          entityUrn: "urn:li:dataset:(urn:li:dataPlatform:snowflake,analytics.user_events,PROD)",
          schema: [{ assertionUrn: "urn:li:assertion:schema-user-events-columns" }],
          freshness: [{ assertionUrn: "urn:li:assertion:freshness-user-events-daily" }],
          dataQuality: [
            { assertionUrn: "urn:li:assertion:quality-user-id-not-null" },
            { assertionUrn: "urn:li:assertion:quality-user-id-unique" }
          ]
        }
      ) {
        urn
      }
    }

## Where do data contracts fit in the data stack?

Don’t overthink this. A contract belongs wherever there’s a handoff between a producer and a cDon’t overthink this. A contract belongs wherever there’s a handoff between a producer and a consumer. And keep in mind your team may be both the producer and the consumer in the same pipeline.

Wherever that handoff happens, contracts should be: 

*   **Version-controlled**: Tracked in Git, not floating in a wiki
*   **Discoverable:** Surfaced in a catalog, not buried in a repo nobody checks
*   **Programmatically enforced:** Validated by tooling, not dependent on someone remembering to run a check

There are three common enforcement patterns:

1.  **CI/CD integration:** Evaluate schema-breaking changes before deployment. If a proposed change would violate a contract, block the merge. This is the “shift left” approach: Catching problems before they reach production.
2.  **Stream-level validation:** If you’re using a stream processing system, validate each record against the contract’s expectations in flight. Records that fail are routed to a dead-letter queue for review; clean records proceed. This prevents low-quality data from entering the data product.
3.  **Monitoring layer:** After data arrives, evaluate statistical distributions and detect unexpected changes in the shape of the data. This catches the problems that schema checks miss, like gradual drift, anomalous distributions, and unexpected volume changes.

Many mature implementations use a combination of all three.

## How to implement data contracts (without starting from scratch)

If you’ve read other implementation guides for data contracts, you may have noticed they tend to frame the process as a significant infrastructure initiative: A multi-step program with formal drafting processes and extensive stakeholder alignment before you write a single assertion.

In practice, most teams already have the building blocks. If you’re running dbt tests, you have schema assertions. If you’ve set up Great Expectations suites, you have quality checks. If you’ve encoded validation logic in your Airflow DAGs, you’re already enforcing expectations on your data. The raw material for a data contract probably exists in your stack right now… it just hasn’t been formalized as one.

!["New Data Contract" modal showing three selected assertions: a Freshness check (currently failing), a Schema change check (passing), and an AI-generated Data Quality volume check.](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20914'%3E%3C/svg%3E)

The more practical path is to start from what you have and build up:

### 1\. Start with one high-value asset

Pick a production dataset where failures have real downstream consequences, like something tied to revenue, compliance, or a business-critical workflow. The goal isn’t to boil the ocean. It’s to prove the model works on something that matters.

### 2\. Define a small set of meaningful constraints

Start with one or two assertions that are easy to understand and easy to debug. A schema check and a freshness SLA are a solid starting point. Add quality assertions incrementally as the team builds familiarity. Complexity should increase gradually, not arrive all at once.

### 3\. Use your metadata graph to prioritize what comes next

This is where the approach becomes more strategic: 

*   [Data lineage](https://datahub.com/products/data-lineage/) shows you which assets are most depended-on downstream
*   [Data quality](https://datahub.com/blog/data-quality-belongs-in-the-data-catalog/) profiling shows you which are the least reliable

The intersection (highly depended-on, less reliable) is where your next contract should go. The metadata graph turns contract prioritization from a guessing game into a methodical and evidence-based approach.

### 4\. Connect contracts to data products

Once you have contracts on individual assets, [data products](https://datahub.com/blog/data-products-in-datahub-everything-you-need-to-know/) become the natural next layer. A data product bundles related assets together with ownership, documentation, and governance metadata. Contracts provide the verifiable guarantee layer within that product. 

Together, they combine the descriptive metadata (who owns this, what it’s for, how it’s documented) with the verifiable metadata (does the data actually meet the stated standards). That’s the [full picture](https://docs.datahub.com/docs/managed-datahub/observe/data-contract), not just documented, but enforced.

![DataHub Data Contract view for the "customers" table showing a contract violation — freshness is failing and a data quality assertion is completing with errors.](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%20999'%3E%3C/svg%3E)

## Best practices for data contracts

The principles behind effective data contracts aren’t complicated, but they’re easy to skip when teams are moving fast. These are the ones that tend to separate successful data contract implementation from contracts that quietly get abandoned:

*   **Start small and expand:** Resist the temptation to define contracts across your entire data estate. Start with one or two high-impact assets, prove the approach, and let adoption grow organically.
*   **Meet teams where they are:** The more a contract implementation deviates from existing workflows, the harder it is to scale. If your engineers live in GitHub, put contracts in Git. If they use dbt, build on dbt tests. Minimize friction.
*   **Version-control everything:** Contracts evolve. Schema requirements change, SLAs get renegotiated, quality thresholds adjust as you learn more about the data. Treating contracts as code means changes are tracked, reviewable, and reversible.
*   **Make contracts discoverable:** A contract nobody can find is a contract nobody follows. Surface contracts in your data catalog alongside the assets they govern so that consumers can see what guarantees exist before they start building.
*   **Assign clear ownership:** Every contract needs an owner, typically the producer of the data asset. Ownership doesn’t mean doing all the work; it means being accountable for the contract’s accuracy and responding when violations occur.
*   **Revisit and renegotiate:** Contracts aren’t static. As use cases evolve, consumers change, and business requirements shift, the contract should be reviewed and updated. Build a regular cadence for this — it prevents contracts from drifting into irrelevance.

Data contracts aren’t a new category of tooling to evaluate or a framework to adopt wholesale. They’re a formalization of something most data teams are already doing informally: Setting expectations about what data should look like and how reliable it needs to be. The shift is making those expectations verifiable, discoverable, and enforced.

If you’re already running quality checks, schema tests, or freshness monitors, you’re closer to a working data contract than you might think. The next step is formalizing what you have, starting where failures cost the most, and building from there.

DataHub supports data contracts natively — combining schema assertions, freshness SLAs, and data quality checks with lineage and governance in a single platform. 

[Explore how data contracts work in DataHub →](https://docs.datahub.com/docs/managed-datahub/observe/data-contract)

## Future-proof your data catalog

DataHub transforms enterprise metadata management with AI-powered discovery, intelligent observability, and automated governance.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201024%201024'%3E%3C/svg%3E)

### [Explore DataHub Cloud](https://datahub.com/product-tour/)

Take a [self-guided product tour](https://datahub.com/product-tour/) to see DataHub Cloud in action.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20127%20127'%3E%3C/svg%3E)

### [Join the DataHub open source community](https://datahub.com/slack/) 

Join our [14,000+ community members](https://datahub.com/community/) to collaborate with the data practitioners who are shaping the future of data and AI.

## FAQs

### What’s the difference between data contracts and data products?

*   **A data contract** is typically implemented as a set of verifiable assertions applied to an individual data asset—schema checks, quality rules, and freshness SLAs.
*   **A [data product](https://datahub.com/blog/data-products-in-datahub-everything-you-need-to-know/)** is a higher-level construct: A curated collection of related assets bundled together with ownership, documentation, and governance. 

Data contracts are the verifiable layer within a data product. A single data product typically contains multiple contracted assets, and the same contract can serve more than one product.  

### How do data contracts relate to SLAs?

Freshness service level agreements (SLAs) are one component of a data contract, but not the whole thing. SLAs typically define when data will be available. For example, a guarantee that a table is refreshed by 6:00 AM UTC daily. A data contract includes the freshness SLA alongside schema definitions, quality assertions, and enforcement rules. Think of the SLA as one clause in a broader agreement

### What’s the difference between a data contract and a schema registry?

A schema registry (like Confluent’s Kafka Schema Registry) stores and validates schemas for data exchange in transit. It’s useful for preventing schema-breaking changes in streaming pipelines. 

A data contract is broader: It includes the schema definition but also covers data quality rules, freshness guarantees, and enforcement terms. A schema registry might be part of how you enforce the schema component of a contract, but the contract itself encompasses more than schema alone.

### What’s the difference between a data contract and a dataset DDL?

DDL (Data Definition Language) defines the physical storage structure of a dataset: The columns, data types, and constraints your database will accept. It’s what your technology enforces at the storage layer. 

A data contract goes further: It captures semantic meaning (what the data represents, not just its type), freshness commitments (when the data will be available), quality assertions (beyond what DDL constraints can express), and enforcement terms (what happens when something breaks). DDL is a component of a contract, but a contract is not just a DDL.

### Who owns a data contract?

In most implementations, the producer of the data asset owns the contract. This makes sense because the producer is in the best position to define and enforce schema expectations, freshness guarantees, and quality assertions at the source. 

That said, contracts should be developed collaboratively: Producers and data consumers both provide input on which fields they depend on, what quality thresholds matter, and what freshness cadence their workflows require. The producer owns the commitment; the consumer helps define what that commitment needs to include.  

### What tools can you use to implement data contracts?

Data contracts can be implemented using a range of approaches. Some teams define them using existing tools, while others use platforms like DataHub to define and manage them centrally:

*   Schema assertions can be defined using Protobuf, Avro, or JSON Schema and stored in a schema registry 
*   Quality checks can be built with dbt tests, Great Expectations, or Soda 
*   Freshness monitoring can be handled through pipeline orchestrators like Airflow or through dedicated observability tools

A data catalog like [DataHub](https://datahub.com/products/) ties these together while also allowing you to define and manage contracts directly, providing a centralized place to define, discover, and monitor [contracts alongside the assets they govern](https://docs.datahub.com/docs/managed-datahub/observe/data-contract), with lineage context that helps you prioritize where contracts matter most.  

### How do data contracts support data governance?

Data contracts play a practical role in governance: Where governance policies set broad standards for data quality, access, and compliance, contracts translate those standards into testable, enforceable commitments on specific assets. 

A governance policy might say, ”sensitive data like customer PII must be masked in non-production environments”. A contract makes that assertion testable. When contracts are surfaced in a catalog and connected to lineage, they also provide auditable evidence that governance standards are being met, which is useful for compliance reporting and internal reviews.

### How do data contracts relate to AI and machine learning?

Data contracts become more critical as organizations build AI and ML pipelines. When the downstream consumer of a data asset is a machine learning model rather than a dashboard or report, the consequences of poor data quality change:

*   A broken freshness SLA might mean a model is training on stale data
*   A schema change might silently alter feature distributions
*   A quality assertion failure might introduce noise that degrades predictions without any obvious error

Because these failures tend to compound silently rather than surface as a visible break, contracts provide a structured way to catch problems at the data layer before they propagate into model behaviour. As AI adoption grows, the argument for formalizing data contracts on the assets feeding those pipelines only gets stronger.

Table of Contents

1.  [Quick definition: Data contracts](#quick-definition-data-contracts)
2.  [What is a data contract?](#what-is-a-data-contract)
3.  [Why do data contracts matter?](#why-do-data-contracts-matter)
4.  [What's inside a data contract?](#whats-inside-a-data-contract)
5.  [Where do data contracts fit in the data stack?](#where-do-data-contracts-fit-in-the-data-stack)
6.  [How to implement data contracts (without starting from scratch)](#how-to-implement-data-contracts-without-starting-from-scratch)
7.  [Best practices for data contracts](#best-practices-for-data-contracts)
8.  [FAQs](#faqs)

### Recommended Next Reads

*   [
    
    ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20768%20402'%3E%3C/svg%3E)
    
    ](https://datahub.com/blog/data-products-in-datahub-everything-you-need-to-know/)
    
    blog
    
    [
    
    Data Products: From Concept to Implementation
    
    ](https://datahub.com/blog/data-products-in-datahub-everything-you-need-to-know/)
*   [
    
    ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20768%20432'%3E%3C/svg%3E)
    
    ](https://datahub.com/blog/what-is-data-catalog/)
    
    blog
    
    [
    
    What Is a Data Catalog?
    
    ](https://datahub.com/blog/what-is-data-catalog/)
*   [
    
    ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20768%20432'%3E%3C/svg%3E)
    
    ](https://datahub.com/demos/bi-weekly-demo/)
    
    Demo
    
    [
    
    Experience DataHub Cloud: Full Platform Demo
    
    ](https://datahub.com/demos/bi-weekly-demo/)

* * *

![](https://datahub.com/wp-content/uploads/2023/03/hero-what-are-data-contracts-scaled.avif)

[![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20488%20120'%3E%3C/svg%3E)](https://datahub.com/)

 

[](https://www.linkedin.com/company/datahub-cloud/)

[](https://github.com/datahub-project)

[](https://x.com/DataHubCloud)

[](https://datahub.com/slack/)

## PRODUCT

*   [Products](https://datahub.com/products/)
*   [Discovery](https://datahub.com/products/data-discovery/)
*   [Observability](https://datahub.com/products/data-observability/)
*   [Governance](https://datahub.com/products/data-governance/)
*   [Lineage](https://datahub.com/products/data-lineage/)
*   [AI Data Management](https://datahub.com/products/ai-data-management/)
*   [Why DataHub Cloud](https://datahub.com/products/why-datahub-cloud/)
*   [DataHub Cloud vs Core](https://datahub.com/products/cloud-vs-core/)
*   [Product Demos](https://datahub.com/resources/product-demos/)

## Community

*   [Join the Community](https://datahub.com/community/)
*   [Docs](https://docs.datahub.com/)
*   [Slack](https://datahub.com/slack/)
*   [YouTube](http://youtube.com/channel/UC3qFQC5IiwR5fvWEqi_tJ5w)
*   [Events](https://datahub.com/events/)
*   [Champions](https://datahub.com/champions/)
*   [Share Your Journey](https://datahub.com/share-your-journey/)

## Resources

*   [Customer Stories](https://datahub.com/resources/?2004611554=dh-stories)
*   [Blog](https://datahub.com/blog/)
*   [Guides](https://datahub.com/resources/?2004611554=dh-guides)
*   [Articles](https://datahub.com/resources/?2004611554=dh-resource-articles)
*   [Webinars](https://datahub.com/resources/?2004611554=dh-webinars)
*   [Get Support](https://support.datahub.com/hc/en-us)
*   [Live Group Demo](https://datahub.com/demos/bi-weekly-demo/)

## Company

*   [About Us](/company/#where-it-began)
*   [Leadership](/company/#leadership)
*   [News](https://datahub.com/news/)
*   [Careers](https://datahub.com/datahub-careers/)

© 2026 [Acryl Data, Inc.](https://www.acryldata.io/)

*   [Privacy Policy](https://datahub.com/privacy-policy/)
*   [Terms of Service](https://datahub.com/terms-of-service/)
*   [Security](https://datahub.com/security/)

 

*   [Product](https://datahub.com/products/)Toggle child menuExpand
    
    *   [Product Overview](https://datahub.com/products/)
    *   [Discovery](https://datahub.com/products/data-discovery/)
    *   [Observability](https://datahub.com/products/data-observability/)
    *   [Governance](https://datahub.com/products/data-governance/)
    *   [Lineage](https://datahub.com/products/data-lineage/)
    *   [AI](https://datahub.com/products/ai-data-management/)
    *   [Why DataHub Cloud](https://datahub.com/products/why-datahub-cloud/)
    *   [DataHub Cloud vs Core](https://datahub.com/products/cloud-vs-core/)
    *   [Integrations](https://docs.datahub.com/integrations)
    *   [Product Demos](https://datahub.com/resources/product-demos/)
*   [Community](https://datahub.com/community/)Toggle child menuExpand
    
    *   [Join The Community](https://datahub.com/community/)
    *   [Town Halls](https://datahub.com/community/datahub-town-halls/)
    *   [Office Hours](https://datahub.com/community/office-hours/)
    *   [Slack](https://datahub.com/slack/)
    *   [YouTube](http://youtube.com/channel/UC3qFQC5IiwR5fvWEqi_tJ5w)
    *   [Docs](https://docs.datahub.com/docs/features)
    *   [Champions](https://datahub.com/champions/)
    *   [Share Your Journey](https://datahub.com/share-your-journey/)
*   [Resources](https://datahub.com/resources/)Toggle child menuExpand
    
    *   [Blog](https://datahub.com/blog/)
    *   [Guides](https://datahub.com/resources/?2004611554=dh-guides)
    *   [Events](https://datahub.com/events/)
    *   [Customer Stories](https://datahub.com/resources/?2004611554=dh-stories)
    *   [Webinars](/resources/?2004611554=dh-webinars)
    *   [Articles](https://datahub.com/resources/?2004611554=dh-resource-articles)
    *   [Docs](https://docs.datahub.com/docs)
    *   [Get Support](https://support.datahub.com/hc/en-us)
    *   [Live Group Demo](https://datahub.com/demos/bi-weekly-demo/)
*   [Company](https://datahub.com/company/)Toggle child menuExpand
    
    *   [About Us](/company/#where-it-began)
    *   [Partners](https://datahub.com/partners/)Toggle child menuExpand
        
        *   [AWS](https://datahub.com/partners/aws/)
        *   [Google Cloud](https://datahub.com/partners/google-cloud/)
        *   [Snowflake](https://datahub.com/partners/snowflake/)
    *   [Career