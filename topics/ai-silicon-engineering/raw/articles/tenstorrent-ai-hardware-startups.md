---
title: "Tenstorrent and the State of AI Hardware Startups"
source: https://irrationalanalysis.substack.com/p/tenstorrent-and-the-state-of-ai-hardware
date: 2024-12-15
type: article
---

# Tenstorrent and the State of AI Hardware Startups

## Tenstorrent Architecture
- Mesh topology with Tensix AI cores, big RISC-V CPU cores, baby RISC-V control cores
- 16 big RISC-V CPU cores (can run Linux)
- 725 baby RISC-V cores (<1% die area) — for kernel launches and data movement
- Each Tensix core: 5 baby RISC-V + vector and matrix math engines
- 2MB SRAM per core, no L2 cache
- Using Samsung Foundry SF4X (dirt cheap) — no HBM

## Key Design Philosophy
- Architecture is "essentially a GPU, but better" (Davor Capalija, Senior Fellow)
- Correct core size for compute and SRAM
- Baby RISC-V for kernel launching = full ISA flexibility
- No legacy graphics structures
- Built around DMA from ground up (vs Nvidia TMA "bolted-on")

## Software Stack
- Current stack is attempt #6
- Open-source everything: multiple entry points from high-level ML to low-level kernels
- TT-Metalium, TT-NN, TT-MLIR, Buda
- Some of best kernels written by new grads and hobbyists on Discord

## Comparison to Competition
- **Google TPU**: Large cores cause utilization problems
- **Groq**: 144-wide VLIW, cycle-accurate ahead-of-time compilation — "enormous burden"
- **Cerebras**: Wafer of tiny cores, massive scheduling issues
- **SambaNova**: CGRA — in its own category

## Jim Keller's "Mixed Intelligence" Thesis
Future AI needs mixed workloads, not just MATMUL. TT is last standing company with both good AI architecture and CPU microarchitecture team.

## Market Reality for AI Hardware Startups
- Horizontally supplied training hardware is a dead market
- Every startup should give up on training, exclusively focus on inference
- Need insanely low cost OR insanely high performance from exotic strategy
- TT using Samsung SF4X (cheap) + no HBM = potential 60% gross margins while undercutting competition
- "Tenstorrent is the only investment-grade AI hardware startup"
