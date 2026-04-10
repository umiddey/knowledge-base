---
source_url: "https://www.tessolve.com/blogs/from-concept-to-gdsii-a-deep-dive-into-the-vlsi-design-flow/"
date_scraped: "2026-04-08"
type: scraped-article
---

   From Concept to GDSII: A Deep Dive into the VLSI Design Flow                                                                         

[Skip to main content](#ajax-content-wrap)

 Hit enter to search or ESC to close Search

[Close Search](#)

[![Tessolve - Silicon And Systems Solutions Partner For Next-Gen Products](https://www.tessolve.com/wp-content/uploads/2023/06/tessolve-logo-20-june.svg)](https://www.tessolve.com)

[Menu](#slide-out-widget-area)

*   [Semiconductor Solutions](/semiconductor-solutions/)
    *   [Custom Silicon](/custom-silicon/)
        *   [VLSI Design](/chip-design/)
            *   [RTL Design](/chip-design/#rtl-design)
            *   [Analog & Mixed Signal (AMS) Design](/chip-design/#analog-mixed-signal)
            *   [Design Verification](/chip-design/#design-verification)
            *   [Design for Test (DFT)](/chip-design/#design-for-test-and-debug)
            *   [Physical Design](/chip-design/#physical-design)
            *   [FPGA Emulation](/chip-design/#fpga-emulation)
            *   [Foundry Porting Services](/chip-design/#foundry-porting-services)
    *   [Post Silicon](/post-silicon/)
        *   [Test Engineering](/test-engineering/)
        *   [Product Engineering](/product-engineering/)
        *   [PCB Design & Manufacturing](/hardware-design/)
        *   [Package Engineering](/package-engineering/)
    *   [Chip-image](#)
*   [Dream Chip](https://www.dreamchip.de/)
*   [Embedded](/embedded)
*   [Industries](https://www.tessolve.com/industries/)
    *   [Automotive](/automotive-industry/)
        *   [Avionics](/avionics/)
        *   [AI Solutions](/ai-solutions/)
        *   [Data Center/Enterprise](/data-center-industry/)
        *   [Industrial](/industrial/)
        *   [Semiconductor](/semiconductor-focused-domains/)
    *   [Industries-menu IMG](#)
*   Labs
    *   [t-lab-ptitle](#)
        *   [Test Lab](/test-lab/)
        *   [Test Lab](/test-lab/)
        *   [HSIO Lab](https://www.tessolve.com/hsio-lab/)
        *   [Reliability & Qualification Lab](/reliability-qualification-lab/)
        *   [STPI Smart Lab](/stpi-smart-lab/)
        *   [Embedded Systems Lab](/embedded-systems-lab/)
        *   Embedded Software Lab
        *   [Automotive Software](https://embedded.tessolve.com/automotive-software-lab)
        *   [Post Silicon Validation](https://embedded.tessolve.com/post-silicon-validation-lab)
        *   [Wireless Testing](https://embedded.tessolve.com/wireless-testing-lab)
        *   [CoE](/center-of-excellence/)
    *   [Tessolve-Lab-Image](#)
*   Company
    *   [com-title](#)
        *   [About Us](/about-us/)
        *   [Leadership](/leadership/)
        *   [Board of Directors](/board-of-directors/)
        *   [Partners](/partners/)
        *   [Quality](/quality/)
    *   [company-image](#)
*   [Careers](/careers/)
*   [Insight](#)
    *   [Insights-title](#)
        *   [News](/news/)
        *   [Blogs](https://www.tessolve.com/blogs/)
        *   [Events](https://www.tessolve.com/events/)
        *   [Events](https://www.tessolve.com/events/)
            *   [─Test Club](/test-club-latest-silicon-test-strategies-and-techniques/)
            *   [─Verification Futures](/verification-futures/)
            *   [─Webinar](/ai-in-verification-webinar/)
        *   [Brochures](/brochure-leaflets/)
        *   [Case Studies](/case-studies/)
        *   [Videos](https://www.tessolve.com/videos/)
    *   [Insights-image](#)
*   [Contact](/contact-us/)

*   [Menu](#slide-out-widget-area)
    

![](https://www.tessolve.com/wp-content/uploads/2025/01/force-semicon.jpg)

[Blogs](https://www.tessolve.com/category/blogs/)

# From Concept to GDSII: A Deep Dive into the VLSI Design Flow

By [Tessolve Team](https://www.tessolve.com/author/tessolve_s2k6br/ "Posts by Tessolve Team")January 3, 2025December 29th, 2025[No Comments](https://www.tessolve.com/blogs/from-concept-to-gdsii-a-deep-dive-into-the-vlsi-design-flow/#respond)

[Blogs](https://www.tessolve.com/category/blogs/) » From Concept to GDSII: A Deep Dive into the VLSI Design Flow

The field of semiconductor technology is in a perpetual state of advancement, spurred by the growing need for more efficient, powerful, and compact electronic devices. Fundamental to this progression is the intricate process of Very Large Scale Integration (VLSI), which facilitates the development of sophisticated integrated circuits (ICs) that drive a wide array of applications, ranging from smartphones to supercomputers. The transition from an initial concept to a fully functional IC, ultimately represented in the GDSII format, follows a meticulously defined and intricate design flow. This article meticulously explores each phase of the VLSI design flow, emphasizing the crucial steps involved in translating a concept into a tangible reality.

#### **1\. Conceptualization and Specification**

Every chip design begins with a concept. Whether driven by market needs, innovation, or specific requirements from “[**chip design companies**](https://www.tessolve.com/chip-design/),” this stage involves defining the purpose and functionality of the IC. Detailed specifications are drawn up, covering aspects like performance targets, power consumption, area constraints, and cost considerations. These specifications serve as the blueprint for the VLSI design process.

At this stage, the **VLSI board design** is considered as part of the more extensive system in which the chip will operate. Integrating the chip design with the overall board design ensures compatibility and functionality within the final product. 

#### **2\. RTL Design and Verification**

Once the specifications are clear, the next step is implementing that idea into an RTL design using hardware description languages such as Verilog or VHDL. At this stage, a high-level representation of the circuit is developed, focusing on data flow and control logic with respect to signals’ timing. The RTL design is actually a crucial step in the VLSI design flow that sets up the stage for a physical implementation.

At this stage, verification undergoes a parallel execution that is of prime importance. The RTL design must be verified to ensure that it works correctly under different conditions, thereby using simulation tools. This step detects functional errors in the **VLSI design** process quite early.

#### **3\. Logic Synthesis**

Logic synthesis creates the gate-level netlist, which already represents the circuit with logic gates and flip-flops at the low level. This step illustrates the visible transition of abstract design into its concrete realization. The synthesized design must adhere to timing, power, and area constraints stipulated in a previous step. At this stage, [**VLSI design**](https://www.tessolve.com/chip-design/) tools optimize the netlist for performance and power so that the resultant product can compete with several solutions offered by **chip design companies.**

### **4\. Physical Design**

Physical design, also known as **VLSI physical design**, is where the design moves from the digital domain to the physical domain. This stage involves several key steps:

*   **Floorplanning:** The chip area is divided into blocks, with an emphasis on minimizing wire length and optimizing performance.
*   **Placement:** Components (standard cells) are placed within the designated blocks.
*   **Routing:** Electrical connections between the components are established.
*   **Clock Tree Synthesis (CTS):** The clock distribution network is designed to minimize clock skew and jitter.

Physical design is one of the most critical stages in the **VLSI design** flow. It directly impacts the manufacturability, performance, and power consumption of the final chip. At this stage, **VLSI solutions**, including advanced routing algorithms and design rule checks (DRC), come into play to ensure that the design is functional and manufacturable.

### **5\. Design for Testability (DFT)**

Before moving towards fabrication, it’s essential to incorporate test structures within the design. DFT techniques ensure that the chip can be tested for defects after manufacturing. This step adds extra layers of assurance, allowing **chip design companies** to maintain quality control and reduce the risk of costly post-production failures.

## Download Brochure

Accelerate your VLSI journey with Tessolve’s VLSI chip designs and engineering services

[Design Verification](https://www.tessolve.com/downloadpdf/design-verification/)

[Download PDF](#download-pdf)

### Case Study PDF Download

*   Name\*
    
*   Email\*
    
*   Contact Number\*
    
*   Company Name\*
    
*   Location\*
    
*   Purpose/Message\*
    
*   
*   
*   

 

 

### **6\. Timing Analysis and Power Optimization**

Timing analysis, particularly Static Timing Analysis (STA), ensures that the design meets the required timing constraints. Power optimization is performed in tandem, focusing on reducing both dynamic and static power consumption. These steps are vital to ensure that the chip meets the performance and efficiency targets set during the specification phase.

**VLSI physical design** plays a key role here, as the physical layout of the chip can significantly impact both timing and power consumption. Tools used in this phase often provide insights that guide further optimizations.

### **7\. Layout Verification**

Once the physical design is complete, the layout is verified against the original netlist to ensure accuracy. Design Rule Checking (DRC) and Layout vs. Schematic (LVS) checks are performed to confirm that the design adheres to the manufacturing process rules and that the layout matches the intended circuit.

**VLSI solutions** that automate these verification processes are crucial at this stage, enabling rapid and accurate checks that minimize the risk of errors slipping through to the final stages of the VLSI design flow.

### **8\. GDSII Generation**

The final step in the **VLSI design** flow is the generation of the GDSII file, which is the standard format used for IC manufacturing. This file contains all the information needed to produce the physical chip, including layer information, geometric shapes, and connectivity data. The GDSII file is handed over to the foundry for fabrication, marking the transition from design to production.

### The Rise of mmWave Technology: Enabling High-Speed Wireless in Automobiles

[Read More](/blogs/the-rise-of-mmwave-technology-enabling-high-speed-wireless-in-automobiles/)

### **Let’s Conclude**

The progression from concept to GDSII in VLSI design entails a multifaceted and meticulously detailed process that necessitates the concerted effort of various tools, methodologies, and proficient professionals. Each stage plays a pivotal role in shaping the end product, from the initial **VLSI board design** to the ultimate physical layout. The continuous evolution of **VLSI solutions** facilitates swifter and more effective design processes that align with the burgeoning requirements of the technology sector. **Chip design companies** rely on this resilient VLSI design flow to deliver pioneering, high-performance chips that drive the next era of electronic devices.

Comprehending the VLSI design flow is imperative for anyone engaged in semiconductor design and manufacturing. Whether an individual is a student, engineer, or an enthusiast, delving deeply into this process offers invaluable insights into the creation of the chips propelling modern technology. 

#### Flawless ASIC Design - Engineered To Life

[Contact Us](#)

[Share](# "Share this") [Share](# "Share this") [Share](# "Share this")

Table of Contents

[Toggle](#)

*   [From Concept to GDSII A Deep Dive into the VLSI Design Flow](#)
*   [1\. Conceptualization and Specification](#)
*   [2\. RTL Design and Verification](#)
*   [3\. Logic Synthesis](#)
*   [4\. Physical Design](#)
*   [5\. Design for Testability (DFT)](#)
*   [Download Brochure](#)
*   [Case Study PDF Download](#)
*   [6\. Timing Analysis and Power Optimization](#)
*   [7\. Layout Verification](#)
*   [8\. GDSII Generation](#)
*   [The Rise of mmWave Technology Enabling High-Speed Wireless in Automobiles](#)
*   [Let’s Conclude](#)
*   [Flawless ASIC Design – Engineered To Life](#)

### Related Posts

[

![Tessolve Blog ScalableFPGAPrototypingforAISoCs](https://www.tessolve.com/wp-content/uploads/2026/04/Tessolve-blog-ScalableFPGAPrototypingforAISoCs-600x403.webp)

](https://www.tessolve.com/blogs/scalable-fpga-prototyping-for-ai-socs-handling-massive-parallelism-and-bandwidth/)[Blogs](https://www.tessolve.com/category/blogs/) [Scalable FPGA Prototyping for AI SoCs: Handling Massive Parallelism and Bandwidth](https://www.tessolve.com/blogs/scalable-fpga-prototyping-for-ai-socs-handling-massive-parallelism-and-bandwidth/)

April 8, 2026

### Scalable FPGA Prototyping for AI SoCs: Handling Massive Parallelism and Bandwidth

[Tessolve Team](https://www.tessolve.com/author/tessolve_s2k6br/)

[

![Circuit Board With Microchips 1](https://www.tessolve.com/wp-content/uploads/2026/03/circuit-board-with-microchips-1-600x403.jpg)

](https://www.tessolve.com/blogs/pcb-design-challenges-in-ultra-fine-pitch-component-assembly-and-routing/)[Blogs](https://www.tessolve.com/category/blogs/) [PCB Design Challenges in Ultra-Fine Pitch Component Assembly and Routing](https://www.tessolve.com/blogs/pcb-design-challenges-in-ultra-fine-pitch-component-assembly-and-routing/)

March 23, 2026

### PCB Design Challenges in Ultra-Fine Pitch Component Assembly and Routing

[Tessolve Team](https://www.tessolve.com/author/tessolve_s2k6br/)

[

![Aerospace Engineer Visualizing Futuristic Hologram Plane With Advanced Technology 1](https://www.tessolve.com/wp-content/uploads/2026/03/aerospace-engineer-visualizing-futuristic-hologram-plane-with-advanced-technology-1-600x403.jpg)

](https://www.tessolve.com/blogs/high-reliability-testing-for-mission-critical-aerospace-automotive-electronics/)[Blogs](https://www.tessolve.com/category/blogs/) [High-Reliability Testing for Mission-Critical Aerospace & Automotive Electronics](https://www.tessolve.com/blogs/high-reliability-testing-for-mission-critical-aerospace-automotive-electronics/)

March 20, 2026

### High-Reliability Testing for Mission-Critical Aerospace & Automotive Electronics

[Tessolve Team](https://www.tessolve.com/author/tessolve_s2k6br/)

#### [About Tessolve](/about-us/)

[Careers](/careers/)

![](https://www.tessolve.com/wp-content/uploads/2026/02/GPTWC-20027.webp)

#### Solutions

[Custom silicon](/custom-silicon/)  
[VLSI Design](/chip-design/)  
[Post Silicon](/post-silicon/)  
[Embedded](https://embedded.tessolve.com)  
[PCB Design & Manufacturing](/hardware-design/)  
[Industries](https://www.tessolve.com/industries/)

#### Tessolve Labs

[Test Lab](/test-lab/)  
[Reliability & Qualification Lab](/reliability-qualification-lab/)  
[Systems Lab](/embedded-systems-lab/)  
[STPI Smart Lab](/stpi-smart-lab/)  
[CoE](/center-of-excellence/)

#### Insights

[News](/news/)  
[Blogs](/blogs/)  
[Events](/event/)  
[Brochures & White Papers](/brochure-leaflets/)  
[Case Studies  
](/case-studies/)

#### Connect with us

[![](https://www.tessolve.com/wp-content/uploads/2025/05/linkdin.svg)](https://www.linkedin.com/company/tessolve-services-pvt-ltd)

[![](https://www.tessolve.com/wp-content/uploads/2025/05/twetter.svg)](https://x.com/tessolve_)

[![](https://www.tessolve.com/wp-content/uploads/2025/05/facebook123.svg)](https://www.facebook.com/tessolve)

[![](https://www.tessolve.com/wp-content/uploads/2025/05/instagram-a.svg)](https://www.instagram.com/tessolve_/)

[![](https://www.tessolve.com/wp-content/uploads/2025/05/youtube-r.svg)](https://www.youtube.com/@tessolve56)

Subscribe Our Newsletter 

Copyright © 2026 Tessolve | [Privacy Policy](/privacy-policy/) | [Cookies Policy](/cookies-policy/) | [Sitemap](https://tessolve.com/sitemap/)

[Close Menu](#)

*   [Semiconductor Solutions](/semiconductor-solutions/)
    *   [Custom Silicon](/custom-silicon/)
        *   [VLSI Design](/chip-design/)
            *   [RTL Design](/chip-design/#rtl-design)
            *   [Analog & Mixed Signal (AMS) Design](/chip-design/#analog-mixed-signal)
            *   [Design Verification](/chip-design/#design-verification)
            *   [Design for Test (DFT)](/chip-design/#design-for-test-and-debug)
            *   [Physical Design](/chip-design/#physical-design)
            *   [FPGA Emulation](/chip-design/#fpga-emulation)
            *   [Foundry Porting Services](/chip-design/#foundry-porting-services)
    *   [Post Silicon](/post-silicon/)
        *   [Test Engineering](/test-engineering/)
        *   [Product Engineering](/product-engineering/)
        *   [PCB Design & Manufacturing](/hardware-design/)
        *   [Package Engineering](/package-engineering/)
    *   [Chip-image](#)
*   [Dream Chip](https://www.dreamchip.de/)
*   [Embedded](/embedded)
*   [Industries](https://www.tessolve.com/industries/)
    *   [Automotive](/automotive-industry/)
        *   [Avionics](/avionics/)
        *   [AI Solutions](/ai-solutions/)
        *   [Data Center/Enterprise](/data-center-industry/)
        *   [Industrial](/industrial/)
        *   [Semiconductor](/semiconductor-focused-domains/)
    *   [Industries-menu IMG](#)
*   Labs
    *   [t-lab-ptitle](#)
        *   [Test Lab](/test-lab/)
        *   [Test Lab](/test-lab/)
        *   [HSIO Lab](https://www.tessolve.com/hsio-lab/)
        *   [Reliability & Qualification Lab](/reliability-qualification-lab/)
        *   [STPI Smart Lab](/stpi-smart-lab/)
        *   [Embedded Systems Lab](/embedded-systems-lab/)
        *   Embedded Software Lab
        *   [Automotive Software](https://embedded.tessolve.com/automotive-software-lab)
        *   [Post Silicon Validation](https://embedded.tessolve.com/post-silicon-validation-lab)
        *   [Wireless Testing](https://embedded.tessolve.com/wireless-testing-lab)
        *   [CoE](/center-of-excellence/)
    *   [Tessolve-Lab-Image](#)
*   Company
    *   [com-title](#)
        *   [About Us](/about-us/)
        *   [Leadership](/leadership/)
        *   [Board of Directors](/board-of-directors/)
        *   [Partners](/partners/)
        *   [Quality](/quality/)
    *   [company-image](#)
*   [Careers](/careers/)
*   [Insight](#)
    *   [Insights-title](#)
        *   [News](/news/)
        *   [Blogs](https://www.tessolve.com/blogs/)
        *   [Events](https://www.tessolve.com/events/)
        *   [Events](https://www.tessolve.com/events/)
            *   [─Test Club](/test-club-latest-silicon-test-strategies-and-techniques/)
            *   [─Verification Futures](/verification-futures/)
            *   [─Webinar](/ai-in-verification-webinar/)
        *   [Brochures](/brochure-leaflets/)
        *   [Case Studies](/case-studies/)
        *   [Videos](https://www.tessolve.com/videos/)
    *   [Insights-image](#)
*   [Contact](/contact-us/)

*   [Semiconductor Solutions](/semiconductor-solutions/)
    *   [ASIC](https://www.tessolve.com/?page_id=29643)
    *   [Chip Design](/chip-design/)
        *   [Analog & Mixed Signal (AMS) Design](/chip-design/#analog-mixed-signal/)
        *   [RTL Design](/chip-design/#rtl-design/)
        *   [Design Verification](/chip-design/#design-verification/)
        *   [Design for Test (DFT)](/chip-design/#design-for-test-and-debug)
        *   [Physical Design](/chip-design/#physical-design)
        *   [FPGA Emulation](/chip-design/#fpga-emulation/)
        *   [Foundry Porting Services](/chip-design/#foundry-porting-services)
    *   [Post Silicon](/post-silicon/)
        *   [Test Engineering](/test-engineering/)
        *   [Product Engineering](/product-engineering/)
    *   [Hardware Design & Manufacturing](/hardware-design/)
    *   [Package Engineering](/package-engineering/)
*   [Embedded System](/embedded-systems/)
    *   [Turnkey Product Development](/turnkey-product-development/)
    *   [SOM & EVK](/embedded-systems/#SOM-EVK)
        *   [NXP](/nxp/)
        *   [Qualcomm](/qualcomm/)
        *   [Mediatek](/mediatek/)
        *   [Texas Instrument](/texas-instruments/)
    *   [Embedded Design Services](/embedded-design-services/)
        *   [Firmware /Software](/embedded-design-services/#embedded-firmware)
        *   [FPGA](/embedded-design-services/#fpga)
        *   [Hardware](/embedded-design-services/#hardware)
    *   [Embedded Software](/embedded-software/)
        *   [Automotive Software](/automotive-software-services/)
        *   [Post Silicon Validation](/post-silicon-validation/)
        *   [Embedded Software Services](/embedded-software-services/)
*   [Industries](https://www.tessolve.com/industries/)
    *   [Automotive](/automotive-engineering-services/)
        *   [Automotive Embedded](/automotive-engineering-services/)
        *   [TERA](/tera/)
    *   [Avionics](/avionics/)
    *   [Data Center/Enterprise](/data-center-industry/)
    *   [Industrial](/industrial/)
        *   [Industrial Embedded](/industrial-embedded/)
        *   [IoT](/iot/)
    *   [Semiconductor](/semiconductor-focused-domains/)
*   [Tessolve Labs](#)
    *   [Test Lab](/test-lab/)
    *   [Reliability & Qualification Lab](/reliability-qualification-lab/)
    *   [Systems Lab](/systems-lab/)
    *   [STPI Smart Lab](/stpi-smart-lab/)
    *   [Wireless Testing](https://embedded.tessolve.com/wireless-testing-lab/)
    *   [CoE](/center-of-excellence/)
*   [Company](#)
    *   [About Us](/about-us/)
    *   [Leadership](/leadership/)
    *   [Partners](/partners/)
    *   [Board of Directors](/board-of-directors/)
    *   [Quality](/quality/)
    *   [Career](/careers/)
*   [Insight](#)
    *   [News](/news/)
    *   [Thought Leadership Blogs](/thought-leaderships/)
    *   [Events](/event/)
        *   [DVClub](/dvclub/)
        *   [Verification Futures](/verification-futures/)
    *   [Brochures & White Papers](/brochure-leaflets/)
    *   [Case Studies](/case-studies/)
*   [Contact](/contact-us/)

[](#)

*   Name\*
    
*   Email\*
    
*   Contact Number\*
    
*   Company Name\*
    
*   Location\*
    
*   Purpose/Message\*
    
*   
*   
*   

CLOSE

Get In Touch

*   
*   
*   
*   
*   Job Title/Position\*CEO/CTO/CXODirectorOwner/PartnerPresidentVice-PresidentManagerConsultantEngineer/DeveloperOther
    
*   

*   
*   

X

### College TPO’s

*   College Name\*
    
*   TPO Email ID\*
    
*   Industrial visit\*Select Industrial VisitSTE programCampus hiringoff-campus hiring
    
*   Message
    
*   

X

**Error:** Contact form not found.

**Error:** Contact form not found.

CLOSE

×

## ML Verification Turns Convention on its Head

The verification of processor architectures designed for Machine Learning (ML) applications represent a departure from conventional techniques. Conventional constrained random testbenches, which focus on stimulus driving coverage, cannot scale for many ML algorithm realizations. ML architectures involve neural networks of processors that “learn” by manipulating coefficients across the network to match ideal outputs to a large quantity of input data. Furthermore, smart compiler technology is employed to leverage the many paths available in the network. An effective verification strategy can leverage planning algorithms that start with the desired output and optimize input values to achieve that output. Ensuring the paths that the compiler might trigger have all been tested, and that the test content can scale from individual processors to the entire network are critical challenges. Breker will share various approaches to this problem, developed through cooperation with three noted AI processor providers.

**3 Key Points:**

*   Current verification methodologies cannot scale to meet ML processor challenges
*   ML verification approach: consider desired outputs, optimize inputs to match
*   Test Suite Synthesis enable planning algorithm approach to target ML requirements

×

## An Emulation Strategy for Artificial Intelligence Designs

The emergence of Artificial Intelligence is the “next big thing” and presents a unique opportunity for disruptive semiconductor development. End applications could range from ADAS, to 3D facial recognition, to voice and image processing, or to intelligent search. The SoCs for AI applications whether targeted for training or inference will have their own unique characteristics, but present quite common verification challenges that we will present in this session.

Supporting designs as big as 15 billion gates, Mentor’s Veloce Strato has unique virtualization capabilities that enable highly accurate pre-silicon execution of AI benchmarking applications like MLPerf. The Veloce Power App enables analysis of peak and average. We will cover how Veloce Strato and its supporting solutions are the best tool to help address the verification challenges of SoCs targeted for AI applications.

**3 Key Points:**

*   Deterministic solution for AI chips verification
*   Full virtual solution for HW/SW verification
*   TERAOPS/Watt assessement prior silicon availability

×

## AI chips must get the math right

Most AI chips and hardware accelerators that power machine learning (ML) and deep learning (DL) applications include floating-point units (FPUs). Algorithms used in neural networks are often based on operations that use multiplication and addition of floating-point values. FPUs are difficult to implement. The IEEE 754 standard defines many corner-case scenarios and non-ordinary values. Even a minor rounding mistake could accumulate over many iterations and produce a large error. An FPU formal verification app compliant with IEEE-754 provides an efficient and rigorous solutions to FPU functional verification

**3 Key Points:**

*   Floating-point unit (FPU) for AI chips
*   FPU Formal Verification App
*   Compliance with IEEE-754

×

**Name:** Mike Bartley

**Designation:** Senior Vice President – VLSI Design

**Title:** Introduction

**Biography:**

Mike Bartley has a PhD in Mathematics from Bristol University, an MSc in Software Engineering, an MBA from the Open University and over 25 years of experience in software testing and hardware verification. He has built and managed state-of-the-art test and verification teams in a number of companies who still use the methodologies he established. Since founding TVS in 2008 he has grown the company to over 100 employees worldwide. Dr Bartley is Chair of both the Bristol branch of the British Computer Society and the West of England Bristol Local Enterprise Partnership (LEP). He has had over 50 articles and presentations published on the subjects of hardware verification, software testing and outsourcing.

×

## Please fill the form below

×

## Please fill the form below

×

## Please fill the form below

×

## Please fill the form below

×

## Please fill the form below

**Error:** Contact form not found.

×

## Please fill the form below

×

## Please fill the form below

×

SUBMIT RESUME

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

**Error:** Contact form not found.

×

SUBMIT YOUR RESUME

