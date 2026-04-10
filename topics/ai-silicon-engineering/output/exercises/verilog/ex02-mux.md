# Verilog Exercise 2: Multiplexer (Choosing Between Signals)

## What You'll Learn
- What a **multiplexer (mux)** is — one of the most used circuits in any chip
- The **ternary operator** (`? :`) in Verilog
- How to build bigger circuits from smaller ones
- The concept of **selection** in hardware

## The Concept

A multiplexer is a digital switch. It has multiple inputs and one output. A "select" signal chooses WHICH input gets connected to the output. Think of it like a railway switch — the select signal determines which track the train takes.

```
A 2:1 MUX (2 inputs, 1 output):

        ┌──────┐
   0 ──→│      │
        │  MUX ├──→ Y (output)
   1 ──→│      │
        └──┬───┘
           │
          SEL (select: 0 = choose input 0, 1 = choose input 1)

Truth table:
  SEL | A | B | Y
   0  | 0 | 0 | 0    SEL=0: Y follows A
   0  | 0 | 1 | 0    SEL=0: Y follows A
   0  | 1 | 0 | 1    SEL=0: Y follows A
   0  | 1 | 1 | 1    SEL=0: Y follows A
   1  | 0 | 0 | 0    SEL=1: Y follows B
   1  | 0 | 1 | 1    SEL=1: Y follows B
   1  | 1 | 0 | 0    SEL=1: Y follows B
   1  | 1 | 1 | 1    SEL=1: Y follows B

Key insight: when SEL=0, Y=A. When SEL=1, Y=B.
```

Why does this matter? **Every chip has thousands of muxes.** Your CPU uses them to select which register feeds the ALU. Your GPU uses them to route data. They're the "traffic controllers" of hardware.

## The Exercise

Build a 2:1 multiplexer for 8-bit signals. The select signal chooses between two 8-bit inputs.

## Full Solution

### File 1: `mux2to1.v`

```verilog
// mux2to1.v
// An 8-bit 2:1 multiplexer.
// When sel=0: output = input_a
// When sel=1: output = input_b

module mux2to1(
    input  [7:0] input_a,    // 8-bit input A (bits 7 down to 0)
    input  [7:0] input_b,    // 8-bit input B (bits 7 down to 0)
    input  sel,               // 1-bit select: 0=pick A, 1=pick B
    output [7:0] y            // 8-bit output
);

    // The ternary operator: condition ? value_if_true : value_if_false
    // If sel is 0 → y = input_a
    // If sel is 1 → y = input_b
    //
    // This works on ALL 8 bits at once because input_a and input_b
    // are 8-bit wide. The mux is actually 8 separate 1-bit muxes
    // all controlled by the same sel signal.
    //
    // Hardware view: this creates 8 identical mux circuits,
    // one for each bit, all sharing the same select line.
    assign y = sel ? input_b : input_a;

    // Alternative ways to write the same thing:
    //
    // WAY 2: Using an always block (behavioral):
    // always @(*) begin
    //     if (sel)
    //         y = input_b;
    //     else
    //         y = input_a;
    // end
    // (but then y must be declared as "reg" not "wire")
    //
    // WAY 3: Using bitwise logic (gate-level thinking):
    // assign y = (~sel & input_a) | (sel & input_b);
    // When sel=0: ~sel=1, so ~sel & input_a = input_a, sel & input_b = 0
    // When sel=1: ~sel=0, so ~sel & input_a = 0, sel & input_b = input_b
    // Then OR them together → correct answer in both cases
    //
    // All three produce the SAME hardware. The ternary is cleanest.

endmodule
```

### File 2: `mux2to1_tb.v`

```verilog
`timescale 1ns / 1ps

