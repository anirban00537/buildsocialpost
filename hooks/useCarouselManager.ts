import { useState, useCallback } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState, FirestoreCarouselState } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";

export const useCarouselManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carousel, setCarousel] = useState<CarouselState | null>(null);
  const [carousels, setCarousels] = useState<
    { id: string; data: CarouselState }[]
  >([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userinfo);

  const { textSettings, layout, background, generalSettings, slides, name } =
    useSelector((state: RootState) => state.slides);

  const convertToFirestoreData = (
    data: CarouselState,
    userId: string
  ): FirestoreCarouselState => ({
    userId,
    name: data.name,
    textSettings: data.textSettings,
    layout: data.layout,
    background: data.background,
    generalSettings: data.generalSettings,
    slides: data.slides,
  });

  const createOrUpdateCarousel = useCallback(
    async (newName?: string, id?: string) => {
      setLoading(true);
      setError(null);

      if (!user?.uid) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const carouselData: CarouselState = {
        name: newName || name,
        textSettings,
        layout,
        background,
        generalSettings,
        slides,
      };

      try {
        const firestoreData = convertToFirestoreData(carouselData, user.uid);

        let docRef;
        if (id) {
          // Update existing carousel
          docRef = doc(db, "carousels", id);
          await updateDoc(docRef, { ...firestoreData });
        } else {
          // Create new carousel
          docRef = doc(collection(db, "carousels"));
          await setDoc(docRef, { ...firestoreData });
          router.push(`?id=${docRef.id}`); // Add the document ID to the URL
        }

        // Update the carousel list
        const updatedCarousel = { id: docRef.id, data: carouselData };
        setCarousels((prevCarousels) =>
          id
            ? prevCarousels.map((carousel) =>
                carousel.id === id ? updatedCarousel : carousel
              )
            : [...prevCarousels, updatedCarousel]
        );

        setCarousel(carouselData);
      } catch (err) {
        setError("Failed to save carousel");
        console.error("Error saving carousel:", err);
      } finally {
        setLoading(false);
      }
    },
    [
      user?.uid,
      name,
      textSettings,
      layout,
      background,
      generalSettings,
      slides,
      router,
    ]
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
          dispatch(setProperty({ key: "name", value: data.name }));
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
      setCarousels((prevCarousels) =>
        prevCarousels.filter((carousel) => carousel.id !== id)
      );
    } catch (err) {
      setError("Failed to delete carousel");
      console.error("Error deleting carousel:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllCarousels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (user?.uid) {
        const q = query(
          collection(db, "carousels"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const carouselsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data() as CarouselState,
        }));
        setCarousels(carouselsList);
      } else {
        setError("User not authenticated");
      }
    } catch (err) {
      setError("Failed to fetch carousels");
      console.error("Error fetching carousels:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  return {
    loading,
    error,
    carousel,
    carousels,
    createOrUpdateCarousel,
    getCarouselDetailsById,
    deleteCarousel,
    getAllCarousels,
  };
};
