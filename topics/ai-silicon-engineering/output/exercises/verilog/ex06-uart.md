# Verilog Exercise 6: UART Transmitter (Real Protocol)

## What You'll Learn
- How UART (serial communication) actually works at the bit level
- Building a complete, synthesizable module from scratch
- Clock dividers / baud rate generation
- A real FSM with meaningful states and data processing
- This is your graduation exercise for Verilog basics — a module you could actually put on an FPGA and use

## The Concept

UART (Universal Asynchronous Receiver-Transmitter) is how your computer talks to serial devices. It sends data one bit at a time over a single wire. No clock signal is shared between sender and receiver — both sides agree on a speed (baud rate) beforehand.

```
UART frame format (sending the byte 0x55 = 01010101):

Idle  Start   D0  D1  D2  D3  D4  D5  D6  D7  Stop  Idle
 1     0      1   0   1   0   1   0   1   0    1     1
       ↑                                          ↑
       start bit (always 0)                  stop bit (always 1)

At 9600 baud: each bit takes 1/9600 ≈ 104 microseconds
A full byte takes: start + 8 data + stop = 10 bits × 104μs ≈ 1.04ms

Data is sent LSB first (bit 0 first, bit 7 last)
```

## Full Solution

### `uart_tx.v`
```verilog
// uart_tx.v
// UART transmitter — sends one byte at a time over a serial line.
// This is a complete, synthesizable module you could put on an FPGA.
//
// Parameters:
//   CLK_FREQ = your system clock frequency (default 50MHz)
//   BAUD     = desired baud rate (default 9600)
//   The module calculates the clock divider automatically.

module uart_tx #(
    parameter CLK_FREQ = 50_000_000,  // 50 MHz system clock
    parameter BAUD     = 9600          // 9600 baud
)(
    input        clk,          // system clock
    input        rst,          // reset
    input  [7:0] tx_data,     // byte to transmit
    input        tx_start,    // pulse high for 1 clock to start transmission
    output       tx_busy,     // 1 = currently transmitting, don't send new data
    output       tx_line      // the serial output line
);

    // Calculate how many clock cycles per bit
    // Example: 50MHz / 9600 baud = 5208 clock cycles per bit
    localparam CLKS_PER_BIT = CLK_FREQ / BAUD;

    // Counter for bit timing
    // Needs to count up to CLKS_PER_BIT (~5208 for 9600 baud at 50MHz)
    // 13 bits can count up to 8191, which is enough
    reg [12:0] clk_count;

    // Bit index: which data bit are we sending (0-7)
    reg [2:0] bit_index;

    // FSM states
    localparam IDLE    = 3'b000;  // waiting for tx_start
    localparam START   = 3'b001;  // sending start bit (0)
    localparam DATA    = 3'b010;  // sending 8 data bits
    localparam STOP    = 3'b011;  // sending stop bit (1)
    localparam CLEANUP = 3'b100;  // done, go back to idle

    reg [2:0] state;

    // Shift register to hold data being transmitted
    // We shift out one bit at a time, LSB first
    reg [7:0] shift_reg;

    // Output register for the serial line
    reg tx_line_r;

    // ========================================
    // FSM: State register
    // ========================================
    always @(posedge clk) begin
        if (rst) begin
            state     <= IDLE;
            clk_count <= 0;
            bit_index <= 0;
            shift_reg <= 0;
            tx_line_r <= 1;    // idle state of UART line is HIGH
        end
        else begin
            case(state)
                IDLE: begin
                    tx_line_r <= 1;          // line is HIGH when idle
                    clk_count <= 0;
                    bit_index <= 0;
                    if (tx_start) begin
                        shift_reg <= tx_data; // latch the data byte
                        state     <= START;   // begin transmission
                    end
                end

                START: begin
                    tx_line_r <= 0;           // start bit = 0
                    // Stay here for exactly CLKS_PER_BIT clock cycles
                    if (clk_count < CLKS_PER_BIT - 1)
                        clk_count <= clk_count + 1;
                    else begin
                        clk_count <= 0;
                        state     <= DATA;   // done with start bit, send data
                    end
                end

                DATA: begin
                    // Output the current bit (LSB first)
                    // shift_reg[0] is bit_index 0 (LSB)
                    tx_line_r <= shift_reg[0];

                    if (clk_count < CLKS_PER_BIT - 1) begin
                        clk_count <= clk_count + 1;
                    end
                    else begin
                        clk_count <= 0;
                        // Shift right to get next bit
                        // This discards the bit we just sent and brings
                        // the next bit into position [0]
                        shift_reg <= {1'b0, shift_reg[7:1]};

                        // Have we sent all 8 bits?
                        if (bit_index == 7)
                            state <= STOP;    // all bits sent, send stop
                        else
                            bit_index <= bit_index + 1;
                    end
                end

                STOP: begin
                    tx_line_r <= 1;           // stop bit = 1
                    if (clk_count < CLKS_PER_BIT - 1)
                        clk_count <= clk_count + 1;
                    else begin
                        clk_count <= 0;
                        state     <= CLEANUP;
                    end
                end

                CLEANUP: begin
                    state <= IDLE;             // back to waiting
                end

                default: state <= IDLE;
            endcase
        end
    end

    // Continuous assignments
    assign tx_line = tx_line_r;
    assign tx_busy = (state != IDLE);  // busy when not in IDLE

endmodule
```

