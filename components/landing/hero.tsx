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
    name: "Sarah Johnson",
    designation: "Software Engineer",
    image: "/persons/person-1.jpeg",
  },
  {
    id: 2,
    name: "Emma Thompson",
    designation: "Product Manager",
    image: "/persons/person-2.jpeg",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "Data Scientist",
    image: "/persons/person-3.jpeg",
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "UX Designer",
    image: "/persons/person-4.jpeg",
  },
  {
    id: 5,
    name: "Olivia Parker",
    designation: "AI Researcher",
    image: "/persons/person-5.jpeg",
  },
  {
    id: 6,
    name: "Sophia Lee",
    designation: "Full Stack Developer",
    image: "/persons/person-6.jpeg",
  },
];

const platforms = [
  { name: "LinkedIn", gradient: "from-blue-600 to-blue-400" },
  { name: "TikTok", gradient: "from-[#69C9D0] via-[#EE1D52] to-[#FFFFFF]" },
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
            {/* <a
              href="#demo"
              className="text-lg text-primary font-medium hover:text-primary/80 transition-colors duration-300"
            >
              Watch demo
            </a> */}
          </motion.div>
        </motion.div>

        <div className="mt-12 mb-8">
          <p className="text-textColor/70 mb-4">
            Trusted by creators worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedTooltip items={people} />
          </div>
        </div>

        <motion.div
          ref={demoRef}
          className="w-full max-w-4xl mx-auto mt-16 flex items-center justify-center"
          style={{ scale, opacity }}
        >
          <Image
            src="/demo.png"
            className=" bg-gradient-to-r from-blue-600 to-teal-400 rounded-xl shadow-2xl p-1"
            alt="Carousel AI Demo"
            priority
            height={926}
            width={1480}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
