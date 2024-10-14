"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCallback } from "react";

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { handleGoogleLogin, isLoading } = useAuth();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-opacity-80 bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-white sm:max-w-[425px] flex flex-col h-[90vh] sm:h-auto">
        <div className="flex flex-col justify-center items-center flex-grow">
          <DialogTitle className="text-2xl font-bold mb-4 w-full text-center bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
            Login
          </DialogTitle>
          <DialogDescription className="sr-only">
            Sign in and start creating your own carousels with BuildCarousel.com
          </DialogDescription>
          <div className="flex flex-col items-center w-full">
            <Image
              src="/logo.svg"
              height={80}
              width={80}
              alt="buildcarousel.com"
              className="mb-4"
            />
            <p className="mb-6 text-gray-300 text-center">
              Sign in and start creating your own carousels with
              BuildCarousel.com
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full"
            >
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleGoogleLogin(credentialResponse, onClose)
                }
                onError={() => {
                  console.error("Google Login Failed");
                }}
                shape="circle"
                width={370}
              />
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
