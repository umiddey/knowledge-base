---
title: "CUDA C++ Programming Guide"
source: "https://docs.nvidia.com/cuda/cuda-programming-guide/pdf/cuda-programming-guide.pdf"
source_url: "https://docs.nvidia.com/cuda/cuda-programming-guide/pdf/cuda-programming-guide.pdf"
date: "2026-04-09"
date_scraped: "2026-04-09"
type: "documentation"
tier: 1
---

# CUDA C++ Programming Guide

The official CUDA programming guide is the canonical reference for writing GPU software on NVIDIA hardware.

## What it covers
- CUDA execution model: grids, blocks, threads, warps, and synchronization
- Memory hierarchy: registers, shared memory, L1/L2, global memory, constant and texture memory
- Kernel launch semantics, streams, events, and occupancy
- Unified memory, atomic operations, and memory consistency
- Cooperative groups, dynamic parallelism, and newer GPU features as they are introduced

## Why it matters
- This is the source of truth for `cuda-programming`
- It defines the programming abstractions that AI compilers and libraries ultimately target
- It is the baseline reference for performance tuning on NVIDIA GPUs

