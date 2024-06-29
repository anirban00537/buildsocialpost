import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const videoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <motion.section
      className="py-28"
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center text-gray-600 gap-y-12 px-4 md:px-8">
        <motion.div
          className="space-y-5 sm:max-w-lg lg:max-w-5xl"
          variants={textContainerVariants}
        >
          <motion.h1
            className="text-base text-primary font-medium"
            variants={textVariants}
          >
            Create Stunning Carousels with AI
          </motion.h1>
          <motion.h2
            className="text-5xl text-gray-800 leading-[58px] font-extrabold md:text-7xl"
            variants={textVariants}
          >
            Create Social media carousels in a few clicks.
            <motion.div
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400"
              variants={textVariants}
            >
              with our AI tool.
            </motion.div>
          </motion.h2>
          <motion.p className="text-lg" variants={textVariants}>
            Our AI tool helps you generate content, customize designs, and
            download your creations, simplifying your design process.
          </motion.p>
          <motion.div
            className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0 justify-center"
            variants={textVariants}
          >
            <Link
              href="/editor"
              className="block py-2 px-4 text-center text-white font-medium bg-primary duration-150 hover:bg-primary/90 rounded-lg"
            >
              Let's get started
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-auto rounded-3xl flex justify-center bg-primary p-2"
          variants={videoVariants}
        >
          <video
            className="rounded-lg"
            width="900"
            height="600"
            controls={false}
            autoPlay={true}
            muted
            loop
          >
            <source src="/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
