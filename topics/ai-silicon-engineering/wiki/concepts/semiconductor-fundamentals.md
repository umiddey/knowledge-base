# Semiconductor Fundamentals

Semiconductors are materials with electrical conductivity between conductors (metals) and insulators. Silicon is the dominant semiconductor material, and manipulating its electrical properties through doping creates the transistors that form all modern chips.

A **transistor** is a tiny switch that controls electrical current. In digital chips, billions of these switches turn on and off to represent binary 0s and 1s. **CMOS** (Complementary Metal-Oxide-Semiconductor) is the dominant technology — it pairs NMOS and PMOS transistors so that static power draw is near zero; power is only consumed during switching.

The **fabrication process** involves etching transistor patterns onto silicon wafers using photolithography. The "nanometer node" (e.g., 3nm, 5nm) refers to the smallest feature size. Smaller nodes = more transistors per area = more compute per chip. TSMC, Samsung, and Intel are the major foundries.

Key terminology you'll encounter everywhere:
- **Die** — the actual silicon chip cut from a wafer
- **Wafer** — a thin slice of silicon that holds hundreds of dies
- **Yield** — percentage of dies that work after fabrication
- **Process node** — the manufacturing technology generation (e.g., TSMC N4)
- **Packaging** — enclosing the die in a protective housing with pins/balls for connection

## Key Points
- Silicon is doped with impurities (boron = P-type, phosphorus = N-type) to control conductivity
- CMOS pairs complementary transistors for ultra-low static power
- Moore's Law (transistor count doubles ~every 2 years) is slowing but advanced packaging extends it
- A modern AI chip like NVIDIA H100 has ~80 billion transistors on TSMC 4N process
- Manufacturing a cutting-edge chip costs $20-50M per design (NRE), $10-50 per die at volume

## Example
Take a simple CMOS inverter:

1. When the input is low, the PMOS transistor turns on and pulls the output up to VDD.
2. When the input is high, the NMOS transistor turns on and pulls the output down to ground.
3. In steady state, one transistor is off, so almost no static current flows.
4. When the input switches, both transistors briefly conduct during the transition, which is where dynamic power is spent.

That tiny inverter is the building block for everything else: logic gates, flip-flops, caches, tensor cores, and the control logic around AI accelerators. The exact same physical idea scales from one transistor pair to billions of devices on an H100 or TPU die.

## Related Concepts
- [[vlsi-design-flow]] — how a chip goes from idea to manufactured silicon
- [[processing-unit-types]] — what different chip architectures do with those transistors
- [[eda-tools]] — the software used to design chips before fabrication

## Sources
- [[raw/articles/semionics.com-learn-chip-designing-complete-guide]] — chip design fundamentals and learning path
- [[raw/articles/moschip.com-blog-silicon-engineering-services-the-complete-guide-to-silicon-design-and-development-services]] — silicon design and development flow
