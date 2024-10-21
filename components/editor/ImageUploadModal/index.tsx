import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Upload,
} from "lucide-react";
import { useImageUpload } from "@/hooks/useimageUpload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

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
  const {
    loggedin,
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
    uploadImage,
  } = useImageUpload(isOpen);

  const [deleteImageId, setDeleteImageId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteImageId) {
      handleDeleteImage(deleteImageId);
      setDeleteImageId(null);
    }
  };

  const handleUpload = async (files: File[]) => {
    for (const file of files) {
      try {
        await uploadImage(file);
        toast.success(`Successfully uploaded ${file.name}`);
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error("Upload error:", error);
      }
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );

      if (validFiles.length !== acceptedFiles.length) {
        toast.error("Only JPG and PNG images are allowed.");
      }

      if (validFiles.length > 0) {
        handleUpload(validFiles);
      }
    },
    [handleUpload]
  );

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
          size="sm"
          variant={i === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="mx-1 transition-all duration-200"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[900px] h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl">
        <div className="flex flex-col h-full">
          <header className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Image Gallery
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </header>

          <div className="flex-grow overflow-y-auto p-6">
            {!loggedin ? (
              <div className="flex flex-col items-center justify-center h-full">
                <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Login Required
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Please log in to upload and manage images.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Storage Usage
                    </p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {totalUsage.toFixed(2)} MB / {MAX_STORAGE_MB} MB
                    </p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${(totalUsage / MAX_STORAGE_MB) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed border-gray-300 dark:border-gray-600 
                    rounded-lg p-8 text-center cursor-pointer 
                    transition-all duration-300 ease-in-out mb-6
                    ${
                      uploadLoading
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  {uploadLoading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Uploading...
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Drag & drop images here, or click to select
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        JPG and PNG only, max 100 MB per file
                      </p>
                    </>
                  )}
                </div>

                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : currentImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                      No images uploaded yet
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your uploaded images will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-6 ">
                    {currentImages.map((image) => (
                      <div
                        key={image.id}
                        className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                      >
                        <div
                          className="cursor-pointer"
                          onClick={() => onImageSelect(image.url)}
                        >
                          <Image
                            src={image.url}
                            alt={image.name}
                            width={300}
                            height={200}
                            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white text-sm font-medium truncate">
                              {image.name}
                            </p>
                            <p className="text-gray-300 text-xs">
                              {(image.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => setDeleteImageId(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                          disabled={uploadLoading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="mr-2"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    {renderPageNumbers()}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="default"
              onClick={onClose}
              className="w-full transition-all duration-200"
            >
              Close
            </Button>
          </footer>
        </div>

        <AlertDialog
          open={!!deleteImageId}
          onOpenChange={() => setDeleteImageId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Confirm Image Deletion
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this image? This action cannot
                be undone.
                <br />
                <br />
                <strong>Warning:</strong> This image may be in use elsewhere in
                the application. Deleting it could potentially break layouts or
                cause missing images in your projects.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete Image
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
