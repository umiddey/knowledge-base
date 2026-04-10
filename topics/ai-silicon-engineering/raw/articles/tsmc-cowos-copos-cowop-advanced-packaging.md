---
title: "CoWoS vs. CoPoS vs. CoWoP: TSMC Advanced Packaging Explained"
source: https://www.lovechip.com/blog/cowos-vs-copos-vs-cowop-tsmc-advanced-packaging-explained
date: 2026-03-14
type: article
---

# TSMC Advanced Packaging: CoWoS vs CoPoS vs CoWoP

## CoWoS (Chip-on-Wafer-on-Substrate)
TSMC's flagship 2.5D/3D advanced packaging. Stacks multiple bare chips on a silicon wafer (CoW), then bonds to IC substrate (WoS). Uses silicon interposer as "bridge" with TSVs.

### CoWoS-S (High-End Mainstream)
- Full silicon interposer with TSVs
- Highest cost, max ~2,500mm² package
- Used by NVIDIA H100, AMD MI300
- Current mainstream

### CoWoS-R (Cost-Effective)
- RDL-based interconnection (from InFO platform), replaces silicon interposer
- Lowest cost in CoWoS family
- For cost-sensitive AI ASICs, network devices, edge AI

### CoWoS-L (Optimal Next-Gen)
- Hybrid: LSI for dense core interconnects + RDL for non-core areas
- Exceeds 2,500mm² size limit
- Supports up to 12 HBM modules
- TSMC plans gradual shift from CoWoS-S to CoWoS-L

## CoPoS (Chip-on-Panel-on-Substrate)
- Replaces circular silicon interposer with square panel RDL
- New materials: glass, sapphire (mitigates warpage)
- Panel sizes: 310x310mm, 515x510mm, 750x620mm
- Pilot line 2026, mass production 2028-2029
- NVIDIA expected as first customer

## CoWoP (Chip-on-Wafer-on-PCB)
- Replaces expensive IC substrate with high-performance PCB motherboard
- Maintains CoW stacking architecture
- Mid-to-high-end balance of performance and cost
- Under R&D, timeline TBA

## Market Positioning
| Technology | Target |
|-----------|--------|
| CoWoS-S | Flagship AI/HPC (NVIDIA, AMD) |
| CoWoS-R | Cost-sensitive (Broadcom), edge |
| CoWoS-L | Ultra-large AI training (transition) |
| CoPoS | Next-gen ultra-large high-end AI |
| CoWoP | Mid-to-high-end cost-performance |
