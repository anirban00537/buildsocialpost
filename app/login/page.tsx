"use client";
import React from "react";
import { useGoogleLogin } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaPalette,
  FaImage,
  FaFont,
  FaFilePdf,
  FaDownload,
  FaLayerGroup,
} from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: <MdAutoAwesome />,
    title: "AI-Generated Content",
    description:
      "Automatically generate engaging and relevant content for your carousels.",
  },
  {
    icon: <FaPalette />,
    title: "Dynamic Color Palettes",
    description:
      "Customize your projects with a wide range of dynamic color schemes.",
  },
  {
    icon: <FaImage />,
    title: "Modern Backgrounds",
    description:
      "Access a library of contemporary background designs to enhance your visuals.",
  },
  {
    icon: <FaFont />,
    title: "Text Customization",
    description:
      "Easily adjust font styles, sizes, and alignment for clear, impactful text.",
  },
  {
    icon: <FaFilePdf />,
    title: "PDF Download",
    description:
      "Download your designs in PDF format for easy sharing and printing.",
  },
  {
    icon: <FaDownload />,
    title: "Image Download",
    description:
      "Save your carousel images directly to your device in high resolution.",
  },
];

const LoginPage = () => {
  const {
    loginWithGoogle,
    loading: googleLoginLoading,
    error: googleLoginError,
    success: googleLoginSuccess,
  } = useGoogleLogin();

  const handleGoogleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Google login button clicked");
    loginWithGoogle();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 p-12 flex flex-col justify-center items-start overflow-y-auto"
      >
        <Link href="/">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
            <Image
              src="/logo.svg"
              height={168}
              width={168}
              alt="buildcarousel.com"
            />
          </h1>
        </Link>
        <p className="text-2xl font-light mb-12 text-gray-300">
          Elevate Your Social Media Presence with AI-Powered Carousels
        </p>
        <ul className="space-y-6 w-full max-w-xl">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="flex items-start space-x-4"
            >
              <div className="text-blue-400 text-2xl mt-1">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 p-12 flex flex-col justify-center bg-gray-800 rounded-l-3xl shadow-2xl z-10"
      >
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
            Welcome!
          </h2>
          <p className="mb-8 text-gray-300">
            Sign in with your Google account to get started. It's quick, easy,
            and secure!
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-primary text-white py-4 rounded-lg flex items-center justify-center gap-3 transition duration-300 text-lg font-semibold"
              onClick={handleGoogleLogin}
              disabled={googleLoginLoading}
            >
              <FaGoogle />
              {googleLoginLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </motion.div>

          {googleLoginError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mt-6">
                <AlertDescription>{googleLoginError}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {googleLoginSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 text-center text-green-400 font-semibold bg-background p-4 rounded-lg border border-green-400"
            >
              <Alert className="mt-6">
                <AlertDescription>{googleLoginSuccess}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
