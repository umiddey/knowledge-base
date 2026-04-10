import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const topicsDir = path.join(rootDir, "topics");
const siteDir = path.join(rootDir, "site");

const titleFromSlug = (value) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

async function ensureCleanDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
}

function isPresentationHtml(filePath) {
  return filePath.endsWith(".html") && filePath.includes(`${path.sep}output${path.sep}presentations${path.sep}`);
}

function toSiteHref(filePath) {
  return filePath.split(path.sep).join("/");
}

function pageTitleFor(relativePath) {
  const parts = relativePath.split(path.sep);
  const topicSlug = parts[1];
  const fileName = path.basename(relativePath, ".html");
  return {
    topicSlug,
    topicTitle: titleFromSlug(topicSlug),
    pageTitle: titleFromSlug(fileName),
  };
}

function renderIndex(pages) {
  const cards = pages
    .map((page) => {
      const lower = page.pageTitle.toLowerCase();
      const phoneLabel = lower.includes("atlas")
        ? "Deep Atlas"
        : lower.includes("lab")
          ? "Learning Lab"
          : "Presentation";
      return `
        <a class="card" href="${page.href}">
          <div class="eyebrow">${page.topicTitle}</div>
          <h2>${page.pageTitle}</h2>
          <p>${phoneLabel} published from <code>${page.relativePath}</code></p>
          <span class="link">Open page</span>
        </a>
      `;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Knowledge Base Atlases</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #07111f;
      --panel: rgba(9, 21, 40, 0.86);
      --line: rgba(120, 181, 255, 0.18);
      --text: #e9f2ff;
      --muted: #9eb6d5;
      --accent: #6ec1ff;
      --accent-2: #7bffcf;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(circle at top, rgba(84, 156, 255, 0.18), transparent 35%),
        linear-gradient(180deg, #091526 0%, var(--bg) 55%);
      color: var(--text);
      min-height: 100vh;
    }
    main {
      width: min(1100px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 56px 0 80px;
    }
    .hero {
      padding: 32px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(20, 39, 70, 0.94), rgba(8, 18, 35, 0.94));
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
    }
    .hero h1 {
      margin: 0 0 12px;
      font-size: clamp(2rem, 4vw, 4rem);
      line-height: 0.95;
    }
    .hero p {
      margin: 0;
      max-width: 72ch;
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.6;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
      margin-top: 24px;
    }
    .card {
      display: block;
      text-decoration: none;
      color: inherit;
      padding: 22px;
      border-radius: 22px;
      border: 1px solid var(--line);
      background: var(--panel);
      transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: rgba(123, 255, 207, 0.55);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.28);
    }
    .eyebrow {
      color: var(--accent-2);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      margin-bottom: 10px;
    }
    h2 {
      margin: 0 0 10px;
      font-size: 1.3rem;
      line-height: 1.15;
    }
    .card p {
      margin: 0 0 18px;
      color: var(--muted);
      line-height: 1.55;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.9em;
      color: #cbe5ff;
    }
    .link {
      color: var(--accent);
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <section class="hero">
      <div class="eyebrow">Knowledge Base Pages</div>
      <h1>Atlas, Labs, and HTML Presentations</h1>
      <p>This is the published mobile-friendly entrypoint for the repository’s HTML outputs. Open any card below to launch the real page in the browser instead of reading raw source text in the git UI.</p>
    </section>
    <section class="grid">
      ${cards}
    </section>
  </main>
</body>
</html>`;
}

async function main() {
  await ensureCleanDir(siteDir);
  const files = (await walk(topicsDir)).filter(isPresentationHtml).sort();

  const pages = [];
  for (const filePath of files) {
    const relativePath = path.relative(rootDir, filePath);
    const outPath = path.join(siteDir, relativePath);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.copyFile(filePath, outPath);

    const meta = pageTitleFor(relativePath);
    pages.push({
      ...meta,
      relativePath,
      href: toSiteHref(relativePath),
    });
  }

  await fs.writeFile(path.join(siteDir, ".nojekyll"), "");
  await fs.writeFile(path.join(siteDir, "index.html"), renderIndex(pages), "utf8");

  console.log(JSON.stringify({
    pages: pages.length,
    siteDir,
    entries: pages.map((page) => ({ topic: page.topicSlug, href: page.href })),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
