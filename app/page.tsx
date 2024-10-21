"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount: number) => {
        if (prevCount === 1) {
          clearInterval(timer);
          window.location.href = "https://buildsocialpost.com";
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <main className="pt-16">
        <motion.section
          className="py-10 sm:py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8">
            <motion.div
              className="space-y-6 sm:space-y-8 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textColor">
                We've Rebranded!
              </h2>
              <p className="text-lg sm:text-xl text-textColor/70 max-w-2xl mx-auto">
                BuildCarousel.com is now{" "}
                <a
                  href="https://buildsocialpost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BuildSocialPost.com
                </a>
                . You will be redirected shortly...
              </p>
              <div className="z-10 flex justify-center">
                <a
                  href="https://buildsocialpost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="shadow-2xl bg-[#3369E7] px-4 py-2 rounded-md">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Visit BuildSocialPost.com Now ({countdown}s)
                    </span>
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Page;
