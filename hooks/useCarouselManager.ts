import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";
import toast from "react-hot-toast";
import axios from "axios";

// Define a new interface for the API response
interface CarouselResponse {
  id: string;
  data: CarouselState;
}

export const useCarouselManager = () => {
  const [carousel, setCarousel] = useState<CarouselState | null>(null);
  const [carousels, setCarousels] = useState<CarouselResponse[]>([]);
  const [isCreatingOrUpdating, setIsCreatingOrUpdating] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFetchingAll, setIsFetchingAll] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { userinfo, subscribed } = useSelector(
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

  const createOrUpdateCarousel = useCallback(
    async (newName?: string, id?: string) => {
      setIsCreatingOrUpdating(true);

      if (!user?.email) {
        setIsCreatingOrUpdating(false);
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
        fontFamily,
        globalBackground,
      };

      try {
        let response;
        if (id) {
          response = await axios.put(`/api/carousels/${id}`, carouselData);
        } else {
          response = await axios.post("/api/carousels", carouselData);
        }

        const updatedCarousel = { id: response.data.id, data: response.data };
        setCarousels((prevCarousels) =>
          id
            ? prevCarousels.map((carousel) =>
                carousel.id === id ? updatedCarousel : carousel
              )
            : [...prevCarousels, updatedCarousel]
        );

        setCarousel(response.data);

        if (!id) {
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set("id", response.data.id);
          const newUrl = `${
            window.location.pathname
          }?${newSearchParams.toString()}`;
          router.replace(newUrl);
        }
      } catch (err) {
        toast.error("Failed to save carousel");
      } finally {
        setIsCreatingOrUpdating(false);
      }
    },
    [
      user?.id,
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
    ]
  );

  const getCarouselDetailsById = useCallback(
    async (id: string) => {
      setIsFetchingDetails(true);
      try {
        const response = await axios.get(`/api/carousels/${id}`);
        const data = response.data;
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
            value: data.sharedSelectedElement,
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
      } catch (err) {
        toast.error("Failed to fetch carousel details");
        router.push("/editor");
      } finally {
        setIsFetchingDetails(false);
      }
    },
    [dispatch, router]
  );

  const deleteCarousel = useCallback(async (id: string) => {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/carousels/${id}`);
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
      const response = await axios.get<CarouselResponse[]>("/api/carousels");
      setCarousels(response.data);
    } catch (err) {
      console.error("Error fetching carousels:", err);
      toast.error("Failed to fetch carousels");
    } finally {
      setIsFetchingAll(false);
    }
  }, []);

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
