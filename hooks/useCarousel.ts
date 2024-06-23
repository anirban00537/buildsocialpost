import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { jsPDF } from "jspdf";
import { toSvg } from "html-to-image";
import { Slide } from "@/types";

import {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  updateGeneralSettings,
} from "@/state/slice/carousel.slice";

const useCarousel = () => {
  const dispatch = useDispatch();
  const { textSettings, layout, background } = useSelector(
    (state: RootState) => state.slides
  );
  const swiperRef = useRef<any>(null);
  const { slides, generalSettings } = useSelector(
    (state: RootState) => state.slides
  );
  const [exportLoading, setExportLoading] = useState(false);

  const handleInsertSlide = useCallback(
    (index: number) => {
      dispatch(insertSlide(index));
    },
    [dispatch]
  );

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

  const handleUpdateSlide = useCallback(
    (index: number, updatedSlide: Slide) => {
      dispatch(updateSlide({ index, updatedSlide }));
    },
    [dispatch]
  );

  const handleUpdateHeadshot = useCallback(
    (headshotUrl: string) => {
      const updatedSettings = {
        ...generalSettings,
        headshotUrl,
      };
      dispatch(
        updateGeneralSettings({
          updatedGeneralSettings: updatedSettings,
        })
      );
    },
    [dispatch, generalSettings]
  );

  const handleSlideClick = useCallback(
    (index: number) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(index, 500);
      }
    },
    [swiperRef]
  );

  const exportSlidesToPDF = useCallback(async () => {
    setExportLoading(true);
    const pdf = new jsPDF("p", "px", [layout.width, layout.height]);

    for (let i = 0; i < slides.length; i++) {
      const slideElement = document.getElementById(`slide-${i}`);
      if (slideElement) {
        try {
          const svgDataUrl = await toSvg(slideElement, { cacheBust: true });
          console.log(`SVG Data URL for slide ${i}:`, svgDataUrl);

          const image = new Image();
          image.src = svgDataUrl;

          image.onload = () => {
            const canvas = document.createElement("canvas");
            const width = layout.width;
            const height = layout.height;
            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext("2d");
            if (context) {
              context.drawImage(image, 0, 0, width, height);
              const pngDataUrl = canvas.toDataURL("image/png");
              console.log(`PNG Data URL for slide ${i}:`, pngDataUrl);

              if (i !== 0) {
                pdf.addPage();
              }
              pdf.addImage(pngDataUrl, "PNG", 0, 0, width, height);

              // Save the PDF after the last slide is processed
              if (i === slides.length - 1) {
                pdf.save("carousel_slides.pdf");
                setExportLoading(false);
              }
            } else {
              console.error("Canvas context is null");
            }
          };

          image.onerror = (error) => {
            console.error(`Failed to load image for slide ${i}`, error);
          };
        } catch (error) {
          console.error("Failed to export slide as image", error);
        }
      } else {
        console.warn(`Slide element with ID slide-${i} not found`);
      }
    }
  }, [slides, layout.width, layout.height]);

  return {
    swiperRef,
    slides,
    generalSettings,
    background,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
    handleUpdateHeadshot,
    handleSlideClick,
    exportSlidesToPDF,
    exportLoading,
    textSettings,
    layout,
  };
};

export default useCarousel;
