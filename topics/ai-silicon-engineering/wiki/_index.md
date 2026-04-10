---
title: Wiki Index
updated: 2026-04-10
---

# Index

> Master index of all articles in this wiki. Auto-maintained by LLM.

## Concepts

### Phase 1: Foundations
- [[semiconductor-fundamentals]] — transistors, CMOS, fabrication, wafers, process nodes
- [[processing-unit-types]] — CPU, GPU, TPU, NPU, FPGA, ASIC comparison with metrics

### Phase 2: Design Methodology
- [[vlsi-design-flow]] — complete RTL to GDSII pipeline with 13 stages
- [[hdl-programming]] — Verilog, SystemVerilog, Chisel with code examples
- [[eda-tools]] — Synopsys, Cadence, Siemens EDA, tool flow by stage
- [[design-for-test]] — scan chains, BIST, ATPG for manufacturing defect detection

### Phase 3: AI Hardware
- [[nvidia-gpu-architecture]] — Hopper H100, Blackwell B200/Ultra, Tensor Cores, SMs, memory hierarchy
- [[google-tpu-architecture]] — systolic arrays, MXU, weight-stationary dataflow, XLA/PJRT, TPU generations
- [[ai-accelerator-design]] — dataflow patterns, roofline model, memory hierarchy, sparsity, accelerator mapping

### Phase 4: Practical Coding
- [[cuda-programming]] — kernels, threads/blocks/grids, memory hierarchy, libraries, optimization
- [[fpga-asic-development]] — FPGA architecture, LUTs, open-source flow, ASIC vs FPGA tradeoffs
- [[open-source-asic-flow]] — OpenLANE, OpenROAD, Sky130 PDK, step-by-step example

### Phase 5: Advanced/Professional
- [[risc-v-processor-design]] — ISA structure, instruction formats, designing a CPU from scratch
- [[ai-compilers]] — TVM, XLA, TensorRT, MLIR/StableHLO, fusion, autotuning, backend mapping
- [[ai-for-chip-design]] — ML-enhanced EDA, AlphaChip, LLM-assisted RTL, DSO.ai, floorplanning search

### Phase 6: Industry and Ecosystem
- [[advanced-packaging]] — CoWoS, CoPoS, CoWoP, HBM attachment, and packaging bottlenecks
- [[ai-chip-landscape]] — startup and incumbent AI chip strategies across inference and training
- [[semiconductor-industry-trends]] — AI revenue concentration, chiplets, edge inference, and power constraints
- [[chisel-language]] — Scala-based hardware generation and FIRRTL lowering

## Connections

- [[from-code-to-silicon]] — the complete 0-to-professional learning path with dependency graph
- [[gpu-vs-tpu-architecture-war]] — NVIDIA GPU vs Google TPU philosophy, architecture, and ecosystem comparison
- [[compiler-stacks-and-accelerator-backends]] — why compiler backends are part of accelerator design, not an afterthought
- [[open-source-eda-vs-commercial-suites]] — when open-source ASIC flows are enough and when commercial EDA is required
- [[dft-and-manufacturing-yield]] — why testability is a manufacturing economics problem
- [[advanced-packaging-and-ai-scale]] — why package design now limits AI chip scaling
- [[ai-chip-landscape-and-inference-economics]] — how chip strategy changes when inference economics dominate
- [[chisel-and-the-open-source-asic-stack]] — how generator-based hardware fits the open-source flow
- [[ai-eda-and-first-pass-silicon-success]] — why AI EDA is about search, signoff, and tapeout probability

## Visual Story

- [AI Silicon Story](../output/presentations/ai-silicon-engineering-story.html) — scroll-driven HTML presentation that turns the wiki graph into a guided visual narrative
- [AI Silicon, From Zero](../output/presentations/ai-silicon-low-level-story.html) — low-level teaching deck that starts with bits, switches, gates, latches, and flip-flops

## Learning Path: 0 to Professional

### Step 1: Read foundations (1-2 days)
1. [[semiconductor-fundamentals]] — understand what a chip physically is
2. [[processing-unit-types]] — understand the landscape of hardware options

### Step 2: Learn to write hardware code (2-4 weeks)
1. [[hdl-programming]] — learn Verilog/SystemVerilog syntax and mindset
2. Buy a Lattice iCE40 FPGA board ($30) and follow [[fpga-asic-development]] / [[chisel-language]]
3. Build: LED blink → UART → SPI controller → simple ALU

### Step 3: Understand the design flow (1-2 weeks)
1. [[vlsi-design-flow]] — learn the 13-stage RTL-to-GDSII process
2. [[eda-tools]] — know what each tool does
3. Run [[open-source-asic-flow]] — take a small design through OpenLANE

### Step 4: Learn GPU programming (3-4 weeks)
1. [[nvidia-gpu-architecture]] — understand the hardware first
2. [[cuda-programming]] — write kernels, manage memory, use Tensor Cores
3. Build: vector add → matrix multiply → simple neural network forward pass

### Step 5: Go deeper on AI hardware (2-3 weeks)
1. [[google-tpu-architecture]] — understand systolic arrays
2. [[ai-accelerator-design]] — learn dataflow patterns, roofline model
3. [[ai-compilers]] — understand how models map to hardware backends

### Step 6: Capstone projects (ongoing)
1. [[risc-v-processor-design]] — design a RISC-V CPU in Verilog
2. [[design-for-test]] — add DFT to your design
3. [[ai-for-chip-design]] — use AI tools in your design flow

## Exercises (with Full Solutions)

### Verilog (Hardware Design) — Weeks 1-3
- [[ex01-logic-gates]] — AND/OR/NOT gates, modules, testbenches, simulation
- [[ex02-mux]] — Multiplexer, ternary operator, multi-bit buses
- [[ex03-alu]] — ALU with ADD/SUB/AND/OR, case statement, zero flag
- [[ex04-counter]] — Sequential logic, flip-flops, clock, non-blocking assignments
- [[ex05-fsm]] — Finite state machine, traffic light, 3-block coding style
- [[ex06-uart]] — UART transmitter, shift registers, clock dividers, real protocol
- [[ex07-openlane-flow]] — Take Verilog through OpenLANE, see physical layout

### CUDA (GPU Programming) — Weeks 5-7
- [[cuda-ex01-vector-add]] — First kernel, thread/block/grid, memory management
- [[cuda-ex02-matrix-multiply]] — Naive and tiled matmul, shared memory optimization
- [[cuda-ex03-reduction]] — Parallel sum, tree reduction, thread divergence

### Meta-Learning
- [[how-to-learn-silicon-engineering]] — Read→Type→Break→Fix→Extend method, study habits, pacing

## Statistics

- Total concepts: 20 (including meta-learning guide)
- Total connections: 9
- Total exercises: 10 (7 Verilog + 3 CUDA)
- Total sources: 74 raw files (63 articles + 9 papers + 2 other)
- Processed: 70
- Unprocessed: 4
- Total source material: 13MB
