# How to Learn Silicon Engineering (Meta-Learning Guide)

You're learning a field where most people have 4-year EE degrees. You're compressing that into self-study. That's doable, but only if you learn *efficiently*. Here's how.

## The Core Method: Read → Type → Break → Fix → Extend

This is the cycle for every exercise in this curriculum:

```
1. READ the solution and the line-by-line explanation
   → Understand WHAT each line does and WHY it's there
   → Don't move on until you can explain it back in your own words

2. TYPE the solution yourself (don't copy-paste)
   → This forces your brain to process every character
   → You'll make typos — that's GOOD, because then you...

3. BREAK something on purpose
   → Change a wire name, remove a line, swap two lines
   → Predict what will happen before you run it
   → Run it and see if your prediction was right
   → This builds the mental model of cause and effect

4. FIX it back to working
   → Now you know what broken looks like AND what fixed looks like

5. EXTEND it (the stretch goal)
   → Add a feature, change a parameter, combine two exercises
   → This is where actual learning happens — applying knowledge to a new problem
```

**Example with Verilog:**
1. Read the AND gate solution. See that `assign y = a & b;` means "y gets the AND of a and b"
2. Type it yourself. `module and_gate(input a, b, output y); assign y = a & b; endmodule`
3. Break it: change `&` to `|` (OR). Predict: "y will be 1 when either input is 1". Run it. You're right.
4. Fix it back to `&`
5. Extend: make it a 3-input AND gate. Now you need `assign y = a & b & c;`

## How to Study Code You Don't Understand

When you see code and think "what the fuck does this mean":

**Step 1: Identify the inputs and outputs**
Every module/function has data going in and data coming out. Find those first. Everything in between is transformation.

**Step 2: Trace one execution path**
Don't try to understand everything at once. Pick ONE scenario (e.g., "what happens when input is 5?") and trace the data through the code line by line.

**Step 3: Draw it**
Hardware is physical. Draw boxes and arrows. Even ugly ones. Your drawing of "data flows from register A through ALU to register B" is worth more than reading the code 10 times.

**Step 4: Annotate**
Write comments on every line in your own words. Not "assigns y to a AND b" (that's just re-reading). Write "this is where the decision gets made — if both inputs are high, output goes high."

## Retention: The 3-7-21 Rule

You will forget things. That's normal. The fix is spaced repetition:

- **Day 1**: Learn the concept, do the exercise
- **Day 3**: Re-do the exercise without looking at the solution (peek if stuck)
- **Day 7**: Modify the exercise (change it to do something slightly different)
- **Day 21**: Build something new that uses the concept (from memory, reference docs OK)

If you can build something new on day 21 without re-reading the tutorial, you've learned it. If you can't, that's fine — re-read, re-do, try again at day 30.

## The 20-Minute Rule for Getting Stuck

When you're stuck on something for more than 20 minutes:

1. **Rubber duck it**: Explain the problem out loud, in detail, to an imaginary person. Often the answer comes while explaining.
2. **Simplify**: Strip the problem down to the smallest possible version. Instead of "my 16-bit ALU doesn't work", test "does my 1-bit adder work?"
3. **Read the error message**: Actually read it. Every word. Error messages in Verilog/CUDA are surprisingly helpful once you learn to read them.
4. **Ask**: Come back to this knowledge base and ask. I have all the context.

## How Much Time Per Day

| Schedule | What you get |
|----------|-------------|
| 30 min/day | Slow progress, but you'll get there in ~6 months |
| 1 hour/day | Solid progress, ~3-4 months to competence |
| 2 hours/day | Fast progress, ~2 months to competence |
| 4+ hours/day | Intensive, ~1 month to competence (but burnout risk) |

**Consistency beats intensity.** 30 minutes every day for a month beats 10 hours on Saturday and nothing the rest of the week. Your brain needs sleep between sessions to consolidate.

## The Deliberate Practice Principle

Not all practice is equal. Watching a tutorial feels like learning but isn't. Reading code feels like learning but isn't. **Only typing code, running it, and debugging it counts as real practice.**

The hierarchy of learning activities, from least to most effective:

```
1. Reading about concepts          → passive, low retention
2. Reading solutions               → slightly better
3. Typing solutions                → decent
4. Typing solutions + explaining   → good
5. Modifying working solutions     → very good
6. Building something new          → excellent
7. Building something new + debugging failures → MAXIMUM
```

Aim to spend 80% of your time in levels 4-7. Levels 1-2 are necessary to orient yourself, but don't linger.

## Pacing Through the Curriculum

**Week 1-2: Verilog basics (Exercises 1-6)**
- One exercise per 1-2 days
- Each exercise: ~30-60 min to complete
- Don't skip exercises — they build on each other

**Week 3: FPGA flow (Exercise 7)**
- Takes the Verilog you've written and makes it physical
- This is where it gets real

**Week 4: Break week or review**
- Re-do exercises 1-6 without looking at solutions
- Identify weak spots

**Week 5-6: CUDA basics (Exercises 8-12)**
- One exercise per 1-2 days
- Similar pattern: type, break, fix, extend
- A good CUDA learning plan usually starts with the official programming guide, small sample programs, a working toolchain, and then progressively larger kernels. A recent Ask HN thread converged on the same advice: build small, read code, and spend a few weeks doing project-sized practice rather than chasing theory alone.

**Week 7-8: Integration**
- Combine Verilog + CUDA knowledge
- Understand the hardware-software connection deeply

**Week 9-12: Capstone**
- Build a RISC-V processor OR a matrix multiply accelerator
- This is your portfolio piece

## How to Read This Curriculum

Each exercise has this structure:

```
## What You'll Learn
→ the concept being taught

## Setup
→ what to install, how to prepare

## The Exercise
→ what you're building

## Full Solution
→ complete working code, EVERY line commented

## Line-by-Line Explanation
→ WHY each line exists, not just what it does

## How to Verify
→ compile and run commands, expected output

## Break It
→ specific things to change and what to predict

## Extend It
→ stretch goals to deepen understanding
```

**The right way to use this**: Read the explanation, type the solution yourself (NO copy-paste), verify it works, break it, fix it, extend it. Then move on.

## Related Concepts
- [[hdl-programming]] — the Verilog/SystemVerilog you'll be writing
- [[cuda-programming]] — the GPU code you'll be writing
- [[from-code-to-silicon]] — the overall learning path these exercises follow

## Sources
- [[raw/articles/news.ycombinator.com-item-id-44216123]] — Ask HN: how to learn CUDA to professional level
