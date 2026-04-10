# From Code to Silicon: The Complete Learning Path

How everything connects when going from zero knowledge to writing code that runs on chips (Verilog for FPGA/ASIC, CUDA for GPU).

## The Path

```
PHASE 1: FOUNDATIONS          PHASE 2: METHODOLOGY
┌─────────────────────┐      ┌──────────────────────┐
│ [[semiconductor-    │      │ [[vlsi-design-flow]]  │
│  fundamentals]]     │─────→│  RTL to GDSII process │
│  How transistors    │      │                      │
│  make chips         │      │ [[hdl-programming]]   │
│                     │      │  Verilog/SV/Chisel    │
│ [[processing-unit-  │      │                      │
│  types]]            │      │ [[eda-tools]]         │
│  CPU/GPU/TPU/NPU/   │      │  Synopsys/Cadence/    │
│  FPGA/ASIC          │      │  open-source          │
└─────────────────────┘      │                      │
                              │ [[design-for-test]]  │
                              │  Scan chains, BIST   │
                              └──────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    ↓                   ↓                   ↓
PHASE 3: AI HARDWARE    PHASE 4: CODING       PHASE 5: ADVANCED
┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐
│ [[nvidia-gpu-    │  │ [[cuda-          │  │ [[risc-v-processor │
│  architecture]]  │  │  programming]]   │  │  -design]]         │
│ Hopper/Blackwell │  │ Write GPU code   │  │ Build your own CPU │
│                  │  │                  │  │                    │
│ [[google-tpu-    │  │ [[fpga-asic-     │  │ [[ai-for-chip-    │
│  architecture]]  │  │  development]]   │  │  design]]          │
│ Systolic arrays  │  │ FPGA boards,     │  │ ML-optimized EDA  │
│                  │  │ open-source flow │  │                    │
│ [[ai-accelerator │  │                  │  │ [[ai-compilers]]   │
│  -design]]       │  │ [[open-source-   │  │ TVM, XLA, TRT     │
│ Dataflow patterns│  │  asic-flow]]     │  │                    │
│ Roofline model   │  │ Sky130+OpenROAD  │  │                    │
└──────────────────┘  └──────────────────┘  └────────────────────┘
```

## Key Connection: Why CUDA and Verilog Are Related

CUDA and Verilog solve the same problem from opposite directions:

- **CUDA**: You write software that runs on fixed GPU hardware. You're programming existing transistors.
- **Verilog**: You describe hardware that will become physical transistors. You're creating the hardware itself.

Understanding [[nvidia-gpu-architecture]] deeply makes you a better CUDA programmer because you know what the hardware is actually doing. Understanding [[ai-accelerator-design]] patterns lets you reason about what hardware SHOULD look like for your workload, which makes you a better Verilog designer.

## Key Connection: The Compiler-Hardware Bridge

AI compilers ([[ai-compilers]]) are the bridge between ML models and hardware:

```
PyTorch model
    ↓
AI Compiler (TVM/XLA/TensorRT)
    ↓
    ├→ CUDA kernels → runs on NVIDIA GPU
    ├→ TPU instructions → runs on Google TPU systolic array
    ├→ LLVM IR → runs on CPU
    └→ Custom backend → runs on YOUR accelerator
```

If you design a custom accelerator in Verilog, you need a compiler backend to make it useful. The hardware design and the compiler are two halves of one system.

## Example
A student starts with a Verilog UART, then builds a tiny RISC-V core, then tries CUDA on a GPU:

1. The UART teaches sequential logic, synthesis, and timing.
2. The RISC-V core teaches instruction decoding, register files, and the discipline of matching an ISA spec.
3. The CUDA kernel teaches how fixed hardware executes a software abstraction in parallel.
4. The AI compiler layer becomes the bridge when they want a model or graph to run on an accelerator without hand-writing every kernel.

That path is the point of the learning map: each step introduces a new abstraction layer, but they all converge on the same physical reality.

## Analysis
The flow from code to silicon is not linear in practice. It is a stack of mutually dependent skills: understanding semiconductor fundamentals helps you understand RTL; understanding RTL helps you understand synthesis and timing; understanding hardware architecture helps you write better CUDA and better accelerators.

The reason this connection matters is that silicon engineering is full of leaky abstractions. A nice HDL module can fail because of a timing corner. A nice accelerator can fail because the compiler cannot map the graph. A nice GPU kernel can fail because the memory system is the bottleneck. The learning path only works if you keep those layers connected.

## Concepts Linked
- [[semiconductor-fundamentals]]
- [[processing-unit-types]]
- [[vlsi-design-flow]]
- [[hdl-programming]]
- [[cuda-programming]]
- [[nvidia-gpu-architecture]]
- [[google-tpu-architecture]]
- [[ai-accelerator-design]]
- [[ai-compilers]]
- [[risc-v-processor-design]]
- [[eda-tools]]
- [[design-for-test]]
- [[open-source-asic-flow]]
- [[fpga-asic-development]]
- [[ai-for-chip-design]]
