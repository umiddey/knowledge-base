# AI Chip Landscape

The AI chip market is no longer a simple GPU-vs-CPU story. It now includes rack-scale inference systems, wafer-scale engines, reconfigurable dataflow chips, open-source RISC-V-centered startups, and cloud-specific ASICs. The market split is not just about raw speed; it is about latency, software compatibility, memory bandwidth, and whether the vendor can ship a complete stack.

The most important trend is that training and inference are diverging. Training still rewards massive clusters and mature software, which is why GPUs remain dominant. Inference rewards low latency, tight cost control, and deployment simplicity, which is why Groq, Cerebras, SambaNova, Tenstorrent, TPU, Trainium, and Inferentia all exist in the first place.

## Key Points
- **Groq** optimizes for deterministic low-latency inference with a cycle-scheduled LPU.
- **Cerebras** pushes the entire wafer into one compute fabric, trading packaging and scheduling complexity for scale.
- **SambaNova** uses a CGRA-style dataflow approach that sits between GPU flexibility and fixed-function acceleration.
- **Tenstorrent** combines RISC-V control, mesh topology, and an open software story to target mixed workloads.
- **Cloud ASICs** like TPU, Trainium, and Inferentia win when software integration is strong enough to offset reduced flexibility.

## Example
A startup wants to serve a 70B parameter model:

1. If the product requirement is ultra-low latency token generation, Groq can look attractive.
2. If the goal is massive inference throughput and the application can tolerate unusual scheduling, Cerebras becomes interesting.
3. If the team wants a reconfigurable dataflow chip and a more traditional enterprise story, SambaNova is the fit.
4. If the team wants an open toolchain and RISC-V control path, Tenstorrent becomes the most distinct option.
5. If the team already lives inside Google Cloud or AWS, TPU or Trainium can beat a startup chip simply because the software and deployment path are cleaner.

That is the real market rule: the best chip is the one the workload can actually adopt.

## Related Concepts
- [[processing-unit-types]] — the basic architecture taxonomy behind the landscape
- [[nvidia-gpu-architecture]] — the incumbent benchmark all alternatives compare against
- [[google-tpu-architecture]] — the strongest cloud-native ASIC benchmark
- [[ai-accelerator-design]] — the architectural patterns these chips reuse
- [[advanced-packaging]] — many of these chips are packaging-limited as much as compute-limited

## Sources
- [[raw/articles/ai-chip-alternatives-nvidia-startups]] — overview of alternative AI chips for startups
- [[raw/articles/cerebras-sambanova-groq-comparison]] — rack-scale startup comparison
- [[raw/articles/tenstorrent-ai-hardware-startups]] — Tenstorrent architecture and market thesis
- [[raw/articles/ai-inference-chip-landscape-2026]] — inference-chip memory wall and patent landscape
- [[raw/articles/nvidia-blackwell-mlperf-inference]] — current benchmark context for incumbent GPUs
