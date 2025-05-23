import React, { FC, useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Trash,
  Calendar,
  Layout,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import toast from "react-hot-toast";

interface CarouselListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CarouselItem {
  id: string;
  userId: number;
  data: {
    name: string;
    // ... other properties
  };
}

const CarouselListModal: FC<CarouselListModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const {
    carousels,
    pagination,
    deleteCarousel,
    isDeleting,
    isFetchingAll,
    refetchCarousels,
    handlePageChange,
    currentPage,
    pageSize,
  } = useCarouselManager();

  const handleOpenCarousel = useCallback(
    (carousel: CarouselItem) => {
      router.push(`?id=${carousel.id}`);
      onClose();
    },
    [router, onClose]
  );

  const handleDeleteCarousel = useCallback(
    async (carouselId: string) => {
      try {
        await deleteCarousel(carouselId);
        refetchCarousels(); // Refetch after deletion
      } catch (error) {
        toast.error("Failed to delete carousel");
      }
    },
    [deleteCarousel, refetchCarousels]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      handlePageChange(newPage);
    },
    [handlePageChange]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-textColor">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-textColor">All Carousels</h2>
          {isFetchingAll ? (
            <div className="flex justify-center items-center h-16 text-textColor">
              <p>Loading carousels...</p>
            </div>
          ) : !carousels || carousels.length === 0 ? (
            <div className="flex justify-center items-center h-16 text-textColor">
              <p>No carousels found</p>
            </div>
          ) : (
            carousels.map((carousel: any) => (
              <div
                key={carousel.id}
                className="flex justify-between items-center p-2 bg-cardBackground hover:bg-opacity-70 rounded-lg transition-all duration-200"
              >
                <div className="flex flex-col ml-5">
                  <span className="text-textColor font-medium">
                    {carousel.data.name || "Unnamed Carousel"}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="mr-3">
                      {new Date(carousel.createdAt).toLocaleDateString()}
                    </span>
                    <Layout className="w-3 h-3 mr-1" />
                    <span>{carousel.data.slides.length} slides</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="xs"
                    className="transition-all duration-200"
                    onClick={() => handleOpenCarousel(carousel)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    className="transition-all duration-200"
                    onClick={() => handleDeleteCarousel(carousel.id)}
                    disabled={isDeleting}
                  >
                    <Trash className="w-3 h-3 mr-1" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded px-3 py-1.5 flex items-center"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-textColor">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded px-3 py-1.5 flex items-center"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarouselListModal;
