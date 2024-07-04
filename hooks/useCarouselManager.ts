import { useEffect, useState, useCallback } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState, Slide, generalSettings } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";

export const useCarouselManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carousel, setCarousel] = useState<CarouselState | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const { textSettings, layout, background, generalSettings, slides } =
    useSelector((state: RootState) => state.slides);

  const convertToFirestoreData = (
    data: CarouselState
  ): { [key: string]: any } => {
    return {
      textSettings: data.textSettings,
      layout: data.layout,
      background: data.background,
      generalSettings: data.generalSettings,
      slides: data.slides,
    };
  };

  const createOrUpdateCarousel = useCallback(
    async (id?: string) => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          // Update existing carousel
          const docRef = doc(db, "carousels", id);
          await updateDoc(
            docRef,
            convertToFirestoreData({
              textSettings,
              layout,
              background,
              generalSettings,
              slides,
            })
          );
          setCarousel({
            textSettings,
            layout,
            background,
            generalSettings,
            slides,
          });
        } else {
          // Create new carousel
          const docRef = doc(collection(db, "carousels"));
          await setDoc(
            docRef,
            convertToFirestoreData({
              textSettings,
              layout,
              background,
              generalSettings,
              slides,
            })
          );
          setCarousel({
            textSettings,
            layout,
            background,
            generalSettings,
            slides,
          });
          router.push(`?id=${docRef.id}`); // Add the document ID to the URL
        }
      } catch (err) {
        setError("Failed to save carousel");
        console.error("Error saving carousel:", err);
      } finally {
        setLoading(false);
      }
    },
    [router, textSettings, layout, background, generalSettings, slides]
  );

  const getCarouselDetailsById = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "carousels", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as CarouselState;
          setCarousel(data);

          // Dispatch actions to update Redux store
          dispatch(addAllSlides(data.slides));
          dispatch(
            setProperty({ key: "generalSettings", value: data.generalSettings })
          );
          dispatch(setProperty({ key: "background", value: data.background }));
          dispatch(
            setProperty({ key: "textSettings", value: data.textSettings })
          );
          dispatch(setProperty({ key: "layout", value: data.layout }));
        } else {
          setError("Carousel not found");
        }
      } catch (err) {
        setError("Failed to fetch carousel details");
        console.error("Error fetching carousel details:", err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const deleteCarousel = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, "carousels", id);
      await deleteDoc(docRef);
      setCarousel(null);
    } catch (err) {
      setError("Failed to delete carousel");
      console.error("Error deleting carousel:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch carousel details if id is provided
 

  return {
    loading,
    error,
    carousel,
    createOrUpdateCarousel,
    getCarouselDetailsById,
    deleteCarousel,
  };
};
