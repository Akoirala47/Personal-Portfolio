import React, { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiTailwindcss, SiJupyter } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";

const Technologies = () => {
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this value based on your breakpoint
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleTouchStart = (e) => {
        scrollContainerRef.current.dataset.startX = e.touches[0].clientX;
        scrollContainerRef.current.dataset.scrollLeft = scrollContainerRef.current.scrollLeft;
      };

      const handleTouchMove = (e) => {
        const startX = parseInt(scrollContainerRef.current.dataset.startX, 10);
        const scrollLeft = parseInt(scrollContainerRef.current.dataset.scrollLeft, 10);
        const moveX = e.touches[0].clientX - startX;
        scrollContainerRef.current.scrollLeft = scrollLeft - moveX;
      };

      scrollContainerRef.current.addEventListener('touchstart', handleTouchStart);
      scrollContainerRef.current.addEventListener('touchmove', handleTouchMove);

      return () => {
        scrollContainerRef.current.removeEventListener('touchstart', handleTouchStart);
        scrollContainerRef.current.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isMobile]);

  const icons = [
    { Icon: RiReactjsLine, color: "text-cyan-400" },
    { Icon: TbBrandNextjs, color: "" },
    { Icon: SiMongodb, color: "text-green-500" },
    { Icon: SiTailwindcss, color: "text-sky-400" },
    { Icon: FaNodeJs, color: "text-green-500" },
    { Icon: BiLogoPostgresql, color: "text-sky-700" },
    { Icon: SiJupyter, color: "text-green-500" },
  ];

  return (
    <div id="technologies" className="border-b border-neutral-800 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        <div
          ref={scrollContainerRef}
          className={`flex ${isMobile ? 'overflow-x-auto' : 'animate-scroll'}`}
        >
          {[...icons, ...icons, ...icons].map((icon, index) => (
            <div key={index} className="rounded-2xl border-4 border-neutral-800 p-4 mx-4 flex-shrink-0">
              <icon.Icon className={`text-7xl ${icon.color}`} />
            </div>
          ))}
        </div>
      </motion.div>
      <style>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </div>
  );
};

export default Technologies;
