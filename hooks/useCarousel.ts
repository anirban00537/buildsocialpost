import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
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
    const slideWidthInMM = 127;
    const slideHeightInMM = 148;

    const pdf = new jsPDF("p", "mm", [slideWidthInMM, slideHeightInMM]);

    for (let i = 0; i < slides.length; i++) {
      const slideElement = document.getElementById(`slide-${i}`);
      if (slideElement) {
        try {
          slideElement.style.width = `480px`;
          slideElement.style.height = `560px`;

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
    setExportLoading(false);
  }, [slides]);

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
