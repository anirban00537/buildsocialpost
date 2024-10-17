import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="pt-10 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"></div>
        <div className="absolute top-64 right-0 w-1/3 h-[50px] bg-gradient-to-bl from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-[50px] bg-gradient-to-tr from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 text-textColor md:px-8 relative z-10">
        <div className="space-y-6 flex items-center justify-center flex-col sm:max-w-md sm:mx-auto sm:text-center">
          <Image
            src="/single-logo.svg"
            height={80}
            width={80}
            alt="buildsocialpost.com"
          />
          <p className="text-textColor/80">
            Create professional carousels easily with our AI-powered tool.
          </p>
        </div>

        {/* <div className="mt-10 py-10 flex flex-col border-t text-center border-borderColor/30 items-center justify-center sm:flex">
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
          </div> */}
        <div className="mt-10 py-10 border-t text-center border-borderColor/30">
          <p className="text-textColor/70">
            © {new Date().getFullYear()} Buildsocialpost.com. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
