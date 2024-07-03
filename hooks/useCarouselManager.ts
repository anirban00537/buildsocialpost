// hooks/useFirestoreCarousel.ts
import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  DocumentReference,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { Slide, generalSettings } from "@/types";
import { db } from "@/lib/firebase";

interface CarouselData {
  slides: Slide[];
  generalSettings: generalSettings;
  background: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
  };
  textSettings: {
    alignment: "left" | "center" | "right";
    fontSize: number;
    fontStyle: "normal" | "italic";
    fontWeight: number;
  };
  layout: {
    height: number;
    width: number;
    pattern: string;
  };
}

const useFirestoreCarousel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [carouselData, setCarouselData] = useState<CarouselData | null>(null);
  const [allCarousels, setAllCarousels] = useState<CarouselData[]>([]);

  const getCarouselById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const docRef: DocumentReference<DocumentData> = doc(db, "carousels", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCarouselData(docSnap.data() as CarouselData);
      } else {
        setError("No such document!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrUpdateCarousel = useCallback(
    async (id: string, data: CarouselData) => {
      setLoading(true);
      try {
        await setDoc(doc(db, "carousels", id), data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteCarousel = useCallback(async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "carousels", id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllCarousels = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "carousels"));
      const carousels: CarouselData[] = [];
      querySnapshot.forEach((doc) => {
        carousels.push(doc.data() as CarouselData);
      });
      setAllCarousels(carousels);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    carouselData,
    allCarousels,
    loading,
    error,
    getCarouselById,
    createOrUpdateCarousel,
    deleteCarousel,
    getAllCarousels,
  };
};

export default useFirestoreCarousel;
