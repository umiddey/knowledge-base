---
title: "Nvidia Blackwell Ahead in AI Inference, AMD Second"
source: https://spectrum.ieee.org/ai-inference
date: 2025-04-02
type: article
---

# Nvidia Blackwell Leads AI Inference Benchmarks (MLPerf)

## Key Results

### Nvidia Blackwell (B200)
- 36% more HBM than H200
- Can perform ML math at 4-bit precision (vs 8-bit for Hopper)
- 8-B200 system: ~4x tokens/sec of 8-H200 on Llama3.1 405B
- 3x faster than fastest H200 on interactive Llama2 70B
- NVL72 full rack: 869,200 tokens/sec on Llama2 70B (unverified)

### Nvidia Hopper (H100/H200)
- Still getting 60% performance improvement per year through software optimization
- "Still has headroom" — went into production 2022

### AMD MI325X
- Same architecture as MI300, but +33% HBM (256GB) and +13% bandwidth (6 TB/s)
- Within 3-7% of H200 on Llama2 70B
- Within 10% on image generation
- DeepSeek-R1 inference speed boosted 8x through software optimization

### Intel
- Xeon 6 (3nm): ~1/3 performance of H100 on image recognition, but 80% boost over Xeon 5
- Gaudi 3 absent from MLPerf results — software not ready
- New CEO Lip-Bu Tan: "I'm not happy with our current position"

### Google TPU v6e
- 2.5x boost over TPU v5e on image generation
- Roughly in line with H100 on same task

## New MLPerf Benchmarks
1. **Llama2-70B Interactive**: Min 25 tokens/sec, max 450ms first-token latency
2. **Llama3.1 405B**: 128K token context window — for agentic AI
3. **RGAT**: Graph attention network, 2TB dataset, ~3000 topic classification
