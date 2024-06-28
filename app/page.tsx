"use client";
import React, { useState } from "react";
import {
  Cpu,
  Palette,
  Layers,
  Type,
  FileText,
  DownloadCloud,
  BookTemplate,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FeaturesSection from "@/components/landing/features";
import HowItWorksSection from "@/components/landing/howItWorks";
import PlanSection from "@/components/landing/pricing";
import Testimonial from "@/components/landing/testimonial";

const Page = () => {
  const navigation = [
    { title: "Partners", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Team", path: "javascript:void(0)" },
  ];
  const [state, setState] = useState(false);

  const footerNavs = [
    {
      href: "#",
      name: "Terms",
    },
    {
      href: "#",
      name: "License",
    },
    {
      href: "#",
      name: "Privacy",
    },
    {
      href: "#",
      name: "About us",
    },
  ];

  return (
    <div>
      <>
        <nav className="relative items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
          <div className="flex justify-between items-center">
            <a href="javascript:void(0)">
              <Image
                src="/logo.svg"
                width={150}
                height={150}
                alt="buildcarousel.com"
              />
            </a>
            <button
              className="text-gray-500 outline-none md:hidden"
              onClick={() => setState(!state)}>
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <ul
            className={`flex-1 justify-between mt-12 md:text-sm md:font-medium md:flex md:mt-0 ${
              state
                ? "absolute inset-x-0 px-4 border-b bg-white md:border-none md:static"
                : "hidden"
            }`}>
            <div className="items-center space-y-5 md:flex md:space-x-6 md:space-y-0 md:ml-12">
              {navigation.map((item, idx) => (
                <li className="text-gray-500 hover:text-primary" key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </div>
            <li className="order-2 py-5 md:py-0">
              <a
                href="javascript:void(0)"
                className="py-2 px-5 rounded-lg font-medium text-white text-center bg-primary hover:bg-primary/90  duration-150 block md:py-3 md:inline">
                Get started
              </a>
            </li>
          </ul>
        </nav>
        <motion.section
          className="py-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
            <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
              <h1 className="text-sm text-primary font-medium">
                Create Stunning Carousels with AI
              </h1>
              <h2 className="text-4xl text-gray-800 md:leading-[58px] font-extrabold md:text-5xl">
                Create Social media carousels in a few clicks.
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                  with our AI tool .
                </div>
              </h2>
              <p className="">
                Our AI tool helps you generate content, customize designs, and
                download your creations, simplifying your design process.
              </p>
              <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <Link
                  href="/editor"
                  className="block py-2 px-4 text-center text-white font-medium bg-primary duration-150 hover:bg-primary/90 rounded-lg">
                  Let's get started
                </Link>
              </div>
            </div>
            <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
              <Image
                src="/carousel.png"
                className="md:rounded-tl-[108px]"
                alt="Carousel Preview"
                width={500}
                height={500}
              />
            </div>
          </div>
        </motion.section>
      </>

      <FeaturesSection />

      <HowItWorksSection />

      <PlanSection />

    <Testimonial/>

      <footer className="pt-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
            <Image
              src="/logo.svg"
              className="w-32 sm:mx-auto"
              alt="Logo"
              width={128}
              height={128}
            />
            <p>
              Create professional carousels easily with our AI-powered tool.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
              <Link
                href="/editor"
                className="block py-2 px-4 text-center text-white font-medium bg-primary duration-150 hover:bg-primary/90  rounded-lg hover:shadow-none">
                Let's get started
              </Link>
              <a
                href="#"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                Get access
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
            <p>© 2023 AI Carousel Maker. All rights reserved.</p>
            <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-800 hover:text-gray-500 duration-150">
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
