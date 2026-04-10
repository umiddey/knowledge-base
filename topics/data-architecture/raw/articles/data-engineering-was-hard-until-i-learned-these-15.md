# Data Engineering Was Hard Until I Learned These 15 System De

Source: https://medium.com/@akanksha_singh/data-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070

Data Engineering Was Hard Until I Learned These 15 System Design Concepts. | by Akanksha Singh | Medium 

[Sitemap](/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](/?source=post_page---top_nav_layout_nav-----------------------------------------)

Get app

[

Write

](/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[

Search

](/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png)

# Data Engineering Was Hard Until I Learned These 15 System Design Concepts.

[

![Akanksha Singh](https://miro.medium.com/v2/resize:fill:64:64/1*CL4zy71xc_04fNJUczUWmA.jpeg)





](/@akanksha_singh?source=post_page---byline--8a56f21f1070---------------------------------------)

[Akanksha Singh](/@akanksha_singh?source=post_page---byline--8a56f21f1070---------------------------------------)

15 min read

·

Aug 3, 2025

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F8a56f21f1070&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&user=Akanksha+Singh&userId=e71f89a3595b&source=---header_actions--8a56f21f1070---------------------clap_footer------------------)

\--

45

[](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F8a56f21f1070&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&source=---header_actions--8a56f21f1070---------------------bookmark_footer------------------)

Listen

Share

It’s easy to find yourself in the middle of a broken data pipeline at 2 AM — logs failing silently, metrics spiking, and no clear idea where things went wrong. You trace jobs, retry tasks, refresh dashboards — until it hits you: this isn’t just about pipelines or scheduling.

> **Data engineering is more than pipelines. It’s system design with data as the core unit.**

In this article, I’ll walk you through the **15 essential data engineering concepts** that changed the way I approach building and operating data systems — concepts I wish I had learned much earlier.

Press enter or click to view image in full size

Over the past years as a Data Engineer, I’ve seen them used repeatedly when building and scaling large systems. They aren’t just theory — they’re the patterns that quietly power resilient, scalable data platforms.

## **1\. Batch vs Streaming Ingestion.**

**a. Batch ingestion** collects data over a period (e.g., hourly, daily) and processes it in chunks.

Press enter or click to view image in full size

Batch processing.

E.g. : Imagine a retail company that exports sales transactions from their point-of-sale system once every night at 2 AM. These CSV files are uploaded to an S3 bucket. A daily Airflow DAG picks them up, processes them, and loads the cleaned data into Snowflake.

*   Great for: Large, predictable volumes
*   Not ideal for real-time needs or alerts

**b. Streaming ingestion** processes data continuously in near real-time as it arrives.

Press enter or click to view image in full size

Stream processing.

E.g. : A ride-sharing app collects real-time location updates from driver apps. These are sent as events to Kafka, processed instantly by Apache Flink, and stored in a low-latency database to power live maps and ETAs.

*   Great for: Real-time dashboards, anomaly detection, alerts
*   Can be complex to scale and manage

## 2\. **Change Data Capture (CDC).**

Change Data Capture (CDC) is a **design pattern** that captures changes in data at the **source level** (inserts, updates, deletes) and propagates them to downstream systems **in real time or near-real time**.

Instead of reloading entire tables, CDC allows you to **stream only the changes**, making pipelines more efficient, scalable and reactive.

Press enter or click to view image in full size

E.g. : Let’s say you work at a food delivery app like Swiggy or Uber Eats. The app stores **orders** in a PostgreSQL database: order\_id, user\_id, status (e.g. “placed”, “dispatched”, “delivered”), updated\_at

**Problem** : Your analytics dashboard shows **how many orders are being delivered per minute**, but it’s **outdated** because the pipeline reloads the table every few hours.

**Solution** : Instead of reloading the whole `orders` table, you enable **CDC** to stream **only the row-level changes** as they happen.

CDC change event.

## **3\. Idempotency.**

In distributed data systems, things fail — and they often fail in unpredictable ways.

That’s where **idempotency** comes in.

Idempotency is the idea that **you can apply the same operation multiple times without changing the result beyond the first application**. In other words, **repeating the operation has no side effects**.

Example : No matter how many times a user likes the post on Instagram / twitter; the like count increases by only 1.

Idempotency in social media likes.

Design your pipelines so they can **fail and recover** without fear. Make each stage **replay-safe** and **side-effect-free**. This small shift in mindset saves hours of debugging, restores trust in your data, and makes your pipelines production-grade.

## **4\. OLTP vs OLAP.**

**a. OLTP (Online Transaction Processing):** OLTP systems are built for **day-to-day operations**. These are your application databases — fast, reliable, and optimized for **real-time reads and writes**.

Example : Placing an order on Amazon , writing a comment on a post.

Characteristics of OLTP.

Processing/storage platforms: PostgreSQL, MySQL, DynamoDB, MongoDB

**b. OLAP (Online Analytical Processing) :** OLAP systems are designed for **decision-making**, not operations. They’re built to **analyze large volumes of historical data**, run complex aggregations, and power dashboards and business reports.

Characteristics of OLAP.

Platforms: Snowflake, BigQuery, Redshift, Databricks SQL

_We extract data from OLTP systems, transform and model it, and load it into OLAP systems._ **_That’s the core pattern behind ETL and ELT._**

## 5. **Row-Based vs Columnar Storage.**

Understanding the difference between **row-based** and **columnar** storage isn’t just academic — it directly affects how fast your queries run, how much storage you use, and whether your architecture can scale. It’s one of those low-level design decisions that has high-level consequences.

Let’s explore this through a simple example and see how it will be stored:

Press enter or click to view image in full size

A table of two users.

### a. Row-Based Storage:

In **row-based storage**, data is stored one complete row at a time — all the fields of a record are physically stored together.

\[1, “Alice”, 29, “USA”\], \[2, “Bob”, 34, “Canada”\]

This means if you want to read or update a full record (say user #2), the system can retrieve everything in one go. It’s optimized for **transactional workloads** where frequent inserts, updates, and reads of full records are required.

**Best for:**

*   OLTP systems (e.g., MySQL, PostgreSQL)
*   Fast inserts/updates
*   Record-level access (e.g., user profiles, orders)

### **b. Columnar Storage:**

In **columnar storage**, values are stored by column, not row. All values for a given column are stored together.

IDs: \[1, 2\]   
Names: \[“Alice”, “Bob”\]   
Ages: \[29, 34\]   
Countries: \[“USA”, “Canada”\]

Now, if you only want to run a query like:

SELECT AVG(Age) FROM users;

Columnar storage will just scan the `Age` column, skipping all others. This makes it extremely fast for **analytical queries** on large datasets.

**Best for:**

*   OLAP systems (e.g., BigQuery, Snowflake, Redshift)
*   Scans, aggregations, filtering
*   Compression

## **6\. Partitioning.**

Partitioning involves dividing large datasets into smaller, logical, manageable pieces/groups to speed up query performance, reduce resource usage, and optimize data storage and retrieval.

Example : You run a pizza delivery service and keep track of all orders in a table called `orders`.

Order table

Now if you try to access data by running some sql query.

**Without partitioning** : The database has to **scan every row** to find the matching date.

SELECT \* FROM orders WHERE order\_date = ‘2025–07–31’;

**With partition** : Let’s say we have partitioned on order\_date

data partitioned on order\_date

Now if you run the above same query, the database **only reads the folder** for 2025–07–31. It skips the rest. This makes the query **much faster**.

Types of partitioning.

## **7\. ETL vs ELT.**

### **_a. ETL (Extract Transform Load):_**

It is a traditional data pipeline method where data is:

1.  **Extracted** from source systems such as databases, APIs, flat files, or applications.
2.  **Transformed** in a separate processing engine before it reaches the destination. This step may include cleaning, filtering, deduplication, and reshaping data.
3.  **Loaded** into a target system like a data warehouse or database for analysis.

Press enter or click to view image in full size

ETL process.

**Use Case.**

*   You need to ensure **data quality and consistency** before loading.
*   You are working with **on-premise systems** or legacy infrastructure.
*   You want to apply complex logic or business rules before storing data.

### **_b. ELT (Extract Load Transform):_**

It is a modern data pipeline approach where:

1.  **Extracted** data is **loaded immediately** into the data warehouse in its raw form.
2.  **Transformation** happens **inside the warehouse** using its built-in processing power (typically via SQL or a transformation tool like dbt).

Press enter or click to view image in full size

ELT process.

**_Use Case:_**

*   You’re using a **cloud-based data warehouse** (e.g., Snowflake, BigQuery, Redshift).
*   You want to **preserve raw data** for future use.
*   You need **fast ingestion** and flexible transformation.

## **8\. CAP Theorem.**

The **CAP Theorem** states that any **distributed data system** can only guarantee **two out of the following three** properties:

1.  **Consistency** — Every user sees the **same data** at the same time
2.  **Availability** — Every request gets a **response**, even if it’s not the latest data
3.  **Partition Tolerance** — The system keeps working even if **parts of the network fail.**

CAP Theorem.

**For example :**

*   For **order processing**, you choose **CP(Consistency + Partition Tolerance)** — it’s better to reject orders than cause duplicates — Sacrifice availability.
*   For **restaurant search**, you choose **AP(Availability + Partition Tolerance)**— showing slightly outdated results is fine —Sacrifice consistency.

## **9\. Windowing in Streaming.**

**Windowing** is the process of dividing an infinite data stream into **finite, manageable buckets (windows)** based on **time or count**, so we can compute metrics, apply aggregations, or trigger alerts.

_Think of it like slicing a never-ending movie into 5-minute clips to analyze scenes one chunk at a time._

### Types of Windows :

a. **Tumbling Window —** Fixed-size, **non-overlapping** time intervals.

*   Each event belongs to **exactly one window**.
*   Fixed non-overlapping intervals.
*   Example: Count users every **1 minute**
*   Windows: \[12:00–12:01), \[12:01–12:02), …

| — — — | — — — | — — — |  
 W1     W2      W3

b. **Sliding Window**

*   Fixed-size window that **slides by a smaller interval**.
*   Events may belong to **multiple windows**.
*   Overlapping windows for smoother analysis

Example: Compute rolling average every 1 minute with a 5-minute window  
Windows: \[12:00–12:05), \[12:01–12:06), …

|------|  
   |------|  
      |------|

c. **Session Window**

*   Dynamic windows based on **user activity**, closed after a period of inactivity.
*   User-driven, activity-based windows

Example: Group a user’s clicks into sessions where gaps < 30 seconds.

User: click — click — wait — click    
Session: |---|      |---|

d. **Count Window**

*   Based on **number of events**, not time.
*   Based on event count instead of time.

Example: Compute sum every 100 events  
Windows: \[1–100\], \[101–200\], …

> Use **event time + watermarks** to handle late-arriving data.

Tools : Apache flink, Apache Beam, Apache Spark Strcured Streaming, Kafka Streams

## **10\. DAGs and Workflow orchestration.**

As data systems grow more complex, coordinating **what runs, when it runs, and in what order** becomes a critical part of any data engineering workflow. This is where **DAGs (Directed Acyclic Graphs)** and **workflow orchestration** come in.

They help ensure your pipelines run smoothly — like a conductor leading an orchestra.

**a. DAG (Directed Acyclic Graph):**

It is a structure used to define task workflows in orchestration tools.

*   **Directed**: Tasks have a defined order (A → B → C)
*   **Acyclic**: No loops or cycles allowed (you can’t go back to a previous task)
*   **Graph**: A set of nodes (tasks) and edges (dependencies)

\>>> Think of it like a **flowchart** where:

*   Arrows show the **execution order**

Press enter or click to view image in full size

DAG

**b. Workflow Orchestration:**

**Workflow orchestration** is the process of **defining, scheduling, and monitoring** a series of tasks (often interdependent) to automate data pipelines, ML training, ETL jobs, and more.

In simpler terms: _It’s how you_ **_coordinate different data tasks_**_, ensuring they run_ **_in the right order, with the right dependencies, and recover from failure._**

Tool :  Airflow, Prefect, Dagster, ADF, etc.

## **11\. Retry & Dead letter queues.**

Well, in data engineering, **failures are inevitable**. Network timeouts, malformed records, rate limits — something _will_ go wrong eventually.

What matters is how you handle it.

Two essential strategies for building **resilient pipelines** are:

*   **Retry logic** — try again when something fails temporarily.
*   **Dead-letter queues (DLQs)** — isolate and log events that keep failing.

Together, they keep pipelines **fault-tolerant**, **observable**, and **recoverable**.

a. **What Is Retry Logic???**

**Retry logic** is a strategy that says: _If this task fails, let’s try again before giving up._

Retry strategies.

**b. What Is a Dead-Letter Queue (DLQ)???**

A **Dead-Letter Queue** is a special queue where you **send events or messages that repeatedly fail** to process — so they don’t block the pipeline.

_Think of it like a_ **_“quarantine bin”_** _for bad data._

Retry & DLQ :  
  
Incoming Event Stream  
        ↓  
   Validate Schema  
        ↓  
  ┌─────────────┐  
  │ Enrich API  │ ← Retry on timeout  
  └────┬────────┘  
       ↓  
   Bad Event? → Yes → Send to DLQ  
       ↓  
    Save to DWH

When to Use Retry vs DLQ

## 12\. Backfilling & Reprocessing.

As a data engineer, your job isn’t just to move data — it’s to **ensure it’s correct**, **complete**, and **trustworthy**, even when things go wrong.

That’s where **backfilling** and **reprocessing** come in.

These two concepts help ensure **data completeness, accuracy, and trust** — even after failures, bugs, or schema changes.

**a. When to Reprocess ??????????**

*   A **bug** in transformation logic (e.g., wrong aggregation formula)
*   New **business rules** require different output
*   Changing from one format to another (e.g., CSV → Parquet)
*   Fixing bad joins, wrong lookups, wrong currency conversions

**Reprocess** = redo processing for a date that was **processed incorrectly** or with stale logic/data.

Example:

Original Logic (Buggy):  
    Sales = quantity × price  
  
Fixed Logic:  
    Sales = quantity × price × currency\_conversion\_rate  
  
→ Reprocess old data with new formula

**b. When backfilling ??????????**

*   Pipeline was down (e.g., Airflow DAG paused for 3 days)
*   Data source delayed uploads
*   Late-arriving events (common in streaming)
*   Newly added tables or partitions
*   New logic that needs to be incorporated.

**Example:**

A daily sales job failed on July 15–17 due to an upstream API issue. Once fixed, you need to **re-run the pipeline for those specific dates** to catch up.

**Backfill** = process data for a **past date that was missed**.

**Flow diagram:**

      Backfill & Reprocess.    
                ┌──────────────┐  
                │  Raw Events  │  ← Unprocessed data (e.g., logs, user actions)  
                └──────┬───────┘  
                       │  
               ┌───────▼───────┐  
               │ Daily ETL Job │ ← Scheduled job that transforms raw events into clean, usable data  
               └───────┬───────┘  
         ┌─────────────┴─────────────┐  
         │     Partitioned Output    │ ← Processed data stored in partitions (e.g., by date)  
         └────────────┬──────────────┘  
                      ▼  
       ┌────────────┐   ┌────────────┐  
       │ Backfill 15│   │Reprocess 16│  
       └────────────┘   └────────────┘

## 13\. Data governance.

**Data governance** is a set of **policies, processes, roles, and tools** to ensure that data across the organization is:

Principle        |                Meaning  
\------------     |         -------------------------------------  
Available        |           Easy to find and access (securely)  
Accurate         |           High quality, trusted, and validated  
Consistent       |           Defined and interpreted the same across teams  
Secure           |           Protected from unauthorized access or misuse  
Compliant        |           Meets legal & regulatory standards (e.g., GDPR, HIPAA, SOX)

### Why It Matters in System Design ????????

*   **Trust and Quality:** Poor data quality leads to flawed insights and erodes trust in data products. Governance enforces standards to maintain consistency and accuracy.
*   **Security and Access Control:** Systems must define who can access what data, under what conditions, and with what visibility. This requires integrating authentication, authorization, and encryption into the design.
*   **Regulatory Compliance:** Laws like GDPR, HIPAA, and CCPA demand strict controls around data handling, lineage, consent, and retention. Failure to comply can lead to legal penalties and reputational damage.

## **14\. Time travel & Data versioning.**

As data grows in volume and complexity, the need to understand _what the data looked like at any point in the past_ becomes crucial. Whether you’re debugging a pipeline, auditing data for compliance, training models on historical snapshots, or simply restoring a dataset after accidental corruption, time travel and version control of data offer the tooling to do this reliably.

**Time travel and versioning give your data superpowers.** They make your pipelines recoverable, your models reproducible, and your systems auditable. Don’t just move data — track it, version it, and respect its history.

### What is Time Travel in Data Engineering?

Time travel allows you to query data as it existed at a specific point in time or at a particular version. Think of it like a “rewind” button for your data: you can roll back, compare historical states, or run point-in-time analytics.

> It’s essentially the data layer’s version of “undo” or “git checkout.”

Example:

SELECT \* FROM sales\_data VERSION AS OF '2025-07-01';  
  
\--This returns exactly what the table looked like on July 1, 2025—even if it’s been updated or overwritten since.

### What is Data Versioning?

_Data versioning_ is the systematic tracking and management of changes to datasets over time. It includes the creation of checkpoints or commits every time a dataset is modified — similar to how code is versioned with Git. Versioning applies not just to tables or files, but potentially to schemas, metadata, and even logic definitions (e.g., transformation steps).

At a design level, versioning can happen:

*   **At row-level** (tracking record-level changes)
*   **At table-level** (entire table snapshots)
*   **At pipeline-level** (versioned outputs or model training data)

_Examples :_

In delta lake:  
\-- View table as of 7 days ago  
SELECT \* FROM events TIMESTAMP AS OF current\_timestamp() - INTERVAL 7 DAYS;  
  
\-- View table at specific version  
SELECT \* FROM events VERSION AS OF 42;  
  
In Apache Iceberg:  
SELECT \* FROM sales.snapshots WHERE committed\_at < '2024-12-01';

## 15\. Distributed Processing Concepts.

As datasets grow beyond the capacity of a single machine, **distributed processing** becomes central to data engineering. It refers to breaking data workloads into smaller pieces and executing them **in parallel across multiple machines (nodes)** in a cluster.

**Core Principles:**

### **1\. Data partitioning.**

**Partitioning** means **splitting your data into smaller chunks** based on a rule, like date, region, or customer.

Let’s say you store your sales data like this:

**Before partitioning (1 big folder):**

/sales/all\_data.csv

**After partitioning by month:**

/sales/month=2025-06/  
/sales/month=2025-07/  
/sales/month=2025-08/

Now, if you want to find sales for **August 2025**, the system **only looks inside one folder**, not the whole dataset. This makes your queries **faster and cheaper**.

**Partitioning in Distributed Processing.**

When working with tools like **Apache Spark**, data partitioning determines how the computation is distributed:

*   `_repartition(n)_`: Creates n partitions.
*   `_coalesce(n)_`: Reduces partitions without a full shuffle.
*   `_partitionBy(col_)`: When saving data, splits output by column values.

Partitioning

### **2\. Bucketing.**

Let’s understand bucketing with an example.

Let’s say, you want to find a book quickly, but the books are all jumbled together. Searching through every single book would take forever. So you partition the library in different sections based on genre (section 1 : Fiction, section 2 : Mystery, section 3 : History, etc.)

Bucketing — Organizing Books Inside Section by Author’s Last Name.

Inside each section, the books are still too many, so you organize them **further** by bucketing:

*   You put books into shelves labeled A to Z based on the **author’s last name** initial.
*   All authors with last names starting with “A” go to Shelf A, “B” to Shelf B, and so on within each section.

So, Bucketing divides data **inside each partition** into smaller “buckets” based on a hash or value of a column (e.g., bucketing sales data by customer\_id). This helps organize data for **faster joins and lookups** within partitions.

Press enter or click to view image in full size

Bucketing.

### 3\. Data skew

**Data skew** happens when data is unevenly distributed across partitions, buckets, or nodes during processing, causing some partitions to have much more data than others.

Example:

Imagine you have sales data partitioned by `customer_id`, and you want to join it with customer data by `customer_id`.

customer\_id  sales\_amount  
  1             100  
  1             50  
  1             30  
  2             20  
  3             200  
  1000         10000  
  1000         9000

If customer\_id 1000 accounts for 90% of sales data records, and your join or aggregation is bucketed by `customer_id`, the bucket for customer\_id=1000 becomes huge — all other buckets are tiny.

*   This means the processing node handling bucket 1000 is overloaded.
*   Other nodes finish quickly and wait idle.
*   The entire job gets delayed.

**Handling Data skewness:**

**a. Salting(Adding Random Prefix):**

Add a random prefix to the skewed key to distribute data across multiple buckets.

**Example:**

Instead of just `customer_id=1000`, use keys like:

*   `1000_1`
*   `1000_2`
*   `1000_3`

Then after processing, aggregate back by removing the salt.

**b. Broadcasting :**

**Broadcasting** is a technique where a **small dataset** is copied (broadcasted) to all worker nodes in a distributed system, so that every node can access it locally without shuffling or sending data over the network repeatedly.

from pyspark.sql.functions import broadcast  
  
\# Broadcast the small dataframe  
joined\_df = large\_df.join(broadcast(small\_df), "id")  
  
\--Spark automatically broadcasts the small\_df to all executors.

**c. Change Partitioning Key**

*   Use a different column for bucketing/partitioning if original key is highly skewed.
*   Composite key (e.g., customer\_id + region) for better distribution.

### **4\. Shuffling.**

**Shuffling** is the process of **redistributing data across partitions or nodes** in a distributed system, typically when data needs to be grouped, joined, or sorted based on keys.

Imagine each person in a room is holding random pieces of mail. Now, you want to organize all mail **by ZIP code** so each table handles a different ZIP code.

*   Everyone must **move around the room** and drop mail at the right table.
*   That’s **shuffling** — it takes time, and it’s expensive.

Shuffling usually occurs during these operations:

*   **Group By** (e.g., total sales by region)
*   **Join** (especially if the join keys are on different nodes)
*   **Sort / Order By**
*   **Reduce By Key / Aggregate**

Before Shuffle:  
Worker 1: (A, 1), (B, 2)  
Worker 2: (A, 3), (C, 5)  
  
After Shuffle (groupBy key):  
Worker 1: (A, 1), (A, 3)  
Worker 2: (B, 2)  
Worker 3: (C, 5)  
  
Each key is now localized — but at the cost of data movement.

To handle shuffling, use broadcast, pre-partitioning and avoid wide operations.

**That’s a wrap for this blog — hope you found it helpful!**  
If you have any questions, or if there’s a topic you’d like me to cover next, feel free to drop a comment or reach out.

Here’s my [Linkedin](https://www.linkedin.com/in/akanksha-singh-065103125/) profile, in case you would like to connect or reach out. :)

If you’d like to support my work, you can [buy me a coffee](https://buymeacoffee.com/akankshasingh) — it’s a small gesture that helps keep the ideas brewing. ❤

[

Data Engineering

](/tag/data-engineering?source=post_page-----8a56f21f1070---------------------------------------)

[

System Design Concepts

](/tag/system-design-concepts?source=post_page-----8a56f21f1070---------------------------------------)

[

Distributed Systems

](/tag/distributed-systems?source=post_page-----8a56f21f1070---------------------------------------)

[

Big Data

](/tag/big-data?source=post_page-----8a56f21f1070---------------------------------------)

[

Data Governance

](/tag/data-governance?source=post_page-----8a56f21f1070---------------------------------------)

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F8a56f21f1070&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&user=Akanksha+Singh&userId=e71f89a3595b&source=---footer_actions--8a56f21f1070---------------------clap_footer------------------)

\--

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F8a56f21f1070&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&user=Akanksha+Singh&userId=e71f89a3595b&source=---footer_actions--8a56f21f1070---------------------clap_footer------------------)

\--

45

[](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F8a56f21f1070&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40akanksha_singh%2Fdata-engineering-was-hard-until-i-learned-these-15-system-design-concepts-8a56f21f1070&source=---footer_actions--8a56f21f1070---------------------bookmark_footer------------------)

[

![Akanksha Singh](https://miro.medium.com/v2/resize:fill:96:96/1*CL4zy71xc_04fNJUczUWmA.jpeg)



](/@akanksha_singh?source=post_page---post_author_info--8a56f21f1070---------------------------------------)

[

![Akanksha Singh](https://miro.medium.com/v2/resize:fill:128:128/1*CL4zy71xc_04fNJUczUWmA.jpeg)



](/@akanksha_singh?source=post_page---post_author_info--8a56f21f1070---------------------------------------)

[

## Written by Akanksha Singh

](/@akanksha_singh?source=post_page---post_author_info--8a56f21f1070---------------------------------------)

[1.5K followers](/@akanksha_singh/followers?source=post_page---post_author_info--8a56f21f1070---------------------------------------)

·[56 following](/@akanksha_singh/following?source=post_page---post_author_info--8a56f21f1070---------------------------------------)

Simplifying data engineering.

## Responses (45)

[](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page---post_responses--8a56f21f1070---------------------------------------)

See all responses

[

Help

](https://help.medium.com/hc/en-us?source=post_page-----8a56f21f1070---------------------------------------)

[

Status

](https://status.medium.com/?source=post_page-----8a56f21f1070---------------------------------------)

[

About

](/about?autoplay=1&source=post_page-----8a56f21f1070---------------------------------------)

[

Careers

](/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----8a56f