---
source_url: "https://medium.com/@indiai/h100-to-b200-what-actually-changed-e652f9694daf"
date_scraped: "2026-04-08"
type: scraped-article
---

H100 to B200: What Actually Changed | by AIQuest | Mar, 2026 | Medium 

[Sitemap](/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](/?source=post_page---top_nav_layout_nav-----------------------------------------)

Get app

[

Write

](/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[

Search

](/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png)

# H100 to B200: What Actually Changed

[

![AIQuest](https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png)





](/@indiai?source=post_page---byline--e652f9694daf---------------------------------------)

[AIQuest](/@indiai?source=post_page---byline--e652f9694daf---------------------------------------)

10 min read

·

Mar 22, 2026

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fe652f9694daf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&user=AIQuest&userId=8a4632db9c25&source=---header_actions--e652f9694daf---------------------clap_footer------------------)

\--

[](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fe652f9694daf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&source=---header_actions--e652f9694daf---------------------bookmark_footer------------------)

Listen

Share

Press enter or click to view image in full size

_The GB200 NVL72 — 72 Blackwell GPUs unified into a single liquid-cooled rack. Source:_ [_NVIDIA_](https://www.nvidia.com/en-us/data-center/gb200-nvl72/)

The [H100](https://www.nvidia.com/en-us/data-center/h100/) was the GPU that made the AI boom possible. It powered ChatGPT’s scale-out, trained the first wave of trillion-parameter models, and became the most fought-over piece of silicon on the planet.

The jump from Hopper to Blackwell isn’t an incremental spec bump — it’s a ground-up rethink of what a GPU is, how it connects to other GPUs, and what “scale” even means at the datacenter level. This article breaks down what actually changed at the hardware level, and why NVIDIA’s [GB200 NVL72](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) architecture represents a genuine inflection point in AI infrastructure.

## Why Blackwell Has Two Dies

The most fundamental change in Blackwell is the manufacturing strategy.

Hopper’s H100 was a single die: 80 billion transistors packed into 814 mm² on [TSMC’s 4N process](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/) (a custom variant of TSMC’s 5nm node, refined for performance). That was already pushing the limits of what a single reticle can produce — the reticle being the physical mask used in lithography to expose a chip, which caps the maximum die area at roughly 800 mm².

NVIDIA’s answer for Blackwell was to split the GPU into two dies and connect them with a 10 TB/s NV-HBI (NVIDIA High Bandwidth Interface) chip-to-chip link — fast enough that software treats them as a single GPU. The result: 208 billion transistors across ~1,600 mm² on TSMC’s refined 4NP process, a **2.6x transistor increase** over H100.

> Blackwell packs 208 billion transistors — 2.6x more than H100 — by connecting two dies at 10 TB/s, faster than most systems’ main memory bandwidth.

This matters because transistor count directly determines how many [Tensor Cores](https://www.nvidia.com/en-us/data-center/tensor-cores/) (NVIDIA’s dedicated matrix-multiply units for AI) you can fit, which determines raw AI compute throughput. More silicon, more math.

## The Numbers

Here’s how Hopper and Blackwell compare on the specs that drive real AI workloads:

Three numbers stand out.

**8 TB/s memory bandwidth.** The B200 moves data at 8 terabytes per second — 2.4x faster than H100 and 1.67x faster than H200. For LLM inference, where the bottleneck is usually moving model weights from memory to Tensor Cores rather than raw compute, this is the single most important spec on the sheet.

**192 GB HBM3e.** [HBM (High Bandwidth Memory)](https://en.wikipedia.org/wiki/High_Bandwidth_Memory) is the stacked memory technology used in high-end GPUs — physically placed alongside the GPU die for maximum bandwidth. The “3e” suffix is the latest generation, with higher speeds than standard HBM3.

At 192 GB, the B200 has more than double the H100’s 80 GB. You can now fit larger models in a single GPU’s memory without resorting to model parallelism (splitting the model across multiple GPUs), which reduces cross-GPU communication overhead and simplifies deployment significantly.

**FP4 support.** FP8, FP4, and FP6 refer to floating-point numerical precision: lower bit-width means smaller numbers, less memory per parameter, and faster computation — at the cost of some accuracy.

Hopper introduced FP8 precision via the first-generation [Transformer Engine](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/). Blackwell’s [second-generation Transformer Engine](https://resources.nvidia.com/en-us-blackwell-architecture) adds FP4 and FP6 — Hopper had no FP4 at all. This enables a B200 to run at 9 PFLOPS sparse FP8 or 18 PFLOPS sparse FP4 on a single GPU card, and it lets you fit twice the model into the same memory footprint by halving the bytes-per-parameter.

> B200’s second-gen Transformer Engine adds FP4 support: 18 PFLOPS sparse on a single GPU, enabling models twice the size in the same memory footprint.

## From HGX B200 to GB200 to NVL72

Blackwell ships in two distinct product lines, and the difference matters more than the GPU spec itself.

[**HGX B200**](https://www.nvidia.com/en-us/data-center/hgx/) is the standard server form factor — 8× B200 GPUs on a baseboard, the same way HGX H100 worked. Dell, HPE, Supermicro and other OEMs drop it into their servers alongside a standard Intel Xeon or AMD EPYC CPU. The CPU connects to the GPUs over PCIe Gen5, capped at ~128 GB/s per slot. It’s a direct Hopper replacement: faster GPUs, same PCIe bottleneck between CPU and GPU, same separate memory spaces. Most Blackwell deployments in 2024–2025 are HGX B200.

[**GB200**](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) is a different product entirely. NVIDIA pairs one [Grace CPU](https://www.nvidia.com/en-us/data-center/grace-cpu/) (their own 72-core Arm server CPU) with two B200 GPUs on a single module, connected via NVLink-C2C at 900 GB/s — 7x faster than PCIe. More importantly, Grace and B200 share a **unified memory address space**: the CPU reads and writes GPU memory directly, no copy operations needed. One GB200 module = 1 Grace CPU + 2 B200 GPUs + 384 GB HBM3e, all coherently connected.

**The compute tray** stacks two GB200 modules: 2 Grace CPUs and 4 B200 GPUs per tray. Each NVL72 rack contains 18 of these trays.

**The** [**GB200 NVL72**](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) takes those 18 compute trays and connects all 72 GPUs via 9 NVSwitch trays into a single liquid-cooled rack. At this scale the GPUs stop being individual accelerators — they become one logical compute fabric with 13.5 TB of coherent memory and 130 TB/s of internal bandwidth.

> **HGX B200 = faster Blackwell GPUs in a standard x86 server.  
> GB200 NVL72 = a new architecture where Grace CPU and B200 are memory-unified and 72 GPUs act as one.**

## NVLink 5 and the NVL72 Rack

The single most consequential architectural change in Blackwell isn’t on the GPU die at all — it’s the interconnect.

[NVLink](https://www.nvidia.com/en-us/data-center/nvlink/) is NVIDIA’s proprietary GPU interconnect — a direct chip-to-chip link that bypasses the PCIe bus (the standard slot used for most add-in cards) and delivers much higher bandwidth between GPUs. NVLink 4 (Hopper) ran at 900 GB/s total bandwidth per GPU. NVLink 5 (Blackwell) doubles that to **1.8 TB/s per GPU**, making it 14x faster than PCIe Gen5.

But the real story is what NVIDIA built on top of NVLink 5.

The [GB200 NVL72](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) is a full rack containing:

*   **72 Blackwell B200 GPUs**
*   **36 NVIDIA Grace CPUs** (2 CPUs + 4 GPUs per compute tray, 18 trays total)
*   **9 NVSwitch trays**, each with dual [NVSwitch Gen3](https://www.nvidia.com/en-us/data-center/nvlink/) chips providing a 130 TB/s switching fabric (NVSwitch is a dedicated crossbar switch chip — think of it as a network switch, but for GPUs, enabling any GPU to talk to any other GPU at full bandwidth)
*   Fully liquid-cooled, drawing ~120 kW at full load

**One more shift that’s easy to miss: how the CPU connects to the GPU changed completely.**

In every Hopper system — [DGX H100](https://www.nvidia.com/en-us/data-center/dgx-h100/), HGX H100, any server rack with H100s — the CPU (an Intel Xeon or AMD EPYC) connects to the GPUs over PCIe Gen5. That gives you about 128 GB/s per direction per slot.

It sounds fast until you realize the GPU’s HBM memory runs at 3.35 TB/s internally — meaning the CPU-to-GPU link was 26x slower than the GPU’s own memory. Any time the CPU needed to send data to the GPU (loading a batch, moving model weights, preprocessing), it went through this bottleneck. CPU and GPU also maintained separate memory spaces, so data had to be explicitly copied back and forth.

In the NVL72, NVIDIA replaced x86 CPUs with their own [Grace CPU](https://www.nvidia.com/en-us/data-center/grace-cpu/) (Arm-based) and connected each Grace to its paired B200 GPUs via NVLink-C2C (chip-to-chip) at 900 GB/s — 7x faster than PCIe Gen5.

More importantly, Grace and B200 share a **unified memory address space**: the CPU can read and write GPU memory directly without explicit copies, and vice versa. This eliminates an entire class of latency that plagued Hopper deployments for any workload mixing CPU preprocessing with GPU inference.

For GPU-to-GPU: all 72 GPUs share a **unified NVLink fabric**. Every GPU can address every other GPU’s memory directly, at full 1.8 TB/s bandwidth, without going through any PCIe switch. Software can treat the entire rack as a single 13.5 TB GPU.

The numbers at NVL72 scale become almost abstract: 324 PFLOPS of peak FP8 compute, 13.5 TB of coherent HBM3e memory, 130 TB/s of internal bandwidth.

NVIDIA claims [30x faster inference](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) for trillion-parameter LLMs compared to an H100 DGX system — and the memory alone explains much of that gain. Fitting a 1T-parameter model in FP16 requires ~2 TB of memory; NVL72 has 13.5 TB, enough headroom to run it with KV cache (the memory buffer that stores intermediate attention computations so they don’t have to be recomputed for each token generated) and still have room to breathe.

## Three More Things Worth Knowing

Beyond raw performance, three Blackwell additions deserve mention for production deployments.

**Dedicated RAS Engine.** Blackwell is the first GPU generation with a dedicated [Reliability, Availability, and Serviceability engine](https://resources.nvidia.com/en-us-blackwell-architecture) — purpose-built hardware that uses AI-driven diagnostics to predict and flag failures before they cause downtime.

At NVL72 scale with 72 GPUs in a single system, unplanned hardware failures aren’t just inconvenient; they abort multi-week training runs and waste millions of dollars of compute.

**Confidential Computing with TEE-I/O.** A Trusted Execution Environment (TEE) is an isolated hardware enclave where code and data are encrypted and protected from the rest of the system — even from the host OS or hypervisor.

Blackwell is the first GPU to support [TEE-I/O](https://www.nvidia.com/en-us/data-center/solutions/confidential-computing/), extending that protection over NVLink itself with near-zero performance overhead. This matters for regulated industries — healthcare, finance, government — where sensitive data cannot leave a trusted execution boundary, even for AI inference.

**Power and cooling.** The B200 draws 1,000 W at full load versus H100’s 700 W — a 43% increase. NVL72 at 120 kW total requires liquid cooling as a hard requirement, not an option.

This is the biggest operational shift for datacenters adopting Blackwell: air-cooled racks simply cannot handle the thermal density, which is driving a rapid infrastructure transition industry-wide.

> At 120 kW, NVL72 requires liquid cooling as a hard requirement — driving the fastest datacenter infrastructure transition the industry has seen.

## Frequently Asked Questions

**Q: What happened to H200 — is it just a Hopper with better memory?**

Yes, exactly. The [H200](https://www.nvidia.com/en-us/data-center/h200/) uses the same H100 die (80B transistors, 4N process, identical compute) but swaps in 141 GB HBM3e at 4.8 TB/s bandwidth instead of H100’s 80 GB HBM3 at 3.35 TB/s.

It’s a memory upgrade, not an architecture upgrade, and it shipped specifically because inference workloads for large models were memory-bandwidth-bound on H100.

**Q: Can Blackwell run the same software as Hopper without changes?**

Largely yes — Blackwell maintains CUDA compatibility with Hopper workloads, so existing training and inference stacks run without modification.

The new capabilities (FP4, TEE-I/O, the RAS engine) require updated frameworks ([cuDNN](https://developer.nvidia.com/cudnn), [TensorRT](https://developer.nvidia.com/tensorrt), [Triton](https://developer.nvidia.com/triton-inference-server)) to take advantage of, but existing code won’t break.

**Q: Why does NVL72 use Grace CPUs instead of standard x86?**

Standard x86 CPUs (Intel Xeon, AMD EPYC) can only connect to GPUs via PCIe — a general-purpose bus limited to ~128 GB/s per slot. [NVIDIA’s Grace CPU](https://www.nvidia.com/en-us/data-center/grace-cpu/) connects via NVLink-C2C at 900 GB/s with a unified memory address space, meaning the CPU and GPU share the same memory pool without any explicit copy operations.

For a standard x86 + H100 system, sending a 10 GB dataset from CPU memory to GPU memory takes a full PCIe transfer. On a Grace + B200 system, the GPU can read that data directly from wherever it sits.

At NVL72 scale — where orchestration, tokenization, sampling, and KV cache management all involve CPU-side logic interleaved with GPU compute — that difference compounds significantly across a full inference workload.

**Q: Is NVL72 the biggest NVLink domain NVIDIA supports?**

NVL72 is the largest single-rack deployment, but NVLink fabric can scale to 576 GPUs across multiple racks using external NVSwitch infrastructure.

NVIDIA’s reference architecture for large training clusters connects multiple NVL72 racks via [800 Gb/s InfiniBand](https://www.nvidia.com/en-us/networking/infiniband/) (a high-speed networking standard common in HPC and AI clusters), treating the NVL72 as a scale-up node (GPUs talking to each other at NVLink speeds within the rack) and InfiniBand as the scale-out fabric (racks talking to each other across the datacenter).

**Q: When do the real-world benchmark numbers land for Blackwell?**

NVL72 systems began customer deployments in late 2024, with production workloads ramping through 2025. [MLPerf Inference v5.0 results](https://mlcommons.org/benchmarks/inference-datacenter/) show Blackwell achieving 2.1x–3.4x per-GPU throughput improvement over H200 (not H100) depending on the model — Llama 2 70B shows ~3x, Mixtral shows ~2.1x, Llama 3.1 405B shows ~3.4x.

The 30x system-level claim is NVL72 (72 GPUs) vs a single DGX H100 node (8 GPUs) on trillion-parameter inference, not a per-GPU comparison.

## Bottom Line

Blackwell isn’t a faster Hopper. It’s a different answer to a different question.

Hopper asked: how do we make one GPU fast enough for today’s largest models? Blackwell asks: how do we make 72 GPUs behave like one? The architectural choices — dual-die design, NVLink 5, the NVSwitch fabric, Grace CPU integration, liquid cooling — are all consequences of that shift in philosophy.

**Three things to take away:**

*   **Per-GPU:** B200 delivers 2.25x the sparse FP8 TFLOPS (9,000 vs 4,000) and 2.4x the memory bandwidth of H100; MLPerf v5.0 shows 2.1–3.4x real-world throughput gains vs H200 depending on model size
*   **At scale:** NVL72’s 13.5 TB of coherent memory and 130 TB/s fabric enables 30x faster inference for trillion-parameter models versus H100 systems
*   **Infrastructure shift:** 1,000 W per GPU and 120 kW per rack make liquid cooling mandatory, not optional — the datacenter transition to Blackwell is as much a facilities project as a hardware upgrade

The race for AI infrastructure no longer runs on individual GPU specs. It runs on how many GPUs you can connect, how fast they talk to each other, and whether your datacenter can actually power and cool them. That’s the Blackwell bet.

## References

**NVIDIA Official Sources**

*   [NVIDIA GB200 NVL72 Product Page](https://www.nvidia.com/en-us/data-center/gb200-nvl72/) — specs, architecture diagrams, and product overview
*   [NVIDIA H100 Tensor Core GPU Datasheet](https://resources.nvidia.com/en-us-tensor-core/nvidia-tensor-core-gpu-datasheet) — H100 SXM5 specifications
*   [NVIDIA H200 Tensor Core GPU](https://www.nvidia.com/en-us/data-center/h200/) — H200 SXM5 specifications and HBM3e details
*   [NVIDIA Blackwell Architecture Technical Brief](https://resources.nvidia.com/en-us-blackwell-architecture) — dual-die design, NVLink 5, Transformer Engine Gen 2
*   [NVIDIA Grace CPU Superchip](https://www.nvidia.com/en-us/data-center/grace-cpu/) — NVLink-C2C bandwidth and Grace architecture

**Benchmarks**

*   [MLPerf Inference v5.0 Results](https://mlcommons.org/benchmarks/inference-datacenter/) — per-GPU throughput comparisons (Llama 2 70B, Mixtral, Llama 3.1 405B)
*   [MLCommons MLPerf Training v4.0](https://mlcommons.org/benchmarks/training/) — training throughput benchmarks

**Further Reading**

*   [NVIDIA Hopper Architecture In-Depth](https://developer.nvidia.com/blog/nvidia-hopper-architecture-in-depth/) — NVIDIA Technical Blog on H100 design
*   [NVIDIA Blackwell Architecture In-Depth](https://developer.nvidia.com/blog/nvidia-blackwell-architecture-technical-deep-dive/) — NVIDIA Technical Blog on B200/GB200 design
*   [NVLink and NVSwitch](https://www.nvidia.com/en-us/data-center/nvlink/) — interconnect architecture overview

_All specifications represent peak rated performance. Real-world results vary by workload, precision, batch size, and system configuration._

**Follow** [**@indiai**](/@indiai) **for weekly deep dives on AI infrastructure, GPU architecture, and the economics of building at scale.**

[

Technology

](/tag/technology?source=post_page-----e652f9694daf---------------------------------------)

[

Artificial Intelligence

](/tag/artificial-intelligence?source=post_page-----e652f9694daf---------------------------------------)

[

Data Science

](/tag/data-science?source=post_page-----e652f9694daf---------------------------------------)

[

Machine Learning

](/tag/machine-learning?source=post_page-----e652f9694daf---------------------------------------)

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fe652f9694daf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&user=AIQuest&userId=8a4632db9c25&source=---footer_actions--e652f9694daf---------------------clap_footer------------------)

\--

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fe652f9694daf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&user=AIQuest&userId=8a4632db9c25&source=---footer_actions--e652f9694daf---------------------clap_footer------------------)

\--

[](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fe652f9694daf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40indiai%2Fh100-to-b200-what-actually-changed-e652f9694daf&source=---footer_actions--e652f9694daf---------------------bookmark_footer------------------)

[

![AIQuest](https://miro.medium.com/v2/resize:fill:96:96/1*dmbNkD5D-u45r44go_cf0g.png)



](/@indiai?source=post_page---post_author_info--e652f9694daf---------------------------------------)

[

![AIQuest](https://miro.medium.com/v2/resize:fill:128:128/1*dmbNkD5D-u45r44go_cf0g.png)



](/@indiai?source=post_page---post_author_info--e652f9694daf---------------------------------------)

[

## Written by AIQuest

](/@indiai?source=post_page---post_author_info--e652f9694daf---------------------------------------)

[2 followers](/@indiai/followers?source=post_page---post_author_info--e652f9694daf---------------------------------------)

·[7 following](/@indiai/following?source=post_page---post_author_info--e652f9694daf---------------------------------------)

Completed PhD in AI

## No responses yet

[](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page---post_responses--e652f9694daf---------------------------------------)

[

Help

](https://help.medium.com/hc/en-us?source=post_page-----e652f9694daf---------------------------------------)

[

Status

](https://status.medium.com/?source=post_page-----e652f9694daf---------------------------------------)

[

About

](/about?autoplay=1&source=post_page-----e652f9694daf---------------------------------------)

[

Careers

](/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----e652f9694daf---------------------------------------)

[

Press

](mailto:pressinquiries@medium.com)

[

Blog

](https://blog.medium.com/?source=post_page-----e652f9694daf---------------------------------------)

[

Privacy

](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----e652f9694daf---------------------------------------)

[

Rules

](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----e652f9694daf---------------------------------------)

[

Terms

](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_