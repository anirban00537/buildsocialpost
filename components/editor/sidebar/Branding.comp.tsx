import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadIcon, User } from "lucide-react";
import useBranding from "@/hooks/useBranding";

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
    <div className="w-full h-full p-6 flex flex-col bg-background/50 backdrop-blur-sm">
      <form className="flex flex-col h-full" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-textColor mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Brand Identity
        </h2>
        <div className="flex-grow overflow-y-auto pr-2 mb-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative group w-32 h-32">
                <Image
                  src={previewImage || headshot || "/creator.jpg"}
                  alt="Headshot"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                />
                <label
                  htmlFor="headshot"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg transform translate-x-1/4 translate-y-1/4 hover:bg-primary-dark transition-all duration-300"
                >
                  <UploadIcon size={16} />
                </label>
                <input
                  id="headshot"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={onImageUpload}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-textColor/80"
              >
                Full Name
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10 h-10 text-sm rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="handle"
                className="text-sm font-medium text-textColor/80"
              >
                Username
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  @
                </span>
                <Input
                  id="handle"
                  placeholder="Choose a username"
                  className="pl-8 h-10 text-sm rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  value={handle}
                  onChange={handleHandleChange}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full text-sm font-semibold py-3 bg-primary hover:bg-primary-dark transition-all duration-300"
            disabled={loading || !isAuthenticated}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
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
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrandingSection;
