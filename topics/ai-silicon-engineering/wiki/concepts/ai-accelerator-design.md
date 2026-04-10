# AI Accelerator Design Patterns

AI accelerators are chips purpose-built for neural network workloads. They all solve the same fundamental problem: **how to move data to and from compute units efficiently for matrix multiplication**. Understanding these design patterns is what separates someone who knows GPU/TPU architecture from someone who can reason about designing their own accelerator.

## The Roofline Model: Compute vs Memory Bound

Every AI workload is either **compute-bound** or **memory-bound**:

```
Performance (FLOPS)
    │     ___________
    │    /           ← compute-bound (plateau: max compute throughput)
    │   /
    │  / ← memory-bound (slope: limited by bandwidth)
    │ /
    │/
    └─────────────────── Operational Intensity (FLOPS/byte)
```

**Operational intensity** = compute operations per byte of data transferred. High intensity = compute-bound (you're using bandwidth well). Low intensity = memory-bound (you're starving the compute units).

**Example:**
- Matrix multiply 1024×1024 × 1024×1024 = 2 × 10^9 FLOPS, reads 3 × 1024 × 1024 × 4 bytes = 12 MB
  - Intensity = 2B / 12M = 167 FLOPS/byte → compute-bound ✓
- Element-wise ReLU on 1024×1024 = 10^6 FLOPS, reads+writes 8 MB
  - Intensity = 1M / 8M = 0.125 FLOPS/byte → memory-bound ✗

**Design implication**: Your accelerator architecture must maximize operational intensity through data reuse.

## The Four Dataflow Patterns

How data flows through compute elements determines everything about accelerator efficiency:

### 1. Weight-Stationary (Google TPU)
```
Weights stay in PEs, activations flow through
┌──────────────────────────┐
│ W W W    ← weights stay  │
│ ↓ ↓ ↓                    │
│ W→●→●→●  activations →   │
│   ↓ ↓ ↓                  │
│ W→●→●→●  flow right      │
│   ↓ ↓ ↓     and down     │
└──────────────────────────┘
```
- **Best for**: Inference (same weights, many inputs)
- **Memory access**: Weights loaded once, activations stream through
- **Used by**: Google TPU systolic array → [[google-tpu-architecture]]

### 2. Output-Stationary (Systolic output)
```
Each PE accumulates one output element, inputs/weights flow to it
┌──────────────────────┐
│ ●  accumulates C[0,0]│
│ ●  accumulates C[0,1]│
│ ●  accumulates C[1,0]│
│ ●  accumulates C[1,1]│
└──────────────────────┘
```
- **Best for**: Minimizing output register writes
- **Memory access**: Partial sums stay in PE, inputs and weights flow

### 3. Row-Stationary (Eyeriss, MIT)
```
Each row of PEs processes one row of the weight matrix
Row 0: processes weight row 0 across all activations
Row 1: processes weight row 1 across all activations
```
- **Best for**: Energy efficiency (maximizes all data reuse types)
- **Memory access**: Reuses weights, activations, AND partial sums

The row-stationary idea is the bridge between academic accelerator papers and shipping hardware. Eyeriss showed that you can improve energy by co-optimizing reuse of all three tensors in a convolution, not just the weights. That same logic shows up in tiled GEMM kernels, TPU-style dataflow, and compiler scheduling decisions: if the compiler can keep data on-chip longer, the hardware wins.

### 4. Input-Stationary
```
Activations stay in PEs, weights flow through
┌──────────────────────────┐
│ A A A    ← activations   │
│ ↓ ↓ ↓      stay         │
│ ●←W ●←W ●←W weights →  │
│ ●←W ●←W ●←W flow in    │
└──────────────────────────┘
```
- **Best for**: Convolution workloads with activation reuse

## Memory Hierarchy Design

Every accelerator has a memory hierarchy optimized for AI data access patterns:

```
Global Memory (DRAM/HBM) — 80 GB, 1-3 TB/s
    ↕ bandwidth bottleneck
On-Chip Buffer (SRAM) — 1-64 MB, 10-100 TB/s
    ↕ fast but small
PE Local Registers — KBs, ~1000 TB/s
```

