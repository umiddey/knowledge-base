---
source_url: "https://medium.com/@aditya_mehra/how-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf"
date_scraped: "2026-04-08"
type: scraped-article
---

How Google TPUs Revolutionize Matrix Multiplication for Deep Learning | by Aditya - Ardent Optimist , Yogi, Technologist | Medium 

[Sitemap](/sitemap/sitemap.xml)

[Open in app](https://play.google.com/store/apps/details?id=com.medium.reader&referrer=utm_source%3DmobileNavBar&source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

[Medium Logo](/?source=post_page---top_nav_layout_nav-----------------------------------------)

Get app

[

Write

](/m/signin?operation=register&redirect=https%3A%2F%2Fmedium.com%2Fnew-story&source=---top_nav_layout_nav-----------------------new_post_topnav------------------)

[

Search

](/search?source=post_page---top_nav_layout_nav-----------------------------------------)

Sign up

[Sign in](/m/signin?operation=login&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&source=post_page---top_nav_layout_nav-----------------------global_nav------------------)

![](https://miro.medium.com/v2/resize:fill:64:64/1*dmbNkD5D-u45r44go_cf0g.png)

[Mastodon](https://me.dm/@aditya_mehra)

# How Google TPUs Revolutionize Matrix Multiplication for Deep Learning

[

![Aditya - Ardent Optimist , Yogi, Technologist](https://miro.medium.com/v2/resize:fill:64:64/1*EupsWlrqGZlD1UvDFzeBpg.jpeg)





](/@aditya_mehra?source=post_page---byline--1439e56c46cf---------------------------------------)

[Aditya - Ardent Optimist , Yogi, Technologist](/@aditya_mehra?source=post_page---byline--1439e56c46cf---------------------------------------)

4 min read

·

Dec 5, 2025

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F1439e56c46cf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&user=Aditya+-+Ardent+Optimist+%2C+Yogi%2C+Technologist&userId=dabf4ca4c97d&source=---header_actions--1439e56c46cf---------------------clap_footer------------------)

\--

[](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F1439e56c46cf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&source=---header_actions--1439e56c46cf---------------------bookmark_footer------------------)

Listen

Share

_A deep dive into the systolic array architecture that delivers 30x better performance per watt_

Press enter or click to view image in full size

Shown here is a seven rack Ironwood TPU unit with the cooling unit on the far right . Source Google

In 2013, Google’s engineers made a startling calculation: if every Android user used voice search for just three minutes daily, they’d need to **double their entire datacenter capacity**. This sparked the creation of the Tensor Processing Unit (TPU) — and a fundamentally different approach to the math powering AI.

## The Problem with Traditional Matrix Multiplication

Neural networks are essentially sequences of matrix multiplications. Every layer multiplies inputs by weights. Standard matrix multiplication requires O(n³) operations, but the real bottleneck isn’t the math — it’s **memory access**.

In CPUs and GPUs, every operation requires:

*   Reading operands from registers
*   Performing the calculation
*   Writing results back to memory

This memory shuffling consumes **10–100× more energy** than the arithmetic itself. Google needed a different architecture.

## Enter the Systolic Array

The TPU’s secret weapon is a **systolic array** — a concept from 1978 that Google adapted for neural networks. Think of it like blood pumping through the heart: data flows rhythmically through a grid of processing elements, each performing a multiply-accumulate operation and passing results to its neighbor.

## How It Works

The TPU v1 featured a **256×256 grid of 65,536 multiply-accumulate units**. Here’s the elegant part:

1.  **Weights load from above** and stay stationary in each unit
2.  **Activations stream from the left**, flowing horizontally
3.  **Partial sums flow downward**, accumulating as they go
4.  **Results emerge from the bottom** — no intermediate memory writes

At 700 MHz, this single matrix unit performed **92 trillion 8-bit operations per second** while consuming just 28–40 watts.

> _“During execution, all intermediate results are passed directly between 64K ALUs without any memory access, significantly reducing power consumption.” — Google TPU Paper, ISCA 2017_

## The BFloat16 Innovation

Starting with TPU v2, Google introduced **bfloat16** — a custom 16-bit format that changed the efficiency game.

**Why not standard FP16?**

Format Exponent Mantissa Dynamic Range FP32 8 bits 23 bits 10⁻³⁸ to 1⁰³⁸ FP16 5 bits 10 bits 10⁻⁸ to 65,504 **BFloat16** **8 bits** **7 bits** **10⁻³⁸ to 1⁰³⁸**

BFloat16 keeps FP32’s range while halving memory requirements. The reduced precision? Neural networks don’t care — they’re inherently tolerant of numerical approximation.

**The hardware payoff:**

*   Multipliers are **8× smaller** than FP32
*   Memory bandwidth **effectively doubles**
*   Multiplications use bfloat16, accumulations stay in FP32 for precision

## The Numbers: TPU vs. GPU vs. CPU

Google’s 2017 benchmarks on production workloads (95% of their datacenter inference) showed:

Metric TPU v1 Advantage Performance **15–30×** faster than contemporary CPUs/GPUs Energy Efficiency **30–80×** better TOPS/Watt Latency More consistent 99th-percentile response times

The deterministic execution model — no caches, no branch prediction, no out-of-order execution — meant TPUs could guarantee latency that GPUs couldn’t match.

## TPU v7 Ironwood: The Current State of the Art

Announced in April 2025, Ironwood represents a 10× leap over the previous generation:

**Per-Chip Specs:**

*   **4,614 TFLOPS** peak performance (FP8/BF16)
*   **192 GB HBM3E** with 7.4 TB/s bandwidth
*   First TPU with native **FP8 support**
*   ~1 kW power (liquid cooled)

**At Scale:**

*   Pods scale to **9,216 chips**
*   **42.5 ExaFLOPS** per pod — 24× more powerful than El Capitan supercomputer
*   3D torus interconnect with 1.2 TB/s bandwidth

Anthropic has committed to using **up to one million TPUs** for training and serving Claude models.

## The Trade-offs

Systolic arrays aren’t magic. They struggle with:

*   **Sparse matrices** — fixed dataflow patterns need dense data
*   **Small matrices** — underutilization when dimensions < MXU size
*   **General computation** — TPUs are ML-only hardware
*   **Ecosystem** — best performance requires TensorFlow/JAX

Google addresses sparsity with **SparseCores** — dedicated engines for embeddings and recommendation systems.

## The Bottom Line

From 92 TOPS in 2015 to 4,614 TFLOPS in 2025**–50× improvement in a decade**.

The key insight? Don’t fight memory bandwidth. Design hardware where data flows through computation without touching memory. The systolic array, a 47-year-old idea, turns out to be the perfect architecture for the defining computation of our era: matrix multiplication at scale.

## References

1.  Jouppi et al. “In-Datacenter Performance Analysis of a Tensor Processing Unit.” ISCA 2017
2.  Google Cloud. “BFloat16: The Secret to High Performance on Cloud TPUs.” 2019
3.  Google Cloud. “Ironwood: The First Google TPU for the Age of Inference.” 2025
4.  Kung & Leiserson. “Systolic Arrays for VLSI.” 1978

_If you’re interested in the mathematics behind deep learning hardware, check out my upcoming talk at Grace Hopper Celebration 2025: “The Math Behind the Magic: Understanding the Role of Mathematics in Deep Learning.”_

[

Tpu

](/tag/tpu?source=post_page-----1439e56c46cf---------------------------------------)

[

Deep Learning

](/tag/deep-learning?source=post_page-----1439e56c46cf---------------------------------------)

[

Machine Learning

](/tag/machine-learning?source=post_page-----1439e56c46cf---------------------------------------)

[

Google

](/tag/google?source=post_page-----1439e56c46cf---------------------------------------)

[

Matrix Multiplication

](/tag/matrix-multiplication?source=post_page-----1439e56c46cf---------------------------------------)

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F1439e56c46cf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&user=Aditya+-+Ardent+Optimist+%2C+Yogi%2C+Technologist&userId=dabf4ca4c97d&source=---footer_actions--1439e56c46cf---------------------clap_footer------------------)

\--

[

](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F1439e56c46cf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&user=Aditya+-+Ardent+Optimist+%2C+Yogi%2C+Technologist&userId=dabf4ca4c97d&source=---footer_actions--1439e56c46cf---------------------clap_footer------------------)

\--

[](/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F1439e56c46cf&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40aditya_mehra%2Fhow-google-tpus-revolutionize-matrix-multiplication-for-deep-learning-1439e56c46cf&source=---footer_actions--1439e56c46cf---------------------bookmark_footer------------------)

[

![Aditya - Ardent Optimist , Yogi, Technologist](https://miro.medium.com/v2/resize:fill:96:96/1*EupsWlrqGZlD1UvDFzeBpg.jpeg)



](/@aditya_mehra?source=post_page---post_author_info--1439e56c46cf---------------------------------------)

[

![Aditya - Ardent Optimist , Yogi, Technologist](https://miro.medium.com/v2/resize:fill:128:128/1*EupsWlrqGZlD1UvDFzeBpg.jpeg)



](/@aditya_mehra?source=post_page---post_author_info--1439e56c46cf---------------------------------------)

[

## Written by Aditya - Ardent Optimist , Yogi, Technologist

](/@aditya_mehra?source=post_page---post_author_info--1439e56c46cf---------------------------------------)

[225 followers](/@aditya_mehra/followers?source=post_page---post_author_info--1439e56c46cf---------------------------------------)

·[562 following](/@aditya_mehra/following?source=post_page---post_author_info--1439e56c46cf---------------------------------------)

health enthusiast, software programmer , yoga preacher, Ardent optimist

## No responses yet

[](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page---post_responses--1439e56c46cf---------------------------------------)

[

Help

](https://help.medium.com/hc/en-us?source=post_page-----1439e56c46cf---------------------------------------)

[

Status

](https://status.medium.com/?source=post_page-----1439e56c46cf---------------------------------------)

[

About

](/about?autoplay=1&source=post_page-----1439e56c46cf---------------------------------------)

[

Careers

](/jobs-at-medium/work-at-medium-959d1a85284e?source=post_page-----1439e56c46cf---------------------------------------)

[

Press

](mailto:pressinquiries@medium.com)

[

Blog

](https://blog.medium.com/?source=post_page-----1439e56c46cf---------------------------------------)

[

Privacy

](https://policy.medium.com/medium-privacy-policy-f03bf92035c9?source=post_page-----1439e56c46cf---------------------------------------)

[

Rules

](https://policy.medium.com/medium-rules-30e5502c4eb4?source=post_page-----1439e56c46cf---------------------------------------)

[

Terms

](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f?source=post_page-----1439e56c46cf--------------------------------------