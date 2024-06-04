import React from "react";
import { generalSettings, Slide } from "@/types";

interface SlideProps {
  slide: Slide;
  generalSettings: generalSettings;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number) => void;
}

const OutroSliderComponent: React.FC<SlideProps> = ({
  slide,
  generalSettings,
  index,
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
        <div className="mb-4 w-full max-w-3xl">
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, subtitle: e.target.innerText })
            }
            className="w-full p-2 mb-2 text-lg bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.subtitle || "Your guide to finding balance in life"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, title: e.target.innerText })
            }
            className="w-full p-2 mb-2 text-4xl font-bold bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.title || "Focus on Balance"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, description: e.target.innerText })
            }
            className="w-full p-2 text-base bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.description ||
              "It's important to prioritize balance in your life. With some intentional planning, you can find balance and enjoy more peace of mind."}
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">
              Start creating balance today!
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex items-center p-4 mb-2">
        {generalSettings.headshotUrl && (
          <img
            src={generalSettings.headshotUrl}
            alt="Headshot"
            className="w-8 h-8 rounded-full mr-4"
          />
        )}
        <div className="flex flex-col ">
          <div className="text-sm bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none">
            {generalSettings.name || "Anirban Roy"}
          </div>
          <div className="p-1 text-sm text-gray-400 bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none">
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

export default OutroSliderComponent;
