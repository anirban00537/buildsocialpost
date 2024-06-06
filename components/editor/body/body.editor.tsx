"use client";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import SlideComponent from "../slide/slide.comp";
import useUser from "@/hooks/useUser";
import useCarousel from "@/hooks/useCarousel";
import IntroSlideComponent from "../slide/intro-slide.comp";
import OutroSliderComponent from "../slide/outro-slide.comp";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { RootState } from "@/state/store";
import { setSelectedTheme } from "@/state/slice/carousel.slice";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const CarouselEditor: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const { claims, loading, token, user } = useUser();
  const {
    slides,
    generalSettings,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
  } = useCarousel();

  const dispatch = useDispatch();
  const themes = useSelector((state: RootState) => state.slides.themes);
  const selectedTheme = useSelector(
    (state: RootState) => state.slides.selectedTheme
  );

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedTheme(event.target.value as keyof typeof themes));
  };

  const handleSlideClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index, 500);
    }
  };

  const exportSlidesToPDF = async () => {
    const slideWidthInMM = 127;
    const slideHeightInMM = 148;

    const pdf = new jsPDF("p", "mm", [slideWidthInMM, slideHeightInMM]);

    for (let i = 0; i < slides.length; i++) {
      const slideElement = document.getElementById(`slide-${i}`);
      if (slideElement) {
        try {
          slideElement.style.width = `${30}rem`;
          slideElement.style.height = `${35}rem`;

          const imgData = await toPng(slideElement, { cacheBust: true });
          if (i !== 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "PNG", 0, 0, slideWidthInMM, slideHeightInMM);
        } catch (error) {
          console.error("Failed to export slide as image", error);
        }
      }
    }
    pdf.save("carousel_slides.pdf");
  };

  return (
    <main className="flex h-full overflow-hidden">
      <div className="w-full p-4 flex flex-col justify-center items-center">
        <div className="relative w-full mb-4">
          <label htmlFor="theme-select" className="mr-2">
            Choose Theme:
          </label>
          <select
            id="theme-select"
            value={selectedTheme}
            onChange={handleThemeChange}
            className="p-2 border rounded"
          >
            <option value="theme1">Theme 1</option>
            <option value="theme2">Theme 2</option>
            <option value="theme3">Theme 3</option>
          </select>
        </div>
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
                  height: "35rem",
                }}
              >
                <div
                  id={`slide-${index}`}
                  style={{
                    width: "30rem",
                    height: "35rem",
                    overflow: "hidden",
                  }}
                >
                  {slide.type === "intro" ? (
                    <IntroSlideComponent
                      slide={slide}
                      index={index}
                      updateSlide={handleUpdateSlide}
                      deleteSlide={handleDeleteSlide}
                      customStyles={themes[selectedTheme]}
                    />
                  ) : slide.type === "slide" ? (
                    <SlideComponent
                      slide={slide}
                      index={index}
                      generalSettings={generalSettings}
                      updateSlide={handleUpdateSlide}
                      deleteSlide={handleDeleteSlide}
                      customStyles={themes[selectedTheme]}
                    />
                  ) : (
                    <OutroSliderComponent
                      slide={slide}
                      index={index}
                      generalSettings={generalSettings}
                      updateSlide={handleUpdateSlide}
                      deleteSlide={handleDeleteSlide}
                      customStyles={themes[selectedTheme]}
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
