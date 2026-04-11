# Strong Customer Authentication (SCA)

Strong Customer Authentication (SCA) is the PSD2 requirement that any electronic payment initiation must be verified using at least 2 of 3 independent factors: **Knowledge** (PIN, password), **Possession** (phone, hardware token), **Inherence** (biometrics). It is the technical mechanism that prevents third parties from initiating payments without the account owner's explicit real-time consent.

For open banking integrations, SCA is the hardest part. Different banks implement it differently, and a single integration must handle all variants. finAPI's Web Form 2.0 is specifically designed to abstract all SCA complexity away from the integrating application — the user completes SCA inside finAPI's hosted web form, and the application only sees the result (payment authorized or aborted). For licensed TPPs who bypass the web form, they must implement SCA handling themselves for three distinct bank approaches.

## Key Points

- **Three SCA factors**: Knowledge (PIN/password) + Possession (device/TAN generator) + Inherence (fingerprint/face ID). Any 2 of 3 required.
- **Three bank SCA approaches**:
  - **Redirect SCA**: Bank sends user to its own webpage for authentication. TPP must handle a `REDIRECT_REQUIRED` 510 response, store `redirectContext`, redirect user, then re-submit with `redirectCallback` query string.
  - **Embedded SCA**: TPP submits credentials directly to finAPI. Bank may respond with a TAN challenge. TPP submits the TAN answer. More TPP complexity, but smoother UX.
  - **Decoupled SCA**: Bank sends a push notification to the user's mobile banking app. User authorizes there. TPP polls or waits for callback.
  - **Combinations**: e.g., Embedded + Decoupled — user submits login credentials via TPP, then authorizes via mobile app push.
- **Application must handle all variants dynamically**: A German bank may use Redirect. An Austrian bank may use Decoupled. You don't know until the response comes back.
- **Web Form 2.0 handles this for you**: The hosted form internally manages whatever SCA approach the bank requires. From the application's perspective, the user simply completes the web form.
- **SCA exemptions exist** for small amounts (<€30 in certain scenarios) and trusted beneficiaries, but these are bank-side decisions and finAPI exposes them as-is.

## Example

Licensed TPP handling Redirect SCA manually (what Web Form 2.0 handles for you automatically):

```
STEP 1 — Submit payment
POST /payments/submit
{ "paymentId": 1, "interface": "XS2A", "redirectUrl": "https://myapp.com/callback",
  "loginCredentials": [{ "label": "Onlinebanking-ID", "value": "user123" }] }

STEP 2 — Bank responds: "I need you to redirect the user"
HTTP 510
{ "errors": [{ "code": "ADDITIONAL_AUTHENTICATION_REQUIRED",
               "multiStepAuthentication": {
                 "status": "REDIRECT_REQUIRED",
                 "redirectUrl": "https://demobank.finapi.io?state=976641d2-...",
                 "redirectContext": "976641d2-c03f-4919-8dac-16ccfd24b4e0",
                 "redirectContextField": "state" } }] }

STEP 3 — Redirect user to bank URL; user completes 2FA there

STEP 4 — Bank redirects back to myapp.com/callback?state=976641d2-...&code=1e065516-...

STEP 5 — Re-submit with redirectCallback
{ "paymentId": 1, "interface": "XS2A",
  "multiStepAuthentication": { "hash": "288c0a78...",
    "redirectCallback": "state=976641d2-...&code=1e065516-..." } }

STEP 6 — HTTP 200, payment successful

--- vs ---

WITH WEB FORM 2.0 (what Aetherios does):
You do none of the above. The web form handles all of it internally.
You just redirect the user to the web form URL and wait for COMPLETED.
```

## Related Concepts

- [[web-form-2-0]] — finAPI's abstraction layer over all SCA approaches
- [[psd2-open-banking]] — The regulation mandating SCA
- [[licensed-vs-unlicensed-tpp]] — Licensed TPPs must implement SCA handling; unlicensed use Web Form
- [[standalone-payment-initiation]] — The payment flow where SCA happens

## Sources

- [[raw/articles/documentation.finapi.io-standalone-payment-no-webform.md]] — Full Redirect/Embedded/Decoupled SCA flows with request/response examples
- [[raw/articles/finapi.zendesk.com-psd2-web-form-legacy.md]] — Regulatory reason for Web Form (SCA compliance without license)
- [[raw/articles/psd2-open-banking]] — SCA as PSD2 mandate
