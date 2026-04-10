# State Of Workflow Orchestration Ecosystem 2025

Source: https://www.pracdata.io/p/state-of-workflow-orchestration-ecosystem-2025

   State of Workflow Orchestration Systems 2025                                                 

[

![Practical Data Engineering](https://substackcdn.com/image/fetch/$s_!SGaR!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F46497e14-ec41-42a0-9067-72715fc9c842_848x848.png)



](/)

# [Practical Data Engineering](/)

SubscribeSign in

# State of Open Source Workflow Orchestration Systems 2025

### Overview of Major 2024 Trends and Emerging Technologies Shaping 2025

[

![Alireza Sadeghi's avatar](https://substackcdn.com/image/fetch/$s_!3Z_Y!,w_36,h_36,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2f2c1bd7-7ad0-45b3-a325-7e369db6965b_576x576.jpeg)



](https://substack.com/@alirezasadeghi1)

[Alireza Sadeghi](https://substack.com/@alirezasadeghi1)

Feb 02, 2025

30

2

2

Share

[

![](https://substackcdn.com/image/fetch/$s_!uBXk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49d365c5-90aa-4c05-b1c5-2d6ab1f322f1_2004x1417.png)



](https://substackcdn.com/image/fetch/$s_!uBXk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F49d365c5-90aa-4c05-b1c5-2d6ab1f322f1_2004x1417.png)

This is the fifth part in the **Data Landscape Trends 2024-2025** series, focusing on the state of the open source workflow orchestration systems.

# Introduction

In the rapidly evolving landscape of data engineering, workflow orchestration engines play a key role in managing complex data processes.

This analysis explores the current state of workflow orchestration engines through multiple lenses such as community engagement, technical architecture, adoption metrics, and emerging innovations in 2024.

[

![](https://substackcdn.com/image/fetch/$s_!cJAS!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F032c67aa-cc5b-4a78-8746-e33cae83fbb9_2721x3156.png)



](https://substackcdn.com/image/fetch/$s_!cJAS!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F032c67aa-cc5b-4a78-8746-e33cae83fbb9_2721x3156.png)

We'll cover the following topics:

*   Current open source workflow orchestration landscape
    
*   Open Source vs Open Core engines
    
*   Task-centric vs Data-centric engines
    
*   GitHub repository trends in 2024
    
*   Summary and analysis of the current state of the products
    
*   Major 2024 workflow orchestration trends
    
*   Recommendations and conclusion
    

# Current OSS Landscape and Major Products

The workflow orchestration category stands out as one of the most dynamic segments of the open source data engineering ecosystem.

It features over 10 active projects that range from established products like **Apache Airflow** to newly open sourced engines like **Netflix's Maestro.**

The evolution of major open source workflow orchestration engines traces back to 2008, when **Yahoo** developed the first significant workflow engine **Oozie** to address the growing complexity of managing workloads on the Hadoop platform.

Since then, the industry has developed numerous orchestration systems to meet the growing demands of workload management and orchestration on data platforms.

Some projects, such as **Orchest**, have been come and gone, and are no longer maintained. Such retired projects are excluded from this analysis.

The timeline below illustrates the development progression of major open source workflow orchestration engines, highlighting both their initial open source releases and subsequent donations to the open source foundation where applicable.

[

![](https://substackcdn.com/image/fetch/$s_!q1Sz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3884b3a-ae6f-46a2-b0fa-1e97396b0a77_3437x2426.png)



](https://substackcdn.com/image/fetch/$s_!q1Sz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc3884b3a-ae6f-46a2-b0fa-1e97396b0a77_3437x2426.png)

I remember back in 2018 when we had to pick a workflow engine for a new large-scale data platform. Our options were pretty much just **Luigi**, **Azkaban**, and **Airflow**.

The choice was really simple back then - Airflow was a clear winner since it was Python-based and had great features. But nowadays it's so much harder to navigate this landscape and do a proper comparison of architectures and features between all the available tools in the market.

## Netflix's New Contribution

An exciting development in this ecosystem came when Netflix open sourced their next-generation orchestrator, **Maestro**, in July 2024.

Introduced via their **[tech blog](https://netflixtechblog.com/maestro-netflixs-workflow-orchestrator-ee13a06f9c78)**, Maestro is designed as a highly scalable and flexible scheduler capable of handling large-scale heterogeneous workflows like ML training and data pipelines.

What makes Maestro stand out is its flexible execution support for Docker images and notebooks, along with its ability to handle both cyclic and acyclic (DAG) workflow patterns.

Since its July release, Maestro has gained notable traction in the community. However, the repository has seen limited code activity since the initial release.

## Back-end Language

In terms of back-end languages, these tools have a fairly even distribution between **Java**, **Go**, and **Python**, with the exception of **Windmill**, which is built using the rising **Rust** language.

[

![](https://substackcdn.com/image/fetch/$s_!7LqY!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb7d97762-6f24-4da7-b6b2-8e6a07b34722_1333x1405.png)



](https://substackcdn.com/image/fetch/$s_!7LqY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb7d97762-6f24-4da7-b6b2-8e6a07b34722_1333x1405.png)

## Open Source vs Open Core Engines

It's important to note that not all these projects are truly open source. Some follow an "**[open core](https://opensource.com/article/21/11/open-core-vs-open-source)**" model instead, where the main SaaS provider only releases certain core components as open source while keeping premium features such as monitoring and security, proprietary.

When evaluating these tools for adoption, it's crucial to assess how portable and genuinely open source each project really is, as this can impact long-term sustainability and cost.

Many current open core tools like **Kestra** and **Dagster** keep essential enterprise features – especially security features like SSO – locked behind their enterprise versions. This is a deliberate strategy to monetise enterprise clients who need these capabilities.

[

![](https://substackcdn.com/image/fetch/$s_!f5Cq!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F000ed656-9798-4626-818f-a0b03ab89907_2525x2696.png)



](https://substackcdn.com/image/fetch/$s_!f5Cq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F000ed656-9798-4626-818f-a0b03ab89907_2525x2696.png)

This approach creates a significant problem for OSS adoptions: businesses that care about security and governance can't realistically use the open source versions of these products.

Open Core users frequently complain about this limitation, particularly the lack of basic authentication and authorisation mechanisms in the open core versions.

Currently, only projects like **Apache Airflow**, **Flyte** and **Apache DolphinScheduler** are guaranteed to remain fully open source, as they're not owned by any single commercial entity but rather governed by an open source Foundation.

## Task-Centric vs Data-Centric Engines

Workflow orchestration engines can be broadly classified by their fundamental approach to workflow management: task-centric versus data-centric, alongside other categories like declarative vs code-based and batch vs event-driven.

### Task-Centric Orchestrators

**Airflow**, **Luigi**, **Cadence**, and **Kestra** exemplify the task-centric approach, organising workflows as **Directed Acyclic Graphs (DAGs)** of interconnected tasks.

In these engines, the _**task**_ is the primary unit of work, capable of executing any type of operation. The scheduler's main concern is managing _**control flow**_ and dependencies between tasks within the DAG, remaining largely agnostic to the actual work being performed.

### Data-Centric Orchestrators

Engines like **Dagster**, **Temporal**, and **Flyte** take a more opinionated, data-centric approach. In these engines, data-oriented objects (or "_**assets**_" in Dagster's terminology) serves as the primary focus of the workflow.

They treat workflows as data-aware pipelines where assets - whether tables, files, ML models, or dbt models - are produced, consumed, and transformed.

Data-centric engines provide native support for passing data between tasks and offer superior integration with modern data transformation frameworks like **dbt** and **SQLMesh**, compared to task-centric engines.

* * *

# GitHub Repository Trends

Open source projects are typically evaluated through key metrics including GitHub stars, download counts, contributor activity, and repository engagement (measured by commits, releases, and issue resolution rates).

As part of my commitment to understanding the open source ecosystem, I've developed my own [small analytical platform](https://practicaldataengineering.substack.com/p/building-data-pipeline-using-duckdb) that tracks and analyses all GitHub events for public repositories. The following metrics and trends for 2024 are derived from this platform.

## Project Popularity

Looking at GitHub repository star trends in 2024, **Kestra** has emerged as a rising workflow orchestration project. The graph below shows a spike in September, when Kestra surpassed all other projects in new stars gained in 2024.

This surge is directly linked to Kestra's $8M funding announcement, which was featured in [TechCrunch](https://techcrunch.com/2024/09/23/kestra-raises-another-8-million-for-its-open-source-orchestration-platform/). It's a clear example of how repository stars can spike in response to major company announcements.

[

![](https://substackcdn.com/image/fetch/$s_!PvwL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdaf1f85f-820e-4490-aef3-44c6c179481e_2400x1125.png)



](https://substackcdn.com/image/fetch/$s_!PvwL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdaf1f85f-820e-4490-aef3-44c6c179481e_2400x1125.png)

The well-established **Apache Airflow** and **Prefect** ranked the second and third most-starred workflow projects in 2024 respectively.

[

![](https://substackcdn.com/image/fetch/$s_!HQIQ!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf516462-124a-4b00-9f8d-b1be28c871cb_2079x1294.png)



](https://substackcdn.com/image/fetch/$s_!HQIQ!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf516462-124a-4b00-9f8d-b1be28c871cb_2079x1294.png)

## Code Activity

Code activity in open source projects can be measured by two main metrics: pull requests (opened, closed, and reviewed) and commit volume (push events).

For 2024, **Dagster** and **Airflow** led the pack in pull request activity, each processing over 10K PRs from their contributors, with Prefect following close behind.

On the other end of the spectrum, projects like **Cadence**, **Luigi**, **Maestro**, and **Azkaban** showed concerning levels of inactivity, raising questions about their long-term health.

[

![](https://substackcdn.com/image/fetch/$s_!58Sb!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b915c76-83dd-4260-87bc-4faa0a4b5fa1_2143x2737.png)



](https://substackcdn.com/image/fetch/$s_!58Sb!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b915c76-83dd-4260-87bc-4faa0a4b5fa1_2143x2737.png)

Looking at commit volume, **Dagster** demonstrated remarkable development activity with an impressive 27K commits in 2024. **Prefect** and **Windmill** also showed strong development momentum, each recording over 10K commits.

[

![](https://substackcdn.com/image/fetch/$s_!oXS1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faced497b-a685-49c4-b5ef-845ae7e3ff66_2235x1277.png)



](https://substackcdn.com/image/fetch/$s_!oXS1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Faced497b-a685-49c4-b5ef-845ae7e3ff66_2235x1277.png)

### Project Collaboration

The health and sustainability of an open source project largely depends on its contributor base – the wider and more diverse, the better.

When evaluating contributor metrics, it's crucial to distinguish between _**active contributors**_ who consistently work throughout the year and one-off contributors who make occasional submissions. Active contributors provide a more meaningful measure of project health.

Looking at active contributors in 2024, **Airflow** and **Dagster** lead the ecosystem with over 20 active contributors each. Any major open source project with few (ex < 5) active contributors raises sustainability concerns. By this metric, projects like Argo Workflows, Mage-ai, DolphinScheduler, and Flyte fall into a warning zone.

At the concerning end of the spectrum, projects like **Luigi** and **Azkaban** showed no active contributions throughout the year.

[

![](https://substackcdn.com/image/fetch/$s_!WCRE!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2dc87044-d810-496d-af0b-f8d042a8de6d_1566x1905.png)



](https://substackcdn.com/image/fetch/$s_!WCRE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2dc87044-d810-496d-af0b-f8d042a8de6d_1566x1905.png)

## Community Engagement

Community engagement can be measured through several indicators: _**issues**_ logged, _**comment**_ volume, and participation in official community channels like **Slack** and discussion boards. These metrics help determine how vibrant and active a tool's community really is.

Another key metric is the ratio of closed to opened issues, which indicates how quickly project maintainers address community-reported problems.

Looking at GitHub activity in terms of total issues opened and closed, **Airflow**, **Kestra**, **Prefect**, and **DolphinScheduler** show the strongest community engagement.

Based on total issues registered, We can consider fewer than 100 issues or less than 50% issue resolution a concern, and fewer than 50 issues a danger zone. Again, projects like **Luigi**, **Azkaban**, and **Cadence** fall into this danger zone, suggesting minimal community interaction.

[

![](https://substackcdn.com/image/fetch/$s_!dBF5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F569d5336-03ce-43f9-8516-4414774e3a53_2337x1390.png)



](https://substackcdn.com/image/fetch/$s_!dBF5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F569d5336-03ce-43f9-8516-4414774e3a53_2337x1390.png)

## Downloads & Installations

Most open source orchestration tools are either Python-based or provide Python client and SDKs, making PyPI download statistics a useful metric for measuring adoption and popularity.

Looking at the download stats from _[clickpy.clickhouse.com](http://clickpy.clickhouse.com)_, **Apache Airflow** dominates the ecosystem with a staggering **320M downloads** in 2024 alone - ten times more than its nearest competitor. This reinforces Airflow's position as the leading tool in the entire data engineering ecosystem.

**Prefect** and **Dagster** round out the top three most downloaded packages in 2024, with 32M and 15M downloads respectively.

An interesting observation: despite being an inactive project, **Luigi** recorded 5.6M downloads in 2024. This likely reflects existing users updating to minor releases, suggesting a significant legacy user base still relies on the platform.

[

![](https://substackcdn.com/image/fetch/$s_!tH1y!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27208d7f-5905-4ba7-93e8-e250c080280f_1316x913.png)



](https://substackcdn.com/image/fetch/$s_!tH1y!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27208d7f-5905-4ba7-93e8-e250c080280f_1316x913.png)

## Summary & Analysis

Here is the summary of the evaluation of the workflow orchestration engines across key GitHub metrics:

[

![](https://substackcdn.com/image/fetch/$s_!dXPl!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feef68785-9014-4a25-b9a6-7cd734ce083f_2256x2943.png)



](https://substackcdn.com/image/fetch/$s_!dXPl!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Feef68785-9014-4a25-b9a6-7cd734ce083f_2256x2943.png)

### Advancing Projects

After a decade, **Airflow** remains the dominant force in open source orchestration, maintaining the most active and vibrant open source project in the market.

**Dagster** is likely the second most popular orchestrator in 2024. Along with **Prefect** and **Temporal**, it's capturing significant market attention, particularly among startups and smaller-scale deployments.

These tools stand out for their simplified approach to data-centric workflow management, more intuitive UIs, and enhanced support for event-driven workflows.

### Rising Projects

**Kestra** has become one of the fastest-growing orchestration tools in 2024, gaining momentum after securing $8M in funding. The project has also been praised for its simplicity, declarative YAML-based workflow definitions, and support for event-driven workflows.

### Declining Projects

Legacy tools **Luigi** and **Azkaban** rank at the bottom across all metrics. While neither project has been officially archived or retired, their lack of meaningful development activity in 2024 effectively marks them as inactive.

Luigi saw only minor bug fixes throughout the year, while Azkaban showed no code activity whatsoever. This dramatic decline in maintenance suggests these once-popular orchestrators have reached the end of their active lifecycle.

The future of **Netflix's Maestro** remains uncertain. 2025 will be a pivotal year, revealing whether the project gains momentum on GitHub or follows the path of some other abandoned in-house tools released by tech giants.

## 2024 OSS Orchestration Competition

Let's turn this into a competition and rank our open source workflow engines!

We'll identify the top three performers across key metrics in 2024, creating a sort of "_**workflow orchestrator competition**_."

[

![](https://substackcdn.com/image/fetch/$s_!P7Lz!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F06ed904a-3982-4045-930c-31c8cf9b66b0_2317x2208.png)



](https://substackcdn.com/image/fetch/$s_!P7Lz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F06ed904a-3982-4045-930c-31c8cf9b66b0_2317x2208.png)

Based on our OSS metrics and medal counts, **Apache Airflow** claims the crown as 2024's champion workflow orchestrator, with **Dagster** taking second and **Prefect** earning third place.

[

![](https://substackcdn.com/image/fetch/$s_!TcEs!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7db5c851-c9dc-4575-8b0f-bd933b85d7b0_1631x956.png)



](https://substackcdn.com/image/fetch/$s_!TcEs!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7db5c851-c9dc-4575-8b0f-bd933b85d7b0_1631x956.png)

**Important note:** _This comparison focuses solely on open source activity metrics and community engagement. It should not be interpreted as a judgment of each tool's features, capabilities, or overall ecosystem. The best workflow orchestrator for your needs will depend on your specific requirements, use cases, and technical environment._

* * *

Thanks for reading Practical Data Engineering! Subscribe for free to receive new posts and support my work.

Subscribe

# Major 2024 Trends

Let’s explore the key development trends in the workflow orchestration ecosystem for 2024.

## Event-Driven & Real-Time Orchestration

The workflow orchestration ecosystem is shifting toward event-triggered and real-time processing capabilities, reflecting industry's growing demand for real-time workload management.

In 2024, several major products made significant moves in this direction. **Kestra** introduced Real-time and HTTP Triggers, enabling millisecond-latency responses to events from systems like **Kafka** and AWS SQS, and over HTTP requests.

**Temporal** enhanced its real-time capabilities with _Workflow Update_ and _Workflow Update-With-Start_ features, enabling synchronous processing for interactive applications. Meanwhile, **DolphinScheduler** expanded its event-driven architecture with a variety of new triggers.

**Mage** focused on real-time data processing, introducing _Streaming Pipelines_ that support real-time ingestion and transformation from sources like Kafka and Google Pub/Sub.

Even **Apache Airflow**, traditionally a batch-oriented system, has recognised this shift toward real-time processing. Its 2024 updates introduced addition of new conditions for its data-aware scheduling, and new scheduling mechanism which supports scheduling DAGs based on both dataset events and time.

## AI/LLM Integration & Automation

The integration of AI and LLM capabilities emerged as another major trend in workflow orchestration during 2024, reflecting the growing role of LLM-based workloads in enterprise data operations.

**Prefect** made a significant move in this space by launching _ControlFlow_, a framework specifically designed for AI-driven workflows and LLM integration. **Prefect** also integrated _**Marvin**_, an LLM-powered assistant, to simplify the creation of AI workflows.

**Temporal** embraced _multi-agent workflows_, enabling sophisticated coordination between AI models, software applications, and human participants.

Meanwhile, **Windmill** took a different approach by integrating AI directly into the development experience, introducing an AI copilot to assist in flow building.

## Enhanced Resource Management & Execution

Intelligent resource management has become a critical focus for workflow engines, particularly as organisations increasingly run workflows on cloud-managed and serverless platforms. Several cloud-native engines made significant advances in this area during 2024.

**Temporal** introduced sophisticated resource management with its worker _**auto-tuning**_ feature, which automatically adjusts worker slots based on real-time CPU and memory usage.

**Kestra** has introduced _task runners_ that can dynamically offload resource-intensive tasks to on-demand compute services like Azure Batch, Google Batch, and Google Cloud Run.

**Dagster Pipes** became stable in version 1.8 released in 2024, with enhanced integrations for Lambda, Kubernetes, and Databricks looking ahead.

**DolphinScheduler** plans to integrate **KEDA** (Kubernetes Event-Driven Autoscaling), which will enable automatic worker scaling based on workload demands, further enhancing its Kubernetes-native capabilities.

**Prefect** and **Flyte** expanded their back-end execution capabilities in 2024 by enhancing support for distributed computing frameworks, integrating with scalable Python execution frameworks such as **Ray** and **Dask**, enabling more efficient parallel processing and distributed task execution.

* * *

# Conclusion & Recommendations

After a decade, **Apache Airflow** remains the most mature and widely adopted orchestration tool in the data engineering ecosystem. Its position as the market leader is reinforced by major cloud vendors - Google **Cloud Composer** and Amazon **MWAA** have both standardised on Airflow for their managed workflow services.

While Airflow faces criticism for its steep learning curve, operational overhead, and not-so friendly UX with outdated UI (though a complete revamp is planned for the upcoming version 3.0), its primary technical limitation is its focus on batch-oriented workflows, with less native support for modern dynamic workflow patterns.

For **large-scale deployments** managing large number of heterogeneous workflows that require a general-purpose engine with extensive operations support and a large ecosystem, Apache Airflow remains the top choice. At the Airflow Summit 2024, major companies showcased Airflow's massive scalability, with **[Uber](https://www.astronomer.io/blog/airflow-in-action-uber/)** orchestrating 450K pipeline runs daily across 1000 teams, **Stripe** managing 150K tasks, and **LinkedIn** operating over 10K parallel DAGs.

For **startups**, and **small to mid-sized businesses** consider newer orchestration tools that offer streamlined setup and development experience through features like in-browser development environments, declarative workflow authoring, and low-code capabilities.

For **dynamic** and **data-centric** workflow orchestration, products like **Prefect** and **Dagster** excel at data-aware orchestration compared to traditional task-based schedulers.

[

![](https://substackcdn.com/image/fetch/$s_!DS7n!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ba33f19-c1ae-44c2-8991-607c54b5229a_558x554.png)



](https://substackcdn.com/image/fetch/$s_!DS7n!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ba33f19-c1ae-44c2-8991-607c54b5229a_558x554.png)

[Follow Me on LinkedIn](https://www.linkedin.com/in/alirezasadeghi/)

30

2

2

Share

#### Discussion about this post

CommentsRestacks

![User's avatar](https://substackcdn.com/image/fetch/$s_!TnFC!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack.com%2Fimg%2Favatars%2Fdefault-light.png)

[

![alex_bap's avatar](https://substackcdn.com/image/fetch/$s_!4YUl!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2e0666eb-cdb6-4d73-8902-dda82e415e4e_144x144.png)



](https://substack.com/profile/314970964-alex_bap?utm_source=comment)

[alex\_bap](https://substack.com/profile/314970964-alex_bap?utm_source=substack-feed-item)

[Mar 16, 2025](https://www.pracdata.io/p/state-of-workflow-orchestration-ecosystem-2025/comment/100872573 "Mar 16, 2025, 5:55 AM")

Great article for this area!

Reply

Share

[

![Hugo Lu's avatar](https://substackcdn.com/image/fetch/$s_!C9X1!,w_32,h_32,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9a0e52b8-918c-47b9-b707-f2d5bdbb88d5_1824x1824.png)



](https://substack.com/profile/141346851-hugo-lu?utm_source=comment)

[Hugo Lu](https://substack.com/profile/141346851-hugo-lu?utm_source=substack-feed-item)

[Feb 24, 2025](https://www.pracdata.io/p/state-of-workflow-orchestration-ecosystem-2025/comment/95781069 "Feb 24, 2025, 9:29 AM")

Great and well-written article. Please include Orchestra next time.

Reply

Share

TopLatestDiscussions

No posts

### Ready for more?

Subscribe

© 2026 Alireza Sadeghi · [Privacy](https://substack.com/privacy) ∙ [Terms](https://substack.com/tos) ∙ [Collection notice](https://substack.com/ccpa#personal-data-collected)

[Start your Substack](https://substack.com/signup?utm_source=substack&utm_medium=web&utm_content=footer)[Get the app](https://substack.com/app/app-store-redirect?utm_campaign=app-marketing&utm_content=web-footer-button)

[Substack](https://substack.com) is the home for