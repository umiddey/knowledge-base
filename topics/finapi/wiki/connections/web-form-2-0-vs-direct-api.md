# Web Form 2.0 vs Direct API: When to Use Which

The choice between Web Form 2.0 (unlicensed path) and the Direct API (licensed path) is the first architectural decision in any finAPI integration. It's not just a technical choice — it's a regulatory and commercial one. Most B2B SaaS products building on top of finAPI should default to Web Form 2.0 and only consider the licensed path when they have a specific reason that justifies the regulatory overhead.

The core tradeoff: Web Form 2.0 gives you **compliance for free** at the cost of **UX control and SCA handling complexity** (which finAPI absorbs). The direct API gives you **full programmatic control** at the cost of **holding your own PSD2 license** and **implementing all SCA variants dynamically**.

## Concepts Linked

- [[web-form-2-0]]
- [[licensed-vs-unlicensed-tpp]]
- [[strong-customer-authentication]]
- [[psd2-open-banking]]

## Example

**Scenario**: You're building contractor payment functionality for a property management SaaS. Operators pay contractors once or twice a month. You're a 10-person SaaS company without a banking license.

```
OPTION A: Web Form 2.0 (Unlicensed)
--
Effort to set up: ~1 week of integration work
Regulatory overhead: None
SCA implementation: Zero — finAPI's form handles it
UX: Operator redirected to finAPI-hosted page, returns to your app
Latency: Human-gated (operator must complete SCA)
Cost: finAPI license fee
Risk: finAPI's web form availability = your payment availability

OPTION B: Direct API (Licensed)
--
Effort to set up: 3–6 months (BaFin application, eIDAS certificates, per-bank TPP registration)
Regulatory overhead: BaFin PIS license, ongoing compliance reporting
SCA implementation: Full — Redirect + Embedded + Decoupled, dynamically per bank
UX: You control every screen
Latency: Still human-gated for SCA, but you control the interaction
Cost: BaFin license costs + finAPI fees + legal/compliance staff
Risk: You're the regulated entity — any failure is your liability

VERDICT: Option A for property management SaaS. The regulatory overhead of 
Option B makes no sense for a non-financial-services product.
```

**When Option B makes sense**:
- You're a bank, neobank, or regulated financial institution that already has a PSD2 license
- You're processing tens of thousands of payments per day and per-transaction cost justifies the investment
- Your UX requires seamless in-app payment flow with no external redirects (e.g., you're building a payment product)
- You're operating in markets where finAPI's Web Form UX is insufficient for your users

## Analysis

**The hidden complexity of Direct API**: The SCA variants aren't just different — they're genuinely non-deterministic. You submit a payment and the response tells you which SCA approach the bank requires for *that specific bank interface at that moment*. Some banks support multiple approaches. Your code must branch on `multiStepAuthentication.status`:
- `REDIRECT_REQUIRED` → store redirectContext, redirect, re-submit with redirectCallback
- `CHALLENGE_RESPONSE_REQUIRED` → display TAN prompt, submit answer
- `DECOUPLED_APPROACH` → show "check your banking app" UI, poll for completion
- `AUTHORIZED` → done, continue

This is 3-4x the code of the Web Form path, with no UI fallback if something goes wrong.

**The Web Form 2.0 tradeoff in practice**: The main complaints about Web Form 2.0 are (1) UX interruption from redirect and (2) difficulty debugging SCA failures. For a B2B admin tool (property managers, not consumers), the redirect is a non-issue. For a consumer checkout flow, it might matter more. finAPI's Web Form 2.0 is embeddable (unlike the legacy v1 form) which eliminates the new-tab issue for many use cases.

**Hybrid approach**: Some companies use Web Form 2.0 for initial payment authorization and cached credentials for subsequent operations (if they hold AIS). This requires both licenses but reduces friction for repeat users.
