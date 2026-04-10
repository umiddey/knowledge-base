---
title: "TVM: An Automated End-to-End Optimizing Compiler for Deep Learning"
source: "https://arxiv.org/abs/1802.04799"
source_url: "https://arxiv.org/abs/1802.04799"
date: "2026-04-09"
date_scraped: "2026-04-09"
type: "paper"
tier: 1
---

# TVM: An Automated End-to-End Optimizing Compiler for Deep Learning

This paper is the canonical TVM reference. It presents an end-to-end compiler stack for deep learning workloads.

## Core ideas
- High-level model representation lowered into target-specific code
- Schedule search and autotuning to find fast implementations
- Separation of compute definition from hardware mapping
- Support for many targets instead of a single accelerator

## Why it matters
- It is foundational for understanding modern ML compiler design
- It explains the ideas behind TVM's search-based optimization workflow
- It is one of the key papers behind `ai-compilers`

