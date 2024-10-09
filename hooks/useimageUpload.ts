import { useState, useEffect, useCallback } from "react";
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
  const { userinfo, subscribed } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const [totalUsage, setTotalUsage] = useState(0);
  const imagesPerPage = 9;

  const queryClient = useQueryClient();

  // Fetch images
  const { data: uploadedImages = [], isLoading, refetch } = useQuery<ImageInfo[]>(
    "images",
    async () => {
      const response = await axios.get("/api/images");
      return response.data;
    },
    {
      enabled: isOpen && !!userinfo,
      onSuccess: (data) => calculateTotalUsage(data),
    }
  );

  // Fetch total usage
  const { data: usageData } = useQuery(
    "imageUsage",
    async () => {
      const response = await axios.get("/api/images/usage");
      return response.data;
    },
    {
      enabled: isOpen && !!userinfo,
      onSuccess: (data) => setTotalUsage(data.totalUsage / MB_TO_BYTES),
    }
  );

  const calculateTotalUsage = useCallback((images: ImageInfo[]) => {
    const totalBytes = images.reduce((acc, image) => acc + image.size, 0);
    const totalMB = totalBytes / MB_TO_BYTES;
    setTotalUsage(totalMB);
    return totalMB;
  }, []);

  // Upload images
  const { mutate: handleUpload, isLoading: uploadLoading } = useMutation(
    async (files: File[]) => {
      const uploadedImages: ImageInfo[] = [];
      for (const file of files) {
        if (file.size > MAX_STORAGE_MB * MB_TO_BYTES) {
          throw new Error(`Image ${file.name} exceeds the ${MAX_STORAGE_MB} MB limit.`);
        }

        const newTotalUsage = totalUsage + file.size / MB_TO_BYTES;
        if (newTotalUsage > MAX_STORAGE_MB) {
          throw new Error(`Uploading this image would exceed your ${MAX_STORAGE_MB} MB storage limit.`);
        }

        // Here you would typically upload the file to your storage solution
        // and get back a URL. For this example, we'll assume it's done and
        // we have a URL.
        const uploadedFileUrl = "https://example.com/uploaded-image.jpg";

        const response = await axios.post("/api/images", {
          url: uploadedFileUrl,
          name: file.name,
          size: file.size,
        });

        uploadedImages.push(response.data);
      }
      return uploadedImages;
    },
    {
      onSuccess: (newImages) => {
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!userinfo) {
      toast.error("Please log in to upload images.");
      return;
    }

    if (!subscribed) {
      toast.error("Please subscribe to upload images.");
      return;
    }

    handleUpload(acceptedFiles);
  }, [userinfo, subscribed, handleUpload]);

  // Delete image
  const handleDeleteImage = useMutation(
    async (imageId: string) => {
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: MAX_STORAGE_MB * MB_TO_BYTES,
    disabled: uploadLoading,
  });

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = uploadedImages.slice(indexOfFirstImage, indexOfLastImage);
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
      toast.error(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  return {
    uploadedImages,
    currentPage,
    jumpToPage,
    isLoading,
    totalUsage,
    uploadLoading,
    currentImages,
    totalPages,
    getRootProps,
    getInputProps,
    handleDeleteImage: handleDeleteImage.mutate,
    handlePageChange,
    handleJumpToPage,
    setJumpToPage,
    MAX_STORAGE_MB,
    onDrop,
    subscribed,
  };
};