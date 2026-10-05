---
name: visualize-this
description: Build a step-by-step animated HTML explainer — one idea per step, 1–3 boxes or file cards, a moving dot, plain words, real file contents linked line to line. Use when the user wants something explained, presented, or "shown how it works end to end" as an animation or HTML presentation.
---

# Visualize This — one step at a time

The user wants to UNDERSTAND, not to see everything. Build a linear story:
step 0 → 1 → 2 → … → end. Each step is one idea, shown with the fewest items
possible, animated so the eye follows one moving thing.

**Gold reference (the user called it "close to perfect"):**
`gold-reference/gateforge-ecosystem.html` (next to this file), 36 steps.
When unsure how a step should look, open it and copy the pattern.

## The hard rules

1. **One idea per step.** If a step needs "and", split it.
2. **At most 3 items per step.** Usually 2. Never a map, never a diagram of
   the whole system, never every component at once. The whole picture is
   built by walking through steps, not by drawing it.
3. **Every step = count + title + ONE sentence + items + animation + optional
   one-line punchline.** Nothing else on screen.
4. **Plain words.** No jargon on screen without a plain name first
   ("referee (the witness)"). Real values beat placeholders: `pen`, `order 42`,
   `GET /api/orders/42`, not `<value>`.
5. **One moving thing at a time.** A dot travels from A to B with a short
   label. Then an item changes text, a line lights up, or an item turns
   green ✓ / red ✗.
6. **Show the failure next to the success.** Same items, wrong value, red.
   ("pen = pen ✓" step, then "pen ≠ PEN ✗" step.)
7. **End with "The whole journey"**: 4–7 numbered lines appearing one by one,
   no items.
8. **Light, clean, big.** White background, black outlines, large fonts,
   green/red only for meaning, blue for the moving dot, yellow for a
   highlighted line.
9. **Never skip the in-between.** For every arrow, the viewer will ask:
   *who sets this up, how do they find each other, where does the data
   live, who computes the check?* Give each answer its own step. Example:
   "who starts the referee", "how the test finds it (one import line)",
   "where the receipt is saved", "who computes the fingerprint at push".
   Missing these made the user ask follow-ups.
10. **Say who is responsible on screen.** Plain boxes name it in the text;
    file cards name it in the header (`written by init`, `owner only`,
    `by the agent`, `generated · not committed`).
11. **Simple must still be true.** A simplified arrow that misrepresents the
    real path is a bug. Before drawing "A → B → C", check in the code that
    traffic really goes that way (e.g. the referee drove its OWN browser;
    the test did not route through it).
12. **Show the real files.** If the system runs on files (config, rules,
    tests, generated output, receipts), each file gets its own card with its
    real, shortened content, and links are drawn from the exact line in one
    file to the exact line it refers to in another. This is what turned a
    good deck into the "close to perfect" one.

What failed before (the user rejected it hard): a dark dashboard with ~37
boxes, every arrow drawn, side panels with terminal + zoom + info cards, and
scenes that lit up paths on the same crowded map. "Everything at once" is
never the answer, however accurate it is.

Also rejected ("significantly worse and more convoluted", reverted): a
54-step rewrite that added a 6-stop journey strip on every slide, map
opener slides with "So far / Now / Comes out", and a final file map. More
structure did not make the big picture clearer. Keep the approved 36-step
shape; to connect ideas, improve individual steps, don't add navigation.

## What made the gold deck work

- **One running example, start to finish.** One table (`orders`), one value
  (`pen`), one id (`42`), one obligation name
  (`tenant.orders:persistence:create`). Every card and dot uses the same
  values, so the viewer recognises them when they come back.
- **Follow one name across files.** The strongest steps track one string
  from file to file: the rule's `persistence:create` → the obligation
  `tenant.orders:persistence:create` → the test annotation with that exact
  string → the adapter's `resourceId: 'tenant.orders'`. Say it in a note:
  "Remember it — the test will use the same name."
- **Files appear when the story needs them,** not in a "here are all the
  files" block. The main config appears at setup, the adapter just before
  the referee reads with it, `receipt.json` when the run succeeds, the push
  hook at push.
- **Things that are computed, not stored,** still get a card, labelled
  honestly: `who: 'computed, not a file'`.
- **Say what each file is NOT, too.** "This link is a claim. The proof comes
  later." "Read-only. It can only look, never change." One short note
  removes a wrong idea before it forms.
- **Mix cards and plain boxes.** Actors (agent, owner, app, referee, CI
  server) stay plain boxes; files are cards. A dot from a box to a card
  line ("owner → `"plane": "tenant"`") shows who wrote which line.

## Card step patterns (copy these)

| Pattern | Items | Actions | Use for |
|---|---|---|---|
| **Tour one file** | 1 card, `w: 620–760` | `show`, then `hi` + `note` per important line (2–4 lines) | Main config, agent rules, hook script |
| **Points to** | 2 cards `l` `r` | `dot: ['a:0', 'b:0', 'points to']`, then `hi` the line that matters | Config naming another file |
| **Who wrote this line** | box `l` + card `r` | `dot: ['owner', 'f:3', 'tenant']` | Owner answers, agent writes code |
| **Transform** | 3 cards `L` `C` `R` | `dot` input line → rule line, rule line → output line (2–3 dots) | Rule + code → obligations |
| **File → action** | card + box | `dot: ['a:4', 'app', 'GET /api/orders/42']`, return dot into a card line | Adapter read, runtime recipe |
| **Match / mismatch** | box + card | dot with computed value into the card line, then `mark` ok/bad | Hash vs receipt, stale receipt |

