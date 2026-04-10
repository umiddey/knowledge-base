# CUDA Exercise 2: Matrix Multiplication (The Core of AI)

## What You'll Learn
- How matrix multiplication maps to 2D GPU threads
- The `dim3` type for 2D grids and blocks
- Why **shared memory** is the key optimization for matrix multiply
- Tiled matrix multiply — the technique used in real cuBLAS

## The Concept

Matrix multiply is THE operation in AI. Every neural network layer is a matrix multiply under the hood. If you understand how to optimize this on a GPU, you understand AI hardware.

```
C = A × B   where A is M×K, B is K×N, C is M×N

For each element C[i][j]:
  C[i][j] = sum over k: A[i][k] * B[k][j]

Example: 4×4 result needs 4×4×4 = 64 multiply-add operations

On GPU: launch M×N threads. Each thread computes ONE element of C.
Thread at position (i,j) computes the dot product of row i of A and column j of B.
```

## Full Solution — Naive Version (Understand This First)

### `matmul_naive.cu`

```cpp
// matmul_naive.cu
// Naive matrix multiplication on GPU.
// Each thread computes ONE element of the output matrix C.
// This works correctly but is slow because it reads from global memory too much.
// We'll optimize it in the next version.

#include <stdio.h>

// Matrix dimensions (change these to experiment)
#define M 512    // rows of A and C
#define K 512    // columns of A, rows of B
#define N 512    // columns of B and C

// ========================================
// NAIVE KERNEL — correct but slow
// ========================================
__global__ void matmul_naive(float *A, float *B, float *C, int m, int k, int n) {
    // 2D thread index: each thread is responsible for one element C[row][col]
    int row = blockIdx.y * blockDim.y + threadIdx.y;  // which row of C
    int col = blockIdx.x * blockDim.x + threadIdx.x;  // which column of C

    // Bounds check (our grid might be slightly larger than the matrix)
    if (row < m && col < n) {
        float sum = 0.0f;

        // Compute dot product of A's row and B's column
        // This reads A[row][0..k-1] and B[0..k-1][col] from GLOBAL memory
        // Each read goes to VRAM (slow, ~3 TB/s but still the bottleneck)
        for (int i = 0; i < k; i++) {
            // A[row * k + i] = A[row][i] (row-major layout)
            // B[i * n + col] = B[i][col] (row-major layout)
            sum += A[row * k + i] * B[i * n + col];
        }

        // Write result
        C[row * n + col] = sum;
    }
    // Performance problem: this thread reads K values from A and K values from B
    // from global memory. For K=512, that's 1024 global memory reads per thread.
    // Global memory is SLOW. We'll fix this with shared memory tiling.
}

// ========================================
// MAIN
// ========================================
int main() {
    size_t bytes_A = M * K * sizeof(float);
    size_t bytes_B = K * N * sizeof(float);
    size_t bytes_C = M * N * sizeof(float);

    // Allocate on CPU
    float *h_A = (float*)malloc(bytes_A);
    float *h_B = (float*)malloc(bytes_B);
    float *h_C = (float*)malloc(bytes_C);

    // Initialize: A filled with 1.0, B filled with 2.0
    // Result should be: C = M×K matrix of 1.0 × K×N matrix of 2.0
    // Each C[i][j] = sum of K terms of (1.0 × 2.0) = K × 2.0 = 1024.0
    for (int i = 0; i < M * K; i++) h_A[i] = 1.0f;
    for (int i = 0; i < K * N; i++) h_B[i] = 2.0f;

    // Allocate on GPU
    float *d_A, *d_B, *d_C;
    cudaMalloc(&d_A, bytes_A);
    cudaMalloc(&d_B, bytes_B);
    cudaMalloc(&d_C, bytes_C);

    // Copy to GPU
    cudaMemcpy(d_A, h_A, bytes_A, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, bytes_B, cudaMemcpyHostToDevice);

    // --- Launch configuration ---
    // Use 2D blocks of 16×16 = 256 threads
    dim3 threadsPerBlock(16, 16);

    // Calculate how many blocks we need in each dimension
    // ceil(M / 16) blocks vertically, ceil(N / 16) blocks horizontally
    dim3 blocksPerGrid(
        (N + 15) / 16,   // number of blocks along x (columns)
        (M + 15) / 16    // number of blocks along y (rows)
    );

    // Time the kernel
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    matmul_naive<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, M, K, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms;
    cudaEventElapsedTime(&ms, start, stop);

    // Copy result back
    cudaMemcpy(h_C, d_C, bytes_C, cudaMemcpyDeviceToHost);

    // Verify
    float maxError = 0.0f;
    float expected = (float)K * 2.0f;  // K elements, each 1.0 × 2.0
    for (int i = 0; i < M * N; i++) {
        float error = fabs(h_C[i] - expected);
        if (error > maxError) maxError = error;
    }

    printf("Matrix multiply: %d x %d x %d\n", M, K, N);
    printf("Naive kernel time: %.3f ms\n", ms);
    printf("Max error: %f (expected %f)\n", maxError, expected);

    // Calculate GFLOPS
    double flops = 2.0 * M * K * N;  // multiply + add for each element
    double gflops = flops / (ms * 1e6);
    printf("Performance: %.1f GFLOPS\n", gflops);

    // Cleanup
    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);
    free(h_A); free(h_B); free(h_C);

    return 0;
}
```

