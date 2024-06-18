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
} from "lucide-react";
import useCarousel from "@/hooks/useCarousel";
import SlideComponent from "../slide/slide.comp";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const CarouselEditor: React.FC = () => {
  const {
    swiperRef,
    slides,
    generalSettings,
    themes,
    selectedTheme,
    layout,
    textSettings,
    handleSlideClick,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
    exportSlidesToPDF,
  } = useCarousel();

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
            style={{ width: "100%", height: "640px" }}
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
                    generalSettings={generalSettings}
                    updateSlide={handleUpdateSlide}
                    textAlign={textSettings.alignment}
                    slideNumber={index + 1}
                    fontSize={textSettings.fontSize}
                    backgroundColor="#d1d5db"
                  />
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
        <button
          className="mt-4 flex items-center justify-center text-gray-500 border border-gray-500 rounded-md hover:bg-blue-700 p-2"
          onClick={exportSlidesToPDF}
        >
          <Download size={22} className="mr-2" />
          Export as PDF
        </button>
      </div>
    </main>
  );
};

export default CarouselEditor;
