import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadIcon, User, AtSign, X, ChevronRight } from "lucide-react";
import useBranding from "@/hooks/useBranding";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BrandingSection: React.FC = () => {
  const {
    name,
    handle,
    headshot,
    loading,
    handleNameChange,
    handleHandleChange,
    handleImageUpload,
    handleSubmit,
    previewImage,
    isAuthenticated,
  } = useBranding();

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleImageUpload(e);
    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200
            bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Brand Settings</div>
              <div className="text-xs text-gray-500">Update your profile info</div>
            </div>
          </div>
          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">Brand Settings</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Profile Image */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <Label className="text-sm font-medium text-gray-900">
                Profile Image
              </Label>
            </div>
            <div className="flex justify-center">
              <motion.div 
                className="relative group w-28 h-28"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={previewImage || headshot || "/creator.jpg"}
                  alt="Headshot"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl ring-1 ring-gray-200 group-hover:ring-blue-200 transition-all duration-200"
                />
                <label
                  htmlFor="headshot"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer shadow-sm transform translate-x-1/4 translate-y-1/4 transition-all duration-200"
                >
                  <UploadIcon size={14} />
                </label>
                <input
                  id="headshot"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={onImageUpload}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Full Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                Full Name
              </Label>
            </div>
            <div className="relative">
              <Input
                id="name"
                placeholder="Enter your full name"
                className="h-10 text-sm rounded-xl border-gray-200 pl-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                value={name}
                onChange={handleNameChange}
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
          
          {/* Username */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AtSign className="h-4 w-4 text-blue-600" />
              <Label htmlFor="handle" className="text-sm font-medium text-gray-900">
                Username
              </Label>
            </div>
            <div className="relative">
              <Input
                id="handle"
                placeholder="Choose a username"
                className="h-10 text-sm rounded-xl border-gray-200 pl-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                value={handle}
                onChange={handleHandleChange}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                @
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || !isAuthenticated}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 
              bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating Brand...
              </div>
            ) : (
              "Save Changes"
            )}
          </motion.button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandingSection;
