# EDA Tools (Electronic Design Automation)

EDA tools are the software you use to design chips. Think of them as the IDE, compiler, debugger, and CI/CD pipeline for hardware design. The EDA industry is a duopoly dominated by Synopsys and Cadence, with Siemens EDA (formerly Mentor Graphics) as third player.

## The Big Three

### Synopsys (SNPS)
Market leader. Strongest in:
- **Synthesis**: Design Compiler (DC) — converts RTL to gate-level netlist
- **Static Timing Analysis**: PrimeTime — checks all timing constraints
- **Verification**: VCS — RTL simulation
- **IP**: DesignWare library of pre-built IP blocks (USB, PCIe, etc.)
- **AI tools**: DSO.ai (design space optimization), using ML for physical design

### Cadence (CDNS)
Strongest in:
- **Place & Route**: Innovus — places cells and routes wires on the die
- **Analog/Mixed-Signal**: Virtuoso — analog circuit design and layout
- **Simulation**: Xcelium — RTL simulation
- **Digital full flow**: Genus (synthesis) + Innovus (P&R) as an alternative to Synopsys

### Siemens EDA (formerly Mentor Graphics)
- **Calibre** — DRC/LVS physical verification (industry standard)
- **Questa** — simulation and verification
- **Tessent** — DFT (design for test)

## Tool Flow by Design Stage

```
RTL Design → Verilator/linting (free) or Spyglass (Synopsys)
    ↓
Simulation → VCS (Synopsys) or Xcelium (Cadence) or Icarus Verilog (free)
    ↓
Synthesis → Design Compiler (Synopsys) or Genus (Cadence) or Yosys (free)
    ↓
DFT → Tessent (Siemens) or DFT Compiler (Synopsys)
    ↓
Place & Route → ICC2 (Synopsys) or Innovus (Cadence) or OpenROAD (free)
    ↓
STA → PrimeTime (Synopsys) or Tempus (Cadence) or OpenSTA (free)
    ↓
Physical Verification → Calibre (Siemens) or IC Validator (Synopsys)
    ↓
Signoff → Multiple tools converge on final GDSII
```

## Cost Reality
- Full Synopsys/Cadence suite: **$1-5M/year per seat**
- University programs: free or heavily discounted access
- Open-source alternative: Yosys + OpenROAD + Sky130 PDK = $0 (but less capable)

AI is now layered into the commercial stack too. Vendors are using reinforcement learning, generative models, and agentic assistants to accelerate design search, verification, and routine setup work.

## Example
Imagine a small accelerator RTL block:

1. You lint it with Verilator or a commercial linter to catch obvious coding mistakes.
2. You simulate it in VCS, Xcelium, or Icarus Verilog to verify the behavior.
3. You synthesize it in Design Compiler, Genus, or Yosys to turn RTL into a gate-level netlist.
4. You place and route it in Innovus, ICC2, or OpenROAD to turn gates into physical geometry.
5. You run PrimeTime or OpenSTA to confirm it meets timing.
6. You run Calibre or Magic-based checks to ensure the layout obeys the process rules.

The point of EDA is that each tool catches a different class of failure. You do not "design a chip" in one step; you move it through a sequence of specialized solvers.

## Related Concepts
- [[vlsi-design-flow]] — the overall design process these tools support
- [[open-source-asic-flow]] — free alternatives to commercial EDA
- [[ai-for-chip-design]] — how AI is being used inside EDA tools
- [[risc-v-processor-design]] — a common design target for EDA flows and open-source tooling

## Sources
- [[raw/articles/www.synopsys.com-glossary-what-is-electronic-design-automation.html]] — What is EDA (Synopsys)
- [[raw/articles/mosartlabs.com-eda-tools-you-must-master-to-land-a-core-vlsi-job]] — EDA tools for VLSI careers
- [[raw/articles/ai-eda-tools-next-gen-chip-design]] — AI-driven EDA overview
- [[raw/articles/synopsys-ai-driven-chip-design]] — Synopsys AI-driven chip design overview
- [[raw/articles/www.synopsys.com-blogs-chip-design-ai-eda-tools-chip-design.html]] — AI enhances EDA tools
- [[raw/articles/www.synopsys.com-blogs-chip-design-agentic-ai-chip-design.html]] — agentic AI in chip design
