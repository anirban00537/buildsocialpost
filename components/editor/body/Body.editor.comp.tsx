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
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCarousel from "@/hooks/useCarousel";
import SlideComponent from "../slide/slide.comp";
import ImageUploadModal from "../Image_upload_modal/Image-Upload-Modal.comp";

import SlideControls from "./Slide-Controls.comp";
import DownloadLoading from "@/components/utils-components/loading/Download.loading.comp";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const CarouselEditor: React.FC = () => {
  const {
    swiperRef,
    slides,
    layout,
    isModalOpen,
    setIsModalOpen,
    handleSlideClick,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
    handleMoveSlideLeft,
    handleMoveSlideRight,
    handleImageIconClick,
    handleImageSelect,
    handleSettingChange,
    handleRemoveImage,
    carouselDownloading,
  } = useCarousel();

  return (
    <main className="flex h-full overflow-hidden w-full px-2 relative">
      <div className="w-full p-4 flex flex-col justify-center items-center">
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            spaceBetween={1}
            slidesPerView="auto"
            centeredSlides={true}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
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
                className="flex flex-col justify-center items-center slide-container"
                onClick={() => handleSlideClick(index)}
                style={{
                  width: layout.width + "px",
                  height: layout.height + "px",
                }}
              >
                <SlideControls
                  index={index}
                  slide={slide}
                  handleInsertSlide={handleInsertSlide}
                  handleCopySlide={handleCopySlide}
                  handleDeleteSlide={handleDeleteSlide}
                  handleMoveSlideLeft={handleMoveSlideLeft}
                  handleMoveSlideRight={handleMoveSlideRight}
                  handleImageIconClick={handleImageIconClick}
                  handleSettingChange={handleSettingChange}
                  handleRemoveImage={handleRemoveImage}
                />
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
              </SwiperSlide>
            ))}
          </Swiper>
          <button 
            className="swiper-button-prev absolute top-1/2 -left-4 transform -translate-y-1/2 
                       w-10 h-10 flex items-center justify-center 
                       bg-white shadow-lg border border-gray-200 
                       rounded-full z-[60] hover:bg-gray-50 
                       transition-all duration-200"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button 
            className="swiper-button-next absolute top-1/2 -right-4 transform -translate-y-1/2 
                       w-10 h-10 flex items-center justify-center 
                       bg-white shadow-lg border border-gray-200 
                       rounded-full z-[60] hover:bg-gray-50 
                       transition-all duration-200"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
      {carouselDownloading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <DownloadLoading />
        </div>
      )}
    </main>
  );
};

export default CarouselEditor;
