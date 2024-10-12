import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UploadIcon } from "lucide-react";
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

  return (
    <div className="w-full h-full p-4 flex flex-col bg-background/50 backdrop-blur-sm">
      <form className="flex flex-col h-full" onSubmit={handleSubmit}>
        <legend className="text-base font-semibold text-textColor mb-3">
          Branding
        </legend>
        <div className="flex-grow overflow-y-auto pr-2 mb-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-textColor/80">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name..."
              className="h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle" className="text-sm text-textColor/80">
              Handle
            </Label>
            <Input
              id="handle"
              placeholder="Enter your handle..."
              className="h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50"
              value={handle}
              onChange={handleHandleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headshot" className="text-sm text-textColor/80">
              Headshot
            </Label>
            <div className="flex items-center gap-3">
              <input
                id="headshot"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="headshot"
                className="cursor-pointer flex items-center gap-2 border rounded-md p-1.5 text-xs font-medium text-textColor border-borderColor/50 bg-cardBackground/50 hover:bg-cardBackground/70 transition-colors duration-200"
              >
                <UploadIcon size={14} />
                Upload Headshot
              </label>
              {previewImage || headshot !== "/creator.jpg" ? (
                <Image
                  src={
                    previewImage ||
                    `${process.env.NEXT_PUBLIC_URL}/api/images/show-image?file=${headshot}`
                  }
                  alt="Headshot"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={"/creator.jpg"}
                  alt="Default Headshot"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="w-full text-sm"
            disabled={loading || !isAuthenticated}
          >
            {loading ? (
              <>
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
                Saving...
              </>
            ) : (
              "Save Branding"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrandingSection;
