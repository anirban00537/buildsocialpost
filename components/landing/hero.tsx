import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRightIcon } from "lucide-react";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import ShimmerButton from "../magicui/shimmer-button";
import HeroVideoDialog from "../ui/hero-video-dialog";

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
  { name: "LinkedIn", gradient: "from-[#0077B5] to-[#0A66C2]" },
  { name: "TikTok", gradient: "from-[#00F2EA] to-[#FF0050]" },
  { name: "Instagram", gradient: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]" },
];

const Hero = () => {
  const [currentPlatform, setCurrentPlatform] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="py-10 sm:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="space-y-6 sm:space-y-8 w-full"
          variants={textContainerVariants}
        >
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-borderColor bg-cardBackground text-sm sm:text-base !text-textColor transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex text-textColor items-center justify-center px-3 sm:px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span className="hidden sm:inline">✨ Create Stunning Viral Carousels with AI</span>
                <span className="sm:hidden">✨ Create Viral Carousels</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <motion.h2
            className="text-3xl sm:text-5xl leading-tight font-extrabold md:text-6xl lg:text-7xl"
            style={{ lineHeight: "1.2" }}
            variants={textVariants}
          >
            <div className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
              Create Viral
            </div>
            <br />
            <div className="inline-block">
              <motion.span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${platforms[currentPlatform].gradient}`}
                key={currentPlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {platforms[currentPlatform].name}
              </motion.span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
                Carousels With AI
              </span>
            </div>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-textColor/70 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Our AI-powered tool streamlines your design process, helping you
            generate content, customize designs, and create stunning carousels
            in minutes.
          </motion.p>

          <div className="z-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/editor">
              <ShimmerButton className="shadow-2xl w-full sm:w-auto" background="#3369E7">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Create Free Carousel
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="https://www.linkedin.com/in/anirban00537/"
              className="bg-background/50 backdrop-blur-sm h-[59px] w-full sm:w-32 rounded-full border-4 border-borderColor flex items-center justify-center px-4 py-2 text-textColor transition-all duration-300 hover:scale-105"
            >
              <div className="text-textColor">Hire Me</div>
            </a>
          </div>
        </motion.div>

        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
          <p className="text-textColor/70 mb-4">
            Trusted by creators worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <AnimatedTooltip items={people} />
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto mt-8 sm:mt-12">
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM?si=WW-DhesYVKX3b8J6"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM?si=WW-DhesYVKX3b8J6"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
