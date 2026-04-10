---
title: Health Check Report
topic: ai-silicon-engineering
date: 2026-04-09
---

# Health Check: ai-silicon-engineering

## Summary

| Check | Issues Found | Severity |
|-------|-------------|----------|
| Orphan concepts | 1 | medium |
| Missing concepts | 0 | high |
| Stale sources | 4 | high |
| Inconsistencies | 0 | high |
| Thin articles | 0 | medium |
| Missing examples | 3 | high |
| Missing connections | 6 | low |
| Broken links | 8 | high |
| Index completeness | 0 | high |
| Source backlinks | 0 | medium |

**Overall health: NEEDS WORK**

## Critical Issues (fix first)

### Missing Concepts
- None

### Broken Links
- `from-code-to-silicon.md` has 6 malformed wikilinks in the ASCII learning-path diagram. The targets exist, but the syntax is broken and does not parse cleanly.
- `raw/articles/github.com-m3y54m-FPGA-ASIC-Roadmap-blob-master-README.md` is referenced from `fpga-asic-development` and `hdl-programming`, but the actual raw file is `raw/articles/github.com-m3y54m-FPGA-ASIC-Roadmap-blob-master-README.md.md`.

### Stale Sources
- `raw/articles/chipmunklogic.com-designing-pequeno-risc-v-cpu-from-scratch.md` — not yet compiled
- `raw/articles/cloud.google.com-blog-products-ai-machine-learning-an-in-depth-look-at-googles-first-tensor-processing-unit-tpu.md` — not yet compiled
- `raw/articles/forum.modular.com-t-democratizing-ai-compute-part-6-what-about-ai-compilers-tvm-and-xla-744.md` — not yet compiled
- `raw/articles/nikhilrajput.com-blog-risc-v-architecture.md` — not yet compiled

## Warnings

### Thin Articles
- None

### Orphan Concepts
- `how-to-learn-silicon-engineering` — no inbound links from other wiki articles

### Missing Examples
- `cuda-programming` — no Example section found
- `how-to-learn-silicon-engineering` — no Example section found
- `risc-v-processor-design` — no Example section found

## Suggestions

### Missing Connections
- `ai-accelerator-design` ↔ `ai-chip-landscape` — shared raw-source overlap
- `ai-compilers` ↔ `google-tpu-architecture` — shared raw-source overlap
- `ai-for-chip-design` ↔ `eda-tools` — shared raw-source overlap
- `ai-for-chip-design` ↔ `semiconductor-industry-trends` — shared raw-source overlap
- `fpga-asic-development` ↔ `hdl-programming` — shared raw-source overlap
- `google-tpu-architecture` ↔ `processing-unit-types` — shared raw-source overlap

### Suggested Questions
1. How do CoWoS, CoPoS, and CoWoP change the economics of AI chip scaling?
2. When does a TPU beat a GPU in practice once compiler support is included?
3. What is the minimum software stack needed for a startup AI accelerator to be viable?
4. How do DFT and packaging constraints change first-pass silicon success rates?
5. What does an open-source ASIC flow cover that commercial flows still do better?
6. How far can Chisel or other generators take you before RTL/physical design becomes the bottleneck?
7. How do inference chip designs respond to the memory wall compared with training chips?
8. What parts of AI chip design are best automated by AI today, and what parts are still signoff-critical?
