# CUDA Exercise 1: Vector Addition (Your First GPU Kernel)

## What You'll Learn
- What a **kernel** is (a function that runs on the GPU)
- How threads, blocks, and grids are organized
- How to allocate memory on the GPU and copy data between CPU and GPU
- The basic CUDA program structure every GPU program follows

## The Concept

On a CPU, adding two arrays means looping through elements one at a time. On a GPU, you launch thousands of threads that each add ONE element simultaneously. Same result, 100x faster for large arrays.

```
CPU approach (sequential):          GPU approach (parallel):
for (i = 0; i < N; i++)            Kernel launched with N threads:
    c[i] = a[i] + b[i];              Thread 0: c[0] = a[0] + b[0]
                                      Thread 1: c[1] = a[1] + b[1]
  1 thread does N additions           Thread 2: c[2] = a[2] + b[2]
                                      ...
                                      Thread N-1: c[N-1] = a[N-1] + b[N-1]

                                    N threads do 1 addition each — simultaneously
```

## Setup

```bash
# Check if you have an NVIDIA GPU
nvidia-smi

# Install CUDA toolkit
# Arch Linux:
sudo pacman -S cuda

# Ubuntu:
sudo apt install nvidia-cuda-toolkit

# Verify:
nvcc --version
```

**No NVIDIA GPU?** You can use Google Colab (free GPU) — create a new notebook, change runtime type to GPU, and run everything in cells.

## Full Solution

### `vector_add.cu`

```cpp
// vector_add.cu
// Adds two arrays on the GPU.
// This is the "Hello World" of CUDA — every GPU programmer writes this first.

#include <stdio.h>

// ========================================
// THE KERNEL — this runs on the GPU
// ========================================
// __global__ means: "this function runs on the GPU, called from the CPU"
// It's called a "kernel" — think of it as the recipe that every thread follows.

__global__ void vectorAdd(float *a, float *b, float *c, int n) {
    // Every thread needs to know WHICH element it's responsible for.
    // The formula: global_index = block_id * threads_per_block + thread_id_within_block
    //
    // blockIdx.x    → which block am I in? (0, 1, 2, ...)
    // blockDim.x    → how many threads are in each block?
    // threadIdx.x   → which thread am I within my block? (0, 1, 2, ..., blockDim-1)
    //
    // Example: block 2, thread 5, with 256 threads per block:
    //   global index = 2 * 256 + 5 = 517
    //   This thread handles element 517 of the array.
    int i = blockIdx.x * blockDim.x + threadIdx.x;

    // Bounds check: we might launch more threads than elements.
    // If N=1000 and we launch 1024 threads, thread 1000-1023 have nothing to do.
    if (i < n) {
        c[i] = a[i] + b[i];
    }
    // That's the entire kernel. Each thread does ONE addition.
    // But thousands of threads do their ONE addition at the same time.
}

// ========================================
// MAIN — this runs on the CPU (host)
// ========================================
int main() {
    int n = 100000;  // Size of our arrays — 100K elements
    size_t bytes = n * sizeof(float);  // Total memory needed in bytes

    // --- Step 1: Allocate memory on the CPU (host) ---
    // h_a, h_b, h_c — the 'h_' prefix means "host" (CPU memory)
    float *h_a = (float*)malloc(bytes);
    float *h_b = (float*)malloc(bytes);
    float *h_c = (float*)malloc(bytes);

    // --- Step 2: Initialize the input arrays ---
    for (int i = 0; i < n; i++) {
        h_a[i] = 1.0f;    // Fill array A with all 1.0s
        h_b[i] = 2.0f;    // Fill array B with all 2.0s
        // So every element of C should be 1.0 + 2.0 = 3.0
    }

    // --- Step 3: Allocate memory on the GPU (device) ---
    // d_a, d_b, d_c — the 'd_' prefix means "device" (GPU memory)
    // cudaMalloc is like malloc but allocates on the GPU's VRAM
    float *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, bytes);
    cudaMalloc(&d_b, bytes);
    cudaMalloc(&d_c, bytes);

    // --- Step 4: Copy data from CPU to GPU ---
    // cudaMemcpy is like memcpy but between CPU and GPU
    // cudaMemcpyHostToDevice = CPU → GPU direction
    cudaMemcpy(d_a, h_a, bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, h_b, bytes, cudaMemcpyHostToDevice);

    // --- Step 5: Launch the kernel ---
    // This is where the magic happens.

    // How many threads per block?
    // 256 is a good default for simple kernels (must be multiple of 32)
    int threadsPerBlock = 256;

    // How many blocks do we need?
    // We need at least N threads total.
    // blocks = ceil(N / threadsPerBlock) = (N + threadsPerBlock - 1) / threadsPerBlock
    int blocksPerGrid = (n + threadsPerBlock - 1) / threadsPerBlock;

    // LAUNCH THE KERNEL!
    // The <<<blocksPerGrid, threadsPerBlock>>> syntax tells CUDA:
    //   "launch this many blocks, each with this many threads"
    // The kernel function runs simultaneously on all those threads.
    vectorAdd<<<blocksPerGrid, threadsPerBlock>>>(d_a, d_b, d_c, n);

    // Wait for all GPU threads to finish
    cudaDeviceSynchronize();

    // --- Step 6: Copy result from GPU back to CPU ---
    // cudaMemcpyDeviceToHost = GPU → CPU direction
    cudaMemcpy(h_c, d_c, bytes, cudaMemcpyDeviceToHost);

    // --- Step 7: Verify the result ---
    float maxError = 0.0f;
    for (int i = 0; i < n; i++) {
        float error = fabs(h_c[i] - 3.0f);  // should all be 3.0
        if (error > maxError) maxError = error;
    }
    printf("Max error: %f\n", maxError);
    // Expected: Max error: 0.000000 (or very close — floats have rounding)

    // Quick sanity check
    printf("First 5 results: ");
    for (int i = 0; i < 5; i++) printf("%.1f ", h_c[i]);
    printf("\n");
    // Expected: First 5 results: 3.0 3.0 3.0 3.0 3.0

    // --- Step 8: Clean up ---
    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    free(h_a);
    free(h_b);
    free(h_c);

    printf("Vector addition complete!\n");
    return 0;
}
```

