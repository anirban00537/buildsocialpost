"use client";
import React from "react";
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
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Copy,
  Download,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import useCarousel from "@/hooks/useCarousel";
import SlideComponent from "../slide/slide.comp";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const CarouselEditor: React.FC = () => {
  const {
    swiperRef,
    slides,
    layout,
    handleSlideClick,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
    handleMoveSlideLeft,
    handleMoveSlideRight,
  } = useCarousel();

  return (
    <main className="flex h-full overflow-hidden">
      <div className="w-full p-4 flex flex-col justify-center items-center">
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            spaceBetween={1}
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
            style={{ width: "100%", height: `${layout.height + 80}px` }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col justify-center items-center"
                onClick={() => handleSlideClick(index)}
                style={{
                  width: layout.width + "px",
                  height: layout.height + "px",
                }}
              >
                <div
                  id={`slide-${index}`}
                  style={{
                    width: layout.width + "px",
                    height: layout.height + "px",
                    overflow: "hidden",
                  }}
                >
                  <SlideComponent
                    slide={slide}
                    index={index}
                    updateSlide={handleUpdateSlide}
                    slideNumber={index}
                  />
                </div>
                <div className="flex items-center justify-start mt-3 space-x-2">
                  <button
                    className="flex items-center justify-center border-slate-400 text-slate-400 border  rounded-md hover:bg-blue-700  h-6 w-6 z-10"
                    onClick={() => handleInsertSlide(index)}
                  >
                    <Plus size={22} />
                  </button>
                  <button
                    className="flex items-center justify-center border-slate-400 text-slate-400 border  rounded-md hover:bg-blue-700  h-6 w-6 z-10"
                    onClick={() => handleCopySlide(index)}
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    className="flex items-center justify-center border-red-300 text-red-300 border  rounded-md hover:bg-blue-700  h-6 w-6 z-10"
                    onClick={() => handleDeleteSlide(index)}
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    className="flex items-center justify-center border-slate-400 text-slate-400 border  rounded-md hover:bg-blue-700  h-6 w-6 z-10"
                    onClick={() => handleMoveSlideLeft(index)}
                  >
                    <ArrowLeft size={15} />
                  </button>
                  <button
                    className="flex items-center justify-center border-slate-400 text-slate-400 border  rounded-md hover:bg-blue-700  h-6 w-6 z-10"
                    onClick={() => handleMoveSlideRight(index)}
                  >
                    <ArrowRight size={15} />
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
