import { motion } from "framer-motion";
import { PROJECTS } from "../constants";

const Projects = () => {
  return (
    <div id="projects" className="border-b border-neutral-900 pb-4">
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="my-20 text-4xl text-center"
      >
        Projects
      </motion.h2>
      <div>
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: index * 0.2 // Staggered effect
            }}
            className="mb-8 flex flex-wrap lg:justify-center"
          >
            <div className="w-full lg:w-3/4">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-neutral-100 hover:underline"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.a>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index * 0.2) + 0.2 }}
              >
                {project.description}
              </motion.p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut",
                      delay: (index * 0.2) + (techIndex * 0.1) + 0.4 // Additional stagger for tech tags
                    }}
                    className="rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;