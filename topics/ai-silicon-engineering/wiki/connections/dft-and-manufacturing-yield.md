# DFT and Manufacturing Yield

Design for Test is not just a verification convenience. It is a manufacturing economics tool. The bigger the chip, the more likely it is to contain some defect, and the more expensive it becomes to ship a bad die. DFT increases controllability and observability so manufacturers can detect faults cheaply at wafer probe and final test instead of discovering them in the field.

## Concepts Linked
- [[design-for-test]]
- [[vlsi-design-flow]]
- [[semiconductor-fundamentals]]
- [[eda-tools]]

## Example
Imagine a large accelerator die comes back from the fab:

1. Without scan chains, a stuck-at fault buried inside the pipeline could be almost impossible to isolate.
2. With scan, the tester can shift in a known state, trigger one capture cycle, and shift out the response.
3. If the response is wrong, ATPG patterns help identify which internal cone of logic is failing.
4. That lets the manufacturer bin or discard bad dies before packaging and shipping.

For a billion-transistor chip, this is the difference between a manageable yield screen and an expensive field-failure problem.

## Analysis
DFT changes the cost structure of silicon. It is not only about finding bugs. It is about making test time finite, reducing debug ambiguity, and protecting yield economics. In practice, every extra minute of test time per die scales into real money at wafer volume, so DFT has to balance coverage against cost.

The design lesson is that testability is a first-class architectural requirement. If you leave DFT to the end, you often force the physical design to absorb the pain. If you plan for it early, the entire flow becomes easier to sign off and much safer to manufacture.

