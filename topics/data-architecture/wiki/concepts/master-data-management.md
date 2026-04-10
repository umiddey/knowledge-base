# Master Data Management (MDM)

Master data management is the discipline of ensuring that an organization's critical shared business entities — customers, products, suppliers, stores, employees — are consistently defined and managed across all systems. Without MDM, product IDs mean one thing in ecommerce and another in the warehouse system, customer records conflict between CRM and ERP, and reporting is constantly broken.

There are four main MDM implementation architectures: registry (central index pointing to source records), consolidation (central copy assembled from sources), coexistence (bidirectional sync between MDM and sources), and centralized (MDM is the single authoring system). The choice depends on how much control the organization needs versus how much it can change existing source systems. Reference data (country codes, currency codes, status codes) is a simpler but related problem — ensuring that allowed values are standardized across the enterprise.

## Key Points
- Ensures consistency of shared entities (customer, product, supplier) across systems
- Four implementation patterns: registry, consolidation, coexistence, centralized
- Reference data management handles standardized code sets (country, currency, status codes)
- Without MDM, cross-system reporting breaks due to conflicting entity definitions
- Not purely a technology problem — requires governance, ownership, and organizational alignment

## Related Concepts
- [[data-governance]] - MDM is a governance discipline for shared entity management
- [[conformed-dimensions]] - conformed dimensions in the warehouse depend on MDM discipline upstream
- [[data-quality]] - master data quality directly affects downstream analytical quality

## Examples

### The problem MDM solves: conflicting customer records
```
Without MDM:
  CRM (Salesforce):   customer_id=CUST-4521, name="Acme Corp", segment="SMB"
  ERP (SAP):          account_no=ACC-77234,  name="Acme Corporation", region="US-East"
  Ecommerce (Shopify): user_id=USR-88901,   email="billing@acme.com"

  When the warehouse tries to build dim_customer:
  Which name? Which segment? Which system is authoritative for region?
  Answer: nobody knows → conflicting reports → executives argue about numbers

With MDM:
  MDM resolves: CUST-4521 + ACC-77234 + USR-88901 → golden record:
    canonical_id: MD-1001
    name: "Acme Corporation" (ERP is authoritative for legal name)
    segment: "SMB" (CRM is authoritative for segmentation)
    region: "US-East" (ERP is authoritative for location)
    email: "billing@acme.com" (Ecomm is authoritative for digital contact)
```

### Four MDM architecture patterns
```
1. REGISTRY: MDM is an index, not the master
   Sources keep their data. MDM maintains cross-references (CUST-4521 = ACC-77234)
   Pro: least disruptive. Con: no single source of truth.

2. CONSOLIDATION: MDM assembles a central copy
   Sources push data to MDM. MDM merges into golden records.
   Read from MDM, write to sources. Pro: single read source. Con: source updates still diverge.

3. COEXISTENCE: Bidirectional sync
   MDM pushes golden records back to sources. Sources push updates to MDM.
   Pro: sources stay consistent. Con: complex sync logic, conflict resolution needed.

4. CENTRALIZED: MDM is the single authoring system
   All changes go through MDM. Sources are read-only replicas.
   Pro: strongest consistency. Con: requires changing source system workflows.
```

## Sources
- [[raw/articles/4-architecture-patterns-for-master-data-management]] - four MDM architecture patterns
- [[raw/articles/mdm-integration-architecture-html]] - Informatica MDM integration patterns
