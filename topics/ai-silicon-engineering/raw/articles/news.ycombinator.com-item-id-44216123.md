---
source_url: "https://news.ycombinator.com/item?id=44216123"
date_scraped: "2026-04-08"
type: scraped-article
---

Ask HN: How to learn CUDA to professional level | Hacker News

[![](y18.svg)](https://news.ycombinator.com)

**[Hacker News](news)**[new](newest) | [past](front) | [comments](newcomments) | [ask](ask) | [show](show) | [jobs](jobs) | [submit](submit)

[login](login?goto=item%3Fid%3D44216123)

[

](vote?id=44216123&how=up&goto=item%3Fid%3D44216123)

[Ask HN: How to learn CUDA to professional level](item?id=44216123)

249 points by [upmind](user?id=upmind) [10 months ago](item?id=44216123) | [hide](hide?id=44216123&goto=item%3Fid%3D44216123) | [past](https://hn.algolia.com/?query=Ask%20HN%3A%20How%20to%20learn%20CUDA%20to%20professional%20level&type=story&dateRange=all&sort=byDate&storyText=false&prefix&page=0) | [favorite](fave?id=44216123&auth=20b5c058d94caba2042d1ededd4e33e5a0a0225d) | [82 comments](item?id=44216123)

Hi all, I was wondering what books/courses/projects one might do to learn CUDA programming.

(To be frank, the main reason is a lot of companies I'd wish to work for require CUDA experience -- this shouldn't change your answers hopefully, just wanted to provide some context )

  

![](s.gif)

[

](vote?id=44217485&how=up&goto=item%3Fid%3D44216123)

[indianmouse](user?id=indianmouse) [10 months ago](item?id=44217485) | [next](#44216247) [\[–\]](javascript:void\(0\))

  

As a very early CUDA programmer who participated in the cudacontest from NVidia during 2008 and I believe one of the only entries (I'm not claiming though) to be submitted from India and got a consolation and participation prize of a BlackEdition Card, I can vouch the method which I followed.

\- Look up the CUDA Programming Guide from NVidia

\- CUDA Programming books from NVidia from developer.nvidia.com/cuda-books-archive link

\- Start creating small programs based on the existing implementations (A strong C implementation knowledge is required. So, brush up if needed.)

\- Install the required Toolchains, compilers, and I am assuming you have the necessary hardware to play around

\- Github links with CUDA projects. Read the code, And now you could use LLM to explain the code in the way you would need

\- Start creating smaller, yet parallel programs etc., etc.,

And in about a month or two, you should have enough to start writing CUDA programs.

I'm not aware of the skill / experience levels you have, but whatever it might be, there are plenty of sources and resources available now than it was in 2007/08.

Create a 6-8 weeks of study plan and you should be flying soon!

Hope it helps.

Feel free to comment and I can share whatever I could to guide.

![](s.gif)

[

](vote?id=44217579&how=up&goto=item%3Fid%3D44216123)

[hiq](user?id=hiq) [10 months ago](item?id=44217579) | [parent](#44217485) | [next](#44219132) [\[–\]](javascript:void\(0\))

  

\> I am assuming you have the necessary hardware to play around

Can you expand on that? Is it enough to have an nvidia graphic card that's like 5 year old, or do you need something more specific?

![](s.gif)

[

](vote?id=44223576&how=up&goto=item%3Fid%3D44216123)

[adrian\_b](user?id=adrian_b) [10 months ago](item?id=44223576) | [root](#44217485) | [parent](#44217579) | [next](#44217652) [\[–\]](javascript:void\(0\))

  

A 5-year old card, i.e. an NVIDIA Ampere RTX 30xx from 2020, is perfectly fine.

Even 7-year old cards, i.e. NVIDIA Turing RTX 20xx from 2018, are still acceptable.

Older GPUs than Turing should be avoided, because they lack many capabilities of the newer cards, e.g. "tensor cores", and their support in the newer CUDA toolkits will be deprecated in a not very distant future, but very slowly, so for now you can still create programs for Maxwell GPUs from 10 years ago.

Among the newer GPUs, the RTX 40xx SUPER series (i.e. the SUPER variants, not the original RTX 40xx series) has the best energy efficiency. The newest RTX 50xx GPUs have worse energy efficiency than RTX 40xx SUPER, so they achieve a somewhat higher performance only by consuming a disproportionately greater power. Instead of that, it is better to use multiple RTX 40xx SUPER.

![](s.gif)

[

](vote?id=44217652&how=up&goto=item%3Fid%3D44216123)

[rahimnathwani](user?id=rahimnathwani) [10 months ago](item?id=44217652) | [root](#44217485) | [parent](#44217579) | [prev](#44223576) | [next](#44218184) [\[–\]](javascript:void\(0\))

  

I'm not a CUDA programmer, but AIUI:

\- you will want to install the latest version of CUDA Toolkit (12.9.1)

\- each version of CUDA Toolkit requires the card driver to be above a certain version (e.g. toolkit depends on driver version 576 or above)

\- older cards often have recent drivers, e.g. the current version of CUDA Toolkit will work with a GTX 1080, as it has a recent (576.x) driver

![](s.gif)

[

](vote?id=44218184&how=up&goto=item%3Fid%3D44216123)

[slt2021](user?id=slt2021) [10 months ago](item?id=44218184) | [root](#44217485) | [parent](#44217579) | [prev](#44217652) | [next](#44220343) [\[–\]](javascript:void\(0\))

  

each nVidia GPU has a certain Compute Capability ([https://developer.nvidia.com/cuda-gpus](https://developer.nvidia.com/cuda-gpus)).

Depending on the model and age of your GPU, it will have a certain capability that will be the hard ceiling for what you can program using CUDA

![](s.gif)

[

](vote?id=44218511&how=up&goto=item%3Fid%3D44216123)

[dpe82](user?id=dpe82) [10 months ago](item?id=44218511) | [root](#44217485) | [parent](#44218184) | [next](#44219895) [\[–\]](javascript:void\(0\))

  

When you're just getting started and learning that won't matter though. Any Nvidia card from the last 10 years should be fine.

![](s.gif)

[

](vote?id=44219895&how=up&goto=item%3Fid%3D44216123)

[sanderjd](user?id=sanderjd) [10 months ago](item?id=44219895) | [root](#44217485) | [parent](#44218184) | [prev](#44218511) | [next](#44220343) [\[–\]](javascript:void\(0\))

  

Recognizing that this won't result in any useful benchmarks, is there a way to emulate an nvidia gpu? In a docker container, for instance?

![](s.gif)

[

](vote?id=44220343&how=up&goto=item%3Fid%3D44216123)

[indianmouse](user?id=indianmouse) [10 months ago](item?id=44220343) | [root](#44217485) | [parent](#44217579) | [prev](#44218184) | [next](#44219132) [\[–\]](javascript:void\(0\))

  

That is sufficient.

![](s.gif)

[

](vote?id=44219132&how=up&goto=item%3Fid%3D44216123)

[edge17](user?id=edge17) [10 months ago](item?id=44219132) | [parent](#44217485) | [prev](#44217579) | [next](#44216247) [\[–\]](javascript:void\(0\))

  

What environment do you use? Is it still the case that Windows is the main development environment for cuda?

![](s.gif)

[

](vote?id=44216247&how=up&goto=item%3Fid%3D44216123)

[throwaway81523](user?id=throwaway81523) [10 months ago](item?id=44216247) | [prev](#44217485) | [next](#44220970) [\[–\]](javascript:void\(0\))

  

I looked at the CUDA code for Leela Chess Zero and found it pretty understandable, though that was back when Leela used a DCNN instead of transformers. DCNN's are fairly simple and are explained in fast.ai videos that I watched a few years ago, so navigating the Leela code wasn't too difficult. Transformers are more complicated and I want to bone up on them, but I haven't managed to spend any time understanding them.

CUDA itself is just a minor departure from C++, so the language itself is no big deal if you've used C++ before. But, if you're trying to get hired programming CUDA, what that really means is they want you implementing AI stuff (unless it's game dev). AI programming is a much wider and deeper subject than CUDA itself, so be ready to spend a bunch of time studying and hacking to come up to speed in that. But if you do, you will be in high demand. As mentioned, the fast.ai videos are a great introduction.

In the case of games, that means 3D graphics which these days is another rabbit hole. I knew a bit about this back in the day, but it is fantastically more sophisticated now and I don't have any idea where to even start.

![](s.gif)

[

](vote?id=44216299&how=up&goto=item%3Fid%3D44216123)

[upmind](user?id=upmind) [10 months ago](item?id=44216299) | [parent](#44216247) | [next](#44219385) [\[–\]](javascript:void\(0\))

  

This is a great idea! This is the code right' [https://github.com/leela-zero/leela-zero](https://github.com/leela-zero/leela-zero)

I have two beginner (and probably very dumb) questions, why do they have heavy c++/cuda usage rather than using only pytorch/tensorflow. Are they too slow for training Leela? Second, why is there tensorflow code?

![](s.gif)

[

](vote?id=44217423&how=up&goto=item%3Fid%3D44216123)

[henrikf](user?id=henrikf) [10 months ago](item?id=44217423) | [root](#44216247) | [parent](#44216299) | [next](#44216505) [\[–\]](javascript:void\(0\))

  

That's Leela Zero (plays Go instead of Chess). It was good for its time (~2018) but it's quite outdated now. It also uses OpenCL instead of Cuda. I wrote a lot of that code including Winograd convolution routines.

Leela Chess Zero ([https://github.com/LeelaChessZero/lc0](https://github.com/LeelaChessZero/lc0)) has much more optimized Cuda backend targeting modern GPU architectures and it's written by much more knowledgeable people than me. That would be a much better source to learn.

![](s.gif)

[

](vote?id=44216505&how=up&goto=item%3Fid%3D44216123)

[throwaway81523](user?id=throwaway81523) [10 months ago](item?id=44216505) | [root](#44216247) | [parent](#44216299) | [prev](#44217423) | [next](#44219385) [\[–\]](javascript:void\(0\))

  

As I remember, the CUDA code was about 3x faster than the tensorflow code. The tensorflow stuff is there for non-Nvidia GPU's. This was in the era of the GTX 1080 or 2080. No idea about now.

![](s.gif)

[

](vote?id=44216556&how=up&goto=item%3Fid%3D44216123)

[upmind](user?id=upmind) [10 months ago](item?id=44216556) | [root](#44216247) | [parent](#44216505) | [next](#44219385) [\[–\]](javascript:void\(0\))

  

Ah I see, thanks a lot!

![](s.gif)

[

](vote?id=44219385&how=up&goto=item%3Fid%3D44216123)

[robotnikman](user?id=robotnikman) [10 months ago](item?id=44219385) | [parent](#44216247) | [prev](#44216299) | [next](#44220970) [\[–\]](javascript:void\(0\))

  

\>But if you do, you will be in high demand

So I'm guessing trying to find a job as a CUDA programmer is nowhere as big of a headache compared to other software engineering jobs right now? I'm thinking maybe learning CUDA and more about AI might be a good pivot from the current position as a Java middleware developer.

![](s.gif)

[

](vote?id=44225615&how=up&goto=item%3Fid%3D44216123)

[randomNumber7](user?id=randomNumber7) [10 months ago](item?id=44225615) | [root](#44216247) | [parent](#44219385) | [next](#44220970) [\[–\]](javascript:void\(0\))

  

It is likely much more focused on mathematics compared to what a usual java dev does.

![](s.gif)

[

](vote?id=44220970&how=up&goto=item%3Fid%3D44216123)

[FilosofumRex](user?id=FilosofumRex) [10 months ago](item?id=44220970) | [prev](#44216247) | [next](#44216339) [\[–\]](javascript:void\(0\))

  

In you're in it for the money, then forget about HPC and the mathy stuff, unless you've a PhD in the application domain, no one will bother with you, even if you write CUDA at 120 wpm.

The real money is in mastering PTX, nvcc, cuobjdump, Nsight Systems, and Nsight Compute. CUTLASS is good open source code base to explore - start here [https://christianjmills.com/series/notes/cuda-mode-notes.htm...](https://christianjmills.com/series/notes/cuda-mode-notes.html)

most importantly, stay off HN, get on Discord gpu mode, where real coders are: [https://discord.com/invite/gpumode](https://discord.com/invite/gpumode)

![](s.gif)

[

](vote?id=44270091&how=up&goto=item%3Fid%3D44216123)

[ferguess\_k](user?id=ferguess_k) [9 months ago](item?id=44270091) | [parent](#44220970) | [next](#44226693) [\[–\]](javascript:void\(0\))

  

Just curious, if I'm only interested in the programming/architecture side, but not the domain, is it even possible to get deep? I figured that historically, people like Cray probably did not work on or super interested in the domain of HPC?

![](s.gif)

[

](vote?id=44226693&how=up&goto=item%3Fid%3D44216123)

[MoonGhost](user?id=MoonGhost) [10 months ago](item?id=44226693) | [parent](#44220970) | [prev](#44270091) | [next](#44216339) [\[–\]](javascript:void\(0\))

  

It may be cool and real but sounds like very niche domain. Which means there are very few people and places. Mostly gaming industry and drivers. Starting from zero level and getting there in one step will be hard. One should be really, really smart for this.

![](s.gif)

[

](vote?id=44216339&how=up&goto=item%3Fid%3D44216123)

[imjonse](user?id=imjonse) [10 months ago](item?id=44216339) | [prev](#44220970) | [next](#44216238) [\[–\]](javascript:void\(0\))

  

These should keep you busy for months:

[https://www.gpumode.com/](https://www.gpumode.com/) resources and discord community Book: Programming massively parallel processors nvidia cuda docs are very comprehensive too [https://github.com/srush/GPU-Puzzles](https://github.com/srush/GPU-Puzzles)

![](s.gif)

[

](vote?id=44218472&how=up&goto=item%3Fid%3D44216123)

[mdaniel](user?id=mdaniel) [10 months ago](item?id=44218472) | [parent](#44216339) | [next](#44216937) [\[–\]](javascript:void\(0\))

  

Wowzers, the line noise

[https://github.com/HazyResearch/ThunderKittens#:~:text=here%...](https://github.com/HazyResearch/ThunderKittens#:~:text=here%E2%80%99s%20an%20example%20of%20what%20a%20simple%20flashattention-2%20kernel%20for%20an%20rtx%204090%20looks%20like%20written%20in%20thunderkittens)

![](s.gif)

[

](vote?id=44216937&how=up&goto=item%3Fid%3D44216123)

[amelius](user?id=amelius) [10 months ago](item?id=44216937) | [parent](#44216339) | [prev](#44218472) | [next](#44216238) [\[–\]](javascript:void\(0\))

  

This follows a "winner takes all" scenario. I see the differences between the submissions are not so large, often smaller than 1%. Kind of pointless to work on this, if you ask me.

![](s.gif)

[

](vote?id=44222013&how=up&goto=item%3Fid%3D44216123)

[imjonse](user?id=imjonse) [10 months ago](item?id=44222013) | [root](#44216339) | [parent](#44216937) | [next](#44216238) [\[–\]](javascript:void\(0\))

  

the main site is confusing indeed with all those leaderboards, but follow the discord and resources links for the actual learning material.

![](s.gif)

[

](vote?id=44223515&how=up&goto=item%3Fid%3D44216123)

[amelius](user?id=amelius) [10 months ago](item?id=44223515) | [root](#44216339) | [parent](#44222013) | [next](#44216238) [\[–\]](javascript:void\(0\))

  

Thanks, looks interesting indeed.

![](s.gif)

[

](vote?id=44216238&how=up&goto=item%3Fid%3D44216123)

[lokimedes](user?id=lokimedes) [10 months ago](item?id=44216238) | [prev](#44216339) | [next](#44216305) [\[–\]](javascript:void\(0\))

  

There’s a couple of “concerns” you may separate to make this a bit more tractable:

1\. Learning CUDA - the framework, libraries and high-layer wrappers. This is something that changes with times and trends.

2\. Learning high-performance computing approaches. While a GPU and the Nvlink interfaces are Nvidia specific, working in a massively-parallel distributed computing environment is a general branch of knowledge that is translatable across HPC architectures.

3\. Application specifics. If your thing is Transformers, you may just as well start from Torch, Tensorflow, etc. and rely on the current high-level abstractions, to inspire your learning down to the fundamentals.

I’m no longer active in any of the above, so I can’t be more specific, but if you want to master CUDA, I would say learning how massive-parallel programming works, is the foundation that may translate into transferable skills.

![](s.gif)

[

](vote?id=44220054&how=up&goto=item%3Fid%3D44216123)

[david-gpu](user?id=david-gpu) [10 months ago](item?id=44220054) | [parent](#44216238) | [next](#44216558) [\[–\]](javascript:void\(0\))

  

Former GPU guy here. Yeah, that's exactly what I was going to suggest too, with emphasis on #2 and #3. What kind of jobs are they trying to apply for? Is it really CUDA that they need to be familiar with, or CUDA-based libraries like cuDNN, cuBLAS, cuFFT, etc?

Understanding the fundamentals of parallel programming comes first, IMO.

![](s.gif)

[

](vote?id=44220543&how=up&goto=item%3Fid%3D44216123)

[chanana](user?id=chanana) [10 months ago](item?id=44220543) | [root](#44216238) | [parent](#44220054) | [next](#44216558) [\[–\]](javascript:void\(0\))

  

\> Understanding the fundamentals of parallel programming comes first, IMO.

Are there any good resources you’d recommend for that?

![](s.gif)

[

](vote?id=44221733&how=up&goto=item%3Fid%3D44216123)

[rramadass](user?id=rramadass) [10 months ago](item?id=44221733) | [root](#44216238) | [parent](#44220543) | [next](#44216558) [\[–\]](javascript:void\(0\))

  

I am not the person you asked the question of, but you might find the following useful (in addition to the ones mentioned in my other comments);

_Foundations of Multithreaded, Parallel, and Distributed Programming by Gregory Andrews_ - An old classic but still very good explanations of concurrent algorithmic concepts.

_Parallel Programming: Concepts and Practice by Bertil Schmidt et.al._ - A relatively recent book with comprehensive coverage.

![](s.gif)

[

](vote?id=44269394&how=up&goto=item%3Fid%3D44216123)

[Breza](user?id=Breza) [9 months ago](item?id=44269394) | [root](#44216238) | [parent](#44221733) | [next](#44216558) [\[–\]](javascript:void\(0\))

  

Good suggestions. For everyday devs starting with the basics, I'd suggest Grokking Concurrency.

![](s.gif)

[

](vote?id=44216558&how=up&goto=item%3Fid%3D44216123)

[rramadass](user?id=rramadass) [10 months ago](item?id=44216558) | [parent](#44216238) | [prev](#44220054) | [next](#44216305) [\[–\]](javascript:void\(0\))

  

This is the right approach. Without (2) trying to learn (1) will just lead to "confusion worse confounded". I also suggest a book recommendation here - [https://news.ycombinator.com/item?id=44216478](https://news.ycombinator.com/item?id=44216478)

![](s.gif)

[

](vote?id=44218032&how=up&goto=item%3Fid%3D44216123)

[jonas21](user?id=jonas21) [10 months ago](item?id=44218032) | [root](#44216238) | [parent](#44216558) | [next](#44216722) [\[–\]](javascript:void\(0\))

  

I think it depends on your learning style. For me, learning something with a concrete implementation and code that you can play around with is a lot easier than trying to study the abstract general concepts first. Once you have some experience with the code, you start asking why things are done a certain way, and that naturally leads to the more general concepts.

![](s.gif)

[

](vote?id=44221688&how=up&goto=item%3Fid%3D44216123)

[rramadass](user?id=rramadass) [10 months ago](item?id=44221688) | [root](#44216238) | [parent](#44218032) | [next](#44216722) [\[–\]](javascript:void\(0\))

  

It has got nothing to do with "learning styles". Parallel Computing needs knowledge of three things; a) Certain crucial architectural aspects (logical and physical) of the hardware b) Decomposing a problem correctly to map to that hardware c) Algorithms using a specific language/framework to combine the above two. CUDA (and other similar frameworks) only come in the last step and so a knowledge of the first two is a prerequisite.

![](s.gif)

[

](vote?id=44216722&how=up&goto=item%3Fid%3D44216123)

[lokimedes](user?id=lokimedes) [10 months ago](item?id=44216722) | [root](#44216238) | [parent](#44216558) | [prev](#44218032) | [next](#44216305) [\[–\]](javascript:void\(0\))

  

This one was my go-to for HPC, but it may be a bit dated by now: [https://www.amazon.com/Introduction-Performance-Computing-Sc...](https://www.amazon.com/Introduction-Performance-Computing-Scientists-Computational/dp/143981192X/)

![](s.gif)

[

](vote?id=44217143&how=up&goto=item%3Fid%3D44216123)

[rramadass](user?id=rramadass) [10 months ago](item?id=44217143) | [root](#44216238) | [parent](#44216722) | [next](#44216305) [\[–\]](javascript:void\(0\))

  

That's a good book too (i have it) but more general than the Ridgway Scott book which uses examples from Numerical Computation domains. Here is an overview of the chapters; example domains start from chapter 10 onwards - [https://www.jstor.org/stable/j.ctv1ddcxfs](https://www.jstor.org/stable/j.ctv1ddcxfs)

These sort of books are only "dated" when it comes to specific languages/frameworks/libraries. The methods/techniques are evergreen and often conceptually better explained in these older books.

For recent up to date works on HPC, the free multi-volume _The Art of High Performance Computing by Victor Eijkhout_ can't be beat - [https://news.ycombinator.com/item?id=38815334](https://news.ycombinator.com/item?id=38815334)

![](s.gif)

[

](vote?id=44216305&how=up&goto=item%3Fid%3D44216123)

[elashri](user?id=elashri) [10 months ago](item?id=44216305) | [prev](#44216238) | [next](#44217190) [\[–\]](javascript:void\(0\))

  

I will give you personal experience learning CUDA that might be helpful.

Disclaime: I don't claim that this is actually a systematic way to learn it and it is more for academic work.

I got assigned to a project that needs learning CUDA as part of my PhD. There was no one in my research group who have any experience or know CUDA. I started with standard NVIDIA courses (Getting Started with Accelerated Computing with CUDA C/C++ and there is python version too).

This gave me good introduction to the concepts and basic ideas but I think after that I did most of learning by trial and error. I tried a couple of online tutorials for specific things and some books but it was always a deprecated function there or here or a change of API that make things obsolete. Or basically things changed for your GPU and now you have to be careful because yoy might be using GPU version not compatible with what I develop for in production and you need things to work for both.

I think learning CUDA for me is an endeavor of pain and going through "compute-sanitizer" and Nsight because you will find that most of your time will go into debugging why things is running slower than you think.

Take things slowly. Take a simple project that you know how to do without CUDA then port it to CUDA ane benchmark against CPU and try to optimize different aspect of it.

The one advice that can be helpful is not to think about optimization at the beginning. Start with correct, then optimize. A working slow kernel beats a fast kernel that corrupts memory.

![](s.gif)

[

](vote?id=44216793&how=up&goto=item%3Fid%3D44216123)

[korbip](user?id=korbip) [10 months ago](item?id=44216793) | [parent](#44216305) | [next](#44216564) [\[–\]](javascript:void\(0\))

  

I can share a similar PhD story (the result being visible here: [https://github.com/NX-AI/flashrnn](https://github.com/NX-AI/flashrnn)). Back then I didn't find any tutorials that cover anything beyond the basics (which are still important). Once you have understood the principle working mode and architecture of a GPU, I would recommend the following workflow: 1. First create an environment so that you can actually test your kernels against baselines written in a higher-level language. 2. If you don't have an urgent project already, try to improve/re-implement existing problems (MatMul being the first example). Don't get caught by wanting to implement all size cases. Take an example just to learn a certain functionality, rather than solving the whole problem if it's just about learning. 3. Write the functionality you want to have in increasing complexity. Write loops first, then parallelize these loops over the grid. Use global memory first, then put things into shared memory and registers. Use plain matrix multiplication first, then use mma (TensorCore) primitives to speed things up. 4. Iterate over the CUDA C Programming Guide. It covers all (most) of the functionality that you want to learn - but can't be just read an memorized. When you apply it you learn it. 5. Might depend on you use-case but also consider using higher-level abstractions like CUTLASS or ThunderKitten. Also, if your environment is jax/torch, use triton first before going to CUDA level.

Overall, it will be some pain for sure. And to master it including PTX etc. will take a lot of time.

![](s.gif)

[

](vote?id=44216564&how=up&goto=item%3Fid%3D44216123)

[kevmo314](user?id=kevmo314) [10 months ago](item?id=44216564) | [parent](#44216305) | [prev](#44216793) | [next](#44217190) [\[–\]](javascript:void\(0\))

  

\> I think learning CUDA for me is an endeavor of pain and going through "compute-sanitizer" and Nsight because you will find that most of your time will go into debugging why things is running slower than you think.

This is so true it hurts.

![](s.gif)

[

](vote?id=44217190&how=up&goto=item%3Fid%3D44216123)

[sputknick](user?id=sputknick) [10 months ago](item?id=44217190) | [prev](#44216305) | [next](#44216300) [\[–\]](javascript:void\(0\))

  

I used this to teach high school students. Probably not sufficient to get what you want, but it should get you off the ground and you can run from there. [https://youtu.be/86FAWCzIe\_4?si=buqdqREWASNPbMQy](https://youtu.be/86FAWCzIe_4?si=buqdqREWASNPbMQy)

![](s.gif)

[

](vote?id=44216300&how=up&goto=item%3Fid%3D44216123)

[Onavo](user?id=Onavo) [10 months ago](item?id=44216300) | [prev](#44217190) | [next](#44216478) [\[–\]](javascript:void\(0\))

  

Assuming you are asking this because of the deep learning/ChatGPT hype, the first question you should ask yourself is, do you really need to? The skills needed for CUDA are completely unrelated to building machine learning models. It's like learning to make a TLS library so you can get a full stack web development job. The skills are completely orthogonal. CUDA belongs to the domain of game developers, graphics people, high performance computing and computer engineers (hardware). From the point of view of machine learning development and research, it's nothing more than an implementation detail.

Make sure you are very clear on what you want. Most HR departments cast a wide net (it's like how every junior role requires "3-5 years of experience" when in reality they don't _really_ care). Similarly when hiring, most companies pray for the unicorn developer who can understand the entire stack from the GPU to the end user product domain when the day to day is mostly in Python.

![](s.gif)

[

](vote?id=44216478&how=up&goto=item%3Fid%3D44216123)

[rramadass](user?id=rramadass) [10 months ago](item?id=44216478) | [prev](#44216300) | [next](#44216304) [\[–\]](javascript:void\(0\))

  

CUDA GPGPU programming was invented to solve certain classes of parallel problems. So studying these problems will give you greater insight into CUDA based parallel programming. I suggest reading the following old book along with your CUDA resources.

_Scientific Parallel Computing_ by L. Ridgway Scott et. al. - [https://press.princeton.edu/books/hardcover/9780691119359/sc...](https://press.princeton.edu/books/hardcover/9780691119359/scientific-parallel-computing)

![](s.gif)

[

](vote?id=44216304&how=up&goto=item%3Fid%3D44216123)

[ForgotIdAgain](user?id=ForgotIdAgain) [10 months ago](item?id=44216304) | [prev](#44216478) | [next](#44218157) [\[–\]](javascript:void\(0\))

  

I have not tried it yet, but seems nice : [https://leetgpu.com/](https://leetgpu.com/)

![](s.gif)

[

](vote?id=44218157&how=up&goto=item%3Fid%3D44216123)

[canyp](user?id=canyp) [10 months ago](item?id=44218157) | [prev](#44216304) | [next](#44217589) [\[–\]](javascript:void\(0\))

  

My 2 cents: "Learning CUDA" is not the interest bit. Rather, you want to learn two things: 1) GPU hardware architecture, 2) parallelizing algorithms. For CUDA specifically, there is the book CUDA Programming Guide from Nvidia, which will teach you the basics of the language. But what these jobs typically require is that you know how to parallelize an algorithm and squeeze the most of the hardware.

![](s.gif)

[

](vote?id=44217589&how=up&goto=item%3Fid%3D44216123)

[mekpro](user?id=mekpro) [10 months ago](item?id=44217589) | [prev](#44218157) | [next](#44217596) [\[–\]](javascript:void\(0\))

  

To professionals in the field, I have a question: what jobs, positions, and companies are in need of CUDA engineers? My current understanding is that while many companies use CUDA's by-products (like PyTorch), direct CUDA development seems less prevalent. I'm therefore seeking to identify more companies and roles that heavily rely on CUDA.

![](s.gif)

[

](vote?id=44217684&how=up&goto=item%3Fid%3D44216123)

[kloop](user?id=kloop) [10 months ago](item?id=44217684) | [parent](#44217589) | [next](#44217596) [\[–\]](javascript:void\(0\))

  

My team uses it for geospatial data. We rasterize slippy map tiles and then do a raster summary on the gpu.

It's a weird case, but the pixels can be processed independently for most of it, so it works pretty well. Then the rows can be summarized in parallel and rolled up at the end. The copy onto the gpu is our current bottleneck however.

![](s.gif)

[

](vote?id=44217596&how=up&goto=item%3Fid%3D44216123)

[SoftTalker](user?id=SoftTalker) [10 months ago](item?id=44217596) | [prev](#44217589) | [next](#44220158) [\[–\]](javascript:void\(0\))

  

It's 2025. Get with the times, ask Claude to do it, and then ask it to explain it to you as if you're an engineer who needs to convince a hiring manager that you understand it.

![](s.gif)

[

](vote?id=44218560&how=up&goto=item%3Fid%3D44216123)

[rakel\_rakel](user?id=rakel_rakel) [10 months ago](item?id=44218560) | [parent](#44217596) | [next](#44220158) [\[–\]](javascript:void\(0\))

  

Might work in 2025, 2026 will demand more.

![](s.gif)

[

](vote?id=44220158&how=up&goto=item%3Fid%3D44216123)

[SonOfLilit](user?id=SonOfLilit) [10 months ago](item?id=44220158) | [prev](#44217596) | [next](#44218841) [\[–\]](javascript:void\(0\))

  

Prefix scan is a great intro to GPU programming:

[https://developer.download.nvidia.com/compute/cuda/2\_2/sdk/w...](https://developer.download.nvidia.com/compute/cuda/2_2/sdk/website/projects/scan/doc/scan.pdf)

After this you should be able to tell whether you enjoy this kind of work.

If you do, try to do a reasonably optimized GEMM, and then try to follow the FlashAttention paper and implement a basic version of what they're doing.

![](s.gif)

[

](vote?id=44218841&how=up&goto=item%3Fid%3D44216123)

[alecco](user?id=alecco) [10 months ago](item?id=44218841) | [prev](#44220158) | [next](#44277669) [\[–\]](javascript:void\(0\))

  

Ignore everybody else. Start with CUDA Thrust. Study carefully their examples. See how other projects use Thrust. After a year or two, go deeper to cub.

Do not implement algorithms by hand. Recent architectures are extremely hard to reach decent occupancy and such. Thrust and cub solve 80% of the cases with reasonable trade-offs and they do most of the work for you.

[https://developer.nvidia.com/thrust](https://developer.nvidia.com/thrust)

![](s.gif)

[

](vote?id=44219395&how=up&goto=item%3Fid%3D44216123)

[bee\_rider](user?id=bee_rider) [10 months ago](item?id=44219395) | [parent](#44218841) | [next](#44277669) [\[–\]](javascript:void\(0\))

  

It looks quite nice just from skimming the link.

But, I don’t understand the comparison to TBB. Do they have a version of TBB that runs on the GPU natively? If the TBB implementation is on the CPU… that’s just comparing two different pieces of hardware. Which would be confusing, bordering on dishonest.

![](s.gif)

[

](vote?id=44222508&how=up&goto=item%3Fid%3D44216123)

[alecco](user?id=alecco) [10 months ago](item?id=44222508) | [root](#44218841) | [parent](#44219395) | [next](#44277669) [\[–\]](javascript:void\(0\))

  

The TBB comparison is a marketing leftover from 10 years ago when they were trying to convince people that NVIDIA GPUs were much faster than Intel CPUs for parallel problems.

![](s.gif)

[

](vote?id=44277669&how=up&goto=item%3Fid%3D44216123)

[CalmDream](user?id=CalmDream) [9 months ago](item?id=44277669) | [prev](#44218841) | [next](#44217692) [\[–\]](javascript:void\(0\))

  

I think this might be good introduction to GPU programming: [https://builds.modular.com/puzzles/introduction.html](https://builds.modular.com/puzzles/introduction.html). It explains gpu concepts in an hardware agnostic way and verify understanding with implementation puzzle. It is based on [https://github.com/srush/GPU-Puzzles](https://github.com/srush/GPU-Puzzles) but is CUDA specific.

![](s.gif)

[

](vote?id=44217692&how=up&goto=item%3Fid%3D44216123)

[math\_dandy](user?id=math_dandy) [10 months ago](item?id=44217692) | [prev](#44277669) | [next](#44217044) [\[–\]](javascript:void\(0\))

  

Are there any GPU emulators you can use to run simple CUDA programs on a commodity laptops, just to get comfortable with the mechanics, the toolchain, etc.?

![](s.gif)

[

](vote?id=44218027&how=up&goto=item%3Fid%3D44216123)

[corysama](user?id=corysama) [10 months ago](item?id=44218027) | [parent](#44217692) | [next](#44217709) [\[–\]](javascript:void\(0\))

  

[https://leetgpu.com/](https://leetgpu.com/) emulates running simple CUDA programs in a web page with zero setup. It’s a good way to get your toes wet.

![](s.gif)

[

](vote?id=44217709&how=up&goto=item%3Fid%3D44216123)

[gkbrk](user?id=gkbrk) [10 months ago](item?id=44217709) | [parent](#44217692) | [prev](#44218027) | [next](#44219938) [\[–\]](javascript:void\(0\))

  

Commodity laptops can just use regular non-emulated CUDA if they have an Nvidia GPU. It's not just for datacenter GPUs, a ton of regular consumer GPUs are also supported.

![](s.gif)

[

](vote?id=44219409&how=up&goto=item%3Fid%3D44216123)

[bee\_rider](user?id=bee_rider) [10 months ago](item?id=44219409) | [root](#44217692) | [parent](#44217709) | [next](#44219938) [\[–\]](javascript:void\(0\))

  

A commodity laptop doesn’t have a GPU these days, iGPUs are good enough for basic tasks.

![](s.gif)

[

](vote?id=44219938&how=up&goto=item%3Fid%3D44216123)

[throwaway81523](user?id=throwaway81523) [10 months ago](item?id=44219938) | [parent](#44217692) | [prev](#44217709) | [next](#44217044) [\[–\]](javascript:void\(0\))

  

You can get VPS with GPU's these days, not super cheap, but affordable for those in the industry.

![](s.gif)

[

](vote?id=44217044&how=up&goto=item%3Fid%3D44216123)

[tkuraku](user?id=tkuraku) [10 months ago](item?id=44217044) | [prev](#44217692) | [next](#44217811) [\[–\]](javascript:void\(0\))

  

I think you just pick a problem you want to solve with gpu programming and go for it. Learning what you need along the way. Nvidia blog posts are great for learning things along the way such as [https://devblogs.nvidia.com/cuda-pro-tip-write-flexible-kern...](https://devblogs.nvidia.com/cuda-pro-tip-write-flexible-kernels-grid-stride-loops/)

![](s.gif)

[

](vote?id=44217811&how=up&goto=item%3Fid%3D44216123)

[sremani](user?id=sremani) [10 months ago](item?id=44217811) | [prev](#44217044) | [next](#44218080) [\[–\]](javascript:void\(0\))

  

The book - PMPP - Programming Massively Parallel Processors

The YouTube Channel - CUDA\_MODE - it is based on PMPP I could not find the channel, but here is the playlist [https://www.youtube.com/watch?v=LuhJEEJQgUM&list=PLVEjdmwEDk...](https://www.youtube.com/watch?v=LuhJEEJQgUM&list=PLVEjdmwEDkgW0uEWNt4olLk-bnSueZARH)

Once done, you would be on solid foundation.

![](s.gif)

[

](vote?id=44218080&how=up&goto=item%3Fid%3D44216123)

[fifilura](user?id=fifilura) [10 months ago](item?id=44218080) | [prev](#44217811) | [next](#44218155) [\[–\]](javascript:void\(0\))

  

I am not a CUDA programmer but when looking at this, I think I can see the parallels to Spark and SQL

[https://gfxcourses.stanford.edu/cs149/fall24/lecture/datapar...](https://gfxcourses.stanford.edu/cs149/fall24/lecture/dataparallel/)

So - start getting used to programming without using for loops, would be my tip.

![](s.gif)

[

](vote?id=44218155&how=up&goto=item%3Fid%3D44216123)

[gdubs](user?id=gdubs) [10 months ago](item?id=44218155) | [prev](#44218080) | [next](#44220419) [\[–\]](javascript:void\(0\))

  

I like to learn through projects, and as a graphics guy I love the GPU Gems series. Things like:

[https://developer.nvidia.com/gpugems/gpugems3/part-v-physics...](https://developer.nvidia.com/gpugems/gpugems3/part-v-physics-simulation/chapter-31-fast-n-body-simulation-cuda)

As an Apple platforms developer I actually worked through those books to figure out how to convert the CUDA stuff to Metal, which helped the material click even more.

Part of why I did it was – and this was some years back – I wanted to sharpen my thinking around parallel approaches to problem solving, given how central those algorithms and ways of thinking are to things like ML and not just game development, etc.

![](s.gif)

[

](vote?id=44220419&how=up&goto=item%3Fid%3D44216123)

[lacker](user?id=lacker) [10 months ago](item?id=44220419) | [prev](#44218155) | [next](#44216446) [\[–\]](javascript:void\(0\))

  

If you're experienced in C++ you can basically just jump in. I found this youtube series to be really helpful:

[https://www.youtube.com/playlist?list=PLxNPSjHT5qvtYRVdNN1yD...](https://www.youtube.com/playlist?list=PLxNPSjHT5qvtYRVdNN1yDcdSl39uHV_sU)

After watching this video I was able to implement a tiling version of a kernel that was the bottleneck of our production data analysis pipeline to improve performance by over 2x. There's much more to learn but I found this video series to be a great place to start.

![](s.gif)

[

](vote?id=44216446&how=up&goto=item%3Fid%3D44216123)

[weinzierl](user?id=weinzierl) [10 months ago](item?id=44216446) | [prev](#44220419) | [next](#44216806) [\[–\]](javascript:void\(0\))

  

Nvidia itself has a paid course series. It is a bit older but I believe still relevant. I have bought it, but not yet started it yet. I intend to do so during the summer holidays.

![](s.gif)

[

](vote?id=44216806&how=up&goto=item%3Fid%3D44216123)

[majke](user?id=majke) [10 months ago](item?id=44216806) | [prev](#44216446) | [next](#44216223) [\[–\]](javascript:void\(0\))

  

I had a bit, limited, exposure to cuda. It was before the AI boom, during Covid.

I found it easy to start. Then there was a pretty nice learning curve to get to warps, SM's and basic concepts. Then I was able to dig deeper into the integer opcodes, which was super cool. I was able to optimize the compute part pretty well, without much roadblocks.

However, getting memory loads perfect and then getting closer to hw (warp groups, divergence, the L2 cache split thing, scheduling), was pretty hard.

I'd say CUDA is pretty nice/fun to start with, and it's possible to get quite far for a novice programmer. However getting deeper and achieving real advantage over CPU is hard.

Additionally there is a problem with Nvidia segmenting the market - some opcodes are present in \_old\_ gpu's (CUDA arch is \_not\_ forwards compatible). Some opcodes are reserved to "AI" chips (like H100). So, to get code that is fast on both H100 and RTX5090 is super hard. Add to that a fact that each card has different SM count and memory capacity and bandwidth... and you end up with an impossible compatibility matrix.

TLDR: Beginnings are nice and fun. You can get quite far on the optimizing compute part. But getting compatibility for differnt chips and memory access is hard. When you start, chose specific problem, specific chip, specific instruction set.

![](s.gif)

[

](vote?id=44216223&how=up&goto=item%3Fid%3D44216123)

[dist-epoch](user?id=dist-epoch) [10 months ago](item?id=44216223) | [prev](#44216806) | [next](#44216672) [\[–\]](javascript:void\(0\))

  

As they typically say: Just Do It (tm).

Start writing some CUDA core to sort an array or find the maximum element.

![](s.gif)

[

](vote?id=44216953&how=up&goto=item%3Fid%3D44216123)

[the\_\_alchemist](user?id=the__alchemist) [10 months ago](item?id=44216953) | [parent](#44216223) | [next](#44216245) [\[–\]](javascript:void\(0\))

  

I concur with this. Then supplement with resources A/R. Ideally, find some tasks in your programs that are parallelize. (Learning what these are is important too!), and switch them to Cuda. If you don't have any, make a toy case, e.g. an n-body simulation.

![](s.gif)

[

](vote?id=44216245&how=up&goto=item%3Fid%3D44216123)

[amelius](user?id=amelius) [10 months ago](item?id=44216245) | [parent](#44216223) | [prev](#44216953) | [next](#44216672) [\[–\]](javascript:void\(0\))

  

I'd rather learn to use a library that works on any brand of GPU.

If that is not an option, I'll wait!

![](s.gif)

[

](vote?id=44217474&how=up&goto=item%3Fid%3D44216123)

[latchkey](user?id=latchkey) [10 months ago](item?id=44217474) | [root](#44216223) | [parent](#44216245) | [next](#44216310) [\[–\]](javascript:void\(0\))

  

Then learn PyTorch.

The hardware between brands is fundamentally different. There isn't a standard like x86 for CPUs.

So, while you may use something like HIPIFY to translate your code between APIs, at least with GPU programming, it makes sense to learn how they differ from each other or just pick one of them and work with it knowing that the others will just be some variation of the same idea.

![](s.gif)

[

](vote?id=44218378&how=up&goto=item%3Fid%3D44216123)

[horsellama](user?id=horsellama) [10 months ago](item?id=44218378) | [root](#44216223) | [parent](#44217474) | [next](#44216310) [\[–\]](javascript:void\(0\))

  

the jobs requiring cuda experience are most of the times because torch is not good enough

![](s.gif)

[

](vote?id=44216310&how=up&goto=item%3Fid%3D44216123)

[pjmlp](user?id=pjmlp) [10 months ago](item?id=44216310) | [root](#44216223) | [parent](#44216245) | [prev](#44217474) | [next](#44217130) [\[–\]](javascript:void\(0\))

  

If only Khronos and the competition cared about the developer experience....

![](s.gif)

[

](vote?id=44216958&how=up&goto=item%3Fid%3D44216123)

[the\_\_alchemist](user?id=the__alchemist) [10 months ago](item?id=44216958) | [root](#44216223) | [parent](#44216310) | [next](#44217130) [\[–\]](javascript:void\(0\))

  

This is continuously a point of frustration! Vulkan compute is... suboptimal. I use Cuda because it feels like the only practical option. I want Vulkan or something else to compete seriously, but until that happens, I will use Cuda.

![](s.gif)

[

](vote?id=44218056&how=up&goto=item%3Fid%3D44216123)

[corysama](user?id=corysama) [10 months ago](item?id=44218056) | [root](#44216223) | [parent](#44216958) | [next](#44217363) [\[–\]](javascript:void\(0\))

  

Is [https://github.com/KomputeProject/kompute](https://github.com/KomputeProject/kompute) + [https://shader-slang.org/](https://shader-slang.org/) getting there?

Runs on anything + auto-differentiatation.

![](s.gif)

[

](vote?id=44217363&how=up&goto=item%3Fid%3D44216123)

[pjmlp](user?id=pjmlp) [10 months ago](item?id=44217363) | [root](#44216223) | [parent](#44216958) | [prev](#44218056) | [next](#44217130) [\[–\]](javascript:void\(0\))

  

It took until Vulkanised 2025, to acknowledge Vulkan became the same mess as OpenGL, and to put an action plan into action to try to correct this.

Had it not been for Apple with OpenCL initial contribution, regardless of how it went from there, AMD with Mantle as starting point for Vulkan, NVidia with Vulkan-Hpp and Slang, and the ecosystem of Khronos standards would be much worse.

Also Vulkan isn't as bad as OpenGL tooling, because LunarG exists, and someone pays them for the whole Vulkan SDK.

The attitude "we put paper standards" and the community should step in for the implementations and tooling, hardly comes to the productivity from private APIs tooling.

Also all GPU vendors, including Intel and AMD, also rather push their own compute APIs, even if based on top of Khronos ones.

![](s.gif)

[

](vote?id=44220108&how=up&goto=item%3Fid%3D44216123)

[david-gpu](user?id=david-gpu) [10 months ago](item?id=44220108) | [root](#44216223) | [parent](#44217363) | [next](#44217130) [\[–\]](javascript:void\(0\))

  

_\> The attitude "we put paper standards" and the community should step in for the implementations and tooling_

Khronos is a consortium financed by its members, who either implement the standards on their own hardware or otherwise depend on the ecosystem around them. For example, competing GPU vendors typically implement the standards in parallel with the committee meetings. The very people who represent their company in Khronos are typically leads of the teams who implement the standards.

Source: used to represent my employers at Khronos. It was a difficult, thankless job, that required almost as much diplomacy as technical expertise.

![](s.gif)

[

](vote?id=44222340&how=up&goto=item%3Fid%3D44216123)

[pjmlp](user?id=pjmlp) [10 months ago](item?id=44222340) | [root](#44216223) | [parent](#44220108) | [next](#44217130) [\[–\]](javascript:void\(0\))

  

I know, and the way those members implemented Khronos standards, versus their own proprietary alternatives, shows how it actually works in practice, regarding developer tooling and ergonomics.

![](s.gif)

[

](vote?id=44217130&how=up&goto=item%3Fid%3D44216123)

[Cloudef](user?id=Cloudef) [10 months ago](item?id=44217130) | [root](#44216223) | [parent](#44216245) | [prev](#44216310) | [next](#44275654) [\[–\]](javascript:void\(0\))

  

Both zig and rust are aiming to compile to gpus natively. What cuda and hip provide is heterogeneous computing runtime, aka hiding the boilerplate of executing code on cpu and gpu seamlessly

![](s.gif)

[

](vote?id=44275654&how=up&goto=item%3Fid%3D44216123)

[labberdabberdoo](user?id=labberdabberdoo) [9 months ago](item?id=44275654) | [root](#44216223) | [parent](#44216245) | [prev](#44217130) | [next](#44217755) [\[–\]](javascript:void\(0\))

  

Isn't this basically what Mojo is attempting? "Vendor independent GPU programmability", according to Modular.

![](s.gif)

[

](vote?id=44217755&how=up&goto=item%3Fid%3D44216123)

[uecker](user?id=uecker) [10 months ago](item?id=44217755) | [root](#44216223) | [parent](#44216245) | [prev](#44275654) | [next](#44219272) [\[–\]](javascript:void\(0\))

  

GCC / clang also have support for offloading.

![](s.gif)

[

](vote?id=44219272&how=up&goto=item%3Fid%3D44216123)

[moralestapia](user?id=moralestapia) [10 months ago](item?id=44219272) | [root](#44216223) | [parent](#44216245) | [prev](#44217755) | [next](#44216672) [\[–\]](javascript:void\(0\))

  

K, bud.

Perhaps you haven't noticed, but you're in a thread that asked about CUDA, explicitly.

![](s.gif)

[

](vote?id=44216672&how=up&goto=item%3Fid%3D44216123)

[epirogov](user?id=epirogov) [10 months ago](item?id=44216672) | [prev](#44216223) | [next](#44218797) [\[–\]](javascript:void\(0\))

  

I bought P106-90 for 20$ and start porting my date apps to parallel processing with it.

![](s.gif)

[

](vote?id=44218797&how=up&goto=item%3Fid%3D44216123)

[matt3210](user?id=matt3210) [10 months ago](item?id=44218797) | [prev](#44216672) | [next](#44218898) [\[–\]](javascript:void\(0\))

  

Just make cool stuff. Find people to code review. I learn way more during code reviews than anything else.

![](s.gif)

[

](vote?id=44218898&how=up&goto=item%3Fid%3D44216123)

[brudgers](user?id=brudgers) [10 months ago](item?id=44218898) | [prev](#44218797) | [next](#44218277) [\[–\]](javascript:void\(0\))

  

For better or worse, direct professional experience in a professional setting is the only way to learn anything to a professional level.

That doesn't mean one-eyed-king knowledge is never enough to solve that chicken-and-egg. You only have to be good enough to get the job.

But if you haven't done it on the job, you don't have work experience and you are either lying to others or lying to yourself...and any sophisticated organization won't fall for it...

...except of course, knowingly. And the best way to get someone to knowingly ignore obvious dunning-kruger and/or horseshit is to know that someone personally or professionally.

Which is to say that the best way to get a good job is to have a good relationship with someone who can hire you for a good job (nepotism trumps technical ability, always). And the best way to find a good job is to know a lot of people who want to work with you.

To put it another way, looking for a job is the only way to find a job and looking for a job is also much much harder than everything that avoids looking for a job (like studying CUDA) by pretending to be preparation...because again, studying CUDA won't ever give you professional experience.

Don't get me wrong, there's nothing wrong with learning CUDA all on your own. But it is not professional experience and it is not looking for a job doing CUDA.

Finally, if you want to learn CUDA just learn it for its own sake without worrying about a job. Learning things for their own sake is the nature of learning once you get out of school.

Good luck.

![](s.gif)

[

](vote?id=44216569&how=up&goto=item%3Fid%3D44216123)

[izharkhan](user?id=izharkhan) [10 months ago](item?id=44216569) | [prev](#44218277) [\[–\]](javascript:void\(0\))

  

Haking Kase kare

  
  

![](s.gif)

  

[Guidelines](newsguidelines.html) | [FAQ](newsfaq.html) | [Lists](lists) | [API](https://github.com/Hac