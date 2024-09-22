import React from "react";
import {
  Plus,
  Trash2,
  Copy,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  ImagePlus,
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
}) => {
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
        <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={() => handleImageIconClick(index, "background")}
          title="Change background image"
        >
          <ImageIcon size={15} />
        </button>
        {/* <button
          className="flex items-center justify-center bg-cardBackground text-textColor border-none rounded-md hover:bg-primary hover:border-primary hover:text-white h-6 w-6 z-10"
          onClick={() => handleImageIconClick(index, "slide")}
          title="Add image to slide"
        >
          <ImagePlus size={15} />
        </button> */}
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
