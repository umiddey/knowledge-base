# Google TPU Architecture (Systolic Arrays)

Google's Tensor Processing Unit (TPU) is an ASIC purpose-built for neural network math. Its core innovation is the **systolic array** — a radically different architecture from CPUs and GPUs that achieves extreme efficiency for matrix multiplication.

## What is a Systolic Array?

Imagine a grid of processing elements (PEs) where data pulses through rhythmically, like a heartbeat pumping blood ("systolic" = relating to heartbeat). Each PE:
1. Receives data from its neighbors (left and top)
2. Multiplies its stored weight by the incoming activation
3. Accumulates the result
4. Passes data to the next neighbors (right and bottom)

No intermediate memory access. No register file reads. Data flows through the compute fabric like water through pipes.

## TPU v1 (2016) — The Original

### Matrix Multiply Unit (MXU)
- **256 × 256 systolic array** = 65,536 MAC units
- **Weight-stationary dataflow**: weights preload into PEs and stay put, activations flow through
- **8-bit integer** operations (int8 quantized inference)
- **700 MHz clock** — slow by CPU/GPU standards, but 65,536 parallel ops per cycle compensates
- **92 TOPS** peak throughput

### Why Weight-Stationary?
Neural network inference applies the same weights to millions of different inputs. By loading weights once and streaming activations, the TPU minimizes the most expensive operation: memory access. Weights stay in the array; only activations move.

### Unified Buffer + Accumulator
- **24 MB on-chip unified buffer** — stores activations between layers (not a cache hierarchy)
- **4 MB accumulator** — stores partial sums in 32-bit precision
- No complex caches, no branch prediction, no out-of-order execution — just compute

### Performance
- **15-30x faster** than contemporary CPUs/GPUs for inference
- **83x better perf/watt** than CPUs, **29x better** than GPUs
- Only does matrix multiply + activation functions — nothing else

## TPU Evolution (7 Generations)

| Generation | Year | Key Feature | Performance |
|-----------|------|-------------|-------------|
| TPU v1 | 2016 | Inference only, int8, single MXU | 92 TOPS |
| TPU v2 | 2017 | Training support, bfloat16, 2 MXUs | 180 TFLOPS |
| TPU v3 | 2018 | Liquid cooling, 2x v2 performance | 420 TFLOPS |
| TPU v4 | 2020 | 4x v3, inter-chip interconnect | ~1,000+ TFLOPS |
| TPU v5e | 2023 | Cost-efficient inference/training | Higher efficiency |
| TPU v5p | 2023 | Largest training pod scale | 4.59x v5e |
| Trillium | 2024 | 4.7x v5e compute, 2x HBM capacity | Latest gen |

Google Cloud now also exposes TPU v6e in Vertex AI. The current docs list support for JAX 0.4.37+ and PyTorch 2.1+ on v6e, while TensorFlow is no longer supported on that generation.

The TPU stack is also a compiler story. XLA, StableHLO, and PJRT are what make the hardware usable, because the chip wants regular graphs and predictable tensor programs. If the compiler cannot lower a workload cleanly, the TPU advantage drops quickly.

## How Matrix Multiply Actually Works (Systolic Dataflow)

For C = A × B where A is 256×256 and B is 256×256:

1. **Load**: Weights (matrix A) are loaded into the 256×256 PE grid — each PE stores one weight
2. **Flow**: Matrix B activations enter from the left edge, flowing right across the array
3. **Compute**: Each PE multiplies its stored weight by the passing activation, adds to accumulator
4. **Output**: Partial sums flow downward, accumulating into final results at bottom edge
5. **Pipeline**: After ~256 cycles to fill the pipeline, a complete 256×256 result emerges every cycle

The entire operation is deterministic, predictable, and requires zero intermediate memory access.

## Example
Imagine a JAX model running on TPU v6e in Vertex AI:

1. You write a transformer block in JAX, not hand-written kernels.
2. XLA lowers the graph and decides which ops fuse into larger HLO regions.
3. PJRT sends the compiled program to the TPU runtime.
4. The systolic array spends most of its time on matrix multiplies, while the unified buffer holds activations between layers.
5. If you add a custom op or a graph shape that XLA cannot optimize well, the TPU advantage drops quickly because the architecture wants regular, compiler-friendly workloads.

That is why TPU programming is really compiler-aware workload design, not just model coding.

## TPU vs GPU Architecture

| Aspect | TPU | GPU |
|--------|-----|-----|
| Core compute | Systolic array (fixed function) | CUDA cores + Tensor Cores (programmable) |
| Memory model | Unified buffer (simple) | Complex cache hierarchy + HBM |
| Clock speed | 700 MHz - 1 GHz | 1.5 - 2 GHz |
| Flexibility | Only matrix ops + activations | Fully programmable (CUDA) |
| Software | TensorFlow/JAX via XLA | CUDA, PyTorch, TensorFlow |
| Efficiency | Maximum for target workloads | Good across diverse workloads |

The TPU paper matters because it shows this was always a hardware-software co-design problem. The chip is deliberately specialized, but the compiler stack is what makes that specialization usable.

## Related Concepts
- [[processing-unit-types]] — where TPU fits among all processor types
- [[nvidia-gpu-architecture]] — the main competitor to TPU
- [[ai-accelerator-design]] — design patterns shared across AI chips

## Sources
- [[raw/articles/blog.bytebytego.com-p-how-googles-tensor-processing-unit]] — ByteByteGo TPU explanation
- [[raw/articles/telesens.co-2018-07-30-systolic-architectures]] — systolic architecture deep dive
- [[raw/articles/introl.com-blog-google-tpu-architecture-complete-guide-7-generations]] — all 7 TPU generations
- [[raw/articles/jax-ml.github.io-scaling-book-tpus]] — how to think about TPUs (JAX team)
- [[raw/articles/medium.com-@aditya_mehra-how-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf]] — matrix multiplication on TPU
- [[raw/papers/research.google-pubs-in-datacenter-performance-analysis-of-a-tensor-processing-unit]] — canonical TPU datacenter analysis
- [[raw/articles/openxla.org-xla]] — compiler stack used to target TPU hardware
- [[raw/articles/openxla.org-stablehlo]] — portable interchange layer for TPU-compatible ML graphs
- [[raw/articles/cloud.google.com-blog-products-ai-machine-learning-an-in-depth-look-at-googles-first-tensor-processing-unit-tpu]] — original TPU introduction
- [[raw/articles/cpu-gpu-tpu-npu-architecture-guide]] — TPU overview in a broader processor taxonomy
- [[raw/articles/www.backblaze.com-blog-ai-101-gpu-vs-tpu-vs-npu]] — TPU overview and history context
