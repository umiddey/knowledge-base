# Verilog Exercise 1: Your First Logic Gate

## What You'll Learn
- What a **module** is (the basic building block of hardware)
- What **wires** and **inputs/outputs** are
- How to write AND, OR, NOT logic in Verilog
- How to simulate and see results

## Setup

Install Icarus Verilog and GTKWave (waveform viewer):

```bash
# Arch Linux
sudo pacman -S iverilog gtkwave

# Ubuntu/Debian
sudo apt install iverilog gtkwave

# macOS
brew install icarus-verilog gtkwave

# Verify it works
iverilog -V
```

Create a folder for your exercises:
```bash
mkdir -p ~/silicon-lab/ex01
cd ~/silicon-lab/ex01
```

## The Concept

In hardware, a logic gate takes electrical signals in and produces a signal out. An AND gate outputs 1 (HIGH) only when ALL inputs are 1. Think of it as "both conditions must be true."

```
Truth table for AND:
  A | B | Y
  0 | 0 | 0    ← neither input is 1, output is 0
  0 | 1 | 0    ← only B is 1, not enough, output is 0
  1 | 0 | 0    ← only A is 1, not enough, output is 0
  1 | 1 | 1    ← BOTH are 1, output is 1!
```

## The Exercise

Write a Verilog module for a 2-input AND gate. Then write a testbench that tests all 4 input combinations.

## Full Solution

### File 1: `and_gate.v` (the hardware)

```verilog
// and_gate.v
// This file describes a 2-input AND gate in hardware.
// A "module" is like a function — it has inputs and outputs.
// But unlike software, this describes PHYSICAL wires and gates.

module and_gate(
    input  a,      // input wire 'a' — comes from outside
    input  b,      // input wire 'b' — comes from outside
    output y       // output wire 'y' — goes to outside
);

    // "assign" means: continuously connect y to the result of a AND b
    // This is NOT an instruction that happens once.
    // This is a PERMANENT wire connection.
    // Whenever a or b changes, y IMMEDIATELY updates.
    // Think of it as: y is physically wired to the output of an AND gate
    // whose inputs are a and b.
    assign y = a & b;

endmodule
// That's it. This entire file describes one physical gate.
// When synthesized to hardware (FPGA/ASIC), this becomes:
//   two input pins → one AND gate → one output pin
```

### File 2: `and_gate_tb.v` (the testbench)

```verilog
// and_gate_tb.v
// A testbench is a special module that tests another module.
// It has NO inputs or outputs — it's self-contained.
// Think of it as: a test rig that applies signals to your gate
// and watches what comes out.

`timescale 1ns / 1ps
// This tells the simulator: "1 unit of time = 1 nanosecond,
// and my precision is 1 picosecond." You'll put this at the
// top of every testbench.

module and_gate_tb;

    // These are "reg" types — variables the testbench can control.
    // "reg" means "this testbench will drive values onto this wire."
    reg a;          // we'll set this to 0 or 1 to test
    reg b;          // we'll set this to 0 or 1 to test

    // This is a "wire" type — it carries the output signal.
    // We don't set it directly. The AND gate sets it.
    wire y;

    // This line INSTANTIATES our and_gate module.
    // It's like saying: "place one AND gate on the test bench,
    // connect our signals a, b to its inputs, and connect its
    // output to our wire y."
    and_gate uut(
        .a(a),      // connect our 'a' to the gate's 'a' input
        .b(b),      // connect our 'b' to the gate's 'b' input
        .y(y)       // connect our 'y' to the gate's 'y' output
    );
    // 'uut' stands for "Unit Under Test" — conventional name.

    // The "initial" block runs ONCE, top to bottom, at simulation start.
    // This is where we apply test vectors.
    initial begin

        // Print a header so we can see results in the terminal
        $display("A | B | Y");       // prints: "A | B | Y"
        $display("-----------");     // prints: "-----------"

        // Test case 1: a=0, b=0 → expect y=0
        a = 0; b = 0;                // set both inputs to 0
        #10;                          // wait 10 nanoseconds
        // #10 means "pause here for 10 time units."
        // We need this because in real hardware, signals take time
        // to propagate through gates. The simulator needs time
        // for the output to update after inputs change.
        $display("%b | %b | %b", a, b, y);  // %b = print as binary

        // Test case 2: a=0, b=1 → expect y=0
        a = 0; b = 1;
        #10;
        $display("%b | %b | %b", a, b, y);

        // Test case 3: a=1, b=0 → expect y=0
        a = 1; b = 0;
        #10;
        $display("%b | %b | %b", a, b, y);

        // Test case 4: a=1, b=1 → expect y=1
        a = 1; b = 1;
        #10;
        $display("%b | %b | %b", a, b, y);

        // Finish the simulation
        $finish;  // tells the simulator "we're done, stop running"
    end

endmodule
```

## How to Run It

```bash
# Compile both files together
iverilog -o and_gate_sim and_gate.v and_gate_tb.v

# Run the simulation
vvp and_gate_sim

# Expected output:
# A | B | Y
# -----------
# 0 | 0 | 0
# 0 | 1 | 0
# 1 | 0 | 0
# 1 | 1 | 1
```

If you see that output, your AND gate works. The last line shows that only when BOTH inputs are 1, the output is 1.

## Line-by-Line: The Key Concepts

| Line | What it does | Why it matters |
|------|-------------|----------------|
| `module and_gate(...)` | Defines a hardware block with named ports | Every piece of hardware is a module |
| `input a` | Declares 'a' as an input port | Signals coming from outside |
| `output y` | Declares 'y' as an output port | Signals going to outside |
| `assign y = a & b;` | Permanent combinational connection | `assign` = always active, not "run once" |
| `reg a;` in testbench | Testbench-controlled signal | `reg` = "I will drive this value" |
| `#10;` | Wait 10 nanoseconds | Gives time for signals to propagate |
| `$display(...)` | Print to console | How you see what happened |

## Break It

Try these one at a time. Before each change, PREDICT what will happen, then run it and check:

1. **Change `&` to `|`** (OR gate) → predict: y will be 1 when EITHER input is 1
2. **Change `&` to `^`** (XOR gate) → predict: y will be 1 when inputs are DIFFERENT
3. **Change `&` to `~`** (NOT... but on two inputs?) → this will cause an error. Why? Because `~` is a unary operator (one input). Read the error message!
4. **Remove `#10;`** before one of the test cases → predict: output won't have time to update. You might see the PREVIOUS test case's result!

## Extend It

1. **Make a 3-input AND gate**: add `input c` and change to `assign y = a & b & c;`. Update the testbench to test all 8 combinations. (Hint: use a for loop — yes, Verilog has for loops in testbenches!)

```verilog
// Hint for 3-input testbench:
integer i;
initial begin
    $display("A | B | C | Y");
    for (i = 0; i < 8; i = i + 1) begin
        {a, b, c} = i;     // {a,b,c} is "concatenation" — packs 3 bits
        #10;
        $display("%b | %b | %b | %b", a, b, c, y);
    end
    $finish;
end
```

2. **Build an OR gate module** (`or_gate.v`) from scratch using `|` instead of `&`

3. **Build a NOT gate** (`not_gate.v`) — this one only has ONE input. `assign y = ~a;`

## What's Next
→ [[ex02-mux]] — Building a multiplexer (choosing between signals)
