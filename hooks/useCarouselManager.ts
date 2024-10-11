import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Define a new interface for the API response
interface CarouselResponse {
  id: string;
  data: CarouselState;
}

export const useCarouselManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { loggedin, userinfo } = useSelector((state: RootState) => state.user);
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

  // Fetch all carousels
  const { data: carousels, isLoading: isFetchingAll } = useQuery<
    CarouselResponse[]
  >(
    "carousels",
    async () => {
      const response = await axios.get<CarouselResponse[]>("/api/carousels");
      return response.data;
    },
    {
      enabled: loggedin,
      onError: () => toast.error("Failed to fetch carousels"),
    }
  );

  // Create or update carousel mutation
  const { mutate: createOrUpdateCarousel, isLoading: isCreatingOrUpdating } =
    useMutation<AxiosResponse<any>, Error, { newName?: string; id?: string }>(
      async ({ newName, id }) => {
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

        if (id) {
          return axios.put(`/api/carousels/${id}`, carouselData);
        } else {
          return axios.post("/api/carousels", carouselData);
        }
      },
      {
        onSuccess: (response, variables) => {
          queryClient.invalidateQueries("carousels");
          if (!variables.id) {
            const newSearchParams = new URLSearchParams(
              searchParams.toString()
            );
            newSearchParams.set("id", response.data.id);
            const newUrl = `${
              window.location.pathname
            }?${newSearchParams.toString()}`;
            router.replace(newUrl);
          }
          toast.success("Carousel saved successfully");
        },
        onError: (error) => {
          console.error("Error saving carousel:", error);
          toast.error("Failed to save carousel");
        },
      }
    );

  // Delete carousel mutation
  const { mutate: deleteCarousel, isLoading: isDeleting } = useMutation<
    void,
    Error,
    string
  >((id: string) => axios.delete(`/api/carousels/${id}`).then(() => {}), {
    onSuccess: () => {
      queryClient.invalidateQueries("carousels");
      toast.success("Carousel deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting carousel:", error);
      toast.error("Failed to delete carousel");
    },
  });

  // Function to fetch carousel details
  const fetchCarouselDetails = async (id: string) => {
    try {
      const response = await axios.get(`/api/carousels/${id}`);
      const data = response.data;
      if (data) {
        dispatch(setProperty({ key: "name", value: data.name }));
        dispatch(addAllSlides(data.slides));
        dispatch(setProperty({ key: "background", value: data.background }));
        dispatch(setProperty({ key: "titleTextSettings", value: data.titleTextSettings }));
        dispatch(setProperty({ key: "descriptionTextSettings", value: data.descriptionTextSettings }));
        dispatch(setProperty({ key: "taglineTextSettings", value: data.taglineTextSettings }));
        dispatch(setProperty({ key: "layout", value: data.layout }));
        dispatch(setProperty({ key: "sharedSelectedElement", value: data.sharedSelectedElement }));
        dispatch(setProperty({ key: "fontFamily", value: data.fontFamily || "poppins" }));
        dispatch(setProperty({ key: "globalBackground", value: data.globalBackground || null }));
      }
      return data;
    } catch (error) {
      toast.error("Failed to fetch carousel details");
      router.push("/editor");
      throw error;
    }
  };

  return {
    carousels,
    fetchCarouselDetails,
    isCreatingOrUpdating,
    isDeleting,
    isFetchingAll,
    createOrUpdateCarousel,
    deleteCarousel,
    isAuthenticated: loggedin,
  };
};