## How to Compile and Run

```bash
# Compile: nvcc is the CUDA compiler (like gcc but for GPU code)
nvcc -o vector_add vector_add.cu

# Run:
./vector_add

# Expected output:
# Max error: 0.000000
# First 5 results: 3.0 3.0 3.0 3.0 3.0
# Vector addition complete!
```

## The CUDA Program Structure (Memorize This)

Every CUDA program follows this pattern:

```
1. Allocate and initialize data on CPU        ← malloc, for loop
2. Allocate memory on GPU                     ← cudaMalloc
3. Copy data from CPU to GPU                  ← cudaMemcpy(HostToDevice)
4. Launch kernel on GPU                       ← kernel<<<blocks, threads>>>(...)
5. Wait for GPU to finish                     ← cudaDeviceSynchronize
6. Copy result from GPU to CPU                ← cudaMemcpy(DeviceToHost)
7. Verify and use the result on CPU           ← printf, check
8. Free memory on both CPU and GPU            ← cudaFree, free
```

## Line-by-Line: The Key CUDA Concepts

| Code | What it does | Physical meaning |
|------|-------------|-----------------|
| `__global__` | Marks a function as a GPU kernel | This code runs on GPU hardware, not CPU |
| `blockIdx.x` | Which block this thread is in | GPU has many SMs, each runs multiple blocks |
| `threadIdx.x` | Which thread within its block | Each SM runs 32 threads at a time (a warp) |
| `blockDim.x` | Total threads per block | All threads in a block share fast shared memory |
| `<<<B, T>>>` | Launch config: B blocks, T threads each | Total parallel threads = B × T |
| `cudaMalloc` | Allocate GPU memory | Reserves space in VRAM (HBM) |
| `cudaMemcpy(H2D)` | CPU → GPU copy | Data travels over PCIe/NVLink bus |
| `cudaMemcpy(D2H)` | GPU → CPU copy | Data travels back over the bus |
| `cudaFree` | Free GPU memory | Releases VRAM |

## Break It

1. **Change `threadsPerBlock` to 1** → now you need 100,000 blocks. It works but is very slow because GPU overhead per block is high. Blocks should have at least 128-256 threads.

2. **Remove the bounds check `if (i < n)`** → threads with i >= n will write to memory they shouldn't. For this simple case with aligned sizes it might not crash, but in real code this causes undefined behavior.

3. **Remove `cudaDeviceSynchronize()`** → the cudaMemcpy after it acts as an implicit sync, so it still works. But if you had multiple kernels, you'd need explicit sync between them.

4. **Set `n = 10`** → only 10 elements, one block of 256 threads, 246 threads do nothing. Works fine but wastes GPU resources.

5. **Change `h_a[i] = 1.0f` to `h_a[i] = (float)i`** → now each element is different. Check: c[i] should equal i + 2.0

## Extend It

1. **Add timing**: measure how long the GPU kernel takes vs a CPU loop. Use `cudaEvent_t` for GPU timing:

```cpp
// Add before kernel launch:
cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);
cudaEventRecord(start);

// After kernel launch (before sync):
cudaEventRecord(stop);
cudaEventSynchronize(stop);
float ms;
cudaEventElapsedTime(&ms, start, stop);
printf("GPU time: %.3f ms\n", ms);
```

2. **Compare with CPU**: add a CPU loop that does the same addition, time both, print the speedup ratio.

3. **Make it generic**: write a function that works for `int`, `double`, etc. (hint: C++ templates work in CUDA).

## What's Next
→ [[cuda-ex02-matrix-multiply]] — Matrix multiplication: the operation that powers all of AI
