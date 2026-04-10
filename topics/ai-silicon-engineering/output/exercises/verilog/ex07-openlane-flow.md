# Exercise 7: OpenLANE — Your Code Becomes Physical Layout

## What You'll Learn
- How to take Verilog through the full OpenLANE flow
- What each stage produces (netlist, placed design, routed layout, GDSII)
- How to read a basic layout
- The gap between "code that simulates" and "code that can be manufactured"

## Setup

```bash
# Install OpenLANE via Docker (easiest method)
# You need Docker installed first:
docker pull openroad/openroad-flow-scripts

# Clone the flow scripts
git clone https://github.com/The-OpenROAD-Project/OpenROAD-flow-scripts
cd OpenROAD-flow-scripts

# Quick test that it works
make check-openroad
```

## The Exercise

Take the counter from Exercise 4 through the full OpenLANE flow. You'll watch your Verilog code become a physical chip layout.

## Step-by-Step

### Step 1: Add your design

```bash
cd flow

# Create a design directory
mkdir -p designs/counter
```

### Step 2: Create `designs/counter/config.json`
```json
{
    "DESIGN_NAME": "counter",
    "VERILOG_FILES": "dir::src/counter.v",
    "CLOCK_PERIOD": 10,
    "CLOCK_PORT": "clk",
    "FP_SIZING": "relative",
    "PL_TARGET_DENSITY": 0.5,
    "pdk::sky130A": {
        "STD_CELL_LIBRARY": "sky130_fd_sc_hd"
    }
}
```

### Step 3: Copy your counter.v into `designs/counter/src/counter.v`

Use the counter from Exercise 4 (the simple 8-bit version).

### Step 4: Run the flow

```bash
# Run the complete flow
make DESIGN_CONFIG=./designs/counter/config.json

# This takes 5-15 minutes. Watch the output — it shows each stage:
# [SYNTHESIS] Yosys converts your Verilog to Sky130 gates
# [FLOORPLAN] Defines die area
# [PLACEMENT] Positions each gate
# [CTS] Routes the clock tree
# [ROUTING] Connects everything with metal wires
# [FINISHING] DRC checks, generates GDSII
```

### Step 5: View the results

```bash
# Open the final layout in KLayout or Magic
# The GDSII file is at:
ls results/counter/sky130A/base/counter.gds
```

## What to Observe

1. **Synthesis report** (`reports/synthesis/...`): How many cells did your counter become? You'll see flip-flops (sky130_fd_sc_hd__dfxtp_1) and adders.

2. **Placement view**: You'll see your cells arranged in rows. The counter's 8 flip-flops should be visible as a small cluster.

3. **Routing view**: Thin colored lines connecting the cells — these are the metal wires on different layers (metal1, metal2, etc.)

4. **Timing report** (`reports/.../sta...`): Does your counter meet the 10ns clock constraint? If yes, great. If no, you need to optimize.

5. **Area**: How big is your counter? Even this tiny design uses measurable silicon area.

## Break It

1. **Change CLOCK_PERIOD to 1ns** (very aggressive) → re-run → timing probably fails. The tools can't route fast enough. This teaches you that not all code can run at any speed.

2. **Make it a 32-bit counter** → re-run → more cells, larger area, tighter timing. Now you see how design complexity affects physical layout.

3. **Set PL_TARGET_DENSITY to 0.9** → cells packed very tightly → routing congestion → may fail. Physical design has constraints that simulation doesn't.

## What's Next

You've now gone from "what is a transistor" to "I have a physical layout file of my own design." The next phase is CUDA — programming GPUs. But all the hardware concepts you've learned apply: memory hierarchies, parallel execution, timing, data movement.

→ Continue to the CUDA exercises in `output/exercises/cuda/`
