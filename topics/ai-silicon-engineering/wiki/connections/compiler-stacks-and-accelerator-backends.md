# Compiler Stacks and Accelerator Backends

Modern AI hardware is only as useful as the compiler stack that targets it. A TPU without XLA is just a specialized matrix engine that cannot execute real models. A GPU without CUDA libraries, TensorRT, and compiler support is just a programmable parallel chip. The architecture and the compiler are not separate layers; they are two halves of the same product.

## Concepts Linked
- [[ai-compilers]]
- [[nvidia-gpu-architecture]]
- [[google-tpu-architecture]]
- [[ai-accelerator-design]]
- [[cuda-programming]]

## Example
Take the same transformer inference workload:

1. On an NVIDIA H100, TensorRT fuses layers, chooses precision, and emits optimized GPU kernels for Tensor Cores.
2. On a TPU, XLA lowers the graph into HLO, tiles it for the systolic array, and keeps the unified buffer hot.
3. On a custom accelerator, a TVM backend or MLIR-based pipeline must encode the chip's dataflow, memory limits, and supported operators.

The model is the same. The useful execution path is different because the compiler backend is different.

## Analysis
This is the central lesson of modern silicon engineering for AI. The frontier is not just "better hardware" or "better software"; it is co-design. Hardware that is too generic leaves performance on the table. Hardware that is too rigid needs an excellent compiler stack to be usable.

That is why the strongest AI platforms pair an architecture with a compiler ecosystem:
- NVIDIA pairs GPUs with CUDA, cuDNN, and TensorRT.
- Google pairs TPUs with XLA and StableHLO.
- Custom accelerator teams increasingly rely on TVM, MLIR, or proprietary backend compilers.

The decision framework is simple: if you cannot describe the mapping from model graph to machine instructions, you do not really have a deployable accelerator.

