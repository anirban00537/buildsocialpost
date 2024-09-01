import { useState, useCallback, useEffect } from "react";
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

  const {
    titleTextSettings,
    descriptionTextSettings,
    taglineTextSettings,
    layout,
    background,
    slides,
    name,
    sharedSelectedElement,
  } = useSelector((state: RootState) => state.slides);

  const convertToFirestoreData = (
    data: CarouselState,
    userId: string
  ): FirestoreCarouselState => ({
    userId,
    name: data.name,
    titleTextSettings: data.titleTextSettings,
    descriptionTextSettings: data.descriptionTextSettings,
    taglineTextSettings: data.taglineTextSettings,
    layout: data.layout,
    background: data.background,
    slides: data.slides,
    sharedSelectedElement: {
      id: data.sharedSelectedElement?.id,
      opacity: data.sharedSelectedElement?.opacity,
    },
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
        titleTextSettings,
        descriptionTextSettings,
        taglineTextSettings,
        layout,
        background,
        slides,
        sharedSelectedElement,
      };

      try {
        const firestoreData = convertToFirestoreData(carouselData, user.uid);

        let docRef;
        if (id) {
          docRef = doc(db, "carousels", id);
          await updateDoc(docRef, { ...firestoreData });
        } else {
          docRef = doc(collection(db, "carousels"));
          await setDoc(docRef, { ...firestoreData });
          router.push(`?id=${docRef.id}`);
        }

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
      } finally {
        setLoading(false);
      }
    },
    [
      user?.uid,
      name,
      titleTextSettings,
      descriptionTextSettings,
      taglineTextSettings,
      layout,
      background,
      slides,
      router,
      sharedSelectedElement,
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

          dispatch(setProperty({ key: "name", value: data.name }));
          dispatch(addAllSlides(data.slides));
          dispatch(setProperty({ key: "background", value: data.background }));
          dispatch(
            setProperty({
              key: "titleTextSettings",
              value: data.titleTextSettings,
            })
          );
          dispatch(
            setProperty({
              key: "descriptionTextSettings",
              value: data.descriptionTextSettings,
            })
          );
          dispatch(
            setProperty({
              key: "taglineTextSettings",
              value: data.taglineTextSettings,
            })
          );
          dispatch(setProperty({ key: "layout", value: data.layout }));

          dispatch(
            setProperty({
              key: "sharedSelectedElement",
              value: {
                id: data.sharedSelectedElement?.id || 0,
                opacity: data.sharedSelectedElement?.opacity || 0.5,
              },
            })
          );
        } else {
          setError("Carousel not found");
          router.push("/editor");
        }
      } catch (err) {
        setError("Failed to fetch carousel details");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, router]
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
