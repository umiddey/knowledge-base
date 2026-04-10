# Data Masking

Data masking protects sensitive values by hiding or transforming them so that unauthorized users cannot see the original data. It is the implementation mechanism for column-level access control — the policy says "analysts should not see customer email," and masking makes that policy real in the data.

Dynamic data masking returns obfuscated values based on the querying user's role, without modifying the stored data. An analyst sees "j***@example.com" while customer service sees the full email. Static data masking creates a separate copy with sensitive fields permanently anonymized — used for development and testing environments. Tokenization replaces sensitive values with reversible tokens, useful for payment data where the original value must be recoverable through a secured key management system but never exposed to analysts.

## Key Points
- Dynamic masking: obfuscated values returned based on user role, data unchanged
- Static masking: permanent anonymized copy for dev/test environments
- Tokenization: reversible replacement through a separate key management system
- Essential for compliance with GDPR, CCPA, HIPAA, PCI-DSS
- Should be enforced at the warehouse or semantic layer, not in individual dashboards
- Masking policy should align with sensitivity classification

## Related Concepts
- [[access-control]] - masking is the implementation of column-level access control
- [[data-governance]] - masking policies are governed by sensitivity classification rules
- [[data-platform-layers]] - masking applies differently at each layer (raw may be unmasked, curated masked)

## Examples

### Dynamic masking in Snowflake
```sql
-- Create masking policy: analysts see masked email, admins see full email
CREATE OR REPLACE MASKING POLICY email_mask AS (val STRING) RETURNS STRING ->
  CASE
    WHEN current_role() IN ('ADMIN', 'DATA_ENGINEER') THEN val
    ELSE REGEXP_REPLACE(val, '^(.).*(.@.*)$', '\1***\2')
  END;

-- Apply to column
ALTER TABLE dim_customer MODIFY COLUMN email SET MASKING POLICY email_mask;

-- Results by role:
-- ADMIN sees:         sarah.chen@company.com
-- ANALYST sees:       s***@company.com
-- Data unchanged in storage. Masking applied at query time.
```

### Static masking for dev/test environments
```sql
-- Create a permanently anonymized copy for development
CREATE TABLE dev.dim_customer AS
SELECT
    customer_key,
    customer_id,
    -- PII columns are permanently replaced
    CONCAT('FAKE_', customer_key) AS name,
    CONCAT(customer_key, '@test.com') AS email,
    -- Non-PII columns pass through unchanged
    segment,
    region,
    loyalty_tier
FROM prod.dim_customer;

-- Dev team can test with realistic data shapes without seeing real PII
-- No dynamic masking needed — the data is permanently anonymized
-- Regenerated weekly from production
```

### Tokenization for payment data
```
Original:  credit_card = "4532-1234-5678-9012"
Tokenized: credit_card = "TOK-8F3A2B9C1D"

The token is stored in the warehouse. The original card number is stored
ONLY in a separate, PCI-DSS compliant vault with hardware security modules.

When a refund needs the real card number:
  1. Application sends TOK-8F3A2B9C1D to the vault
  2. Vault returns 4532-1234-5678-9012
  3. Application processes the refund
  4. Card number NEVER enters the data warehouse

Analysts see only the token. They can still count unique cards and detect
patterns, but they can never see the actual card number.
```

## Sources
- [[raw/articles/filters-and-masks]] - Databricks row filters and column masks implementation
