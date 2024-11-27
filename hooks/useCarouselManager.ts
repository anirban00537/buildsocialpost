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
  orderBy,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState, FirestoreCarouselState } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";
import toast from "react-hot-toast";

export const useCarouselManager = () => {
  const [carousel, setCarousel] = useState<CarouselState | null>(null);
  const [carousels, setCarousels] = useState<
    { id: string; data: CarouselState }[]
  >([]);

  const [isCreatingOrUpdating, setIsCreatingOrUpdating] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFetchingAll, setIsFetchingAll] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { userinfo, subscribed, endDate } = useSelector(
    (state: RootState) => state.user
  );
  const user = userinfo;
  const {
    titleTextSettings,
    descriptionTextSettings,
    taglineTextSettings,
    layout,
    background,
    slides,
    name,
    sharedSelectedElement,
    fontFamily,
    globalBackground,
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
    layout: {
      height: data.layout.height,
      width: data.layout.width,
      pattern: data.layout.pattern,
      backgroundOpacity: data.layout.backgroundOpacity,
      gradient: data.layout.gradient,
    },
    background: data.background,
    slides: data.slides,
    sharedSelectedElement: {
      id: data.sharedSelectedElement?.id,
      opacity: data.sharedSelectedElement?.opacity,
    },
    fontFamily: data.fontFamily,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    globalBackground: data.globalBackground,
  });
  const getCarouselsCreatedThisMonth = useCallback(async (userId: string) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const q = query(
      collection(db, "carousels"),
      where("userId", "==", userId),
      where("createdAt", ">=", firstDayOfMonth.toISOString()),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  }, []);
  const createOrUpdateCarousel = useCallback(
    async (newName?: string, id?: string) => {
      setIsCreatingOrUpdating(true);

      if (!user?.uid) {
        setIsCreatingOrUpdating(false);
        return;
      }

      // Check subscription status and carousel limit
      if (!subscribed && !id) {
        const carouselsCreatedThisMonth = await getCarouselsCreatedThisMonth(
          user.uid
        );
        if (carouselsCreatedThisMonth >= 2) {
          toast.error(
            "You have reached the limit of 2 carousels per month. Please upgrade to create more."
          );
          setIsCreatingOrUpdating(false);
          return;
        }
      }

      const carouselData: CarouselState = {
        name: newName || name,
        titleTextSettings,
        descriptionTextSettings,
        taglineTextSettings,
        layout: {
          height: layout.height,
          width: layout.width,
          pattern: layout.pattern,
          backgroundOpacity: layout.backgroundOpacity,
          gradient: layout.gradient,
        },
        background,
        slides,
        sharedSelectedElement,
        fontFamily,
        createdAt: id
          ? carousel?.createdAt || new Date().toISOString()
          : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        globalBackground: globalBackground,
      };

      try {
        const now = new Date().toISOString();
        const firestoreData = convertToFirestoreData(carouselData, user.uid);

        let docRef;
        if (id) {
          docRef = doc(db, "carousels", id);
          console.log(firestoreData, "firestoreData");
          await updateDoc(docRef, { ...firestoreData });
        } else {
          docRef = doc(collection(db, "carousels"));
          await setDoc(docRef, { ...firestoreData });

          // Create a new URLSearchParams object with the current query parameters
          const newSearchParams = new URLSearchParams(searchParams.toString());

          // Add or update the 'id' parameter
          newSearchParams.set("id", docRef.id);

          // Construct the new URL with updated query parameters
          const newUrl = `${
            window.location.pathname
          }?${newSearchParams.toString()}`;

          // Use router.replace to update the URL without adding a new history entry
          router.replace(newUrl);
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
        toast.error("Failed to save carousel");
      } finally {
        setIsCreatingOrUpdating(false);
      }
    },
    [
      user?.uid,
      subscribed,
      name,
      titleTextSettings,
      descriptionTextSettings,
      taglineTextSettings,
      layout,
      background,
      globalBackground,
      slides,
      sharedSelectedElement,
      fontFamily,
      router,
      searchParams,
      getCarouselsCreatedThisMonth,
    ]
  );

  const getCarouselDetailsById = useCallback(
    async (id: string) => {
      setIsFetchingDetails(true);
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
          dispatch(
            setProperty({
              key: "layout",
              value: {
                height: data.layout.height,
                width: data.layout.width,
                pattern: data.layout.pattern,
                backgroundOpacity: data.layout.backgroundOpacity || 0.5,
                gradient: data.layout.gradient || false,
              },
            })
          );
          dispatch(
            setProperty({
              key: "sharedSelectedElement",
              value: {
                id: data.sharedSelectedElement?.id || 0,
                opacity: data.sharedSelectedElement?.opacity || 0.5,
              },
            })
          );
          dispatch(
            setProperty({
              key: "fontFamily",
              value: data.fontFamily || "poppins",
            })
          );
          dispatch(
            setProperty({
              key: "globalBackground",
              value: data.globalBackground || null,
            })
          );
          console.log(data, "getting data");
        } else {
          toast.error("Carousel not found");
          router.push("/editor");
        }
      } catch (err) {
        toast.error("Failed to fetch carousel details");
      } finally {
        setIsFetchingDetails(false);
      }
    },
    [dispatch, router]
  );

  const deleteCarousel = useCallback(async (id: string) => {
    setIsDeleting(true);
    try {
      const docRef = doc(db, "carousels", id);
      await deleteDoc(docRef);
      setCarousel(null);
      setCarousels((prevCarousels) =>
        prevCarousels.filter((carousel) => carousel.id !== id)
      );
    } catch (err) {
      toast.error("Failed to delete carousel");
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const getAllCarousels = useCallback(async () => {
    setIsFetchingAll(true);
    try {
      if (user?.uid) {
        const q = query(
          collection(db, "carousels"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const carouselsList = querySnapshot.docs.map((doc) => {
          const data = doc.data() as CarouselState;
          return {
            id: doc.id,
            data: data,
          };
        });
        setCarousels(carouselsList);
      } else {
      }
    } catch (err) {
      console.error("Error fetching carousels:", err); // Log any errors
      toast.error("Failed to fetch carousels");
    } finally {
      setIsFetchingAll(false);
    }
  }, [user?.uid]);

  return {
    carousel,
    carousels,
    isCreatingOrUpdating,
    isFetchingDetails,
    isDeleting,
    isFetchingAll,
    createOrUpdateCarousel,
    getCarouselDetailsById,
    deleteCarousel,
    getAllCarousels,
  };
};
