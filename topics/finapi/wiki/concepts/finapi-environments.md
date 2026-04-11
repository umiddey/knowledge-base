# finAPI Environments

finAPI provides two environments — Sandbox and Live — with different base URLs, policies, and SLA guarantees. Critically, the Web Form domain is also different between environments. A common integration bug is configuring the correct Access API URL but computing the wrong Web Form URL, causing authentication failures when creating web forms.

The Sandbox always runs the **latest version** of finAPI services, which means it may be ahead of the Live environment. Sandbox data is never migrated to Live if you switch. Sandbox has no SLA — it can be down or slow without notice. These are all relevant for integration strategy: test continuously on Sandbox, but don't rely on it for any prod-adjacent work.

## Key Points

- **Sandbox Access API**: `https://sandbox.finapi.io`
- **Sandbox Web Form**: `https://webform-sandbox.finapi.io`
- **Live Access API**: `https://live.finapi.io`
- **Live Web Form**: `https://webform-live.finapi.io`
- **Web Form domain derivation**: Aetherios derives the web form URL from the configured Access URL: `sandbox.finapi.io` → `webform-sandbox.finapi.io`, `live.finapi.io` → `webform-live.finapi.io`
- **Sandbox rules**: No load tests. Data not migrated. Real bank accounts can be connected (you're responsible for GDPR compliance). You must delete your own sandbox data after use. No SLA.
- **Live rules**: Requires valid license agreement. Users count towards license. No load tests. Can be IP-restricted. SLA per contract.
- **Free trial**: 30-day sandbox access available — standard developer onboarding path.
- **Demobank**: finAPI provides a test bank (`DEMO0002 - finAPI Test Redirect Bank`) in the Sandbox for integration testing without real bank credentials.

## Example

Aetherios `FinapiService.get_webform_base_url()` resolves the correct web form URL:

```python
def get_webform_base_url(self) -> str:
    if "webform" in self.api_base_url:
        return self.api_base_url          # Already a web form URL
    if "sandbox.finapi.io" in self.api_base_url:
        return self.api_base_url.replace("sandbox.finapi.io", "webform-sandbox.finapi.io")
    if "live.finapi.io" in self.api_base_url:
        return self.api_base_url.replace("live.finapi.io", "webform-live.finapi.io")
    return self.api_base_url              # Fallback for custom/self-hosted finAPI

# Stored config: api_base_url = "https://sandbox.finapi.io"
# get_webform_base_url() → "https://webform-sandbox.finapi.io"
# Used for: POST /api/webForms/standalonePayment, GET /api/webForms/{id}
```

## Related Concepts

- [[oauth2-token-model]] — Token endpoint differs by environment (`/oauth/token` on Access URL)
- [[finapi-platform]] — finAPI's overall structure
- [[finapi-access-user]] — Access User created on one environment can only be used on that environment

## Sources

- [[raw/articles/documentation.finapi.io-environments.md]] — Sandbox and Live policies, URLs, rules
- [[raw/other/aetherios-finapi-integration-bridge.md]] — `get_webform_base_url()` implementation
