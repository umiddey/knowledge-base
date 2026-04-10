# GPU vs TPU: The Architecture War

NVIDIA GPUs and Google TPUs represent two fundamentally different philosophies for AI hardware. Understanding this rivalry explains the entire AI hardware landscape.

## The Core Difference

```
GPU Philosophy:                          TPU Philosophy:
"Build a flexible parallel              "Build the most efficient
 processor that can do anything,         matrix multiply machine
 then optimize for AI on top"            possible — nothing else matters"
```

**GPU** = programmable + flexible + expensive + power-hungry + dominant ecosystem
**TPU** = specialized + efficient + cheaper to run + inflexible + Google-only

## Architecture Comparison

| Aspect | NVIDIA GPU (H100) | Google TPU (v4) |
|--------|-------------------|-----------------|
| Compute engine | 16,896 CUDA cores + 528 Tensor Cores | 1-4 MXU systolic arrays (65K MACs each) |
| Clock speed | 1.8 GHz | ~1 GHz |
| Precision | FP64/FP32/TF32/BF16/FP16/FP8/INT8/INT4 | BF16/INT8 |
| Memory | 80 GB HBM3, 3.35 TB/s | 32-128 GB HBM, ~1.2 TB/s |
| Programmability | Full CUDA (any algorithm) | TensorFlow/JAX only (via XLA) |
| Flexibility | Any AI model, any framework | Models that fit XLA's graph model |
| Multi-chip | NVLink 900 GB/s | ICI (inter-chip interconnect) 4.8 Tbps |
| Power | 700W | ~200-300W |
| Availability | Anyone can buy | Google Cloud only |
| Software ecosystem | CUDA, cuDNN, TensorRT, PyTorch, TF | TensorFlow, JAX (via XLA) |

## Why GPUs Won the Market Despite Being Less Efficient

1. **CUDA moat**: NVIDIA spent 15 years building the CUDA ecosystem. Millions of lines of optimized code, thousands of libraries, every AI framework targets CUDA first.
2. **Flexibility**: Researchers can run any weird model architecture on a GPU. TPUs only work well for standard matrix-heavy workloads.
3. **Availability**: Anyone can buy a GPU. TPUs require Google Cloud.
4. **PyTorch dominance**: PyTorch became the dominant research framework, and it's GPU-first.

## Why TPUs Win on Efficiency

1. **Systolic array advantage**: For pure matrix multiply, the TPU does 65,536 multiply-accumulate operations per cycle with zero intermediate memory access. No GPU can match this data efficiency.
2. **Weight-stationary dataflow**: Weights loaded once, reused millions of times. Dramatically reduces DRAM traffic.
3. **No overhead**: No branch prediction, no cache hierarchy, no out-of-order execution. Every transistor does useful work.
4. **Lower power**: 83x better perf/watt than CPU, significantly better than GPU for the workloads it's designed for.

## Example
Suppose a team is choosing hardware for training a 70B-parameter transformer:

1. If they need to experiment with unusual kernels, custom attention variants, or a rapidly changing model architecture, H100s are the safer choice because CUDA lets them execute almost anything.
2. If the workload is stable, graph-friendly, and dominated by dense matrix math, TPUs become attractive because XLA can map the computation onto the systolic array very efficiently.
3. If they need a mixed workload with data preprocessing, dynamic control flow, or unsupported ops, the GPU usually wins by being more forgiving.

That decision is not about abstract elegance. It is about whether the software stack can actually express the workload without fighting the hardware.

## The Practical Impact for You

If you're writing CUDA code ([[cuda-programming]]), you're optimizing for the GPU's strengths: managing shared memory, coalescing accesses, using Tensor Cores, overlapping compute and transfer.

If you were programming a TPU, you'd write JAX/XLA code and let the compiler ([[ai-compilers]]) map your computation onto the systolic array. You'd think about tiling matrices to fit the MXU dimensions (256×256 or 128×128).

Understanding both architectures ([[nvidia-gpu-architecture]], [[google-tpu-architecture]]) and the underlying [[ai-accelerator-design]] patterns lets you reason about any AI hardware, not just today's chips.

## Concepts Linked
- [[nvidia-gpu-architecture]]
- [[google-tpu-architecture]]
- [[ai-accelerator-design]]
- [[cuda-programming]]
- [[ai-compilers]]
- [[processing-unit-types]]

## Analysis
The GPU versus TPU split is really a spectrum between flexibility and specialization. The GPU ecosystem wins when the model and software are unstable because programmability matters more than theoretical efficiency. The TPU wins when the workload is stable enough that compiler-controlled specialization pays off.

The interesting part is that both sides are converging in some ways: GPUs keep adding more fixed-function tensor hardware, while TPUs keep exposing more software-facing compiler/runtime infrastructure. The "war" is less about one side eliminating the other and more about which design point is optimal for a given deployment shape.
