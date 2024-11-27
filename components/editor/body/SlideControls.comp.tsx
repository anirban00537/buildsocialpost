import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  X,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Slide } from "@/types";

interface SlideControlsProps {
  index: number;
  slide: Slide;
  handleInsertSlide: (index: number) => void;
  handleCopySlide: (index: number) => void;
  handleDeleteSlide: (index: number) => void;
  handleMoveSlideLeft: (index: number) => void;
  handleMoveSlideRight: (index: number) => void;
  handleImageIconClick: (index: number, type: "background" | "slide") => void;
  handleSettingChange: (
    index: number,
    setting: keyof Slide,
    value: boolean
  ) => void;
  handleRemoveImage: (index: number) => void;
}

const SlideControls: React.FC<SlideControlsProps> = ({
  index,
  slide,
  handleInsertSlide,
  handleCopySlide,
  handleDeleteSlide,
  handleMoveSlideLeft,
  handleMoveSlideRight,
  handleImageIconClick,
  handleSettingChange,
  handleRemoveImage,
}) => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  return (
    <div className="flex items-center justify-between mt-3 w-full px-2">
      <div className="flex items-center space-x-2">
        <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={() => handleInsertSlide(index)}
          title="Insert new slide"
        >
          <Plus size={22} />
        </button>
        <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={() => handleCopySlide(index)}
          title="Copy slide"
        >
          <Copy size={12} />
        </button>
        <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={() => handleDeleteSlide(index)}
          title="Delete slide"
        >
          <Trash2 size={15} />
        </button>
        <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={(e) => {
            e.stopPropagation(); // Prevent slide click event
            handleMoveSlideLeft(index);
          }}
          title="Move slide left"
        >
          <ArrowLeft size={15} />
        </button>
        <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={(e) => {
            e.stopPropagation(); // Prevent slide click event
            handleMoveSlideRight(index);
          }}
          title="Move slide right"
        >
          <ArrowRight size={15} />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className=" flex items-center justify-center rounded-md  h-8 w-8">
            {slide.backgroundImage ? (
              <div className="bg-cardBackground border border-borderColor">
                <img
                  src={slide.backgroundImage}
                  alt="Background"
                  onClick={() => handleImageIconClick(index, "background")}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  className="text-xs text-primary hover:text-primary/80 bg-cardBackground border border-borderColor rounded-md absolute top-0 right-0"
                  onClick={() => {
                    handleRemoveImage(index);
                    setShowImagePreview(false);
                  }}
                >
                  <X size={16} className="absolute top-0 right-0" />
                </button>
              </div>
            ) : (
              <button
                className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
                onClick={() => handleImageIconClick(index, "background")}
                title={
                  slide.backgroundImage
                    ? "View/change background image"
                    : "Add background image"
                }
              >
                <ImageIcon size={15} />
              </button>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
              title="Slide settings"
            >
              <Settings size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cardBackground text-textColor border-borderColor">
            <DropdownMenuLabel>Slide Settings</DropdownMenuLabel>
            {(
              [
                { value: "showImage", label: "Show Image" },
                { value: "showTagline", label: "Show Tagline" },
                { value: "showTitle", label: "Show Title" },
                { value: "showDescription", label: "Show Description" },
              ] as const
            ).map((setting) => (
              <DropdownMenuItem
                key={setting.value}
                className="flex items-center justify-between"
              >
                <span>{setting.label}</span>
                <Switch
                  checked={slide[setting.value]}
                  className="data-[state=checked]:bg-primary bg-cardBackground data-[state=unchecked]:bg-primary/50"
                  onCheckedChange={(checked) =>
                    handleSettingChange(index, setting.value, checked)
                  }
                />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SlideControls;
