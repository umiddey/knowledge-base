// Builds a single-file deck: engine + <name>.eco.js (+ fonts/) -> <out>.html
// usage: node build.mjs path/to/deck.eco.js out.html [--engine engine-pro.html]
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const ei = args.indexOf('--engine');
const engineArg = ei >= 0 ? args.splice(ei, 2)[1] : null;
const [ecoPath, outPath] = args;
if (!ecoPath || !outPath) { console.error('usage: node build.mjs <deck.eco.js> <out.html> [--engine <engine.html>]'); process.exit(2); }
const engineName = engineArg || 'engine.html';
const enginePath = [resolve(engineName), join(here, engineName), join(here, 'src', engineName)].find((p) => existsSync(p));
if (!enginePath) { console.error(`${engineName} not found (cwd, next to build.mjs, or src/)`); process.exit(1); }
const engine = readFileSync(enginePath, 'utf8');
const eco = readFileSync(ecoPath, 'utf8');
const title = /title:\s*'([^']+)'/.exec(eco)?.[1] ?? 'Explainer';
for (const mark of ['/*ECO*/', '/*TITLE*/', '/*FONTS*/']) {
  if (!engine.includes(mark)) { console.error(`engine placeholder ${mark} missing`); process.exit(1); }
}
// Embedded variable fonts (latin subset) so the deck looks the same on every machine, offline.
// Only families the engine actually names are embedded.
const fonts = [
  ['Inter', 'inter.woff2', '300 800'],
  ['Manrope', 'manrope.woff2', '200 800'],
  ['JetBrains Mono', 'jetbrains-mono.woff2', '100 800'],
].filter(([family]) => engine.includes(family)).map(([family, file, weight]) => {
  const p = [join(here, 'fonts', file), join(here, '..', 'fonts', file)].find((f) => existsSync(f));
  if (!p) { console.warn(`font missing, falling back to system fonts: ${file}`); return ''; }
  const b64 = readFileSync(p).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}).join('\n');
const html = engine.replace('/*TITLE*/', title).replace('/*FONTS*/', () => fonts).replace('/*ECO*/', () => eco);
writeFileSync(outPath, html);
console.log(`wrote ${outPath} (${title}, ${Math.round(html.length / 1024)} KB, engine ${engineName})`);
