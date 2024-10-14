"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

const LoginPage = () => {
  const { loginWithGoogle, isLoading } = useAuth();

  const handleGoogleLogin = useCallback(
    async (credentialResponse: CredentialResponse) => {
      try {
        console.log("Credential Response:", credentialResponse);
        if (credentialResponse.credential) {
          // await loginWithGoogle(credentialResponse.credential);
          console.log("Login successful", credentialResponse.credential);
          // Redirect or update state as needed
        } else {
          console.error("No credential received from Google");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    },
    [loginWithGoogle]
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/4 h-1/4 bg-gradient-to-bl from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>
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
                height={100}
                width={100}
                alt="buildcarousel.com"
                className="mx-auto mb-4"
              />
            </h1>
          </Link>
          <p className="mb-8 text-gray-300 text-center">
            Sign in and start creating your own carousels with BuildCarousel.com
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
