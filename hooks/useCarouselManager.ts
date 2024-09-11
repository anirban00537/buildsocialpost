import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";
import { useSession } from "next-auth/react";

export const useCarouselManager = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carousel, setCarousel] = useState<CarouselState | null>(null);
  const [carousels, setCarousels] = useState<
    { id: string; data: CarouselState }[]
  >([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

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

  const createOrUpdateCarousel = useCallback(
    async (newName?: string, id?: string) => {
      setLoading(true);
      setError(null);

      if (!session) {
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
        const response = await fetch("/api/carousels", {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(id ? { id, ...carouselData } : carouselData),
        });

        if (!response.ok) {
          throw new Error("Failed to save carousel");
        }

        const savedCarousel = await response.json();

        const updatedCarousel = { id: savedCarousel.id, data: carouselData };
        setCarousels((prevCarousels) =>
          id
            ? prevCarousels.map((carousel) =>
                carousel.id === id ? updatedCarousel : carousel
              )
            : [...prevCarousels, updatedCarousel]
        );

        setCarousel(carouselData);
        if (!id) {
          window.history.replaceState(null, "", `?id=${savedCarousel.id}`);
        }
      } catch (err) {
        setError("Failed to save carousel");
      } finally {
        setLoading(false);
      }
    },
    [
      session,
      name,
      titleTextSettings,
      descriptionTextSettings,
      taglineTextSettings,
      layout,
      background,
      slides,
      sharedSelectedElement,
    ]
  );

  const getCarouselDetailsById = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/carousels?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch carousel details");
        }
        const data = await response.json();
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
      } catch (err) {
        setError("Failed to fetch carousel details");
        router.push("/editor");
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
      const response = await fetch(`/api/carousels?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete carousel");
      }
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
      if (session) {
        const response = await fetch("/api/carousels");
        if (!response.ok) {
          throw new Error("Failed to fetch carousels");
        }
        const carouselsList = await response.json();
        
        setCarousels(carouselsList);
      } else {
        setError("User not authenticated");
      }
    } catch (err) {
      setError("Failed to fetch carousels");
    } finally {
      setLoading(false);
    }
  }, [session]);

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