import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";

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
const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
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
            Create Social Media Carousels{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400"
              variants={textVariants}
            >
              With AI
            </motion.span>
          </motion.h2>
          <motion.p className="text-2xl" variants={textVariants}>
            Our AI tool helps you generate content, customize designs, and
            download your creations, simplifying your design process.
          </motion.p>
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>
          <motion.div
            className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0 justify-center"
            variants={textVariants}
          >
            {/* <Link
              href="/editor"
              className="block py-2 px-4 text-center text-white font-medium bg-primary duration-150 hover:bg-primary/90 rounded-lg"
            >
              Let's get started
            </Link> */}
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
            <source
              // src="https://firebasestorage.googleapis.com/v0/b/buildcarousel-4e9ec.appspot.com/o/Untitled%20video%20-%20Made%20with%20Clipchamp%20(2).mp4?alt=media&token=9487d6dc-20d9-4f06-ae43-ee4f6a8055e1"
              src="/intro.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
