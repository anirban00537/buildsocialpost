import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { CarouselState, ResponseData } from "@/types";
import {
  addAllSlides,
  setAllData,
  setProperty,
} from "@/state/slice/carousel.slice";
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
import { useEffect } from "react";
import { setLoading } from "@/state/slice/user.slice";

// Define a new interface for the API response
interface CarouselResponse {
  success: boolean;
  message: string;
  data: {
    items: CarouselItem[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
}

interface CarouselItem {
  id: string;
  userId: number;
  name: string;
  // ... other properties ...
}

export const useCarouselManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const carouselId = searchParams?.get("id");
  const { loggedin, userinfo } = useSelector((state: RootState) => state.user);

  const CarouselData = useSelector((state: RootState) => state.slides);

  const {
    data: carouselsResponse,
    isLoading: isFetchingAll,
    refetch: refetchCarousels
  } = useQuery<CarouselResponse>(
    ["carousels", 1, 10], // Assuming default page and pageSize
    () => getCarousels(1, 10),
    {
      enabled: loggedin,
      onSuccess: (response) => {
        console.log("carousels response", response);
      },
      onError: () => toast.error("Failed to fetch carousels"),
    }
  );

  const { mutate: createOrUpdateCarousel, isLoading: isCreatingOrUpdating } =
    useMutation<CarouselResponse, Error, { newName?: string; id?: string }>(
      async ({ newName, id }) => {
        if (id) {
          return updateCarousel({ id, data: CarouselData });
        } else {
          return createCarousel({ data: CarouselData });
        }
      },
      {
        onSuccess: (response: any, variables) => {
          console.log("Response from create/update:", response);
          if (response && response.success && response.data) {
            let newId = response.data.id;
            if (typeof response.data === "object" && "items" in response.data) {
              newId = response.data.items[0]?.id;
            }
            if (newId) {
              const newUrl = `/editor?id=${newId}`;
              router.replace(newUrl);
            } else {
              console.error("No carousel ID found in the response");
            }
          }
          processApiResponse(response);
          queryClient.invalidateQueries("carousels");
        },
        onError: (error) => {
          console.error("Error in create/update:", error);
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
        console.log(data.data.data, "data.slides");
        dispatch(setAllData(data.data.data));
      },
      onError: (error: Error) => {
        toast.error("Failed to fetch carousel details");
        console.error("Error fetching carousel details:", error);
      },
    }
  );

  useEffect(() => {
    if (!isLoadingCarouselDetails) dispatch(setLoading(false));
  }, [isLoadingCarouselDetails]);

  return {
    carousels: carouselsResponse?.data?.items,
    pagination: carouselsResponse?.data?.pagination,
    deleteCarousel: deleteCarouselMutation,
    isDeleting,
    isFetchingAll,
    isAuthenticated: loggedin,
    createOrUpdateCarousel,
    isCreatingOrUpdating,
    refetchCarousels, // Add this to the return object
  };
};
