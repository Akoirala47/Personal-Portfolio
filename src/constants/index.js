import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";

export const HERO_CONTENT = `I’m a Computer Science student at UMass Amherst with a knack for building scalable, innovative web applications. I’ve worked with React.js, Next.js, Node.js, and Express.js to create responsive, user-friendly solutions, and I’m comfortable managing data with PostgreSQL, MongoDB, and Firebase Firestore. My projects, like Chef Krish and the Inventory Management Web App, highlight my ability to integrate AI (LLAMA 3.1) and image classification (MobileNet) into practical, user-centric tools. With a solid foundation in Python, JavaScript, and Java, I’m passionate about crafting impactful solutions that push the boundaries of what technology can do.`;

export const ABOUT_TEXT = `Beyond coding, I’m passionate about the intersection of technology and ethics, especially in AI and machine learning. My research in ML security at UMass Amherst taught me not just how to optimize models, but also how to think critically about their impact. I thrive in collaborative environments, love tackling complex problems, and am always eager to learn and grow. For me, technology isn’t just about building things, it’s about creating solutions that make a difference.`;

export const EXPERIENCES = [
  {
    year: "Fall 2024",
    role: "Software Engineer Intern",
    company: "Arctex",
    description: `Developed CollegeAppAssist, an AI-powered Chrome extension using React.js, Tailwind CSS, and ChatGPT API to streamline the college application process for students. Applied agile methodologies to deliver a user-friendly tool that significantly improved efficiency.`,
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "Express.js", "ChatGPT API", "Agile Methodologies"],
  {
    year: "Summer 2024",
    role: "Undergraduate Research Assistant",
    company: "University of Massachusetts Amherst, (CICS)",
    description: `Conducted research focused on Machine Learning (ML) security under the guidance of a graduate leader.`,
    technologies: ["Machine Learning", "Python", "Jupyter Notebooks"],
  },
  {
    year: "Summer 2024",
    role: "Software Engineer Fellow",
    company: "Headstarter AI",
    description: `Participated in a 7-week software engineering fellowship focusing on building 5 AI projects, 5 weekend hackathons, and a final project. Engaged in interview prep, resume reviews, and received feedback from real software engineers. Currently working on a final project aimed at raising $1000+ with 1000+ users.`,
    technologies: ["AI", "NextJs", "NodeJs", "React", "MongoDb", "PostgresSQL", "TailwindCSS"]
  },
  {
    year: "Summer 2022",
    role: "Student",
    company: "SoarCS",
    description: `Participated in a pre-semester program, SoarCS, enhancing coding skills and networking with fellow students. Attended Red Hat's DevConf.US conference.`,
    technologies: ["C", "Python"],
  },
  {
    year: "Jan 2021 - Sep 2022",
    role: "Teacher",
    company: "Elevate the Future Massachusetts",
    description: `Taught computer science and business principles to over 300 middle and high school students with a team. Led a 6-week introductory Python programming course and introduced data structures concepts.`,
    technologies: ["Python"],
  },
];

export const PROJECTS = [
  {
    title: "Chef Krrish",
    image: null, 
    description: 
      "Developed a web app integrating Firebase Authentication, Firestore for user management, and OpenRouter API with LLaMA 3.1 model to provide personalized dietary advice.",
    technologies: ["React", "Next.js", "Firebase", "OpenRouter API", "LLaMA 3.1"],
    github: "https://github.com/Akoirala47/chatbot",
    website: "https://chefkrrish.vercel.app/",
  },
  {
    title: "Inventory Management Web App",
    image: null,
    description: 
      "This React project is a Web-application for managing inventory. Users can log in with Google and view, edit, and add items to their inventory. They can also import their inventory from a CSV file.",
    features: [
      "User authentication with Google Firebase",
      "Real-time inventory data management with Firestore",
      "CRUD operations for inventory items (Create, Read, Update, Delete)",
      "Search functionality for filtering inventory items",
      "Inventory overview with total items, low stock, and out of stock counts",
      "CSV import for bulk adding inventory items",
      "Animations with Framer Motion",
      "Image classification for inventory items using MobileNet"
    ],
    technologies: ["React", "Next.js", "Firebase", "Framer Motion", "CSV parsing library", "TensorFlow.js"],
    github: "https://github.com/Akoirala47/pantry",
    website: "https://grocereaseinv.vercel.app/",
  },
  {
    title: "Personal Portfolio",
    image: null, 
    description: 
      "Welcome to my Personal Portfolio! This project showcases my skills, experiences, and projects through an interactive and visually engaging web application. Built with React and Vite, this portfolio offers a seamless browsing experience with modern features and responsive design.",
    technologies: ["React, Vite, Tailwind CSS, Framer Motion, JavaScript"],
    github: "https://github.com/Akoirala47/Personal-Portfolio",
    website: "https://aayushkoirala.vercel.app/",
  },
  {
    title: "Ohara Manga Library",
    image: project1,
    description:
      "Developed a full-stack Django project creating a library website with a database of 24,165 Animes and 67,273 Mangas. Features genre-based top 100 lists and search functionality.",
    technologies: ["Django", "PostgreSQL", "Python"],
    github: "https://github.com/AKSProjects/mangarep", 
  },
  {
    title: "Hangman",
    image: project2,
    description:
      "Created a Hangman game using C on Linux, implementing data structures like AVL tree, vector structures, and an associative array.",
    technologies: ["C", "Linux"],
    github: "https://github.com/aayushkoi/Hangman",
  }
];

export const CONTACT = {
  address: "Maynard, Massachusetts",
  phoneNo: "781-392-7903",
  email: "aayush.k204@gmail.com",
};
