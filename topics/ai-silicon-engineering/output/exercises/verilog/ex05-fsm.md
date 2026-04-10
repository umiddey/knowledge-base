# Verilog Exercise 5: Finite State Machine (Traffic Light)

## What You'll Learn
- What a **Finite State Machine (FSM)** is — the control logic of every digital system
- How to design states, transitions, and outputs
- The standard 3-block FSM coding style used in industry
- The concept of **state encoding** (binary vs one-hot)

## The Concept

An FSM has a fixed number of states. On each clock cycle, it's in exactly ONE state. Inputs determine which state it moves to NEXT. Outputs depend on the current state.

```
Traffic light FSM:

      ┌──────┐  timer=3s  ┌──────┐  timer=2s  ┌──────┐
      │GREEN │────────────→│YELLOW│────────────→│ RED  │
      └──┬───┘             └──────┘             └──┬───┘
         │                                          │
         └────────────── timer=3s ←─────────────────┘

State table:
  State   | Outputs (Red, Yellow, Green)
  GREEN   | (0, 0, 1) → green light ON
  YELLOW  | (0, 1, 0) → yellow light ON
  RED     | (1, 0, 0) → red light ON
```

FSMs are EVERYWHERE in chip design. Your CPU's instruction decoder is an FSM. A UART transmitter is an FSM. A memory controller is an FSM. They're the fundamental way to implement control logic.

## Full Solution

### `traffic_light.v`
```verilog
// traffic_light.v
// A traffic light controller FSM with 3 states and timed transitions.
// This demonstrates the standard 3-block FSM coding style:
//   Block 1: State register (sequential)
//   Block 2: Next state logic (combinational)
//   Block 3: Output logic (combinational)

module traffic_light(
    input  clk,          // clock
    input  rst,          // reset
    output red,          // red light
    output yellow,       // yellow light
    output green         // green light
);

    // ========================================
    // BLOCK 0: State definition
    // ========================================

    // Define the states using "parameter" (like const in C)
    // We're using "one-hot" encoding: each state gets its own bit
    //   GREEN  = 001
    //   YELLOW = 010
    //   RED    = 100
    // Why one-hot? Less decoding logic, faster in FPGAs.
    // The alternative is binary: GREEN=00, YELLOW=01, RED=10
    parameter GREEN  = 3'b001;
    parameter YELLOW = 3'b010;
    parameter RED    = 3'b100;

    // State registers: current state and next state
    reg [2:0] state;       // current state (stored in flip-flops)
    reg [2:0] next_state;  // next state (computed combinationally)

    // Timer: counts clock cycles in each state
    // GREEN = 30 cycles, YELLOW = 10 cycles, RED = 30 cycles
    reg [4:0] timer;       // 5 bits = can count 0-31

    // ========================================
    // BLOCK 1: State register (sequential)
    // ========================================
    // On each clock edge: state takes the value of next_state
    // This is the ONLY always @(posedge clk) block in the FSM
    always @(posedge clk) begin
        if (rst) begin
            state <= GREEN;    // reset to GREEN state
            timer <= 5'd0;     // reset timer
        end
        else begin
            state <= next_state;   // transition to next state
            // Timer logic:
            // If we're transitioning to a NEW state, reset timer to 0
            // Otherwise, keep counting up
            if (state != next_state)
                timer <= 5'd0;        // state changed, restart timer
            else
                timer <= timer + 1;   // same state, keep counting
        end
    end

    // ========================================
    // BLOCK 2: Next state logic (combinational)
    // ========================================
    // Given current state and timer, decide what the NEXT state should be
    // This is pure combinational logic — no flip-flops, no clock
    always @(*) begin
        // Default: stay in current state (prevents latches!)
        next_state = state;

        case(state)
            GREEN: begin
                if (timer >= 5'd29)      // been in GREEN for 30 cycles
                    next_state = YELLOW;   // transition to YELLOW
            end

            YELLOW: begin
                if (timer >= 5'd9)        // been in YELLOW for 10 cycles
                    next_state = RED;      // transition to RED
            end

            RED: begin
                if (timer >= 5'd29)       // been in RED for 30 cycles
                    next_state = GREEN;    // back to GREEN
            end

            default: next_state = GREEN;  // safety: undefined states go to GREEN
        endcase
    end

    // ========================================
    // BLOCK 3: Output logic (combinational)
    // ========================================
    // Given current state, set the outputs
    assign red    = (state == RED);
    assign yellow = (state == YELLOW);
    assign green  = (state == GREEN);
    // Each light is ON only when we're in its corresponding state.

endmodule
```

