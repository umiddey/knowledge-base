# CUDA Programming

CUDA (Compute Unified Device Architecture) is NVIDIA's platform for writing code that runs on GPUs. It extends C/C++ with GPU-specific keywords and runs millions of threads in parallel. If you want to write code that runs on GPUs (and you do — they're the backbone of AI), CUDA is the primary language.

## The CUDA Execution Model

### Host and Device
- **Host** = CPU + system RAM (runs normal C/C++)
- **Device** = GPU + VRAM (runs CUDA kernels)
- You write code that orchestrates on the host and computes on the device

### Kernels, Threads, Blocks, Grids
A **kernel** is a function that runs on the GPU. When you launch it, you specify a grid of thread blocks:

```
Grid (all threads for one kernel launch)
  └── Block 0, Block 1, ... Block N-1 (max 1024 threads each)
        └── Thread 0, Thread 1, ... Thread 1023
```

```cpp
// Simple CUDA kernel: add two arrays
__global__ void vectorAdd(float *a, float *b, float *c, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n)
        c[i] = a[i] + b[i];
}

// Launch it from host
int blockSize = 256;
int numBlocks = (n + blockSize - 1) / blockSize;
vectorAdd<<<numBlocks, blockSize>>>(d_a, d_b, d_c, n);
```

### Key CUDA Keywords
- `__global__` — function runs on GPU, called from CPU (kernel)
- `__device__` — function runs on GPU, called from GPU only
- `__host__` — function runs on CPU (normal function)
- `__shared__` — variable in fast shared memory (shared within a block)

### Memory Hierarchy (from fastest to slowest)
1. **Registers** — per-thread, fastest, limited (~255 per thread)
2. **Shared memory** — per-block, ~128 KB, ~1 TB/s (user-managed cache)
3. **L2 cache** — global, ~50 MB, ~5 TB/s
4. **Global memory (HBM)** — 80 GB, 3.35 TB/s (main VRAM)
5. **Host memory** — accessed via PCIe/NVLink, slowest

### Thread Synchronization
- `__syncthreads()` — barrier within a block (all threads wait)
- **Atomic operations** — `atomicAdd()`, `atomicMax()`, etc. for cross-thread coordination
- **Warp-level primitives** — `__shfl_sync()`, `__ballot_sync()` (fast, within 32-thread warp)

## Essential CUDA Libraries

| Library | Purpose |
|---------|---------|
| cuBLAS | Matrix operations (GEMM), uses Tensor Cores |
| cuDNN | Convolution, pooling, normalization, activation |
| NCCL | Multi-GPU communication (all-reduce, etc.) |
| cuRAND | Random number generation |
| Thrust | C++ STL-like parallel algorithms |
| TensorRT | Inference optimization (quantization, kernel fusion) |

The CUDA programming guide is the contract underneath all of this. cuDNN and TensorRT are not substitutes for CUDA; they are library layers that still rely on the same thread hierarchy, memory model, streams, and synchronization rules.

## Performance Optimization Checklist
1. **Coalesced memory access** — consecutive threads read consecutive addresses
2. **Use shared memory** — load data once, reuse across threads in a block
3. **Maximize occupancy** — enough blocks/threads to hide latency
4. **Minimize divergence** — threads in a warp should take the same branch
5. **Use Tensor Cores** — pad matrix dims to multiples of 8, use FP16/BF16
6. **Overlap compute and transfer** — use CUDA streams for async execution
7. **Profile with Nsight** — use `nsight compute` and `nsight systems` to find bottlenecks

## Learning Path
1. Learn C/C++ fundamentals (if not already solid)
2. Read CUDA C++ Programming Guide (NVIDIA official docs)
3. Do CUDA hands-on exercises (vector add, matrix multiply, reduction)
4. Study GPU memory model and optimization techniques
5. Build: write a simple neural network forward pass in CUDA
6. Advanced: write custom Tensor Core kernels with WMMA/cuBLASLt

## Related Concepts
- [[nvidia-gpu-architecture]] — the hardware CUDA runs on
- [[ai-compilers]] — higher-level alternatives to hand-writing CUDA (TVM, XLA)
- [[processing-unit-types]] — GPU's place among all processor types

## Sources
- [[raw/articles/news.ycombinator.com-item-id-44216123]] — HN thread: How to learn CUDA to professional level
- [[raw/articles/www.thepurplestruct.com-blog-cpu-vs-gpu-vs-tpu-vs-npu-ai-hardware-architecture-guide-2025]] — GPU optimization techniques
- [[raw/articles/docs.nvidia.com-cuda-cuda-programming-guide-pdf-cuda-programming-guide.pdf]] — official CUDA execution and memory model
- [[raw/articles/docs.nvidia.com-deeplearning-cudnn-archives-cudnn-896-developer-guide-index.html]] — cuDNN primitives and backend graph APIs
- [[raw/articles/docs.nvidia.com-deeplearning-tensorrt-archives-tensorrt-1060-pdf-tensorrt-developer-guide.pdf]] — TensorRT engine building, fusion, and quantization
