import { motion } from "framer-motion";
import resume from "../assets/aayushKoiralaResume.pdf";

const Resume = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="my-20 text-4xl text-center"
      >
        Resume
      </motion.h2>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}  // Start scaled down and invisible
        whileInView={{ scale: 1, opacity: 1 }} // Animate to normal size and visible
        viewport={{ once: true }} // Animation occurs only once when the element comes into view
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center my-8"
      >
        <iframe
          src={resume}
          width="80%"
          height="900px"
          className="border rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default Resume;
