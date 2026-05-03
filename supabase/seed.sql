-- Seed data for portfolio website
-- Run this AFTER schema.sql in the Supabase SQL Editor

-- Experiences
insert into experiences (role, company, type, location, start_date, end_date, duration, summary, stack, likes, display_order) values
(
  'Software Engineer Intern',
  'Walmart Global Tech',
  'Internship',
  'Bentonville, AR',
  'May 2025',
  'Aug 2025',
  '4 mo',
  'Led end-to-end development of a real-time digital signage preview feature, eliminating 8+ hours of weekly stakeholder demo time. Scaled backend APIs to 40M+ daily requests on Azure Kubernetes, cutting deployment incidents by 30%. Shipped 50+ Jest tests with 95% coverage.',
  array['Next.js', 'TypeScript', 'Java Spring Boot', 'Azure Kubernetes', 'Jest'],
  284,
  0
),
(
  'Software Engineer Intern',
  'Arctex',
  'Internship',
  'Remote',
  'Sep 2024',
  'Dec 2024',
  '4 mo',
  'Built CollegeAppAssist, an AI-powered Chrome extension improving response accuracy by 30% and reducing response time by 20%. Led Agile sprints in JIRA and refactored core services in Python, boosting overall application efficiency by 25%.',
  array['React.js', 'Express.js', 'ChatGPT API', 'Python', 'JIRA'],
  192,
  1
),
(
  'Undergraduate Research Assistant',
  'UMass Amherst',
  'Research',
  'Amherst, MA',
  'Jun 2024',
  'Aug 2024',
  '3 mo',
  'Researched ML security under a PhD student. Analyzed 5 large-scale datasets and built 12 ML models. Optimized 6+ neural architectures (LeNet through MobileNet) achieving 15% performance gain and 12% accuracy boost via hyperparameter tuning.',
  array['Python', 'Jupyter Notebook', 'PyTorch', 'TensorFlow', 'ResNet', 'MobileNet'],
  156,
  2
);

-- Projects
insert into projects (title, tag, blurb, color, stars, likes, github_url, pinned, display_order) values
(
  'echos',
  'macOS · AI',
  'Local-first macOS app that records lectures and meetings, transcribes on-device with Whisper large-v3 (Apple Silicon MPS), and generates structured Obsidian notes via Gemini. Your audio never leaves your Mac.',
  'orange',
  1,
  47,
  'https://github.com/Akoirala47/Echos',
  true,
  0
),
(
  'tong',
  'iOS · AI',
  'ACTFL-aligned language learning iOS app with 5 pedagogical loops — micro-lessons, AI review, and Elo-rated duels. Whisper V3 + DeepSeek audio pipelines via Deno Edge; Supabase backend for real-time 1-on-1 video sessions over WebRTC.',
  'purple',
  8,
  134,
  null,
  false,
  1
),
(
  'chef-krish',
  'web · AI',
  'Personalized dietary advice web app powered by LLAMA 3.1 via OpenRouter API, Firebase Auth, and Firestore. Stores full chat history so users can revisit and refine preferences over time.',
  'orange',
  5,
  62,
  null,
  false,
  2
),
(
  'ohara-library',
  'fullstack',
  'Manga database with 2,000+ titles built on Django, PostgreSQL, and a Kaggle dataset. React frontend with advanced search and filtering.',
  'purple',
  3,
  29,
  null,
  false,
  3
),
(
  'this-website',
  'fun',
  'The portfolio you''re looking at. Built in a weekend because the previous one was a Notion page.',
  'orange',
  12,
  88,
  'https://github.com/Akoirala47/Personal-Portfolio',
  false,
  4
);

-- Posts
insert into posts (title, excerpt, read_time, likes, published_at) values
(
  'My current stack (2025)',
  'Next.js 15 for the frontend, Supabase for the backend, Vercel for deploys. Simple, fast, and I know all the tools. Here''s what I''d change and what I wouldn''t.',
  '5 min read',
  87,
  now()
),
(
  'What I learned building Echos',
  'Local AI on Apple Silicon is genuinely good now. Whisper large-v3 on MPS is fast enough for real-time transcription. The hard part was the Obsidian vault sync, not the ML.',
  '8 min read',
  143,
  now() - interval '7 days'
);
 