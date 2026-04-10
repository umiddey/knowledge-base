---
title: "NVIDIA TensorRT Developer Guide"
source: "https://docs.nvidia.com/deeplearning/tensorrt/archives/tensorrt-1060/pdf/TensorRT-Developer-Guide.pdf"
source_url: "https://docs.nvidia.com/deeplearning/tensorrt/archives/tensorrt-1060/pdf/TensorRT-Developer-Guide.pdf"
date: "2026-04-09"
date_scraped: "2026-04-09"
type: "documentation"
tier: 1
---

# NVIDIA TensorRT Developer Guide

TensorRT is NVIDIA's production inference compiler and runtime for deep learning models.

## What it covers
- Network definition, parsing, and engine building
- Precision modes such as FP32, FP16, BF16, INT8, and newer low-precision paths
- Layer fusion, kernel selection, and memory planning
- Calibration and quantization for inference deployment
- Runtime APIs, plugin extensions, and deployment workflow

## Why it matters
- This is the primary source for inference optimization on NVIDIA GPUs
- It connects compiler decisions directly to `nvidia-gpu-architecture`
- It is a core reference for `ai-compilers`

