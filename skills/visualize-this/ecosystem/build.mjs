// Builds a single-file deck: engine.html + <name>.eco.js -> <out>.html
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
if (!engine.includes('/*ECO*/') || !engine.includes('/*TITLE*/')) { console.error('engine placeholders missing'); process.exit(1); }
writeFileSync(outPath, engine.replace('/*TITLE*/', title).replace('/*ECO*/', () => eco));
console.log(`wrote ${outPath} (${title})`);
