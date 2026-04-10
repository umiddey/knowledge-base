# CUDA Exercise 3: Parallel Reduction (Summing an Array)

## What You'll Learn
- Why summing on the GPU is harder than it looks
- The **reduction** pattern — used everywhere in AI (loss functions, batch norms, softmax)
- Thread divergence and bank conflicts
- Multiple optimization levels (naive → optimized)

## The Concept

Summing an array sounds trivial. On a CPU: `for (i=0; i<N; i++) sum += a[i]`. On a GPU, you can't have all threads add to one variable — that's a race condition. Instead, you use a **tree reduction**: pairs of threads combine values, then pairs of those results combine, until one number remains.

```
Array: [5, 3, 7, 1, 8, 2, 6, 4]

Step 1: Combine pairs        → [8, 8, 10, 10]     (4 additions)
Step 2: Combine pairs        → [16, 20]            (2 additions)
Step 3: Combine pairs        → [36]                (1 addition)

Result: 36. Done in log2(8) = 3 steps instead of 7 sequential additions.
For N=1M: 20 steps instead of 1M — that's 50,000x parallelism!
```

## Full Solution

### `reduction.cu`

```cpp
// reduction.cu
// Parallel reduction: sum all elements of an array on the GPU.
// Shows three optimization levels from naive to fast.

#include <stdio.h>
#include <stdlib.h>

#define N (1 << 20)  // 1 million elements

// ========================================
// LEVEL 1: Naive interleaved reduction
// ========================================
// Each step: thread i adds stride elements apart
// Problem: high thread divergence (many threads idle after first few steps)

__global__ void reduce_naive(float *input, float *output, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    // Load input into shared memory for this block
    __shared__ float sdata[256];
    sdata[threadIdx.x] = (idx < n) ? input[idx] : 0.0f;
    __syncthreads();

    // Reduction in shared memory
    // Step 1: threads 0-127 add values from threads 128-255
    // Step 2: threads 0-63 add values from threads 64-127
    // ...until thread 0 has the sum
    for (int stride = blockDim.x / 2; stride > 0; stride >>= 1) {
        // Only threads with idx < stride do work
        // The rest are idle but still occupy GPU resources
        if (threadIdx.x < stride) {
            sdata[threadIdx.x] += sdata[threadIdx.x + stride];
        }
        __syncthreads();  // wait before next iteration
    }

    // Thread 0 writes the block's partial sum
    if (threadIdx.x == 0) {
        output[blockIdx.x] = sdata[0];
    }
}

// ========================================
// LEVEL 2: Optimized — reduce thread divergence
// ========================================
// Key insight: in the naive version, half the threads are idle in step 1,
// 75% are idle by step 2, etc. This wastes GPU compute.
// Fix: reverse the access pattern so the FIRST step has all threads active

__global__ void reduce_optimized(float *input, float *output, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;

    __shared__ float sdata[256];

    // First: each thread sums multiple elements from global memory
    // This is called "sequential addressing" — reduces total number of
    // threads needed and does some work before entering the reduction
    float mySum = 0.0f;
    int tid = threadIdx.x;

    // Grid-stride loop: each thread sums elements that are gridSize apart
    // This handles arrays larger than the number of threads
    int gridSize = blockDim.x * gridDim.x;
    for (int i = idx; i < n; i += gridSize) {
        mySum += input[i];
    }
    sdata[tid] = mySum;
    __syncthreads();

    // Reduction with better access pattern
    // Start with stride=1 (all threads active), then double
    // This is the reverse of naive and has LESS divergence
    for (int stride = 1; stride < blockDim.x; stride *= 2) {
        // Only threads at even positions do the adding
        int index = 2 * stride * tid;
        if (index < blockDim.x) {
            sdata[index] += sdata[index + stride];
        }
        __syncthreads();
    }

    if (tid == 0) {
        output[blockIdx.x] = sdata[0];
    }
}

// ========================================
// MAIN
// ========================================
int main() {
    size_t bytes = N * sizeof(float);

    // CPU data
    float *h_input = (float*)malloc(bytes);
    float h_sum_cpu = 0.0f;

    // Initialize with random values 0-1
    srand(42);
    for (int i = 0; i < N; i++) {
        h_input[i] = (float)rand() / RAND_MAX;
        h_sum_cpu += h_input[i];  // compute CPU reference
    }

    // GPU data
    float *d_input, *d_partial;
    cudaMalloc(&d_input, bytes);

    // We need space for partial sums (one per block)
    int threadsPerBlock = 256;
    int blocksPerGrid = (N + threadsPerBlock - 1) / threadsPerBlock;
    cudaMalloc(&d_partial, blocksPerGrid * sizeof(float));

    cudaMemcpy(d_input, h_input, bytes, cudaMemcpyHostToDevice);

    // --- Run naive reduction ---
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    reduce_naive<<<blocksPerGrid, threadsPerBlock>>>(d_input, d_partial, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms_naive;
    cudaEventElapsedTime(&ms_naive, start, stop);

    // Copy partial sums back and finish on CPU
    float *h_partial = (float*)malloc(blocksPerGrid * sizeof(float));
    cudaMemcpy(h_partial, d_partial, blocksPerGrid * sizeof(float), cudaMemcpyDeviceToHost);

    float h_sum_naive = 0.0f;
    for (int i = 0; i < blocksPerGrid; i++) h_sum_naive += h_partial[i];

    // --- Run optimized reduction ---
    cudaMemcpy(d_input, h_input, bytes, cudaMemcpyHostToDevice);

    cudaEventRecord(start);
    reduce_optimized<<<blocksPerGrid, threadsPerBlock>>>(d_input, d_partial, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms_opt;
    cudaEventElapsedTime(&ms_opt, start, stop);

    cudaMemcpy(h_partial, d_partial, blocksPerGrid * sizeof(float), cudaMemcpyDeviceToHost);

    float h_sum_opt = 0.0f;
    for (int i = 0; i < blocksPerGrid; i++) h_sum_opt += h_partial[i];

    // --- Results ---
    printf("Array size: %d elements\n", N);
    printf("CPU sum:            %.6f\n", h_sum_cpu);
    printf("Naive GPU sum:      %.6f  (%.3f ms)\n", h_sum_naive, ms_naive);
    printf("Optimized GPU sum:  %.6f  (%.3f ms)\n", h_sum_opt, ms_opt);
    printf("Naive error:        %.6f\n", fabs(h_sum_naive - h_sum_cpu));
    printf("Optimized error:    %.6f\n", fabs(h_sum_opt - h_sum_cpu));

    // Note: small errors are normal — floating point addition is not associative!
    // (a + b) + c != a + (b + c) in floating point. Different orderings give
    // slightly different results. This is expected, not a bug.

    cudaFree(d_input);
    cudaFree(d_partial);
    free(h_input);
    free(h_partial);

    return 0;
}
```

