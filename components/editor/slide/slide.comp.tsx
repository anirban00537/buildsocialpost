import React from "react";

interface SlideProps {
  slide: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
  };
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
  return (
    <div
      className="relative bg-cover bg-center p-8 h-full w-full flex flex-col justify-between text-white"
      style={{ backgroundImage: `url(${slide.imageUrl})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="relative z-10 flex-grow flex flex-col justify-between">
        <div className="mb-4">
          <textarea
            value={slide.subtitle}
            onChange={(e) =>
              updateSlide(index, { ...slide, subtitle: e.target.value })
            }
            placeholder="Subtitle"
            className="w-full p-2 mb-2 text-lg bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          />
          <textarea
            value={slide.title}
            onChange={(e) =>
              updateSlide(index, { ...slide, title: e.target.value })
            }
            placeholder="Title"
            className="w-full p-2 mb-2 text-4xl font-bold bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          />
          <textarea
            value={slide.description}
            onChange={(e) =>
              updateSlide(index, { ...slide, description: e.target.value })
            }
            placeholder="Description"
            className="w-full p-2 text-base bg-transparent border-0 placeholder-white focus:outline-none break-words whitespace-normal resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SlideComponent;
