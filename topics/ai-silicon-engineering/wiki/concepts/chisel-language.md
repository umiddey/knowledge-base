# Chisel Language

Chisel is a Scala-based hardware construction language for writing parameterized digital hardware. It does not replace RTL verification or physical design; it gives you a more expressive way to generate RTL. The important distinction is that Chisel is a hardware generator, not a simulator or a backend tool.

Chisel sits above Verilog in the stack. You describe hardware structure in Scala, Chisel elaborates that into FIRRTL, and FIRRTL lowers into Verilog or other backend targets. That makes Chisel especially useful when designs need reuse, parameterization, or family-generated variants such as multiple RISC-V cores or configurable accelerators.

## Key Points
- **Scala host language** gives you type safety, functions, and composition.
- **FIRRTL** is the compilation layer that transforms Chisel into backend-ready circuit descriptions.
- **Parameterization** is the killer feature: you can describe one generator and emit many variants.
- **Reuse** matters most in IP blocks, CPU families, and accelerator front ends.
- **Verification still matters**: Chisel reduces boilerplate, but it does not remove the need for simulation and formal checks.

## Example
A team wants both a tiny embedded RISC-V core and a wider accelerator control processor:

1. They write one Chisel generator with parameters for pipeline depth, cache size, and optional vector support.
2. FIRRTL emits a concrete RTL variant for each configuration.
3. The chosen variant is then run through the normal ASIC or FPGA flow.
4. The same source tree can produce an FPGA prototype and a taped-out ASIC block.

That is why Chisel matters: it turns hardware families into code without erasing the underlying engineering discipline.

## Related Concepts
- [[risc-v-processor-design]] — a common use case for Chisel-based CPU generation
- [[fpga-asic-development]] — Chisel is useful for both prototyping and silicon targets
- [[open-source-asic-flow]] — Chisel-generated Verilog can enter the open-source ASIC stack
- [[vlsi-design-flow]] — Chisel still feeds a conventional RTL-to-GDSII backend

## Sources
- [[raw/articles/www.chisel-lang.org]] — official Chisel project overview
- [[raw/articles/github.com-m3y54m-FPGA-ASIC-Roadmap-blob-master-README.md.md]] — roadmap context mentioning Chisel in the FPGA/ASIC stack
- [[raw/articles/www.imm.dtu.dk-~masca-chisel-book.pdf.md]] — Chisel book and language reference