**The tiling problem**: Your matrix is too big to fit in on-chip SRAM. You must break it into tiles:
```
Big matrix (4096 × 4096) → too big for SRAM
    ↓ tile into
Small tiles (256 × 256) → fit in SRAM, compute each tile, accumulate results

For each output tile:
  1. Load weight tile from DRAM to SRAM (expensive!)
  2. Stream activation tiles through compute array
  3. Reuse weight tile N times before replacing it (amortizes DRAM cost)
  4. Write output tile back to DRAM
```

**Key insight**: The number of times you reuse data on-chip before going back to DRAM determines your effective bandwidth. Reuse weight tile 100x → 100x less DRAM traffic.

This is also why so many recent inference-chip discussions return to the memory wall, processing-in-memory, and quantization. Compute looks abundant on paper; data movement is what usually breaks the design.

## Connecting to Real Architectures

### [[nvidia-gpu-architecture]] — Tensor Cores
NVIDIA's Tensor Cores are a **weight-stationary** systolic array embedded inside each SM. The matrix A (weights) stays in the Tensor Core register file while matrix B (activations) flows through. Each Tensor Core does 16×16×16 matrix multiply per cycle.

### [[google-tpu-architecture]] — Full-Chip Systolic Array
The entire TPU IS a systolic array. Pure weight-stationary at massive scale (256×256). No other compute — just one giant matrix multiply machine with unified buffers for activations.

### [[risc-v-processor-design]] — Vector Extension (RVV)
RISC-V's vector extension takes a different approach: no dedicated matrix hardware, but flexible vector lanes that can be programmed for any operation. Less efficient for pure matmul, but more flexible.

## Sparsity Exploitation

Most neural network weights are near-zero. Exploiting this:

```
Dense matrix (100% non-zero):
┌──────────────┐
│ 3.2 0.1 1.5  │ → compute all 9 multiplications
│ 0.0 4.1 0.0  │   (but 4 are ~zero, wasted energy)
│ 0.2 0.0 2.8  │
└──────────────┘

Sparse matrix (56% non-zero):
┌──────────────┐
│ 3.2 ·  1.5   │ → compute only 5 multiplications
│ ·  4.1  ·    │   44% energy savings
│ 0.2 ·  2.8   │
└──────────────┘
```

NVIDIA's Ampere+ GPUs support **structured sparsity** (2:4 pattern — 2 out of every 4 weights are zero) for 2x throughput boost with <1% accuracy loss.

The important design lesson is that sparsity is not free. You need support in the hardware datapath, the compiler, and the model format. The closer the hardware is to a rigid dataflow machine, the more carefully the software stack has to line up with it.

## Example
Consider a transformer MLP layer with a large matrix multiply:

1. On a GPU, the compiler tiles the matrix into shared-memory-sized blocks and runs many warps in parallel.
2. On a TPU, the compiler feeds the systolic array with a steady stream of activations while weights stay resident.
3. On an Eyeriss-style accelerator, the mapping tries to reuse weights, activations, and partial sums together to cut energy.

The same math kernel can land on three different hardware philosophies, and the best choice depends on whether you care most about flexibility, throughput, or energy per inference.

That same logic is why startup chips diverge so sharply: some chase flexible dataflow, others chase pure latency, and others chase wafer-scale throughput. The architecture is always a bet on which bottleneck will matter most.

## Related Concepts
- [[nvidia-gpu-architecture]] — real-world implementation of these patterns in GPUs
- [[google-tpu-architecture]] — pure systolic array implementation
- [[cuda-programming]] — programming these architectures
- [[ai-compilers]] — compilers that map models to these dataflows

## Sources
- [[raw/papers/arxiv.org-html-2603.05225v1]] — AI+HW 2035: next decade of AI hardware
- [[raw/papers/arxiv.org-abs-2506.00008]] — AI Accelerators for LLM Inference
- [[raw/papers/ijisae.org-index.php-IJISAE-article-view-8015]] — AI Hardware Accelerators: Architecture Trade-offs
- [[raw/articles/telesens.co-2018-07-30-systolic-architectures]] — systolic architecture patterns
- [[raw/papers/arxiv.org-abs-1807.07928]] — Eyeriss v2 on flexible accelerator dataflow and sparsity
- [[raw/articles/ai-inference-chip-landscape-2026]] — memory wall, PIM, and precision trends
- [[raw/articles/cerebras-sambanova-groq-comparison]] — rack-scale design tradeoffs
- [[raw/articles/tenstorrent-ai-hardware-startups]] — mesh topology and mixed-workload thesis