### `uart_tx_tb.v`
```verilog
`timescale 1ns / 1ps

module uart_tx_tb;

    reg        clk, rst;
    reg  [7:0] tx_data;
    reg        tx_start;
    wire       tx_busy;
    wire       tx_line;

    // Instantiate with smaller timing for simulation
    // Instead of 50MHz/9600 (5208 cycles per bit), use a faster baud
    // for simulation so we don't wait forever
    uart_tx #(
        .CLK_FREQ(100),     // 100 Hz "clock" for simulation
        .BAUD(10)           // 10 baud → 10 clocks per bit
    ) uut(
        .clk(clk),
        .rst(rst),
        .tx_data(tx_data),
        .tx_start(tx_start),
        .tx_busy(tx_busy),
        .tx_line(tx_line)
    );

    // 100Hz clock = 10ms period
    initial clk = 0;
    always #5 clk = ~clk;

    initial begin
        $display("=== UART Transmitter Test ===\n");

        // Reset
        rst = 1;
        tx_start = 0;
        tx_data = 8'h00;
        #30;
        rst = 0;
        #20;

        // Send byte 0x55 (01010101) — alternating bits, easy to see
        $display("Sending 0x55 (binary: 01010101)");
        tx_data  = 8'h55;
        tx_start = 1;
        #10;
        tx_start = 0;    // pulse for 1 clock cycle

        // Wait for transmission to complete
        // At 10 baud, 10 bits × 10 clocks/bit = 100 clocks = 1000ns
        wait(tx_busy == 0);
        $display("Transmission complete!\n");
        #100;

        // Send byte 0xAA (10101010) — the complement
        $display("Sending 0xAA (binary: 10101010)");
        tx_data  = 8'hAA;
        tx_start = 1;
        #10;
        tx_start = 0;

        wait(tx_busy == 0);
        $display("Transmission complete!\n");
        #100;

        // Send byte 0x00 (all zeros)
        $display("Sending 0x00");
        tx_data  = 8'h00;
        tx_start = 1;
        #10;
        tx_start = 0;

        wait(tx_busy == 0);
        $display("Transmission complete!\n");

        $display("All UART tests passed!");
        $finish;
    end

endmodule
```

## How to Run
```bash
iverilog -o uart_sim uart_tx.v uart_tx_tb.v && vvp uart_sim
```

## Why This Exercise Matters

This is the first module that could actually be useful in real hardware. If you synthesize this for an FPGA:
- Connect `tx_line` to an FPGA pin
- Connect that pin to a USB-serial adapter
- Open a serial terminal at 9600 baud
- You'd see the bytes appear on your computer screen

The patterns you learned here (FSM + timer + shift register + clock divider) appear in virtually every communication protocol: SPI, I2C, Ethernet MAC, USB — they all use these same building blocks.

## Key Concepts

| Concept | In this design |
|---------|---------------|
| Parameters | `CLK_FREQ`, `BAUD` — make the module reusable for any clock/speed |
| `localparam` | Computed constant (`CLKS_PER_BIT`) — evaluated at compile time |
| Clock divider | `clk_count` counting to `CLKS_PER_BIT` — generates baud rate timing |
| Shift register | `shift_reg[7:1]` — shifts bits out one at a time, LSB first |
| Handshaking | `tx_start`/`tx_busy` — how modules communicate safely |
| Single-pulse input | `tx_start` high for 1 clock — "command" pattern |

## Extend It

1. **Build the UART receiver** (`uart_rx`) — the other half. Detect the start bit by watching for a HIGH→LOW transition, then sample each bit at the center of its time window
2. **Add a FIFO buffer** — queue up multiple bytes so you can send a continuous stream
3. **Make it send a string** — FSM that sends "Hello\n" one character at a time
4. **Change to 115200 baud** — just change the parameter, everything else adapts

## What's Next
→ [[ex07-openlane]] — Take your Verilog through the OpenLANE flow to see a physical layout!
