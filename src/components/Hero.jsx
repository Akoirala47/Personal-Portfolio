import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/aayushKoiralaProfile.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div id="hero" className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              initial={{ x: -200, opacity: 0 }} // Start further left
              animate={{ x: 0, opacity: 1 }}   // Move to original position
              transition={{ 
                duration: 1.2,    // Increase duration for smoothness
                ease: "easeOut"   // Smooth easing function
              }}
              className="pb-16 text-6xl tracking-tight font-thin lg:mt-16 lg:text-8xl"
            >
              Aayush Koirala
            </motion.h1>
            <motion.span
              initial={{ x: -200, opacity: 0 }} // Start further left
              animate={{ x: 0, opacity: 1 }}   // Move to original position
              transition={{ 
                duration: 1.2, 
                ease: "easeOut", 
                delay: 0.3   // Delay for staggered effect
              }}
              className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent"
            >
              Software Engineer
            </motion.span>
            <motion.p
              initial={{ x: -200, opacity: 0 }} // Start further left
              animate={{ x: 0, opacity: 1 }}   // Move to original position
              transition={{ 
                duration: 1.2, 
                ease: "easeOut", 
                delay: 0.6   // Delay for staggered effect
              }}
              className="my-2 max-w-xl py-6 font-light tracking-tighter"
            >
              {HERO_CONTENT}
            </motion.p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img
              initial={{ x: 200, opacity: 0 }} // Start further right
              animate={{ x: 0, opacity: 1 }}   // Move to original position
              transition={{ 
                duration: 1.2, 
                ease: "easeOut"    // Smooth easing function
              }}
              className="rounded-2xl"
              src={profilePic}
              alt="Aayush Koirala"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
