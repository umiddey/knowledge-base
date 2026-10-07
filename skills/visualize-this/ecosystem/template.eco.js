// Minimal forest+trees deck: copy this file, keep the shape, replace the content.
// Build: node build.mjs my.eco.js my-deck.html
const ECO = {
  title: 'How a coffee order gets made',
  recapView: { x: -200, y: 30, w: 2000, h: 1000 },
  recapTop: 680,
  recapLeft: 40,
  forest: {
    boxW: 280, boxH: 140,
    order: ['order', 'make', 'serve'],
    boxes: [
      { id: 'order', n: 1, name: 'Take the order', short: 'Order', x: 190, y: 290, pict: [['person', 110, 12, 0.56]] },
      { id: 'make', n: 2, name: 'Make it', short: 'Make', x: 660, y: 290, lanes: ['barista', 'grinder'] },
      { id: 'serve', n: 3, name: 'Serve', short: 'Serve', x: 1130, y: 290, pict: [['checklistIcon', 104, 12, 0.66]] },
    ],
    links: [
      { from: 'order', to: 'make', label: 'ticket', pts: [[470, 360], [656, 360]] },
      { from: 'make', to: 'serve', label: 'coffee', pts: [[940, 360], [1126, 360]] },
    ],
    bracket: { x: 648, y: 278, w: 304, h: 164, label: 'two at the same time' },
  },
  scenes: {
    order: {
      ports: { out: { art: 'ticket', to: 'Make it' } },
      actors: [
        { id: 'guest', type: 'person', x: 260, y: 260, label: 'guest' },
        { id: 'ticket', type: 'file', x: 520, y: 250, w: 520, name: 'ticket #42', who: 'written by the till', lines: ['1 × flat white', 'name: Sam'] },
      ],
    },
    make: {
      ports: { in: [{ art: 'ticket', from: 'Take the order' }], out: { art: 'coffee', to: 'Serve' } },
      lanes: [
        { id: 'barista', label: 'BARISTA', y: 30, h: 360 },
        { id: 'grinder', label: 'GRINDER', y: 410, h: 360 },
      ],
      actors: [
        { id: 'barista', type: 'person', x: 420, y: 90, label: 'barista' },
        { id: 'milk', type: 'bar', x: 700, y: 180, w: 520, label: 'steaming milk' },
        { id: 'grinder', type: 'server', x: 440, y: 480, label: 'grinder' },
        { id: 'beans', type: 'bar', x: 700, y: 560, w: 520, label: 'grinding 18 g' },
      ],
    },
    serve: {
      ports: { in: [{ art: 'coffee', from: 'Make it' }] },
      actors: [
        { id: 'check', type: 'checklist', x: 420, y: 260, w: 560, title: 'before it leaves', items: ['flat white', 'name on cup: Sam'] },
      ],
    },
  },
  steps: [
    { at: 'forest', title: 'Three boxes', text: 'A coffee order passes three boxes, and box 2 does two jobs at once.', actions: [{ boxesIn: true }] },
    { at: 'forest', title: 'The trip at a glance', text: 'Watch one order travel through every box.', actions: [{ journey: {} }] },
    { at: 'order', title: 'The order is written down', text: 'The guest orders and the till prints a ticket.',
      actions: [{ show: 'guest' }, { show: 'ticket' }, { call: ['ticket', 'hi', 0] }, { out: true }, { move: 'ticket #42', from: 'ticket.r', to: 'OUT' }] },
    { at: 'make', title: 'Two jobs in parallel', text: 'The barista steams milk while the grinder grinds beans.',
      actions: [{ parallel: [
        [{ lane: 'barista' }, { move: 'ticket #42', from: 'IN', to: 'barista.l' }, { show: ['barista', 'milk'] }, { call: ['milk', 'fill'] }],
        [{ lane: 'grinder' }, { show: ['grinder', 'beans'] }, { call: ['grinder', 'up'] }, { call: ['beans', 'fill'] }],
      ] }, { move: 'espresso', from: 'grinder.t', to: 'barista.b' }, { out: true }, { move: 'flat white', from: 'barista.r', to: 'OUT' }],
      note: 'Both lanes finish before the coffee leaves the box.' },
    { at: 'serve', title: 'Check before serving', text: 'The cup is checked against the ticket before it is handed over.',
      actions: [{ show: 'check' }, { move: 'flat white', from: 'IN', to: 'check:0.l' }, { call: ['check', 'tick', 0] }, { call: ['check', 'tick', 1] }] },
    { at: 'recap', title: 'The whole journey', text: 'One line per box.',
      actions: [
        { line: ['1  The order becomes a ticket.', ['order']] },
        { line: ['2  Milk and espresso are made at the same time.', ['make']] },
        { line: ['3  The cup is checked against the ticket and served.', ['serve']] },
      ] },
  ],
};
