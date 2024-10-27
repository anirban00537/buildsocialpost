"use client";
import React, { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { handleGoogleLogin, isLoading } = useAuth();
  const router = useRouter();

  const onLoginSuccess = useCallback(
    (credentialResponse: CredentialResponse) => {
      handleGoogleLogin(credentialResponse)
        .then(() => {
          router.push("/"); // Redirect to home page after successful login
        })
        .catch((error) => {
          console.error("Login failed:", error);
          // Optionally show an error message to the user
        });
    },
    [handleGoogleLogin, router]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-cardBackground/40 backdrop-blur-lg p-10 rounded-xl border border-borderColor/50 shadow-xl"
      >
        <div>
          <Link href="/" className="flex justify-center">
            <Image
              src="/logo.svg"
              height={100}
              width={100}
              alt="Buildsocialpost.com"
              className="mb-4"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-textColor">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-textColor/70">
            Create professional LinkedIn carousels with Buildsocialpost.com
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={() => {
                console.error("Google Login Failed");
                // Optionally show an error message to the user
              }}
              shape="rectangular"
              width={300}
              theme="filled_blue"
              text="signin_with"
              size="large"
            />
          </motion.div>
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-primary hover:text-primary/80 text-sm">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
