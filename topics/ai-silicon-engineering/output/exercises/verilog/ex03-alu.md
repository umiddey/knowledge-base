# Verilog Exercise 3: Arithmetic Logic Unit (ALU)

## What You'll Learn
- How to build an ALU — the brain of every CPU
- The `always @(*)` block for combinational logic
- The `case` statement (like switch/case in software)
- How operations are selected in hardware
- Multi-bit arithmetic in Verilog

## The Concept

An ALU performs math and logic operations. Your CPU's ALU does ADD, SUB, AND, OR, XOR, etc. A control signal (opcode) selects which operation to perform. This is literally the heart of every processor.

```
        ┌──────────┐
  A ───→│          │
  B ───→│   ALU    ├──→ Result
        │          │
  OP───→│ (select) ├──→ Zero flag (1 if result == 0)
        └──────────┘

Operations:
  OP=00 → Result = A + B     (add)
  OP=01 → Result = A - B     (subtract)
  OP=10 → Result = A & B     (bitwise AND)
  OP=11 → Result = A | B     (bitwise OR)
```

## Full Solution

### `alu.v`
```verilog
// alu.v
// A simple 8-bit ALU with 4 operations.
// The 'op' signal selects which operation the ALU performs.
// Think of it as: the ALU has multiple circuits inside (adder, subtractor,
// AND gates, OR gates), and a mux at the output selects which result to use.

module alu(
    input  [7:0] a,         // first 8-bit operand
    input  [7:0] b,         // second 8-bit operand
    input  [1:0] op,        // 2-bit operation select (4 possible operations)
    output [7:0] result,    // 8-bit result of the operation
    output       zero       // flag: 1 if result is zero (useful for branches)
);

    // always @(*) means "recompute this whenever ANY input changes."
    // The * is a sensitivity list shorthand — it automatically includes
    // every signal read inside the block (a, b, op in this case).
    //
    // Because result depends on a, b, and op, it must be declared as "reg".
    // IMPORTANT: "reg" does NOT mean "register" (flip-flop).
    // In combinational always blocks, "reg" just means "assigned inside always."
    // It's a confusing Verilog naming thing. Live with it.
    reg [7:0] result_r;

    always @(*) begin
        case(op)
            2'b00: result_r = a + b;    // ADD: a plus b
            // 2'b00 means "2-bit binary value 00"
            // + in Verilog creates an adder circuit
            // 8-bit + 8-bit = 8-bit (9th bit is discarded = overflow)

            2'b01: result_r = a - b;    // SUB: a minus b
            // - creates a subtractor (adder with two's complement)

            2'b10: result_r = a & b;    // AND: bitwise AND
            // & operates on EACH bit independently
            // bit 0 of result = bit 0 of a AND bit 0 of b, etc.

            2'b11: result_r = a | b;    // OR: bitwise OR
            // | operates on EACH bit independently

            default: result_r = 8'b0;   // Safety: undefined opcodes give 0
            // Good practice: always have a default case
        endcase
    end

    // Connect the internal reg to the output wire
    assign result = result_r;

    // Zero flag: checks if result is all zeros.
    // This is how CPUs implement "compare and branch" instructions.
    // When you do `if (x == 0)` in C, the CPU's ALU subtracts and checks
    // this zero flag.
    assign zero = (result_r == 8'b0);
    // == is a comparison (produces 1 if true, 0 if false)
    // So zero is 1 when result is 0, and 0 otherwise.

endmodule
```

### `alu_tb.v`
```verilog
`timescale 1ns / 1ps

