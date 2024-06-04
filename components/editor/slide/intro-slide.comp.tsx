import React from "react";
import { generalSettings, IntroSlide } from "@/types";

interface SlideProps {
  slide: any;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number) => void;
}

const IntroSlideComponent: React.FC<SlideProps> = ({
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
      className="relative bg-cover bg-center h-full w-full flex items-center justify-center text-white"
      style={backgroundImageStyle}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
        <div className="mb-4 w-full">
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, tagline: e.target.innerText })
            }
            className="w-full p-2 mb-2 text-2xl italic bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.tagline || "Your Tagline Here"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, title: e.target.innerText })
            }
            className="w-full p-2 mb-2 text-4xl font-bold bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.title || "Your Title Here"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, paragraph: e.target.innerText })
            }
            className="w-full p-2 text-base bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          >
            {slide.paragraph ||
              "Your introductory paragraph here. Describe your content briefly."}
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

export default IntroSlideComponent;
