import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
} from "firebase/firestore";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { storage, db } from "@/lib/firebase"; // Firebase storage and Firestore import
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void; // Callback when image is selected as background
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onImageSelect,
}) => {
  const { userinfo } = useSelector((state: RootState) => state.user);
  const uid = userinfo?.uid;
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; id: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6; // Number of images per page

  // Fetch images from Firestore based on uid
  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return; // Exit if no user is logged in

      const imagesQuery = query(
        collection(db, "images"),
        where("uid", "==", uid)
      );
      const querySnapshot = await getDocs(imagesQuery);
      const images: { url: string; id: string }[] = [];
      querySnapshot.forEach((doc) => {
        images.push({ url: doc.data().url, id: doc.id });
      });
      setUploadedImages(images);
    };

    if (isOpen && uid) {
      fetchImages();
    }
  }, [isOpen, uid]);

  // Handle image upload and save to Firestore with uid
  const { mutate: handleUpload, isLoading: uploadLoading } = useMutation(
    async (files: File[]) => {
      const uploadedURLs: { url: string; id: string }[] = [];
      for (const file of files) {
        const storageRef = ref(
          storage,
          `images/${uid}/${Date.now()}_${file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Save the image URL to Firestore with the user's uid
        const docRef = await addDoc(collection(db, "images"), {
          url: downloadURL,
          uid, // Associate the image with the user's uid
        });

        uploadedURLs.push({ url: downloadURL, id: docRef.id });
      }
      return uploadedURLs;
    },
    {
      onSuccess: (uploadedURLs: { url: string; id: string }[]) => {
        setUploadedImages((prev) => [...prev, ...uploadedURLs]);
        toast.success("Images uploaded successfully!");
      },
      onError: (error) => {
        console.error("Error uploading images: ", error);
        toast.error("Failed to upload images.");
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

      // Remove from state
      setUploadedImages((prev) => prev.filter((image) => image.id !== imageId));

      toast.success("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image: ", error);
      toast.error("Failed to delete image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".tiff", ".webp"],
    },
  });

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = uploadedImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );
  const totalPages = Math.ceil(uploadedImages.length / imagesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[600px]">
        <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

        {!uid ? (
          <p className="text-center text-red-500">
            Please log in to upload and manage images.
          </p>
        ) : (
          <>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-gray-400"
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-500">
                Drag & drop images here, or click to select files
              </p>
            </div>

            {uploadLoading && (
              <p className="mt-2 text-center text-gray-500">Uploading...</p>
            )}

            <div className="mt-4 grid grid-cols-3 gap-4">
              {currentImages.map(({ url, id }, index) => (
                <div key={id} className="relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => onImageSelect(url)}
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index}`}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteImage(id, url)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
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
