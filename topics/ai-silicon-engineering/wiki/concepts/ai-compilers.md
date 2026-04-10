# AI Compilers (TVM, XLA, TensorRT)

AI compilers bridge the gap between high-level ML frameworks (PyTorch, TensorFlow, JAX) and actual hardware execution. They take a neural network model and generate optimized machine code for GPUs, TPUs, CPUs, or custom accelerators. If you want to understand how your PyTorch code actually runs on a GPU, you need to understand AI compilers.

## Why AI Compilers Exist

Writing CUDA kernels by hand is hard. A framework like PyTorch runs thousands of different operations. Each operation needs to be optimized for each hardware target. AI compilers automate this:

```
PyTorch Model (eager mode)
    ↓
Graph Capture (TorchDynamo, torch.compile)
    ↓
Intermediate Representation (IR)
    ↓
Optimization passes (fusion, layout, scheduling)
    ↓
Code Generation (CUDA, LLVM, custom backend)
    ↓
Fast execution on GPU/TPU/CPU
```

## The Compilation Stack

### Level 1: Graph-Level IR (High-Level)
The entire model is one graph of operations. Optimizations:
- **Operator fusion**: merge Conv→BatchNorm→ReLU into one kernel (avoids intermediate memory writes)
- **Dead code elimination**: remove unused computations
- **Constant folding**: pre-compute operations with fixed inputs
- **Memory planning**: allocate and reuse buffers efficiently

**Example of fusion:**
```python
# Before fusion: 3 separate GPU kernels, 2 intermediate buffers
x = conv2d(input)       # kernel 1, write intermediate_1
x = batch_norm(x)       # kernel 2, write intermediate_2
x = relu(x)             # kernel 3, write output

# After fusion: 1 GPU kernel, 0 intermediate buffers
x = fused_conv_bn_relu(input)  # single kernel, data stays in registers/shared memory
```

This is HUGE for performance. Memory bandwidth is the bottleneck on GPUs. Eliminating intermediate reads/writes can give 2-5x speedup.

### Level 2: Tensor-Level IR (Mid-Level)
Individual tensor operations are described mathematically. This is where TVM's Tensor Expression language lives:

```python
# TVM Tensor Expression: define a matrix multiply
import tvm
A = tvm.te.placeholder((M, K), name='A')
B = tvm.te.placeholder((K, N), name='B')
k = tvm.te.reduce_axis((0, K), name='k')
C = tvm.te.compute(
    (M, N),
    lambda i, j: tvm.te.sum(A[i, k] * B[k, j], axis=k),
    name='C'
)
# TVM then searches for the best schedule (loop tiling, vectorization, etc.)
```

The compiler explores different **schedules** — how to tile loops, which memory to use, how to vectorize — and picks the fastest one (autotuning).

### Level 3: Hardware-Specific Code Generation
Generate actual GPU/CPU/accelerator instructions:
- **NVIDIA**: generate CUDA PTX or SASS (assembly)
- **CPU**: generate LLVM IR → x86/ARM/RISC-V machine code
- **Custom accelerators**: generate custom instruction streams

## Key AI Compilers

### XLA (Accelerated Linear Algebra)
- **Used by**: TensorFlow, JAX (default compiler for TPU)
- **How it works**: TF/JAX graph → HLO IR → optimization → hardware-specific code
- **Strength**: TPU optimization, JAX integration, whole-program optimization
- **Connection**: JAX on TPU goes through XLA → XLA generates systolic array instructions for [[google-tpu-architecture]]

XLA is the practical compiler side of the TPU story. The TPU silicon is intentionally simple and rigid; XLA is what makes that rigidity usable. If the compiler cannot fuse, tile, and schedule the graph correctly, the TPU loses its advantage.

### Apache TVM
- **Used by**: Standalone, integrates with many frameworks
- **How it works**: Model → Relay IR → tensor expressions → autotuning → compiled module
- **Strength**: Cross-platform (GPU, CPU, ARM, custom accelerators), autotuning
- **Key innovation**: AutoTVM / MetaSchedule — automatically searches for optimal kernel parameters
- **Connection**: Can generate code for [[nvidia-gpu-architecture]] Tensor Cores, custom [[ai-accelerator-design]] hardware

