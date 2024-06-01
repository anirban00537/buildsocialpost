import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "@/state/store";
import {
  copySlide,
  deleteSlide,
  updateSlide,
  insertSlide,
} from "@/state/slice/carousel.slice";
import { Slide } from "@/types";

const useCarousel = () => {
  const dispatch = useDispatch();
  const slides = useSelector((state: RootState) => state.slides);

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
    (index: number, headshotUrl: string) => {
      dispatch(
        updateSlide({ index, updatedSlide: { ...slides[index], headshotUrl } })
      );
    },
    [dispatch, slides]
  );

  return {
    slides,
    handleInsertSlide,
    handleCopySlide,
    handleDeleteSlide,
    handleUpdateSlide,
    handleUpdateHeadshot,
  };
};

export default useCarousel;
