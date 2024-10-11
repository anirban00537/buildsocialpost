import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useImageUpload } from "@/hooks/useimageUpload";

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
    session,
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
  } = useImageUpload(isOpen);

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
          className="mx-1 bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-h-[85vh] overflow-y-auto bg-opacity-80 bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-white">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Image Management
        </h2>

        {!session ? (
          <p className="text-center text-red-500">
            Please log in to upload and manage images.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-white">
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
              className={`border-2 border-dashed p-4 rounded-lg cursor-pointer bg-opacity-60 bg-cardBackground hover:bg-opacity-70 transition-all duration-200 ${
                uploadLoading ? "cursor-not-allowed" : "hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center text-white">
                {uploadLoading
                  ? "Uploading..."
                  : "Drag & drop images here, or click to select images (max 100 MB)"}
              </p>
            </div>

            {isLoading ? (
              <p className="mt-4 text-center text-white">Loading images...</p>
            ) : uploadedImages.length === 0 ? (
              <p className="mt-4 text-center text-white">
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
                          src={`${process.env.NEXT_PUBLIC_URL}/api/images/show-image?file=${image.url}`}
                          alt={image.name}
                          width={240}
                          height={240}
                          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        disabled={uploadLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm truncate">{image.name}</p>
                        <p className="text-xs">
                          {(image.size / (1024 * 1024)).toFixed(2)} MB
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
                        className="mr-2 bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      {renderPageNumbers()}
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
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
                        className="w-24 mr-2 bg-opacity-70 bg-gray-700 text-white border border-gray-600"
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        className="bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                      >
                        Go
                      </Button>
                    </form>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <Button
          variant="default"
          onClick={onClose}
          className="mt-4 w-full bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
