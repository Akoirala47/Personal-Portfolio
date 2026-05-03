// Data file for portfolio content.

const PROFILE = {
  name: "Aayush Koirala",
  handle: "akoirala47",
  role: "ML Engineer · Building agentic systems",
  email: "aayush.k204@gmail.com",
  github: "https://github.com/Akoirala47",
  linkedin: "https://www.linkedin.com/in/aayush-koirala-aa3a46222/",
  resume: "assets/Aayush_Koirala_Resume.pdf",
  pfp: "assets/pfp.png",
  location: "United States",
  joined: "2024",
  bio: "ML eng working on agentic LLM workflows, retrieval pipelines, and the boring infra that makes them not fall over in production. Currently obsessed with the Forward-Forward algorithm and why backprop might not be the end of the road.",
  stats: {
    following: 142,
    followers: 1284,
    likes: "12.4K",
  },
};

const EXPERIENCES = [
  {
    id: "exp1",
    role: "ML Engineer",
    company: "Anthropic-adjacent startup",
    type: "Full-time",
    location: "Remote",
    start: "Jan 2025",
    end: "Present",
    duration: "1 yr 3 mo",
    summary:
      "Leading the agent runtime team. Built a multi-step planning loop that reduced tool-call hallucinations by 47% on internal eval suite.",
    stack: ["Python", "PyTorch", "Modal", "Postgres", "TypeScript"],
    likes: 284,
  },
  {
    id: "exp2",
    role: "Machine Learning Research Intern",
    company: "Quantitative trading firm",
    type: "Internship",
    location: "New York, NY",
    start: "May 2024",
    end: "Aug 2024",
    duration: "4 mo",
    summary:
      "Trained transformer-based price-prediction models on tick-level data. Shipped a low-latency inference path that hit p99 of 1.2ms.",
    stack: ["JAX", "C++", "kdb+", "Triton"],
    likes: 192,
  },
  {
    id: "exp3",
    role: "Software Engineer",
    company: "Robotics lab",
    type: "Part-time",
    location: "Hybrid",
    start: "Sep 2023",
    end: "Apr 2024",
    duration: "8 mo",
    summary:
      "Wrote vision-language pipelines for indoor navigation. Authored a paper on sim-to-real grounding accepted at a CoRL workshop.",
    stack: ["ROS2", "Python", "OpenCV", "CUDA"],
    likes: 156,
  },
  {
    id: "exp4",
    role: "Undergraduate Researcher",
    company: "University ML lab",
    type: "Research",
    location: "On-site",
    start: "Jan 2023",
    end: "Aug 2023",
    duration: "8 mo",
    summary:
      "Reproduced the Forward-Forward paper on CIFAR-10. Probed where local objectives break down at scale; co-authored a tech report.",
    stack: ["PyTorch", "Lightning", "Weights & Biases"],
    likes: 98,
  },
];

const PROJECTS = [
  {
    id: "p1",
    title: "echos",
    tag: "macOS · AI",
    blurb:
      "Local-first macOS app that records lectures and meetings, transcribes on-device with Whisper large-v3 (Apple Silicon MPS), and generates structured Obsidian notes via Gemini. Your audio never leaves your Mac.",
    color: "orange",
    stars: 1,
    likes: 47,
    pinned: true,
    github: "https://github.com/Akoirala47/Echos",
  },
  {
    id: "p2",
    title: "ff-net",
    tag: "research",
    blurb:
      "PyTorch implementation of Hinton's Forward-Forward algorithm with goodness-based local objectives, plus a writeup on where it falls over.",
    color: "purple",
    stars: 412,
    likes: 803,
    github: null,
  },
  {
    id: "p3",
    title: "retrieval-lab",
    tag: "RAG",
    blurb:
      "Benchmark + viewer for hybrid retrieval strategies. Compares dense, sparse, ColBERT, and reranking on 12 corpora side-by-side.",
    color: "orange",
    stars: 1108,
    likes: 522,
    github: null,
  },
  {
    id: "p4",
    title: "dot-dot-dot",
    tag: "tool",
    blurb:
      "CLI that watches your codebase and proposes refactors via a local Sonnet pipeline. Works offline once primed.",
    color: "purple",
    stars: 689,
    likes: 410,
    github: null,
  },
  {
    id: "p5",
    title: "graph-walker",
    tag: "infra",
    blurb:
      "Knowledge-graph traversal as a first-class agent action. Beats vanilla RAG on multi-hop QA by 18 points (HotpotQA).",
    color: "orange",
    stars: 524,
    likes: 287,
    github: null,
  },
  {
    id: "p6",
    title: "mini-mlx",
    tag: "education",
    blurb:
      "200-line autodiff engine + transformer impl on Apple Silicon. Exists to teach, not to compete.",
    color: "purple",
    stars: 1893,
    likes: 940,
    github: null,
  },
  {
    id: "p7",
    title: "this-website",
    tag: "fun",
    blurb:
      "The portfolio you're looking at. Built in a weekend because the previous one was a Notion page.",
    color: "orange",
    stars: 12,
    likes: 88,
    github: "https://github.com/Akoirala47/Personal-Portfolio",
  },
];

