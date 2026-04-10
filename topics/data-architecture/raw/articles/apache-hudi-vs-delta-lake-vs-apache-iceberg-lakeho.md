# apache-hudi-vs-delta-lake-vs-apache-iceberg-lakehouse-featur

Source: https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-vs-apache-iceberg-lakehouse-feature-comparison

Apache Iceberg™ vs Delta Lake vs Apache Hudi™ - Feature Comparison Deep Dive          

Introducing Cost Analyzer for Apache Spark: free tool to analyze Spark ETL & find savings opportunities. [pip install now](https://www.onehouse.ai/spark-analysis-tool).

[

](/)

Product

Onehouse platform

[

Apache Spark™ & SQL

ETL at 4x cost-performance with the Quanton engine



](/product/quanton)[

Table Optimizer

10x lakehouse table performance



](/product/table-optimizer)[

LakeBase™

Fast, interactive SQL queries on the lakehouse



](/product/lakebase)[

Open Engines

Managed clusters for Trino, Ray, and more



](/product/open-engines)[

Oneflow Data Ingestion

Fast, efficient, fully-managed



](/product/oneflow)[

OneSync

Sync one copy of data to every query engine



](/product/onesync)

Deployment Options

[

Onehouse in Your Cloud

Deploy the Onehouse platform in your own VPC, on any cloud



](/product/onehouse-cloud)[

Quanton K8s Operator

Faster Apache Spark jobs on your existing Kubernetes infrastructure



](/product/quanton-operator)

Free Tools

[

LakeView



](/product/lakeview)[

Cost Analyzer for Apache Spark™



](/product/spark-analyzer)

Open Source Projects

[

Apache Hudi™



](/product/hudi)[

Apache XTable™ (Incubating)



](/product/unified-data-interoperability)

Solutions

[

Cut AWS EMR Costs by 60%+

](/solutions/optimize-aws-emr)[

Lakekhouse for Snowflake

](/solutions/maximize-snowflake)[

Better Data Engineering

](/solutions/data-engineering)[

Automated Vector Embeddings

](/solutions/genai)[

Managed Apache Hudi™

](/solutions/managed-hudi)

[![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/69ab3dbff6738a1a904362df_Spark%20Analyzer%20Nav%20Promo.png)

Try the Free Cost Analyzer for Apache Spark™

Find hidden compute waste and cut Spark spend by 60%+



](/product/spark-analyzer)

Learn

[

Resources

](/resource-library#whitePapers)[

Webinars

](/resource-library#webinars)[

Docs

](/request-docs-access)

[

Live Demo: Quanton Operator for K8s

4x Faster Spark on Your Own Infrastructure: Bringing Quanton to Self-Managed Kubernetes



](/webinar/4x-faster-spark-on-your-own-infrastructure-bringing-quanton-to-self-managed-kubernetes)

[

blog

](/blog)

About Us

[

Company

](/about-us)[

In the news

](/in-the-news)[

Careers

](https://jobs.lever.co/Onehouse)[

Contact us

](/contact-us)

[

Join OpenXData | April 29 (Virtual)

Free, 1-day event on AI-native data platforms, open stacks, and scaling performance.



](https://www.openxdata.ai/)

[Try onehouse free](/schedule-a-test-drive)

  

October 2, 2025

# Apache Iceberg™ vs Delta Lake vs Apache Hudi™ - Feature Comparison Deep Dive

Written by:

Kyle Weller

and

Kyle Weller

![Apache Iceberg™ vs Delta Lake vs Apache Hudi™ - Feature Comparison Deep Dive](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc54f3532f279cafc8bd9a_image7.png)

# Introduction

With the growing popularity of the [data lakehouse](https://www.onehouse.ai/glossary/data-lakehouse) there has been a rising interest in the analysis and comparison of the three open source projects which are at the core of this data architecture: [Apache Hudi](https://www.onehouse.ai/glossary/apache-hudi)™, [Delta Lake](https://delta.io/), and [Apache Iceberg](http://iceberg.apache.org/)™. As all projects continue growing, we updated this comparison article in October 2025 to include consideration of new features across the latest releases.

Most comparison articles currently published seem to evaluate these projects merely as table/file formats for traditional append-only workloads, overlooking some qualities and features that are critical for modern data lake platforms that need to support update-heavy workloads with continuous table management. (For more on the difference between a file/table format and a full data lakehouse implementation, please see our related blog post, [Open Table Formats and the Open Data Lakehouse, In Perspective](https://www.onehouse.ai/blog/open-table-formats-and-the-open-data-lakehouse-in-perspective).) This article will dive into greater depth as to the feature comparisons and also comprehensively cover benchmarks and community statistics.

If, when analyzing the comparisons, you find it hard to choose which format you want to use, take a look at our new project: [Apache XTable™ (Incubating)](https://xtable.apache.org/). XTable offers seamless interoperability between Hudi, Delta, and Iceberg. You no longer have to choose between formats or be locked into just one format. XTable (initially called Onetable) was co-launched into open source by Microsoft, Google, and Onehouse, [with VentureBeat covering the story](https://venturebeat.com/data-infrastructure/exclusive-microsoft-and-google-join-forces-on-onetable-an-open-source-solution-for-data-lake-challenges/). XTable has been [donated to the Apache Software Foundation](https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-vs-apache-iceberg-lakehouse-feature-comparison#).

# Feature Comparisons

First let's look at an overall feature comparison. As you read, notice how the Hudi community has invested heavily into comprehensive platform services on top of the lake storage format. While formats are critical for standardization and interoperability, table/platform services give you a powerful toolkit to easily develop and manage your data lake deployments. 

  Data Catalog Comparison 

   

![Apache Hudi](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

As of v1.0.2

![Delta Lake](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

As of v4.0.0

![Iceberg](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

As of v1.10.0

Write features

**ACID transactions**  
(Can I version and rewrite columnar files?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png)

**Copy-On-Write**  
(Can I version and rewrite columnar files?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Writes](https://hudi.apache.org/docs/table_types#copy-on-write-table)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Writes](https://docs.delta.io/latest/delta-batch.html#write-to-a-table)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Writes](https://iceberg.apache.org/docs/latest/spark-writes/)

**Merge-On-Read**  
(Can I efficiently amortize updates without rewriting the whole file?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) Full fledged [Merge-On-Read](https://hudi.apache.org/docs/table_types#merge-on-read-table)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Deletion Vectors experimental](https://docs.delta.io/latest/delta-deletion-vectors.html) with limited MOR functionality Cannot balance merge perf for queries. [Requires 2 step maintenance of Reorg and Vacuum](https://delta.io/blog/2023-07-05-deletion-vectors/)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Deletion Vectors](https://iceberg.apache.org/spec/#deletion-vectors) with limited MOR functionality. Cannot balance merge perf for queries. Requires manual compaction maintenance. [Only one DV](https://iceberg.apache.org/spec/#deletion-vectors) allowed per file

**Efficient bulk load**  
(Can I efficiently layout the initial load into the table? )

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Bulk\_Insert](https://hudi.apache.org/docs/write_operations#bulk_insert)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Efficient merge with indices**  
(Can I avoid merging all base files against all incoming update/delete records?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png)More than 8 types of [indexing](https://hudi.apache.org/docs/indexes)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Bloom filter index still proprietary](https://docs.databricks.com/delta/optimizations/bloom-filters.html)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Metadata](https://tabular.io/blog/iceberg-metadata-indexing/) [indexing](https://tabular.io/blog/iceberg-metadata-indexing/) is for tracking statistics

**Partial updates**  
(Can I rewrite only updated columns instead of full change records?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Partial Updates](https://hudi.apache.org/docs/sql_dml/#merge-into-partial-update)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Bootstrap**  
(Can I upgrade data in-place into the system without rewriting the data?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Bootstrap](https://hudi.apache.org/docs/migration_guide)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Convert to Delta](https://docs.databricks.com/spark/latest/spark-sql/language-manual/delta-convert-to-delta.html)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Table migration](https://iceberg.apache.org/docs/latest/hive/#table-migration)

**Managed ingestion**  
(can I ingest data streams from popular sources, with no/low code?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Hudi DeltaStreamer](https://hudi.apache.org/docs/hoodie_deltastreamer)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Delta autoloader still proprietary](https://docs.databricks.com/ingestion/auto-loader/index.html)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Concurrency Control**  
(if I run different writers and table services against the table at the same time how are competing commits handled?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [OCC](https://hudi.apache.org/blog/2021/12/16/lakehouse-concurrency-control-are-we-too-optimistic), [MVCC](https://hudi.apache.org/docs/concurrency_control), [NBCC](https://hudi.apache.org/docs/concurrency_control#non-blocking-concurrency-control) and [Early Conflict Detection](https://hudi.apache.org/docs/concurrency_control#early-conflict-detection)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [OCC only](https://docs.delta.io/latest/concurrency-control.html#write-conflicts)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [OCC only](https://iceberg.apache.org/spec/#optimistic-concurrency)

**Non-Blocking Concurrency**  
( Can I run different writers against the same table and not have them fail on each other?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [NBCC](https://hudi.apache.org/docs/concurrency_control#non-blocking-concurrency-control) Non-blocking concurrency control where competing commits don’t fail or retry

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) OCC fails competing writer and requires a retry

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) OCC fails competing writer and requires a retry

**Lock managers for multi-writers**  
(How can I configure multiple writers to write to the same table simultaneously?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) Non-blocking concurrency control for multi-writers Or can [still use](https://hudi.apache.org/docs/concurrency_control#enabling-multi-writing) external file system, DynamoDB, Hive, or Zookeeper lock provider

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Requires external DynamoDB lock provider](https://docs.delta.io/latest/delta-storage.html#single-cluster-setup-default). Locks managed at Spark JVM for single-writer and table level with external Dynamo

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Catalog used as locking mechanism with CAS operation](https://jack-vanlightly.com/analyses/2024/8/5/apache-icebergs-consistency-model-part-2) . Or can use [external lock providers](https://iceberg.apache.org/docs/latest/configuration/#lock-catalog-properties) like DynamoDB

**Data deduplication**  
(Can I insert data without introducing duplicates?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Merge](https://hudi.apache.org/docs/quick-start-guide#mergeinto), [Unique record keys](https://hudi.apache.org/docs/key_generation), [Precombine utility](https://hudi.apache.org/docs/faq_writing_tables#how-does-hudi-handle-duplicate-record-keys-in-an-input), [Drop dupes from inserts](https://hudi.apache.org/docs/configurations/#hoodiedatasourcewriteinsertdropduplicates)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png)No primary keys, [Merge Into, Insert Overwrite, Update cmds](https://docs.delta.io/latest/delta-update.html#update-a-table)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png)No primary keys, [Merge Into, Insert Overwrite, Update cmds](https://iceberg.apache.org/docs/latest/spark-writes/#overwriting-data)

**Catalog dependency**

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) Catalog not required

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) Catalog not required

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Catalog required](https://jack-vanlightly.com/analyses/2024/8/5/apache-icebergs-consistency-model-part-2)

  Data Catalog Comparison 

   

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

As of v1.0.2

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

As of v4.0.0

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

As of v1.10.0

Table metadata

**Scalable metadata management**  
(Can the table metadata scale with my data sizes)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [LSM tree timeline](https://hudi.apache.org/tech-specs-1point0/#timeline) with Hudi [MoR based metadata table](https://hudi.apache.org/docs/metadata/) w/ [HFile formats for 100x faster lookups](https://www.onehouse.ai/blog/introducing-multi-modal-index-for-the-lakehouse-in-apache-hudi#Fast-Lookup), self managed like any Hudi Table

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Parquet txn log checkpoints](https://github.com/delta-io/delta/blob/master/PROTOCOL.md#checkpoints-1) significantly slower lookups

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Avro manifest files](https://iceberg.apache.org/spec/#manifests) significantly slower and [need maintenance as you scale](https://medium.com/adobetech/taking-query-optimizations-to-the-next-level-with-iceberg-6c968b83cd6f#manifest-rewrite)

**Index management**  
(Can I build new indices on the table?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Async multi-modal indexing subsystem](https://www.onehouse.ai/blog/asynchronous-indexing-using-hudi)  
  
[Simple, Bloom, Global, HBase, In-Memory, Bucket, Hash, and Record Level Indexes](https://hudi.apache.org/docs/indexes)  
  
[Expression Index](https://hudi.apache.org/docs/indexes#expression-index)  
  
[Secondary Index](https://hudi.apache.org/docs/indexes#secondary-index)  
  
and [BYO pluggable index](https://hudi.apache.org/docs/indexes#additional-writer-side-indexes) for custom indexes [useful for AI vector embeddings](https://www.linkedin.com/posts/lakehouse_vectordatabase-apachehudi-databricks-activity-7172935043424739328-nMMW/)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Schema evolution**  
(Can I adjust the schema of my table)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Schema evolution](https://hudi.apache.org/docs/schema_evolution/) for add, reorder, drop, rename, update

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Schema evolution](https://docs.delta.io/latest/delta-batch.html#update-table-schema) for add, reorder, drop, rename, update

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Schema evolution](https://iceberg.apache.org/docs/latest/evolution/#schema-evolution) for add, reorder, drop, rename, update

**Partition evolution**  
(Can I keep changing the partition structure of the table as we go?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) Hudi [encourages](https://hudi.apache.org/docs/faq_design_and_concepts/#does-hudi-extend-the-hive-table-layout) coarse grained partitions and fine-grained [clustering](https://hudi.apache.org/docs/clustering) and also offers [expression indexes](https://github.com/apache/hudi/blob/master/rfc/rfc-63/rfc-63.md) which achieves the same goal.

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Partition evolution](https://iceberg.apache.org/docs/latest/evolution/#partition-evolution) lets you change partitions as your data evolves. Old data stays in old partitions, new data gets new partitions, with uneven performance across them.

**Primary keys**  
(Can I define primary keys like regular database tables?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Primary keys](https://hudi.apache.org/docs/key_generation/)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [In proprietary Delta version](https://docs.databricks.com/tables/constraints.html#declare-primary-key-and-foreign-key-relationships)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Column statistics and data skipping**  
(Can queries benefit from file pruning based on predicates from any column, without reading data file footers?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Col Stats in metadata](https://www.onehouse.ai/blog/hudis-column-stats-index-and-data-skipping-feature-help-speed-up-queries-by-an-orders-of-magnitude)  
  
[Hfile Column Stats Index adds up to 50x perf](https://www.onehouse.ai/blog/hudis-column-stats-index-and-data-skipping-feature-help-speed-up-queries-by-an-orders-of-magnitude)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Column Stats in Parquet checkpoint](https://docs.delta.io/latest/optimizations-oss.html#data-skipping)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Column Stats in Avro manifest](https://iceberg.apache.org/docs/latest/performance/#metadata-filtering)

  Data Catalog Comparison 

   

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

As of v1.0.2

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

As of v4.0.0

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

As of v1.10.0

Read features

**Time travel**  
(Can I query the table as of a point-in-time?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Time travel](https://hudi.apache.org/docs/sql_queries/#time-travel-query)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Time travel](https://docs.delta.io/latest/delta-batch.html#-deltatimetravel)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Time travel](https://iceberg.apache.org/docs/latest/spark-queries/#time-travel)

**Merge-On-Read query**  
(Can my query read both the parquet files and merge the change files at query time?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Snapshot Query](https://hudi.apache.org/docs/sql_queries/#snapshot-query)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Complex relationship of reader/writer support](https://docs.databricks.com/aws/en/delta/deletion-vectors#compatibility-with-delta-clients) between OSS and proprietary Delta Lake

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [All queries will merge deletion vectors](https://iceberg.apache.org/spec/#scan-planning)

**Incremental query**  
(Can I obtain the latest values for all records that have changed after a given commit timechange stream for a given time window on the table?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Incremental query](https://hudi.apache.org/docs/querying_data#spark-incr-query) and [CDC query](https://hudi.apache.org/docs/sql_queries#change-data-capture)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [CDF experimental mode](https://docs.delta.io/2.0.0/delta-change-data-feed.html)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Can only incrementally read appends](https://iceberg.apache.org/docs/latest/spark-queries/#incremental-read)

**CDC query**  
( Can I obtain all changes to a table within a given time window?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [CDC query](https://hudi.apache.org/docs/sql_queries/#change-data-capture)  
  
Also provides before/after images and change operations of the changed records

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Secondary index**  
(Can indexes be used to speed up queries with predicate on columns other than record key columns?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Secondary index query](https://hudi.apache.org/docs/sql_queries/#query-using-secondary-index) [(blog)](https://hudi.apache.org/blog/2025/04/02/secondary-index/)  
  
Efficient point lookup queries

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Data skipping based on built-in functions**  
(Can queries perform data skipping based on functions defined on column values, in addition to literal column values?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Expression indexes](https://hudi.apache.org/docs/indexes/#expression-index) \- If a query has a predicate on a function of a column, the expression index speeds up the query

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) Logical predicates on a source or a [generated column](https://docs.delta.io/latest/delta-batch.html#-deltausegeneratedcolumns) will prune files during query execution

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Iceberg can transform table data to partition values and maintain relationships](https://iceberg.apache.org/docs/latest/partitioning/#icebergs-hidden-partitioning), while also collecting stats on columns

  Data Catalog Comparison 

   

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

As of v1.0.2

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

As of v4.0.0

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

As of v1.10.0

Table Services

**File sizing**  
(Can I configure a single standard file size to be enforced across any writes to the table automatically?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Automated file size tuning](https://hudi.apache.org/docs/file_sizing)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Auto file sizing](https://docs.delta.io/latest/optimizations-oss.html#auto-compaction)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Manual maintenance](https://iceberg.apache.org/docs/latest/maintenance/#optional-maintenance)

**Compaction**  
(Merge changelogs with updates/deletes  from MoR writes)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Managed compaction](https://hudi.apache.org/docs/compaction)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Merging deletion vectors requires 2 step maintenance of Reorg and Vacuum](https://delta.io/blog/2023-07-05-deletion-vectors/)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) Compaction requires [manual maintenance](https://iceberg.apache.org/docs/latest/maintenance/#compact-data-files)

**Cleaning**  
(Do older versions of files get automatically removed from storage?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Managed cleaning service](https://hudi.apache.org/docs/cleaning)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [VACUUM](https://docs.delta.io/latest/delta-batch.html#data-retention) is manual operation

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Expiring snapshots](https://iceberg.apache.org/docs/latest/maintenance/#expire-snapshots) is manual operation

**Linear clustering**  
(Can I linearly co-locate certain data close together for performance?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Automated clustering](https://hudi.apache.org/blog/2021/01/27/hudi-clustering-intro/) that can be evolved for perf tuning, [user defined partitions](https://hudi.apache.org/docs/configurations/#hoodiebulkinsertuserdefinedpartitionerclass)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) You can force writers to [sort as they write](https://iceberg.apache.org/docs/latest/spark-ddl/#alter-table--write-ordered-by) which hinders performance.

**Multidimensional Z-order/Space curve clustering**  
(Can I sort high cardinality data with space curves for performance?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Z-order + Hilbert Curves](https://hudi.apache.org/blog/2021/12/29/hudi-zorder-and-hilbert-space-filling-curves/) with auto async clustering

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Z-order](https://docs.delta.io/latest/optimizations-oss.html#z-ordering-multi-dimensional-clustering) in OSS, but [auto-optimize still proprietary](https://docs.databricks.com/delta/optimizations/auto-optimize.html)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Z-order](https://iceberg.apache.org/docs/latest/spark-procedures/#rewrite_data_files) through manual maintenance

  Data Catalog Comparison 

   

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

As of v1.0.2

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

As of v4.0.0

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

As of v1.10.0

Platform Support

**CLI**  
(Can I manage my tables with a CLI)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [CLI](https://hudi.apache.org/docs/cli)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Data quality validation**  
(Can I define quality conditions to be checked and enforced?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Pre-commit validators](https://hudi.apache.org/docs/precommit_validator)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Constraints for not null and value check only](https://docs.delta.io/latest/delta-constraints.html)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Pre-commit transformers**  
(Can I transform data before commit while I write?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Transformers](https://hudi.apache.org/docs/hoodie_streaming_ingestion#transformers)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Commit notifications**  
(Can I get a callback notification on successful commit?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Commit notifications](https://hudi.apache.org/docs/platform_services_post_commit_callback)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Failed commit safeguards**  
(How am I protected from partial and failed write operations?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Automated marker mechanism](https://hudi.apache.org/docs/markers)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Manual](https://docs.delta.io/latest/delta-batch.html#idempotent-writes) [configs](https://docs.delta.io/latest/delta-batch.html#idempotent-writes)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Orphaned files](https://iceberg.apache.org/docs/latest/maintenance/#delete-orphan-files) need manual maintenance, [failed commits can corrupt tables](https://github.com/apache/iceberg/issues/4666)

**Monitoring**  
(Can I get metrics and monitoring out of the box?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [MetricsReporter](https://hudi.apache.org/docs/metrics) for automated monitoring

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

**Savepoint and restore**  
(Can I save a snapshot of the data and then restore the table back to this form?)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a2984c02a05e3de47_image2.png) [Savepoint command to save specific versions.](https://hudi.apache.org/docs/disaster_recovery#savepoint)  
  
[Restore command with time travel versions or savepoints](https://hudi.apache.org/docs/disaster_recovery#restore)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc565a4f3603f609f9f2a8_image1.png) [Restore command with time travel versions](https://docs.delta.io/latest/delta-utility.html#-restore-delta-table)  
  
Have to preserve all versions in vacuum retention (eg. If you want to restore to 6mon ago, you have to retain 6mon of versions or DIY)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [DIY](https://iceberg.apache.org/docs/latest/reliability/)

  Data Catalog Comparison 

   

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

As of v1.0.2

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

As of v4.0.0

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

As of v1.10.0

Ecosystem Support

Apache Spark

[Read + Write](https://hudi.apache.org/docs/quick-start-guide)

[Read + Write](https://docs.delta.io/latest/quick-start.html#set-up-apache-spark-with-delta-lake)

[Read + Write](https://iceberg.apache.org/docs/latest/getting-started/)

Apache Flink

[Read + Write](https://hudi.apache.org/docs/flink-quick-start-guide)

[Read + Write](https://github.com/delta-io/connectors/tree/master/flink)

[Read + Write](https://iceberg.apache.org/docs/latest/flink/)

Presto

[Read](https://prestodb.io/docs/current/connector/hudi.html)

[Read](https://prestodb.io/docs/current/connector/deltalake.html)

[Read + Write](https://prestodb.io/docs/current/connector/iceberg.html)

Trino

[Read](https://trino.io/docs/current/connector/hudi.html)

[Read + Write](https://trino.io/docs/current/connector/delta-lake.html)

[Read + Write](https://trino.io/docs/current/connector/iceberg.html)

Hive

[Read](https://hudi.apache.org/docs/sql_queries#hive)

[Read](https://github.com/delta-io/connectors/tree/master/hive)

[Read + Write](https://iceberg.apache.org/docs/latest/hive/)

DBT

[Read + Write](https://docs.getdbt.com/reference/resource-configs/spark-configs#default-file-format-configurations)

[Read + Write](https://docs.databricks.com/integrations/prep/dbt.html)

[Read + Write](https://docs.getdbt.com/reference/resource-configs/spark-configs#default-file-format-configurations)

Kafka Connect

[Write](https://github.com/apache/hudi/tree/master/hudi-kafka-connect)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png) [Proprietary only](https://docs.confluent.io/cloud/current/connectors/cc-databricks-delta-lake-sink/cc-databricks-delta-lake-sink.html)

[Write](https://iceberg.apache.org/docs/nightly/kafka-connect/)

Confluent

Write [via XTable](https://xtable.apache.org/)

[Write](https://docs.confluent.io/cloud/current/topics/tableflow/overview.html)

[Write](https://docs.confluent.io/cloud/current/topics/tableflow/overview.html)

Pulsar

[Read +](https://github.com/streamnative/pulsar-io-lakehouse) [Write](https://hub.streamnative.io/connectors/lakehouse-sink/2.9.2/)

[Read +](https://github.com/streamnative/pulsar-io-lakehouse) [Write](https://hub.streamnative.io/connectors/lakehouse-sink/2.9.2/)

[Read +](https://github.com/streamnative/pulsar-io-lakehouse) [Write](https://hub.streamnative.io/connectors/lakehouse-sink/2.9.2/)

Debezium

[Write](https://hudi.apache.org/cn/blog/2022/01/14/change-data-capture-with-debezium-and-apache-hudi/)

[Write](https://medium.com/everything-full-stack/streaming-data-changes-to-a-data-lake-with-debezium-and-delta-lake-pipeline-299821053dc3)

[Write](https://debezium.io/blog/2021/10/20/using-debezium-create-data-lake-with-apache-iceberg/)

Kyuubi

[Read + Write](https://kyuubi.readthedocs.io/en/master/connector/spark/hudi.html)

[Read + Write](https://kyuubi.readthedocs.io/en/master/connector/spark/delta_lake.html)

[Read + Write](https://kyuubi.readthedocs.io/en/master/connector/spark/iceberg.html)

ClickHouse

[Read](https://clickhouse.com/docs/integrations/hudi)

[Read](https://clickhouse.com/docs/integrations/deltalake)

[Read](https://clickhouse.com/docs/integrations/iceberg)

Apache Impala

[Read + Write](https://hudi.apache.org/docs/querying_data/#impala-34-or-later)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

[Read + Write](https://impala.apache.org/docs/build/html/topics/impala_iceberg.html)

AWS Athena

[Read](https://docs.aws.amazon.com/athena/latest/ug/querying-hudi.html)

[Read](https://docs.delta.io/latest/presto-integration.html#limitations)

[Read + Write](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg.html)

AWS EMR

[Read + Write](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-hudi-installation-and-configuration.html)

[Read + Write](https://docs.aws.amazon.com/emr/latest/EMR-Serverless-UserGuide/using-delta-lake.html)

[Read + Write](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-iceberg.html)

AWS Redshift

[Read](https://docs.aws.amazon.com/redshift/latest/dg/c-spectrum-external-tables.html)

[Read](https://docs.aws.amazon.com/redshift/latest/dg/c-spectrum-external-tables.html)

[Read](https://docs.aws.amazon.com/redshift/latest/dg/querying-iceberg.html)

AWS Glue

[Read +](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-hudi.html) [Write](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-hudi.html)

[Read + Write](https://aws.amazon.com/marketplace/pp/prodview-seypofzqhdueq)

[Read + Write](https://aws.amazon.com/marketplace/pp/prodview-iicxofvpqvsio)

Google BigQuery

[Read](https://cloud.google.com/bigquery/docs/query-open-table-format-using-manifest-files)

[Read](https://cloud.google.com/bigquery/docs/create-delta-lake-table)

[Read](https://cloud.google.com/bigquery/docs/iceberg-tables) [Write w/ limitations](https://cloud.google.com/bigquery/docs/iceberg-tables#best_practices)

Google DataProc

[Read + Write](https://cloud.google.com/blog/products/data-analytics/getting-started-with-new-table-formats-on-dataproc)

[Read + Write](https://cloud.google.com/blog/products/data-analytics/getting-started-with-new-table-formats-on-dataproc)

[Read + Write](https://cloud.google.com/blog/products/data-analytics/getting-started-with-new-table-formats-on-dataproc)

Azure Fabric

[Read + Write](https://www.onehouse.ai/blog/apache-hudi-on-microsoft-azure)

[Read + Write](https://docs.microsoft.com/en-us/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)

Read + Write [via XTable in Onelake](https://blog.fabric.microsoft.com/en-US/blog/store-and-use-your-snowflake-iceberg-data-in-onelake/)

Azure HDInsight

[Read + Write](https://www.onehouse.ai/blog/apache-hudi-on-microsoft-azure)

[Read + Write](https://techcommunity.microsoft.com/t5/analytics-on-azure-blog/delta-lake-on-azure/ba-p/1869746)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

Databricks

[Read + Write](https://www.onehouse.ai/blog/how-to-use-apache-hudi-with-databricks)

[Read + Write](https://docs.databricks.com/delta/index.html)

[Read + Write](https://docs.microsoft.com/en-us/azure/databricks/delta/delta-utility#--convert-an-iceberg-table-to-a-delta-table)

Vertica

[Read](https://www.vertica.com/kb/Apache_Hudi_TE/Content/Partner/Apache_Hudi_TE.htm)

[Read](https://www.vertica.com/kb/Vertica_DeltaLake_Technical_Exploration/Content/Partner/Vertica_DeltaLake_Technical_Exploration.htm)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

Apache Doris

[Read](https://doris.apache.org/docs/lakehouse/catalogs/hudi-catalog)

[Read](https://doris.apache.org/docs/lakehouse/catalogs/delta-lake-catalog)

[Read](https://doris.apache.org/docs/ecosystem/external-table/iceberg-of-doris?_highlight%3Diceberg)

Starrocks

Read [\+ Write](https://docs.starrocks.io/docs/quick_start/hudi/)

[Read and Write](https://docs.starrocks.io/docs/data_source/catalog/deltalake_catalog/)

[Read](https://docs.starrocks.com/en-us/main/using_starrocks/External_table#apache-iceberg-external-table)

Snowflake

[Read via XTable](https://www.onehouse.ai/solutions/maximize-snowflake)

[Read](https://docs.snowflake.com/en/sql-reference/sql/create-external-table.html#external-table-that-references-files-in-a-delta-lake)

[Read](https://www.snowflake.com/blog/expanding-the-data-cloud-with-apache-iceberg/) [\+ Write](https://www.snowflake.com/blog/expanding-the-data-cloud-with-apache-iceberg/)

Dremio

[Read via XTable](https://www.onehouse.ai/blog/dremio-lakehouse-analytics-with-hudi-and-iceberg-using-xtable)

[Read + Write](https://docs.dremio.com/software/data-formats/delta-lake/') [With limitations](https://docs.dremio.com/software/data-formats/delta-lake/#limitations)

[Read + Write](https://docs.dremio.com/software/data-formats/apache-iceberg/#limitations) [With limitations](https://docs.dremio.com/software/data-formats/apache-iceberg/#limitations)

Gravitino

[Read](https://gravitino.apache.org/docs/0.9.1/lakehouse-hudi-catalog/)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b2a6_icon_x.png)

[Read + Write](https://gravitino.apache.org/docs/0.9.1/lakehouse-iceberg-catalog)

Unity Catalog

[Read + Write](https://docs.unitycatalog.io/#unity-catalog-open-multimodal-catalog-for-data-ai)

[Read + Write](https://docs.unitycatalog.io/#unity-catalog-open-multimodal-catalog-for-data-ai)

[Read + Write](https://docs.unitycatalog.io/#unity-catalog-open-multimodal-catalog-for-data-ai)

HMS

[Read + Write](https://hudi.apache.org/docs/syncing_metastore/)

[Read + Write](https://docs.delta.io/latest/delta-batch.html#syncing-table-schema-and-properties-to-the-hive-metastore)

[Read + Write](https://iceberg.apache.org/hive-quickstart/)

AWS Glue Catalog

[Read + Write](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-hudi.html#aws-glue-programming-etl-format-hudi-write)

[Read + Write](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-delta-lake.html#aws-glue-programming-etl-format-delta-lake-write)

[Read + Write](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html#aws-glue-programming-etl-format-iceberg-write)

Apache Polaris

[Read + Write](https://polaris.incubator.apache.org/in-dev/unreleased/entities/) [w/ Generic Table](https://polaris.apache.org/in-dev/unreleased/generic-table/)

[Read + Write](https://polaris.incubator.apache.org/in-dev/unreleased/entities/) [w/ Generic Table](https://polaris.apache.org/in-dev/unreleased/generic-table/)

[Read + Write](https://polaris.apache.org/)

Language Support

[Java](https://github.com/apache/hudi/blob/master/hudi-examples/hudi-examples-java/src/main/java/org/apache/hudi/examples/java/HoodieJavaWriteClientExample.java), [Scala](https://hudi.apache.org/docs/quick-start-guide), [Python](https://hudi.apache.org/docs/python-rust-quick-start-guide), [SQL](https://hudi.apache.org/docs/sql_queries), [Rust](https://github.com/apache/hudi-rs)

[Java](https://docs.delta.io/latest/api/java/index.html), [Scala](https://docs.delta.io/latest/api/scala/io/delta/tables/index.html), [Python](https://docs.delta.io/latest/api/python/index.html), [SQL](https://docs.delta.io/latest/delta-batch.html), [Rust](https://docs.rs/deltalake/latest/deltalake/)

[Java](https://iceberg.apache.org/javadoc/latest/), [Scala](https://iceberg.apache.org/docs/latest/spark-queries/#querying-with-dataframes), [Python](https://py.iceberg.apache.org/), [SQL](https://iceberg.apache.org/docs/latest/spark-ddl/), [Rust](https://rust.iceberg.apache.org/), [G](https://go.iceberg.apache.org/), [C++](https://github.com/apache/iceberg-cpp/)

Ray

[Read](https://docs.ray.io/en/latest/data/api/doc/ray.data.read_hudi.html#ray.data.read_hudi)

[Read](https://docs.ray.io/en/latest/data/api/doc/ray.data.read_delta.html)

[Read + Write](https://docs.ray.io/en/latest/data/api/doc/ray.data.read_iceberg.html)

Daft

[Read](https://docs.daft.ai/en/stable/connectors/hudi/)

[Read + Write](https://docs.daft.ai/en/stable/connectors/delta_lake/)

[Read + Write](https://docs.daft.ai/en/stable/connectors/iceberg/)

From the comparisons above you may notice a pattern that the inspection of these three projects can be split into multiple layers beyond simply an “Open Table Format”:

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc538ed5b84b9f5b0f8cdf_image6.png)

While historically each are considered “Table Formats,” Hudi is slightly different in that it also offers “Storage Engine” functionality for a [full fledged lakehouse platform](https://www.onehouse.ai/blog/open-table-formats-and-the-open-data-lakehouse-in-perspective) or what some might call a [DLMS: Data Lakehouse Management System](https://hudi.apache.org/blog/2024/12/16/announcing-hudi-1-0-0/):

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc53b58f5b60729e6faad9_image11.png)

# Community Momentum

An important aspect of an open source project is the community. The community is essential for the development momentum, ecosystem adoption, or the objectiveness of the platform. Below is a comparison over the last 12 months of Hudi, Delta, Iceberg when it comes to their communities:

  Data Catalog Comparison 

   

![Apache Hudi](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc6519161427649029d413_Image%209.png)

![Delta Lake](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b341_delta.png)

![Iceberg](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/68dc5ffced91ad874449b528_image13.png)

Community Momentum

**Github Stars**  
All Time  
(a vanity metric that represents popularity more than contribution)

5,893

8,179

7,435

**Github Watchers**  
All Time  
(People interested to track a project)

1,153

216

178

**Github Forks**  
All Time  
(A closer indication of engagement/usage of the project)

2,430

1,892

2,720

**Github Contributors**  
Last 12 months  
(Number of people who contributed to the repo in any form)

1,030

1,332

2,924

**Github PRs**  
Last 12 months  
(Number of PR events on the repo)

2,893

1,978

4,180

# TPC-DS Performance Benchmarks

Performance benchmarks rarely are representative of real life workloads, and we strongly encourage the community to run their own analysis against their own data. Nonetheless these benchmarks can serve as an interesting data point while you start your research into choosing a data lakehouse platform. Below are references to relevant benchmarks:

**Databeans and Onehouse**

Databeans worked with Databricks to publish a [benchmark](https://databeans-blogs.medium.com/delta-vs-iceberg-performance-as-a-decisive-criteria-add7bcdde03d) used in their Data+AI Summit Keynote, but they misconfigured an obvious out-of-box setting. Onehouse corrected the benchmark here:

[https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-transparent-tpc-ds-lakehouse-performance-benchmarks](https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-transparent-tpc-ds-lakehouse-performance-benchmarks) 

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc53f762320088329775bb_image20.png)

**Brooklyn Data and Onehouse**

Databricks asked Brooklyn Data to publish a benchmark of Delta vs Iceberg:

[https://brooklyndata.co/blog/benchmarking-open-table-formats](https://brooklyndata.co/blog/benchmarking-open-table-formats) 

Onehouse added Apache Hudi and published the code in the Brooklyn Github repo:

[https://github.com/brooklyn-data/delta/pull/2](https://github.com/brooklyn-data/delta/pull/2) 

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc54157d2abc298b7e3602_image16.png)

A clear pattern emerges from these benchmarks: Delta and Hudi are comparable, while Apache Iceberg consistently trails behind as the slowest of the projects. Performance isn’t the only factor you should consider, but performance does translate into cost savings that add up throughout your pipelines.

**_A note on running TPC-DS benchmarks:_**

One key thing to remember when running TPC-DS benchmarks comparing Hudi, Delta, and Iceberg is that, by default, Delta and Iceberg are optimized for append-only workloads. Hudi default settings, by contrast, are optimized for mutable workloads. By default, Hudi uses an \`upsert\` write mode which naturally has a write overhead compared to inserts. Without this knowledge you may be comparing apples to oranges. Change this one out-of-the-box configuration to \`bulk-insert\` for a fair assessment: ‍[https://hudi.apache.org/docs/write\_operations/](https://hudi.apache.org/docs/write_operations/)  

For more details about benchmarks, see our in depth TPC benchmark review research here:

[https://www.onehouse.ai/blog/measuring-etl-price-performance-on-cloud-data-platforms](https://www.onehouse.ai/blog/measuring-etl-price-performance-on-cloud-data-platforms) 

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc543a240a8e6874f87ebb_image17.png)

# Feature Highlights

Building a data lakehouse platform takes more than just reviewing checkboxes listing feature availability. Let’s pick a few of the differentiating features above and dive into the use cases and real benefits in plain English.

## Incremental Pipelines

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc5451ad9b00ee825686ba_image18.png)

The majority of data engineers today feel like they have to choose between [streaming data](https://www.onehouse.ai/glossary/streaming-data) and old-school batch [ETL](https://www.onehouse.ai/glossary/etl) pipelines. Apache Hudi has pioneered a new paradigm called [incremental pipelines](https://www.uber.com/en-BR/blog/hoodie/). Out of the box, Hudi tracks all changes (appends, updates, deletes) and exposes them as [change streams](https://hudi.apache.org/docs/querying_data#spark-incr-query). With record-level indexes you can more efficiently leverage these change streams to avoid recomputing data and just process changes using [incremental updates](https://www.onehouse.ai/glossary/incremental-update). While other data lake platforms may enable a way to consume changes incrementally, Hudi is designed from the ground up to efficiently enable incremental workflows, which results in cost-efficient ETL pipelines at lower latencies.

Databricks recently developed a similar feature they call [change data feed](https://docs.databricks.com/delta/delta-change-data-feed.html), which they held as proprietary until it was finally released to open source in Delta Lake 2.0. Iceberg has an [incremental read](https://iceberg.apache.org/docs/latest/spark-queries/#incremental-read), but it only allows you to read incremental appends, not updates and deletes - which are essential for true [change data capture](https://www.onehouse.ai/glossary/change-data-capture-cdc) (CDC) and transactional data within a data lakehouse.

## Concurrency Control

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc5465533b55328fd6bdff_image5.png)

[ACID transactions](https://www.onehouse.ai/glossary/acid-transactions) and concurrency control are key characteristics of a data lakehouse, but how do current designs actually stack up compared to real-world workloads? Hudi, Delta, and Iceberg all support [optimistic concurrency control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) (OCC). In optimistic concurrency control, writers check if they have overlapping files; if a conflict exists, they fail the operations and retry. For Delta Lake, as an example, this was just a Java virtual machine (JVM)-level lock held on a single Apache Spark™ driver node - which meant you had no OCC outside of a single cluster, until [recently](https://docs.delta.io/latest/delta-storage.html#multi-cluster-setup).

While this may work fine for append-only immutable datasets, optimistic concurrency control struggles with real-world scenarios, which introduce the need for frequent updates and deletes - either because of the data loading pattern or due to the need to reorganize the data for better query performance. 

Oftentimes, it’s not practical to take writers offline for table management to ensure the table is healthy and performant. Apache Hudi concurrency control is more granular than other data lakehouse platforms (file-level), and with a design optimized for multiple small updates/deletes, the conflict possibility can be largely reduced to negligible in most real-world use cases. 

You can read more details in [this blog](https://hudi.apache.org/blog/2021/12/16/lakehouse-concurrency-control-are-we-too-optimistic/) as to how you can operate with asynchronous table services even in multi-writer scenarios, without the need to pause writers. This achieves a level of concurrency very close to the level supported by standard databases.

## Merge On Read

Any good database system supports [different trade-offs](https://research.ibm.com/publications/designing-access-methods-the-rum-conjecture) between write performance and query performance. The Hudi community has made some seminal contributions in terms of defining these concepts for data lake storage across the industry. Hudi, Delta, and Iceberg all write and store data in [Apache Parquet](https://www.onehouse.ai/glossary/apache-parquet) files. When updates occur, these Parquet files are versioned and rewritten. This write mode pattern is what [the industry](https://stackoverflow.com/questions/628938/what-is-copy-on-write) now calls [copy on write](https://www.onehouse.ai/glossary/copy-on-write-cow) (CoW). This model works well for optimizing query performance, but can be limiting for write performance and data freshness. 

In addition to CoW, Apache Hudi supports another table storage layout called [merge on read](https://hudi.apache.org/docs/table_types#merge-on-read-table) (MoR). [Merge on read](https://www.onehouse.ai/glossary/merge-on-read-mor) stores data using a combination of columnar Parquet files and row-based [Apache Avro](https://www.onehouse.ai/glossary/avro) log files. Updates can be batched up in log files that can later be compacted into new Parquet files, synchronously or asynchronously, to balance maximum query performance and lower write amplification.

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc547b1c8221d94ffe1402_image4.png)

Thus, for a near real-time streaming workload, Hudi could use the more efficient row-oriented formats, and for batch workloads, the Hudi format uses the vectorizable, column-oriented format with seamless merging of the two formats when required. Many users turn to Apache Hudi since it is the only project with this capability, which allows them to achieve unmatched write performance and end-to-end data pipeline latencies.

## Partition Evolution

One feature often highlighted for the Apache Iceberg data lakehouse project is hidden partitioning, which unlocks what is called [partition evolution](https://iceberg.apache.org/docs/latest/evolution/#partition-evolution). The basic idea is that when your data starts to evolve, or when you just aren’t getting the performance you need out of your current partitioning scheme, partition evolution allows you to update your partitions for new data without the need to rewrite your data. 

When you evolve your partitions, old data is left in the old partitioning scheme and only new data is partitioned with your evolution. However, a table partitioned multiple ways pushes complexity to the user and cannot guarantee consistent performance if the user is unaware of, or simply fails to account for, the evolution history.

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc5498fe0fbc51fbb36a0f_image12.png)

Apache Hudi takes a different approach to address the problem of adjusting data layout as your data evolves with [clustering](https://hudi.apache.org/docs/clustering). You can choose a coarse-grained partition strategy or even leave it unpartitioned, and use a more fine-grained clustering strategy within each partition. Clustering can be run synchronously or asynchronously and can be evolved without rewriting any data. This approach is comparable to the micro-partitioning and clustering [strategy of Snowflake](https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions.html#what-are-micro-partitions).

## Multi-Modal Indexing

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc54a84d18aacd7945b011_image21.png)

Indexing is an integral capability for databases and [data warehouses](https://www.onehouse.ai/glossary/data-warehouse), yet is largely absent in [data lakes](https://www.onehouse.ai/glossary/data-lake). In recent releases, Apache Hudi created a first-of-its-kind high-performance indexing subsystem for the data lakehouse that we call the [Hudi multi-modal index](https://www.onehouse.ai/blog/introducing-multi-modal-index-for-the-lakehouse-in-apache-hudi). Apache Hudi offers an [asynchronous indexing](https://github.com/apache/hudi/blob/master/rfc/rfc-45/rfc-45.md) mechanism that allows you to build and change indexes without impacting write latency. This indexing mechanism is extensible and scalable to support any popular index techniques, such as Bloom, hash, bitmap, R-tree, and others.

These indexes are stored in the [Hudi metadata table](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=147427331), which is stored in cloud storage next to your data. In this new release the [metadata](https://www.onehouse.ai/glossary/metadata) is written in optimized, indexed file formats which results in 10-100x performance improvements for point lookups versus Delta or Iceberg generic file formats. When testing real-world workloads, this new indexing subsystem results in 10-30x overall query performance.

## Ingestion Tools 

What sets a data platform apart from data formats are the operational services available. A differentiator for Apache Hudi is the powerful [data ingestion](https://www.onehouse.ai/glossary/ingest) utility called [DeltaStreamer](https://hudi.apache.org/docs/0.12.3/hoodie_deltastreamer/). (“Delta” refers to changes to data, not to a particular data lakehouse project.) DeltaStreamer is battle-tested and used in production to build some of the largest data lakes on the planet today. DeltaStreamer is a standalone utility which allows you to incrementally ingest upstream changes from a wide variety of sources such as DFS, [Kafka](https://www.onehouse.ai/glossary/apache-kafka), database changelogs, S3 events, JDBC, and more.

Iceberg has no solution for a managed ingestion utility, and Delta Autoloader remains a Databricks-proprietary feature that only supports cloud storage sources such as S3.

# Use Cases - Examples from the Community

Feature comparisons and [benchmarks](https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-transparent-tpc-ds-lakehouse-performance-benchmarks) can help newcomers orient themselves on what technology choices are available, but more important is sizing up your personal use cases and workloads to find the right fit for your data architecture. All three of these technologies, Hudi, Delta, Iceberg have different origin stories and advantages for certain use cases. Hudi, the original data lakehouse project, was born at Uber to power petabyte-scale data lakes in near real-time, with painless table management. Iceberg was born at Netflix and was designed to overcome cloud storage scale problems such as file listings. Delta was born at Databricks and it has deep integrations and accelerations when using the Databricks Spark runtime.

From years of engaging in real-world comparison evaluations in the community, Apache Hudi routinely has a technical advantage when you have mature workloads that grow beyond simple append-only inserts. Once you start processing many updates, start adding real concurrency, or attempt to reduce the end-to-end latency of your pipelines, Apache Hudi stands out as the industry leader in performance and feature set.

Here are a couple examples and stories from [the community](https://hudi.apache.org/powered-by) who independently evaluated and decided to use Apache Hudi:

1.  [**Peloton**](https://hudi.apache.org/blog/2025/07/15/modernizing-datainfra-peloton-hudi) **-**

“The Data Platform team at Peloton is responsible for building and maintaining the core infrastructure that powers analytics, reporting, and real-time data applications. Peloton's transition to Apache Hudi yielded several measurable improvements:

*   Ingestion frequency increased from once daily to every 10 minutes.
*   Reduced snapshot job durations from an hour to under 15 minutes.
*   Cost savings by eliminating read replicas and optimizing EMR cluster usage.
*   Time travel support enabled retrospective analysis and model re-training.
*   Improved compliance posture through structured deletes and encrypted PII.”

2.  [**Uber**](https://hudi.apache.org/blog/2025/06/30/uber-hudi/) - 

“At Uber, the Core Services Data Engineering team supports a wide range of use cases across products like Uber Mobility and Uber Eats. One critical use case is computing the collection - the net payable amount - from a trip or an order. To solve this problem at scale, Uber re-architected their pipelines using Apache Hudi to enable low-latency, incremental, and rule-based processing. The improvements were substantial and measurable:

*   Runtime reduced from ~20 hours to ~4 hours (~75% improvement)
*   Test coverage increased to 95% for transformation logic
*   Single run cost reduced by 60%”

3.  [**Amazon package delivery system**](https://hudi.apache.org/blog/2021/09/01/building-eb-level-data-lake-using-hudi-at-bytedance/) **-** 

This story describes how Amazon Transportation Services (ATS) implemented an Apache Hudi-based data lakehouse to handle massive data ingestion challenges and highly mutable workloads at scale.

_“One of the biggest challenges Amazon Transportation Service faced was handling data at petabyte scale with the need for constant inserts, updates, and deletes with minimal time delay, which reflects real business scenarios and package movement to downstream data consumers.”_

_“In this post, we show how we ingest data in real time in the order of hundreds of GBs per hour and run inserts, updates, and deletes on a petabyte-scale data lake using_ **_Apache Hudi_** _tables loaded using AWS Glue Spark jobs and other AWS server-less services including AWS Lambda, Amazon Kinesis Data Firehose, and Amazon DynamoDB”_

4.  [**ByteDance/TikTok**](https://hudi.apache.org/blog/2021/09/01/building-eb-level-data-lake-using-hudi-at-bytedance/)  

This ByteDance/TikTok scenario involves even larger datasets and shows Hudi being chosen after careful consideration of all three data lakehouse projects.

_“In our scenario, the performance challenges are huge. The maximum data volume of a single table reaches 400PB+, the daily volume increase is PB level, and the total data volume reaches EB level.”_

_“The throughput is relatively large. The throughput of a single table exceeds 100 GB/s, and the single table needs PB-level storage. The data schema is complex. The data is highly dimensional and sparse. The number of table columns ranges from 1,000 to 10,000+. And there are a lot of complex data types.”_

_“When making the decision on the engine, we examine three of the most popular data lake engines,_ **_Hudi, Iceberg, and DeltaLake_**_. These three have their own advantages and disadvantages in our scenarios. Finally, Hudi is selected as the storage engine based on Hudi's openness to the upstream and downstream ecosystems, support for the global index, and customized development interfaces for certain storage logic.”_

5.  [**Walmart**](https://www.youtube.com/watch?v=ZamXiT9aqs8)

![](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/68dc54c1df8942e2e01b8471_image15.png)

Walmart, with roughly 11,000 stores worldwide, selling more than $1M on average per store each week, deals with data at massive scale and criticality. 

From video transcription:

_“Okay so what is it that enables us for us and why do we really like the_ **_Hudi_** _features that have unlocked this in other use cases? We like the optimistic concurrency or MVCC controls that are available to us. We've done a lot of work around asynchronous compaction. We're in the process of looking at doing asynchronous compaction rather than inline compaction on our merge on read tables._ 

_We also want to reduce latency and so we leverage merge-on-read tables significantly because that enables us to append data much faster. We also love native support for deletion. It's something we had custom frameworks built for things like CCPA and GDPR where somebody would put in a service desk ticket and we'd have to build an automation flow to remove records from HDFS, this comes out of the box for us._ 

_Row versioning is really critical. Obviously a lot of our pipelines have out of order data and we need the latest records to show up and so we provide version keys as part of our framework for all upserts into the_ **_Hudi tables_**_._ 

_The fact that customers can pick and choose how many versions of a row to keep to be able to provide snapshot queries and get incremental updates like what's been updated in the last five hours is really powerful for a lot of users”_

6.  [**Robinhood**](https://robinhood.engineering/author-balaji-varadarajan-e3f496815ebf)

Investment site Robinhood makes extensive use of change data capture (CDC) with Kafka streaming to maximize data freshness within a data lakehouse.

_“Robinhood has a genuine need to keep data freshness low for the data lake. Many of the batch processing pipelines that used to run on daily cadence after or before market hours had to be run at hourly or higher frequency to support evolving use-cases. It was clear we needed a faster ingestion pipeline to replicate online databases to the data lake.”_

_“We are using_ **_Apache Hudi_** _to incrementally ingest changelogs from Kafka to create data lake tables. Apache Hudi is a unified data lake platform for performing both batch and stream processing over data lakes. Apache Hudi comes with a full-featured out-of-the-box Spark based ingestion system called DeltaStreamer, with first-class Kafka integration and exactly-once writes. Unlike immutable data, our CDC data have a fairly significant proportion of updates and deletes. Hudi Deltastreamer takes advantage of its pluggable, record-level indexes to perform fast and efficient upserts on the data lake tables.”_

7.  [**Zendesk**](https://aws.amazon.com/blogs/architecture/insights-for-ctos-part-3-growing-your-business-with-modern-data-capabilities/)

Cloud-based customer service provider Zendesk also uses CDC extensively with their Hudi lakehouse on Amazon.

_“The data lake pipelines consolidate the data from Zendesk’s highly distributed databases into a data lake for analysis._

_Zendesk uses Amazon Database Migration Service (AWS DMS) for change data capture (CDC) from over 1,800 Amazon Aurora MySQL databases in eight AWS Regions. It detects transaction changes and applies them to the data lake using Amazon EMR and_ **_Hudi_**_._

_Zendesk ticket data consists of over 10 billion events and petabytes of data. The data lake files in Amazon S3 are transformed and stored in_ **_Apache Hudi_** _format and registered on the AWS Glue catalog to be available as data lake tables for analytics querying and consumption via Amazon Athena.”_

8.  [**GE Aviation**](https://aws.amazon.com/blogs/big-data/how-ge-aviation-built-cloud-native-data-pipelines-at-enterprise-scale-using-the-aws-platform/)

GE Aviation also uses Apache Hudi to manage CDC pipelines, enabling rapid increases in scale.

_“The introduction of a more seamless_ **_Apache Hudi_** _experience within AWS has been a big win for our team. We’ve been busy incorporating Hudi into our CDC transaction pipeline and are thrilled with the results. We’re able to spend less time writing code managing the storage of our data, and more time focusing on the reliability of our system. This has been critical in our ability to scale. Our development pipeline has grown beyond 10,000 tables and more than 150 source systems as we approach another major production cutover.”_

# A Community that Innovates

Finally, given how quickly lakehouse technologies are evolving, it's important to consider where open source innovation in this space has come from. Below are a few foundational ideas and features that originated in Hudi and that are now being adopted into the other projects. 

  Data Pipeline Tools 

Hudi OSS Community Innovation

Equivalent Feature

Transactional updates [(March 2017)](https://www.uber.com/en-IN/blog/hoodie/)

Delta OSS [(April 2019)](https://www.databricks.com/blog/2019/04/24/open-sourcing-delta-lake.html)

Merge On Read [(Oct 2017)](https://github.com/apache/hudi/releases/tag/hoodie-0.4.0)

Iceberg [(Aug 2021, v2 format approval)](https://iceberg.apache.org/releases/#0120)

Incremental Queries [(March 2017)](https://www.uber.com/en-IN/blog/hoodie/)

Delta Change Feed OSS 2.x [(June 2022)](https://www.databricks.com/blog/2022/06/30/open-sourcing-all-of-delta-lake.html)

Z-order/Hilbert Space Curves [(Dec 2021)](https://hudi.apache.org/releases/release-0.10.0#release-highlights)

Delta OSS 2.x [(June 2022)](https://www.databricks.com/blog/2022/06/30/open-sourcing-all-of-delta-lake.html)

Multi-Modal Indexing [(2022)](https://www.onehouse.ai/blog/introducing-multi-modal-index-for-the-lakehouse-in-apache-hudi)

Not available in other projects

Record Level indexing [(2023)](https://hudi.apache.org/blog/2023/11/01/record-level-index/)

Not available in other projects

Secondary Indexing, Non blocking concurrency control, partial updates, LSM timeline and much more [(2024)](https://hudi.apache.org/blog/2024/12/16/announcing-hudi-1-0-0/)

Not available in other projects

In fact, outside of the table metadata (file listings, column stats) support, the Hudi community has pioneered most of the other critical features that make up today’s lakehouses. The community has supported over 9,500 users with 3,500 user issues and 7,000+ Slack support threads over the last 7 years, and is rapidly growing stronger with an ambitious [vision](https://hudi.apache.org/blog/2024/12/16/announcing-hudi-1-0-0/) ahead. Users can consider this track record of innovation as a leading indicator for the future.

# Conclusion

When choosing the technology for your Lakehouse it is important to perform an evaluation for your own personal use cases. Feature comparison spreadsheets and [benchmarks](https://www.onehouse.ai/blog/apache-hudi-vs-delta-lake-transparent-tpc-ds-lakehouse-performance-benchmarks) should not be the end-all deciding factor, so we hope that this blog post simply provides a starting point and reference for you in your decision making process. Apache Hudi is innovative, battle-hardened and here to stay. Join us on [Hudi Slack](https://join.slack.com/t/apache-hudi/shared_invite/zt-1e94d3xro-JvlNO1kSeIHJBTVfLPlI5w) where you can ask questions and collaborate with the vibrant community from around the globe. 

If you are undecided or perhaps your organization has a mix of multiple formats, you should take a look at [Apache XTable](https://xtable.apache.org/) which allows you to use multiple formats simultaneously.

If you would like one-to-one consultation to dive deep into your use cases and architecture, feel free to reach out at info@onehouse.ai. At Onehouse we support all 3 table formats and have decades of experience designing, building, and operating some of the largest distributed data systems in the world. We recognize that these technologies are complex and rapidly evolving. Also, it’s possible that we missed a feature or could have read the documentation more closely on some of the above comparisons. Please drop a note to info@onehouse.ai if you see that any of the comparisons above are in need of correction, so we can keep the facts in this article accurate.

# Update Notes

8/11/22 - Original publish date

1/11/23 - Refresh feature comparisons, added community stats + benchmarks

1/12/23 - Databricks contributed few minor corrections

10/31/23 - Minor edits

1/31/24 - Minor update about current state of OneTable

10/8/24 - Minor update about current state of XTable (was called OneTable); added the third paragraph to refer to a relevant new blog post

10/02/25 - Refreshed comparisons with latest releases

Authors

![Profile Picture of Kyle Weller, VP of Product](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/6670c2b64e2a06e8c1b58d9a_64d0be1d384954c43b4052fd_Kyle.svg)

Kyle Weller

VP of Product

Experience includes Azure Databricks, Azure ML, Cortana AI Agent, global scale data and experimentation platforms for Bing Search, and Office 365. Onehouse author and speaker.

## Read More:

[![Announcing OneSync™ Permissions: Unified Access Control Across All Your Data Catalogs](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/69b1c587ad9738c9c6a9c764_blog-onesync-thumb.jpg)](/blog/announcing-onesync-permissions)

[

### Announcing OneSync™ Permissions: Unified Access Control Across All Your Data Catalogs

](/blog/announcing-onesync-permissions)

Andy Walner, Kyle Weller, and Roushan Kumanr

March 13, 2026

[![Bringing Onehouse Cloud to Microsoft Azure](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/69af35d1250707ec10fe2cf0_blog-oh-on-azure-thumb.png)](/blog/bringing-onehouse-cloud-to-microsoft-azure)

[

### Bringing Onehouse Cloud to Microsoft Azure

](/blog/bringing-onehouse-cloud-to-microsoft-azure)

Manohar Kiran, Kyle Weller, and Nilesh Mahajan

March 10, 2026

[![Announcing Onehouse LakeBase™:  database speeds finally on the lakehouse](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/698f7e026152ebe50518ec8e_blog-lakecache-thumb.png)](/blog/announcing-onehouse-lakebase-database-speeds-finally-on-the-lakehouse)

[

### Announcing Onehouse LakeBase™: database speeds finally on the lakehouse

](/blog/announcing-onehouse-lakebase-database-speeds-finally-on-the-lakehouse)

Vinoth Chandar

February 17, 2026

[![Onehouse 2025 Year in Review](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/69683da213e990b45575e915_2025-year-in-review-thumb.png)](/blog/onehouse-2025-year-in-review)

[

### Onehouse 2025 Year in Review

](/blog/onehouse-2025-year-in-review)

Vinoth Chandar

January 15, 2026

[![Choosing Between a Database and a Data Lake](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/693c2cdd24713c22f02ae280_database-datalake-thumb-min.png)](/blog/choosing-between-a-database-and-a-data-lake)

[

### Choosing Between a Database and a Data Lake

](/blog/choosing-between-a-database-and-a-data-lake)

Ahilya Kulkarni and Shiyan Xu

January 8, 2026

[![Orchestrating Spark Pipelines on Onehouse with Apache Airflow](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1ee/6941700b6a1454a390e898ab_airflow-spark-thumb-min.png)](/blog/orchestrating-spark-pipelines-on-onehouse-with-apache-airflow)

[

### Orchestrating Spark Pipelines on Onehouse with Apache Airflow

](/blog/orchestrating-spark-pipelines-on-onehouse-with-apache-airflow)

Andy Walner and Sagar Lakshmipathy

December 17, 2025

[

load more

](?688c1e90_page=2)

## Subscribe to the Blog

Be the first to read new posts

We are hiring diverse, world-class talent — [join us in building the future](https://jobs.lever.co/Onehouse/)

[![onehouse logo](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b295_onehouse_logohorizontal_rgb_primarydark.svg)](/)[150 Mathilda Place, Suite 106 Sunnyvale, CA 94086](/contact-us)

[![twitter logo](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b340_twitter-logo-vector-png-clipart-1.webp)](https://twitter.com/Onehousehq)[![linkedin logo](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b33e_768px-LinkedIn_logo_initials.webp)](https://www.linkedin.com/company/onehousehq)[![slack logo](https://cdn.prod.website-files.com/6639144fcd459f75fde8b1df/6639144fcd459f75fde8b33d_slack.png)](https://join.slack.com/t/apache-hudi/shared_invite/zt-33fabmxb7-Q7QSUtNOHYCwUdYM8LbauA)

Product

[Onehouse Cloud](/product/onehouse-cloud)[Quanton K8s Operator](/product/quanton-operator)[OneFlow Data Ingestion](/product/oneflow)[LakeBase™](/product/lakebase)[SQL and Spark Jobs](/product/quanton)[Lakehouse Table Optimizer](/product/table-optimizer)[Open Engines](/product/open-engines)[OneSync](/product/onesync)[LakeView](/product/lakeview)[Cost Analyzer for Apache Spark™](/product/spark-analyzer)[Apache Hudi](/product/hudi)[Apache XTable](/product/unified-data-interoperability)[Security](/product/security)

Solutions

[Cut AWS EMR costs by 60%+](/solutions/optimize-aws-emr)[Lakehouse for Snowflake](/solutions/maximize-snowflake)[Better Data Engineering](/solutions/data-engineering)[Automated Vector Embeddings](/solutions/genai)[Managed Hudi](/solutions/managed-hudi)

Learn

[Docs](/request-docs-access)[Blog](/blog)[Resources](/resource-library)[Webinars](/resource-library)

About Onehouse

[Company](/about-us)[In the news](/in-the-news)[Careers](https://jobs.lever.co/Onehouse)[Contact us](/contact-us)

[We use cookies and analytics, including Google Analytics and HubSpot, to understand website traffic and improve the site. See our Privacy Notice and Cookie Notice.](/privacy-policy)

© 2