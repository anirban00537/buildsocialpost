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

const Page = () => {
  const plan = {
    name: "Basic plan",
    desc: "Get started with our free carousel building service.",
    price: 9.99,
    isMostPop: true,
    features: [
      "User-Friendly Editor",
      "Multiple Templates",
      "Cross-Platform Compatibility",
      "Data Security",
      "Unlimited manual carousel creation",
      "Access to free templates",
      "Basic analytics",
      "Community support",
    ],
  };

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

  const features = [
    {
      name: "AI-Generated Content",
      description:
        "Automatically generate engaging and relevant content for your carousels.",
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      name: "Dynamic Color Palettes",
      description:
        "Customize your projects with a wide range of dynamic color schemes.",
      icon: <Palette className="w-6 h-6" />,
    },
    {
      name: "Modern Backgrounds",
      description:
        "Access a library of contemporary background designs to enhance your visuals.",
      icon: <Layers className="w-6 h-6" />,
    },
    {
      name: "Text Customization",
      description:
        "Easily adjust font styles, sizes, and alignment for clear, impactful text.",
      icon: <Type className="w-6 h-6" />,
    },
    {
      name: "PDF Download",
      description:
        "Download your designs in PDF format for easy sharing and printing.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      name: "Image Download",
      description:
        "Save your carousel images directly to your device in high resolution.",
      icon: <DownloadCloud className="w-6 h-6" />,
    },
    {
      name: "Pre-made Templates",
      description:
        "Start quickly with professional templates designed for various needs.",
      icon: <BookTemplate className="w-6 h-6" />,
    },
  ];

  const navigation = [
    { title: "Partners", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Team", path: "javascript:void(0)" },
  ];
  const [state, setState] = useState(false);

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
                ? "absolute inset-x-0 px-4 border-b bg-white md:border-none md:static"
                : "hidden"
            }`}
          >
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
                className="py-2 px-5 rounded-lg font-medium text-white text-center bg-primary hover:bg-primary/90  duration-150 block md:py-3 md:inline"
              >
                Get started
              </a>
            </li>
          </ul>
        </nav>
        <section className="py-28">
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
                  className="block py-2 px-4 text-center text-white font-medium bg-primary duration-150 hover:bg-primary/90 rounded-lg"
                >
                  Let's get started
                </Link>
                <a
                  href="javascript:void(0)"
                  className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
                >
                  Get access
                  <ChevronDown className="w-5 h-5" />
                </a>
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
          <div className="mt-14 px-4 md:px-8">
            <p className="text-center text-sm text-gray-700 font-semibold">
              Trusted by the best companies
            </p>
            <div className="flex justify-center items-center flex-wrap gap-x-12 gap-y-6 mt-6">
              {/* Replace with lucide-react icons if available */}
            </div>
          </div>
        </section>
      </>

      <section id="features" className="py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore the key features that make our AI-powered tool uniquely
            equipped to help you design professional carousels efficiently.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <div className="p-4 border rounded-full text-blue-600 bg-gray-100">
                  {item.icon}
                </div>
                <p className="mt-4 text-lg font-medium">{item.name}</p>
                <p className="mt-2 text-sm text-gray-500 max-w-xs text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-28 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">How It Works</h2>
          <p className="mt-4 text-gray-600">
            Our AI carousel maker simplifies the creation process into a few
            easy steps.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="max-w-sm p-6 bg-white border rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 1: Choose a Template
              </h3>
              <p className="mt-4 text-gray-600">
                Select from a variety of professionally designed templates to
                start your carousel.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 2: Customize Your Design
              </h3>
              <p className="mt-4 text-gray-600">
                Use our dynamic color palettes and text customization features
                to make your carousel unique.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 3: Generate Content
              </h3>
              <p className="mt-4 text-gray-600">
                Let our AI generate engaging content for your carousel slides.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg ">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 4: Download and Share
              </h3>
              <p className="mt-4 text-gray-600">
                Download your carousel as an image or PDF and share it on your
                social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14">
        <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
          <div className="relative max-w-xl space-y-3 px-4 md:px-0">
            <h3 className="text-primary font-semibold">Pricing</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Pay as you grow
            </p>
            <div className="max-w-xl">
              <p>Choose a plan that’s right for you.</p>
            </div>
          </div>
          <div className="mt-16 justify-between gap-8 md:flex">
            <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
              {features.map((item, idx) => (
                <li key={idx} className="flex gap-x-3">
                  <div className="flex-none w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 font-medium">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 mt-2 md:text-sm">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex-1 flex flex-col border-y mt-6 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0">
              <div className="p-4 py-8 border-b md:p-8">
                <div className="justify-between flex">
                  <div className="max-w-xs">
                    <span className="text-2xl text-gray-800 font-semibold sm:text-3xl">
                      {plan.name}
                    </span>
                    <p className="mt-3 sm:text-sm">{plan.desc}</p>
                  </div>
                  <div className="flex-none text-gray-800 text-2xl font-semibold sm:text-3xl">
                    ${plan.price}{" "}
                    <span className="text-xl text-gray-600 font-normal">
                      /mo
                    </span>
                  </div>
                </div>
                <button className="mt-4 px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-primary  hover:bg-primary/90 ">
                  Get Started
                </button>
              </div>
              <ul className="p-4 space-y-3 sm:grid sm:grid-cols-2 md:block md:p-8 lg:grid">
                <div className="pb-2 col-span-2 text-gray-800 font-medium">
                  <p>Features</p>
                </div>
                {plan.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {featureItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-28 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Testimonials</h2>
          <p className="mt-4 text-gray-600">
            See what our users have to say about AI Carousel Maker.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="max-w-sm p-6 bg-white border rounded-lg">
              <p className="text-gray-600">
                "This tool has revolutionized the way I create content for my
                social media. Highly recommended!"
              </p>
              <p className="mt-4 text-gray-800 font-bold">- Alex Johnson</p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg">
              <p className="text-gray-600">
                "AI Carousel Maker saves me so much time and effort. The
                AI-generated content is spot on."
              </p>
              <p className="mt-4 text-gray-800 font-bold">- Maria Davis</p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg">
              <p className="text-gray-600">
                "I love the customization options and the modern backgrounds.
                It's perfect for my business needs."
              </p>
              <p className="mt-4 text-gray-800 font-bold">- James Smith</p>
            </div>
          </div>
        </div>
      </section>

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
                className="block py-2 px-4 text-center text-white font-medium bg-primary duration-150 hover:bg-primary/90  rounded-lg hover:shadow-none"
              >
                Let's get started
              </Link>
              <a
                href="#"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
              >
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
                  className="text-gray-800 hover:text-gray-500 duration-150"
                >
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
