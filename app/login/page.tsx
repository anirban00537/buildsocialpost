"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const { handleGoogleLogin, isLoading } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-opacity-80 bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-white p-8 w-full"
        >
          <Link href="/">
            <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
              <Image
                src="/logo.svg"
                height={200}
                width={200}
                alt="buildsocialpost.com"
              />
              Buildsocialpost
            </h1>
          </Link>
          <p className="mb-8 text-gray-300 text-center">
            Sign in and start creating your own carousels with
            Buildsocialpost.com
          </p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full"
          >
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.error("Google Login Failed");
              }}
              shape="circle"
              width={370}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
