"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { loginWithGoogle, isLoading } = useAuth();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
            Welcome to BuildCarousel
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            height={100}
            width={100}
            alt="buildcarousel.com"
            className="mb-4"
          />
          <p className="mb-6 text-gray-300 text-center">
            Sign in with your Google account to get started. It's quick, easy,
            and secure!
          </p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
              onClick={loginWithGoogle}
              disabled={isLoading}
            >
              <FaGoogle className="w-5 h-5" />
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