## How to Run

```bash
nvcc -o matmul_naive matmul_naive.cu
./matmul_naive

# Expected output (your numbers will vary by GPU):
# Matrix multiply: 512 x 512 x 512
# Naive kernel time: 2.345 ms
# Max error: 0.000000 (expected 1024.000000)
# Performance: 114.8 GFLOPS
```

## Why This Is Slow (And How to Fix It)

The naive kernel reads each element of A and B from **global memory** (VRAM) every single time. For our 512×512 multiply:

```
Each thread reads: K values from A + K values from B = 1024 reads from global memory
Total threads: M × N = 262,144 threads
Total global memory reads: 262,144 × 1024 = 268 million reads

But A only has M×K = 262,144 elements, and B has K×N = 262,144 elements.
We're reading each element of A ~N times and each element of B ~M times!

The data is reused but we don't CACHE it. Every reuse goes back to slow global memory.
```

**The fix: shared memory tiling.** Load a tile of A and B into fast on-chip shared memory, compute from there, then load the next tile.

## Full Solution — Tiled Version (The Real Deal)

### `matmul_tiled.cu`

```cpp
// matmul_tiled.cu
// Tiled matrix multiplication using shared memory.
// This is the key optimization that makes GPU matrix multiply fast.
// cuBLAS uses variations of this technique.

#include <stdio.h>

#define M 512
#define K 512
#define N 512
#define TILE_SIZE 16  // Each tile is 16×16. Must match blockDim.

__global__ void matmul_tiled(float *A, float *B, float *C, int m, int k, int n) {
    // Shared memory: fast on-chip memory shared by all threads in a block.
    // ~100x faster than global memory (tens of TB/s vs ~3 TB/s).
    // But small: typically 48KB per SM.
    // We load TILES of A and B here so we can reuse them without hitting global memory.
    __shared__ float s_A[TILE_SIZE][TILE_SIZE];  // 16×16 = 256 floats = 1KB
    __shared__ float s_B[TILE_SIZE][TILE_SIZE];  // 16×16 = 256 floats = 1KB

    // This thread computes C[row][col]
    int row = blockIdx.y * TILE_SIZE + threadIdx.y;
    int col = blockIdx.x * TILE_SIZE + threadIdx.x;

    float sum = 0.0f;

    // Loop over tiles of A and B
    // For a 512×512 matrix with 16×16 tiles: 512/16 = 32 tiles
    // Each iteration loads one tile of A and one tile of B into shared memory
    int numTiles = (k + TILE_SIZE - 1) / TILE_SIZE;

    for (int t = 0; t < numTiles; t++) {
        // --- Load tile from global memory into shared memory ---
        // Each thread loads ONE element of A and ONE element of B
        int a_col = t * TILE_SIZE + threadIdx.x;  // column in A for this tile
        int b_row = t * TILE_SIZE + threadIdx.y;  // row in B for this tile

        // Load A[row][a_col] into shared memory (if within bounds)
        if (row < m && a_col < k)
            s_A[threadIdx.y][threadIdx.x] = A[row * k + a_col];
        else
            s_A[threadIdx.y][threadIdx.x] = 0.0f;  // padding for edge tiles

        // Load B[b_row][col] into shared memory (if within bounds)
        if (b_row < k && col < n)
            s_B[threadIdx.y][threadIdx.x] = B[b_row * n + col];
        else
            s_B[threadIdx.y][threadIdx.x] = 0.0f;

        // CRITICAL: wait for ALL threads in the block to finish loading
        // Without this, some threads might start computing before the data is ready
        __syncthreads();

        // --- Compute partial sum from this tile ---
        // Now we read from FAST shared memory instead of slow global memory!
        // Each thread reads 16 values from s_A and 16 values from s_B
        // All 256 threads do this simultaneously
        for (int i = 0; i < TILE_SIZE; i++) {
            sum += s_A[threadIdx.y][i] * s_B[i][threadIdx.x];
        }

        // CRITICAL: wait for ALL threads to finish computing before we
        // overwrite shared memory with the next tile
        __syncthreads();
    }

    // Write final result to global memory
    if (row < m && col < n) {
        C[row * n + col] = sum;
    }

    // Performance improvement:
    // Naive: each element of A and B read from global memory K times
    // Tiled: each element read from global memory once per tile,
    //        then reused TILE_SIZE times from shared memory
    // For TILE_SIZE=16: 16x fewer global memory reads!
}

// Main function is the same as naive version, just change the kernel call
int main() {
    // ... (same allocation, initialization, copy as naive version) ...
    size_t bytes_A = M * K * sizeof(float);
    size_t bytes_B = K * N * sizeof(float);
    size_t bytes_C = M * N * sizeof(float);

    float *h_A = (float*)malloc(bytes_A);
    float *h_B = (float*)malloc(bytes_B);
    float *h_C = (float*)malloc(bytes_C);

    for (int i = 0; i < M * K; i++) h_A[i] = 1.0f;
    for (int i = 0; i < K * N; i++) h_B[i] = 2.0f;

    float *d_A, *d_B, *d_C;
    cudaMalloc(&d_A, bytes_A);
    cudaMalloc(&d_B, bytes_B);
    cudaMalloc(&d_C, bytes_C);

    cudaMemcpy(d_A, h_A, bytes_A, cudaMemcpyHostToDevice);
    cudaMemcpy(d_B, h_B, bytes_B, cudaMemcpyHostToDevice);

    dim3 threadsPerBlock(TILE_SIZE, TILE_SIZE);
    dim3 blocksPerGrid((N + TILE_SIZE - 1) / TILE_SIZE,
                       (M + TILE_SIZE - 1) / TILE_SIZE);

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    matmul_tiled<<<blocksPerGrid, threadsPerBlock>>>(d_A, d_B, d_C, M, K, N);
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms;
    cudaEventElapsedTime(&ms, start, stop);

    cudaMemcpy(h_C, d_C, bytes_C, cudaMemcpyDeviceToHost);

    float maxError = 0.0f;
    float expected = (float)K * 2.0f;
    for (int i = 0; i < M * N; i++) {
        float error = fabs(h_C[i] - expected);
        if (error > maxError) maxError = error;
    }

    printf("Tiled matrix multiply: %d x %d x %d\n", M, K, N);
    printf("Tiled kernel time: %.3f ms\n", ms);
    printf("Max error: %f\n", maxError);

    double flops = 2.0 * M * K * N;
    double gflops = flops / (ms * 1e6);
    printf("Performance: %.1f GFLOPS\n", gflops);

    // Compare: this should be significantly faster than naive
    // Typical improvement: 2-5x speedup from tiling alone

    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);
    free(h_A); free(h_B); free(h_C);
    return 0;
}
```

