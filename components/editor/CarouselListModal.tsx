import React, { FC, useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Trash } from "lucide-react";
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
        toast.success("Carousel deleted successfully");
        refetchCarousels(); // Refetch after deletion
      } catch (error) {
        console.error("Error deleting carousel:", error);
        toast.error("Failed to delete carousel");
      }
    },
    [deleteCarousel, refetchCarousels]
  );

  const onPageChange = useCallback((newPage: number) => {
    handlePageChange(newPage);
  }, [handlePageChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-opacity-80 bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-textColor">
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
                className="flex justify-between items-center p-2 bg-opacity-60 bg-cardBackground hover:bg-opacity-70 rounded-lg transition-all duration-200"
              >
                <span className="text-textColor ml-5">
                  {carousel.data.name || "Unnamed Carousel"}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                    onClick={() => handleOpenCarousel(carousel)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-opacity-70 bg-red-900 text-white hover:bg-opacity-90 border border-red-700 transition-all duration-200"
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
                variant="outline"
                size="sm"
                className="bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Previous
              </Button>
              <span className="text-textColor">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
              >
                Next
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarouselListModal;
