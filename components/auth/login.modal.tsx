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
      <DialogContent className="bg-opacity-80 bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-white sm:max-w-[425px]">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4  w-full text-center bg-gradient-to-r from-blue-400 to-primary text-transparent bg-clip-text">
            Login
          </h2>
          <div className="flex flex-col items-center">
            <Image
              src="/logo.svg"
              height={100}
              width={100}
              alt="buildcarousel.com"
              className="mb-4"
            />
            <p className="mb-6 text-gray-300 text-center">
              Sign in and start creating your own carousels with BuildCarousel.com
            </p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full"
            >
              <Button
                className="w-full flex items-center justify-center gap-2 bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                onClick={loginWithGoogle}
                disabled={isLoading}
              >
                <FaGoogle className="w-5 h-5" />
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
