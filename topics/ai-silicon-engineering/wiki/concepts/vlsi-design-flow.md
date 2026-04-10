# VLSI Design Flow (RTL to GDSII)

VLSI (Very Large Scale Integration) design flow is the process of turning a chip idea into a physical layout file (GDSII) that a foundry can manufacture. It's the core workflow that every chip designer must understand.

## The Complete Flow

### 1. System Specification
Define what the chip must do: performance targets, power budget, area constraints, interfaces, and protocols. This drives every subsequent decision.

### 2. RTL Design (Register Transfer Level)
Write the chip's behavior in an HDL (Verilog, SystemVerilog, VHDL, or Chisel). RTL describes how data moves between registers and what logic operations happen on each clock cycle. This is where you spend most of your time as a frontend designer.

```verilog
// Example: simple 2:1 multiplexer in Verilog
module mux2to1(
    input  [7:0] a, b,
    input        sel,
    output [7:0] y
);
    assign y = sel ? b : a;
endmodule
```

### 3. Functional Verification
Simulate the RTL to prove it behaves correctly. This is arguably the hardest part — verification consumes 60-70% of total design effort. Techniques include:
- **Simulation** — run testbenches (SystemVerilog UVM)
- **Formal verification** — mathematical proof of correctness
- **Emulation** — run RTL on FPGA-based emulators for speed

### 4. Logic Synthesis
Convert RTL into a gate-level netlist — actual logic gates (AND, OR, NAND, flip-flops) from the target technology library. The synthesizer optimizes for area, timing, and power. Output is technology-mapped gates, not transistors.

### 5. Design for Test (DFT)
Insert test structures so manufactured chips can be checked for defects:
- **Scan chains** — chain flip-flops together so you can shift test patterns in/out
- **BIST** (Built-In Self-Test) — on-chip circuitry that tests memory and logic
- **ATPG** (Automatic Test Pattern Generation) — software generates test vectors
- Without DFT, a chip with billions of transistors is impossible to test

### 6. Floorplanning
Decide where major blocks go on the die. Place I/O pads, hard macros (memory, analog IP), and partition the floorplan. This is like urban planning for a chip.

### 7. Power Planning
Design the power delivery network (PDN) — VDD and GND rings, stripes, and meshes. Poor power planning causes voltage drop (IR drop) that makes the chip fail.

### 8. Placement
Position every standard cell (gate) in the floorplan. The placer optimizes for timing, congestion, and power. Modern chips have millions to billions of placed cells.

### 9. Clock Tree Synthesis (CTS)
Route clock signals to every flip-flop with balanced delays (low skew). Clock skew causes setup/hold timing violations. The clock tree can consume 30-50% of total dynamic power.

### 10. Routing
Connect all placed cells with metal wires across multiple routing layers (6-15+ metal layers in modern processes). The router must satisfy design rules (minimum width, spacing, via rules) while meeting timing.

### 11. Static Timing Analysis (STA)
Check that every path meets its timing constraint at all process/voltage/temperature corners. No simulation — static analysis of all paths. If timing fails, go back and fix placement/routing.

### 12. Physical Verification
- **DRC** (Design Rule Check) — layout follows foundry rules
- **LVS** (Layout vs Schematic) — layout matches the netlist
- **ERC** (Electrical Rule Check) — no shorts, floating nets, etc.

### 13. GDSII Export
Generate the final layout file (GDSII format) sent to the foundry for mask making and fabrication.

## Key Tools by Stage

| Stage | Commercial Tools | Open Source |
|-------|-----------------|-------------|
| RTL Design | Any text editor + linting | Verilator (linting) |
| Simulation | Synopsys VCS, Cadence Xcelium | Icarus Verilog, Verilator |
| Synthesis | Synopsys Design Compiler | Yosys |
| Place & Route | Cadence Innovus, Synopsys ICC2 | OpenROAD |
| STA | Synopsys PrimeTime | OpenSTA |
| DRC/LVS | Synopsys IC Validator, Cadence PVS | Magic (for Sky130) |
| Full flow | Cadence/Synopsys suites | OpenLANE + Sky130 |

## Example
Trace a tiny 2-input AND gate through the flow:

1. In RTL, you write `assign y = a & b;`.
2. In synthesis, the tool maps that expression to a standard-cell AND gate in the target library.
3. In placement, the cell is assigned a legal site in the floorplan.
4. In routing, metal layers connect the inputs and output to the rest of the design.
5. In DRC and LVS, the tool checks that the physical layout obeys foundry rules and still matches the netlist.
6. In GDSII, the final geometry is emitted as a manufacturable layout.

That simple gate is the whole chip-design story in miniature: logic description, verification, physical implementation, and manufacturing data output.

The same stage ordering shows up in commercial and open-source flows alike. The tool names change, but the constraints do not: verify early, close timing late, and treat layout, DFT, and signoff as part of the design.

## Related Concepts
- [[hdl-programming]] — writing RTL code in Verilog/SystemVerilog
- [[eda-tools]] — the software tools for each stage
- [[design-for-test]] — DFT techniques in depth
- [[open-source-asic-flow]] — OpenLANE/OpenROAD + Sky130 for free chip design

## Sources
- [[raw/articles/www.leadsoc.com-vlsi-design-flow]] — VLSI design flow RTL to GDSII explained
- [[raw/articles/nsemidesign.com-rtl-to-gdsii-a-complete-guide-to-end-to-end-vlsi-design-execution]] — RTL to GDSII complete guide
- [[raw/articles/www.einfochips.com-blog-asic-design-flow-in-vlsi-engineering-services-a-quick-guide]] — ASIC design flow
- [[raw/articles/www.tessolve.com-blogs-from-concept-to-gdsii-a-deep-dive-into-the-vlsi-design-flow]] — deep dive VLSI flow
- [[raw/articles/moschip.com-blog-silicon-engineering-services-the-complete-guide-to-silicon-design-and-development-services]] — silicon design and development services overview
- [[raw/articles/openroad-flow-scripts.readthedocs.io-en-latest-tutorials-FlowTutorial.html]] — OpenROAD flow tutorial