## How to build it

1. **Learn the real thing first.** Read the code / run the tool so every
   step is true. For each file card, get the content from the source
   (`git show <branch>:<path>`, a scratch `init` run, or the template string
   in the code). Shorten it, never invent it. Example values (hashes,
   dates) may be made up; say "shortened" in `who`.
2. **Write the story as a list of steps before any HTML.** Typical arc:
   - the problem (what goes wrong without it)
   - the idea in one line
   - setup (what you install/create) + "File:" tour of the main config
   - the happy path, one hop per step, with each file's card when it enters
   - the failure path(s), one per step
   - what can't be cheated, and why
   - who does what (two boxes, short lists)
   - the whole journey recap
   25–40 steps is normal for a full system with files. More short steps beat
   fewer dense ones.
3. **Copy `template.html`** (next to this file) and replace only the `STEPS`
   array and `<title>`. The engine, layout and controls are proven; don't
   redesign them.
4. **Verify card text against the source**: `git grep -F` a distinctive
   string from every card (e.g. `"CLI engine not found"`, `defineHttpAdapter`,
   `justificationUrl`). Zero hits = wrong card.
5. **Run the checker** (next to this file):
   ```bash
   PLAYWRIGHT=<repo>/node_modules/playwright/index.mjs node check.mjs deck.html
   PLAYWRIGHT=… node check.mjs deck.html --play --shots /tmp/shots 3,11,26
   ```
   First run = layout only (seconds): text overflow, file name vs "who"
   collision, items touching, >3 items, page errors. Fix overflow by
   shortening lines, never by shrinking fonts. Second run plays every step
   (~5 min for 36 steps; run it in the background) and screenshots a few.
   **Look at the screenshots**: the checker can't see stacked dot labels or
   a dot that lands on the wrong line.
6. Delete scratch files; open the deck for the user (`setsid xdg-open deck.html`).

## The STEPS format (template.html)

```js
{ title: 'Rule → "must prove" list',
  text: 'The rule matches the table. Out come 4 obligations: things that must be proven.',
  boxes: {
    m: { slot: 'L', file: 'app/models.py', who: 'your code', lines: ['class Order(Base):', '  __tablename__ = "orders"'] },
    p: { slot: 'C', file: 'policies.yml', who: 'the rule', lines: ['- id: user-facing-persistence', '  when:', '    exposure: user-facing', '  require:', '    - persistence:create'] },
    o: { slot: 'R', file: 'obligations', who: 'computed, not a file', lines: ['tenant.orders:persistence:create'] },
  },
  actions: [
    { show: 'm' }, { show: 'p' },
    { dot: ['m:1', 'p:2', 'a user table'] },   // line 1 of m → line 2 of p; both turn yellow
    { show: 'o' },
    { dot: ['p:4', 'o:0', 'create'] },
    { note: 'Remember this name — the test will use the same one.' },
  ] }
```

- Item slots: 3 items → `L` `C` `R`; 2 items → `l` `r`; 1 item → `C`.
- Plain box: `[slot, label, sub]`. Keep `sub` to ≤5 short lines (`\n` splits).
- File card: `{ slot, file, who, lines: [...], w? }`. ≤10 lines.
  Line width limits: ~36 chars in a 3-card step, ~50 in a 2-card step,
  ~70 for a single card with `w: 660`. Long `who` text moves under the card
  automatically; keep it short anyway.
- Refs: `'id'` = the item; `'id:3'` = line 3 (0-based) of card `id`.
- Actions:
  - `show: id` fades an item in.
  - `dot: [from, to, label, colour?]` moves a dot; line refs highlight both ends.
    Colour `'#dc2626'` = wrong/rejected, `'#16a34a'` = accepted.
  - `hi: 'id:n'` highlights one card line.
  - `set: [id, sub]` changes a plain box's text.
  - `mark: [id, 'ok'|'bad']` adds a green ✓ / red ✗.
  - `note: text` shows the punchline under the stage.
  - `line: text` adds a recap line (use with `boxes: {}`).
- Dot labels sit above (left→right) or below (right→left) the tallest item.
  A new dot in the same gap and direction replaces the old label, so two
  dots the same way never stack.
- Controls already built: Next / Back / Replay / Auto, → ← Space `r` keys,
  clickable progress dots (hover shows the step title), "Step N of M".

## Checklist before handing over

- [ ] No step has more than 3 items.
- [ ] Every step's sentence is one sentence a non-expert can read aloud.
- [ ] One running example (same names/values) from start to finish.
- [ ] Every file that matters has a card, shown when the story reaches it,
      with who writes it in the header.
- [ ] Every cross-file link is a line-to-line dot, and it matches the code.
- [ ] Card text grep-verified against the source.
- [ ] The happy path and at least one failure are both shown.
- [ ] The last step is the numbered recap.
- [ ] `check.mjs` layout run clean; `--play` run clean; screenshots looked at.
