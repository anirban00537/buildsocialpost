"use client";
import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  addSlide,
  copySlide,
  deleteSlide,
  updateSlide,
} from "@/state/slice/carousel.slice";
import { RootState } from "@/state/store";
import { Slide } from "@/types";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const CarouselEditor: React.FC = () => {
  const dispatch = useDispatch();
  const slides = useSelector((state: RootState) => state.slides);
  const swiperRef = useRef<any>(null); // Reference to Swiper instance
  const { claims, loading, token, user } = useUser();

  const handleAddSlide = useCallback(() => {
    dispatch(addSlide());
  }, [dispatch]);

  const handleCopySlide = useCallback(
    (index: number) => {
      dispatch(copySlide(index));
    },
    [dispatch]
  );

  const handleDeleteSlide = useCallback(
    (index: number) => {
      dispatch(deleteSlide(index));
    },
    [dispatch]
  );

  const handleUpdateSlide = (index: number, updatedSlide: Slide) => {
    dispatch(updateSlide({ index, updatedSlide }));
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
                className="flex flex-col justify-center items-center"
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
                    updateSlide={handleUpdateSlide}
                    deleteSlide={handleDeleteSlide}
                  />
                </div>
                <div className="flex mt-3 space-x-2">
                  <button
                    className="text-gray-500 border h-6 w-6 flex items-center justify-center border-gray-500 rounded-full hover:bg-blue-700 z-10"
                    onClick={handleAddSlide}
                  >
                    <Plus size={18} />
                  </button>
                  <button
                    className="text-gray-500 p-1 rounded-full hover:bg-blue-700 z-10"
                    onClick={() => handleCopySlide(index)}
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    className="text-gray-500 p-1 rounded-full hover:bg-blue-700 z-10"
                    onClick={() => handleDeleteSlide(index)}
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
          onClick={handleAddSlide}
          className="mt-8 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
        >
          Add Slide
        </button>
      </div>
    </main>
  );
};

export default CarouselEditor;
