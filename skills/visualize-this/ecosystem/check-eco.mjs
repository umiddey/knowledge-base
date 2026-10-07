// Layout + playthrough checker for forest+trees decks.
// usage: PLAYWRIGHT=/path/playwright/index.mjs node check-eco.mjs deck.html [--play] [--shots dir 1,5,9] [--mid]
//   default : every step jumped to its END state; checks text overflow, actor overlap,
//             actors off the inner stage, page errors.
//   --play  : plays every step with full animation (slow) and fails on any error.
//   --shots : screenshots the listed steps (1-based) at end state; --mid also grabs one mid-animation frame.
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const args = process.argv.slice(2);
const deck = args[0];
if (!deck) { console.error('usage: node check-eco.mjs deck.html [--play] [--shots dir n,n]'); process.exit(2); }
const { chromium } = await import(process.env.PLAYWRIGHT ?? 'playwright');
const play = args.includes('--play');
const mid = args.includes('--mid');
const si = args.indexOf('--shots');
const shotDir = si >= 0 ? args[si + 1] : null;
const shotSteps = si >= 0 ? args[si + 2].split(',').map(Number) : [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(pathToFileURL(path.resolve(deck)).href);
await page.waitForFunction(() => window.__deck);
const n = await page.evaluate(() => window.__deck.STEPS.length);
let problems = 0;

for (let i = 0; i < n; i++) {
  const out = await page.evaluate(async (k) => {
    const D = window.__deck; await D.go(k, false);
    const st = D.STEPS[k]; const S = D.SCENES[st.at]; const res = [];
    if (!S) return res;
    const vis = Object.values(S.actors).filter((a) => +(a.g.getAttribute('opacity') ?? 1) > 0.5);
    for (const a of vis) {
      if (a.x < 0 || a.y < 0 || a.x + a.w > 1600 || a.y + a.h > 800) res.push(`${a.id}: off the inner stage (${Math.round(a.x)},${Math.round(a.y)},${Math.round(a.w)}x${Math.round(a.h)})`);
      const frame = a.g.querySelector(':scope > rect, :scope > path');
      if (['file', 'checklist', 'clipboard', 'terminal', 'chip', 'browser', 'receipt'].includes(a.type) && frame) {
        const fr = frame.getBoundingClientRect();
        a.g.querySelectorAll('text').forEach((t) => {
          if (!t.textContent || t.closest('.mark')) return;
          if (t.classList.contains('who') && (a.type === 'chip' || a.type === 'receipt')) return;
          if (+(t.closest('g[opacity]')?.getAttribute('opacity') ?? 1) < 0.5 && t.closest('g[opacity]') !== a.g) return;
          const r = t.getBoundingClientRect();
          if (r.right > fr.right - 2 || r.left < fr.left + 1) res.push(`${a.id}: text overflows: "${t.textContent.slice(0, 48)}"`);
        });
      }
    }
    const boxes = vis.map((a) => ({ id: a.id, x: a.x, y: a.y, w: a.w, h: a.h }));
    for (const p of [...S.ports.in, ...(S.ports.out ? [S.ports.out] : [])]) boxes.push({ id: 'port', x: p.x, y: p.y - 30, w: p.w, h: p.h + 30 });
    for (let x = 0; x < boxes.length; x++) for (let y = x + 1; y < boxes.length; y++) {
      const A = boxes[x], B = boxes[y];
      if (A.x < B.x + B.w - 4 && B.x < A.x + A.w - 4 && A.y < B.y + B.h - 4 && B.y < A.y + A.h - 4) res.push(`${A.id} overlaps ${B.id}`);
    }
    return res;
  }, i);
  if (out.length) { problems += out.length; console.log(`step ${i + 1}:`, out); }
}
console.log(`layout: ${n} steps, ${problems} problems`);

if (play) {
  for (let i = 0; i < n; i++) {
    const t0 = Date.now();
    await page.evaluate(async (k) => { await window.__deck.go(k, true); }, i);
    process.stdout.write(`played ${i + 1}/${n} (${((Date.now() - t0) / 1000).toFixed(1)}s)\n`);
  }
  console.log('playthrough done');
}

for (const s of shotSteps) {
  if (mid) {
    page.evaluate((k) => { window.__deck.go(k, true); }, s - 1);
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(shotDir, `step-${s}-mid.png`) });
  }
  await page.evaluate(async (k) => { await window.__deck.go(k, false); }, s - 1);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(shotDir, `step-${s}.png`) });
}
if (shotSteps.length) console.log(`shots: ${shotSteps.join(',')} -> ${shotDir}`);
console.log('page errors:', errors.length ? errors : 'none');
await browser.close();
process.exit(problems || errors.length ? 1 : 0);
