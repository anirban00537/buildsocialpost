import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Slide } from "@/types";
import {
  insertSlide,
  copySlide,
  deleteSlide,
  updateSlide,
  moveSlideLeft,
  moveSlideRight,
} from "@/state/slice/carousel.slice";

const useCarousel = () => {
  const dispatch = useDispatch();
  const { slides, layout } = useSelector((state: RootState) => state.slides);
  const swiperRef = useRef<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number | null>(null);
  const [imageType, setImageType] = useState<"background" | "slide">("background");

  const handleSlideClick = useCallback(
    (index: number) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(index, 500);
      }
    },
    [swiperRef]
  );

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
    (index: number, updatedSlide: Partial<Slide>) => {
      dispatch(updateSlide({ index, updatedSlide }));
    },
    [dispatch]
  );

  const handleMoveSlideLeft = useCallback(
    (index: number) => {
      dispatch(moveSlideLeft(index));
    },
    [dispatch]
  );

  const handleMoveSlideRight = useCallback(
    (index: number) => {
      dispatch(moveSlideRight(index));
    },
    [dispatch]
  );

  const handleImageIconClick = useCallback(
    (index: number, type: "background" | "slide") => {
      setActiveSlideIndex(index);
      setImageType(type);
      setIsModalOpen(true);
    },
    []
  );

  const handleImageSelect = useCallback(
    (url: string) => {
      if (activeSlideIndex !== null) {
        const updatedSlide = {
          ...slides[activeSlideIndex],
          [imageType === "background" ? "backgroundImage" : "imageUrl"]: url,
        };
        handleUpdateSlide(activeSlideIndex, updatedSlide);
      }
      setIsModalOpen(false);
    },
    [activeSlideIndex, imageType, slides, handleUpdateSlide]
  );

  const handleSettingChange = useCallback(
    (index: number, setting: keyof Slide, value: boolean) => {
      dispatch(updateSlide({
        index,
        updatedSlide: { [setting]: value }
      }));
    },
    [dispatch]
  );

  return {
    swiperRef,
    slides,
    layout,
    isModalOpen,
    setIsModalOpen,
    activeSlideIndex,
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
  };
};

export default useCarousel;
