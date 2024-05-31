"use client";
import React, { useState, useCallback, useRef } from "react";
import SwiperCore from "swiper";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import debounce from "lodash/debounce";
import { ChevronLeft, ChevronRight, Plus, Trash2, Copy } from "lucide-react";
import SlideComponent from "../slide/slide.comp";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

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
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Section Title",
    subtitle: "Your amazing subtitle goes here",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  const swiperRef = useRef<any>(null); // Reference to Swiper instance

  const addSlide = useCallback(() => {
    const newSlide: Slide = {
      title: "New Slide",
      subtitle: "Subtitle",
      description: "Description",
      imageUrl:
        "https://images.unsplash.com/photo-1716718406268-6ece312abee0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
  }, []);

  const copySlide = useCallback((index: number) => {
    setSlides((prevSlides) => [...prevSlides, prevSlides[index]]);
  }, []);

  const deleteSlide = useCallback((index: number) => {
    setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
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

  const handleSlideClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index, 500); // Slide to the clicked slide with a transition of 500ms
    }
  };

  return (
    <main className="flex h-full overflow-hidden">
      <div className="w-full p-4 flex flex-col justify-center items-center">
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            spaceBetween={0}
            slidesPerView="auto"
            centeredSlides={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{ enabled: false }}
            scrollbar={{ hide: true, enabled: false }}
            a11y={{ enabled: true }}
            allowTouchMove={false}
            style={{ width: "100%", height: "40rem" }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className=" flex flex-col justify-center items-center"
                onClick={() => handleSlideClick(index)}
                style={{
                  width: "30rem",
                  height: "40rem",
                }}
              >
                <div style={{ width: "30rem", height: "35rem" }}>
                  <SlideComponent
                    slide={slide}
                    index={index}
                    updateSlide={updateSlide}
                    deleteSlide={deleteSlide}
                  />
                </div>
                <div className="flex mt-3 space-x-2">
                  <button
                    className="text-gray-500 border h-6 w-6 flex items-center justify-center border-gray-500 rounded-full hover:bg-blue-700 z-10"
                    onClick={addSlide}
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    className="text-gray-500  p-1  rounded-full hover:bg-blue-700 z-10"
                    onClick={() => copySlide(index)}
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    className="text-gray-500  p-1 rounded-full hover:bg-blue-700 z-10"
                    onClick={() => deleteSlide(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="custom-prev absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 z-20">
            <ChevronLeft />
          </button>
          <button className="custom-next absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 z-20">
            <ChevronRight />
          </button>
        </div>
        <button
          onClick={addSlide}
          className="mt-8 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
        >
          Add Slide
        </button>
      </div>
    </main>
  );
};

export default CarouselEditor;
