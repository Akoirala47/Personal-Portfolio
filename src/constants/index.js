import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";

export const HERO_CONTENT = `I am a dedicated Software Developer with a passion for creating dynamic and scalable web applications. With hands-on experience in both front-end and back-end technologies, I excel in using React, Next.js, and Node.js to build responsive user interfaces and efficient server-side applications. My expertise extends to database management with PostgreSQL and MongoDB, ensuring robust data handling and storage solutions. I am committed to leveraging my skills in JavaScript, TypeScript, C, Python, and various other programming languages to deliver innovative solutions that enhance user experiences and drive business success.`;

export const ABOUT_TEXT = `I am a dedicated and versatile Software Developer with a passion for creating efficient and user-friendly web applications. With a few years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. During my time at the University of Massachusetts Amherst, I conducted research focused on Machine Learning security, working closely with a graduate leader to explore innovative solutions in this field. This experience not only honed my technical skills but also deepened my understanding of the ethical and security implications in AI and machine learning. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions.`;

export const EXPERIENCES = [
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