module alu_tb;

    reg  [7:0] a, b;
    reg  [1:0] op;
    wire [7:0] result;
    wire zero;

    alu uut(.a(a), .b(b), .op(op), .result(result), .zero(zero));

    // Helper task: test one operation and print result
    task test_op;
        input [1:0] t_op;
        input [7:0] t_a, t_b;
        begin
            op = t_op; a = t_a; b = t_b;
            #10;
            case(t_op)
                2'b00: $display("ADD:  %d + %d = %d (zero=%b)", t_a, t_b, result, zero);
                2'b01: $display("SUB:  %d - %d = %d (zero=%b)", t_a, t_b, result, zero);
                2'b10: $display("AND:  %h & %h = %h (zero=%b)", t_a, t_b, result, zero);
                2'b11: $display("OR:   %h | %h = %h (zero=%b)", t_a, t_b, result, zero);
            endcase
        end
    endtask

    initial begin
        $display("=== ALU Test ===\n");

        // Test ADD
        test_op(2'b00, 8'd10, 8'd20);     // 10 + 20 = 30
        test_op(2'b00, 8'd255, 8'd1);      // 255 + 1 = 0 (overflow!)
        test_op(2'b00, 8'd0, 8'd0);        // 0 + 0 = 0 (zero flag should be 1)

        // Test SUB
        test_op(2'b01, 8'd50, 8'd20);      // 50 - 20 = 30
        test_op(2'b01, 8'd10, 8'd10);      // 10 - 10 = 0 (zero flag!)
        test_op(2'b01, 8'd0, 8'd1);        // 0 - 1 = 255 (underflow: wraps around)

        // Test AND
        test_op(2'b10, 8'hFF, 8'hAA);      // FF & AA = AA
        test_op(2'b10, 8'hFF, 8'h00);      // FF & 00 = 00 (AND with 0 = always 0)

        // Test OR
        test_op(2'b11, 8'h00, 8'hAA);      // 00 | AA = AA
        test_op(2'b11, 8'h55, 8'hAA);      // 55 | AA = FF (fills all bits)

        $display("\n=== All tests complete ===");
        $finish;
    end

endmodule
```

## How to Run
```bash
iverilog -o alu_sim alu.v alu_tb.v && vvp alu_sim
```

Expected output:
```
=== ALU Test ===

ADD:   10 +  20 =  30 (zero=0)
ADD:  255 +   1 =   0 (zero=1)     ← overflow! 255+1 wraps to 0
ADD:    0 +   0 =   0 (zero=1)
SUB:   50 -  20 =  30 (zero=0)
SUB:   10 -  10 =   0 (zero=1)     ← zero flag set!
SUB:    0 -   1 = 255 (zero=0)     ← underflow! wraps around
AND:  ff & aa = aa (zero=0)
AND:  ff & 00 = 00 (zero=1)
OR:   00 | aa = aa (zero=0)
OR:   55 | aa = ff (zero=0)
```

## Key Concepts

| Line | Concept | Physical meaning |
|------|---------|-----------------|
| `always @(*)` | Combinational logic | Logic gates — no memory, pure math |
| `case(op)` | Multiplexer selection | A big mux selecting between operation results |
| `result_r = a + b` | Adder circuit | Ripple-carry or carry-lookahead adder |
| `a - b` | Subtractor | Adder with two's complement of b |
| `8'd255` | Decimal notation | 8-bit value 255 (max value for 8 bits) |
| `(result_r == 8'b0)` | Comparator | NOR of all bits — outputs 1 only if all bits are 0 |

## Break It

1. **Remove the `default` case** → synthesis tools may create a latch (bad!). Research why.
2. **Change `+` to `*`** → now you have a multiplier! Try `8'd12 * 8'd12 = 144`
3. **Add operation `2'b00` as XOR** instead of ADD → `result_r = a ^ b`
4. **Make it 16-bit** → change all `[7:0]` to `[15:0]` and `8'b0` to `16'b0`

## Extend It

1. **Add more operations**: XOR, NOT (only uses input A), shift left (`a << 1`), shift right (`a >> 1`)
2. **Add carry/overflow flags**: detect when arithmetic wraps around
3. **Build an 8-bit comparator**: outputs whether A > B, A < B, or A == B (useful for CPU branch instructions)

## What's Next
→ [[ex04-counter]] — Sequential logic: counting with clock cycles (your first flip-flop!)