## How to Run and Compare

```bash
# Compile both
nvcc -o matmul_naive matmul_naive.cu
nvcc -o matmul_tiled matmul_tiled.cu

# Run both and compare times
./matmul_naive
./matmul_tiled

# You should see the tiled version is 2-5x faster
# Same result, but much better memory access pattern
```

## Key Concepts

| Concept | Code | Why it matters |
|---------|------|---------------|
| `dim3` | `dim3 threads(16, 16)` | 2D arrangement of threads — matches 2D matrix layout |
| `__shared__` | `__shared__ float s_A[16][16]` | Fast on-chip memory (~100x faster than global) |
| `__syncthreads()` | Barrier within a block | All threads must finish loading before any compute |
| Tiling | Loop over tiles, load into shared, compute | Reduces global memory reads by TILE_SIZE factor |
| Row-major layout | `A[row * k + col]` | How 2D arrays are stored in 1D memory |

## Break It

1. **Remove `__syncthreads()` after loading** → race condition! Some threads compute with stale data. The result will be WRONG (not just slow — actually incorrect).

2. **Change TILE_SIZE to 32** → shared memory usage goes from 2KB to 8KB per block. Might still work, but limits how many blocks can run simultaneously per SM (fewer blocks = lower occupancy = potentially slower).

3. **Remove the bounds checks in loading** → out-of-bounds global memory reads. Might crash or return garbage.

4. **Set TILE_SIZE to 3** → tiles don't evenly divide the matrix. The edge tiles load padding zeros — correct but wasteful.

## Extend It

1. **Use Tensor Cores**: include `<mma.h>` and use `wmma::load_matrix_sync`, `wmma::mma_sync`. This gives another 2-8x speedup on NVIDIA GPUs.

2. **Benchmark at different sizes**: try 128×128, 1024×1024, 4096×4096. See how performance scales. Larger matrices are more efficient (more compute per memory access).

3. **Add bias add + ReLU** after matrix multiply → you've just built a neural network layer!

## What's Next
→ [[cuda-ex03-reduction]] — Parallel reduction: summing an array on the GPU (harder than it sounds)