### `traffic_light_tb.v`
```verilog
`timescale 1ns / 1ps

module traffic_light_tb;

    reg clk, rst;
    wire red, yellow, green;

    traffic_light uut(.clk(clk), .rst(rst), .red(red), .yellow(yellow), .green(green));

    // 100MHz clock
    initial clk = 0;
    always #5 clk = ~clk;

    // Helper: print state nicely
    task print_state;
        begin
            $display("Time=%0t  Red=%b Yellow=%b Green=%b",
                     $time, red, yellow, green);
        end
    endtask

    initial begin
        // Reset
        rst = 1;
        #20;
        rst = 0;
        $display("=== Traffic Light FSM ===\n");
        print_state();

        // Watch for state transitions
        // GREEN for 30 cycles (300ns), then YELLOW for 10, then RED for 30
        repeat(80) begin
            #10;
            // Only print when something changes
            if (red !== uut.red_prev || yellow !== uut.yellow_prev || green !== uut.green_prev)
                print_state();
        end

        // Simplified: just print every 10 cycles and watch the transitions
        $display("\n--- Watching transitions ---");
        rst = 1; #20; rst = 0;
        repeat(75) begin
            #10;
            print_state();
        end

        $display("\nDone!");
        $finish;
    end

endmodule
```

## Simplified Testbench (cleaner version)
Since the above might get complex, here's a simpler approach:

```verilog
`timescale 1ns / 1ps

module traffic_light_tb2;

    reg clk, rst;
    wire red, yellow, green;

    traffic_light uut(.clk(clk), .rst(rst), .red(red), .yellow(yellow), .green(green));

    initial clk = 0;
    always #5 clk = ~clk;

    initial begin
        integer i;

        rst = 1; #20; rst = 0;

        $display("Running traffic light for 80 clock cycles...");
        for (i = 0; i < 80; i = i + 1) begin
            #10;
            $display("Cycle %2d: R=%b Y=%b G=%b", i, red, yellow, green);
        end
        $finish;
    end

endmodule
```

## How to Run
```bash
iverilog -o traffic_sim traffic_light.v traffic_light_tb2.v && vvp traffic_sim
```

## Key Concepts

| Pattern | What it is | Why it matters |
|---------|-----------|---------------|
| 3-block FSM | Separate sequential/combinational/output blocks | Industry standard, clean, synthesizable |
| One-hot encoding | Each state gets its own flip-flop bit | Fast, low decoding logic, FPGA-friendly |
| Default next_state | `next_state = state` before case | Prevents latches (critical!) |
| Timer-based transitions | Count clock cycles to decide when to move | How real controllers work |
| `parameter` | Compile-time constant | Makes code readable and configurable |

## Break It

1. **Remove the default in next_state logic** → synthesis tool creates a LATCH (very bad). Research: "Verilog latch inference"
2. **Change to binary encoding**: GREEN=2'b00, YELLOW=2'b01, RED=2'b10 → same behavior, less flip-flops but more decoding logic
3. **Swap YELLOW and RED durations** → now yellow lasts longer than red
4. **Add a pedestrian input**: when `pedestrian=1`, force transition to RED immediately (emergency override)

## Extend It

1. **Add a 4th state**: RED+YELLOW (some countries have this before GREEN)
2. **Build a sequence detector**: FSM that outputs 1 when it sees the bit pattern "1101" in a serial input stream
3. **Build a vending machine FSM**: states = IDLE, COIN_INSERTED, ITEM_SELECTED, DISPENSING; inputs = coin, select, dispensed

## What's Next
→ [[ex06-uart]] — UART transmitter: your first real-world communication protocol
