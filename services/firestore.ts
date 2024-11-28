import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { CarouselState, FirestoreCarouselState } from "@/types";

interface GenerationLog {
  userId: string;
  count: number;
  date: string;
}

export const fetchSubscriptionStatus = async (userId: string) => {
  try {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      orderBy("endDate", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const endDate = new Date(data.endDate).toISOString();
      const isExpired = new Date(endDate) < new Date();
      return { isSubscribed: !isExpired, endDate };
    } else {
      return { isSubscribed: false, endDate: null };
    }
  } catch (error: any) {
    console.error("Error fetching subscription status:", error);
    return { isSubscribed: false, endDate: null, error: error.message };
  }
};

export const fetchBrandingSettings = async (userId: string) => {
  try {
    const docRef = doc(db, "user_branding", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        name: data.branding?.name || "",
        handle: data.branding?.handle || "",
        headshot: data.branding?.headshot || null,
      };
    } else {
      return { name: "", handle: "", headshot: null };
    }
  } catch (error: any) {
    console.error("Error fetching branding settings:", error);
    return { name: "", handle: "", headshot: null, error: error.message };
  }
};

export const createOrUpdateCarousel = async (
  carouselData: CarouselState,
  userId: string,
  id?: string
) => {
  const firestoreData: FirestoreCarouselState = { ...carouselData, userId };

  if (id) {
    const docRef = doc(db, "carousels", id);
    await updateDoc(docRef, firestoreData as { [x: string]: any });
  } else {
    const docRef = doc(collection(db, "carousels"));
    await setDoc(docRef, firestoreData);
    return docRef.id;
  }
};

export const updateBrandingSettings = async (
  userId: string,
  brandingData: {
    name: string;
    handle: string;
    headshot: string | null;
  }
) => {
  const docRef = doc(db, "user_branding", userId);
  await setDoc(docRef, { branding: brandingData }, { merge: true });
};

export const updateGenerationCount = async (userId: string, count: number) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  const logRef = doc(db, "generationLogs", `${userId}_${today}`);

  await setDoc(
    logRef,
    {
      userId,
      count,
      date: today,
    },
    { merge: true }
  );
};

export const getGenerationCount = async (userId: string): Promise<number> => {
  const today = new Date().toISOString().split("T")[0];
  const logRef = doc(db, "generationLogs", `${userId}_${today}`);

  const snapshot = await getDoc(logRef);
  return snapshot.exists() ? snapshot.data().count : 0;
};
