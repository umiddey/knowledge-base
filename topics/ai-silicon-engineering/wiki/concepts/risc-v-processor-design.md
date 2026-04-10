# RISC-V Processor Design

RISC-V is a free, open-source Instruction Set Architecture (ISA). Unlike x86 (Intel/AMD proprietary) or ARM (licensed), anyone can implement a RISC-V processor without paying royalties. It's becoming the standard for custom chip design, from IoT microcontrollers to datacenter CPUs.

## Why RISC-V Matters for AI Silicon Engineering
- You can **actually design a RISC-V processor from scratch** as a learning project
- Many AI accelerators use RISC-V cores for control logic
- The open ecosystem means free tools, free IP, and no licensing barriers
- Companies like SiFive, Tenstorrent, and Alibaba are building commercial RISC-V chips

## ISA Structure

### Base Integer ISAs
- **RV32I** — 32-bit, 37 base instructions (start here)
- **RV64I** — 64-bit base
- **RV128I** — 128-bit (future)

### Standard Extensions
- **M** — Multiply/divide
- **A** — Atomic operations (for multicore)
- **F** — Single-precision float
- **D** — Double-precision float
- **C** — Compressed 16-bit instructions (smaller code size)
- **V** — Vector operations (SIMD for AI/ML — this is the big one)

### Common Combinations
- **RV32IMAC** — embedded/microcontroller
- **RV64GC** (= RV64IMAFDC) — general-purpose 64-bit, Linux-capable

## Instruction Format (RV32I)

All instructions are 32 bits. Six formats: **R, I, S, B, U, J** (mnemonic: "RISBUJ")

```
R-type: [funct7(7)][rs2(5)][rs1(5)][funct3(3)][rd(5)][opcode(7)]
        → Register-to-register ALU ops (ADD, SUB, AND, OR, XOR, etc.)

I-type: [imm(12)][rs1(5)][funct3(3)][rd(5)][opcode(7)]
        → Immediate ALU ops, loads, JALR

S-type: [imm(7)][rs2(5)][rs1(5)][funct3(3)][imm(5)][opcode(7)]
        → Store operations

B-type: [imm(1)][imm(6)][rs2(5)][rs1(5)][funct3(3)][imm(4)][imm(1)][opcode(7)]
        → Conditional branches

U-type: [imm(20)][rd(5)][opcode(7)]
        → LUI, AUIPC (upper immediate)

J-type: [imm(20)][rd(5)][opcode(7)]
        → JAL (jump and link)
```

32 general-purpose registers (x0-x31). **x0 is hardwired to zero** — write to it = discard result, read from it = always 0. Elegant.

## Designing a RISC-V CPU (Practical Project)

### Step 1: Understand the ISA
Read the RISC-V spec (rv32i is enough to start). Understand every instruction's encoding and behavior.

### Step 2: Define Architecture
Choose your pipeline depth:
- **Single-cycle** — simplest, every instruction takes 1 clock cycle (but clock is slow)
- **3-stage** (fetch/decode/execute) — basic pipelining
- **5-stage** (IF/ID/EX/MEM/WB) — classic RISC pipeline, good balance
- **In-order vs out-of-order** — start in-order (simpler), OoO is advanced

### Step 3: Write RTL
Implement in Verilog/SystemVerilog:
```
1. Program Counter (PC) management
2. Instruction Fetch unit
3. Instruction Decode + Register File
4. ALU (arithmetic logic unit)
5. Data Memory interface
6. Control unit (generates control signals)
7. Hazard detection and forwarding (for pipelined)
```

### Step 4: Test with Simulation
Write testbenches, run simple programs (Fibonacci, sorting), verify against ISA simulator (Spike).

### Step 5: Implement on FPGA
Synthesize your design onto an FPGA board. Run real programs on your processor.

## Open-Source RISC-V Cores to Study
- **Rocket** — parameterized, in-order, written in Chisel (UC Berkeley)
- **BOOM** — out-of-order, high-performance, written in Chisel
- **Ibex** — simple 2-stage pipeline, written in SystemVerilog (lowRISC)
- **CVA6 (Ariane)** — 6-stage in-order, written in SystemVerilog
- **PQR5 (Pequeno)** — educational pipelined RV32I in SystemVerilog

## Tools
- **Spike** — official ISA simulator (C++)
- **QEMU** — full system emulation
- **GCC/LLVM** — RISC-V cross-compiler toolchain
- **Verilator** — fast Verilog simulation

The unprivileged ISA manual is the source of truth for how your CPU must behave. If you build even a tiny RV32I core, every opcode, immediate encoding, and branch behavior has to match that spec exactly or the software toolchain breaks.

The open-source ecosystem makes this a practical learning path. You can study a small core in an open flow, map it to a real PDK, and then grow the design into a generator-based implementation if you want more reuse and parameterization.

## Related Concepts
- [[hdl-programming]] — the languages you write processor RTL in
- [[vlsi-design-flow]] — the full flow from RTL to manufactured chip
- [[fpga-asic-development]] — implementing your design on real hardware

## Sources
- [[raw/articles/nikhilrajput.com-blog-risc-v-architecture]] — RISC-V architecture complete tutorial
- [[raw/articles/chipmunklogic.com-designing-pequeno-risc-v-cpu-from-scratch]] — designing RISC-V CPU from scratch
- [[raw/other/docs.riscv.org-reference-isa-manual-unprivileged]] — canonical RISC-V unprivileged ISA manual
- [[raw/articles/openroad-flow-scripts.readthedocs.io-en-latest-tutorials-FlowTutorial.html]] — Ibex-based OpenROAD tutorial
