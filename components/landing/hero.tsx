import Link from "next/link";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRight, ArrowRightIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import ShimmerButton from "../magicui/shimmer-button";

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
          <div className="z-10 flex  items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-borderColor bg-cardBackground text-base !text-textColor transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex text-textColor   items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Create Stunning Viral Carousels with AI</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <motion.h2
            className="text-5xl leading-tight font-extrabold md:text-6xl lg:text-7xl"
            style={{ lineHeight: "1.2" }}
            variants={textVariants}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
              Create Viral{" "}
            </span>
            <div className="text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
              <motion.span
                className=" text-transparent bg-clip-text bg-primary"
                key={currentPlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {platforms[currentPlatform].name}
              </motion.span>{" "}
            </div>
            <div className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
              Carousels With AI
            </div>
          </motion.h2>
          <motion.p
            className="text-xl text-textColor/70 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Our AI-powered tool streamlines your design process, helping you
            generate content, customize designs, and create stunning carousels
            in minutes.
          </motion.p>
          {/* <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={textVariants}
          >
            <Link
              href="/editor"
              className="group relative inline-flex items-center justify-center py-3 px-6 text-sm text-white font-medium bg-[#1e2530] rounded-full hover:bg-[#2a3441] transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10">
                It's free. Sign up now
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary/50 to-primary bg-[length:200%_100%] animate-gradient-x" />
              </span>
            </Link>
          </motion.div> */}
          <div className="z-10 flex items-center justify-center">
            <Link href="/editor">
              <ShimmerButton className="shadow-2xl ">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Create Carousel
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="https://www.linkedin.com/in/anirban00537/"
              className="bg-background/50 backdrop-blur-sm h-[59px] ml-5 w-32 rounded-full border-4 border-borderColor flex items-center justify-center px-4 py-2 text-textColor transition-all duration-300 hover:scale-105"
            >
              <div className="text-textColor">Hire Me</div>
            </a>
          </div>
        </motion.div>

        <div className="mt-12 mb-8">
          <p className="text-textColor/70 mb-4">
            Trusted by creators worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedTooltip items={people} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
