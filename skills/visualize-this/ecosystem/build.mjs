// Builds a single-file deck: engine.html + <name>.eco.js (+ fonts/) -> <out>.html
// usage: node build.mjs path/to/deck.eco.js out.html
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const [ecoPath, outPath] = process.argv.slice(2);
if (!ecoPath || !outPath) { console.error('usage: node build.mjs <deck.eco.js> <out.html>'); process.exit(2); }
const enginePath = [join(here, 'engine.html'), join(here, 'src/engine.html')].find((p) => existsSync(p));
if (!enginePath) { console.error('engine.html not found next to build.mjs'); process.exit(1); }
const engine = readFileSync(enginePath, 'utf8');
const eco = readFileSync(ecoPath, 'utf8');
const title = /title:\s*'([^']+)'/.exec(eco)?.[1] ?? 'Explainer';
for (const mark of ['/*ECO*/', '/*TITLE*/', '/*FONTS*/']) {
  if (!engine.includes(mark)) { console.error(`engine placeholder ${mark} missing`); process.exit(1); }
}
// Embedded variable fonts (latin subset) so the deck looks the same on every machine, offline.
const fonts = [
  ['Manrope', 'manrope.woff2', '200 800'],
  ['JetBrains Mono', 'jetbrains-mono.woff2', '100 800'],
].map(([family, file, weight]) => {
  const p = join(here, 'fonts', file);
  if (!existsSync(p)) { console.warn(`font missing, falling back to system fonts: ${p}`); return ''; }
  const b64 = readFileSync(p).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2');}`;
}).join('\n');
const html = engine.replace('/*TITLE*/', title).replace('/*FONTS*/', () => fonts).replace('/*ECO*/', () => eco);
writeFileSync(outPath, html);
console.log(`wrote ${outPath} (${title}, ${Math.round(html.length / 1024)} KB)`);
