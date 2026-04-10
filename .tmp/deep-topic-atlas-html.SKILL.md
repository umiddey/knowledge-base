---
name: deep-topic-atlas-html
description: >
  Build a brand-new, deeply detailed, visualization-heavy HTML atlas for a
  compiled knowledge-base topic. Trigger when the user wants a self-contained
  HTML that embeds concepts, connections, source digest, mechanism-level
  detail, failure modes, worked examples, and strong visual structure instead
  of sending them back to markdown.
---

# Deep Topic Atlas HTML

Build a new HTML atlas from a compiled topic wiki. The atlas must be self-contained, must carry the real technical payload inside the HTML, and must visualize the topic instead of merely styling prose.

The knowledge base lives at repo root. Topics are under `topics/<topic-name>/`.

## Trigger intent

Use this skill when the user wants any of the following:
- a deep HTML for a topic
- a visual topic atlas or explorer
- a self-contained topic page
- an interactive topic dashboard
- concepts, connections, and source material visualized together
- a DEEP AS FUCK topic HTML, not a summary page

## Argument parsing

The first word of the user's request is `<topic-name>`.
After that, optionally:
- a target HTML path under `topics/<topic-name>/output/presentations/`
- specific UX goals
- specific clusters or concepts to emphasize

If no target HTML path is given:
- create a **new** file under `topics/<topic-name>/output/presentations/`
- prefer `<topic-name>-atlas.html` or `<topic-name>-deep-atlas.html`
- do **not** patch an existing HTML unless the user explicitly says to modify one

## Non-negotiable output contract

The final HTML must satisfy **all** of these:
- it is a new standalone HTML file
- it is not a single long scrolling article
- it has multiple primary views or panels
- it includes multiple meaningful visualizations of topic structure
- it includes concept inventory, connection synthesis, source digest, and deep-dive content
- it includes real technical detail in the HTML itself
- it does not require the user to open `.md` files to get the substantive explanation
- it gives examples for the small things, not just the big themes
- it is visual first, prose second

If any of those are missing, the job is incomplete.

## Required views

The atlas must include these views unless the user explicitly asks for different names.

1. `Overview`
Purpose:
- one-screen orientation
- central spine of the topic
- why the topic is organized the way it is
- at least one visual system diagram, not just KPI cards

2. `Network`
Purpose:
- show cluster map / concept network / architecture structure
- reveal what is central and what is peripheral
- allow clicking a node to update a spotlight/detail panel

3. `Library`
Purpose:
- searchable and filterable concept inventory
- concept cards with summaries, linked concepts, source anchors, and concrete examples

4. `Bridges`
Purpose:
- connection articles rendered as architecture tensions
- what each connection explains and why it matters
- include at least one visual bridge/tension view, not cards alone

5. `Sources`
Purpose:
- processed source digest
- strongest anchors
- where each source is used
- processed-but-unused sources when relevant
- include at least one evidence visualization such as a heatmap or matrix

6. `Deep Dives`
Purpose:
- mechanism-level payload
- failure modes
- worked examples
- source-derived takeaways
- dense but readable technical detail

7. `Board`
Purpose:
- local shortlist / pinned concepts
- persisted in `localStorage`

## Visual contract

The page must feel like a product surface, not a decorated article.

Required visual elements:
- one architecture or layer diagram in `Overview`
- one clickable network / constellation / dependency graph in `Network`
- one bridge matrix or tension map in `Bridges`
- one source heatmap / evidence matrix in `Sources`
- one metrics or signal strip summarizing topic scale
- one spotlight or inspector panel that updates from user interaction

Preferred additions when relevant:
- mini comparison charts
- risk bars
- pipeline-state diagrams
- good-vs-bad data-shape comparison cards
- before/after example panels

Hard rule:
- if a section can only be described as “cards with words”, it is under-visualized and must be improved

## Minimum content depth

### Overview view must include
- the platform spine or central organizing idea
- at least 3 high-value tensions or framing statements
- topic metrics (concept count, connection count, source count, pinned count if used)
- at least 2 worked micro-examples visible without leaving the view

### Network view must include
- at least 8 visible nodes
- at least 1 central node
- visible links/edges or layering relationships
- a spotlight/details panel that updates from interaction
- source or flow evidence in the spotlight panel

### Library view must include
- search input
- category or cluster filters
- concept cards with:
  - title
  - cluster/category
  - digest summary
  - linked concepts
  - source anchors
  - a concrete example snippet
  - optional pin action

Rule:
- every concept card should have an example unless the source material truly makes that impossible

### Bridges view must include
- all connection articles or all major ones relevant to the topic
- for each bridge:
  - title
  - the tension it resolves
  - what concept families it connects
  - why that bridge matters
  - one concrete consequence or failure case
- at least one visual bridge/tension representation beyond the bridge cards

### Sources view must include
- processed source items from `_sources.md`
- source type (`article`, `paper`, etc.)
- citation usage in compiled pages if available
- strongest anchor sources by reuse
- processed-but-unused sources if present
- source digest language explaining what each strong source contributes
- at least one evidence visualization such as heatmap, matrix, or ranked reuse display