TVM is the canonical example of a schedule-search compiler for deep learning. The core idea is simple but powerful: separate what a computation does from how it is mapped to hardware. That makes it easier to retarget the same model to a GPU, CPU, or custom accelerator backend.

### TensorRT (NVIDIA)
- **Used by**: Production inference on NVIDIA GPUs
- **How it works**: ONNX/TF model → optimized engine for specific GPU
- **Strength**: Best-in-class inference on NVIDIA GPUs, quantization, kernel auto-tuning
- **What it does**: quantizes to INT8/FP16, fuses layers, picks optimal CUDA kernels, manages memory
- **Connection**: Generates optimized [[cuda-programming]] kernels targeting [[nvidia-gpu-architecture]] Tensor Cores

TensorRT is less a general-purpose compiler and more a production deployment engine. It is valuable because it bakes in NVIDIA-specific knowledge about precision, kernel fusion, and memory layout. That is why it usually wins on NVIDIA hardware, but also why it is narrower than TVM or XLA.

### MLIR and StableHLO
- **MLIR** is the infrastructure layer that makes multi-level compiler design practical. It lets a compiler carry higher-level operations farther before lowering them.
- **StableHLO** is the portability boundary that keeps model graphs stable across frontend and backend changes.
- Together they explain why modern ML compilers can have both portability and backend specialization.

## Example
Take the same transformer block and run it three ways:

1. With TensorRT on an H100, you care about engine building, layer fusion, precision selection, and GPU-specific kernel choice.
2. With XLA on TPU, you care about graph lowering, HLO fusion, tiling, and getting the computation into a form the systolic array can consume.
3. With TVM on a custom accelerator, you care about expressing the operator, searching schedules, and writing a backend that matches your chip's memory hierarchy.

The model does not change. The compiler path changes everything about performance and feasibility.

### torch.compile (PyTorch 2.0+)
- **How it works**: TorchDynamo captures the Python execution graph → TorchInductor compiles it
- **Backend**: Generates Triton kernels (Triton = Python-like language for GPU kernels)
- **Usage**: `model = torch.compile(model)` — one line, 1.5-3x speedup on most models

## How This Connects to Writing Chip Code

If you're building an AI accelerator, you need to write a **compiler backend** that generates code for your hardware:

```
PyTorch model → TVM/XLA → YOUR backend → YOUR accelerator's instructions
```

This is how Google makes TPUs work with TensorFlow — XLA has a TPU backend. If you design a custom [[ai-accelerator-design]], you'd write a TVM backend or a custom compiler to generate your accelerator's instruction stream.

## Connection to Silicon Engineering
- **[[cuda-programming]]** — AI compilers generate CUDA kernels automatically
- **[[nvidia-gpu-architecture]]** — TensorRT targets specific GPU architectures
- **[[google-tpu-architecture]]** — XLA generates systolic array instructions for TPUs
- **[[ai-accelerator-design]]** — custom accelerators need custom compiler backends

## Sources
- [[raw/articles/uplatz.com-blog-bridging-the-chasm-a-deep-dive-into-machine-learning-compilation-with-tvm-and-xla-for-hardware-specific-]] — TVM and XLA deep dive
- [[raw/articles/medium.com-@santhosraj14-the-critical-role-of-compilers-in-machine-learning-and-ai-2d6851b9b9c5]] — role of compilers in ML/AI
- [[raw/articles/forum.modular.com-t-democratizing-ai-compute-part-6-what-about-ai-compilers-tvm-and-xla-744]] — TVM and XLA explained (Modular)
- [[raw/papers/arxiv.org-abs-1802.04799]] — canonical TVM paper
- [[raw/papers/research.google-pubs-mlir-scaling-compiler-infrastructure-for-domain-specific-computation]] — MLIR compiler infrastructure paper
- [[raw/articles/openxla.org-xla]] — OpenXLA overview
- [[raw/articles/openxla.org-stablehlo]] — StableHLO portability layer
- [[raw/articles/tvm.apache.org-docs-v0.11.0-how_to-deploy-index.html]] — TVM deployment docs
- [[raw/articles/docs.nvidia.com-deeplearning-tensorrt-archives-tensorrt-1060-pdf-tensorrt-developer-guide.pdf]] — TensorRT developer guide