const POSTS = [
  {
    id: "post1",
    title: "Why current SOTAs suck (and what Forward-Forward might fix)",
    excerpt:
      "Backprop is structurally fine — but biologically implausible, hard to parallelize across devices without ugly tricks, and it leaks gradients across an entire network for what is often a very local update. Hinton's Forward-Forward proposes treating each layer as its own little classifier with a goodness function. I've spent the last month reproducing it on CIFAR-10 and small text tasks. Here's what worked, what didn't, and where I think it stops scaling.",
    date: "Apr 22, 2026",
    readTime: "11 min read",
    likes: 412,
    comments: [
      {
        author: "@hinton-fan",
        text: "The locality argument is the most underrated part of FF. Backprop's memory cost is mostly an artifact of needing the full activation graph.",
        time: "2d",
        likes: 28,
      },
      {
        author: "@gradient-skeptic",
        text: "Did you try mixing FF with a tiny BP head at the end? That's where I got the most mileage.",
        time: "1d",
        likes: 14,
      },
      {
        author: "@akoirala47",
        text: "@gradient-skeptic yes — covered in section 4. The hybrid is genuinely the only thing that scales past ~30M params in my runs.",
        time: "1d",
        likes: 41,
        author_self: true,
      },
    ],
  },
  {
    id: "post2",
    title: "My current agentic LLM stack (April 2026)",
    excerpt:
      "Sonnet 4.5 for planning, Haiku for the wide fan-out tool calls, a tiny rerank model on top of BM25 + a dense index, and Modal for the runtime. The whole thing runs on roughly $0.04 per non-trivial task. Here's the architecture diagram, the prompt skeleton, and the eval suite I use to keep myself honest.",
    date: "Apr 14, 2026",
    readTime: "8 min read",
    likes: 287,
    comments: [
      {
        author: "@indie-ml",
        text: "What's your retry policy when the tool call fails validation? That's been my main pain.",
        time: "5d",
        likes: 9,
      },
    ],
  },
  {
    id: "post3",
    title: "Reading notes: 'Mechanistic Interpretability of Sparse Autoencoders'",
    excerpt:
      "Walked through the recent Anthropic paper on cross-layer SAEs. The most interesting result isn't the features themselves — it's that feature *circuits* compose more cleanly across layers than I expected. Notes, diagrams, and a small replication of figure 4 on a 1.5B model.",
    date: "Apr 03, 2026",
    readTime: "14 min read",
    likes: 198,
    comments: [],
  },
  {
    id: "post4",
    title: "Stop reaching for RAG. Try graph-walking first.",
    excerpt:
      "Most multi-hop questions don't need vector similarity — they need traversal. I've been replacing vanilla RAG with a small graph-walker agent for our internal docs and the win on multi-hop questions is large enough that I'm now skeptical of every RAG benchmark.",
    date: "Mar 21, 2026",
    readTime: "6 min read",
    likes: 521,
    comments: [
      {
        author: "@vector-truther",
        text: "This is the take. RAG became the default for the wrong reason — it was the easiest thing to build, not the best fit.",
        time: "1mo",
        likes: 67,
      },
      {
        author: "@graph-curious",
        text: "Open-sourcing the walker?",
        time: "1mo",
        likes: 12,
      },
      {
        author: "@akoirala47",
        text: "@graph-curious yep — see graph-walker on my projects tab.",
        time: "1mo",
        likes: 22,
        author_self: true,
      },
    ],
  },
  {
    id: "post5",
    title: "Things I wish I knew before training my first transformer",
    excerpt:
      "Don't trust the loss curve in the first 500 steps. Always log gradient norms. Your batch size is probably wrong. The optimizer is not the bottleneck — your data is. Six lessons I keep re-learning, with concrete debugging traces.",
    date: "Mar 09, 2026",
    readTime: "5 min read",
    likes: 644,
    comments: [
      {
        author: "@first-time-trainer",
        text: "The 'log gradient norms' tip alone saved me a week. Wish someone had told me sooner.",
        time: "2mo",
        likes: 31,
      },
    ],
  },
];

Object.assign(window, { PROFILE, EXPERIENCES, PROJECTS, POSTS });