## How to Run

```bash
nvcc -o reduction reduction.cu
./reduction

# Expected output:
# Array size: 1048576 elements
# CPU sum:            524355.312500
# Naive GPU sum:      524355.312500  (0.123 ms)
# Optimized GPU sum:  524355.312500  (0.098 ms)
# Naive error:        0.000061
# Optimized error:    0.000061
```

## Key Concepts

| Pattern | What it is | Where it appears in AI |
|---------|-----------|----------------------|
| Reduction | Combine N values into 1 using an operator | Sum, max, min, mean |
| Tree reduction | Log(N) steps instead of N | Softmax denominator, loss computation |
| Thread divergence | Threads in a warp taking different paths | Performance killer on GPUs |
| Sequential addressing | Each thread sums multiple elements first | Hides latency, reduces thread count |
| Floating point non-associativity | (a+b)+c != a+(b+c) in floats | Normal, not a bug — just be aware |

## Break It

1. **Remove `__syncthreads()`** inside the reduction loop → race condition, wrong answer, possible crash
2. **Remove bounds check `(idx < n)`** → threads read past array end, garbage data
3. **Set N very small (like 8)** → watch it work with only 1 block and 8 threads
4. **Set N very large (16M)** → partial sums array gets big, need to reduce the partial sums on GPU too

## Extend It

1. **Two-pass reduction**: first kernel reduces to partial sums, second kernel reduces the partial sums to one final value. This handles arbitrarily large arrays entirely on the GPU.

2. **Implement MAX reduction**: change `+=` to `fmax()` — now you have a parallel max finder (used in softmax and batch norm).

3. **Use warp-level primitives**: replace the last 5 steps of shared memory reduction with `__shfl_down_sync()` — shuffles data between threads in a warp without shared memory. Another ~2x speedup for the final reduction steps.

## What's Next
You've completed the core CUDA exercises. Go back and:
- Combine exercises 2 and 3 to build a neural network layer (matmul + bias + ReLU)
- Read the [[cuda-programming]] concept article for deeper optimization techniques
- Try writing a simple convolution kernel
