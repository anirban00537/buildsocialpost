"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dynamic Color Palettes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Modern Backgrounds",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Text Customization",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "PDF Download",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Image Download",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Pre-made Templates",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 7.5a1 1 0 012 0v2.59l1.29 1.29a1 1 0 01-1.42 1.42l-1.29-1.29V7.5zm.02 6.1a1.38 1.38 0 100-2.76 1.38 1.38 0 000 2.76z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <header className="bg-white   w-full z-40 border">
        <div className="max-w-screen-xl mx-auto px-4  py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-gray-800">
            <Image src="/logo.svg" alt="Logo" width={170} height={170} />
          </Link>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-800">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-800"
            >
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-800">
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-800"
            >
              Testimonials
            </a>
          </nav>
        </div>
      </header>

      <section className="h-screen flex items-center justify-center pt-[400px] pb-28">
        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h1 className="text-sm font-medium text-indigo-600 ">
              Create Stunning Carousels with AI
            </h1>

            <h2 className="text-4xl font-extrabold text-slate-700 mx-auto md:text-5xl leading-relaxed">
              Design professional carousels for LinkedIn, Instagram, and Twitter
              with ease using{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">
                our AI-powered tool
              </span>
            </h2>

            <p className="max-w-2xl mx-auto">
              Our AI tool helps you generate content, customize designs, and
              download your creations, simplifying your design process.
            </p>
            <div className="flex justify-center items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <a
                href="javascript:void(0)"
                className="block py-2 px-4 text-white font-medium bg-blue-600 duration-150 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Start Creating
              </a>
              <a
                href="javascript:void(0)"
                className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-14">
            <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/main/Safari%20(Big%20Sur)%20-%20Light.png"
              className="w-full shadow-lg rounded-lg border"
              alt="Demo Image"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-28 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <div className="p-4 border rounded-full text-blue-600">
                  {item.icon}
                </div>
                <p className="mt-4 text-lg font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-28 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">How It Works</h2>
          <p className="mt-4 text-gray-600">
            Our AI carousel maker simplifies the creation process into a few
            easy steps.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 1: Choose a Template
              </h3>
              <p className="mt-4 text-gray-600">
                Select from a variety of professionally designed templates to
                start your carousel.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 2: Customize Your Design
              </h3>
              <p className="mt-4 text-gray-600">
                Use our dynamic color palettes and text customization features
                to make your carousel unique.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Step 3: Generate Content
              </h3>
              <p className="mt-4 text-gray-600">
                Let our AI generate engaging content for your carousel slides.
              </p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
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

      <section id="pricing" className="py-28 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Pricing</h2>
          <p className="mt-4 text-gray-600">
            Choose a plan that fits your needs.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="max-w-xs p-6 bg-gray-50 border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Free Plan</h3>
              <p className="mt-4 text-gray-600">
                Get started with our basic features for free.
              </p>
              <p className="mt-4 text-gray-800 font-bold">$0 / month</p>
              <a
                href="#"
                className="mt-6 inline-block py-2 px-4 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg "
              >
                Choose Plan
              </a>
            </div>
            <div className="max-w-xs p-6 bg-gray-50 border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">Pro Plan</h3>
              <p className="mt-4 text-gray-600">
                Unlock all features and tools with the Pro plan.
              </p>
              <p className="mt-4 text-gray-800 font-bold">$19 / month</p>
              <a
                href="#"
                className="mt-6 inline-block py-2 px-4 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg "
              >
                Choose Plan
              </a>
            </div>
            <div className="max-w-xs p-6 bg-gray-50 border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Enterprise Plan
              </h3>
              <p className="mt-4 text-gray-600">
                For large teams and enterprises, get custom solutions.
              </p>
              <p className="mt-4 text-gray-800 font-bold">Contact Us</p>
              <a
                href="#"
                className="mt-6 inline-block py-2 px-4 text-white font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg "
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-28 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Testimonials</h2>
          <p className="mt-4 text-gray-600">
            See what our users have to say about AI Carousel Maker.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
              <p className="text-gray-600">
                "This tool has revolutionized the way I create content for my
                social media. Highly recommended!"
              </p>
              <p className="mt-4 text-gray-800 font-bold">- Alex Johnson</p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
              <p className="text-gray-600">
                "AI Carousel Maker saves me so much time and effort. The
                AI-generated content is spot on."
              </p>
              <p className="mt-4 text-gray-800 font-bold">- Maria Davis</p>
            </div>
            <div className="max-w-sm p-6 bg-white border rounded-lg shadow-lg">
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
            <img src="/logo.svg" className="w-32 sm:mx-auto" alt="Logo" />
            <p>
              Create professional carousels easily with our AI-powered tool.
            </p>
            <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
              <a
                href="#"
                className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none"
              >
                Let's get started
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
              >
                Get access
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
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
