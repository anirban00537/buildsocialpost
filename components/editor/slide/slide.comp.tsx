import React from "react";
import { Slide } from "@/types";

interface SlideProps {
  slide: Slide;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number) => void;
}

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  index,
  updateSlide,
  deleteSlide,
}) => {
  const backgroundImageStyle = slide.imageUrl
    ? { backgroundImage: `url(${slide.imageUrl})` }
    : { background: "linear-gradient(to right, #ff7e5f, #feb47b)" };

  return (
    <div
      className="relative bg-cover bg-center p-8 h-full w-full flex flex-col justify-between text-white"
      style={backgroundImageStyle}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="relative z-10 flex-grow flex flex-col justify-between">
        <div className="mb-4">
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
        <div className="flex items-center mt-4">
          {slide.headshotUrl && (
            <img
              src={slide.headshotUrl}
              alt="Headshot"
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div className="flex flex-col">
            <div className="p-1 text-lg bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none">
              {slide.name || "Anirban Roy"}
            </div>
            <div className="p-1 text-sm text-gray-400 bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none">
              {slide.handle || "@anirban00537"}
            </div>
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
