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
      <DialogContent className="w-[800px] max-h-[85vh] overflow-y-auto bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-textColor">
        <h2 className="text-lg font-semibold mb-4 text-textColor">
          Image Management
        </h2>

        {!loggedin ? (
          <p className="text-center text-red-500">
            Please log in to upload and manage images.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-textColor">
                Total Usage: {totalUsage.toFixed(2)} MB / {MAX_STORAGE_MB} MB
              </p>
              <progress
                value={totalUsage}
                max={MAX_STORAGE_MB}
                className="w-full h-2 bg-slate-100 rounded-lg"
              >
                {(totalUsage / MAX_STORAGE_MB) * 100}%
              </progress>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-4 rounded-lg cursor-pointer bg-opacity-60 bg-cardBackground hover:bg-opacity-70 transition-all duration-200 ${
                uploadLoading ? "cursor-not-allowed" : "hover:border-slate-400"
              }`}
            >
              <input
                {...getInputProps({
                  accept: ".jpg,.jpeg,.png,image/jpeg,image/png",
                })}
              />
              <div className="text-center text-textColor">
                {uploadLoading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">
                      Drag & drop images here, or click to select
                    </p>
                    <p className="text-sm text-gray-500">
                      (Only JPG and PNG, max 100 MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {isLoading ? (
              <p className="mt-4 text-center text-textColor">
                Loading images...
              </p>
            ) : currentImages.length === 0 ? (
              <p className="mt-4 text-center text-textColor">
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
                      <Button
                        onClick={() => setDeleteImageId(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                        disabled={uploadLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm truncate">{image.name}</p>
                        <p className="text-sm">
                          {(image.size / (1024 * 1024)).toFixed(2)} MB
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
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      {renderPageNumbers()}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 transition-all duration-200"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

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

        <Button
          variant="default"
          onClick={onClose}
          className="mt-4 w-full transition-all duration-200"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
