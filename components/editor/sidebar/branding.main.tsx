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
    user,
  } = useBranding();

  return (
    <div className="w-full h-full p-2">
      <form
        className="grid w-full items-start gap-6 p-3 rounded-lg bg-background"
        onSubmit={handleSubmit}
      >
        <legend className="text-lg font-semibold text-textColor">
          Branding
        </legend>
        <fieldset className="grid gap-6 rounded-lg border border-borderColor p-4 bg-background">
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-textColor">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name..."
              className="min-h-[3.5rem] rounded-lg border text-textColor border-borderColor bg-cardBackground"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="handle" className="text-textColor">
              Handle
            </Label>
            <Input
              id="handle"
              placeholder="Enter your handle..."
              className="min-h-[3.5rem] rounded-lg border text-textColor border-borderColor bg-cardBackground"
              value={handle}
              onChange={handleHandleChange}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="headshot" className="text-textColor">
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
                className="cursor-pointer flex items-center gap-2 border rounded-lg p-2 text-sm font-medium text-textColor border-borderColor bg-cardBackground hover:bg-gray-100"
              >
                <UploadIcon size={20} />
                Upload Headshot
              </label>
              {headshot && (
                <Image
                  src={headshot}
                  alt="Headshot"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </div>
          </div>
        </fieldset>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="mt-4 w-full"
          disabled={loading || !user}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2"
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
      </form>
    </div>
  );
};

export default BrandingSection;
