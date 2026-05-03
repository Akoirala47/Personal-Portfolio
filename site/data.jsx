// Data file for portfolio content.

const PROFILE = {
  name: "Aayush Koirala",
  handle: "akoirala47",
  role: "CS @ UMass · SWE · Building with AI",
  email: "aayush.k204@gmail.com",
  github: "https://github.com/Akoirala47",
  linkedin: "https://www.linkedin.com/in/aayush-koirala-aa3a46222/",
  resume: "assets/Aayush_Koirala_Resume.pdf",
  pfp: "assets/pfp.png",
  location: "Maynard, Massachusetts",
  joined: "2022",
  bio: "CS student at UMass Amherst (May '26). Building full-stack apps and AI tools — from iOS language learning to on-device macOS transcription. Most recently at Walmart Global Tech, scaling digital signage APIs to 40M+ daily requests on Azure Kubernetes.",
  stats: {
    following: 142,
    followers: 1284,
    likes: "12.4K",
  },
};

const EXPERIENCES = [
  {
    id: "exp1",
    role: "Software Engineer Intern",
    company: "Walmart Global Tech",
    type: "Internship",
    location: "Bentonville, Arkansas",
    start: "May 2025",
    end: "Aug 2025",
    duration: "4 mo",
    summary:
      "Led end-to-end development of a real-time digital signage preview feature, eliminating 8+ hours of weekly stakeholder demo time. Scaled backend APIs to 40M+ daily requests on Azure Kubernetes, cutting deployment incidents by 30%. Shipped 50+ Jest tests with 95% coverage.",
    stack: ["Next.js", "TypeScript", "Java Spring Boot", "Azure Kubernetes", "Jest"],
    likes: 284,
  },
  {
    id: "exp2",
    role: "Software Engineer Intern",
    company: "Arctex",
    type: "Internship",
    location: "Remote",
    start: "Sep 2024",
    end: "Dec 2024",
    duration: "4 mo",
    summary:
      "Built CollegeAppAssist, an AI-powered Chrome extension improving response accuracy by 30% and reducing response time by 20%. Led Agile sprints in JIRA and refactored core services in Python, boosting overall application efficiency by 25%.",
    stack: ["React.js", "Express.js", "ChatGPT API", "Python", "JIRA"],
    likes: 192,
  },
  {
    id: "exp3",
    role: "Undergraduate Research Assistant",
    company: "University of Massachusetts Amherst",
    type: "Research",
    location: "Amherst, MA",
    start: "Jun 2024",
    end: "Aug 2024",
    duration: "3 mo",
    summary:
      "Researched ML security under a PhD student. Analyzed 5 large-scale datasets and built 12 ML models. Optimized 6+ neural architectures (LeNet → MobileNet) achieving 15% performance gain and 12% accuracy boost via hyperparameter tuning; cut training time 30% through parallel processing.",
    stack: ["Python", "Jupyter Notebook", "PyTorch", "TensorFlow", "ResNet", "MobileNet"],
    likes: 156,
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
    title: "tong",
    tag: "iOS · AI",
    blurb:
      "ACTFL-aligned language learning iOS app with 5 pedagogical loops — micro-lessons, AI review, and Elo-rated duels. Whisper V3 + DeepSeek audio pipelines via Deno Edge; Supabase backend for real-time 1-on-1 video sessions over WebRTC.",
    color: "purple",
    stars: 8,
    likes: 134,
    github: null,
  },
  {
    id: "p3",
    title: "chef-krish",
    tag: "web · AI",
    blurb:
      "Personalized dietary advice web app powered by LLAMA 3.1 via OpenRouter API, Firebase Auth, and Firestore. Stores full chat history so users can revisit and refine preferences over time.",
    color: "orange",
    stars: 5,
    likes: 62,
    github: null,
  },
  {
    id: "p4",
    title: "ohara-library",
    tag: "fullstack",
    blurb:
      "Manga database with 2,000+ titles built on Django, PostgreSQL, and a Kaggle dataset. React frontend with advanced search and filtering — built for browsability.",
    color: "purple",
    stars: 3,
    likes: 29,
    github: null,
  },
  {
    id: "p5",
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
