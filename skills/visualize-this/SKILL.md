---
name: visualize-this
description: Use for animated HTML explainers of a system or workflow: a zoomable map of black boxes (sequential and parallel) where each box opens into its own step-by-step animation.
---

# Visualize This: the forest and the trees

The user wants to UNDERSTAND a system, and that takes two levels at once:

- **The forest**: the whole system as 4–10 black boxes. You can see what runs one
  after another, what runs at the same time, and what flows between them.
- **The trees**: click a box (or let the tour reach it) and the camera zooms
  inside. Its parts animate one idea per step. The left edge shows what arrived
  and from which box, and the right edge shows what leaves and to which box.

The old one-level deck explained each small idea well but never connected the
ideas to the whole. Every rule below serves that connection.

Engine + tools live in `ecosystem/` next to this file:

| File | What it is |
|---|---|
| `engine.html` | the engine (camera, forest, actors, steps, controls). Don't edit it per deck. |
| `template.eco.js` | smallest complete deck (3 boxes, one 2-lane parallel box). Copy this. |
| `gateforge.eco.js` | full real example: 8 boxes, 34 steps, Gateforge's commit gate. |
| `build.mjs` | `node build.mjs my.eco.js my-deck.html` builds one self-contained HTML file |
| `check-eco.mjs` | layout + playthrough checker with screenshots |
| `fonts/` | Inter + JetBrains Mono (latin, variable); `build.mjs` embeds only the families the engine names, so decks look the same offline |

## The hard rules

1. **Map first, then zoom.** Step 1 shows the whole forest. Step 2 sends one
   token through every box once, splitting at parallel boxes and joining again.
   Only then open box 1. The last steps return to the forest, replay the trip
   with every box ticking green, then show the recap.
2. **Boxes = black boxes, links = what flows.** Each forest link carries a
   named artifact (`staged files`, `must-prove list`, `sealed receipt`). A
   dashed link is a data dependency that skips a box. Boxes that truly run
   at the same time are drawn as lanes inside one box, inside a bracket
   labelled "… at the same time".
3. **Every inside view is plugged into the forest.** IN port(s) on the left
   name the artifact and the box it came from; the OUT port on the right
   names what leaves and where it goes. The first action of a box usually
   moves the IN artifact onto the first actor; the last action fills the OUT
   port (`{ out: true }`) and moves the result into it. Moving between boxes
   zooms out, sends the artifact along the real link, then zooms in.
   The mini-map stays on screen the whole time and shows where you are.
4. **Visual means drawn things change state.** Text sliding around does
   not count. A database row turns red and collapses, a barrier arm rises,
   a request packet is stamped at a checkpoint, a lock snaps onto a folder,
   a checkbox ticks. Use the actors; add a new actor to the engine when a
   concept needs its own drawing.
5. **Parallel must really be parallel.** Use the `parallel` action so lanes
   animate at the same moment; show what passes between lanes (a packet
   from the runner lane through the referee lane into the app lane).
6. **One idea per step, one sentence per step.** Inside a box there's no hard
   item limit, but every actor on screen must serve this box's story. Hide
   actors the story is done with.
7. **One running example from start to finish.** The same id, value and name
   everywhere (`DELETE /api/orders/42`, row `42 | pen`,
   `tenant.orders:persistence:delete`). Say "Remember this name" when it is
   introduced, and point back when it returns (`{ mini: 'freeze' }` blinks
   the box where it came from).
8. **Show the failure next to the success.** Use the same actors with a wrong
   value, in red: mocked call that never reaches the proxy, changed
   fingerprint, claim without evidence.
9. **Simple must still be true.** Before drawing "A → B", check the code.
   Sequential in the code means sequential on screen: don't invent
   parallelism. Every file card's distinctive string must be grep-verified;
   label made-up example code `example app` and cut-down files `shortened`.
   Distinguish a recorded identity from physical files: a Git tree ID is a
   version record, not a folder. Draw a separate folder only for an actual checkout.
10. **Say who is responsible.** Every file card says in its `who` tag who
    writes it (`by the agent`, `owner reviews`, `real help text`); actors
    are named plainly (`referee (the witness)`).
11. **Elegant and quiet.** The engine owns the look; don't restyle per deck.
    Paper `#F7F8FA`, white cards with layered soft shadows and 1–1.5 px
    hairline borders, one 2.5 px line weight for every drawing with soft
    fills, rounded radii (cards 16, panels 20–28, pills fully round).
    Inter for words; JetBrains Mono only for real code (paths, calls, ids,
    hashes — the engine's `looksCode()` picks the face for chips, packets
    and list items automatically). Small labels are spaced Inter capitals.
    Colour only carries meaning: indigo `#4F46E5` = the moving thing and
    "where you are", green = proven, red = rejected, soft yellow = highlight.
    Deck files may use plain hex colours (`#dc2626`, `#16a34a`, `#2563eb`…);
    the engine maps them onto the palette. Motion stays subtle (4.5 % pop).

## How to build one

1. **Learn the real system.** Read the code and run it. Write down the boxes,
   the artifact on each link, what's truly parallel, and one running example.
