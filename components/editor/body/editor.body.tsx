"use client";
import React, { useState } from "react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import MainSidebar from "../sidebar/main.sidebar";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const initialSlides: Slide[] = [
  {
    title: "Amazing Catchy Title Goes Right Here!",
    subtitle: "Your amazing subtitle goes here",
    description: "Your amazing description goes here.",
    imageUrl: "https://source.unsplash.com/random/800x600", // Example Unsplash image
  },
  {
    title: "Section Title",
    subtitle: "Your amazing subtitle goes here",
    description: "Put your content here.",
    imageUrl: "https://source.unsplash.com/random/800x601", // Example Unsplash image
  },
];

const CarouselEditor: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);

  const addSlide = () => {
    const newSlide: Slide = {
      title: "New Slide",
      subtitle: "Subtitle",
      description: "Description",
      imageUrl: "https://source.unsplash.com/random/800x602", // Example Unsplash image
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlide = (index: number, updatedSlide: Slide) => {
    const newSlides = slides.map((slide, i) =>
      i === index ? updatedSlide : slide
    );
    setSlides(newSlides);
  };

  const deleteSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
  };

  return (
    <main className="flex h-full bg-slate-100 overflow-auto">
      <div className="w-full p-4 flex flex-col justify-center items-center">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          a11y={{ enabled: true }}
          style={{ width: "80%", height: "40rem" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              style={{ width: "30rem", height: "35rem" }}
            >
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
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={addSlide}
          className="mt-8 p-4 bg-blue-500 text-white rounded-full hover:bg-blue-700"
        >
          Add Slide
        </button>
      </div>
    </main>
  );
};

export default CarouselEditor;