### Deep Dives view must include at least 5 deep-dive modules
Each module must include all of the following:
- `Title`
- `Why this area matters`
- `Mechanism`
- `Failure Modes`
- `Worked Example`
- `Source Digest`
- `Linked Concepts`
- at least one visual cue such as risk bars, sequence bars, comparison blocks, or state strips

Minimum payload per deep-dive module:
- at least 4 mechanism bullets
- at least 3 failure-mode bullets
- at least 1 worked example block
- at least 3 source-digest bullets
- at least 3 linked concepts

### Board view must include
- pinned concept cards or a clear empty state
- `localStorage` persistence if pinning exists

## Read order and extraction rules

Read at minimum:
1. `topics/<topic-name>/wiki/_index.md`
2. `topics/<topic-name>/wiki/_sources.md`
3. every relevant concept page
4. every connection page
5. the existing HTML only if the user explicitly asked to modify it

Then extract the atlas payload before touching layout.

Create this internal extraction table for yourself:
- `cluster_name`
- `central_question`
- `core_concepts`
- `mechanism_points`
- `failure_modes`
- `worked_example_candidates`
- `source_anchors`
- `connection_articles`
- `visualization_candidates`

If you cannot fill these fields, you have not read enough.

## Source-digest rules

Do not merely list source filenames.
For each strong source anchor, explain what it contributed, for example:
- why it is reused heavily
- which concepts depend on it
- whether it provides mechanism detail, history, taxonomy, or tradeoff framing
- what concrete example or failure pattern it enabled in the HTML

For each deep-dive module, the source digest must say what the underlying sources actually add.

Bad:
- “Used source X.”

Good:
- “The CDC source matters because it explains why deletes and exact change sequence are the killer advantage over timestamp incrementals.”

## Worked-example rules

Worked examples must be concrete.
Good example types:
- schema snippets
- SQL metric-definition mismatches
- CDC / watermark / replay sequences
- before/after SCD records
- row-level / column-level masking examples
- reliability SLO definitions with monitoring implications
- cost comparison tables with assumptions
- grain explosion examples with additive-measure failure
- policy-shaped views for different audiences

Bad example types:
- generic prose pretending to be technical
- “Imagine a company…” with no actual mechanics
- code blocks that are decorative and teach nothing

## UX rules

The atlas must feel like a product, not a report.

Preferred:
- app shell or dashboard shell
- side navigation or tabs
- strong visual hierarchy
- different modes for overview vs retrieval vs depth
- dense but readable information architecture
- meaningful motion only if it improves clarity

Avoid:
- one endless scroll
- beige/doc-like presentation
- weak contrast
- default card dump UX
- decorative visuals with no explanatory job
- a page that is really just words in fancy containers

## Implementation rules

Use simple browser-side JavaScript.
Implement only what strengthens the atlas:
- view switching
- filtering/search
- spotlight updates
- pinning / saved state if useful
- deep-dive expansion if useful
- lightweight canvas/SVG/CSS visualizations if they teach structure clearly

Prefer:
- data structures embedded in the page if that keeps the file self-contained
- CSS variables
- maintainable functions with obvious names
- visual components that encode meaning, not decoration

## Verification checklist

Before finishing, verify all of these explicitly:
1. new file created unless patching was explicitly requested
2. 6 or more primary views/panels exist
3. overview includes a real structure diagram
4. network visualization exists and is meaningful
5. bridges view exists and includes a second bridge/tension visualization
6. sources view exists and includes digest information plus evidence visualization
7. library view exists and includes search/filter
8. concept examples are present broadly, ideally on every concept card
9. deep-dive view exists
10. deep-dive module count is at least 5
11. each deep-dive module has mechanism, failure modes, worked example, source digest, linked concepts
12. local persistence works if pinning exists
13. the page is not just an attractive long summary

If the page is visually nice but still thin on substance, fail the task and keep working.

## Reporting format

Print a summary like this:

```text
=== DEEP TOPIC ATLAS HTML REPORT ===

Topic: <topic-name>
Target HTML: <path>
Date: <today>

Views Added: XX
  - <view> — purpose

Visualization Layer:
  - <visualization> — teaches <thing>

Deep Dive Modules: XX
  - <module> — covers <mechanism/failure area>

Source Digest Coverage:
  - processed sources represented: <count>
  - strongest anchors: <top sources>
  - processed-but-unused shown: yes/no

Examples:
  - concept cards with examples: <count>
  - deep-dive worked examples: <count>

Persistence:
  - localStorage key: <key or none>

Remaining Gaps:
  - <anything still thin>
```

## Hard fail conditions

Do not stop if any of these are true:
- the HTML still sends the user back to markdown for the important material
- the HTML is mostly summaries with thin examples
- the source layer is just filenames with no digest
- the deep-dive view is missing
- the result is basically one long scrolling page with tabs painted on top
- the result is prettier but not deeper
- the result is more interactive but still mostly words on a fancy layout
- the topic structure is not actually visualized
