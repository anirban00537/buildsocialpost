import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRightIcon } from "lucide-react";
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import ShimmerButton from "../magicui/shimmer-button";
import HeroVideoDialog from "../ui/hero-video-dialog";
import Image from "next/image"; // Added for optimized images

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

// Enhanced with more relevant professional titles based on target audience
const people = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Content Marketing Lead",
    image: "/persons/person-1.jpeg",
    alt: "Sarah Johnson - Content Marketing Professional using BuildSocialPost",
  },
  {
    id: 2,
    name: "Emma Thompson",
    designation: "Social Media Manager",
    image: "/persons/person-2.jpeg",
    alt: "Emma Thompson - Social Media Expert creating carousels",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "Digital Marketing Director",
    image: "/persons/person-3.jpeg",
    alt: "Michael Chen - Marketing Director using AI carousel maker",
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "Brand Strategist",
    image: "/persons/person-4.jpeg",
    alt: "David Rodriguez - Brand Strategy Professional",
  },
  {
    id: 5,
    name: "Olivia Parker",
    designation: "Content Creator",
    image: "/persons/person-5.jpeg",
    alt: "Olivia Parker - Professional Content Creator",
  },
  {
    id: 6,
    name: "Sophia Lee",
    designation: "LinkedIn Influencer",
    image: "/persons/person-6.jpeg",
    alt: "Sophia Lee - Professional LinkedIn Content Creator",
  },
];

// Enhanced with more descriptive platform information
const platforms = [
  {
    name: "LinkedIn",
    gradient: "from-[#0077B5] to-[#0A66C2]",
    description: "Professional networking carousels",
  },
  {
    name: "TikTok",
    gradient: "from-[#00F2EA] to-[#FF0050]",
    description: "Viral slide decks",
  },
  {
    name: "Instagram",
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    description: "Engaging carousel posts",
  },
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
      // Added semantic HTML attributes
      role="banner"
      aria-label="Main hero section"
    >
      <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="space-y-6 sm:space-y-8 w-full"
          variants={textContainerVariants}
        >
          {/* Enhanced announcement banner with more SEO-friendly text */}
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-borderColor bg-cardBackground text-sm sm:text-base !text-textColor transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
              role="button"
              aria-label="Feature announcement"
            >
              <AnimatedShinyText className="inline-flex text-textColor items-center justify-center px-3 sm:px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span className="hidden sm:inline">
                  ✨ Create Viral Carousels with AI - Free Tool
                </span>
                <span className="sm:hidden">✨ AI Carousel Maker</span>
                <ArrowRightIcon
                  className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </AnimatedShinyText>
            </div>
          </div>

          {/* Enhanced main heading with SEO-optimized text */}
          <motion.h1
            className="text-3xl sm:text-5xl leading-tight font-extrabold md:text-6xl lg:text-7xl"
            style={{ lineHeight: "1.2" }}
            variants={textVariants}
          >
            <div className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
              Create Professional
            </div>
            <br />
            <div className="inline-block">
              <span className={`text-transparent bg-clip-text bg-[#0077B5]`}>
                LinkedIn
              </span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-600 via-gray-500 to-gray-900">
                Carousels Instantly
              </span>
            </div>
          </motion.h1>

          {/* Enhanced subheading with more specific value propositions */}
          <motion.p
            className="text-lg sm:text-xl text-textColor/70 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Transform your content into engaging carousels using AI. Perfect for
            LinkedIn, TikTok, and Instagram. No design skills needed - create
            professional-looking carousels in minutes with our free tool.
          </motion.p>

          {/* Enhanced CTA section with more descriptive text */}
          <div className="z-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/carousel-editor"
              aria-label="Start creating your free carousel"
              className="w-full sm:w-auto"
            >
              <ShimmerButton
                className="shadow-2xl w-full sm:w-auto"
                background="#3369E7"
              >
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Create Free Carousel Now
                </span>
              </ShimmerButton>
            </Link>
            <a
              href="https://www.linkedin.com/in/anirban00537/"
              className="bg-background/50 backdrop-blur-sm h-[59px] w-[250px]  rounded-full border-4 border-borderColor flex items-center justify-center px-4 py-2 text-textColor transition-all duration-300 hover:scale-105"
              aria-label="Contact for professional services"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-textColor">
                Contact Us - For SaaS Development
              </div>
            </a>
          </div>
        </motion.div>

        {/* Enhanced social proof section */}
        <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
          <h2 className="text-textColor/70 mb-4 text-lg">
            Trusted by 10,000+ Professional Content Creators
          </h2>
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-4"
            role="list"
            aria-label="Featured users"
          >
            <AnimatedTooltip items={people} />
          </div>
        </div>

        {/* Enhanced video section with better accessibility */}
        <div
          className="relative w-full max-w-7xl mx-auto mt-8 sm:mt-12"
          role="complementary"
          aria-label="Product demonstration"
        >
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM?si=WW-DhesYVKX3b8J6"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Watch how to create professional carousels with AI"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM?si=WW-DhesYVKX3b8J6"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Watch how to create professional carousels with AI - Dark Mode"
          />
        </div>

        {/* Added structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BuildSocialPost AI Carousel Maker",
            applicationCategory: "DesignApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "10000",
            },
          })}
        </script>
      </div>
    </motion.section>
  );
};

export default Hero;
