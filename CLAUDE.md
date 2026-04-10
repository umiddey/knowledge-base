# Knowledge Base System

This is an LLM-operated knowledge base. The LLM (you) writes and maintains all wiki content. The user rarely edits wiki files directly.

## Directory Structure

```
topics/<topic-name>/
  raw/                  # User-ingested source material
    articles/           # Web clips (.md from Obsidian Web Clipper)
    papers/             # PDFs, research papers
    images/             # Downloaded images referenced by sources
    other/              # Repos, datasets, misc
  wiki/                 # LLM-compiled and maintained wiki
    _index.md           # Master index: every article listed with 1-line summary
    _sources.md         # Index of all raw/ sources with status (processed/unprocessed)
    concepts/           # One .md per concept
    connections/        # Articles linking multiple concepts
  output/               # Query results, can be filed back into wiki
    reports/
    slides/             # Marp format for Obsidian Marp plugin
    visualizations/     # matplotlib/mermaid outputs
tools/                  # Shared CLI tools
scripts/                # Automation scripts
```

## Core Operations

### 1. COMPILE: Process raw sources into wiki

When the user adds new files to `raw/` or asks you to compile:

1. Read `wiki/_sources.md` to see what's already processed
2. Scan `raw/` for unprocessed files
3. For each unprocessed source:
   a. Read and summarize it
   b. Extract key concepts
   c. For each concept:
      - If `wiki/concepts/<concept>.md` exists, UPDATE it with new information and add source backlink
      - If not, CREATE a new concept article
   d. Identify connections between concepts - create/update `wiki/connections/` articles
   e. Mark source as processed in `wiki/_sources.md`
4. Rebuild `wiki/_index.md` with updated summaries and backlinks

#### Concept Article Format

```markdown
# <Concept Name>

<2-4 paragraph summary>

## Key Points
- ...

## Related Concepts
- [[concept-name]] - brief relationship description

## Sources
- [[raw/articles/source-file]] - what this source contributed
```

#### Connection Article Format

```markdown
# <Connection Title>

<How these concepts relate, why it matters>

## Concepts Linked
- [[concept-a]]
- [[concept-b]]

## Analysis
<Deeper analysis of the relationship>
```

### 2. Q&A: Answer questions against the wiki

When the user asks a question about a topic:

1. Read `wiki/_index.md` to orient
2. Identify relevant concept and connection articles
3. Read those articles + any relevant raw sources
4. Produce the answer as a markdown file in `output/reports/` AND display it
5. If the answer reveals new connections or concepts, offer to file them back into the wiki

### 3. LINT: Health check the wiki

When asked to lint or health-check a topic:

Run these checks and report findings:

- **Orphan detection**: Concepts with no backlinks from other concepts
- **Missing concepts**: Terms referenced in articles but with no concept page
- **Stale sources**: Raw files not yet processed
- **Inconsistencies**: Contradictory claims across articles
- **Thin articles**: Concept pages with less than 100 words
- **Missing connections**: Concepts that likely relate but have no connection article
- **Broken links**: Wikilinks pointing to non-existent files
- **Suggested questions**: Interesting questions the wiki could answer but hasn't explored

Output the health report to `output/reports/health-check-<date>.md`.

### 4. ENHANCE: Improve wiki quality

When asked to enhance:

- Use web search to fill gaps identified by lint
- Expand thin articles with more detail from raw sources
- Write new connection articles for related but unlinked concepts
- Improve summaries in `_index.md`

### 5. OUTPUT FORMATS

#### Slides (Marp)
```markdown
---
marp: true
theme: default
---

# Slide Title

content

---

# Next Slide
```

Save to `output/slides/<name>.md`

#### Visualizations
- Mermaid diagrams inline in markdown (Obsidian renders natively)
- For complex charts, generate with matplotlib and save images to `output/visualizations/`

## Obsidian Compatibility

- Use `[[wikilinks]]` for internal links (Obsidian default)
- Use relative paths for images: `![[images/foo.png]]`
- Frontmatter YAML for metadata when useful
- Tags with `#tag` syntax
- All files are .md

## Creating a New Topic

```bash
cp -r topics/_template topics/<new-topic-name>
```

Then start adding raw sources and ask to compile.

## Important Rules

- NEVER delete raw source files
- ALWAYS update `_sources.md` and `_index.md` after any wiki changes
- Use [[wikilinks]] not [markdown links] for internal references
- Keep concept filenames lowercase-kebab-case
- When in doubt about a fact, note uncertainty explicitly
- Backlinks are critical - every concept should link to related concepts AND sources
