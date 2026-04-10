---
source_url: "https://telesens.co/2018/07/30/systolic-architectures/"
date_scraped: "2026-04-08"
type: scraped-article
---

    Understanding Matrix Multiplication on a Weight-Stationary Systolic Architecture | Telesens                                    

[![Telesens](https://www.telesens.co/wp-content/uploads/2019/01/cropped-DC-Banner-1.jpg)](https://telesens.co/ "Telesens")

[

## Telesens

](https://telesens.co/ "Telesens")

*   [Home](https://www.telesens.co)
*   [About Me](https://telesens.co/about-me-2/)
*   [Stories](https://telesens.co/category/travels/)
*   [Apps](https://telesens.co/apps/)

# Understanding Matrix Multiplication on a Weight-Stationary Systolic Architecture

[July 30, 2018](https://telesens.co/2018/07/) [ankur6ue](https://telesens.co/author/ankur6ue/) [Computer Architecture](https://telesens.co/category/computer-architecture/), [Machine Learning](https://telesens.co/category/machine-learning/) [11](https://telesens.co/2018/07/30/systolic-architectures/#mh-comments)

![](https://telesens.co/wp-content/uploads/2018/09/img_5ba82bde783ad.png "img_5ba82bde783ad")

If you follow the hardware for deep learning space, you may have heard of the term “systolic array”. A 2D systolic array forms the heart of the Matrix Multiplier Unit (MXU) on the Google TPU and the new [deep learning FPGAs](http://www.ispd.cc/slides/2018/s2_3.pdf) from Xilinx. If you are a computer architecture expert, then you know what systolic arrays are and perhaps even implemented a convolution or matrix multiplication on a systolic array in grad school. If you are like me – generally well versed in tech, but not a computer architecture expert, then you are probably a bit lost. In this post, I’ll explain what systolic arrays are and how a 1D correlation operation can be implemented using a systolic array. I’ll then show an animation of how the multiplication of two ![3\times3](https://telesens.co/wp-content/ql-cache/quicklatex.com-2a370987e1361a1ac63f2308c813e8a9_l3.png "Rendered by QuickLaTeX.com") matrices is implemented on a systolic array, which will help you understand the trade-offs made in systolic architectures. The operation of the MXU on a TPU is identical to the data flow shown in the animation. To provide a concrete example of the ideas discussed here, I’ll show relevant excerpts from the [Google TPU Whitepaper](https://arxiv.org/ftp/arxiv/papers/1704/1704.04760.pdf).

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5babcf9496a66.png)

The term “systolic array” can sound like a new innovation in computer architecture. It isn’t. Like most ideas in deep learning, the concept of systolic array is decades old. See this [review paper](http://www.eecs.harvard.edu/~htk/publication/1982-kung-why-systolic-architecture.pdf) by H.T. Kung for a great description. The main idea is that general purpose processors such as CPUs are not optimal for special purpose, high performance applications. By identifying the key mathematical operation involved in the application, and decomposing the mathematical operation into a sequence of simple calculations such as multiply and accumulate operations, specialized hardware can be designed that performs a large number of these simple calculations in parallel. In this post, we’ll examine how this idea is applied to accelerate deep learning applications. We’ll first identify what this key mathematical operation is for deep learning systems and then see how it can be efficiently implemented using systolic arrays.

Deep Learning involves a number of calculations – convolutions, matrix-matrix (M-M), matrix-vector (M-V), application of non-linearities, calculation of loss functions, weight updates, max-pooling and so on. As shown by Bill Dally in his [2015 NIPS tutorial](https://media.nips.cc/Conferences/2015/tutorialslides/Dally-NIPS-Tutorial-2015.pdf), M-M, M-V and convolutions are by far the most expensive operations and thus the prime target for optimization. Fortunately, these operations consist of a number of repeated multiply-accumulate operations. As shown [here](https://www.telesens.co/2018/04/09/initializing-weights-for-the-convolutional-and-fully-connected-layers/), convolutions can be converted into matrix-multiplication so it suffices to focus on matrix multiplication. We’ll come back to this point a bit later.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba830554fc6c.png)

Applications can be compute bound or memory bound. Memory bound applications can’t benefit from HW acceleration as they are bound by how quickly data can be accessed, not by how fast data can be processed. Thus, an application must be compute bound to benefit from special purpose HW such as systolic architectures. A related issue is Arithmetic Intensity (AI). As mentioned in this post about [Roofline charts](https://www.telesens.co/2018/07/26/understanding-roofline-charts/), Arithmetic Intensity is an algorithm specific metric that measures the number of operations per unit data. It is equivalent to “data reuse” i.e., the number of operations that can be performed before new data needs to be fetched. Algorithms with high AI are preferable as they can achieve higher Ops (Operations per second) with a lower memory bandwidth (BW) and are therefore more likely to be compute bound. Fortunately, the AI of matrix multiplication (if implemented properly) is high – (2M-1)/3 for the product of two ![M\times M](https://telesens.co/wp-content/ql-cache/quicklatex.com-89e66344be92cccabbeadb90cc98c051_l3.png "Rendered by QuickLaTeX.com") matrices and proportional to the shorter matrix dimension for product of non-square matrices. This assumes that all matrix data is available in high speed memory which can be accessed at zero latency. However, if the load/stores involved in storing and retrieving the intermediate results of the sub-computations in a matrix multiplication are not handled properly, then those can turn a compute bound calculation into a memory bound one. Memory access also consumes energy and repeated reads/writes from local storage can consume a lot of power, as noted in the Google TPU paper.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba6a77a78614.png)

Table of Contents

Toggle

*   [Systolic Architectures](#Systolic_Architectures)
*   [Matrix Multiplication on a Weight Stationary 2D Systolic Array (MXU on a Google TPU)](#Matrix_Multiplication_on_a_Weight_Stationary_2D_Systolic_Array_MXU_on_a_Google_TPU)
*   [Advantages and Disadvantages of a TPU](#Advantages_and_Disadvantages_of_a_TPU)
    *   [Advantages](#Advantages)
    *   [Disadvantages](#Disadvantages)
*   [Pipelining of Weight Reads](#Pipelining_of_Weight_Reads)
*   [Conclusion](#Conclusion)

### Systolic Architectures

A systolic system consists of a set of interconnected cells also called “processing elements” (PEs), each capable of performing some simple operation. Information can flow directly between cells in a pipelined fashion. This addresses the problem of storing/loading intermediate results that we mentioned earlier. Communications with the outside world occurs only at the boundary cells.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba82bde783ad.png)

Systolic systems are similar to pipelined systems, but differ in a few ways. Systolic arrays can be 2D and data flow can be at multiple speeds in different directions. Both input and results can flow in systolic arrays, whereas only results flow in pipelined systems. The rhythmic data flow in systolic arrays keeps the control logic simple but also means that individual PEs cannot stall – if there is insufficient bandwidth, the entire array needs to stall.

To make these ideas more concrete, let’s consider how correlation, a close counterpart of convolution can be implemented using a systolic array of three “processing elements” (PEs). The correlation operation can be expressed as:

![y_i = w_1x_i + w_2x_{i+1} + w_3x_{i+2}](https://telesens.co/wp-content/ql-cache/quicklatex.com-9c9927b2447b067d3b228a51843aa9c3_l3.png "Rendered by QuickLaTeX.com")

![y_1 = w_1x_1 + w_2x_2 + w_3x_3](https://telesens.co/wp-content/ql-cache/quicklatex.com-b3f7b7ef71324cf1a26f11a2bd989e8f_l3.png "Rendered by QuickLaTeX.com")

![y_2 = w_1x_2 + w_2x_3 + w_3x_4 \text{ etc}](https://telesens.co/wp-content/ql-cache/quicklatex.com-2830d2fe4ee55dde5a5107cfec56fa7e_l3.png "Rendered by QuickLaTeX.com")

So, the output can be calculated by the dot product of the weight vector with time-shifted input vector. Let’s calculate the arithmetic intensity of this operation.

**The number of operations:** 3 multiplies and 2 adds

**I/O:**  one input element is read and one output element is written back.

Thus, the arithmetic intensity is 5/2. For a ![k](https://telesens.co/wp-content/ql-cache/quicklatex.com-3422b6bb5c160593658b7c39425d9880_l3.png "Rendered by QuickLaTeX.com") dimensional correlation, the arithmetic intensity is (2k-1)/2. This high arithmetic intensity is because of the high data reuse – each element of the output vector reuses two data points that have already been read. Thus, the correlation operation is a good candidate for a systolic array. This principle is true in general – high arithmetic intensity operations are good candidates for systolic architectures. Low AI operations are memory bound, and thus performing the calculations faster by adding parallelization or increasing the clock rate won’t help. The Google TPU paper makes this point in section 7 – “Evaluation of Alternative TPU Designs”

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba7eb484411a.png)

We can decompose the correlation operation into the individual multiply and add calculations and perform each calculation on a separate PE.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba6bcc7c8faa.png)

Each element of the PE array (other than the leftmost) stores a weight value, multiplies it with its input and adds the result to the partial sum calculated by the previous element. After the second time step, one element of the output vector is computed every clock cycle, and one input element is read. We are obtaining maximum possible throughput at the minimum required bandwidth and taking advantage of all data reuse available. This design is an example of a “weight stationary” design, as the weights stay stationary and the inputs are streamed in.

In this design, each ![x_i](https://telesens.co/wp-content/ql-cache/quicklatex.com-c8700e0258243116de0d4f288e2e3b44_l3.png "Rendered by QuickLaTeX.com") is being broadcast to all PEs. Another alternative is to cycle the ![x_i](https://telesens.co/wp-content/ql-cache/quicklatex.com-c8700e0258243116de0d4f288e2e3b44_l3.png "Rendered by QuickLaTeX.com") sequentially through the PEs and and sum the partial sums using an adder.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba7b57ed9c7d.png)

Each PE simply implements the multiplication operation. The add operation has been moved to the global accumulator.

A downside of both these designs is that either each element of the input must be broadcast to all PEs (in the first design) or the partial outputs must be collected and sent to the accumulator. Doing so requires the use of a bus, which must scale as the size of the correlation window increases.

An ingenious alternative is an “output stationary” architecture, where the results stay and the inputs and weights move in opposite directions. Each PE stores and accumulates the partial results. The ![x_i's](https://telesens.co/wp-content/ql-cache/quicklatex.com-771dbf443d45cb7d37d61b037acd5ec2_l3.png "Rendered by QuickLaTeX.com") and ![w_i's](https://telesens.co/wp-content/ql-cache/quicklatex.com-0f696d0d31fed387520b387ccd980e5e_l3.png "Rendered by QuickLaTeX.com") move systolically in opposite directions, such that when an ![x](https://telesens.co/wp-content/ql-cache/quicklatex.com-ede05c264bba0eda080918aaa09c4658_l3.png "Rendered by QuickLaTeX.com") meets a ![w](https://telesens.co/wp-content/ql-cache/quicklatex.com-dfee5c980777976ae8cf6541893fb572_l3.png "Rendered by QuickLaTeX.com"), they are multiplied and resulting product is added to the partial result at that PE. To ensure that each ![x_i](https://telesens.co/wp-content/ql-cache/quicklatex.com-c8700e0258243116de0d4f288e2e3b44_l3.png "Rendered by QuickLaTeX.com") is able to meeting every ![w_i](https://telesens.co/wp-content/ql-cache/quicklatex.com-b04985ab74ff705ec05c507ed58afebd_l3.png "Rendered by QuickLaTeX.com"), a time step is inserted between consecutive elements in the input and weight streams. The execution of this scheme is shown below.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba8394ee98e7.png)

This design doesn’t require a bus or any other global network for collecting output from the PEs. A systolic output path, indicated by the broken arrows is sufficient.

While this design solves the problem of the global bus, it suffers from the drawback that each PE is performing useful work only one half of the time (as indicated by the red dots). Extra logic is also necessary to reset the accumulator in a PE once it completes calculation of a ![y_i](https://telesens.co/wp-content/ql-cache/quicklatex.com-bb3c186e5c65fcd066bb23dec8f4e48a_l3.png "Rendered by QuickLaTeX.com"). The paper by Kung offers a few other variations that make different design choices such as moving the weights and inputs at different speeds and adding extra storage in each PE. A summary of these choices is shown below.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba7c54016854.png)

The key point to understand is that various trade-offs between HW utilization (how often is a PE doing useful work), throughput and latency can be obtained by adjusting the complexity of a PE and the surrounding HW (buses, timing hardware etc.)

### Matrix Multiplication on a Weight Stationary 2D Systolic Array (MXU on a Google TPU)

The heart of the TPU is the systolic array consisting of a ![N\times N](https://telesens.co/wp-content/ql-cache/quicklatex.com-2da7a9d28bec2ae7c776966f5f65b20f_l3.png "Rendered by QuickLaTeX.com") (N=256) grid of Multiply-Accumulate (MAC) units. The TPU uses a weight-stationary architecture where the weights are pre-loaded into the MAC array and the activations are marched in from the activation storage buffer. The activations move horizontally from left to right and the partial sums move vertically from top to bottom. The results of the matrix product are fed to the activation unit which provides hardware support for common activation functions.

The animation below shows the flow of activations and partial sums for two ![3\times 3](https://telesens.co/wp-content/ql-cache/quicklatex.com-469ae8f080aab807501eefc47ed0069b_l3.png "Rendered by QuickLaTeX.com") matrices. The weight matrix ![W](https://telesens.co/wp-content/ql-cache/quicklatex.com-4caed22919a1780df1b6310b338b904e_l3.png "Rendered by QuickLaTeX.com") is preloaded into the MAC units and the input matrices ![A, B, C](https://telesens.co/wp-content/ql-cache/quicklatex.com-d48dc6b8a96b338454b4f855e395445a_l3.png "Rendered by QuickLaTeX.com") are marched in from the left. The rows of each input matrix are offset in time. The product of the weight and input matrices is represented by ![Y's](https://telesens.co/wp-content/ql-cache/quicklatex.com-4163a00f3f7f6c4bd3558e9cfa5c2680_l3.png "Rendered by QuickLaTeX.com") where ![Y^a = WA, Y^b = WB](https://telesens.co/wp-content/ql-cache/quicklatex.com-d8a373c4157e5954462511c8f10a584b_l3.png "Rendered by QuickLaTeX.com") etc.

   

  
  

Incidentally, making this animation and getting it to work in a WordPress post was quite interesting in itself, specially since I’m not a web expert. To make the individual frames of the animation, I drew the shapes and text in PowerPoint and saved the slides as bitmaps. I then used the [EaselJS](https://www.createjs.com/easeljs) 2D animation library to play the frames as an animation. It is possible to execute custom Javascript code from a WordPress post, thus I could connect the click events generated when the user clicks on the Play/Stop buttons to the corresponding onPlay, onStop handlers in the Javascript code.

Coming back to our discussion, from this animation, it should be clear that it takes 2N-1 cycles to read all elements of the product of two ![N\times N](https://telesens.co/wp-content/ql-cache/quicklatex.com-2da7a9d28bec2ae7c776966f5f65b20f_l3.png "Rendered by QuickLaTeX.com") matrices.

Note that since the weights are read much less frequently than the activations, the bandwidth into and out-of the activation storage buffer is much higher than the bandwidth of the weight buffer.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba17f78e603e.png)

If the size of matrix-matrix multiplication is larger than the systolic array, the operation is performed in several blocks. The result of each block is stored in accumulators and is added to the result of the next block.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba83b37c5747.png)

### Advantages and Disadvantages of a TPU

#### Advantages

The key advantage of the TPU and systolic architectures in general is their simplicity. The TPU is a domain specific processor designed to do one thing well – matrix multiplication. It doesn’t implement general purpose features such as caches, branch prediction, out-of-order execution, multiprocessing, context switching etc., which keeps the design simple and power consumption low. This simple design means that control logic takes a very small portion (2%) of the overall chip space. The matrix multiply unit and different memory types consume the bulk of the space. This helps reduce chip manufacturing costs and overall energy consumption.

A key advantage of the TPU over a GPU is good hardware utilization for latency sensitive inference applications. A GPU needs batching to take advantage of all available hardware resources. Batching however introduces latency, which is not desirable for inference applications that may have a strict latency upper bound.

#### Disadvantages

##### Latency Depends on Matrix Dimensions

We saw earlier that it takes 2N-1 clock cycles to complete a product of two ![N \times N](https://telesens.co/wp-content/ql-cache/quicklatex.com-4baf35605d041d4b70147e126302e8a7_l3.png "Rendered by QuickLaTeX.com") matrices. For a batch of size B, the latency is N(B+1) -1 (see below). This implies that the latency of the matrix product depends upon the matrix dimension. This is not desirable for constant latency applications although it isn’t much of an issue for neural network inference as the size of the matrix dimensions are known in advance and the batch size can simply be adjusted to meet the latency bound.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba805fe9267d.png)

##### Poor MXU Utilization and Wasted Memory BW for Non-Standard Matrix Dimensions

A bigger issue arises when the matrix dimensions are not a multiple of the MXU tile size. When the weight matrix is larger than the MXU, it will need to be tiled and for the last row and column of the tile, all of available MAC units will not be used. A simple example of systolic matrix multiplication with a partially occupied tile is shown below.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba812c434a89.png)

A partially occupied MXU tile also wastes memory bandwidth

The TPU paper says this:

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5ba8086189cc7.png)

This implies that it takes the same time to load a fully occupied tile as a partially occupied one. Thus a partially occupied tile will waste memory bandwidth.

##### Implementing Convolutions as Matrix-Multiplications may not be Optimal

TPUs don’t have direct support for convolutions. Convolutions are implemented by converting them into matrix-multiplications. This may not be optimal (particularly for large convolution kernel sizes) as convolutions have specific data flow patterns that can be leveraged to achieve better efficiency. A great example is the [Eyeriss](http://www.rle.mit.edu/eems/wp-content/uploads/2016/02/eyeriss_isscc_2016_slides.pdf) accelerator that is specially designed for the convolution operation.

##### No Direct Support for Sparsity

It turns out that many of the connections in a deep neural network can be pruned without significantly impacting the inference accuracy. In this approach, less important weights are progressively removed and the network retrained for a few iterations until the desired performance characteristic – for example classification accuracy or total network size is achieved. More than 90% of the weights can be pruned without a significant impact on performance. Weight pruning can dramatically reduce the size of the network, number of operations and energy consumption. Sparsity is not currently supported on the TPU. This is as much of an opportunity as a drawback, because with hardware support for sparsity, significantly better performance should be achievable. Support for sparsity will add complexity to the TPU design though as the sparse weights will no longer be located contiguously in memory. For a great example of a specialized accelerator that performs customized sparse matrix vector multiplication and handles weight sharing with no loss of efficiency, see the “[Efficient Inference Engine](https://arxiv.org/abs/1602.01528)” paper. Also, the DL FPGA from Xilinx appears to support sparse matrix-vector computations.

![](https://www.telesens.co/wp-content/uploads/2018/09/img_5babd44a058c7.png)

### Pipelining of Weight Reads

It takes time to read the weights from the host memory to the AI accelerator on-chip memory and to transfer the weights to the matrix-multiply unit. Therefore, it makes sense to use pipelining to hide the corresponding latencies. The basic idea is to load the weights for the next network layer while processing the computations for the current layer. The TPU implements a 4 tile weight FIFO to transfer the weights from the off-chip DRAM to the on-chip unified buffer. The matrix unit is double-buffered so it can hold the weights for the next layer while processing the current layer. Without double buffering, it will cost 256 cycles to transfer the weights for the next layer from the unified buffer to the MXU. This is similar to [“page flipping”](https://en.wikipedia.org/wiki/Multiple_buffering) in computer graphics. The Xilinx deep learning accelerators also implement pipelined systolic arrays.

### Conclusion

The point of this article was to help you understand the main thrust of the innovations in deep learning hardware architecture which is to design custom hardware to speed up matrix computations, particularly matrix multiplication. Systolic architectures are a well-understood technique to implement high throughput matrix multiplication by using an array of interconnected multiply-accumulate units. Understanding how matrix multiplication actually works in a 2D systolic array helps to develop intuition about the pros and cons of systolic architectures. Since systolic architectures are being used in deep learning inference accelerators from many important market participants, this intuition should be helpful in making design choices about inference HW for your specific application.

[![](https://telesens.co/wp-content/uploads/2018/08/img_5b67bc1c70340-80x60.png)Previous

Europe Trip (7/9/2018 – 7/23/2018)

](https://telesens.co/2018/07/29/europe-trip-july-2018/)

[![](https://telesens.co/wp-content/uploads/2018/11/bird_attngan-80x60.png)Next

Wrapping a Python Application into a Web Service using mod\_wsgi and gunicorn

](https://telesens.co/2018/10/01/wrapping-app-in-webservice/)

#### 11 Comments

1.  ![](https://secure.gravatar.com/avatar/0c1eedc5e91ab62306693208a7d5befa?s=80&d=mm&r=g)
    
    Bob McClellan
    
    [October 4, 2018 at 2:40 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-1624)
    
    Excellent read.
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=1624#respond)
    
    *   ![](https://secure.gravatar.com/avatar/9fcde143b4b23a9a424261f11e59685e?s=80&d=mm&r=g)
        
        ankur6ue
        
        [October 4, 2018 at 12:46 pm](https://telesens.co/2018/07/30/systolic-architectures/#comment-1625)
        
        Thanks bob!
        
        [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=1625#respond)
        
2.  ![](https://secure.gravatar.com/avatar/0fcd3c7a45d5b4de5a8d9bf14e46d4bc?s=80&d=mm&r=g)
    
    Sazzad
    
    [October 27, 2019 at 2:03 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-3132)
    
    Very nicely written. Thank you for sharing!  
    I am wondering if you did any analysis on what other type of hardware compute units are proposed so far or being used other than the “Systolic array” for AI accelerators.
    
    Thank you for your time.
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=3132#respond)
    
    *   ![](https://secure.gravatar.com/avatar/9fcde143b4b23a9a424261f11e59685e?s=80&d=mm&r=g)
        
        ankur6ue
        
        [November 21, 2019 at 4:27 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-3311)
        
        Glad you liked the post. As examples of other compute units – search for Eyeriss, an accelerator for convolutional NNs and EIE (Efficient Inference Engine) for an accelerator for sparse matrix calculations. The references in those papers should provide many other examples.
        
        [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=3311#respond)
        
3.  ![](https://secure.gravatar.com/avatar/8899079052eac872b774ee58187addf4?s=80&d=mm&r=g)
    
    emad
    
    [December 11, 2019 at 6:30 pm](https://telesens.co/2018/07/30/systolic-architectures/#comment-3426)
    
    Thank you very much for sharing the knowledge and this great post.
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=3426#respond)
    
4.  ![](https://secure.gravatar.com/avatar/816ea8c5e4673a5ebb9b947ca643d9f8?s=80&d=mm&r=g)
    
    Richard0618
    
    [June 13, 2022 at 9:39 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-10443)
    
    Thank you very much. I am working on accelerators currently and I find your post is very helpful for me to understand systolic arrays
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=10443#respond)
    
5.  ![](https://secure.gravatar.com/avatar/9487a4c2f48cc5c3699d6218f7505885?s=80&d=mm&r=g)
    
    nando
    
    [October 20, 2023 at 9:28 pm](https://telesens.co/2018/07/30/systolic-architectures/#comment-13606)
    
    Hello, really nice blog! By the way, where do you know that TPUs have no direct support for convolutions? Is there a particular source?
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=13606#respond)
    
6.  ![](https://secure.gravatar.com/avatar/9487a4c2f48cc5c3699d6218f7505885?s=80&d=mm&r=g)
    
    nando
    
    [October 20, 2023 at 9:33 pm](https://telesens.co/2018/07/30/systolic-architectures/#comment-13607)
    
    Hello, really nice analysis! Is there a source where it says that the TPU cannot support direct convolution? Or you just assumed it from the architecture?
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=13607#respond)
    
7.  ![](https://secure.gravatar.com/avatar/60aa1213f180c2b65b7da1d1244cb9c2?s=80&d=mm&r=g)
    
    TK
    
    [May 8, 2024 at 9:32 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-15030)
    
    This article is amazing! Finally, I understood what a systolic array is.  
    Thank you so much.
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=15030#respond)
    
8.  ![](https://secure.gravatar.com/avatar/60aa1213f180c2b65b7da1d1244cb9c2?s=80&d=mm&r=g)
    
    TK
    
    [May 8, 2024 at 9:33 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-15031)
    
    This is an amazing article! I finally understood what a systolic array is.  
    Thank you so much.
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=15031#respond)
    
9.  ![](https://secure.gravatar.com/avatar/241fc9a95d47394d63dd509e3804981b?s=80&d=mm&r=g)
    
    Ravi
    
    [October 11, 2025 at 3:14 am](https://telesens.co/2018/07/30/systolic-architectures/#comment-29304)
    
    Relevant and good write up. Reading this even in 2025
    
    [Reply](https://telesens.co/2018/07/30/systolic-architectures/?replytocom=29304#respond)
    

### Leave a Reply [Cancel reply](/2018/07/30/systolic-architectures/#respond)

Your email address will not be published.

Comment  

Name \*  

Email \*  

Website  

Save my name, email, and website in this browser for the next time I comment.

  

Δ

#### Search

Search for:  

#### About This Site

Welcome to my blog! My name is Ankur and I love to write about ML/AI algorithms and Cloud Computing technologies, as well as travel stories (see “Stories” section). I hope you find my blogs useful and enjoy reading them. Please leave a comment if you do!

#### Categories

*   [Airspace Management](https://telesens.co/category/airspace-management/)
*   [AWS](https://telesens.co/category/aws/)
*   [Cloud Tech](https://telesens.co/category/cloud-tech/)
*   [Commentary](https://telesens.co/category/commentary/)
*   [Computer Architecture](https://telesens.co/category/computer-architecture/)
*   [Computer Vision](https://telesens.co/category/computer-vision/)
*   [devops](https://telesens.co/category/devops/)
*   [Distributed Computing](https://telesens.co/category/distributed-computing/)
*   [ETL](https://telesens.co/category/etl/)
*   [Explainable AI](https://telesens.co/category/explainable-ai/)
*   [kubernetes](https://telesens.co/category/kubernetes/)
*   [Machine Learning](https://telesens.co/category/machine-learning/)
*   [Neural Machine Translation](https://telesens.co/category/neural-machine-translation/)
*   [NLP](https://telesens.co/category/nlp/)
*   [object detection](https://telesens.co/category/object-detection/)
*   [Photography](https://telesens.co/category/photography/)
*   [Programming](https://telesens.co/category/programming/)
*   [Ray](https://telesens.co/category/ray/)
*   [Sensor Fusion](https://telesens.co/category/sensor-fusion/)
*   [Sensors](https://telesens.co/category/sensors/)
*   [seq-to-seq](https://telesens.co/category/seq-to-seq/)
*   [Stories](https://telesens.co/category/travels/)
*   [Uncategorized](https://telesens.co/category/uncategorized/)

#### About This Site

This may be a good place to introduce yourself and your site or include some credits.

#### Search

Search for:  

#### Find Us

**Address**  
123 Main Street  
New York, NY 10001

**Hours**  
Monday—Friday: 9:00AM–5:00PM  
Saturday & Sunday: 11:00AM–3:00PM

#### Find Us

**Address**  
123 Main Street  
New York, NY 10001

**Hours**  
Monday—Friday: 9:00AM–5:00PM  
Saturday & Sunday: 11:00AM–3:00PM

###### [Other Machine Learning Posts](https://telesens.co/category/machine-learning/)

*   [![No Image](https://telesens.co/wp-content/themes/mh-magazine-lite/images/placeholder-small.png)](https://telesens.co/2020/11/08/deploying-ray-on-a-local-kubernetes-cluster/ "Deploying Ray on a local kubernetes cluster")
    
    [Deploying Ray on a local kubernetes cluster](https://telesens.co/2020/11/08/deploying-ray-on-a-local-kubernetes-cluster/ "Deploying Ray on a local kubernetes cluster")
    
    November 8, 2020 [0](https://telesens.co/2020/11/08/deploying-ray-on-a-local-kubernetes-cluster/#mh-comments)
    
*   [![No Image](https://telesens.co/wp-content/themes/mh-magazine-lite/images/placeholder-small.png)](https://telesens.co/2020/09/17/kernel-shap/ "Kernel SHAP")
    
    [Kernel SHAP](https://telesens.co/2020/09/17/kernel-shap/ "Kernel SHAP")
    
    September 17, 2020 [0](https://telesens.co/2020/09/17/kernel-shap/#mh-comments)
    
*   [![](https://telesens.co/wp-content/uploads/2020/06/img_5ee90ac8ac9d9-80x60.png)](https://telesens.co/2020/06/16/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-3/ "Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 3")
    
    [Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 3](https://telesens.co/2020/06/16/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-3/ "Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 3")
    
    June 16, 2020 [0](https://telesens.co/2020/06/16/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-3/#mh-comments)
    
*   [![](https://telesens.co/wp-content/uploads/2020/06/img_5ee0d7672bc94-80x60.png)](https://telesens.co/2020/06/10/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-2/ "Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 2")
    
    [Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 2](https://telesens.co/2020/06/10/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-2/ "Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 2")
    
    June 10, 2020 [2](https://telesens.co/2020/06/10/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-2/#mh-comments)
    
*   [![](https://telesens.co/wp-content/uploads/2020/06/img_5ee0fd881d72a-80x60.png)](https://telesens.co/2020/06/10/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-1/ "Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 1")
    
    [Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 1](https://telesens.co/2020/06/10/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-1/ "Building a Information Retrieval system based on the Covid-19 research challenge dataset: Part 1")
    
    June 10, 2020 [1](https://telesens.co/2020/06/10/building-a-information-retrieval-system-based-on-the-covid-19-research-challenge-dataset-part-1/#mh-comments)
    

###### [Other Sensor Fusion Related Posts](https://telesens.co/category/sensor-fusion/)

*   [![](https://telesens.co/wp-content/uploads/2017/05/img_590f2bbeea6c6-80x60.png)](https://telesens.co/2017/05/07/sensor-fusion-part-4/ "Sensor Fusion: Part 4")
    
    [Sensor Fusion: Part 4](https://telesens.co/2017/05/07/sensor-fusion-part-4/ "Sensor Fusion: Part 4")
    
    May 7, 2017 [0](https://telesens.co/2017/05/07/sensor-fusion-part-4/#mh-comments)
    
*   [![](https://telesens.co/wp-content/uploads/2017/05/img_5910d2d83749b-80x60.png)](https://telesens.co/2017/05/02/sensor-fusion-part-3-implementation-of-gyro-accel-sensor-fusion/ "Sensor Fusion – Part 3: Implementation of Gyro-Accel Sensor Fusion")
    
    [Sensor Fusion – Part 3: Implementation of Gyro-Accel Sensor Fusion](https://telesens.co/2017/05/02/sensor-fusion-part-3-implementation-of-gyro-accel-sensor-fusion/ "Sensor Fusion – Part 3: Implementation of Gyro-Accel Sensor Fusion")
    
    May 2, 2017 [6](https://telesens.co/2017/05/02/sensor-fusion-part-3-implementation-of-gyro-accel-sensor-fusion/#mh-comments)
    
*   [![](https://telesens.co/wp-content/uploads/2017/04/img_58fd5a2e981a0-80x60.png)](https://telesens.co/2017/04/30/sensor-fusion-part-2-combining-gyro-accel-data/ "Sensor Fusion: Part 2 (combining Gyro-Accel data)")
    
    [Sensor Fusion: Part 2 (combining Gyro-Accel data)](https://telesens.co/2017/04/30/sensor-fusion-part-2-combining-gyro-accel-data/ "Sensor Fusion: Part 2 (combining Gyro-Accel data)")
    
    April 30, 2017 [0](https://telesens.co/2017/04/30/sensor-fusion-part-2-combining-gyro-accel-data/#mh-comments)
    
*   [![](https://telesens.co/wp-content/uploads/2017/04/sensor-fusion-80x60.png)](https://telesens.co/2017/04/27/sensor-fusion-part-1/ "Sensor Fusion: Part 1")
    
    [Sensor Fusion: Part 1](https://telesens.co/2017/04/27/sensor-fusion-part-1/ "Sensor Fusion: Part 1")
    
    April 27, 2017 [0](https://telesens.co/2017/04/27/sensor-fusion-part-1/#mh-comments)
    

Copyright © 2026 | WordPress 