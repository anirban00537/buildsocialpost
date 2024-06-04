"use client";
import React, { useRef } from "react";
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
import { ChevronLeft, ChevronRight, Plus, Trash2, Copy } from "lucide-react";
import SlideComponent from "../slide/slide.comp";
import useUser from "@/hooks/useUser";
import useCarousel from "@/hooks/useCarousel";
import IntroSlideComponent from "../slide/intro-slide.comp";
import { IntroSlide } from "@/types";
import OutroSliderComponent from "../slide/outro-slide.comp";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const CarouselEditor: React.FC = () => {
  const swiperRef = useRef<any>(null); // Reference to Swiper instance
  const { claims, loading, token, user } = useUser();
  const {
    slides,
    generalSettings,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
  } = useCarousel();

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
                className="flex flex-col justify-center items-center"
                onClick={() => handleSlideClick(index)}
                style={{
                  width: "30rem",
                  height: "40rem",
                }}
              >
                <div style={{ width: "30rem", height: "35rem" }}>
                  {slide.type === "intro" ? (
                    <IntroSlideComponent
                      slide={slide}
                      index={index}
                      updateSlide={handleUpdateSlide}
                      deleteSlide={handleDeleteSlide}
                    />
                  ) : slide.type === "slide" ? (
                    <SlideComponent
                      slide={slide}
                      index={index}
                      generalSettings={generalSettings}
                      updateSlide={handleUpdateSlide}
                      deleteSlide={handleDeleteSlide}
                    />
                  ) : (
                    <OutroSliderComponent
                      slide={slide}
                      index={index}
                      generalSettings={generalSettings}
                      updateSlide={handleUpdateSlide}
                      deleteSlide={handleDeleteSlide}
                    />
                  )}
                </div>
                <div className="flex items-center justify-start mt-3 space-x-2">
                  <button
                    className="flex items-center justify-center text-gray-500 border border-gray-500 rounded-md hover:bg-blue-700 p-1 h-7 w-7 z-10"
                    onClick={() => handleInsertSlide(index)}
                  >
                    <Plus size={22} />
                  </button>
                  <button
                    className="flex items-center justify-center text-gray-500 rounded-full hover:bg-blue-700 p-2 z-10"
                    onClick={() => handleCopySlide(index)}
                  >
                    <Copy size={22} />
                  </button>
                  <button
                    className="flex items-center justify-center text-gray-500 rounded-full hover:bg-blue-700 p-2 z-10"
                    onClick={() => handleDeleteSlide(index)}
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="custom-prev absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 z-20">
            <ChevronLeft size={24} />
          </button>
          <button className="custom-next absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 z-20">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default CarouselEditor;
