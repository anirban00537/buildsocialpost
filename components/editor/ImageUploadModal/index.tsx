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
} from "firebase/firestore";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { storage, db } from "@/lib/firebase";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void;
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
  const [jumpToPage, setJumpToPage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const imagesPerPage = 6;

  // Fetch images from Firestore based on uid
  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return;
      setIsLoading(true);
      try {
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
          uid,
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
    disabled: uploadLoading, // Disable input while uploading
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
              className={`border-2 border-dashed p-4 rounded-lg cursor-pointer ${
                uploadLoading ? "cursor-not-allowed" : "hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-500">
                {uploadLoading
                  ? "Uploading..."
                  : "Drag & drop images here, or click to select files"}
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
                  {currentImages.map(({ url, id }, index) => (
                    <div key={id} className="relative">
                      <div
                        className="cursor-pointer"
                        onClick={() => onImageSelect(url)}
                      >
                        <Image
                          src={url}
                          alt={`Uploaded ${index}`}
                          width={150}
                          height={150}
                          className="rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteImage(id, url)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 disabled:opacity-50"
                        disabled={uploadLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
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
