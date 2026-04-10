# Verilog Exercise 4: Counter (Your First Sequential Circuit)

## What You'll Learn
- The difference between **combinational** (instant) and **sequential** (clocked) logic
- What a **flip-flop** is and why clocks matter
- The `always @(posedge clk)` block — the heart of every sequential circuit
- Non-blocking assignment (`<=`) vs blocking assignment (`=`)

## The Concept

Everything so far was **combinational** — outputs depend only on current inputs, no memory. A counter is different: it REMEMBERS its current value and increments it every clock cycle. This requires **sequential logic** — circuits that use flip-flops (memory elements) and a clock signal.

```
Clock signal: the heartbeat of the chip
    ___     ___     ___     ___     ___
___|   |___|   |___|   |___|   |___|   |___
       ^       ^       ^       ^       ^
       ↑       ↑       ↑       ↑       ↑
   rising edge — this is when flip-flops update their values

Counter behavior on each rising edge:
  count = 0 → 1 → 2 → 3 → ... → 255 → 0 → 1 → ... (wraps around)
```

## Full Solution

### `counter.v`
```verilog
// counter.v
// An 8-bit counter with synchronous reset.
// "Synchronous" means: reset only takes effect on the clock edge.
// (Asynchronous reset would be: reset takes effect immediately, ignoring clock)

module counter(
    input  clk,          // clock signal — the heartbeat
    input  rst,          // reset signal — sets counter back to 0
    output [7:0] count   // current count value (0-255)
);

    // Declare count as a reg because it's assigned inside an always block
    // AND it holds state between clock cycles (it's actual flip-flops!)
    reg [7:0] count;

    // always @(posedge clk) means:
    // "Execute this block on every RISING EDGE of the clock signal."
    // NOT on falling edge. NOT continuously. ONLY at the rising edge.
    //
    // Physically, this creates flip-flops that capture new values
    // at the moment the clock transitions from 0 to 1.
    //
    // "posedge" = positive edge (0→1 transition)
    // "negedge" = negative edge (1→0 transition) — less commonly used
    always @(posedge clk) begin
        if (rst) begin
            // Reset: set counter to 0
            // The <= is "non-blocking assignment"
            // It means: "schedule this value to be stored at the end
            // of the current time step." All <= assignments in a block
            // happen simultaneously, not sequentially.
            //
            // USE <= FOR SEQUENTIAL LOGIC (inside always @(posedge clk))
            // USE = FOR COMBINATIONAL LOGIC (inside always @(*))
            //
            // Why? Because in hardware, all flip-flops update at the
            // same instant. Non-blocking assignment models this correctly.
            count <= 8'd0;
        end
        else begin
            // Increment: add 1 to current value
            // When count is 255 (max 8-bit value), adding 1 wraps to 0
            // This is natural overflow — same as (count + 1) % 256
            count <= count + 8'd1;
        end
    end

endmodule
```

### `counter_tb.v`
```verilog
`timescale 1ns / 1ps

module counter_tb;

    reg clk;
    reg rst;
    wire [7:0] count;

    counter uut(.clk(clk), .rst(rst), .count(count));

    // Generate a clock signal: toggle every 5ns = 10ns period = 100MHz
    // This creates an infinite clock that toggles:
    //   0→1→0→1→0→1→...
    // The counter updates on every rising edge (every 10ns)
    initial clk = 0;
    always #5 clk = ~clk;  // every 5 nanoseconds, flip the clock

    initial begin
        // Print header
        $display("Time | Rst | Count");
        $display("─────┼─────┼──────");

        // Start with reset asserted
        rst = 1;
        #20;  // wait 2 clock cycles with reset held
        $display("%4t | %b   | %d", $time, rst, count);

        // Release reset — counter should start counting
        rst = 0;
        #10;
        $display("%4t | %b   | %d", $time, rst, count);

        // Let it count for several cycles
        repeat(10) begin
            #10;  // wait one clock cycle
            $display("%4t | %b   | %d", $time, rst, count);
        end

        // Assert reset mid-count
        $display("\n--- Asserting reset ---");
        rst = 1;
        #10;
        $display("%4t | %b   | %d", $time, rst, count);

        // Release again
        rst = 0;
        #10;
        $display("%4t | %b   | %d", $time, rst, count);
        repeat(5) begin
            #10;
            $display("%4t | %b   | %d", $time, rst, count);
        end

        $display("\nCounter works!");
        $finish;
    end

endmodule
```

## How to Run
```bash
iverilog -o counter_sim counter.v counter_tb.v && vvp counter_sim
```

## Key Concepts

| Concept | Code | Physical meaning |
|---------|------|-----------------|
| Clock | `clk` | A periodic signal that times all sequential operations |
| Flip-flop | `reg` + `always @(posedge clk)` | A 1-bit memory element that stores a value |
| Synchronous reset | `if (rst)` inside `always @(posedge clk)` | Reset only on clock edge (preferred in real designs) |
| Non-blocking assign | `<=` | All assignments happen simultaneously (models real flip-flops) |
| Clock generation | `always #5 clk = ~clk` | A free-running oscillator (in testbench only) |
| Natural overflow | `count + 1` when count=255 | Wraps to 0 because 8 bits can't hold 256 |

## Break It

1. **Change `<=` to `=`** (blocking) — for a counter this won't cause bugs, but for more complex sequential logic it WILL. Try it here, then read about blocking vs non-blocking hazards.
2. **Change to `always @(posedge clk or posedge rst)`** and move reset outside the if — now it's an asynchronous reset. Both styles are used in real designs.
3. **Remove the reset entirely** — simulation starts with count=X (unknown). Real flip-flops power up in random states!
4. **Make it count DOWN** — change `count + 1` to `count - 1`

## Extend It

1. **Add a count enable**: only increment when `enable` is high
2. **Add a load input**: set counter to an arbitrary value (8-bit parallel load)
3. **Build a modulo-10 counter**: count 0→9→0→9 (use an if statement to reset at 10)
4. **Chain two 8-bit counters to make a 16-bit counter**: wire the overflow from counter1 to the enable of counter2

## What's Next
→ [[ex05-fsm]] — Finite State Machines: traffic lights and pattern detectors
