import Link from "next/link";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

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
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
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

const platforms = [
  { name: "LinkedIn", gradient: "from-blue-600 to-blue-400" },
  { name: "TikTok", gradient: "from-[#010101] via-[#FF0050] to-[#00F2EA]" }, // Updated TikTok colors
  { name: "Instagram", gradient: "from-yellow-400 via-pink-500 to-purple-500" },
];

const Hero = () => {
  const [currentPlatform, setCurrentPlatform] = React.useState(0);
  const demoRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: demoRef,
    offset: ["start end", "end start"],
  });

  // Adjusted scale range to prevent overflow
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 md:px-8">
        <motion.div
          className="space-y-8 sm:max-w-2xl lg:max-w-3xl"
          variants={textContainerVariants}
        >
          <motion.h1
            className="text-lg text-primary font-semibold flex items-center justify-center"
            variants={textVariants}
          >
            <Sparkles className="mr-2 w-6 h-6" />
            Create Stunning Carousels with AI
          </motion.h1>
          <motion.h2
            className="text-5xl text-textColor leading-tight font-extrabold md:text-6xl lg:text-7xl"
            style={{ lineHeight: "1.2" }}
            variants={textVariants}
          >
            Design{" "}
            <motion.span
              key={currentPlatform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${platforms[currentPlatform].gradient}`}
            >
              {platforms[currentPlatform].name}
            </motion.span>{" "}
            Carousels <span className=" bg-clip-text ">With AI</span>
          </motion.h2>
          <motion.p
            className="text-xl text-textColor/70 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Our AI-powered tool streamlines your design process, helping you
            generate content, customize designs, and create stunning carousels
            in minutes.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={textVariants}
          >
            <Link
              href="/editor"
              className="group flex items-center justify-center py-3 px-6 text-lg text-white font-medium bg-primary rounded-full hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#demo"
              className="text-lg text-primary font-medium hover:text-primary/80 transition-colors duration-300"
            >
              Watch demo
            </a>
          </motion.div>
        </motion.div>

        <div className="mt-12 mb-8">
          <p className="text-textColor/70 mb-4">Trusted by creators worldwide</p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedTooltip items={people} />
          </div>
        </div>

        <motion.div
          ref={demoRef}
          className="w-full max-w-4xl mx-auto mt-16"
          style={{ scale, opacity }}
        >
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-teal-400 p-1 shadow-2xl">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white">
              <Image
                src="/demo.png"
                alt="Carousel AI Demo"
                layout="responsive"
                width={1920}
                height={1080}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