2. **Write the story before code**: forest overview → trip → box by box
   (2–9 steps each) → trip again with ticks → recap. 25–40 steps is normal.
3. Copy `ecosystem/template.eco.js`, fill in `forest`, `scenes`, `steps`.
   Build: `node ecosystem/build.mjs my.eco.js my-deck.html`.
4. Check:
   ```bash
   PW=/path/to/node_modules/playwright/index.mjs
   PLAYWRIGHT=$PW node ecosystem/check-eco.mjs my-deck.html               # layout, seconds
   PLAYWRIGHT=$PW node ecosystem/check-eco.mjs my-deck.html --play        # every animation, minutes; run in background
   PLAYWRIGHT=$PW node ecosystem/check-eco.mjs my-deck.html --shots /tmp/s 1,5,9 --mid
   ```
   **Look at the screenshots** (end state and `--mid`): the checker can't see
   a packet landing on the wrong line or a confusing leftover from a
   "what if" step.
5. Open it: `setsid xdg-open my-deck.html`.

## ECO format (cheat sheet)

```js
const ECO = {
  title: '…',
  forestView: { x: 30, y: 70, w: 1550, h: 640 },   // optional camera frame for the map
  forest: {
    boxW: 260, boxH: 130,                       // boxes are 2:1; every inside view is 1600×800
    order: ['a', 'b', 'c'],                     // the trip order
    boxes: [{ id: 'a', n: 1, name: 'Freeze', short: 'Freeze', x: 90, y: 110,
              pict: [['camera', 72, 18, 0.5]] },                 // drawings from DRAW at x,y,scale
            { id: 'b', n: 2, name: 'Test run', x: 470, y: 110, lanes: ['runner', 'referee', 'app'] }],
    links: [{ from: 'a', to: 'b', label: 'snapshot', pts: [[370, 180], [466, 180]] },
            { from: 'a', to: 'c', label: 'app running', dashed: true, pts: [...], labelAt: [x, y] }],
    bracket: { x, y, w, h, label: 'three at the same time' },
  },
  scenes: { b: {
    ports: { in: [{ art: 'must-prove\nlist', from: 'Read the code', y: 150 }], out: { art: 'sealed\nreceipt', to: 'Grade' } },
    lanes: [{ id: 'runner', label: 'TEST RUNNER', y: 15, h: 245 }, …],
    actors: [{ id: 'db', type: 'db', x: 1050, y: 540, rows: [['42', 'pen']] }, …],
  } },
  steps: [{ at: 'forest' | 'recap' | '<box id>', title, text, note?, actions: [...] }],
};
```

Actors (`type`): `robot`, `person`, `referee`, `camera` (`flash(id)`),
`server` (`up`), `hook` (`grab`), `magnifier` (`moveTo(id)`),
`file` (`hi(i)`, `bad(i)`, `setLine`, `type` with `typed: true`),
`terminal` (`type`, `print`), `chip` (`set`, `pop`, `strike`), `key`,
`folder` (`lock`, `edit`, `pulse`, `setFp`), `db` (`hiRow`, `removeRow`,
`restore`, `drop`, `unhi`), `browser` (`click(id)`, `removeRow`, `restore`,
`mock`, `unmock`), `proxy`, `clipboard` (`record`), `receipt` (`seal`),
`gate` (`open`, `close`), `checklist` (`add`, `hi`, `tick`, `cross`, `tag`),
`bar` (`fill`), `label` (`set`).

Refs: `'id'` centre, `'id.l|r|t|b'` sides, `'id:2'` line/row 2 of a card,
list, db or browser, `'id.grab' / 'browser.mock' / 'proxy.c' / 'key.k'`
named points, `'IN'`, `'IN1'`, `'OUT'` ports.

Actions: `show`, `hide`, `call: [id, method, ...args]`,
`move: 'text', from, to, via?: [refs], color?, keep?, blocked?, stamp?: { at: viaIndex, text }`,
`connect: [refA, refB], label?, color?`, `unconnect`, `mark: [id, 'ok'|'bad']`,
`out: true|'bad'`, `lane: id`, `parallel: [[...], [...]]`, `wait: ms`, `note`,
`mini: boxId`; forest-level: `boxesIn`, `journey: { tick? }`, `boxState`,
`line: [text, [boxIds]]` (recap).

Jumping to a step replays all earlier steps instantly, so a "what if" detour
must put things back (`restore`, `drop`, `unmock`) before the story goes on.

## Checklist before handing over

- [ ] Steps 1–2 show the forest and the whole trip; the deck ends with trip + recap.
- [ ] Every box has IN/OUT ports naming the neighbour boxes, and the OUT fills at the end.
- [ ] Parallel parts use lanes and the `parallel` action; nothing parallel is invented.
- [ ] Each step has one sentence and visible state changes (not just text).
- [ ] One running example everywhere; a failure shown next to each key success.
- [ ] Card text grep-verified; example/shortened content labelled.
- [ ] `check-eco.mjs` layout and `--play` clean; screenshots (incl. `--mid`) looked at.

The older single-level deck (`template.html`, `check.mjs`, `gold-reference/`)
is still here for a single linear flow with no system around it. Use it only
when the user asks for that.
