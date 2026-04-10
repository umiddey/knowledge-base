# FPGA and ASIC Development Path

FPGAs and ASICs are two ways to turn your HDL code into working hardware. FPGAs are reprogrammable — you can change your design after the chip is made. ASICs are custom silicon — fixed once manufactured, but much faster and more efficient.

## FPGA (Field-Programmable Gate Array)

An FPGA is a chip with a grid of configurable logic blocks that you can program to implement any digital circuit.

### How FPGAs Work
```
┌─────────────────────────────────────┐
│  [CLB] [CLB] [CLB] [CLB]           │
│  [CLB] [CLB] [CLB] [CLB]           │  CLB = Configurable Logic Block
│  [CLB] [CLB] [CLB] [CLB]           │  Each CLB contains:
│  [CLB] [CLB] [CLB] [CLB]           │    - LUTs (Lookup Tables: any logic function)
│                                     │    - Flip-flops
│  [DSP] [DSP] [DSP] [DSP]           │    - Carry chains (fast arithmetic)
│  [BRAM][BRAM][BRAM][BRAM]          │  DSP = multiply-accumulate units
│  [IO]  [IO]  [IO]  [IO]            │  BRAM = on-chip memory blocks
└─────────────────────────────────────┘
```

A **LUT** (Lookup Table) is a small RAM that implements any boolean function:
```
4-input LUT: 16-bit SRAM
  Input 0000 → output = RAM[0]
  Input 0001 → output = RAM[1]
  ...
  Input 1111 → output = RAM[15]

By programming the 16 RAM bits, you implement ANY 4-input logic function.
```

### Major FPGA Families

| Vendor | Family | Use Case | Approx Cost |
|--------|--------|----------|-------------|
| Xilinx/AMD | Artix-7 | Learning, embedded | $50-200 (board) |
| Xilinx/AMD | Kintex/Virtex | High-end, AI accel | $500-10,000+ |
| Intel/Altera | Cyclone | Learning, embedded | $50-200 |
| Intel/Altera | Stratix | High-end | $1,000+ |
| Lattice | iCE40 | **Fully open-source flow** | $20-50 |
| Lattice | ECP5 | Open-source, capable | $50-150 |

### Open-Source FPGA Flow (Lattice)
```
Your Verilog → Yosys (synthesis) → nextpnr (place & route) → bitstream → FPGA
```
The Lattice iCE40 and ECP5 are the only FPGAs with a fully open-source toolchain. This makes them the best choice for learning.

**Example: Blink an LED on iCE40**
```verilog
// blink.v — 1Hz LED blink on 12MHz clock
module blink(
    input  clk,      // 12 MHz clock
    output led
);
reg [23:0] counter;
always @(posedge clk) counter <= counter + 1;
assign led = counter[23]; // divide 12MHz by 2^24 ≈ 0.7Hz
endmodule
```
```bash
# Synthesize, place & route, generate bitstream
yosys -p "synth_ice40 -top blink -blif blink.blif" blink.v
nextpnr-ice40 --hx1k --pcf icestick.pcf --blif blink.blif --asc blink.asc
icepack blink.asc blink.bin
# Flash to FPGA
iceprog blink.bin
```

## ASIC (Application-Specific Integrated Circuit)

An ASIC is custom silicon designed for exactly one purpose. No reprogrammability — the physical transistor layout is fixed at manufacture.

### When to Choose ASIC over FPGA
- **Volume > 100K units** — ASIC's lower per-unit cost amortizes the $5-50M design cost
- **Performance critical** — ASIC is 10-100x faster than FPGA (no LUT overhead)
- **Power critical** — ASIC uses 10-50x less power than FPGA
- **Area constrained** — ASIC is 10-20x smaller than equivalent FPGA

### ASIC vs FPGA Comparison

| Aspect | FPGA | ASIC |
|--------|------|------|
| Time to market | Weeks | 12-18 months |
| NRE cost | $0 (dev board) | $5-50M (design + masks) |
| Per-unit cost | $10-10,000 | $0.50-50 (at volume) |
| Performance | Limited by LUT overhead | Maximum possible |
| Power | 10-50x more than ASIC | Minimum |
| Flexibility | Reprogram anytime | Zero (frozen at fab) |
| Design risk | Low (just reprogram) | High (one bug = $millions) |

### Connection to Other Concepts
- **[[vlsi-design-flow]]** — the full ASIC design process from RTL to GDSII
- **[[open-source-asic-flow]]** — how to do ASIC design with free tools (Sky130 + OpenLANE)
- **[[hdl-programming]]** — write Verilog/SystemVerilog that targets both FPGA and ASIC
- **[[eda-tools]]** — commercial tools for FPGA (Vivado, Quartus) and ASIC (Synopsys, Cadence)

### Learning Path
1. **Start with FPGA** — buy a Lattice iCE40 board ($30), use open-source tools, learn Verilog by building things
2. **Build increasingly complex projects**: LED blink → UART → SPI controller → simple CPU → RISC-V core
3. **Transition to ASIC flow** — learn Yosys + OpenROAD + Sky130 PDK via OpenLANE
4. **Study timing** — learn STA, setup/hold violations, clock tree design
5. **Consider Efabless/Google free tapeout programs** — actually get your chip manufactured

## Example
Say you build a 4-bit counter:

1. On an FPGA, you synthesize it, load the bitstream, and immediately watch LEDs or a seven-segment display count up.
2. If you discover a bug, you change the Verilog and reprogram the board in minutes.
3. When you later move the same counter into an ASIC flow, the logic is still similar, but now you care about scan insertion, timing closure, and physical layout.
4. The ASIC version is much faster and lower power, but a bug costs a full tapeout cycle instead of a reboot.

That is why FPGA is the right learning bridge: it gives you hardware reality without the cost and irreversibility of silicon fabrication.

Generator-based hardware design sits nicely on top of this. Chisel-generated RTL can target both FPGA boards and ASIC flows, which makes it a natural bridge between quick prototyping and eventually manufacturable silicon.

## Sources
- [[raw/articles/github.com-m3y54m-FPGA-ASIC-Roadmap-blob-master-README.md]] — comprehensive FPGA/ASIC roadmap
- [[raw/articles/openroad-flow-scripts.readthedocs.io-en-latest-tutorials-FlowTutorial.html]] — OpenROAD ASIC flow tutorial
- [[raw/articles/www.chisel-lang.org]] — Chisel as a hardware construction language
