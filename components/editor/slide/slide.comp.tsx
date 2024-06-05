import React from "react";
import { generalSettings, Slide } from "@/types";

interface SlideProps {
  slide: Slide;
  generalSettings: generalSettings;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number) => void;
}

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  index,
  generalSettings,
  updateSlide,
  deleteSlide,
}) => {
  const backgroundImageStyle = slide.imageUrl
    ? { backgroundImage: `url(${slide.imageUrl})` }
    : { background: "#feb47b" };

  return (
    <div
      className="relative bg-cover bg-center h-full w-full flex items-center justify-center text-white"
      style={backgroundImageStyle}
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
        <div className="mb-4 w-full">
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, subtitle: e.target.innerText })
            }
            className="w-full p-2 mb-2 text-lg bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.subtitle || "Subtitle"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, title: e.target.innerText })
            }
            className="w-full p-2 mb-2 text-4xl font-bold bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.title || "Title"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, description: e.target.innerText })
            }
            className="w-full p-2 text-base bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.description || "Description"}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-4 flex items-center space-x-4 p-2 rounded-lg">
        {generalSettings.headshotUrl && (
          <img
            src={generalSettings.headshotUrl}
            alt="Headshot"
            className="w-10 h-10 rounded-full"
          />
        )}
        <div className="flex flex-col">
          <div className="text-sm font-semibold">
            {generalSettings.name || "Anirban Roy"}
          </div>
          <div className="text-xs text-gray-300">
            {generalSettings.handle || "@anirban00537"}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-center text-xs py-1">
        Created by{" "}
        <a href="https://buildcarousel.com" className="text-white underline">
          buildcarousel.com
        </a>
      </div>
    </div>
  );
};

export default SlideComponent;
