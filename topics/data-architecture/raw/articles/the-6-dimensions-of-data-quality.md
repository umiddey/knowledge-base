# the-6-dimensions-of-data-quality

Source: https://www.collibra.com/blog/the-6-dimensions-of-data-quality

The 6 Data Quality Dimensions with Examples | Collibra | Collibra                    [Skip to content](#main) 

Product

[See all blog posts](/blog)[Data Quality](/blog/all#filter1=blog/data-quality)August 29, 2022 (Updated October 18, 2023) • 11 min read

# The 6 data quality dimensions with examples

 

## Share on:

*   [![LinkedIn](https://images.collibracloud.com/images/0y2g3iho/production/38491707ea4ec71d9577a479db1b2ff2db5da5c7-32x32.svg)](https://www.linkedin.com/shareArticle?title=The%206%20data%20quality%20dimensions%20with%20examples&url=https://www.collibra.com/blog/the-6-dimensions-of-data-quality)
*   [![X (Twitter)](https://images.collibracloud.com/images/0y2g3iho/production/7dbb4fbef32def5730889a5798df40b0351a70b7-32x32.svg)](https://twitter.com/intent/tweet?text=The%206%20data%20quality%20dimensions%20with%20examples&url=https://www.collibra.com/blog/the-6-dimensions-of-data-quality&via=)
*   [![E-mail](https://images.collibracloud.com/images/0y2g3iho/production/48a363428c2952799d8e2c4d3492c8131fd1c5db-32x32.svg)](/cdn-cgi/l/email-protection#211e5254434b4442551c75494404131117041311454055400413115054404d48555804131145484c444f52484e4f52041311564855490413114459404c514d4452070212191a434e45581c49555551521b0e0e5656560f424e4d4d484353400f424e4c0e434d4e460e5549440c170c45484c444f52484e4f520c4e470c454055400c5054404d485558)

  ![](https://images.collibracloud.com/images/0y2g3iho/production/de0f7bcba5046ce80ad986d627a0d4de10b2c9d1-1600x970.jpg?w=1440&q=75&auto=format)

Measuring [data quality](https://www.collibra.com/blog/what-is-data-quality) is critical to understand if you want to use enterprise data confidently in operational and analytical applications. Only good quality data can power accurate analysis, which in turn can drive trusted business decisions.

According to one [Gartner estimate](https://www.gartner.com/smarterwithgartner/how-to-stop-data-quality-undermining-your-business/), poor [data quality](https://www.collibra.com/products/data-quality) can result in additional spend of $15M in average annual costs. Although it is not just about financial loss. Poor quality of data affects your organization at multiple levels:

*   Higher processing cost: The [rule of ten](https://hbr.org/2017/09/only-3-of-companies-data-meets-basic-quality-standards) states that it costs ten times as much to complete a unit of work when the data is flawed than when the data is perfect
*   Unreliable analysis: With lower confidence in reporting and analysis, bottomline management is never easy
*   Poor governance and compliance risk: Compliances are no longer optional, and business survival gets challenging without them
*   Loss of brand value: When organizations constantly make erroneous operations and decisions, the brand value decreases quickly

Poor quality data impacts an organization’s business strategy of fueling growth and driving innovation. The immediate concern is how an organization can measure data quality and find ways to improve it.

## How is data quality measured?

Data quality may be easy to recognize but difficult to determine. For example, the entry of Mr. John Doe twice in a database opens several possibilities. Maybe there are two people with the same name. Or, the same person’s name is entered again mistakenly. It can also be the case of the database not being validated after migration or integration. Optimum data quality management eliminates such ambiguities and ensures that each entity is represented correctly and uniquely. In another example, the entry of Mr. John Doe, Waterloo, is incomplete without the country’s name. If the dataset shows the height of Mr. John Doe as 6 Meters, it can be an error in the measuring unit.

These data quality examples demonstrate how you cannot rely on just one metric to measure data quality. You can consider multiple attributes of data to get the correct context and measurement approach to data quality. For example, patient data in healthcare must be complete, accurate, and available when required. For a marketing campaign, customer data needs to be unique, accurate, and consistent across all the engagement channels. Data quality dimensions capture the attributes that are specific to your context.

## What is a data quality dimension?

Data quality dimensions are measurement attributes of data, which you can individually assess, interpret, and improve. The aggregated scores of multiple dimensions represent data quality in your specific context and indicate the fitness of data for use.

[On average](https://hbr.org/2017/09/only-3-of-companies-data-meets-basic-quality-standards), 47% of recently created data records have at least one critical, work-impacting, error. High-quality data is the exception, with only 3% of the DQ scores rated acceptable (with >97% acceptability score). So, only 3% of companies’ data meets basic quality standards.

Scores of data quality dimensions are typically expressed in percentages, which set the reference for the intended use. For example, when you use 87% accurate patient data to process billing, 13% of the data cannot guarantee you correct billing. In another example, a 52% complete customer data set implies lower confidence in the planned campaign reaching the right target segment. You can define the acceptable levels of scores for building more trust in data.

Data quality dimensions serve as a guide for selecting the most suitable dataset. When presented with two datasets of 79% accuracy and 92% accuracy, analysts can choose the dataset with higher accuracy to ensure that their analysis has a more trusted foundation.

## What are the 6 dimensions of data quality?

You can measure data quality on multiple dimensions with equal or varying weights, and typically the following six key data quality dimensions are used.

### 1\. Completeness

This dimension can cover a variety of attributes depending on the entity. For customer data, it shows the minimum information essential for a productive engagement. For example, if the customer address includes an optional landmark attribute, data can be considered complete even when the landmark information is missing.

For products or services, data completeness can suggest vital attributes that help customers compare and choose. If a product description does not include any delivery estimate, it is not complete. Financial products often include historical performance details for customers to assess alignment with their requirements. Completeness measures if the data is sufficient to deliver meaningful inferences and decisions.

### 2\. Accuracy

Data accuracy is the level to which data represents the real-world scenario and confirms with a verifiable source. Accuracy of data ensures that the associated real-world entities can participate as planned. An accurate phone number of an employee guarantees that the employee is always reachable. Inaccurate birth details, on the other hand, can deprive the employee of certain benefits.

Measuring data accuracy requires verification with authentic references such as birth records or with the actual entity. In some cases, testing can assure the accuracy of data. For example, you can verify customer bank details against a certificate from the bank, or by processing a transaction. Accuracy of data is highly impacted on how data is preserved through its entire journey, and successful [data governance](https://www.collibra.com/data-governance) can promote this data quality dimension.

High data accuracy can power factually correct reporting and trusted business outcomes. Accuracy is very critical for highly regulated industries such as healthcare and finance.

### 3\. Consistency

This data quality dimension represents if the same information stored and used at multiple instances matches. It is expressed as the percent of matched values across various records. Data consistency ensures that analytics correctly capture and leverage the value of data.

Consistency is difficult to assess and requires planned testing across multiple data sets. If one enterprise system uses a customer phone number with international code separately, and another system uses prefixed international code, these formatting inconsistencies can be resolved quickly. However, if the underlying information itself is inconsistent, resolving may require verification with another source. For example, if a patient record puts the date of birth as May 1st, and another record shows it as June 1st, you may first need to assess the accuracy of data from both sources. Data consistency is often associated with data accuracy, and any data set scoring high on both will be a high-quality data set.

### 4\. Validity

This dimension signifies that the value attributes are available for aligning with the specific domain or requirement. For example, ZIP codes are valid if they contain the correct characters for the region. In a calendar, months are valid if they match the standard global names. Using business rules is a systematic approach to assess the data validity.

Any invalid data will affect the completeness of data. You can define rules to ignore or resolve the invalid data for ensuring completeness.

### 5\. Uniqueness

This data quality dimension indicates if it is a single recorded instance in the data set used. Uniqueness is the most critical dimension for ensuring no duplication or overlaps. Data uniqueness is measured against all records within a data set or across data sets. A high uniqueness score assures minimized duplicates or overlaps, building trust in data and analysis.

Identifying overlaps can help in maintaining uniqueness, while data cleansing and deduplication can remediate the duplicated records. For example, unique customer profiles go a long way in offensive and defensive strategies for customer engagement. Data uniqueness also improves data governance and speeds up compliance.

### 6\. Integrity

Data journey and transformation across systems can affect its attribute relationships. Integrity indicates that the attributes are maintained correctly, even as data gets stored and used in diverse systems. Data integrity ensures that all enterprise data can be traced and connected.

Data integrity affects relationships. For example, a customer profile includes the customer name and one or more customer addresses. In case one customer address loses its integrity at some stage in the data journey, the related customer profile can become incomplete and invalid.

While you regularly come across these six data quality dimensions and [how they serve your company’s needs](https://www.collibra.com/blog/data-quality-dimensions-how-do-they-serve-your-companys-needs), many more dimensions are available to represent distinctive attributes of data. Based on the context, you can also consider data conformity to standards (do data values comply with the specified formats?) for determining data quality. Data quality is multi-dimensional and closely linked with [data intelligence](https://www.collibra.com/collibra-data-intelligence-cloud), representing how your organization understands and uses data.

Measuring these dimensions helps you identify the opportunities to improve your data quality framework. You can use rules to determine if your data is fit for use and where it needs improvement. Rules ensure that data represents the real-world entity accurately, completely, and consistently. The automated rules allow you to monitor data quality closely, help identify data errors quickly and provide a constant update on the state of data health.

With auto-discovered, adaptive rules and a continuous ML-based approach, [Collibra Data Quality & Observability](https://www.collibra.com/products/data-quality) brings you trusted data to drive real-time, consistent, innovative business decisions. While most [data quality tools](https://www.collibra.com/products/data-quality-and-observability) provide only technical rules, Collibra empowers you to also define business rules for addressing domain-specific requirements.

  ![](https://images.collibracloud.com/images/0y2g3iho/production/22a8a7f6f8e4598db161c7fb52b6e6b7aa58f7e1-768x432.jpg?w=768&q=75&auto=format)

## How do you ensure quality and integrity of data?

In a recent publication, Forbes notes that [84% of CEOs are concerned about the integrity of the data](https://www.forbes.com/sites/forbestechcouncil/2020/06/03/why-making-data-integrity-is-a-business-imperative/?sh=6cc66b5a656d) on which they’re basing their decisions. This statement is significant from the perspective of how much value is associated with data integrity.

The role of data integrity vs. data quality is often confusing. Data quality focuses on accuracy, completeness, and other attributes to make sure that data is reliable. Data integrity, on the other hand, makes this reliable data useful. It adds relationships and context to enrich data for improving its effectiveness.

The difference between data integrity and data quality is in the level of value they offer. Data quality works as the foundation for trusted business decisions, while data integrity takes it one notch higher to deliver better business decisions.

Determining data quality is an ongoing task that requires enterprise-wide standards and ML-enabled tools for scalable, real-time assessment. Data quality standards have documented agreements on the representation, format, and definition of common data, along with the objectives and scope of implementing data quality. The standards are essential for a shared understanding and a mature approach to delivering data quality. Well-defined data quality standards also enable rapid compliance with evolving data regulations.

Data quality checks determine metrics that address both quality and integrity.

The common data quality checks include:

*   Identifying duplicate data or overlaps for uniqueness.
*   Checking for mandatory fields, null values, and missing values to identify and fix data completeness.
*   Applying formatting checks for consistency.
*   Using business rules with a range of values or default values and validity.
*   Checking how recent the data is or when it was last updated identifies the recency or freshness of data.
*   Validating row, column, conformity, and value checks for integrity.

## Beyond accuracy: What data quality means to data consumers

Data quality from the perspective of data producers and managers focuses mostly on accuracy. Matching data as closely as possible to the real-world entity is their goal. Their data cleaning, fixing, and management efforts are directed towards improving data accuracy.

From [data consumers’ perspective](https://www.gartner.com/en/documents/3989182/data-quality-fundamentals-for-data-and-analytics-technic), we should add three more dimensions to data quality. When data consumers shop for quality data, their challenges are more oriented to the supply-chain of data. Their first requirement is data **accessibility**. They want to know where data resides and how to retrieve it.

Their next concern is **timeliness**. The value of data is in using it. Accessible data has no value if it is not available for timely use. Timeliness defines if the data is available when required. Trusted data available in real-time or near real-time can reduce errors and streamline operational processes. Timely data availability can drive successful business innovation and maintain a competitive edge.

Data consumers want to access data when they want, and they want the most recent data to power their projects.

  ![](https://images.collibracloud.com/images/0y2g3iho/production/2a9938c8d1720085cbef2ac0b8e84baf8036e27c-768x432.jpg?w=768&q=75&auto=format)

_Source: Gartner (Aug 2020) – Data Quality Fundamentals for Data & Analytics Technical Professionals_

Once data consumers are satisfied with data accessibility and timeliness, their focus shifts to **relevance**. They want to shop for data that correctly aligns with their requirements. They do not want to waste their efforts on data that is not immediately relevant to their planned projects. Only then comes data accuracy, which ensures that the selected data will correctly deliver the results.

Going beyond accuracy, data producers and consumers jointly need to evolve a strategy that rethinks data quality. Data consumers must define what’s most important and creators must focus on delivering that most important data. They need to assess the factors impacting effective data shopping, and ask the following questions:

*   Is the data well understood?
*   Is it driven by [data intelligence](https://www.collibra.com/collibra-data-intelligence-cloud)?
*   Does the data have sufficient [metadata](https://www.collibra.com/blog/what-is-metadata-management) to understand how they can use data to power their specific analysis?
*   Can they access [data lineage](https://www.collibra.com/products/collibra-platform) as the data moves between sources and goes through aggregations, manipulations and transformations?

Only then the data quality can be monitored successfully and improved continuously.  

*   ![Collibra](https://images.collibracloud.com/images/0y2g3iho/production/27ae799d3636b9581e03c15b29191568d3bf9b91-300x300.png?w=256&h=256&q=70&auto=format)
    
    **Collibra**
    
    ### Collibra
    
    Unified governance for data and AI
    

## Want to learn more about Collibra Data Quality?

[Schedule a data assessment](/contact-us)

Related resources

1.  Collibra blog
    
    [What is data quality and why is it important?](/blog/what-is-data-quality)
2.  Collibra blog
    
    [Data quality dimensions: How do they serve your company’s needs?](/blog/data-quality-dimensions-how-do-they-serve-your-companys-needs)

## In this post:

1.  [How is data quality measured?](#toc-how-is-data-quality-measured)
2.  [What is a data quality dimension?](#toc-what-is-a-data-quality-dimension)
3.  [What are the 6 dimensions of data quality?](#toc-what-are-the-6-dimensions-of-data-quality)
4.  [How do you ensure quality and integrity of data?](#toc-how-do-you-ensure-quality-and-integrity-of-data)
5.  [Beyond accuracy: What data quality means to data consumers](#toc-beyond-accuracy-what-data-quality-means-to-data-consumers)

## Share on:

*   [![LinkedIn](https://images.collibracloud.com/images/0y2g3iho/production/38491707ea4ec71d9577a479db1b2ff2db5da5c7-32x32.svg)](https://www.linkedin.com/shareArticle?title=The%206%20data%20quality%20dimensions%20with%20examples&url=https://www.collibra.com/blog/the-6-dimensions-of-data-quality)
*   [![X (Twitter)](https://images.collibracloud.com/images/0y2g3iho/production/7dbb4fbef32def5730889a5798df40b0351a70b7-32x32.svg)](https://twitter.com/intent/tweet?text=The%206%20data%20quality%20dimensions%20with%20examples&url=https://www.collibra.com/blog/the-6-dimensions-of-data-quality&via=)
*   [![E-mail](https://images.collibracloud.com/images/0y2g3iho/production/48a363428c2952799d8e2c4d3492c8131fd1c5db-32x32.svg)](/cdn-cgi/l/email-protection#506f2325323a3533246d04383575626066756260343124317562602125313c39242975626034393d353e23393f3e23756260273924387562603528313d203c3523767363686b323f34296d38242420236a7f7f2727277e333f3c3c393222317e333f3d7f323c3f377f2438357d667d34393d353e23393f3e237d3f367d343124317d2125313c392429)

Related resources

1.  Collibra blog
    
    [What is data quality and why is it important?](/blog/what-is-data-quality)
2.  Collibra blog
    
    [Data quality dimensions: How do they serve your company’s needs?](/blog/data-quality-dimensions-how-do-they-serve-your-companys-needs)

## Related articles

*   [![What is data observability and why is it important? cover image](https://images.collibracloud.com/images/0y2g3iho/production/81910389d5b97c9445cbd5e3f3970e2260f6947c-1600x970.png?w=900&q=70&fit=crop&auto=format)
    
    Data QualitySeptember 12, 2024
    
    ### What is data observability and why is it important?
    
    
    
    ](/blog/defining-data-observability)
*   [![How to observe data quality for better, more reliable AI cover image](https://images.collibracloud.com/images/0y2g3iho/production/ee7f43ef9f9ed4097dc56d949d50268ef4d7d3d0-6667x4042.png?w=900&q=70&fit=crop&auto=format)
    
    AIJuly 15, 2024
    
    ### How to observe data quality for better, more reliable AI
    
    
    
    ](/blog/how-to-observe-data-quality-for-better-more-reliable-ai)
*   [![Announcing Data Quality & Observability with Pushdown for SAP HANA, HANA Cloud and Datasphere cover image](https://images.collibracloud.com/images/0y2g3iho/production/b27e66b903849239d68b94131b781ded08417564-6667x4042.png?w=900&q=70&fit=crop&auto=format)
    
    Data QualityNovember 8, 2024
    
    ### Announcing Data Quality & Observability with Pushdown for SAP HANA, HANA Cloud and Datasphere
    
    
    
    ](/blog/announcing-data-quality-observability-with-pushdown-for-sap-hana-hana-cloud-and-datasphere)
*   [![The data quality rule of 1%: how to size for success cover image](https://images.collibracloud.com/images/0y2g3iho/production/a3256f6420fbe6eb8c1600a450c29204d4946c93-1600x970.jpg?w=900&q=70&fit=crop&auto=format)
    
    Data QualityNovember 16, 2023
    
    ### The data quality rule of 1%: how to size for success
    
    
    
    ](/blog/the-data-quality-rule-of-1-how-to-size-for-success)

## Keep up with the latest from Collibra

**I would like to get updates about the latest Collibra content, events and more.**

Business e-mail address 

There has been an error, please try again

Please enter a valid business e-mail address

By submitting this form, I acknowledge that I may be contacted directly about my interest in Collibra's products and services. Please read Collibra's [Privacy Policy](https://www.collibra.com/legal/documents/collibra-privacy-policy).

Submit

**Thanks for signing up**

You'll begin receiving educational materials and invitations to networ