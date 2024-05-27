// SlideComponent.tsx
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
    <div className="bg-white p-6 rounded-lg shadow-lg h-full w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={slide.title}
          onChange={(e) =>
            updateSlide(index, { ...slide, title: e.target.value })
          }
          placeholder="Title"
          className="w-full p-2 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => deleteSlide(index)}
          className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
      <input
        type="text"
        value={slide.subtitle}
        onChange={(e) =>
          updateSlide(index, { ...slide, subtitle: e.target.value })
        }
        placeholder="Subtitle"
        className="w-full mb-4 p-2 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={slide.description}
        onChange={(e) =>
          updateSlide(index, {
            ...slide,
            description: e.target.value,
          })
        }
        placeholder="Description"
        className="w-full mb-4 p-2 rounded border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <img
        src={slide.imageUrl}
        alt="Slide"
        className="w-full h-32 object-cover rounded"
      />
    </div>
  );
};

export default SlideComponent;
