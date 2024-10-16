import React from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setLayoutHeightAndWidth } from "@/state/slice/carousel.slice";
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaInstagram } from "react-icons/fa";

interface CarouselSizeDropdownProps {
  className?: string;
}

const sizes = [
  {
    name: "Square",
    ratio: "1:1",
    width: 600,
    height: 600,
    icons: [FaInstagram, FaLinkedinIn, FaFacebookF],
  },
  {
    name: "Portrait",
    ratio: "3:4",
    width: 540,
    height: 720,
    icons: [FaInstagram, FaTiktok],
  },
  {
    name: "Carousel",
    ratio: "4:5",
    width: 576,
    height: 720,
    icons: [FaInstagram, FaFacebookF],
  },
  {
    name: "Story Carousel",
    ratio: "9:16",
    width: 540,
    height: 960,
    icons: [FaInstagram, FaFacebookF, FaTiktok],
  },
  {
    name: "Landscape",
    ratio: "4:3",
    width: 720,
    height: 540,
    icons: [FaInstagram, FaFacebookF],
  },
  {
    name: "Presentation",
    ratio: "16:9",
    width: 800,
    height: 450,
    icons: [FaLinkedinIn, FaInstagram],
  },
];

const CarouselSizeDropdown: React.FC<CarouselSizeDropdownProps> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(
    (state: RootState) => state.slides.layout
  );

  const handleSizeChange = (width: number, height: number) => {
    dispatch(setLayoutHeightAndWidth({ width, height }));
  };

  const renderIcons = (icons: typeof FaInstagram[]) => {
    return icons.map((Icon, index) => (
      <Icon key={index} className="w-3 h-3 text-textColor/85" />
    ));
  };

  const selectedSize = sizes.find(size => size.width === width && size.height === height) || sizes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 px-2 bg-cardBackground text-textColor/85 hover:bg-primary/50 border border-borderColor ${className}`}
        >
          <div className="flex items-center space-x-1.5">
            <div className="flex">
              {renderIcons(selectedSize.icons)}
            </div>
            <span className="text-xs font-medium">
              {selectedSize.name} ({selectedSize.ratio})
            </span>
            <ChevronDown className="h-3 w-3 flex-shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 bg-cardBackground border border-borderColor">
        <DropdownMenuLabel className="text-xs font-semibold bg-cardBackground text-textColor/85 mb-2">
          Choose size
        </DropdownMenuLabel>
        <div className="max-h-[300px] overflow-y-auto">
          {sizes.map((size) => (
            <DropdownMenuItem
              key={size.ratio}
              onClick={() => handleSizeChange(size.width, size.height)}
              className={`flex items-center py-1.5 px-2 hover:bg-primary/10 rounded-md cursor-pointer transition-colors duration-200 ${
                size.width === width && size.height === height ? 'bg-primary/20' : ''
              }`}
            >
              <div className="flex-1 flex items-center">
                <div className="w-12 flex">
                  {renderIcons(size.icons)}
                </div>
                <div className="flex flex-col ml-2">
                  <span className="font-medium text-xs text-textColor">{size.name}</span>
                  <span className="text-[10px] text-textColor/70">
                    {size.width} x {size.height}px
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-textColor/85 ml-auto">
                {size.ratio}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CarouselSizeDropdown;
