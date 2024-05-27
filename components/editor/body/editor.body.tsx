"use client";
import React, { useState, useCallback } from "react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import debounce from "lodash/debounce";
import SlideComponent from "../slide/slide.comp";

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
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example Unsplash image
  },
  {
    title: "Section Title",
    subtitle: "Your amazing subtitle goes here",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example Unsplash image
  },
  {
    title: "Section Title",
    subtitle: "Your amazing subtitle goes here",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CarouselEditor: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);

  const addSlide = useCallback(() => {
    const newSlide: Slide = {
      title: "New Slide",
      subtitle: "Subtitle",
      description: "Description",
      imageUrl:
        "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example Unsplash image
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
  }, []);

  const debouncedUpdateSlide = useCallback(
    debounce((index: number, updatedSlide: Slide) => {
      setSlides((prevSlides) =>
        prevSlides.map((slide, i) => (i === index ? updatedSlide : slide))
      );
    }, 300), // 300ms debounce delay
    []
  );

  const updateSlide = (index: number, updatedSlide: Slide) => {
    debouncedUpdateSlide(index, updatedSlide);
  };

  const deleteSlide = useCallback((index: number) => {
    setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
  }, []);

  return (
    <main className="flex h-full bg-slate-100 overflow-auto">
      <div className="w-full p-4 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-full h-full">
          <Swiper
            spaceBetween={0}
            slidesPerView="auto"
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            a11y={{ enabled: true }}
            style={{ width: "auto", height: "40rem" }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                style={{ width: "30rem", height: "35rem" }}
              >
                <SlideComponent
                  slide={slide}
                  index={index}
                  updateSlide={updateSlide}
                  deleteSlide={deleteSlide}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
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
