---
source_url: "https://naddod.medium.com/exploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3"
date_scraped: "2026-04-08"
type: scraped-article
---

Exploring CPU、GPU、TPU and NPU: Architecture and Key Differences Introduction | by NADDOD | Mar, 2026 | Medium 

[Sitemap](/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](https://medium.com/?source=post_page---top_nav_layout_nav-----------------------------------------)

Get app

[

Write

](https://medium.com/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[

Search

](https://medium.com/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](https://medium.com/m/signin?operation=login&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png)

# Exploring CPU、GPU、TPU and NPU: Architecture and Key Differences Introduction

[

![NADDOD](https://miro.medium.com/v2/resize:fill:64:64/1*VJvvs390lXUtFkEMtx-J1w.png)





](/?source=post_page---byline--dda6800ee7e3---------------------------------------)

[NADDOD](/?source=post_page---byline--dda6800ee7e3---------------------------------------)

12 min read

·

Mar 16, 2026

[

](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fdda6800ee7e3&operation=register&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&user=NADDOD&userId=fb39a90511bb&source=---header_actions--dda6800ee7e3---------------------clap_footer------------------)

\--

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fdda6800ee7e3&operation=register&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&source=---header_actions--dda6800ee7e3---------------------bookmark_footer------------------)

Listen

Share

The development of AI not only relies on advanced software but also places unprecedented demands on hardware. Traditional general-purpose computing chips cannot meet the billions of calculations required by modern AI, making dedicated accelerators a crucial support. Currently, CPUs (Central Processing Units), GPUs (Graphics Processing Units), NPUs (Neural Processing Units), and TPUs (Tensor Processing Units) are the main types of AI chips, each optimized for different computing tasks, from training large models to real-time inference on mobile devices. This guide will systematically analyze the architectural features, design differences, and applicable scenarios of these chips to help understand the modern AI hardware ecosystem and its performance optimization strategies.

## Why AI Needs Different Chips

AI computing differs drastically from traditional software. The training phase demands extremely high sustained computing power, consuming vast amounts of power and relying on the collaboration of thousands of chips; the inference phase requires low latency, high energy efficiency, and processing massive amounts of requests per second. This highly regular and predictable matrix computation and data reuse characteristic makes dedicated AI chips more efficient than general-purpose CPUs.

AI computing heavily relies on matrix multiplication: a single-layer neural network may require trillions of multiplication-addition operations on a 10,000×10,000 matrix, while billions of similar operations are performed during the entire model inference process. This regularity and predictability of computation facilitates chip design: AI accelerators can eliminate complex control logic and concentrate a large number of simple computing units.

Data reuse further improves efficiency: the same model weights or image patterns are used multiple times; hardware can store this data near the processor, reducing slow memory access. Compared to traditional CPUs that spend a large amount of chip area on branch prediction and out-of-order execution, AI chips dedicate 70%–80% of their area to actual computation, sacrificing flexibility for high throughput.

Press enter or click to view image in full size

## CPU (Central Processing Unit)

The CPU is designed with generality and flexibility as its primary goals.

Almost every computing device — from personal computers to servers — relies on CPUs to run a wide variety of software, including word processors, database systems, and video games. This versatility comes from a sophisticated and complex architecture that enables CPUs to perform strongly across general-purpose workloads.

In modern servers, CPUs typically contain 8 to 128 cores. Each core integrates numerous advanced mechanisms, including:

*   Out-of-Order Execution — Reorders instruction execution for improved efficiency rather than strictly following program order.
*   Branch Prediction — Predicts conditional branches to reduce waiting time.
*   Large Caches — Store frequently used data closer to the cores to reduce memory access latency.

Press enter or click to view image in full size

These sophisticated features make each CPU core relatively expensive in terms of chip area and power consumption. However, they also give CPUs a clear advantage when handling sequential logic, conditional branching, and workloads that are difficult to parallelize.

For many unpredictable workloads or tasks involving complex control logic, CPUs remain the most suitable processors. In typical AI computing systems, CPUs mainly perform the following tasks:

*   Running the operating system and managing system resources
*   Loading and preprocessing data
*   Scheduling computational tasks across accelerators
*   Executing general-purpose workloads unrelated to AI training or inference

At the system level, the CPU acts as the “orchestrator” of the AI computing platform. While most of the heavy computation is performed by GPUs or other accelerators, the CPU coordinates the entire workflow to ensure efficient operation.

For smaller models (for example, models with only a few million parameters), CPUs can still handle lightweight inference tasks effectively. In addition, many traditional machine learning algorithms — such as decision trees, linear regression, and random forests — often run efficiently on CPUs.

**Limitations of CPUs**

Despite their importance in system control and general computing, CPUs often struggle to meet the performance demands of deep learning workloads

The primary reasons are limited parallelism and higher per-operation cost. Modern CPUs typically support only hundreds of parallel operations, while GPUs can easily achieve millions of parallel computations. As a result, training deep neural networks on CPUs may take weeks or even months, whereas GPUs may complete the same workload in hours or days. In many real-world scenarios, the performance difference can reach 10 to 100 times.

Additionally, CPUs have a significantly higher cost per FLOP (floating-point operation) compared with specialized AI accelerators. Their memory bandwidth is also insufficient for many large-scale deep learning workloads.

## GPU（Graphics Processing Unit）

GPUs have become core hardware for AI training and large-scale computing. Although initially designed for graphics rendering, their highly parallel architecture is a perfect fit for matrix computations in deep learning, leading to their widespread application in AI research and production systems.

Unlike CPUs, which consist of a small number of complex cores, GPUs employ a massively parallel design, comprising thousands of relatively simple computational cores. These cores are typically organized as Streaming Multiprocessors (SMs), each containing multiple computational cores and shared resources. Modern high-end GPUs often have hundreds of SMs, with a total core count reaching ten thousand to eighteen thousand, enabling them to execute a large number of similar computational tasks simultaneously.

The GPU’s memory subsystem is also optimized for high throughput.

*   Consumer-grade GPUs typically use GDDR6 or GDDR6X memory with a bandwidth of approximately 600–1000 GB/s;
*   Data center GPUs utilize High Bandwidth Memory (HBM), with bandwidths reaching 2–3 TB/s, significantly higher than typical CPU platforms, thus meeting the data throughput requirements of large-scale matrix operations.

Modern GPUs also integrate [Tensor Cores](https://www.naddod.com/ai-insights/introduction-to-tensor-cores-in-nvidia-gpus) dedicated to AI computing. These dedicated units are optimized for mixed-precision matrix multiplication and addition operations, enabling small-scale matrix multiplication and addition operations to be performed in a single cycle, and supporting low-precision formats such as FP16, BF16, INT8, and INT4. They can provide several times the performance improvement of traditional computing cores in deep learning training and inference tasks.

**Advantages of GPUs**

GPUs have become the mainstream choice for AI computing primarily due to their comprehensive advantages in training, inference, and development ecosystems.

*   During the training phase, GPUs offer high flexibility. Researchers can quickly experiment with new model architectures, tune hyperparameters, and perform debugging using mature toolchains. Simultaneously, multi-GPU systems have excellent scalability, expanding from a few GPUs on a single machine to large-scale clusters of thousands or even tens of thousands of GPUs to support the training needs of cutting-edge models.
*   During the inference phase, GPUs also possess strong versatility, supporting a variety of application scenarios, from real-time video processing to deploying large language models with hundreds of billions of parameters. For high-throughput services, GPUs can also effectively improve overall computational efficiency through request batching.

Furthermore, a mature software ecosystem is another significant advantage of GPUs. The long-accumulated development tools, deep learning frameworks, and optimization libraries form a robust ecosystem, making GPUs the default computing platform for most current AI frameworks and applications.

## TPU（Tensor Processing Unit）

The TPU (Tensor Processing Unit) represents a highly specialized AI computing architecture. Designed by Google specifically for AI workloads, this processor is primarily offered to external users via Google Cloud. Unlike general-purpose processors, TPUs prioritize scalability, thus sacrificing some general-purpose computing power and flexibility.

TPUs employ a computing architecture distinct from traditional CPUs or GPUs — a systolic array. In this design, numerous computing units are organized into a grid structure, with data continuously flowing between these units. This can be understood as a pipelined computing model: data sequentially passes through different processing nodes, each performing an operation before passing the result to adjacent units.

This data-flow computing approach significantly reduces the need for frequent access to external memory. Because data can be reused within the array, the system avoids the energy-intensive data movement required in traditional computing architectures, thus significantly improving overall efficiency. This architecture is particularly well-suited for matrix multiplication, a core computational form in deep learning models. Therefore, TPUs can achieve very high computational efficiency in large-scale neural network training and inference tasks. The TPU’s design philosophy is very clear: focus on AI tensor computation. Unlike GPUs, TPUs do not have graphics rendering capabilities, nor do they handle general-purpose computing tasks. Their hardware is optimized from the ground up for Google’s AI workloads in search, recommendation, and language modeling scenarios.

The TPU’s advantages also stem from its co-designed hardware and software architecture. Within the TPU system, the hardware architecture, compiler, and deep learning frameworks are jointly developed. For example, JAX and TensorFlow have both been deeply optimized for TPUs. This tight integration enables the system to achieve optimization effects that are difficult for many general-purpose accelerators to achieve.

Early TPU design focused primarily on improving AI training efficiency, while recent generations have seen a systematic strengthening of support for inference workloads at the architecture level. This evolution reflects the changing demands of AI computing — as model sizes continue to increase and real-world application scenarios grow, performance and energy efficiency during the inference phase have become crucial considerations for infrastructure optimization. For further [analysis on the evolution of the TPU architecture, the performance of TPU v7 (Ironwood), and its comparison with NVIDIA GPUs](https://www.naddod.com/ai-insights/google-tpu-the-ai-chip-for-the-ai-inference-era), readers can refer to our previous articles.

**TPU Advantages and Limitations**

In specific AI workloads, TPUs offer significant advantages, but their application scope is also somewhat limited.

Advantages:

*   Highly cost-efficient for large-scale model training on Google Cloud, typically lower than equivalent GPU computing resources.
*   Excellent scalability for data-parallel training of Transformer models.
*   Ideal for large-scale language model training and Google’s internal AI services.
*   Pay-as-you-go cloud model, eliminating the need for hardware procurement investment.
*   Users can use the latest AI computing hardware without complex deployments.

Limitations:

*   Only usable through Google Cloud, not for on-premises deployment, posing a certain risk of vendor lock-in.
*   Limited support for model architectures or custom operators not optimized for TPUs.
*   Smaller ecosystem than NVIDIA, with relatively fewer third-party tools.
*   Some model architectures run inefficiently or even fail to run on TPUs.
*   Debugging and performance analysis tools are not as mature as the CUDA ecosystem.

Overall, the TPU is a dedicated computing platform deeply optimized for specific AI workloads. It offers very high efficiency in large-scale model training and cloud-based AI services, but its use is limited by the platform ecosystem and architectural flexibility.

## NPU (Neural Processing Unit)

Neural Processing Units (NPUs) are designed to efficiently perform AI inference tasks within tight power budgets. Unlike data center accelerators, which primarily aim for computational performance, NPUs are designed with energy efficiency and real-time response in mind, enabling AI to run continuously on billions of devices, including smartphones, wearables, and IoT devices.

**NPU Design Characteristics**

NPU architecture is optimized for low power consumption and high efficiency. NPUs in mobile devices typically need to operate within a power consumption range of approximately 1–15 watts and share the system power budget with components such as CPUs and GPUs, thus requiring significant targeted simplifications in their design. Most NPUs are optimized solely for inference tasks and do not include training-related functions, thereby reducing hardware complexity and power consumption.

To further improve efficiency, NPUs commonly employ low-precision computing, such as INT8, INT4, or even lower bit widths, while incorporating techniques such as clock gating and dynamic voltage regulation to shut down unused modules and reduce power consumption under low load. Furthermore, NPUs are typically integrated into System-on-a-Chip (SoC), sharing on-chip interconnects and memory with CPUs, GPUs, and other components. This reduces latency and power consumption associated with off-chip data transfer and allows direct access to peripherals such as cameras and microphones.

**Advantages of NPUs**

*   High Energy Efficiency: Achieves 50–200 TOPS per watt, 10–50 times higher than GPUs, suitable for always-on edge AI functions.
*   Low Latency: Edge processing response time is only single-digit milliseconds, eliminating reliance on cloud computing.
*   Privacy Protection: Data is processed locally, reducing the risk of network transmission and leakage.
*   Diverse Applications: Supports facial recognition, computational photography, voice assistants, real-time translation, and sensor fusion and object detection in autonomous driving.

Limitations of NPUs

*   Limited Raw Performance: Compared to data center GPUs, NPUs have lower computational power, making them unsuitable for large-scale model training.
*   Limited Applications: Primarily geared towards inference tasks, unable to perform full training workloads.
*   Dedicated Architecture: Highly optimized hardware may limit flexibility and cross-platform compatibility.

By embedding AI capabilities into edge devices, the NPU enables real-time AI services that are perceptible to users while maintaining low power consumption and high responsiveness, becoming an indispensable core component in mobile and edge computing scenarios.

## CPU, GPU, TPU, and NPU Architecture Comparison

After understanding the design philosophy of CPUs, GPUs, TPUs, and NPUs, comparing their architectural differences explains why they perform differently across computing tasks.

## Memory Systems

Memory capacity and bandwidth are critical constraints on computing performance.

These differences explain why not all models can run on any chip simply because “memory is sufficient.” For example, a 70-billion-parameter model requires over 140GB of storage just for its weights. When temporary tensors and runtime memory are included, total memory requirements typically reach 160GB to 180GB. This means most GPUs cannot run such models on a single card, often requiring high-end data-center GPUs, multi-GPU configurations, or large TPU Pod systems.

Press enter or click to view image in full size

## Interconnect Technologies

When computing demands exceed the capability of a single chip, high-speed interconnect technologies become critical. Different platforms adopt different interconnect solutions with significant differences in bandwidth, latency, and topology.

*   PCIe (Peripheral Component Interconnect Express): A universal standard. PCIe 5.0 x16 provides 64 GB/s bandwidth, compatible with all components but with higher latency than specialized interconnects.
*   NVIDIA NVLink: Provides direct high-speed GPU-to-GPU connections with bandwidth typically between 600–900 GB/s, roughly 10–15× faster than PCIe. NVSwitch enables full connectivity among 8 or more GPUs for efficient multi-GPU training.
*   Google ICI (Inter-Chip Interconnect): A custom interconnect used in TPU Pods, optimized for Google’s AI workloads and enabling large-scale linear scaling.
*   AMD Infinity Fabric: Used to interconnect MI300-series accelerators. Although its bandwidth is lower than NVLink, the gap is gradually narrowing.

## Precision Support

Different processors emphasize different numeric precision formats, which directly affect computing efficiency, energy consumption, and model performance.

Press enter or click to view image in full size

Overall, CPUs emphasize precision, GPUs provide the most comprehensive precision support, while TPUs and NPUs focus heavily on low-precision AI computation for efficiency.

Press enter or click to view image in full size

## Scalability Approaches

When the computing power of a single processor is insufficient, different chips scale in different ways.

*   **CPU**: Primarily scales by increasing core counts or adding processor sockets. A single socket may support up to 128 cores, and servers often contain 2–8 sockets. Larger deployments rely on clusters of networked servers, but memory coherence limitations restrict scalability.
*   **GPU**: Within a node, GPUs can scale to about 8 units via NVLink, then connect across nodes using InfiniBand or high-speed Ethernet. Large AI training environments often include hundreds to tens of thousands of GPUs, though achieving high utilization requires sophisticated parallelization strategies.
*   **TPU**: Uses Pod architecture, connecting 256 to 9,216 TPU chips via custom interconnect networks. For models optimized for TPU architecture, data-parallel training can approach near-linear scaling.
*   **NPU**: Most NPUs are designed for mobile or edge devices and typically do not scale through clustering. Instead, scalability is achieved by deploying large numbers of independent NPUs across billions of devices.

## Conclusion

There is no single best choice for AI hardware; each chip involves trade-offs between performance, energy efficiency, and flexibility. CPUs offer versatility, GPUs strike a balance between research and production, TPUs excel in large-scale training but are limited by their ecosystem, and NPUs prioritize energy efficiency. Hardware decisions should be based on workload characteristics, latency requirements, power consumption, and scale, rather than simply benchmark testing. Modern systems tend towards heterogeneous architectures, optimizing different tasks through the collaborative use of multiple processor types. Meanwhile, the software ecosystem, development tools, and community support also significantly impact real-world performance. Understanding the differences and applicable scenarios of CPUs, GPUs, NPUs, and TPUs is crucial for making informed AI hardware choices.

[

Cpu

](https://medium.com/tag/cpu?source=post_page-----dda6800ee7e3---------------------------------------)

[

Gpu

](https://medium.com/tag/gpu?source=post_page-----dda6800ee7e3---------------------------------------)

[

Tpu

](https://medium.com/tag/tpu?source=post_page-----dda6800ee7e3---------------------------------------)

[

Npu

](https://medium.com/tag/npu?source=post_page-----dda6800ee7e3---------------------------------------)

[

Nvidia

](https://medium.com/tag/nvidia?source=post_page-----dda6800ee7e3---------------------------------------)

[

](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fdda6800ee7e3&operation=register&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&user=NADDOD&userId=fb39a90511bb&source=---footer_actions--dda6800ee7e3---------------------clap_footer------------------)

\--

[

](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fdda6800ee7e3&operation=register&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&user=NADDOD&userId=fb39a90511bb&source=---footer_actions--dda6800ee7e3---------------------clap_footer------------------)

\--

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fdda6800ee7e3&operation=register&redirect=https%3A%2F%2Fnaddod.medium.com%2Fexploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3&source=---footer_actions--dda6800ee7e3---------------------bookmark_footer------------------)

[

![NADDOD](https://miro.medium.com/v2/resize:fill:96:96/1*VJvvs390lXUtFkEMtx-J1w.png)



](/?source=post_page---post_author_info--dda6800ee7e3---------------------------------------)

[

![NADDOD](https://miro.medium.com/v2/resize:fill:128:128/1*VJvvs390lXUtFkEMtx-J1w.png)



](/?source=post_page---post_author_info--dda6800ee7e3---------------------------------------)

[

## Written by NADDOD

](/?source=post_page---post_author_info--dda6800ee7e3---------------------------------------)

[114 followers](/followers?source=post_page---post_author_info--dda6800ee7e3---------------------------------------)

·[1 following](/following?source=post_page---post_author_info--dda6800ee7e3---------------------------------------)

NADDOD: The Interconnect Engine for the AI Era

## No responses yet

[](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page---post_responses--dda6800ee7e3---------------------------------------)

[

Help

](https://help.medium.com/hc/en-us?source=post_page-----dda6800ee7e3---------------------------------------)

[

Status

](https://status.medium.com/?source=post_page-----dda6800ee7e3---------------------------------------)

[

About

](https://medium.com/about?autoplay=1&source=post_page-----dda6800ee7e3---------------------------------------)

[

Careers

](https://medium.com/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----dda6800ee7e3---------------------------------------)

[

Press

](mailto:pressinquiries@medium.com)

[

Blog

](https://blog.medium.com/?source=post_page-----dda6800ee7e3---------------------------------------)

[

Privacy

](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----dda6800ee7e3---------------------------------------)

[

Rules

](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----dda6800ee7e3---------------------------------------)

[

Terms

](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----dda6800ee7e3---------------------------------------)

[

Text to speech

](https://speechify.com/medi