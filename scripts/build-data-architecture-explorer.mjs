import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const topicRoot = path.join(repoRoot, 'topics', 'data-architecture');
const wikiRoot = path.join(topicRoot, 'wiki');
const outputPath = path.join(topicRoot, 'output', 'presentations', 'data-architecture-learning-lab.html');

function slugFromFile(filePath) {
  return path.basename(filePath, '.md');
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function jsonForScript(value) {
  return JSON.stringify(value).replaceAll('</script', '<\\/script');
}

function readLines(text) {
  return text.replaceAll('\r\n', '\n').split('\n');
}

function parseWikilinkBullet(line) {
  const match = line.match(/^- \[\[([^\]]+)\]\](?: - (.+))?$/);
  if (!match) {
    return null;
  }
  return {
    target: match[1],
    note: (match[2] || '').trim(),
  };
}

function parseMarkdownSections(text) {
  const lines = readLines(text);
  const titleLine = lines.find((line) => line.startsWith('# ')) || '# Untitled';
  const title = titleLine.replace(/^# /, '').trim();
  const titleIndex = lines.indexOf(titleLine);
  const sections = {};
  let summaryLines = [];
  let currentSection = null;

  for (let i = titleIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    const sectionMatch = line.match(/^## (.+)$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      sections[currentSection] = [];
      continue;
    }
    if (currentSection) {
      sections[currentSection].push(line);
    } else {
      summaryLines.push(line);
    }
  }

  const normalizedSections = Object.fromEntries(
    Object.entries(sections).map(([name, value]) => [name, value.join('\n').trim()]),
  );

  return {
    title,
    summary: summaryLines.join('\n').trim(),
    sections: normalizedSections,
  };
}

function parseBulletList(sectionText) {
  if (!sectionText) {
    return [];
  }
  return sectionText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^- /, '').trim());
}

function parseConceptLinks(sectionText) {
  return unique(
    (sectionText || '')
      .split('\n')
      .map((line) => line.trim())
      .map((line) => {
        const match = line.match(/^- \[\[([^\]]+)\]\]/);
        return match ? path.basename(match[1]) : null;
      }),
  );
}

function parseSources(sectionText) {
  return (sectionText || '')
    .split('\n')
    .map((line) => line.trim())
    .map(parseWikilinkBullet)
    .filter(Boolean)
    .map((source) => ({
      id: source.target,
      note: source.note,
      label: path.basename(source.target),
    }));
}

function parseInlineLinks(text) {
  return unique(
    Array.from((text || '').matchAll(/\[\[([^\]]+)\]\]/g))
      .map((match) => match[1])
      .filter((value) => !value.startsWith('raw/'))
      .map((value) => path.basename(value)),
  );
}

function extractPreview(text, fallback = '') {
  const normalized = (text || '').replaceAll('\r\n', '\n').trim();
  if (!normalized) {
    return fallback;
  }
  const firstParagraph = normalized.split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim();
  if (firstParagraph.length <= 220) {
    return firstParagraph;
  }
  return `${firstParagraph.slice(0, 217)}...`;
}

