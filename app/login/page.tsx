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
    <div className="min-h-screen w-full flex">
      {/* Left Side - Design/Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative w-full flex flex-col items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md text-center"
          >
            <Image
              src="/logo-white.svg" // Make sure to have a white version of your logo
              height={80}
              width={80}
              alt="Buildsocialpost.com"
              className="mb-8 mx-auto"
            />
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Create Professional LinkedIn Content
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Transform your LinkedIn presence with AI-powered content creation tools
            </p>
            
            {/* Feature List */}
            <div className="space-y-4 text-left">
              {[
                { text: "AI-powered content generation", delay: 0.2 },
                { text: "Professional carousel creation", delay: 0.3 },
                { text: "Smart scheduling tools", delay: 0.4 },
                { text: "Analytics and insights", delay: 0.5 },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white/90">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 p-8 sm:p-10"
        >
          <div className="text-center">
            <div className="lg:hidden">
              <Link href="/" className="flex justify-center">
                <Image
                  src="/logo.svg"
                  height={70}
                  width={70}
                  alt="Buildsocialpost.com"
                  className="mb-4"
                />
              </Link>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to continue to Buildsocialpost.com
            </p>
          </div>

          {/* Login Form Section */}
          <div className="mt-8 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <GoogleLogin
                  onSuccess={onLoginSuccess}
                  onError={() => {
                    console.error("Google Login Failed");
                  }}
                  shape="rectangular"
                  width={300}
                  theme="filled_blue"
                  text="signin_with"
                  size="large"
                />
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="text-center space-y-2">
            <Link 
              href="/" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Back to Home
            </Link>
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