module mux2to1_tb;

    reg  [7:0] input_a;
    reg  [7:0] input_b;
    reg  sel;
    wire [7:0] y;

    mux2to1 uut(
        .input_a(input_a),
        .input_b(input_b),
        .sel(sel),
        .y(y)
    );

    initial begin
        $display("SEL | Input A | Input B | Output Y");
        $display("────┼─────────┼─────────┼──────────");

        // Test with sel=0 (should select input_a)
        input_a = 8'hAA;   // 10101010 in binary (0xAA in hex)
        input_b = 8'h55;   // 01010101 in binary (0x55 in hex)
        // Why these values? Because they're bitwise complements.
        // If the mux accidentally mixes them, we'll see it immediately.

        sel = 0;
        #10;
        $display("  %b | %h     | %h     | %h", sel, input_a, input_b, y);
        // Expected: y = AA (because sel=0, so y follows input_a)

        // Test with sel=1 (should select input_b)
        sel = 1;
        #10;
        $display("  %b | %h     | %h     | %h", sel, input_a, input_b, y);
        // Expected: y = 55 (because sel=1, so y follows input_b)

        // Test with different values
        input_a = 8'hFF;   // all 1s
        input_b = 8'h00;   // all 0s
        sel = 0;
        #10;
        $display("  %b | %h     | %h     | %h", sel, input_a, input_b, y);
        // Expected: y = FF

        sel = 1;
        #10;
        $display("  %b | %h     | %h     | %h", sel, input_a, input_b, y);
        // Expected: y = 00

        // Automated exhaustive test
        $display("\n--- Exhaustive test ---");
        input_a = 8'hA5;
        input_b = 8'h5A;
        sel = 0; #10;
        if (y !== input_a) $display("FAIL: sel=0, expected %h got %h", input_a, y);
        else $display("PASS: sel=0, y=%h matches input_a=%h", y, input_a);

        sel = 1; #10;
        if (y !== input_b) $display("FAIL: sel=1, expected %h got %h", input_b, y);
        else $display("PASS: sel=1, y=%h matches input_b=%h", y, input_b);

        $display("\nAll tests complete!");
        $finish;
    end

endmodule
```

## How to Run

```bash
iverilog -o mux_sim mux2to1.v mux2to1_tb.v
vvp mux_sim
```

Expected output:
```
SEL | Input A | Input B | Output Y
────┼─────────┼─────────┼──────────
  0 | aa     | 55     | aa
  1 | aa     | 55     | 55
  0 | ff     | 00     | ff
  1 | ff     | 00     | 00

--- Exhaustive test ---
PASS: sel=0, y=aa matches input_a=aa
PASS: sel=1, y=5a matches input_b=5a

All tests complete!
```

## Key Concepts

| Concept | Code | What it means physically |
|---------|------|------------------------|
| Bus (multi-bit wire) | `[7:0]` | 8 wires bundled together |
| Hex notation | `8'hAA` | 8-bit value, AA in hex = 10101010 in binary |
| Ternary operator | `sel ? b : a` | A gate that selects between two signals |
| Concatenation | `{a, b}` | Join wires together side by side |
| Not-equal check | `y !== input_a` | Compare two 8-bit values |

## Break It

1. **Swap `input_a` and `input_b`** in the assign statement → now sel=0 selects B and sel=1 selects A. That's a reversed mux!
2. **Change to 4-bit** `[3:0]` instead of `[7:0]` → everything still works, just narrower
3. **Remove the `sel` input entirely** and hardcode `assign y = input_a;` → now input_b is completely ignored (dead input)
4. **Set both inputs to the same value** like `8'h42` → output should be `42` regardless of sel. Why? Because when both options are the same, the choice doesn't matter!

## Extend It

1. **Build a 4:1 mux** — 4 inputs, 2 select bits, 1 output:
```verilog
// Hint: chain two 2:1 muxes into a 4:1
module mux4to1(
    input  [7:0] in0, in1, in2, in3,
    input  [1:0] sel,       // 2 bits = 4 possible values (00, 01, 10, 11)
    output [7:0] y
);
    // Internal wires between first-level muxes and second-level mux
    wire [7:0] mid0, mid1;

    // First level: two 2:1 muxes
    mux2to1 m0(.input_a(in0), .input_b(in1), .sel(sel[0]), .y(mid0));
    mux2to1 m1(.input_a(in2), .input_b(in3), .sel(sel[0]), .y(mid1));

    // Second level: one 2:1 mux choosing between the two results
    mux2to1 m2(.input_a(mid0), .input_b(mid1), .sel(sel[1]), .y(y));

endmodule
```

2. **Build a priority encoder** — outputs which input is highest priority (the mux's smarter cousin)

## What's Next
→ [[ex03-alu]] — Building an Arithmetic Logic Unit (the brain of a CPU)