function renderMarkdownish(text) {
  if (!text || !text.trim()) {
    return '<p class="empty-state">No detail available in this section.</p>';
  }

  const lines = readLines(text.trim());
  const htmlBlocks = [];
  let paragraphBuffer = [];
  let listBuffer = [];
  let codeBuffer = [];
  let inCode = false;

  const pushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }
    const paragraph = paragraphBuffer.join(' ').trim();
    htmlBlocks.push(
      `<p>${escapeHtml(paragraph).replace(/\[\[([^\]]+)\]\]/g, '<span class="inline-link">$1</span>')}</p>`,
    );
    paragraphBuffer = [];
  };

  const pushList = () => {
    if (!listBuffer.length) {
      return;
    }
    const items = listBuffer.map((line) => `<li>${escapeHtml(line)}</li>`).join('');
    htmlBlocks.push(`<ul class="detail-list">${items}</ul>`);
    listBuffer = [];
  };

  const pushCode = () => {
    if (!codeBuffer.length) {
      return;
    }
    htmlBlocks.push(`<pre class="code-block"><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
    codeBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCode) {
        pushCode();
        inCode = false;
      } else {
        pushParagraph();
        pushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(rawLine);
      continue;
    }

    if (!trimmed) {
      pushParagraph();
      pushList();
      continue;
    }

    if (/^### /.test(trimmed)) {
      pushParagraph();
      pushList();
      htmlBlocks.push(`<h4>${escapeHtml(trimmed.replace(/^### /, ''))}</h4>`);
      continue;
    }

    if (trimmed.startsWith('- ')) {
      pushParagraph();
      listBuffer.push(trimmed.replace(/^- /, ''));
      continue;
    }

    if (trimmed.includes('|') && trimmed.split('|').length > 2) {
      pushParagraph();
      pushList();
      htmlBlocks.push(`<pre class="code-block"><code>${escapeHtml(rawLine)}</code></pre>`);
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  pushParagraph();
  pushList();
  pushCode();

  return htmlBlocks.join('');
}

function renderKeyPoint(point) {
  return `<li>${escapeHtml(point)}</li>`;
}

async function parseIndex() {
  const content = await fs.readFile(path.join(wikiRoot, '_index.md'), 'utf8');
  const lines = readLines(content);
  const metadata = new Map();
  const conceptGroups = [];
  let currentMode = null;
  let currentGroup = null;

  for (const line of lines) {
    if (line.startsWith('## Concepts')) {
      currentMode = 'concept';
      currentGroup = null;
      continue;
    }
    if (line.startsWith('## Connections')) {
      currentMode = 'connection';
      currentGroup = 'Connections';
      continue;
    }
    if (line.startsWith('### ')) {
      currentGroup = line.replace(/^### /, '').trim();
      if (currentMode === 'concept') {
        conceptGroups.push(currentGroup);
      }
      continue;
    }

    const bulletMatch = line.match(/^- \[\[([^\]]+)\]\] - (.+)$/);
    if (!bulletMatch) {
      continue;
    }

    const slug = bulletMatch[1];
    metadata.set(slug, {
      group: currentGroup || (currentMode === 'connection' ? 'Connections' : 'General'),
      deck: currentMode === 'connection' ? 'connection' : 'concept',
      blurb: bulletMatch[2].trim(),
    });
  }

  return {
    metadata,
    conceptGroups: unique(conceptGroups),
  };
}

async function readArticleCollection(dirName, indexMetadata) {
  const dirPath = path.join(wikiRoot, dirName);
  const files = (await fs.readdir(dirPath))
    .filter((name) => name.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b));

  const records = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const raw = await fs.readFile(fullPath, 'utf8');
    const parsed = parseMarkdownSections(raw);
    const slug = slugFromFile(file);
    const meta = indexMetadata.get(slug) || {
      group: dirName === 'connections' ? 'Connections' : 'General',
      deck: dirName === 'connections' ? 'connection' : 'concept',
      blurb: '',
    };

    const relatedSection = parsed.sections['Related Concepts'] || parsed.sections['Concepts Linked'] || '';
    const sourcesSection = parsed.sections['Sources'] || '';

    records.push({
      id: slug,
      kind: dirName === 'connections' ? 'connection' : 'concept',
      title: parsed.title,
      group: meta.group,
      blurb: meta.blurb,
      summary: parsed.summary,
      summaryPreview: extractPreview(parsed.summary, meta.blurb),
      keyPoints: parseBulletList(parsed.sections['Key Points'] || parsed.sections['Key insights'] || parsed.sections['Key Insights'] || ''),
      detailHtml: renderMarkdownish(parsed.summary),
      exampleHtml: renderMarkdownish(parsed.sections['Examples'] || parsed.sections['Example'] || parsed.sections['Analysis'] || ''),
      relatedConcepts: parseConceptLinks(relatedSection),
      inlineConcepts: parseInlineLinks(raw),
      sourceRefs: parseSources(sourcesSection),
      wikiPath: `../../wiki/${dirName}/${file}`,
    });
  }

  return records;
}

function cleanSourceLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return '';
  }
  if (trimmed.startsWith('![') || trimmed.startsWith('[') || trimmed.startsWith('](')) {
    return '';
  }
  if (trimmed.includes('data:image/')) {
    return '';
  }
  if (/^[\W_]+$/.test(trimmed)) {
    return '';
  }
  if (!/[A-Za-z]{3,}/.test(trimmed)) {
    return '';
  }
  if (trimmed.length < 35) {
    return '';
  }
  return trimmed.replace(/\s+/g, ' ');
}

