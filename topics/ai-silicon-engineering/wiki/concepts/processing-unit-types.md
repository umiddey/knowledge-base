# Processing Unit Types: CPU, GPU, TPU, NPU, FPGA, ASIC

Different computing workloads need different hardware architectures. The key trade-off is **flexibility vs efficiency** — a CPU can run anything but wastes energy on AI workloads, while an ASIC runs one thing perfectly but can't do anything else.

## CPU (Central Processing Unit)
- **Design philosophy**: Do anything, fast, one thing at a time
- **Architecture**: 4-128 cores, 3-5 GHz clock speed, deep pipelines, large caches, sophisticated branch prediction
- **Strengths**: General-purpose computing, sequential logic, low-latency single requests, OS management
- **For AI**: Only suitable for small-scale inference, prototyping, traditional ML (XGBoost, random forests)
- **Key limitation**: Only 1-10 operations per cycle, 50-100 GB/s memory bandwidth — catastrophically slow for matrix math

## GPU (Graphics Processing Unit)
- **Design philosophy**: Do the same thing to thousands of data points simultaneously
- **Architecture**: 5,000-18,000 cores at 1-2 GHz, organized into Streaming Multiprocessors (SMs), HBM memory at 1-3 TB/s
- **Strengths**: Training and inference for all neural network types, massive parallelism, mature software stack (CUDA)
- **For AI**: The workhorse of modern AI. NVIDIA dominates with H100/B200 datacenter GPUs and Tensor Cores
- **Key metric**: 80-300+ TFLOPS (FP16), Tensor Cores do 4x4 or 8x8 matrix multiply in single operation

## TPU (Tensor Processing Unit)
- **Design philosophy**: Strip everything away, just do matrix multiplication as efficiently as possible
- **Architecture**: 256x256 systolic array (65,536 MAC units), weight-stationary dataflow, runs at only 700 MHz but does 65K ops/cycle
- **Strengths**: Inference throughput, energy efficiency (83x better perf/watt than CPU), deterministic execution
- **For AI**: Google's internal chips for TensorFlow/JAX workloads. Excel at large matrix multiplies in transformers, CNNs
- **Key limitation**: Inflexible — only good for the specific math patterns it was designed for

## NPU (Neural Processing Unit)
- **Design philosophy**: Bring AI to edge devices (phones, laptops, IoT) with minimal power
- **Architecture**: Specialized MAC arrays optimized for int8/fp16 inference, integrated into SoCs
- **Strengths**: Ultra-low power (1-5W), on-device AI (face ID, voice assistants, real-time translation)
- **For AI**: Inference only, limited model sizes. Apple Neural Engine, Qualcomm Hexagon are examples

## FPGA (Field Programmable Gate Array)
- **Design philosophy**: Hardware you can reconfigure after manufacturing
- **Architecture**: Lookup tables (LUTs), flip-flops, DSP slices, block RAM — all reprogrammable
- **Strengths**: Custom hardware without fabrication cost, rapid prototyping, low-latency deterministic execution
- **For AI**: Prototyping accelerators, low-volume production, financial HFT, defense applications
- **Key limitation**: Much lower performance and efficiency than hard silicon (ASIC), harder to program than GPU

## ASIC (Application-Specific Integrated Circuit)
- **Design philosophy**: Custom silicon for exactly one purpose — nothing wasted, nothing flexible
- **Architecture**: Custom-designed from scratch for a specific workload
- **Strengths**: Maximum performance, minimum power, minimum cost per unit at scale
- **For AI**: Google TPU is technically an ASIC. Bitcoin miners are ASICs. Most AI startup chips are ASICs
- **Key limitation**: $20-50M design cost, 12-18 month development cycle, zero flexibility once manufactured

By 2026, the category boundaries matter less than the deployment stack around them. A chip with excellent raw FLOPS can still lose if it lacks compiler support, package bandwidth, or a sane software path. The real decision is now system-level, not just arithmetic.

## Example
Suppose you need to run a 7B-parameter transformer for inference:

1. On a CPU, you can serve it, but you spend most of your time waiting on memory and vector instructions. It is fine for low-throughput or control-heavy parts of the system.
2. On a GPU, you can batch requests and keep Tensor Cores busy. That is the common choice when you need flexibility across many model types.
3. On a TPU, the same workload is attractive if it is mostly matmul and the graph can be compiled cleanly by XLA. Google Cloud now documents TPU v5e and v6e support through Vertex AI, and TPU v6e defaults to PJRT rather than the older runtime path.
4. On an NPU, the same model might fit only after quantization and pruning, but then it becomes viable on-device with much lower power.
5. On an ASIC, the design only makes sense if you have one very stable workload class and the volume justifies the non-recurring engineering cost.

The decision is not "which chip is fastest" in the abstract. It is "which architecture matches the model shape, deployment constraints, and software stack."

## Key Metrics Comparison

| Unit | Ops/Cycle | Memory BW | Power | Best For |
|------|-----------|-----------|-------|----------|
| CPU | 1-10 | 50-100 GB/s | 150-250W | General computing, orchestration |
| GPU | 50,000+ | 1-3 TB/s | 250-700W | Training + inference, research |
| TPU | 65,000-128,000 | 600+ GB/s | 40-300W | Large-scale inference, training |
| NPU | Varies | On-chip | 1-5W | Edge inference, mobile |
| FPGA | Moderate | Moderate | 10-50W | Prototyping, low-latency custom |
| ASIC | Maximum | Custom | Optimized | Mass production, single workload |

## Related Concepts
- [[nvidia-gpu-architecture]] — deep dive into GPU architecture (Hopper, Blackwell)
- [[google-tpu-architecture]] — deep dive into TPU systolic arrays
- [[vlsi-design-flow]] — how ASICs and other chips are designed
- [[cuda-programming]] — programming GPUs
- [[fpga-asic-development]] — FPGA and ASIC development path
- [[risc-v-processor-design]] — open ISA example for custom processor design

## Sources
- [[raw/articles/www.thepurplestruct.com-blog-cpu-vs-gpu-vs-tpu-vs-npu-ai-hardware-architecture-guide-2025]] — comprehensive architecture comparison
- [[raw/articles/picovoice.ai-blog-cpu-gpu-tpu-npu]] — concise differences overview
- [[raw/articles/naddod.medium.com-exploring-cpu-gpu-tpu-and-npu-architecture-and-key-differences-introduction-dda6800ee7e3]] — architecture deep dive
- [[raw/articles/cpu-gpu-tpu-npu-architecture-guide]] — AI hardware architecture guide
- [[raw/articles/guptadeepak.com-understanding-cpus-gpus-npus-and-tpus-a-simple-guide-to-processing-units]] — simple processing-unit comparison
- [[raw/articles/www.backblaze.com-blog-ai-101-gpu-vs-tpu-vs-npu]] — accessible AI processor explainer
- [[raw/articles/www.geeksforgeeks.org-techtips-apu-cpu-gpu-npu-differences]] — processor differences overview
- [[raw/articles/www.lovechip.com-blog-gpu-vs-tpu-vs-npu-what-s-the-difference]] — GPU/TPU/NPU comparison
