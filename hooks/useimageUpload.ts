import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "@/services/firebase";

interface ImageInfo {
  url: string;
  id: string;
  name: string;
  size: number;
  createdAt: number;
}

const MAX_STORAGE_MB = 100;
const MB_TO_BYTES = 1024 * 1024;

export const useImageUpload = (isOpen: boolean) => {
  const { userinfo } = useSelector((state: RootState) => state.user);
  const uid = userinfo?.uid;
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsage, setTotalUsage] = useState(0);
  const imagesPerPage = 9;

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return;
      setIsLoading(true);
      try {
        const imagesQuery = query(
          collection(db, "images"),
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(imagesQuery);
        const images: ImageInfo[] = [];
        querySnapshot.forEach((doc) => {
          images.push({ ...(doc.data() as ImageInfo), id: doc.id });
        });
        setUploadedImages(images);
        calculateTotalUsage(images);
      } catch (error) {
        console.error("Error fetching images: ", error);
        toast.error("Failed to fetch images.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && uid) {
      fetchImages();
    }
  }, [isOpen, uid]);

  const calculateTotalUsage = (images: ImageInfo[]) => {
    const totalBytes = images.reduce((acc, image) => acc + image.size, 0);
    const totalMB = totalBytes / MB_TO_BYTES;
    setTotalUsage(totalMB);
    return totalMB;
  };

  const { mutate: handleUpload, isLoading: uploadLoading } = useMutation(
    async (files: File[]) => {
      const uploadedImages: ImageInfo[] = [];
      for (const file of files) {
        if (file.size > MAX_STORAGE_MB * MB_TO_BYTES) {
          throw new Error(`Image ${file.name} exceeds the 100 MB limit.`);
        }

        const newTotalUsage = totalUsage + file.size / MB_TO_BYTES;
        if (newTotalUsage > MAX_STORAGE_MB) {
          throw new Error(
            "Uploading this image would exceed your 100 MB storage limit."
          );
        }

        const storageRef = ref(
          storage,
          `images/${uid}/${Date.now()}_${file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const imageInfo: ImageInfo = {
          url: downloadURL,
          name: file.name,
          size: file.size,
          createdAt: Date.now(),
          id: "",
        };

        const docRef = await addDoc(collection(db, "images"), {
          ...imageInfo,
          uid,
        });

        imageInfo.id = docRef.id;
        uploadedImages.push(imageInfo);
      }
      return uploadedImages;
    },
    {
      onSuccess: (uploadedImages: ImageInfo[]) => {
        setUploadedImages((prev) => {
          const newImages = [...uploadedImages, ...prev];
          calculateTotalUsage(newImages);
          return newImages;
        });
        toast.success("Images uploaded successfully!");
        queryClient.invalidateQueries("images");
      },
      onError: (error: Error) => {
        console.error("Error uploading images: ", error);
        toast.error(error.message || "Failed to upload images.");
      },
    }
  );

  const onDrop = (acceptedFiles: File[]) => {
    if (uid) {
      handleUpload(acceptedFiles);
    } else {
      toast.error("Please log in to upload images.");
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      await deleteDoc(doc(db, "images", imageId));

      setUploadedImages((prev) => {
        const updatedImages = prev.filter((image) => image.id !== imageId);
        calculateTotalUsage(updatedImages);
        return updatedImages;
      });

      toast.success("Image deleted successfully!");
      queryClient.invalidateQueries("images");
    } catch (error) {
      console.error("Error deleting image: ", error);
      toast.error("Failed to delete image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [
        ".jpeg",
        ".jpg",
        ".png",
        ".gif",
        ".bmp",
        ".tiff",
        ".webp",
        ".svg",
      ],
    },
    maxSize: MAX_STORAGE_MB * MB_TO_BYTES,
    disabled: uploadLoading,
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
    uid,
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
    handleDeleteImage,
    handlePageChange,
    handleJumpToPage,
    setJumpToPage,
    MAX_STORAGE_MB,
  };
};