async function readSourceRecord(sourceId, backlinks) {
  const fullPath = path.join(topicRoot, `${sourceId}.md`);
  const raw = await fs.readFile(fullPath, 'utf8');
  const lines = readLines(raw);
  const titleLine = lines.find((line) => line.startsWith('# ')) || `# ${path.basename(sourceId)}`;
  const title = titleLine.replace(/^# /, '').trim();
  const sourceLine = lines.find((line) => line.startsWith('Source: ')) || '';
  const url = sourceLine.replace(/^Source: /, '').trim();
  const headings = unique(
    lines
      .filter((line) => /^##+ /.test(line))
      .map((line) => line.replace(/^##+ /, '').trim())
      .slice(0, 6),
  );

  const excerptLines = [];
  for (const line of lines) {
    const cleaned = cleanSourceLine(line);
    if (!cleaned) {
      continue;
    }
    excerptLines.push(cleaned);
    if (excerptLines.join(' ').length > 900 || excerptLines.length >= 6) {
      break;
    }
  }

  return {
    id: sourceId,
    title,
    url,
    headings,
    excerpt: excerptLines.join('\n\n') || 'Open the raw source file to inspect the full captured text and structure.',
    rawPath: `../../${sourceId}.md`,
    backlinks,
  };
}

function buildNetworkSummary(concepts, connections) {
  return concepts.map((concept) => {
    const connectionIds = connections
      .filter((connection) => connection.relatedConcepts.includes(concept.id))
      .map((connection) => connection.id);

    return {
      ...concept,
      connectionIds,
    };
  });
}

function buildHtml(data) {
  const initialId = data.concepts[0]?.id || data.connections[0]?.id || data.sources[0]?.id || '';
  const initialKind = data.concepts.length ? 'concept' : data.connections.length ? 'connection' : 'source';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Data Architecture Atlas</title>
  <style>
    :root {
      --bg: #f3ede3;
      --bg-strong: #ebe0cf;
      --paper: rgba(255, 251, 245, 0.88);
      --paper-strong: #fffdf9;
      --ink: #182126;
      --muted: #59666f;
      --line: rgba(114, 94, 65, 0.18);
      --accent: #a84a23;
      --accent-2: #0e6e73;
      --accent-3: #d7b35f;
      --good: #246344;
      --shadow: 0 24px 60px rgba(48, 34, 18, 0.14);
      --radius-xl: 28px;
      --radius-lg: 22px;
      --radius-md: 16px;
      --sans: "Avenir Next", "Segoe UI", sans-serif;
      --display: "Iowan Old Style", "Palatino Linotype", serif;
      --mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      color: var(--ink);
      font-family: var(--sans);
      background:
        radial-gradient(circle at top left, rgba(168, 74, 35, 0.16), transparent 24rem),
        radial-gradient(circle at top right, rgba(14, 110, 115, 0.16), transparent 24rem),
        linear-gradient(180deg, #f7f1e8 0%, #ede2d1 55%, #f4ecdf 100%);
      line-height: 1.5;
    }

    a {
      color: inherit;
    }

    main {
      width: min(1400px, calc(100vw - 28px));
      margin: 0 auto;
      padding: 24px 0 44px;
    }

    .shell {
      display: grid;
      grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.95fr);
      gap: 20px;
      align-items: start;
    }

    .hero,
    .surface,
    .inspector {
      background: var(--paper);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .hero {
      padding: 26px;
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;
    }

    .hero::after {
      content: "";
      position: absolute;
      inset: auto -80px -80px auto;
      width: 240px;
      height: 240px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(168, 74, 35, 0.18), rgba(14, 110, 115, 0.24));
      filter: blur(6px);
    }

    .hero-grid,
    .stats-grid,
    .deck-grid,
    .card-grid,
    .mini-grid {
      display: grid;
      gap: 16px;
    }

    .hero-grid {
      grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.85fr);
      align-items: start;
    }

    .eyebrow,
    .pill,
    .meta-line,
    .micro {
      font-family: var(--mono);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.72rem;
    }

    .eyebrow {
      color: var(--accent);
      margin-bottom: 10px;
    }

    h1,
    h2,
    h3,
    h4 {
      margin: 0;
      line-height: 1.05;
    }

    h1,
    h2 {
      font-family: var(--display);
    }

    h1 {
      font-size: clamp(2.8rem, 5vw, 5rem);
      max-width: 11ch;
      margin-bottom: 12px;
    }

    h2 {
      font-size: clamp(1.55rem, 2vw, 2.2rem);
      margin-bottom: 12px;
    }

    p {
      margin: 0 0 12px;
      color: var(--muted);
    }

    .hero p {
      max-width: 70ch;
    }

    .pill-row,
    .chip-row,
    .breadcrumbs,
    .source-link-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .pill,
    .chip,
    .ghost-chip {
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 7px 12px;
      background: rgba(255, 255, 255, 0.68);
      color: var(--ink);
    }

    .status-card,
    .control-panel,
    .deck,
    .group-section,
    .inspector-block,
    .deep-block,
    .mini-card {
      background: rgba(255, 255, 255, 0.74);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
    }

    .status-card,
    .control-panel,
    .deck,
    .group-section,
    .inspector-block,
    .deep-block,
    .mini-card {
      padding: 18px;
    }

    .stats-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      margin-top: 18px;
    }

    .status-card strong {
      display: block;
      font-size: 1.9rem;
      margin-top: 6px;
      color: var(--ink);
    }

    .hero-links {
      margin-top: 16px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .button,
    .card-button,
    .chip-button,
    .source-button {
      appearance: none;
      border: 1px solid rgba(114, 94, 65, 0.28);
      border-radius: 15px;
      background: linear-gradient(180deg, #fffdf8 0%, #f4e7d2 100%);
      color: var(--ink);
      font: inherit;
      cursor: pointer;
      transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .button:hover,
    .card-button:hover,
    .chip-button:hover,
    .source-button:hover,
    .button:focus-visible,
    .card-button:focus-visible,
    .chip-button:focus-visible,
    .source-button:focus-visible {
      outline: none;
      transform: translateY(-1px);
      border-color: rgba(168, 74, 35, 0.45);
      box-shadow: 0 10px 24px rgba(168, 74, 35, 0.12);
    }

    .button {
      padding: 11px 14px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .button.secondary {
      background: rgba(255, 255, 255, 0.7);
    }

    .control-panel {
      margin-bottom: 18px;
    }

    .control-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(200px, 0.8fr);
      gap: 12px;
      margin-top: 12px;
    }

    .search-input {
      width: 100%;
      border-radius: 16px;
      border: 1px solid rgba(114, 94, 65, 0.24);
      background: #fffdfa;
      color: var(--ink);
      padding: 13px 14px;
      font: inherit;
    }

    .search-input:focus-visible {
      outline: 2px solid rgba(14, 110, 115, 0.22);
      border-color: rgba(14, 110, 115, 0.38);
    }

    .deck-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-bottom: 18px;
    }

    .deck-title-row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      margin-bottom: 10px;
    }

    .count-badge {
      border-radius: 999px;
      padding: 6px 10px;
      background: rgba(14, 110, 115, 0.08);
      color: var(--accent-2);
      font-family: var(--mono);
      font-size: 0.74rem;
    }

    .group-section {
      margin-bottom: 18px;
    }

    .group-header {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: baseline;
      margin-bottom: 14px;
    }

    .card-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    .card-button {
      width: 100%;
      text-align: left;
      padding: 16px;
      background: rgba(255, 255, 255, 0.84);
    }

    .card-button.active {
      border-color: rgba(168, 74, 35, 0.55);
      box-shadow: 0 14px 28px rgba(168, 74, 35, 0.14);
    }

    .card-topline {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      align-items: center;
      margin-bottom: 10px;
      color: var(--muted);
    }

    .card-button h4 {
      font-size: 1.06rem;
      margin-bottom: 8px;
    }

    .card-preview {
      font-size: 0.96rem;
      min-height: 5.5em;
    }

    .meta-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 12px;
    }

    .chip,
    .ghost-chip {
      font-size: 0.8rem;
      padding: 6px 10px;
    }

    .ghost-chip {
      background: rgba(14, 110, 115, 0.06);
      color: var(--accent-2);
    }

    .surface {
      padding: 18px;
    }

    .inspector {
      position: sticky;
      top: 18px;
      padding: 18px;
    }

    .inspector-header {
      display: grid;
      gap: 12px;
      margin-bottom: 16px;
    }

    .breadcrumbs {
      gap: 8px;
    }

    .breadcrumb-button {
      border: none;
      background: transparent;
      color: var(--muted);
      padding: 0;
      font: inherit;
      cursor: pointer;
    }

    .inspector-subtitle {
      color: var(--muted);
      font-size: 0.95rem;
    }

    .inspector-stack {
      display: grid;
      gap: 14px;
    }

    .inspector-block h3,
    .deep-block h3 {
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .detail-list {
      margin: 0;
      padding-left: 18px;
      color: var(--muted);
    }

    .detail-list li + li {
      margin-top: 8px;
    }

    .code-block {
      margin: 0;
      padding: 14px;
      border-radius: 16px;
      background: #f5efe7;
      border: 1px solid rgba(114, 94, 65, 0.2);
      overflow-x: auto;
      font: 0.85rem/1.45 var(--mono);
      color: #433225;
      white-space: pre-wrap;
    }

    .inline-link {
      color: var(--accent-2);
      font-family: var(--mono);
      font-size: 0.93em;
    }

    .chip-button,
    .source-button {
      padding: 9px 11px;
      background: rgba(255, 255, 255, 0.88);
      text-align: left;
    }

    .chip-button.empty {
      cursor: default;
      opacity: 0.75;
    }

    .source-button {
      width: 100%;
      display: block;
      margin-top: 10px;
    }

    .source-button:first-child {
      margin-top: 0;
    }

    .source-title {
      font-weight: 700;
      display: block;
      margin-bottom: 6px;
    }

    .source-note {
      color: var(--muted);
      font-size: 0.93rem;
      display: block;
    }

    .deep-block p:last-child,
    .inspector-block p:last-child {
      margin-bottom: 0;
    }

    .mini-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mini-card strong {
      display: block;
      font-size: 1.2rem;
      margin-top: 6px;
    }

    .empty-state {
      color: var(--muted);
      margin: 0;
    }

    .footer-note {
      margin-top: 18px;
      color: var(--muted);
      text-align: center;
      font-size: 0.95rem;
    }

    [data-hidden="true"] {
      display: none !important;
    }

    @media (max-width: 1120px) {
      .shell {
        grid-template-columns: 1fr;
      }

      .inspector {
        position: static;
      }
    }

    @media (max-width: 900px) {
      .hero-grid,
      .stats-grid,
      .deck-grid,
      .control-grid,
      .mini-grid {
        grid-template-columns: 1fr;
      }

      main {
        width: min(100vw - 18px, 1400px);
      }

      .hero,
      .surface,
      .inspector {
        padding: 16px;
      }
    }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow">Layered Knowledge Explorer</div>
          <h1>Data Architecture Atlas</h1>
          <p>The front layer is the operating map: concepts and the connection articles that explain how those concepts collide in the real world. Click any card and the right-hand inspector drops you into the deeper article detail. Click a cited source and you go one layer deeper again into the evidence trail underneath the wiki.</p>
          <p>This is not a slide deck pretending to be knowledge. It is the topic turned into a browsable architecture surface: concepts first, relationships second, source-backed depth underneath.</p>
          <div class="pill-row">
            <span class="pill">Concept Layer</span>
            <span class="pill">Connection Layer</span>
            <span class="pill">Source Depth</span>
            <span class="pill">Wiki-Synced</span>
          </div>
          <div class="hero-links">
            <a class="button" href="../../wiki/_index.md">Open Wiki Index</a>
            <a class="button secondary" href="../../wiki/_sources.md">Open Source Index</a>
          </div>
        </div>
        <aside class="control-panel">
          <div class="eyebrow">Atlas Status</div>
          <h2>Built Directly From The Topic</h2>
          <p>The cards and inspector content are generated from the markdown knowledge base, so the HTML stays aligned with the wiki corpus instead of drifting into decorative nonsense.</p>
          <div class="mini-grid">
            <div class="mini-card">
              <div class="micro">Concepts</div>
              <strong>${data.concepts.length}</strong>
              <p>front-layer concept nodes</p>
            </div>
            <div class="mini-card">
              <div class="micro">Connections</div>
              <strong>${data.connections.length}</strong>
              <p>cross-concept bridge articles</p>
            </div>
            <div class="mini-card">
              <div class="micro">Sources</div>
              <strong>${data.sources.length}</strong>
              <p>deep evidence targets</p>
            </div>
            <div class="mini-card">
              <div class="micro">Groups</div>
              <strong>${data.groups.length}</strong>
              <p>concept clusters from the index</p>
            </div>
          </div>
        </aside>
      </div>
      <div class="stats-grid">
        <div class="status-card">
          <div class="micro">Layer 1</div>
          <strong>Concepts</strong>
          <span>the core ideas, grouped exactly the way the topic index frames the space</span>
        </div>
        <div class="status-card">
          <div class="micro">Layer 2</div>
          <strong>Connections</strong>
          <span>the places where architecture decisions actually become tradeoffs, failure modes, and organizational consequences</span>
        </div>
        <div class="status-card">
          <div class="micro">Layer 3</div>
          <strong>Sources</strong>
          <span>click-through evidence showing where each wiki article pulls its deeper detail from</span>
        </div>
      </div>
    </section>

    <div class="shell">
      <section class="surface">
        <div class="control-panel">
          <div class="eyebrow">Explore The Topic</div>
          <h2>Front Layer</h2>
          <p>Search across concepts, connections, and blurbs. Then click a card to open the inspector and drill deeper.</p>
          <div class="control-grid">
            <input id="search-input" class="search-input" type="search" placeholder="Search for lakehouse, governance, CDC, semantic layer..." aria-label="Search the data architecture atlas">
            <div class="pill-row" id="deck-filters">
              <button class="button" data-filter="all" type="button">All Layers</button>
              <button class="button secondary" data-filter="concept" type="button">Concepts</button>
              <button class="button secondary" data-filter="connection" type="button">Connections</button>
            </div>
          </div>
        </div>

        <div class="deck-grid">
          <div class="deck">
            <div class="deck-title-row">
              <div>
                <div class="eyebrow">Layer 1</div>
                <h3>Concepts</h3>
              </div>
              <div class="count-badge" id="concept-count">${data.concepts.length} visible</div>
            </div>
            <p>Foundational building blocks: layers, modeling, ingestion, governance, serving, reliability, cost, access, and the rest of the architecture spine.</p>
          </div>
          <div class="deck">
            <div class="deck-title-row">
              <div>
                <div class="eyebrow">Layer 2</div>
                <h3>Connections</h3>
              </div>
              <div class="count-badge" id="connection-count">${data.connections.length} visible</div>
            </div>
            <p>The cross-links that matter in practice: how governance changes modeling, how observability enables reliability, how cost reshapes architecture choices, and so on.</p>
          </div>
        </div>

        <div id="concept-groups"></div>

        <section class="group-section" id="connections-section">
          <div class="group-header">
            <div>
              <div class="eyebrow">Bridge Articles</div>
              <h2>Connection Layer</h2>
            </div>
            <div class="count-badge" id="connection-section-count">${data.connections.length} cards</div>
          </div>
          <div class="card-grid" id="connection-grid"></div>
        </section>

        <p class="footer-note">Built from <code>topics/data-architecture/wiki</code> and its cited raw source files.</p>
      </section>

      <aside class="inspector">
        <div class="inspector-header">
          <div class="eyebrow">Deep Detail</div>
          <div class="breadcrumbs" id="breadcrumbs"></div>
          <div>
            <h2 id="inspector-title">Select A Card</h2>
            <p class="inspector-subtitle" id="inspector-subtitle">The right-hand inspector shows the selected concept, connection, or source evidence.</p>
          </div>
        </div>
        <div class="inspector-stack" id="inspector-content"></div>
      </aside>
    </div>
  </main>

  <script id="atlas-data" type="application/json">${jsonForScript(data)}</script>
  <script>
    const atlasData = JSON.parse(document.getElementById('atlas-data').textContent);
    const searchInput = document.getElementById('search-input');
    const conceptGroupsEl = document.getElementById('concept-groups');
    const connectionGridEl = document.getElementById('connection-grid');
    const breadcrumbsEl = document.getElementById('breadcrumbs');
    const inspectorTitleEl = document.getElementById('inspector-title');
    const inspectorSubtitleEl = document.getElementById('inspector-subtitle');
    const inspectorContentEl = document.getElementById('inspector-content');
    const conceptCountEl = document.getElementById('concept-count');
    const connectionCountEl = document.getElementById('connection-count');
    const connectionSectionCountEl = document.getElementById('connection-section-count');
    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    const selectionKey = 'data-architecture-atlas-selection';

    const conceptMap = new Map(atlasData.concepts.map((item) => [item.id, item]));
    const connectionMap = new Map(atlasData.connections.map((item) => [item.id, item]));
    const sourceMap = new Map(atlasData.sources.map((item) => [item.id, item]));

    let currentFilter = 'all';
    let currentQuery = '';
    let selection = { kind: '${initialKind}', id: ${JSON.stringify(initialId)} };

    function escapeText(value) {
      return String(value || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function saveSelection() {
      localStorage.setItem(selectionKey, JSON.stringify(selection));
    }

    function loadSelection() {
      try {
        const saved = JSON.parse(localStorage.getItem(selectionKey) || 'null');
        if (!saved || !saved.kind || !saved.id) {
          return;
        }
        if (saved.kind === 'concept' && conceptMap.has(saved.id)) {
          selection = saved;
        }
        if (saved.kind === 'connection' && connectionMap.has(saved.id)) {
          selection = saved;
        }
        if (saved.kind === 'source' && sourceMap.has(saved.id)) {
          selection = saved;
        }
      } catch (_error) {
      }
    }

    function normalize(value) {
      return String(value || '').toLowerCase();
    }

    function matchesQuery(item) {
      if (!currentQuery) {
        return true;
      }
      const haystack = [
        item.title,
        item.group,
        item.blurb,
        item.summaryPreview,
        ...(item.keyPoints || []),
      ].join(' ').toLowerCase();
      return haystack.includes(currentQuery);
    }

    function conceptVisible(item) {
      if (currentFilter === 'connection') {
        return false;
      }
      return matchesQuery(item);
    }

    function connectionVisible(item) {
      if (currentFilter === 'concept') {
        return false;
      }
      return matchesQuery(item);
    }

    function cardMetaChips(item) {
      const chips = [];
      if (item.kind === 'concept') {
        chips.push('<span class="ghost-chip">' + escapeText(item.group) + '</span>');
        chips.push('<span class="chip">' + escapeText(item.sourceRefs.length + ' sources') + '</span>');
        chips.push('<span class="chip">' + escapeText(item.connectionIds.length + ' connections') + '</span>');
      } else {
        chips.push('<span class="ghost-chip">Connection</span>');
        chips.push('<span class="chip">' + escapeText(item.relatedConcepts.length + ' linked concepts') + '</span>');
        chips.push('<span class="chip">' + escapeText(item.sourceRefs.length + ' sources') + '</span>');
      }
      return chips.join('');
    }

    function renderConceptGroups() {
      const sections = atlasData.groups.map((group) => {
        const items = atlasData.concepts.filter((concept) => concept.group === group && conceptVisible(concept));
        const hidden = items.length === 0;
        const cards = items.map((item) => {
          const isActive = selection.kind === 'concept' && selection.id === item.id;
          return '<button class="card-button' + (isActive ? ' active' : '') + '" type="button" data-kind="concept" data-id="' + item.id + '">' +
            '<div class="card-topline"><span class="meta-line">' + escapeText(item.group) + '</span><span class="micro">' + escapeText(item.id) + '</span></div>' +
            '<h4>' + escapeText(item.title) + '</h4>' +
            '<p class="card-preview">' + escapeText(item.summaryPreview) + '</p>' +
            '<div class="meta-row">' + cardMetaChips(item) + '</div>' +
          '</button>';
        }).join('');
        return '<section class="group-section" data-hidden="' + hidden + '">' +
          '<div class="group-header"><div><div class="eyebrow">Concept Cluster</div><h2>' + escapeText(group) + '</h2></div><div class="count-badge">' + escapeText(items.length + ' cards') + '</div></div>' +
          '<div class="card-grid">' + cards + '</div>' +
        '</section>';
      }).join('');

      conceptGroupsEl.innerHTML = sections;
      conceptCountEl.textContent = atlasData.concepts.filter(conceptVisible).length + ' visible';
    }

    function renderConnectionGrid() {
      const items = atlasData.connections.filter(connectionVisible);
      connectionGridEl.innerHTML = items.map((item) => {
        const isActive = selection.kind === 'connection' && selection.id === item.id;
        const linked = item.relatedConcepts
          .map((conceptId) => conceptMap.get(conceptId))
          .filter(Boolean)
          .map((concept) => '<span class="chip">' + escapeText(concept.title) + '</span>')
          .join('');

        return '<button class="card-button' + (isActive ? ' active' : '') + '" type="button" data-kind="connection" data-id="' + item.id + '">' +
          '<div class="card-topline"><span class="meta-line">' + escapeText(item.group) + '</span><span class="micro">' + escapeText(item.id) + '</span></div>' +
          '<h4>' + escapeText(item.title) + '</h4>' +
          '<p class="card-preview">' + escapeText(item.summaryPreview) + '</p>' +
          '<div class="meta-row">' + cardMetaChips(item) + '</div>' +
          '<div class="chip-row" style="margin-top: 12px;">' + linked + '</div>' +
        '</button>';
      }).join('');

      const visibleCount = items.length;
      connectionCountEl.textContent = visibleCount + ' visible';
      connectionSectionCountEl.textContent = visibleCount + ' cards';
      document.getElementById('connections-section').dataset.hidden = visibleCount === 0;
    }

    function sourceButtons(sourceRefs) {
      if (!sourceRefs.length) {
        return '<button class="chip-button empty" type="button">No source citations on this article</button>';
      }
      return sourceRefs.map((ref) => {
        const source = sourceMap.get(ref.id);
        const title = source ? source.title : ref.label;
        return '<button class="source-button" type="button" data-kind="source" data-id="' + ref.id + '">' +
          '<span class="source-title">' + escapeText(title) + '</span>' +
          '<span class="source-note">' + escapeText(ref.note || 'Open the cited raw source for the evidence layer.') + '</span>' +
        '</button>';
      }).join('');
    }

    function conceptButtons(conceptIds) {
      if (!conceptIds.length) {
        return '<button class="chip-button empty" type="button">No linked concepts on this record</button>';
      }
      return conceptIds
        .map((conceptId) => conceptMap.get(conceptId))
        .filter(Boolean)
        .map((concept) => '<button class="chip-button" type="button" data-kind="concept" data-id="' + concept.id + '">' + escapeText(concept.title) + '</button>')
        .join('');
    }

    function connectionButtons(connectionIds) {
      if (!connectionIds.length) {
        return '<button class="chip-button empty" type="button">No connection article cites this concept directly</button>';
      }
      return connectionIds
        .map((connectionId) => connectionMap.get(connectionId))
        .filter(Boolean)
        .map((connection) => '<button class="chip-button" type="button" data-kind="connection" data-id="' + connection.id + '">' + escapeText(connection.title) + '</button>')
        .join('');
    }

    function renderConceptInspector(item) {
      const relatedFromInline = item.inlineConcepts.filter((conceptId) => conceptId !== item.id);
      const linkedConceptIds = Array.from(new Set(item.relatedConcepts.concat(relatedFromInline)));
      inspectorTitleEl.textContent = item.title;
      inspectorSubtitleEl.textContent = item.group + ' concept · ' + item.sourceRefs.length + ' cited sources · ' + item.connectionIds.length + ' connection articles';

      inspectorContentEl.innerHTML =
        '<section class="inspector-block">' +
          '<div class="eyebrow">Article Summary</div>' +
          item.detailHtml +
          '<div class="meta-row" style="margin-top: 12px;">' +
            '<span class="ghost-chip">' + escapeText(item.group) + '</span>' +
            '<span class="chip">' + escapeText(item.id) + '</span>' +
          '</div>' +
          '<div class="hero-links" style="margin-top: 14px;">' +
            '<a class="button secondary" href="' + item.wikiPath + '">Open Wiki Article</a>' +
          '</div>' +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Key Points</h3>' +
          (item.keyPoints.length ? '<ul class="detail-list">' + item.keyPoints.map((point) => '<li>' + escapeText(point) + '</li>').join('') + '</ul>' : '<p class="empty-state">This article has no explicit key point list.</p>') +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Examples And Mechanism</h3>' +
          item.exampleHtml +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Connection Articles</h3>' +
          '<div class="chip-row">' + connectionButtons(item.connectionIds) + '</div>' +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Related Concepts</h3>' +
          '<div class="chip-row">' + conceptButtons(linkedConceptIds) + '</div>' +
        '</section>' +
        '<section class="deep-block">' +
          '<h3>Source Layer</h3>' +
          '<p>Click a citation to drop one layer deeper into the raw evidence and captured source text.</p>' +
          sourceButtons(item.sourceRefs) +
        '</section>';
    }

    function renderConnectionInspector(item) {
      inspectorTitleEl.textContent = item.title;
      inspectorSubtitleEl.textContent = 'Connection article · ' + item.relatedConcepts.length + ' linked concepts · ' + item.sourceRefs.length + ' cited sources';

      inspectorContentEl.innerHTML =
        '<section class="inspector-block">' +
          '<div class="eyebrow">Connection Summary</div>' +
          item.detailHtml +
          '<div class="hero-links" style="margin-top: 14px;">' +
            '<a class="button secondary" href="' + item.wikiPath + '">Open Connection Article</a>' +
          '</div>' +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Key Insights</h3>' +
          (item.keyPoints.length ? '<ul class="detail-list">' + item.keyPoints.map((point) => '<li>' + escapeText(point) + '</li>').join('') + '</ul>' : '<p class="empty-state">This connection article frames its insight in narrative form rather than a bullet list.</p>') +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Deeper Analysis</h3>' +
          item.exampleHtml +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Concepts Linked</h3>' +
          '<div class="chip-row">' + conceptButtons(item.relatedConcepts) + '</div>' +
        '</section>' +
        '<section class="deep-block">' +
          '<h3>Source Layer</h3>' +
          '<p>These are the supporting raw sources cited by the connection article.</p>' +
          sourceButtons(item.sourceRefs) +
        '</section>';
    }

    function renderSourceInspector(item) {
      inspectorTitleEl.textContent = item.title;
      inspectorSubtitleEl.textContent = 'Raw source evidence · ' + item.backlinks.length + ' wiki articles cite this file';

      const backlinks = item.backlinks.map((backlink) => {
        return '<button class="source-button" type="button" data-kind="' + backlink.kind + '" data-id="' + backlink.id + '">' +
          '<span class="source-title">' + escapeText(backlink.title) + '</span>' +
          '<span class="source-note">' + escapeText(backlink.note || 'Open the citing article.') + '</span>' +
        '</button>';
      }).join('');

      const headings = item.headings.length
        ? '<div class="chip-row">' + item.headings.map((heading) => '<span class="chip">' + escapeText(heading) + '</span>').join('') + '</div>'
        : '<p class="empty-state">No major headings were extracted from this raw source file.</p>';

      const sourceUrl = item.url
        ? '<a class="button secondary" href="' + item.url + '">Open Original URL</a>'
        : '';

      inspectorContentEl.innerHTML =
        '<section class="inspector-block">' +
          '<div class="eyebrow">Source Overview</div>' +
          '<p>This is the evidence layer. The excerpt below is pulled from the raw captured source file under the topic.</p>' +
          '<div class="meta-row">' +
            '<span class="ghost-chip">' + escapeText(item.id) + '</span>' +
            '<span class="chip">' + escapeText(item.backlinks.length + ' citations') + '</span>' +
          '</div>' +
          '<div class="hero-links" style="margin-top: 14px;">' +
            '<a class="button" href="' + item.rawPath + '">Open Raw Source File</a>' +
            sourceUrl +
          '</div>' +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Captured Excerpt</h3>' +
          item.excerpt.split('\\n\\n').map((part) => '<p>' + escapeText(part) + '</p>').join('') +
        '</section>' +
        '<section class="inspector-block">' +
          '<h3>Detected Headings</h3>' +
          headings +
        '</section>' +
        '<section class="deep-block">' +
          '<h3>Cited By</h3>' +
          '<p>Jump back up to any concept or connection that cites this source.</p>' +
          backlinks +
        '</section>';
    }

    function renderBreadcrumbs() {
      const crumbs = [];
      crumbs.push('<button class="breadcrumb-button" type="button" data-kind="concept" data-id="' + atlasData.concepts[0].id + '">Atlas</button>');
      if (selection.kind === 'source') {
        const source = sourceMap.get(selection.id);
        const parent = source && source.backlinks[0];
        if (parent) {
          crumbs.push('<span>/</span>');
          crumbs.push('<button class="breadcrumb-button" type="button" data-kind="' + parent.kind + '" data-id="' + parent.id + '">' + escapeText(parent.title) + '</button>');
        }
      }
      const currentTitle = selection.kind === 'concept'
        ? conceptMap.get(selection.id)?.title
        : selection.kind === 'connection'
          ? connectionMap.get(selection.id)?.title
          : sourceMap.get(selection.id)?.title;
      if (currentTitle) {
        crumbs.push('<span>/</span>');
        crumbs.push('<span class="micro">' + escapeText(currentTitle) + '</span>');
      }
      breadcrumbsEl.innerHTML = crumbs.join('');
    }

    function renderInspector() {
      if (selection.kind === 'concept' && conceptMap.has(selection.id)) {
        renderConceptInspector(conceptMap.get(selection.id));
      } else if (selection.kind === 'connection' && connectionMap.has(selection.id)) {
        renderConnectionInspector(connectionMap.get(selection.id));
      } else if (selection.kind === 'source' && sourceMap.has(selection.id)) {
        renderSourceInspector(sourceMap.get(selection.id));
      } else {
        inspectorTitleEl.textContent = 'Select A Card';
        inspectorSubtitleEl.textContent = 'The right-hand inspector shows the selected concept, connection, or source evidence.';
        inspectorContentEl.innerHTML = '<p class="empty-state">No record selected.</p>';
      }
      renderBreadcrumbs();
      saveSelection();
    }

    function render() {
      renderConceptGroups();
      renderConnectionGrid();
      renderInspector();
    }

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-kind][data-id]');
      if (trigger) {
        selection = {
          kind: trigger.getAttribute('data-kind'),
          id: trigger.getAttribute('data-id'),
        };
        render();
        return;
      }

      const filterButton = event.target.closest('[data-filter]');
      if (filterButton) {
        currentFilter = filterButton.getAttribute('data-filter');
        filterButtons.forEach((button) => {
          button.classList.toggle('secondary', button !== filterButton && button.dataset.filter !== 'all');
          button.style.borderColor = button === filterButton ? 'rgba(168, 74, 35, 0.48)' : '';
        });
        render();
      }
    });

    searchInput.addEventListener('input', (event) => {
      currentQuery = normalize(event.target.value.trim());
      render();
    });

    loadSelection();
    render();
  </script>
</body>
</html>`;
}

async function main() {
  const index = await parseIndex();
  const concepts = await readArticleCollection('concepts', index.metadata);
  const connections = await readArticleCollection('connections', index.metadata);
  const conceptsWithNetwork = buildNetworkSummary(concepts, connections);

  const backlinkMap = new Map();
  for (const article of conceptsWithNetwork.concat(connections)) {
    for (const ref of article.sourceRefs) {
      if (!backlinkMap.has(ref.id)) {
        backlinkMap.set(ref.id, []);
      }
      backlinkMap.get(ref.id).push({
        id: article.id,
        kind: article.kind,
        title: article.title,
        note: ref.note,
      });
    }
  }

  const sources = [];
  for (const sourceId of unique(Array.from(backlinkMap.keys())).sort((a, b) => a.localeCompare(b))) {
    sources.push(await readSourceRecord(sourceId, backlinkMap.get(sourceId) || []));
  }

  const data = {
    groups: index.conceptGroups,
    concepts: conceptsWithNetwork,
    connections,
    sources,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, buildHtml(data), 'utf8');
  console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
