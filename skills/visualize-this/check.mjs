// Layout + playthrough check for a visualize-this deck.
// Usage: node check.mjs <deck.html> [--play] [--shots <dir> <step,step,...>]
// Playwright: set PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs, or have `playwright` resolvable.
//   --play   plays every step to the end and checks every item became visible (slow: ~1.2s per action).
//   --shots  plays the listed steps and saves <dir>/step-<n>.png, then prints the dot labels on screen.
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const args = process.argv.slice(2);
const deck = args[0];
if (!deck) { console.error('usage: node check.mjs <deck.html> [--play] [--shots <dir> <n,n>]'); process.exit(2); }
const { chromium } = await import(process.env.PLAYWRIGHT ?? 'playwright');
const play = args.includes('--play');
const si = args.indexOf('--shots');
const shotDir = si >= 0 ? args[si + 1] : null;
const shotSteps = si >= 0 ? args[si + 2].split(',').map(Number) : [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(pathToFileURL(path.resolve(deck)).href);
const n = await page.evaluate(() => STEPS.length);
const go = (i) => page.evaluate((k) => document.querySelectorAll('.dots i')[k].click(), i);
let problems = 0;

// 1. Static layout: text inside its item, header texts apart, items apart, items on stage.
for (let i = 0; i < n; i++) {
  await go(i); await page.waitForTimeout(120);
  const out = await page.evaluate(() => {
    const out = []; const vb = document.getElementById('stage').viewBox.baseVal;
    for (const [id, bx] of Object.entries(boxes)) {
      const left = bx.x - bx.w / 2, right = bx.x + bx.w / 2;
      if (left < 0 || right > vb.width || bx.y < 0 || bx.y + bx.h > vb.height) out.push(`${id}: off stage`);
      bx.g.querySelectorAll('text:not(.who)').forEach((t) => { const b = t.getBBox();
        if (b.x < left + 2 || b.x + b.width > right - 2) out.push(`${id}: text overflows by ${Math.round(b.x + b.width - right)}px: "${t.textContent.slice(0, 50)}"`); });
      const f = bx.g.querySelector('.fname'), w = bx.g.querySelector('.who');
      if (f && w && Math.abs(f.getBBox().y - w.getBBox().y) < 6 && f.getBBox().x + f.getBBox().width > w.getBBox().x - 8) out.push(`${id}: file name hits "who"`);
    }
    const all = Object.values(boxes).sort((a, b) => a.x - b.x);
    for (let k = 1; k < all.length; k++) if (all[k].x - all[k].w / 2 < all[k - 1].x + all[k - 1].w / 2 + 10) out.push('items touch or overlap');
    if (all.length > 3) out.push(`${all.length} items (max 3)`);
    return out;
  });
  if (out.length) { problems += out.length; console.log(`step ${i}:`, out); }
}
console.log(`layout: ${n} steps, ${problems} problems`);

// 2. Full playthrough: every item must end visible.
if (play) {
  for (let i = 0; i < n; i++) {
    await go(i);
    const k = await page.evaluate(() => STEPS[cur].actions.length);
    await page.waitForTimeout(600 + k * 1250);
    const [on, all] = await page.evaluate(() => [document.querySelectorAll('.box.on').length, document.querySelectorAll('.box').length]);
    if (on !== all) { problems++; console.log(`step ${i}: only ${on}/${all} items shown`); }
  }
  console.log('playthrough done');
}

// 3. Screenshots of chosen steps after their animation.
for (const i of shotSteps) {
  await go(i);
  const k = await page.evaluate(() => STEPS[cur].actions.length);
  await page.waitForTimeout(600 + k * 1250);
  await page.screenshot({ path: path.join(shotDir, `step-${i}.png`) });
  console.log(`step ${i} labels:`, await page.$$eval('.dotlabel', (x) => x.map((t) => t.textContent)));
}

console.log('page errors:', errors.length ? errors : 'none');
await browser.close();
process.exit(problems || errors.length ? 1 : 0);
