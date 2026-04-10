# The Complete Guide To Kafka Change Data Capture Cdc

Source: https://factorhouse.io/articles/the-complete-guide-to-kafka-change-data-capture-cdc

Kafka Change Data Capture (CDC): The Complete Guide \[2026\] | Factor House   

 

 

     

          

  

 

This is some text inside of a div block.

[

](/)

*   Products
    
    products
    
    [
    
    **Kpow for Apache Kafka**
    
    Enterprise-grade visibility and control
    
    
    
    ](/products/kpow)[
    
    **Flex for Apache Flink**
    
    Simplify job management, scaling, and monitoring
    
    
    
    ](/products/flex)[
    
    **Factor Platform**
    
    Unified command center for real-time data
    
    
    
    ](/products/factor-platform)
    
    BY INDUSTRY
    
    [
    
    Financial Services
    
    ](/solutions/industry/financial-services)[
    
    Retail
    
    ](/solutions/industry/retail)[
    
    Logistics
    
    ](/solutions/industry/logistics)
    
    BY Provider
    
    [
    
    AWS MSK
    
    ](/how-to/set-up-kpow-with-aws)[
    
    Confluent
    
    ](/how-to/set-up-kpow-with-confluent-cloud)[
    
    Google Cloud
    
    ](/how-to/set-up-kpow-with-gcp)[
    
    Oracle Cloud Infrastructure
    
    ](/how-to/integrate-kpow-with-oci-streaming)[
    
    Explore more
    
    ](/how-to)
    
*   Solutions
    
    products
    
    [
    
    **Kpow for Apache Kafka**
    
    Enterprise-grade visibility and control
    
    
    
    ](/products/kpow)[
    
    **Flex for Apache Flink**
    
    Simplify job management, scaling, and monitoring
    
    
    
    ](/products/flex)[
    
    **Factor Platform**
    
    Unified command center for real-time data
    
    
    
    ](/products/factor-platform)
    
    BY INDUSTRY
    
    [
    
    Financial Services
    
    ](/solutions/industry/financial-services)[
    
    Retail
    
    ](/solutions/industry/retail)[
    
    Logistics
    
    ](/solutions/industry/logistics)
    
    BY Provider
    
    [
    
    AWS MSK
    
    ](/how-to/set-up-kpow-with-aws)[
    
    Confluent
    
    ](/how-to/set-up-kpow-with-confluent-cloud)[
    
    Google Cloud
    
    ](/how-to/set-up-kpow-with-gcp)[
    
    Oracle Cloud Infrastructure
    
    ](/how-to/integrate-kpow-with-oci-streaming)[
    
    Explore more
    
    ](/how-to)
    
