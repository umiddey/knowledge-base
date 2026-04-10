# Enterprise Integration Patterns

Source: https://tacnode.io/post/enterprise-integration-patterns

Enterprise Integration Patterns for Streaming and AI Architectures \[2026\] | Tacnode Blog                       

[![Tacnode](/images/brand/tacnode-horizontal-v3.webp)Your Singular Point of Truth](/)

ProductSolutions[Pricing](/pricing)ResourcesCompany

[Sign In](https://us-app.tacnode.io/signin)[Book a Demo](/book-a-demo)Toggle theme

[Back to Blog](/resources/blog)

Data Engineering

# Enterprise Integration Patterns for Streaming and AI Architectures \[2026\]

Publish-subscribe, content-based routing, CDC, event sourcing — the patterns haven't changed, but the architectures have. How each enterprise integration pattern applies in modern streaming, event-driven, and AI agent systems.

[![Boyd Stowe](/images/team/boyd-stowe.webp)

Boyd Stowe

Solutions Engineering



](/author/boyd-stowe)

Feb 22, 2026

16 min read

![Message flow diagram showing enterprise integration patterns including routing, filtering, enrichment, and pub-sub distribution to AI agents and ML models](/images/blog/enterprise-integration-patterns.svg)

**TL;DR:** Enterprise integration patterns — codified by Hohpe & Woolf in 2003 — are reusable solutions for connecting systems and routing data. The core patterns (publish-subscribe, content-based routing, pipes-and-filters, aggregator, scatter-gather) evolved from ESBs to event streaming platforms like Kafka. Data integration patterns (CDC, event sourcing, materialized views) determine freshness: batch ETL gives hours, CDC gives seconds, streaming materialized views give sub-second. AI agents are the new integration consumers — every pattern applies directly to agent architecture design.

Every organization runs on integration. Dozens of systems — databases, APIs, SaaS platforms, data warehouses, ML models — need to exchange data continuously. When integration works, data flows from where it's produced to where it's needed without friction. When it breaks, decisions stall, pipelines fail, and teams waste weeks debugging data inconsistencies.

The patterns for solving these problems were codified over twenty years ago. In 2003, Gregor Hohpe and Bobby Woolf published _Enterprise Integration Patterns_, cataloging 65 patterns for connecting disparate systems through messaging. The book became the standard reference for integration architecture — and its patterns are more relevant now than ever.

Why? Because the systems doing the integrating have changed. The consumers of integrated data now include [AI agents](/post/llm-agents-complete-guide) that make autonomous decisions, streaming pipelines that process millions of events per second, and ML models that need [fresh features](/post/feature-freshness-explained) at inference time. The patterns endure. The implementations have evolved from enterprise service buses to event streaming platforms, from batch file transfers to real-time change data capture.

This guide covers the enterprise integration patterns that matter most for modern data architectures — what each pattern solves, how it maps to today's streaming and event-driven systems, and how to choose the right integration design pattern for your use case.

## What Are Enterprise Integration Patterns?

Enterprise integration patterns are reusable solutions to recurring problems in connecting software systems. They provide a shared vocabulary — a common language that architects, engineers, and data teams can use to design, discuss, and document how systems exchange data.

Hohpe and Woolf identified four fundamental integration styles, each representing a different approach to connecting systems:

**File Transfer** — systems exchange data by writing and reading files. One system produces a file (CSV, JSON, XML), another system picks it up. Simple but slow, with no real-time capability and significant freshness problems. Still common in legacy batch ETL pipelines.

**Shared Database** — multiple systems read from and write to the same database. Tight coupling, schema contention, and scaling bottlenecks make this approach fragile at scale. But it's tempting because it's simple — until it isn't.

**Remote Procedure Call (RPC)** — one system calls another directly, synchronous request-response. REST APIs, gRPC, and GraphQL are modern forms. Works well for point-to-point interactions but creates tight coupling between caller and callee. If the downstream service is slow or unavailable, the upstream system blocks or fails.

**Messaging** — systems communicate by sending messages through an intermediary (a message broker or event streaming platform). The producer doesn't need to know who consumes the message or when. This decoupling is the foundation of scalable, resilient integration.

Messaging won. Not because the other styles disappeared — file transfer and RPC are still everywhere — but because messaging is the only style that scales to hundreds of producers and consumers while maintaining loose coupling and supporting real-time data flow. Modern event streaming platforms like Apache Kafka are the direct evolution of the messaging patterns Hohpe and Woolf described.

The enterprise integration patterns built on top of messaging — routing, transformation, aggregation, splitting — form the toolkit for designing data flows between any set of systems. Understanding these integration design patterns is essential for anyone building data pipelines, event-driven architectures, or [real-time AI systems](/post/what-is-data-freshness).

## Core Messaging Patterns

The messaging patterns are the foundation layer. Every other enterprise integration pattern builds on these four primitives:

Pattern

What It Does

Classic Implementation

Modern Implementation

Message Channel

A named conduit that carries messages from sender to receiver

JMS queue or topic

Kafka topic, Pulsar topic, Kinesis stream

Message Router

Reads a message and decides which channel to forward it to based on content or rules

ESB routing engine

Stream processor with conditional logic, Kafka Streams branching

Message Translator

Converts a message from one format to another so different systems can communicate

XSLT transformation in ESB

Schema registry with Avro/Protobuf evolution, stream processing transformations

Message Endpoint

The connection point where an application sends or receives messages

JMS producer/consumer

Kafka producer/consumer client, CDC connector, webhook receiver

The shift from classic to modern implementations isn't just a technology swap. It reflects a fundamental change in how integration messaging works. Classic message brokers (ActiveMQ, RabbitMQ, JMS) were designed for transactional messaging — guaranteed delivery of individual messages between known senders and receivers. Modern event streaming platforms are designed for continuous data flow — high-throughput, ordered, replayable streams of events consumed by an unknown and evolving set of consumers.

This distinction matters because it changes which enterprise integration patterns are most important. In a transactional messaging world, the critical patterns are guaranteed delivery, message acknowledgment, and dead letter queues. In a streaming world, the critical patterns are partitioning, consumer groups, exactly-once semantics, and stream processing topologies.

## Integration Design Patterns for Event-Driven Systems

These are the enterprise integration patterns that matter most when you're building on event streaming and real-time data pipelines. Each pattern solves a specific routing, transformation, or composition problem:

**Publish-Subscribe.** The most important enterprise messaging pattern for modern architectures. A producer publishes events to a topic. Any number of consumers subscribe and receive a copy. The producer doesn't know or care who consumes the events. This is the pattern that enables decoupled, scalable data distribution — one event stream feeding dashboards, ML models, search indexes, and [AI agents](/post/llm-agents-complete-guide) simultaneously.

Classic implementation: JMS topics with durable subscribers. Modern implementation: Kafka topics with consumer groups. The key difference is retention — Kafka retains events for days or weeks, allowing new consumers to replay history. Classic pub-sub was fire-and-forget.

**Content-Based Router.** Inspects each message and routes it to different channels based on its content. An order event might route to the fraud detection pipeline if the amount exceeds $10,000, to the standard fulfillment pipeline otherwise. In streaming systems, this is implemented as branching logic in a stream processor — read from one topic, evaluate conditions, write to different output topics.

**Pipes and Filters.** Decomposes a complex processing task into a sequence of independent stages, each performing a single transformation. Event enters the pipeline, passes through validation, enrichment, transformation, and aggregation stages, and exits as a processed result. Each stage is independently deployable and scalable. This is the architecture of every modern streaming data pipeline — a directed acyclic graph (DAG) of processing steps connected by message channels.

**Aggregator.** Collects related messages and combines them into a single composite message. In streaming systems, this typically means windowed aggregations — collect all events within a 5-minute window and compute a summary. Critical for building real-time analytics, session tracking, and feature computation for ML models.

**Splitter.** The inverse of the aggregator — takes a single composite message and breaks it into individual messages. An order containing multiple line items becomes individual item events. A batch API response becomes individual records. Splitters are essential at the boundary between batch and streaming systems, decomposing bulk data into the granular events that streaming pipelines consume.

**Scatter-Gather.** Broadcasts a request to multiple recipients, then aggregates their responses into a single result. In [multi-agent architectures](/post/multi-agent-architecture), this pattern enables parallel execution — fan a question out to multiple specialized agents, collect their answers, and synthesize a response. It's also the pattern behind parallel enrichment: enrich an event by querying multiple services concurrently, then merge the results.

## Data Integration Patterns

While messaging patterns move events between systems in real time, data integration patterns solve the broader problem of keeping data synchronized across different storage systems — operational databases, data warehouses, feature stores, and search indexes. These patterns determine how fresh, complete, and consistent your data is across the organization.

**Change Data Capture (CDC).** Captures row-level changes (inserts, updates, deletes) from a source database and publishes them as events. Instead of running a batch job that queries the full table every hour, CDC streams individual changes as they happen — typically by reading the database's write-ahead log. The result: downstream systems see changes within seconds instead of hours.

CDC is the modern replacement for batch ETL in most data integration scenarios. It eliminates the [staleness](/post/what-is-stale-data) inherent in batch processing, reduces load on source databases (no more expensive full-table scans), and produces a stream of events that any number of downstream consumers can process. Tools like Debezium, Fivetran, and Airbyte have made CDC accessible to teams that previously relied on nightly batch jobs.

**Event Sourcing.** Instead of storing the current state of an entity, store the complete sequence of events that produced that state. A customer account isn't a row with a balance — it's a sequence of deposits, withdrawals, and transfers. The current state is derived by replaying the event log.

Event sourcing gives you a complete audit trail, the ability to reconstruct state at any point in time (similar to [time travel queries](/post/time-travel-queries)), and the flexibility to build new projections from historical events. The tradeoff is complexity — rebuilding state from thousands of events requires careful design, and eventual consistency between the event log and materialized views demands robust handling.

**Materialized View.** Precompute and store query results derived from a source data stream. Rather than running an expensive join or aggregation at query time, maintain a continuously updated view that reflects the latest state. In streaming architectures, materialized views are built by stream processors that consume events and update a serving layer — a database table, a cache, or a search index.

This pattern is critical for [data freshness](/post/what-is-data-freshness). A materialized view backed by a streaming pipeline can be fresh to within seconds. The same view built by a batch job is only as fresh as the last run. For AI and ML use cases where [feature freshness](/post/feature-freshness-explained) directly impacts model accuracy, streaming materialized views are a requirement, not an optimization.

Pattern

Latency

Complexity

Best For

Batch ETL

Hours

Low

Historical analytics, large backfills, compliance reporting

Change Data Capture

Seconds

Medium

Real-time replication, streaming analytics, fresh feature serving

Event Sourcing

Milliseconds (writes)

High

Audit trails, temporal queries, event-driven microservices

## From ESB to Event Streaming: How Integration Evolved

Understanding where enterprise integration patterns came from helps explain where they're going.

**Point-to-point integration (1990s).** Each system connected directly to every other system it needed data from. N systems required up to N(N-1)/2 connections. This worked at small scale but became unmanageable as organizations added systems. Every new connection meant custom code, and changes to one system cascaded to every system connected to it.

**Enterprise Service Bus (2000s).** The ESB centralized integration logic into a single middleware layer. Systems connected to the bus, and the bus handled routing, transformation, and orchestration. This solved the point-to-point problem but created a new one: the ESB became a monolithic bottleneck. All integration logic lived in one place, owned by one team, deployed as one artifact. Changes were slow. Scaling was expensive. The ESB was a single point of failure for the entire organization's data flow.

**Event streaming (2010s–present).** Apache Kafka and similar platforms introduced a fundamentally different model: a distributed, persistent log of events. Producers write events to topics. Consumers read from topics at their own pace. The platform handles durability, ordering, and scalability. Integration logic moves out of a central bus and into the producers and consumers themselves — each team owns its own event processing.

This shift didn't make enterprise integration patterns obsolete. It made them more accessible. The patterns — routing, transformation, aggregation, pub-sub — are the same. But instead of configuring them in a monolithic ESB, teams implement them in stream processors, microservices, and data pipelines that they own and deploy independently.

The current frontier is the convergence of event streaming with real-time analytics and AI. Systems that can ingest events, process them through integration patterns, and serve the results with millisecond latency — not just to dashboards but to [AI agents](/post/llm-agents-complete-guide) making real-time decisions. The integration design patterns stay the same. The performance requirements and the consumers have changed.

## Enterprise Integration Patterns for AI Agents

AI agents are integration consumers. When an agent queries a database, calls an API, retrieves context from a vector store, and takes an action, it's executing a chain of integration patterns. Understanding this reframes enterprise integration from a "backend plumbing" concern into a critical component of AI system design.

**Agents as event consumers.** An agent that subscribes to an event stream receives real-time context as events happen — a new customer order, a price change, a fraud alert. This is the publish-subscribe pattern applied to AI. Instead of an agent polling a database every 30 seconds (and getting [stale data](/post/what-is-stale-data) between polls), the agent consumes a continuous stream of events. Every decision is based on the latest available information.

**Request-Reply for tool use.** When an agent calls a tool — a database query, an API, a calculator — it's executing the request-reply pattern. The agent sends a request, waits for a response, and incorporates the result into its reasoning. The integration design challenge is latency: if the tool call takes 5 seconds because the underlying data system is slow, the agent's overall response time degrades. This is why [low-latency data serving](/post/data-freshness-vs-latency) matters for agent architectures.

**Scatter-Gather for [multi-agent coordination](/post/multi-agent-architecture).** A coordinator agent fans a question out to multiple specialized agents — a research agent, a calculation agent, a compliance agent — and aggregates their responses. This is the scatter-gather pattern. The integration challenge is handling partial failures (what if one agent times out?) and merging heterogeneous responses into a coherent result.

**Content-Based Routing for agent dispatch.** A router examines an incoming request and dispatches it to the most appropriate agent based on content — customer service questions go to the support agent, technical questions go to the engineering agent, billing questions go to the finance agent. This is content-based routing applied to multi-agent systems.

The common thread: agents need fresh, reliable data delivered through well-designed integration patterns. An agent consuming stale data from a poorly designed integration pipeline makes stale decisions — confidently, at scale, with no indication that anything is wrong. The enterprise integration patterns that ensure [data freshness](/post/what-is-data-freshness) and [data quality](/post/what-is-data-quality) in traditional architectures are even more critical when the consumer is an autonomous agent.

## Choosing the Right Integration Pattern

The right enterprise integration pattern depends on your latency requirements, coupling tolerance, and the nature of the data flow. Here's a decision framework for the most common integration scenarios:

Integration Scenario

Recommended Pattern

Key Tradeoff

Sync operational DB to analytics warehouse

Change Data Capture (CDC)

Low latency, but requires schema compatibility and careful handling of deletes

Distribute events to multiple independent consumers

Publish-Subscribe

Maximum decoupling, but consumers must handle out-of-order delivery and idempotency

Route events to different processing pipelines by type

Content-Based Router

Flexible routing logic, but routing rules can become complex and hard to test

Build real-time features for ML models

Streaming Materialized View

Sub-second freshness, but requires stream processing infrastructure and state management

Process events through multiple transformation stages

Pipes and Filters

Each stage is independently deployable, but end-to-end latency increases with each hop

Aggregate responses from multiple services or agents

Scatter-Gather

Parallel execution reduces total latency, but partial failure handling adds complexity

Maintain complete audit trail of state changes

Event Sourcing

Full history and temporal queries, but higher storage cost and rebuild complexity

Move large datasets on a schedule

Batch ETL (File Transfer)

Simple and well-understood, but stale by design — only as fresh as the last run

In practice, most modern architectures use multiple patterns together. A typical real-time data platform might use CDC to capture changes from operational databases, pipes-and-filters to transform and enrich the events, publish-subscribe to distribute them to multiple consumers, and materialized views to serve the results with low latency.

The integration design pattern you choose also determines your [data freshness](/post/what-is-data-freshness) profile. Batch ETL gives you freshness measured in hours. CDC gives you seconds. Streaming materialized views give you sub-second. If your downstream consumer is a dashboard refreshed daily, batch is fine. If it's an AI agent making real-time fraud decisions, anything less than CDC with streaming materialized views is a liability.

One principle that holds across all enterprise integration patterns: favor asynchronous, event-driven communication over synchronous RPC wherever possible. Synchronous calls create tight coupling, cascading failures, and latency dependencies. Asynchronous messaging — built on the patterns described above — gives you loose coupling, independent scaling, and resilience. The systems that need real-time data get it through event streams, not through chains of synchronous API calls.

## The Tacnode Approach: Integration Patterns at Streaming Speed

Most organizations implement enterprise integration patterns by stitching together multiple systems — a CDC tool to capture changes, a streaming platform to move them, a stream processor to transform them, a serving layer to query them. Each hop adds latency, operational complexity, and freshness risk.

The Tacnode [Context Lake](/context-lake) collapses this stack into a single platform that implements the critical integration patterns natively:

**Pub-sub ingestion.** Events stream in from any source — CDC connectors, APIs, application events — and are immediately available to all consumers. No separate streaming platform required.

**Real-time transformation and materialization.** Integration logic — filtering, enrichment, aggregation — runs as continuous queries inside the platform. Results materialize into queryable tables with sub-second freshness.

**Instant queryability.** Integrated data is queryable the moment it arrives. No waiting for batch jobs, no stale caches, no pipeline delays. When an AI agent or ML model needs context, it queries current reality.

**[Data contracts](/post/what-is-a-data-contract) at the boundary.** Schema validation and quality checks enforce [data quality](/post/what-is-data-quality) at ingestion time — before bad data enters the integration pipeline.

For teams building real-time AI applications, this means the enterprise integration patterns they need — CDC, pub-sub, materialized views, content-based routing — work at the speed their agents and models require, without the operational burden of managing five separate systems.

## Frequently Asked Questions

What are enterprise integration patterns?

What is the difference between ESB and event streaming?

What is change data capture (CDC)?

How do enterprise integration patterns apply to AI agents?

Which integration pattern determines data freshness?

## Key Takeaways

Enterprise integration patterns are a proven vocabulary for solving the recurring problems of connecting systems and synchronizing data. They were codified two decades ago, but the problems they solve — routing, transformation, aggregation, decoupling — are more relevant now than ever.

Messaging is the dominant integration style. Publish-subscribe, content-based routing, pipes-and-filters, and aggregation are the patterns that power modern event-driven and streaming architectures. The shift from ESBs to event streaming platforms changed the implementation, not the patterns.

Data integration patterns — change data capture, event sourcing, and materialized views — determine how fresh, complete, and consistent your data is across systems. CDC has replaced batch ETL as the standard for real-time data synchronization.

AI agents are integration consumers. Every pattern described in this guide — pub-sub for real-time context, request-reply for tool use, scatter-gather for multi-agent coordination, content-based routing for agent dispatch — applies directly to the design of agent architectures. Agents that consume data through well-designed integration patterns make better decisions. Agents that consume stale, poorly integrated data make confident mistakes.

The patterns are stable. The implementations keep evolving. Choose the integration design patterns that match your latency requirements, coupling tolerance, and consumer needs — and build them on infrastructure that can deliver the freshness your most demanding consumers require.

Enterprise Integration PatternsIntegration Design PatternsEvent-Driven ArchitectureMessaging PatternsStream ProcessingData Integration

[![Boyd Stowe](/images/team/boyd-stowe.webp)](/author/boyd-stowe)

### [Written by Boyd Stowe](/author/boyd-stowe)

Former Couchbase and IBM. Two decades helping enterprises adopt new database paradigms.

[View profile](/author/boyd-stowe)[LinkedIn](https://www.linkedin.com/in/boyd-stowe-6a72a16/)

On this page

*   What Are Enterprise Integration Patterns?
*   Core Messaging Patterns
*   Integration Design Patterns for Event-Driven Systems
*   Data Integration Patterns
*   From ESB to Event Streaming: How Integration Evolved
*   Enterprise Integration Patterns for AI Agents
*   Choosing the Right Integration Pattern
*   The Tacnode Approach: Integration Patterns at Streaming Speed
*   Frequently Asked Questions
*   Key Takeaways

## Continue Reading

[Data Engineering

#### Redis Alternatives: 9 Options for Caching, Real-Time Data, and Decision Workloads

Mar 25, 2026•20 min read

](/post/redis-alternatives)[Data Engineering

#### Apache Doris vs ClickHouse: Choosing a Real-Time Analytics Database

Mar 24, 2026•12 min read

](/post/apache-doris-vs-clickhouse)[Data Engineering

#### Incremental Materialized View: How to Keep Derived State Fresh in Real Time

Mar 24, 2026•14 min read

](/post/incremental-materialized-views)

## Ready to see Tacnode Context Lake in action?

Book a demo and discover how Tacnode can power your AI-native applications.

[Book a Demo](/book-a-demo)

[Back to Blog](/resources/blog)

[![Tacnode](/images/brand/tacnode-horizontal-v3.webp)](/)

Context infrastructure for automated decisions that can't afford to be wrong.

#### Product

*   [Product](/product)

Pillars

*   [Shared Context](/shared)
*   [Live Context](/live)
*   [Semantic Context](/semantic)

Workloads

*   [Shared Memory for Multi-Agent Systems](/product/ai-agent-memory)
*   [Live Context Serving — Beyond the Feature Store](/product/feature-store)
*   [Decision-Time Analytics](/product/decision-time-analytics)

#### Resources

*   [What is a Context Gap?](/context-gap)
*   [Blog](/resources/blog)
*   [Events](/resources/events)
*   [Docs](/docs)
*   [Forrester Report](/resources/forrester-context-lake-report)
*   [AWS Marketplace ↗](https://aws.amazon.com/marketplace/pp/prodview-ofzyfzpx52yni)
*   [The Canonical Spec ↗](https://contextlake.org/canonical)

#### Company

*   [About](/company)
*   [The Vision](/context-lake)
*   [Careers](/company/careers)
*   [Press](/press)
*   [Book a Demo](/book-a-demo)

#### Legal

*   [Privacy](/docs/legal/privacy-notice)
*   [Terms](/docs/legal/terms-of-service)

© 2025 Tacnode Inc. All rights reserved. Tacnode™ is a trademark of Tacnode Inc.

![AICPA SOC](/badges/soc.webp) ![SOC 2 Type II](/badges/soc2.webp) ![HIPAA Compl