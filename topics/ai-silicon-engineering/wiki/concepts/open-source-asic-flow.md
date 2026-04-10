# Open-Source ASIC Flow (OpenLANE, OpenROAD, Sky130)

You can design a real chip and send it to a foundry for fabrication using **entirely free, open-source tools**. This is revolutionary — until recently, chip design required millions in software licenses. The open-source flow lets you go from RTL code to a manufacturable layout for $0 in tooling (fabrication itself costs money, but Google+Efabless have run free chip fabrication programs).

## The Stack

```
Your Verilog/SystemVerilog RTL code
           ↓
    ┌──────────────┐
    │   OpenLANE    │ ← automated flow manager (calls the tools below)
    └──────┬───────┘
           ↓
    ┌──────────────┐
    │    Yosys      │ ← synthesis: RTL → gate-level netlist
    └──────┬───────┘
           ↓
    ┌──────────────┐
    │  OpenROAD     │ ← place & route: gates → physical layout
    └──────┬───────┘
           ↓
    ┌──────────────┐
    │   Magic      │ ← layout viewer, DRC, LVS
    └──────┬───────┘
           ↓
    ┌──────────────┐
    │   Sky130 PDK  │ ← process design kit: foundry rules + cell library
    └──────┬───────┘
           ↓
       GDSII file → send to foundry
```

## Sky130 PDK

The **SkyWater 130nm Process Design Kit** is the first truly open-source PDK. Created by Google and SkyWater foundry.

**What 130nm means**: This is a 2001-era process node. For comparison, cutting-edge is 3nm. But 130nm is:
- **Free to use** (most PDKs require NDA + $$$)
- **Well-documented** (full cell library, design rules, SPICE models)
- **Good enough for learning, IoT, and many real products**
- ~50,000 gates per mm² (vs millions on 3nm)

### Example: A standard cell in Sky130
```
Sky130_fd_sc_hd (high-density standard cell library)
├── sky130_fd_sc_hd__and2_1  → 2-input AND gate
├── sky130_fd_sc_hd__inv_1   → inverter
├── sky130_fd_sc_hd__dfbp_1  → D flip-flop
├── sky130_fd_sc_hd__mux2_1  → 2:1 mux
└── ... hundreds more cells
```

Your synthesized design maps to these physical cells. Each cell has a fixed height (standard cell row) and variable width. The P&R tool places them in rows and routes wires between them.

The SkyWater documentation matters because the flow is only "open source" if the process assumptions are actually documented. The PDK tells you the device models, cell libraries, and physical rules that make the chip manufacturable. Without that, OpenROAD is just a demo; with it, the flow becomes a real path from RTL to GDSII.

## OpenLANE Flow Step-by-Step

Here's what actually happens when you run the flow on a simple design:

### Example: Running a 4-bit counter through OpenLANE

```bash
# 1. Write your RTL (counter.v)
module counter (
    input  clk, rst,
    output [3:0] count
);
always @(posedge clk or posedge rst) begin
    if (rst) count <= 0;
    else     count <= count + 1;
end
endmodule

# 2. Configure the flow
# Edit config.json: set design name, clock period, target density

# 3. Run the full flow
make flow

# 4. What happens inside:
#    Yosys: counter.v → netlist of Sky130 cells (inverters, flip-flops, adders)
#    OpenROAD:
#      - Floorplan: define die area, place IO pins
#      - Place: arrange each gate on the grid
#      - CTS: route clock to all flip-flops
#      - Route: connect everything with metal wires
#    Magic: check DRC (design rule violations)
#    Netgen: check LVS (layout matches schematic)

# 5. Output: GDSII file in results/final/
```

## OpenROAD: The P&R Engine

OpenROAD automates the hardest parts of physical design:

| Stage | What it does | Key challenge |
|-------|-------------|---------------|
| Floorplan | Define die shape, place macros | Pin assignment affects routability |
| Global Placement | Rough cell positions | Balance wirelength, congestion, timing |
| Detailed Placement | Legalize to grid sites | No overlaps, align to rows |
| CTS | Build clock tree | Minimize skew across all flip-flops |
| Global Route | Plan wire paths | Avoid congestion hotspots |
| Detailed Route | Actual metal wiring | Respect all design rules |
| STA | Check timing | Must meet setup/hold at all corners |

### Connection to [[vlsi-design-flow]]
OpenROAD replaces Cadence Innovus or Synopsys ICC2 — it does steps 6-11 from the VLSI flow (floorplanning through routing and STA). Yosys replaces Synopsys Design Compiler for synthesis.

### Connection to [[hdl-programming]]
Your Verilog/SystemVerilog code is the input. The quality of your RTL directly affects P&R results — poorly written RTL with excessive muxing or long combinational paths causes timing failures.

### Connection to [[eda-tools]]
OpenLANE+OpenROAD is the free alternative to the $1-5M/year Synopsys+Cadence stack. Less capable for cutting-edge designs, but sufficient for learning and many real products at 130nm.

## Getting Started (Practical)

```bash
# Install OpenROAD via Docker (easiest)
docker pull openroad/openroad-flow-scripts

# Clone a tutorial design
git clone https://github.com/The-OpenROAD-Project/OpenROAD-flow-scripts

# Run the tutorial
cd OpenROAD-flow-scripts/flow
make gui  # opens the visual layout viewer
```

**Recommended learning path:**
1. Run the tutorial flow on a provided design (SPM — a simple parity module)
2. Modify an existing design and see how the layout changes
3. Write your own small RTL module and take it through the flow
4. Study timing reports and learn to fix violations
5. Try the Efabless/Google chipIgnition program for free fabrication

## Example
Take a tiny UART transmitter:

1. You write the RTL in Verilog and verify it in simulation.
2. Yosys synthesizes the logic into Sky130 standard cells.
3. OpenROAD places and routes those cells around the clock, reset, and data path constraints.
4. Magic checks DRC/LVS so the layout obeys the process rules and still matches the netlist.
5. The resulting GDSII is ready for shuttle fabrication.

That workflow is why the open-source flow matters: it gives you a real manufacturing path, not just a simulator.

The OpenROAD tutorial shows the same stack on Ibex, a real 32-bit RISC-V core. That is useful because it proves the flow is not just a toy example: you can tune platform variables, inspect timing and area reports, and debug the physical backend like you would in a commercial flow.

## Related Concepts
- [[vlsi-design-flow]] — the complete design process this implements
- [[hdl-programming]] — writing the RTL input to this flow
- [[eda-tools]] — commercial alternatives (Synopsys, Cadence)
- [[fpga-asic-development]] — choosing between FPGA prototyping and ASIC tapeout

## Sources
- [[raw/articles/openroad-flow-scripts.readthedocs.io-en-latest-tutorials-FlowTutorial.html]] — OpenROAD flow tutorial (official)
- [[raw/papers/woset-workshop.github.io-PDFs-2020-a21.pdf]] — OpenLANE paper (WOSET 2020)
- [[raw/other/skywater-pdk.readthedocs.io-index]] — official SkyWater 130nm PDK documentation
- [[raw/articles/openroad-flow-scripts.readthedocs.io-en-latest-tutorials-FlowTutorial.html.md]] — OpenROAD flow tutorial mirror
