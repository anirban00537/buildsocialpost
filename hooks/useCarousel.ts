import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Slide } from "@/types";
import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
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
  const [zipLoading, setZipLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

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

  const exportSlidesToZip = useCallback(async () => {
    setZipLoading(true);
    const zip = new JSZip();
    const scaleFactor = 3; // Adjust the scale factor for higher quality

    for (let i = 0; i < slides.length; i++) {
      const slideElement = document.getElementById(`slide-${i}`);
      if (slideElement) {
        try {
          const pngDataUrl = await toPng(slideElement, {
            cacheBust: true,
            pixelRatio: scaleFactor,
          });

          const response = await fetch(pngDataUrl);
          const blob = await response.blob();
          zip.file(`slide-${i}.png`, blob);
        } catch (error) {
          console.error("Failed to export slide as image", error);
        }
      } else {
        console.warn(`Slide element with ID slide-${i} not found`);
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "slides.zip");
      setZipLoading(false);
    });
  }, [slides, layout.width, layout.height]);

  const exportSlidesToPDF = useCallback(async () => {
    setPdfLoading(true);
    const pdf = new jsPDF("p", "px", [layout.width, layout.height]);
    const scaleFactor = 3; // Adjust the scale factor for higher quality

    for (let i = 0; i < slides.length; i++) {
      const slideElement = document.getElementById(`slide-${i}`);
      if (slideElement) {
        try {
          const pngDataUrl = await toPng(slideElement, {
            cacheBust: true,
            pixelRatio: scaleFactor,
          });

          if (i !== 0) {
            pdf.addPage();
          }
          pdf.addImage(
            pngDataUrl,
            "PNG",
            0,
            0,
            layout.width,
            layout.height,
            undefined,
            "FAST" // Use FAST compression to reduce file size
          );
        } catch (error) {
          console.error("Failed to export slide as image", error);
        }
      } else {
        console.warn(`Slide element with ID slide-${i} not found`);
      }
    }

    pdf.save("carousel_slides.pdf");
    setPdfLoading(false);
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
    exportSlidesToZip,
    exportSlidesToPDF,
    zipLoading,
    pdfLoading,
    textSettings,
    layout,
  };
};

export default useCarousel;
