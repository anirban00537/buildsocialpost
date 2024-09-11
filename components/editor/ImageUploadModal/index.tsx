import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { storage, db } from "@/services/firebase";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void;
}

interface ImageInfo {
  url: string;
  id: string;
  name: string;
  size: number;
  createdAt: number;
}

const MAX_STORAGE_MB = 100;
const MB_TO_BYTES = 1024 * 1024;

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelect,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const uid = userInfo?.uid;
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsage, setTotalUsage] = useState(0);
  const imagesPerPage = 9;

  const queryClient = useQueryClient();

  // Fetch images from Firestore based on uid
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
    return totalMB; // Return the calculated value
  };

  // Handle image upload and save to Firestore with uid
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
          id: "", // This will be set after Firestore add
        };

        // Save the image info to Firestore with the user's uid
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
          calculateTotalUsage(newImages); // Calculate total usage with all images
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
      // Delete from Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Delete from Firestore
      await deleteDoc(doc(db, "images", imageId));

      // Remove from state and recalculate usage
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

  // Pagination logic
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

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-h-[85vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Image Management</h2>

        {!uid ? (
          <p className="text-center text-red-500">
            Please log in to upload and manage images.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <p>
                Total Usage: {totalUsage.toFixed(2)} MB / {MAX_STORAGE_MB} MB
              </p>
              <progress
                value={totalUsage}
                max={MAX_STORAGE_MB}
                className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
              >
                {(totalUsage / MAX_STORAGE_MB) * 100}%
              </progress>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-4 rounded-lg cursor-pointer ${
                uploadLoading ? "cursor-not-allowed" : "hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-500">
                {uploadLoading
                  ? "Uploading..."
                  : "Drag & drop images here, or click to select images (max 100 MB)"}
              </p>
            </div>

            {isLoading ? (
              <p className="mt-4 text-center text-gray-500">
                Loading images...
              </p>
            ) : uploadedImages.length === 0 ? (
              <p className="mt-4 text-center text-gray-500">
                No images uploaded yet.
              </p>
            ) : (
              <>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {currentImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <div
                        className="cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => onImageSelect(image.url)}
                      >
                        <Image
                          src={image.url}
                          alt={image.name}
                          width={240}
                          height={240}
                          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteImage(image.id, image.url)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        disabled={uploadLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm truncate">{image.name}</p>
                        <p className="text-xs">
                          {(image.size / MB_TO_BYTES).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center mt-4">
                    <div className="flex items-center mb-2">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      {renderPageNumbers()}
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <form
                      onSubmit={handleJumpToPage}
                      className="flex items-center"
                    >
                      <Input
                        type="number"
                        min="1"
                        max={totalPages}
                        value={jumpToPage}
                        onChange={(e) => setJumpToPage(e.target.value)}
                        placeholder="Jump to page"
                        className="w-24 mr-2"
                      />
                      <Button type="submit" variant="outline">
                        Go
                      </Button>
                    </form>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <Button variant="default" onClick={onClose} className="mt-4 w-full">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
