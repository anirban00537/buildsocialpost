import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (url: string) => void;
}

interface ImageInfo {
  _id: string;
  url: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");
  const imagesPerPage = 9;

  const queryClient = useQueryClient();

  const { data: uploadedImages = [], isLoading } = useQuery<ImageInfo[]>(
    ["images", uid],
    async () => {
      const response = await fetch(`/api/images`);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      return response.json();
    },
    {
      enabled: isOpen,
    }
  );

  const { data: totalUsage = 0 } = useQuery<number>(
    ["totalUsage", uid],
    async () => {
      if (!uid) return 0;
      const totalBytes = uploadedImages.reduce(
        (acc, image) => acc + image.size,
        0
      );
      return totalBytes / MB_TO_BYTES;
    },
    {
      enabled: !!uploadedImages.length,
    }
  );

  const uploadMutation = useMutation(
    async (file: File) => {
      const base64 = await fileToBase64(file);
      const imageInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        file: base64,
      };

      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["images", uid]);
        queryClient.invalidateQueries(["totalUsage", uid]);
        toast.success("Image uploaded successfully!");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to upload image.");
      },
    }
  );

  const deleteMutation = useMutation(
    async ({ id, url }: { id: string; url: string }) => {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["images", uid]);
        queryClient.invalidateQueries(["totalUsage", uid]);
        toast.success("Image deleted successfully!");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to delete image.");
      },
    }
  );

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      if (file.size > MAX_STORAGE_MB * MB_TO_BYTES) {
        toast.error(`Image ${file.name} exceeds the 100 MB limit.`);
        continue;
      }

      const newTotalUsage = totalUsage + file.size / MB_TO_BYTES;
      if (newTotalUsage > MAX_STORAGE_MB) {
        toast.error(
          "Uploading this image would exceed your 100 MB storage limit."
        );
        break;
      }

      await uploadMutation.mutateAsync(file);
    }
  };

  const handleDeleteImage = async (id: string, url: string) => {
    await deleteMutation.mutateAsync({ id, url });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
                uploadMutation.isLoading
                  ? "cursor-not-allowed"
                  : "hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-500">
                {uploadMutation.isLoading
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
                  {currentImages.map((image: ImageInfo) => (
                    <div key={image._id} className="relative group">
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
                        onClick={() => handleDeleteImage(image._id, image.url)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        disabled={uploadMutation.isLoading}
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
