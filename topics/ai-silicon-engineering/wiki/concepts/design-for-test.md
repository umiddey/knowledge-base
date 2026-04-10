# Design for Test (DFT)

DFT is the discipline of designing chips so they can be tested for manufacturing defects. When a foundry fabricates your chip, some percentage of dies will have manufacturing faults — stuck-at faults (a wire permanently stuck at 0 or 1), bridge faults (two wires shorted), transition faults (signal too slow). DFT adds hardware structures so you can detect these defects quickly and cheaply.

Without DFT, testing a chip with billions of transistors is impossible. You can't just "run it and see if it works" — you need to verify every single transistor.

## Why DFT Matters

Imagine your chip has 10 billion transistors. A single manufacturing defect in any one of them can cause failures. But:
- You can't observe internal nodes directly from outside
- You can't control internal signals from outside
- Exhaustive testing (try every input combination) would take billions of years

DFT solves this by adding **controllability** (set internal nodes to specific values) and **observability** (read internal node values) through specialized test structures.

## The Three Pillars of DFT

### 1. Scan Chains
Convert every flip-flop into a **scannable flip-flop** that can be chained into a shift register. This lets you:
- **Shift in** any test pattern (controllability)
- **Shift out** the results (observability)

```
Normal mode:  D → [FF] → Q      (functional data in, Q out)
Scan mode:    SI → [FF] → SO     (scan data shifts through chain)

Full scan chain:
SI → [FF1] → [FF2] → [FF3] → ... → [FFn] → SO
         ↑ all flip-flops chained in series
```

**Example**: A chip with 1 million flip-flops has a scan chain of length 1M. To test:
1. Shift in a 1M-bit test pattern through SI (takes 1M clock cycles)
2. Apply one functional clock cycle (capture the combinational logic response)
3. Shift out the 1M-bit result through SO (takes 1M clock cycles)
4. Compare captured result against expected result

This gives you direct control and observation of every flip-flop in the design.

### 2. Built-In Self-Test (BIST)
On-chip hardware that tests itself without external equipment:

**Memory BIST (MBIST)**:
```
┌─────────────┐
│  MBIST       │ → generates test patterns → writes to SRAM → reads back → compares
│  Controller  │ → detects stuck-at faults, coupling faults, address decoder faults
└─────────────┘
```
SRAM arrays are tested with algorithms like March C-:
```
Write 0 to all locations
Read 0, Write 1 (ascending addresses)
Read 1, Write 0 (ascending addresses)
Read 0, Write 1 (descending addresses)
Read 1, Write 0 (descending addresses)
Read 0 (ascending addresses)
```

**Logic BIST (LBIST)**:
- On-chip **PRPG** (Pseudo-Random Pattern Generator) creates test patterns
- On-chip **MISR** (Multiple Input Signature Register) compresses responses into a signature
- Compare final signature against golden expected value

### 3. ATPG (Automatic Test Pattern Generation)
Software that automatically generates the test patterns for scan chains:

1. **Fault model**: Define what defects to look for (stuck-at-0, stuck-at-1, transition, path delay)
2. **Fault simulation**: Determine which faults each test pattern detects
3. **Pattern generation**: Create minimum set of patterns to achieve target coverage
4. **Coverage metrics**: 
   - **Stuck-at coverage**: typically >98% required for production
   - **Transition coverage**: >90% for at-speed testing
   - **Path delay coverage**: critical timing paths

## Test Flow in Manufacturing

```
Wafer fabrication
    ↓
Wafer test (probe card touches each die) → DFT patterns run on each die
    ↓
Good dies separated from bad dies
    ↓
Packaging (die → chip package)
    ↓
Final test (package-level test) → DFT patterns run again
    ↓
Burn-in test (run at high temp/voltage for hours) → DFT catches early life failures
    ↓
Shipping
```

## Example
Consider a 32-bit RISC-V core with a 128-bit scan chain fragment:

1. In functional mode, the flip-flops capture the CPU pipeline state.
2. In scan mode, the same flip-flops are stitched into a shift register so the tester can force a specific internal pipeline state.
3. A test pattern toggles a combinational path from ALU input to ALU output.
4. The scan-out response tells you whether the defect is in the logic cone, the register, or the routing between them.

Without scan, that same defect might only show up intermittently in system tests after packaging. With scan and ATPG, the failing pattern is known before shipment, which is why DFT is one of the most economically important parts of the flow.

## Connection to Other Concepts
- **[[vlsi-design-flow]]** — DFT (step 5) is inserted between synthesis and physical design
- **[[eda-tools]]** — Synopsys TestMAX, Siemens Tessent generate scan chains and ATPG patterns
- **[[hdl-programming]]** — you may need to add `scan_in`/`scan_out`/`scan_enable` ports to your RTL
- **[[open-source-asic-flow]]** — OpenLANE includes basic scan chain insertion

Commercial DFT writeups tend to use the same core language: scan, ATPG, BIST, and coverage closure. The terminology changes across vendors, but the physical problem is the same: make a fabricated chip observable and controllable enough that manufacturing defects can be found economically.

## Sources
- [[raw/articles/www.synopsys.com-glossary-what-is-design-for-test.html]] — What is DFT (Synopsys)
