import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";
import { useMutation, useQueryClient, useQuery } from "react-query";
import toast from "react-hot-toast";
import {
  uploadImage as uploadImageService,
  getImages,
  deleteImage,
  getImageUsage,
} from "@/services/image.service";
import { processApiResponse } from "@/lib/functions";
import { ApiResponse } from "@/types";

interface ImageInfo {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse {
  success: boolean;
  message: string;
  data: {
    items: ImageInfo[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
}

interface UsageResponse {
  success: boolean;
  message: string;
  data: {
    totalCount: number;
    totalSize: number;
  };
}

const MAX_STORAGE_MB = 500;
const MB_TO_BYTES = 1024 * 1024;

export const useImageUpload = (isOpen: boolean) => {
  const { userinfo, subscribed, loggedin } = useSelector(
    (state: RootState) => state.user
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const imagesPerPage = 9;
  const queryClient = useQueryClient();

  // Fetch images
  const {
    data: imagesData,
    isLoading,
    refetch: refetchImages,
  } = useQuery<PaginatedResponse>(
    ["images", currentPage, imagesPerPage],
    async () => {
      const response = await getImages({
        page: currentPage,
        pageSize: imagesPerPage,
      });
      console.log("Images response:", response);
      return response;
    },
    {
      enabled: isOpen && loggedin,
    }
  );

  // Fetch total usage
  const { data: usageData, refetch: refetchUsage } = useQuery<UsageResponse>(
    "imageUsage",
    getImageUsage,
    {
      enabled: isOpen && loggedin,
    }
  );

  const totalUsage = usageData?.data.totalSize
    ? usageData.data.totalSize / MB_TO_BYTES
    : 0;
  const totalCount = usageData?.data.totalCount || 0;

  // Upload images mutation
  const uploadMutation = useMutation<ApiResponse, Error, File>(
    (file) => uploadImageService(file),
    {
      onSuccess: (response: ApiResponse) => {
        refetchUsage();
        refetchImages();
        console.log(response, "res");
        processApiResponse(response);
      },
      onError: (error: Error) => {
        processApiResponse(error);
      },
    }
  );

  const uploadImage = async (file: File) => {
    if (!userinfo) {
      throw new Error("Please log in to upload images.");
    }

    if (file.size > MAX_STORAGE_MB * MB_TO_BYTES) {
      throw new Error(
        `Image ${file.name} exceeds the ${MAX_STORAGE_MB} MB limit.`
      );
    }

    const newTotalUsage = totalUsage + file.size / MB_TO_BYTES;
    if (newTotalUsage > MAX_STORAGE_MB) {
      throw new Error(
        `Uploading this image would exceed your ${MAX_STORAGE_MB} MB storage limit.`
      );
    }

    return uploadMutation.mutateAsync(file);
  };

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      if (!userinfo) {
        toast.error("Please log in to upload images.");
        return;
      }

      if (loggedin) {
        for (const file of acceptedFiles) {
          try {
            await uploadImage(file);
          } catch (error) {
            if (error instanceof Error) {
              toast.error(error.message);
            }
            console.error("Error in onDrop:", error);
          }
        }
      }

      if (fileRejections.length > 0) {
        fileRejections.forEach((rejection) => {
          toast.error(
            `File ${rejection.file.name} was rejected: ${rejection.errors[0].message}`
          );
        });
      }
    },
    [loggedin, userinfo, totalUsage, uploadImage]
  );

  const deleteMutation = useMutation<void, Error, string>(
    (imageId) => deleteImage(imageId),
    {
      onSuccess: () => {
        refetchUsage();
        refetchImages();
      },
      onError: (error) => {
        console.error("Error deleting image: ", error);
        toast.error("Failed to delete image.");
      },
    }
  );

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteMutation.mutateAsync(imageId);
    } catch (error) {
      console.error("Error in handleDeleteImage:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxSize: MAX_STORAGE_MB * MB_TO_BYTES,
    disabled: uploadMutation.isLoading,
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (imagesData?.data.pagination.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(jumpToPage, 10);
    if (
      pageNumber >= 1 &&
      pageNumber <= (imagesData?.data.pagination.totalPages || 1)
    ) {
      setCurrentPage(pageNumber);
      setJumpToPage("");
    } else {
      toast.error(
        `Please enter a valid page number between 1 and ${
          imagesData?.data.pagination.totalPages || 1
        }`
      );
    }
  };

  return {
    uploadedImages: imagesData?.data?.items || [],
    currentPage,
    jumpToPage,
    isLoading,
    totalUsage,
    totalCount,
    uploadLoading: uploadMutation?.isLoading,
    currentImages: imagesData?.data?.items || [],
    totalPages: imagesData?.data?.pagination?.totalPages || 1,
    getRootProps,
    getInputProps,
    handleDeleteImage,
    handlePageChange,
    handleJumpToPage,
    setJumpToPage,
    MAX_STORAGE_MB,
    onDrop,
    subscribed,
    userinfo,
    refetchImages,
    loggedin,
    uploadImage,
  };
};
