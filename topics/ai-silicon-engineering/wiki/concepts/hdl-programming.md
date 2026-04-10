# HDL Programming (Verilog, SystemVerilog, Chisel)

Hardware Description Languages (HDLs) are how you write code that becomes physical hardware. Unlike software programming where instructions execute sequentially on a processor, HDL code **describes physical circuits** — wires, gates, flip-flops, and the connections between them.

## The Fundamental Mindset Shift

Software: "Do this, then do that" (sequential instructions)
Hardware: "These wires connect to these gates, data flows like this every clock cycle" (concurrent structure)

Everything in an HDL happens **in parallel** by default. There is no implicit ordering.

## Verilog

The most widely used HDL. C-like syntax. Two main styles:

### Behavioral (for simulation and high-level design)
```verilog
module counter(
    input clk, rst,
    output reg [7:0] count
);
always @(posedge clk or posedge rst) begin
    if (rst)
        count <= 8'd0;
    else
        count <= count + 1;
end
endmodule
```

### Structural (explicit gate-level)
```verilog
module and_gate(input a, b, output y);
    assign y = a & b;
endmodule
```

### Key Verilog Concepts
- **`assign`** — combinational logic (continuous assignment)
- **`always @(posedge clk)`** — sequential logic (clock-triggered)
- **`<=` (non-blocking)** vs **`=` (blocking)** — critical distinction in sequential logic
- **`wire`** vs **`reg`** — wire = combinational output, reg = can hold state (but not necessarily a register)
- **`parameter`** — compile-time constants for configurable designs

## SystemVerilog (SV)

Superset of Verilog with features for both design and verification:
- **Interfaces** — bundled groups of signals (like a struct for wires)
- **Classes and OOP** — for testbench code (verification)
- **Assertions (SVA)** — formal properties that must hold true
- **Packages** — namespacing for reusable code
- **`always_ff`**, **`always_comb`** — explicit intent (sequential vs combinational)
- **`logic`** type — replaces `wire`/`reg` ambiguity
- **UVM** (Universal Verification Methodology) — industry-standard verification framework built on SV classes

```systemverilog
// Modern SystemVerilog style
module counter_sv (
    input  logic clk, rst,
    output logic [7:0] count
);
always_ff @(posedge clk or posedge rst) begin
    if (rst) count <= '0;
    else     count <= count + 1;
end
endmodule
```

## Chisel (Constructing Hardware in Scala)

Chisel is a modern HDL embedded in Scala. It generates Verilog as output. Used by many RISC-V designs (Rocket Chip, BOOM) and gaining adoption.

```scala
// Chisel: 8-bit counter
class Counter extends Module {
  val io = IO(new Bundle {
    val out = Output(UInt(8.W))
  })
  val count = RegInit(0.U(8.W))
  count := count + 1.U
  io.out := count
}
```

### Why Chisel?
- **Parameterization** — easily create families of designs (e.g., "make this a 32-bit OR 64-bit ALU")
- **Abstraction** — Scala's OOP and functional programming for hardware generation
- **Type safety** — catches width mismatches and other bugs at generation time
- **Ecosystem** — FIRRTL compiler, Rocket Chip standard library

## Learning Path (Practical)

1. **Start with Verilog** — use Icarus Verilog (`iverilog`) for simulation, write basic combinational and sequential circuits
2. **Learn SystemVerilog** for verification — classes, UVM, assertions
3. **Try Chisel** if you want modern abstraction or plan to work with RISC-V
4. **Practice on FPGA** — get a cheap FPGA board (e.g., Lattice iCE40, Xilinx Artix) and synthesize your designs
5. **Use the open-source flow** — Yosys (synthesis) + nextpnr (place & route) for iCE40/ECP5

## Simulation Tools
- **Icarus Verilog (`iverilog`)** — free, good for learning, Verilog only
- **Verilator** — fast, linting + simulation, Verilog/SystemVerilog subset
- **Synopsys VCS / Cadence Xcelium** — industry standard (expensive, but student licenses exist)
- **Cocotb** — Python-based testbench framework (write testbenches in Python instead of SV)

## Example
Suppose you want a 2-bit adder that you can later synthesize into FPGA or ASIC logic:

1. In Verilog, you describe the combinational logic with `assign` statements or an `always_comb` block.
2. In SystemVerilog, you can wrap it with an interface and write assertions that the sum is always correct for every input pair.
3. In a Chisel generator, you could parameterize the width so the same source builds 2-bit, 8-bit, or 32-bit adders.
4. The simulator catches bugs before hardware exists; the synthesizer later turns the same description into gates and flip-flops.

That is the core difference between HDL and software: you are not writing steps for a CPU to execute, you are describing the structure that the toolchain will physically realize.

## Related Concepts
- [[vlsi-design-flow]] — where HDL fits in the overall chip design process
- [[risc-v-processor-design]] — practical processor design using HDLs
- [[open-source-asic-flow]] — free tools for going from HDL to silicon
- [[fpga-asic-development]] — choosing between FPGA and ASIC paths

## Sources
- [[raw/articles/github.com-m3y54m-FPGA-ASIC-Roadmap-blob-master-README.md]] — comprehensive FPGA/ASIC learning roadmap
- [[raw/articles/www.imm.dtu.dk-~masca-chisel-book.pdf]] — Digital Design with Chisel (full textbook)
- [[raw/articles/www.chisel-lang.org]] — Chisel official documentation
