import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient, useQuery } from "react-query";
import toast from "react-hot-toast";
import axios from "axios";

interface ImageInfo {
  url: string;
  id: string;
  name: string;
  size: number;
  createdAt: string;
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
    data: uploadedImages = [],
    isLoading,
    refetch: refetchImages,
  } = useQuery<ImageInfo[]>(
    "images",
    async () => {
      const response = await axios.get("/api/images");
      return response.data;
    },
    {
      enabled: isOpen && loggedin,
    }
  );

  // Fetch total usage
  const { data: usageData } = useQuery<{ totalUsage: number }>(
    "imageUsage",
    async () => {
      const response = await axios.get("/api/images/usage");
      return response.data;
    },
    {
      enabled: isOpen && loggedin,
    }
  );

  const totalUsage = usageData ? usageData.totalUsage / MB_TO_BYTES : 0;

  // Upload images mutation
  const uploadMutation = useMutation<ImageInfo[], Error, File[]>(
    async (files) => {
      const uploadedImages: ImageInfo[] = [];
      for (const file of files) {
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

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImages.push(response.data);
      }
      return uploadedImages;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("images");
        queryClient.invalidateQueries("imageUsage");
        toast.success("Images uploaded successfully!");
      },
      onError: (error: Error) => {
        console.error("Error uploading images: ", error);
        toast.error(error.message || "Failed to upload images.");
      },
    }
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!userinfo) {
        toast.error("Please log in to upload images.");
        return;
      }

      if (!subscribed) {
        toast.error("Please subscribe to upload images.");
        return;
      }

      if (loggedin) {
        try {
          await uploadMutation.mutateAsync(acceptedFiles);
        } catch (error) {
          console.error("Error in onDrop:", error);
        }
      }
    },
    [loggedin, subscribed, uploadMutation, userinfo]
  );

  // Delete image mutation
  const deleteMutation = useMutation<void, Error, string>(
    async (imageId) => {
      await axios.delete(`/api/images/${imageId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("images");
        queryClient.invalidateQueries("imageUsage");
        toast.success("Image deleted successfully!");
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
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: MAX_STORAGE_MB * MB_TO_BYTES,
    disabled: uploadMutation.isLoading,
  });

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = uploadedImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const totalPages = Math.ceil(uploadedImages.length / imagesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(jumpToPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setJumpToPage("");
    } else {
      toast.error(
        `Please enter a valid page number between 1 and ${totalPages}`
      );
    }
  };

  return {
    uploadedImages,
    currentPage,
    jumpToPage,
    isLoading,
    totalUsage,
    uploadLoading: uploadMutation.isLoading,
    currentImages,
    totalPages,
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
  };
};