*   [Pricing](/pricing)
*   [Docs](https://docs.factorhouse.io)
*   Resources
    
    EXPLORE
    
    [
    
    Blog
    
    ](/blog)[
    
    Case Studies
    
    ](/case-studies)[
    
    Events
    
    ](/events)
    
    LEARN & SUPPORT
    
    [
    
    Docs
    
    ](https://docs.factorhouse.io/)[
    
    Changelog
    
    ](/changelog)[
    
    Community
    
    ](/community)[
    
    Support
    
    ](/help-center)
    
*   [
    
    ![](https://cdn.prod.website-files.com/689f8aab1977008c61538ae4/68a4d1b37549d9003220864c_mark-github-24.svg)
    
    ](#)[
    
    ![](https://cdn.prod.website-files.com/689f8aab1977008c61538ae4/68a4d1b363a98733fc92b958_Slack%20logo%20(new).svg)
    
    ](#)
    
    [English](/articles/the-complete-guide-to-kafka-change-data-capture-cdc)
    
    [German](/de/articles/the-complete-guide-to-kafka-change-data-capture-cdc)
    
    [
    
    Login
    
    ](https://account.factorhouse.io/)[
    
    Get started
    
    ](https://account.factorhouse.io/auth/getting_started)
    

[

](https://github.com/factorhouse)[

](https://join.slack.com/t/factorhousecommunity/shared_invite/zt-39x5pms9g-iMBphNvhS2eGrT_6Pl_jkw)

[English](/articles/the-complete-guide-to-kafka-change-data-capture-cdc)

[German](/de/articles/the-complete-guide-to-kafka-change-data-capture-cdc)

[Login](https://account.factorhouse.io/)

Get started

[](https://account.factorhouse.io/auth/getting_started)

![](https://cdn.prod.website-files.com/689f8aab1977008c61538ae4/68f266f4b53b8a44819fc425_Knowledge%20Center%20Home.png)

# The Complete Guide to Kafka Change Data Capture (CDC)

### Table of contents

![](https://cdn.prod.website-files.com/689f8aab1977008c61538ae4/696ef808a7baab11caaed1d8_chevron-cmpact-down.svg)

[

](#)

![](https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg)

[](#)

February 11th, 2026

![](https://cdn.prod.website-files.com/689f8aab1977008c61538ae4/68efab2557381091a0150f12_Rectangle%2034626948.svg)

xx min read

Change Data Capture (CDC) tracks row-level changes in a database and publishes them as events. When paired with Apache Kafka, CDC turns your databases into real-time event streams without modifying application code or adding polling overhead.

This guide covers CDC fundamentals, compares the dominant implementation patterns, walks through a working PostgreSQL-to-Kafka setup, and shows where CDC fits in a broader data mesh architecture.

## What CDC Is and Why It Matters

Traditional data integration relies on batch ETL: extract everything from the source, transform it, load it into the target. This approach has well-known problems. It introduces latency (hours or days), wastes resources by re-reading unchanged data, and puts load on the source database during extraction windows.

CDC solves these problems by capturing only the rows that changed (inserts, updates, deletes) and streaming them as individual events. The source database is read through its internal replication mechanism, typically the write-ahead log (WAL), so the impact on production workloads is minimal.

In practice, CDC gives you:

*   Sub-second propagation of database changes to downstream systems
*   A complete, ordered history of every mutation, useful for audit trails and temporal queries
*   Decoupled producers and consumers, since changes flow through Kafka topics rather than direct database connections
*   The ability to rebuild derived datastores by replaying the change log from a known offset

For real-time data pipelines, CDC eliminates the gap between "data at rest" and "data in motion." Your analytical systems, search indexes, caches, and microservices all see changes as they happen rather than in delayed batches.

## Log-Based CDC vs. Query-Based CDC

There are two fundamental approaches to capturing changes from a database.

**Log-based CDC** reads the database's internal transaction log (WAL in PostgreSQL, binlog in MySQL, redo log in Oracle). This is the preferred method. The database already writes these logs for crash recovery and replication, so CDC reads them with near-zero overhead. Log-based CDC captures all changes including deletes, preserves the exact ordering of transactions, and works without schema modifications.

**Query-based CDC** periodically polls the source table using SQL queries, typically filtering by a `last_modified` timestamp column. This is simpler to set up but has significant limitations: it cannot reliably detect deletes, requires a timestamp or incrementing column on every tracked table, misses rapid intermediate changes between polls, and puts read load on the source database.

For most production use cases, log-based CDC is the correct choice. Query-based CDC can work for simple, append-only tables where deletes are not a concern.

## Debezium vs. Kafka Connect JDBC: Choosing a CDC Pattern

The two most common ways to implement CDC with Kafka are Debezium (log-based) and the Kafka Connect JDBC Source Connector (query-based). They serve different purposes.

### Debezium

Debezium is an open-source CDC platform built on Kafka Connect. It reads database transaction logs directly and produces change events to Kafka topics.

Key characteristics:

*   Reads WAL/binlog/redo logs directly; no schema changes required on source tables
*   Captures inserts, updates, and deletes with full before/after images of each row
*   Provides exactly-once semantics when combined with Kafka's transactional features
*   Supports PostgreSQL, MySQL, MongoDB, SQL Server, Oracle, Db2, and others
*   Emits a structured envelope containing the operation type, before state, after state, source metadata, and transaction info
*   Handles initial snapshots of existing data before switching to log streaming

### Kafka Connect JDBC Source

The JDBC Source Connector uses SQL queries to poll for changes at a configured interval.

Key characteristics:

*   Requires a `timestamp` column, an `incrementing` column, or both to detect changes
*   Cannot capture deletes (the row is gone before the next poll)
*   Simpler setup: no database-level replication configuration needed
*   Higher latency, bounded by the poll interval
*   Puts periodic query load on the source database
*   Works with any JDBC-compatible database

### When to Use Which

Use Debezium when you need complete change capture (including deletes), low latency, minimal source database impact, and accurate ordering of changes. This covers most CDC use cases.

Use the JDBC Source Connector when you have a simple append-only or update-only table, cannot configure database-level replication permissions, or need a quick prototype before investing in log-based CDC infrastructure.

## Working Example: PostgreSQL to Kafka with Debezium

The following walks through a complete setup using PostgreSQL's logical replication and Debezium.

### Step 1: Configure PostgreSQL for Logical Replication

Edit `postgresql.conf`:`‍   `

    wal_level = logical
    max_replication_slots = 4
    max_wal_senders = 4

Create a replication user and grant permissions:`‍   `

    CREATE ROLE debezium WITH REPLICATION LOGIN PASSWORD 'dbz_password';
    GRANT USAGE ON SCHEMA public TO debezium;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO debezium;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO debezium;

Create a publication for the tables you want to track:

    CREATE PUBLICATION dbz_publication FOR TABLE orders, customers, products;

### Step 2: Deploy Kafka Connect with Debezium

A `docker-compose.yml` snippet for the Kafka Connect worker with the Debezium PostgreSQL connector plugin:

    kafka-connect:
      image: debezium/connect:2.5
      ports:
        - "8083:8083"
      environment:
        BOOTSTRAP_SERVERS: kafka:9092
        GROUP_ID: connect-cluster
        CONFIG_STORAGE_TOPIC: connect-configs
        OFFSET_STORAGE_TOPIC: connect-offsets
        STATUS_STORAGE_TOPIC: connect-status
        KEY_CONVERTER: org.apache.kafka.connect.json.JsonConverter
        VALUE_CONVERTER: org.apache.kafka.connect.json.JsonConverter
      depends_on:
        - kafka
        - postgres

### Step 3: Register the Debezium Connector

Submit the connector configuration via the Kafka Connect REST API:

    {
      "name": "pg-cdc-connector",
      "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "database.hostname": "postgres",
        "database.port": "5432",
        "database.user": "debezium",
        "database.password": "dbz_password",
        "database.dbname": "app_db",
        "topic.prefix": "cdc",
        "schema.include.list": "public",
        "table.include.list": "public.orders,public.customers,public.products",
        "publication.name": "dbz_publication",
        "slot.name": "debezium_slot",
        "plugin.name": "pgoutput",
        "publication.autocreate.mode": "filtered",
        "snapshot.mode": "initial",
        "tombstones.on.delete": true,
        "key.converter": "org.apache.kafka.connect.json.JsonConverter",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "key.converter.schemas.enable": false,
        "value.converter.schemas.enable": false
      }
    }

Register it:

    curl -X POST http://localhost:8083/connectors \
      -H "Content-Type: application/json" \
      -d @pg-cdc-connector.json

### Step 4: Verify the Pipeline

Check the connector status:

    curl -s http://localhost:8083/connectors/pg-cdc-connector/status | jq .

You should see the connector and its tasks in `RUNNING` state. Insert a row into the source table:

    INSERT INTO orders (customer_id, product_id, quantity, total)
    VALUES (1, 42, 3, 149.97);

Consume from the CDC topic to see the change event:

    kafka-console-consumer --bootstrap-server kafka:9092 \
      --topic cdc.public.orders \
      --from-beginning \
      --max-messages 1

The resulting event will contain an envelope with `op: "c"` (create), the `after` field with the full row state, and source metadata including the LSN (Log Sequence Number), transaction ID, and timestamp.

A Debezium change event for an insert looks like this:

    {
      "before": null,
      "after": {
        "id": 1001,
        "customer_id": 1,
        "product_id": 42,
        "quantity": 3,
        "total": 149.97
      },
      "source": {
        "version": "2.5.0.Final",
        "connector": "postgresql",
        "name": "cdc",
        "ts_ms": 1704067200000,
        "db": "app_db",
        "schema": "public",
        "table": "orders",
        "lsn": 234567890,
        "txId": 5678
      },
      "op": "c",
      "ts_ms": 1704067200123
    }

For updates, `op` is `"u"` and both `before` and `after` are populated. For deletes, `op` is `"d"` and `after` is null.

## CDC in an Enterprise Data Mesh Architecture

In a data mesh, domain teams own their data products and expose them through well-defined interfaces. CDC fits naturally into this model because it allows teams to publish their database changes as domain events without building custom event-producing application code.

A typical architecture looks like this:

![CDC Architecture Diagram](https://cdn.prod.website-files.com/689f8aab1977008c61538b01/698bce78a2f6e9c7775be06c_cdc-architecture-diagram.png)

Each domain team runs a Debezium connector for its database. The change events land in Kafka topics namespaced by domain (e.g., `cdc.orders.*`). A schema registry enforces contracts on the event format. Downstream teams consume from these topics to build analytics stores, search indexes, materialized views, audit logs, or ML feature stores.

This decouples data producers from consumers entirely. The Orders team does not need to know that the Analytics team reads their changes, and vice versa. Kafka acts as the durable, replayable log that connects the domains.

In practice, you also need governance over topic naming, schema evolution rules, data classification, and access controls. CDC topics often carry sensitive data (customer PII, payment details), so encryption, RBAC, and audit logging are essential at the Kafka layer.

## Common CDC Pitfalls

**Replication slot growth.** If a consumer falls behind or a connector stops, PostgreSQL retains WAL segments for the replication slot indefinitely. This can fill the disk. Monitor `pg_replication_slots` and set `max_slot_wal_keep_size` as a safety limit.

**Schema evolution.** When a source table schema changes (added columns, type changes), the CDC events change shape. Use a schema registry with compatibility checks (backward, forward, or full) to prevent breaking downstream consumers. Debezium integrates with Confluent Schema Registry and Apicurio.

**Snapshot handling.** On first startup, Debezium takes an initial snapshot of the existing data. For large tables, this can take hours and produce a burst of messages. Plan capacity accordingly and consider using `snapshot.mode=no_data` if you only need changes going forward.

**Ordering guarantees.** Debezium produces events in commit order within a single table partition. If you need strict ordering across tables or across partitions of the same table, you need to handle this in your consumer logic or use single-partition topics (which limits throughput).

**Tombstone records.** Debezium emits a tombstone (null value) after a delete event by default. This is required for Kafka log compaction to work correctly, removing the key entirely from the compacted topic. Make sure your consumers handle null values.

## Monitoring CDC Pipelines with Kpow

CDC connectors are long-running processes, and they fail silently more often than you would like. A connector task might enter a `FAILED` state because of a WAL slot issue, a schema change, or a network partition. Without monitoring, these failures go unnoticed until downstream systems start serving stale data.

[Kpow](https://factorhouse.io/products/kpow) gives you real-time visibility into Kafka Connect clusters alongside the rest of your Kafka infrastructure.

![](https://cdn.prod.website-files.com/689f8aab1977008c61538b01/698bd45f6ecab252fb70d09c_kpow-connector-state.png)

Reviewing Kafka Connect connector and task status in Kpow

Specifically for CDC pipelines, Kpow helps with:

**Connector and task health.** Kpow surfaces the status of every connector and task (RUNNING, PAUSED, FAILED, UNASSIGNED) in a single view. You can set up Prometheus alerts via Kpow's metrics endpoint to fire when a connector task enters an error state, so your team gets notified immediately rather than discovering the failure through downstream symptoms.

**Consumer lag tracking.** The CDC topics produced by Debezium are consumed by downstream services. Kpow tracks consumer group lag across all topics and partitions, letting you see at a glance whether any consumer is falling behind. For CDC, rising lag means your derived datastore is diverging from the source of truth.

**Automatic connector restarts.** Kpow can automatically restart failed connectors at configurable intervals. You specify which connectors to auto-restart (by exact name or wildcard pattern), and Kpow monitors them at one-minute intervals. All restart actions are logged in the audit trail and can be forwarded to Slack for team visibility.

**Operational controls.** From Kpow's UI or OpenAPI-based REST API, you can pause, resume, restart, or delete connectors, inspect task stack traces when errors occur, and view or edit connector configurations. This gives your on-call engineers a single interface for triaging CDC issues without needing to hit the Kafka Connect REST API directly.

**Multi-cluster support.** If you run CDC connectors across multiple Kafka clusters or environments (dev, staging, production), Kpow manages them all from a single instance with role-based access controls and audit logging.

CDC is one of those patterns where the setup is the easy part. Keeping it running reliably at scale, across multiple source databases and dozens of connectors, is where the operational complexity lives. Kpow reduces that complexity by consolidating connector health, consumer lag, topic throughput, and cluster metrics into a single tool.

You can try Kpow with a [free 30 day trial](https://account.factorhouse.io/cta_action/provision_license_type?code=KPOW_TRIAL) or explore the full documentation at [docs.factorhouse.io](https://docs.factorhouse.io/).

[

Next page

Beyond JMX: Supercharging Grafana Dashboards with High-Fidelity Metrics

](/articles/beyond-jmx-supercharging-grafana-dashboards-with-high-fidelity-metrics)

[

Next page

What the IBM Confluent acquisition means for Kafka users

](/articles/what-the-ibm-confluent-acquisition-means-for-kafka-users)

[

Next page

Factor House expands to Europe

](/articles/factor-house-expands-to-europe)

[

Next page

Rapid Kafka Diagnostics: A Unified Workflow for Root Cause Analysis

](/articles/rapid-kafka-diagnostics-a-unified-workflow-for-root-cause-analysis)

[

Next page

The Complete Guide to Kafka Change Data Capture (CDC)

](/articles/the-complete-guide-to-kafka-change-data-capture-cdc)

[

Next page

Kafka Observability with Kpow: Driving Operational Excellence

](/articles/kafka-observability-with-kpow-driving-operational-excellence)

[

Next page

Top Kafka UI Tools in 2026: A Practical Comparison for Engineering Teams

](/articles/top-kafka-ui-tools-in-2026-a-practical-comparison-for-engineering-teams)

[

Next page

Unified community license for Kpow and Flex

](/articles/unified-community-license)

[

Next page

Kpow Custom Serdes and Protobuf v4.31.1

](/articles/kpow-custom-serdes-protobuf-4-31-1)

[

Next page

Data Inspect Enhancements in Kpow 94.5

](/articles/data-inspect-enhancements-94-5)

[

Next page

Enhanced Under-Replicated Partition Detection in Kpow

](/articles/enhanced-urp-detection)

[

Next page

Introducing Factor House Docs

](/articles/intro-factor-house-docs)

[

Next page

Kafka 4.1 Release: Queues, Stream Groups, and More

](/articles/kafka-4-1-release-announcement)

[

Next page

Melbourne Kafka x Flink July Meetup Recap: Real-time Data Hosted by Factor House & Confluent

](/articles/real-time-data-to-insights-meetup-july25)

[

Next page

Join the conversation: Factor House launches open Slack for the real-time data community

](/articles/join-the-conversation-community-slack)

[

Next page

Introduction to Factor House Local

](/articles/intro-to-factor-house-local)

[

Next page

Improvements to Data Inspect in Kpow 94.3

](/articles/data-inspect-improvements-94-3)

[

Next page

Beyond Kafka: Sharp Signals from Current London 2025

](/articles/beyond-kafka-sharp-signals-from-current-london-2025)

[

Next page

Ensuring Your Data Streaming Stack Is Ready for the EU Data Act

](/articles/ensuring-your-data-streaming-stack-is-ready-for-the-eu-data-act)

[

Next page

Beyond Reagent: Migrating to React 19 with HSX and RFX

](/articles/beyond-reagent-migrating-to-react-19-with-hsx-and-rfx)

[

Next page

Updates to container specifics (DockerHub and Helm Charts)

](/articles/updates-to-container-specifics)

[

Next page

A final goodbye to OperatrIO

](/articles/final-goodbye-operatr-io)

[

Next page

Releasing Software at Factor House: Our Java Compatibility and Evolution Strategy

](/articles/java-compatibility-and-evolution-strategy)

[

Next page

Our Commitment to Engineers

](/articles/our-commitment-to-engineers)

[

Next page

From Bootstrap to Blackbird: The Future of Factor House

](/articles/from-bootstrap-to-blackbird)

[

Next page

Factor House Product VPAT

](/articles/factor-house-product-vpat)

[

Next page

Web Accessibility at Factor House

](/articles/web-accessibility-at-factor-house)

[

Next page

Introducing Kpow's new API

](/articles/introducing-kpows-new-api)

[

Next page

Introducing Factor House 2.0 🚀

](/articles/factor-house-flow)

[

Next page

Kpow Community Edition 🚀

](/articles/kpow-community-edition)

[

Next page

Operatr.IO has a new name: Meet Factor House

](/articles/operatr-io-has-a-new-name-meet-factor-house)

[

Next page

Apache Kafka 3.2.0: Idempotent Producer Breaking Change

](/articles/kafka-producer-breaking-change)

[

Next page

Amazon Corretto 11 Memory Issues

](/articles/corretto-memory-issues)

[![Company logo in modern design](https://cdn.prod.website-files.com/689f8aab1977008c61538ae4/68a4789c3a50da324dae121d_Logo.svg)](#)

Join for product updates, insights, and event invites.

You've been subscribed to our newsletter.

Something went wrong while attempting to subscribe to the newsletter. Please try again.

By subscribing, you consent to our Privacy Policy and to receive updates.

Products

Solutions

[Kpow for Apache Kafka](/products/kpow)[Flex for Apache Flink](/products/flex)[Factor Platform](/products/factor-platform)

By Industry

[Financial Services](/solutions/industry/financial-services)[Retail](/solutions/industry/retail)[Logistics](/solutions/industry/logistics)

[Learn & support](#)

Documentation

[Docs](https://docs.factorhouse.io/)[Roadmap](/roadmap)[Changelog](/changelog)

Community

[Factor House Community](/community)[GitHub](https://github.com/factorhouse)[Support & Help Center](/help-center)

Explore

[Blog](/blog)[Case Studies](/case-studies)[Releases](/releases)[How-Tos](/how-to)[Events](/events)

[About](/pricing)

Company

[About Us](/about)[Contact](/contact)

[Careers](/careers)

HIRING!

[Partners](/partners)[Press](/press)

Legal

[Kpow EULA](/kpow-eula)[Flex EULA](/flex-eula)[Privacy Policy](/privacy)[Security Policy](/security)

[

](https://github.com/factorhouse)[

](https://join.slack.com/t/factorhousecommunity/shared_invite/zt-39x5pms9g-iMBphNvhS2eGrT_6Pl_jkw)[

](https://bsky.app/profile/factorhouse.io)[

](https://www.linkedin.com/company/factorhouse)

© 2026 Factor House Pty Ltd. All right