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
import FeaturesSection from "@/components/landing/features";
import HowItWorksSection from "@/components/landing/howItWorks";
import PlanSection from "@/components/landing/pricing";
import Testimonial from "@/components/landing/testimonial";
import Hero from "@/components/landing/hero";
import { InfiniteCarouselsPreview } from "@/components/landing/carouselsPreview";

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
    <div className="mx-auto inset-0 -z-10 h-full w-full bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>
      <div className="">
        <nav className="relative items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
          <div className="flex justify-between items-center">
            <a href="javascript:void(0)">
              <Image
                src="/logo.svg"
                height={168}
                width={168}
                alt="buildcarousel.com"
              />
            </a>
            <button
              className="text-textColor outline-none md:hidden"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                  stroke="currentColor"
                >
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
                ? "absolute inset-x-0 px-4 border-b bg-cardBackground md:border-none md:static"
                : "hidden"
            }`}
          >
            <div className="items-center space-y-5 md:flex md:space-x-6 md:space-y-0 md:ml-12">
              {/* {navigation.map((item, idx) => (
                <li className="text-textColor hover:text-primary" key={idx}>
                  <a href={item.path}>{item.title}</a>
                </li>
              ))} */}
            </div>
            <li className="order-2 py-5 md:py-0">
              {/* <a
                href="https://www.linkedin.com/in/anirban00537/"
                className="group relative inline-flex items-center justify-center py-3 px-6 text-sm text-white font-medium bg-[#1e2530] rounded-full hover:bg-[#2a3441] transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                Hire Me � For Your next project
              </a> */}
            </li>
          </ul>
        </nav>

        <Hero />
      </div>
      <InfiniteCarouselsPreview />
      <FeaturesSection />
      <HowItWorksSection />
      <PlanSection />
      <Testimonial />

      <footer className="pt-10 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"></div>
          <div className="absolute top-64 right-0 w-1/3 h-[50px] bg-gradient-to-bl from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-1/3 h-[50px] bg-gradient-to-tr from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 text-textColor md:px-8 relative z-10">
          <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
            <Image
              src="/logo.svg"
              className="w-32 sm:mx-auto"
              alt="Logo"
              width={128}
              height={128}
            />
            <p className="text-textColor/80">
              Create professional carousels easily with our AI-powered tool.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
              <a
                href="#"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-textColor hover:text-textColor font-medium duration-150 bg-cardBackground/30 backdrop-blur-md border border-borderColor/50 rounded-lg hover:shadow-lg transition-shadow"
              >
                Get access
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-10 py-10 flex flex-col border-t text-center border-borderColor/30 items-center justify-center sm:flex">
            <p className="text-textColor/70 text-xl font-semibold">
              Our Partners
            </p>
            <div className="mt-6 sm:mt-0 flex gap-4">
              <a
                href="https://fluxai.pro/"
                title="Flux AI Pro"
                target="_blank"
                className="text-textColor/70  hover:text-textColor duration-150 hover:underline text-3xl font-bold"
              >
                Flux AI Pro
              </a>
              <a
                href="https://alteropen.com/"
                title="Alternative Open Directory"
                className="text-textColor/70  hover:text-textColor duration-150 hover:underline text-3xl font-bold"
              >
                AlterOpen
              </a>
            </div>
          </div>
          <div className="mt-10 py-10 border-t text-center border-borderColor/30">
            <p className="text-textColor/70">
              © {new Date().getFullYear()} BuildCarousel.com. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
