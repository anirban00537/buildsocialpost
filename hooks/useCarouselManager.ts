import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState, ResponseData } from "@/types";
import { addAllSlides, setProperty } from "@/state/slice/carousel.slice";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getCarousels,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  getCarouselDetails,
} from "@/services/carousels.service";
import { processApiResponse } from "@/lib/functions";

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
  const carouselId = searchParams?.get("id");
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

  const { data: carousels, isLoading: isFetchingAll } = useQuery<
    CarouselResponse[]
  >(
    ["carousels", 1, 10], // Assuming default page and pageSize
    () => getCarousels(1, 10),
    {
      enabled: loggedin,
      onError: () => toast.error("Failed to fetch carousels"),
    }
  );

  const { mutate: createOrUpdateCarousel, isLoading: isCreatingOrUpdating } =
    useMutation<CarouselResponse, Error, { newName?: string; id?: string }>(
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
          return updateCarousel({ id, ...carouselData });
        } else {
          return createCarousel(carouselData);
        }
      },
      {
        onSuccess: (response: any, variables) => {
          queryClient.invalidateQueries("carousels");
          console.log("response.data.id", response);
          if (response && response.data.id) {
            const newUrl = `/editor?id=${response.data.id}`;
            router.replace(newUrl);
          }
          toast.success("Carousel saved successfully");
          processApiResponse(response);
        },
        onError: (error) => {
          processApiResponse(error);
        },
      }
    );

  // Delete carousel mutation
  const { mutate: deleteCarouselMutation, isLoading: isDeleting } = useMutation<
    ResponseData,
    Error,
    string
  >((id: string) => deleteCarousel(id), {
    onSuccess: (response: ResponseData) => {
      queryClient.invalidateQueries("carousels");
      toast.success("Carousel deleted successfully");
      processApiResponse(response);
    },
    onError: (error) => {
      processApiResponse(error);
    },
  });

  const {
    data: carouselDetails,
    isLoading: isLoadingCarouselDetails,
    isError: isErrorCarouselDetails,
    refetch: refetchCarouselDetails,
  } = useQuery<CarouselState, Error>(
    ["carouselDetails", carouselId],
    () => getCarouselDetails(carouselId!),
    {
      enabled: !!carouselId,
      onSuccess: (data: any) => {
        if (data) {
          console.log(data.data.slides, "data.slides");
          dispatch(setProperty({ key: "name", value: data.data.name }));
          dispatch(addAllSlides(data.data.slides));
          dispatch(
            setProperty({ key: "background", value: data.data.background })
          );
          dispatch(
            setProperty({
              key: "titleTextSettings",
              value: data.data.titleTextSettings,
            })
          );
          dispatch(
            setProperty({
              key: "descriptionTextSettings",
              value: data.data.descriptionTextSettings,
            })
          );
          dispatch(
            setProperty({
              key: "taglineTextSettings",
              value: data.data.taglineTextSettings,
            })
          );
          dispatch(setProperty({ key: "layout", value: data.data.layout }));
          dispatch(
            setProperty({
              key: "sharedSelectedElement",
              value: data.data.sharedSelectedElement,
            })
          );
          dispatch(
            setProperty({
              key: "fontFamily",
              value: data.data.fontFamily || "poppins",
            })
          );
          dispatch(
            setProperty({
              key: "globalBackground",
              value: data.data.globalBackground || null,
            })
          );
        }
      },
      onError: (error: Error) => {
        toast.error("Failed to fetch carousel details");
        console.error("Error fetching carousel details:", error);
      },
    }
  );

  // Get the current carousel ID from the URL
  const currentCarouselId = searchParams.get("id");

  // Use the carousel details query

  return {
    carousels,
    carouselDetails,
    isLoadingCarouselDetails,
    isErrorCarouselDetails,
    refetchCarouselDetails,
    isCreatingOrUpdating,
    isDeleting,
    isFetchingAll,
    createOrUpdateCarousel,
    deleteCarousel: deleteCarouselMutation,
    isAuthenticated: loggedin,
  };
};
