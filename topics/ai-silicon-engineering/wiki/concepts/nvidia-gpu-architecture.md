# NVIDIA GPU Architecture (Hopper, Blackwell)

NVIDIA GPUs are the dominant hardware for AI training and inference. Understanding their architecture is essential for writing performant CUDA code and making informed hardware decisions.

## Core Architecture: Streaming Multiprocessors (SMs)

A GPU is organized into **Streaming Multiprocessors (SMs)**, each containing:
- **128 CUDA cores** (in Hopper) — basic arithmetic units
- **4 Tensor Cores** — specialized matrix multiply units (the real AI muscle)
- **128 KB L1 cache/shared memory** — fast on-chip storage per SM
- **Warp scheduler** — dispatches instructions to groups of 32 threads (warps)

The H100 (Hopper) has **132 SMs** = 16,896 CUDA cores + 528 Tensor Cores.

## Hopper Architecture (H100, 2022)
- **Process**: TSMC 4N (custom 4nm), ~80 billion transistors
- **SM count**: 132 SMs
- **Memory**: 80 GB HBM3 at 3.35 TB/s bandwidth
- **Tensor Cores**: 4th-gen, supports FP64/FP32/TF32/BF16/FP16/FP8/INT8
- **Transformer Engine**: Automatically switches between FP16 and FP8 for optimal performance
- **Key innovation**: FP8 Tensor Cores + Transformer Engine = 2x faster training over prior gen
- **Performance**: ~1,000 TFLOPS (FP16/BF16 dense), ~2,000 TFLOPS (FP8 with sparsity)
- **TDP**: 700W (SXM5 form factor)

## Blackwell Architecture (B200, 2024)
- **Process**: TSMC 4NP (enhanced 4nm), ~208 billion transistors
- **Two reticle-size dies** connected by 10 TB/s NVL link
- **Memory**: 192 GB HBM3e at 8 TB/s bandwidth (4x H100 capacity, 2.4x bandwidth)
- **Tensor Cores**: 5th-gen, adds FP4 and FP6 support
- **Transformer Engine**: 2nd-gen, 6x faster than Hopper for large models
- **Performance**: ~4,500 TFLOPS (FP16/BF16), ~9,000 TFLOPS (FP4 with sparsity)
- **Key innovation**: Second die enables 2.5x more compute, 192 GB fits larger models

NVIDIA has since extended this direction with Blackwell Ultra, which leans even harder into FP4/NVFP4 training. The current NVIDIA blog says Blackwell offers FP4 throughput per clock that is twice FP8, while Blackwell Ultra pushes that to 3x FP8 for the newest training submissions.

Blackwell pushes the same basic idea further: bigger memory, more low-precision throughput, and packaging that keeps more of the chip on the critical path. The interesting part is not just raw TFLOPS; it is how the memory system and die-to-die interconnect change the practical training/inference envelope for very large models.

Benchmark results still show that software and precision selection matter. Hopper continues to improve through kernel and compiler work, while Blackwell's visible gains come from memory capacity, lower precision, and interconnect scaling that make large-model inference easier to sustain.

## Tensor Cores — The AI Engine

Tensor Cores are what make NVIDIA GPUs dominant for AI. They perform matrix multiply-accumulate in hardware:

```
D[m,n] = A[m,k] × B[k,n] + C[m,n]
```

A single Tensor Core can do a 16x16x16 matrix multiply in one clock cycle across all precisions. With 528 Tensor Cores in H100, that's massive dense math throughput.

**Precision hierarchy** (speed vs accuracy):
- **FP64** — slowest, most accurate (scientific computing)
- **FP32** — standard training precision
- **TF32** — same range as FP32, 19-bit mantissa, 2x throughput
- **BF16** — same range as FP32, 8-bit mantissa, 2x throughput (training standard)
- **FP16** — larger range but risk of overflow, 2x throughput
- **FP8** — Blackwell/Hopper, 4x throughput vs FP16, used with Transformer Engine
- **INT8** — inference only, 4x throughput vs FP16
- **FP4** — Blackwell only, extreme throughput for inference

## Memory Hierarchy

```
Registers (fastest, per thread)
    ↓
Shared Memory / L1 Cache (128 KB per SM, ~1 TB/s)
    ↓
L2 Cache (50 MB shared, ~5 TB/s)
    ↓
HBM3 Global Memory (80 GB, 3.35 TB/s for H100)
    ↓
Host CPU Memory (via PCIe 5.0 / NVLink)
```

For AI workloads, HBM bandwidth is often the bottleneck, not compute. This is why B200's 8 TB/s is such a big deal.

## NVLink and Multi-GPU
- **NVLink** — GPU-to-GPU interconnect, 900 GB/s (H100), enables multi-GPU training
- **NVSwitch** — connects multiple NVLinks for full GPU mesh in DGX systems
- **PCIe 5.0** — 128 GB/s (fallback, much slower than NVLink)

## Example
You want to multiply two 4096×4096 matrices on an H100:

1. Split the input into tiles that fit in shared memory and registers.
2. Load a tile of `A` and a tile of `B` into on-chip storage so each value is reused many times.
3. Use Tensor Cores for the inner `16x16x16` matrix multiply-accumulate steps.
4. Keep the warp scheduler busy enough to hide HBM latency while one tile is computing and the next tile is staging.
5. If the workload is sparse or low-precision, switch to the supported precision path that keeps the Tensor Cores fed.

That is the whole GPU pattern in miniature: move data less, reuse more on-chip, and let the compiler/runtime pick the right precision and kernel shape. Blackwell extends the same idea with more low-precision throughput and much higher memory capacity, which is why it matters for larger models and bigger batch sizes.

## Related Concepts
- [[processing-unit-types]] — how GPUs compare to other architectures
- [[cuda-programming]] — writing code that runs on GPU hardware
- [[google-tpu-architecture]] — Google's alternative to NVIDIA GPUs
- [[ai-accelerator-design]] — design patterns for AI chips

## Sources
- [[raw/articles/developer.nvidia.com-blog-nvidia-hopper-architecture-in-depth]] — Hopper architecture in-depth (NVIDIA official)
- [[raw/articles/medium.com-@indiai-h100-to-b200-what-actually-changed-e652f9694daf]] — H100 to B200 evolution
- [[raw/articles/www.civo.com-blog-comparing-nvidia-b200-and-h100]] — B200 vs H100 comparison
- [[raw/articles/resources.nvidia.com-en-us-blackwell-architecture]] — official Blackwell architecture brief
- [[raw/articles/nvidia-blackwell-mlperf-inference]] — MLPerf inference results for Blackwell and Hopper
