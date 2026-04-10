# Conformed Dimensions

Conformed dimensions are dimensions that are shared consistently across multiple subject areas or data marts. If both the sales fact and the support fact use the same customer dimension, then analysts can compare customer purchases, refunds, and support activity without worrying about conflicting definitions. Without conformed dimensions, each team defines customer differently, and enterprise-wide analysis becomes unreliable.

The bus matrix is the planning tool that maps business processes to shared dimensions. It lists business processes (sales, refunds, inventory, shipments, support) on one axis and shared dimensions (date, customer, product, store, channel) on the other. Where a process and dimension intersect, a conformed dimension is needed. This matrix helps teams see reuse opportunities, encourages consistency, and creates a more coherent enterprise model. Conformed dimensions are one of Kimball's most important contributions to practical data architecture.

## Key Points
- A dimension shared consistently across subject areas (same customer in sales and support)
- Enables cross-functional analysis without conflicting entity definitions
- Without them, different teams report different numbers for the same entity
- The bus matrix maps business processes to shared dimensions for planning
- Requires governance to maintain consistency — someone must own the conformed definition
- Conformed dimensions are a governance tool as much as a modeling technique

## Related Concepts
- [[dimensional-modeling]] - conformed dimensions are a core principle of Kimball methodology
- [[data-governance]] - maintaining conformed dimensions requires governance discipline
- [[data-marts]] - marts built on conformed dimensions produce consistent cross-domain reporting
- [[semantic-layer]] - the semantic layer should use conformed dimensions as its dimensional foundation

## Examples

### Bus matrix: the planning tool for conformed dimensions
```
                    | Date | Customer | Product | Store | Channel |
--------------------+------+----------+---------+-------+---------+
Sales (orders)      |  ✓   |    ✓     |    ✓    |   ✓   |    ✓    |
Returns (refunds)   |  ✓   |    ✓     |    ✓    |   ✓   |         |
Inventory (stock)   |  ✓   |          |    ✓    |   ✓   |         |
Marketing (campaigns)| ✓   |    ✓     |    ✓    |       |    ✓    |
Support (tickets)   |  ✓   |    ✓     |         |       |         |

Where ✓ appears, that dimension must be CONFORMED across those processes.
Customer dimension in Sales, Returns, Marketing, and Support must use the SAME definition.
Otherwise: "How many customers bought AND complained?" becomes unreliable.
```

### Conformed vs unconformed: the inconsistency trap
```sql
-- WITHOUT conformed dimensions:
-- Sales mart dim_customer: segment = CASE WHEN annual_revenue > 1M THEN 'Enterprise' ELSE 'SMB' END
-- Support mart dim_customer: segment = source field from Salesforce (manual entry)
-- Result: Acme Corp is 'Enterprise' in sales reports, 'SMB' in support reports
-- Executive question: "What % of Enterprise customers have support tickets?"
-- Answer: DEPENDS ON WHICH DASHBOARD YOU LOOK AT.

-- WITH conformed dimensions:
-- One dim_customer shared across all marts
-- Segment definition: documented, governed, tested
-- Both Sales and Support facts JOIN to the same dim_customer
-- Cross-domain analysis is reliable
```

## Sources
- [[raw/articles/dimensional-modeling-techniques]] - Kimball Group's conformed dimension guidance
- [[raw/articles/kimball-dimensional-model]] - implementing Kimball models with dbt
