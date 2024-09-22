import React, { FC, useState, useEffect, useCallback } from "react";
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

const CarouselListModal: FC<CarouselListModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const {
    getAllCarousels,
    deleteCarousel,
    carousels,
    isCreatingOrUpdating,
    isDeleting,
    isFetchingAll,
  } = useCarouselManager();

  useEffect(() => {
    if (isOpen) {
      getAllCarousels();
    }
  }, [isOpen, getAllCarousels]);

  const handleOpenCarousel = useCallback((carousel: any) => {
    router.push(`?id=${carousel?.id}`);
    onClose();
  }, [router, onClose]);

  const handleDeleteCarousel = useCallback((carouselId: string) => {
    deleteCarousel(carouselId);
    toast.success("Carousel deleted successfully");
    getAllCarousels(); // Refresh the list
  }, [deleteCarousel, getAllCarousels]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const paginatedCarousels = carousels?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cardBackground text-textColor border border-borderColor">
        <div className="flex flex-col gap-4 bg-cardBackground ">
          <h2 className="text-lg font-medium bg-cardBackground text-textColor">
            All Carousels
          </h2>
          {isFetchingAll ? (
            <div className="flex justify-center items-center h-16 bg-cardBackground text-textColor">
              <p>Loading carousels...</p>
            </div>
          ) : carousels.length === 0 ? (
            <div className="flex justify-center items-center h-16 bg-cardBackground text-textColor">
              <p>No carousels found</p>
            </div>
          ) : (
            paginatedCarousels?.map((carousel) => (
              <div
                key={carousel?.id}
                className="flex justify-between items-center p-2 bg-cardBackground text-textColor hover:bg-cardBackground rounded"
              >
                <span>{carousel?.data?.name || "Unnamed Carousel"}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-cardBackground text-textColor hover:bg-cardBackground border border-borderColor"
                    onClick={() => handleOpenCarousel(carousel)}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-cardBackground text-textColor hover:bg-cardBackground border border-borderColor"
                    onClick={() => handleDeleteCarousel(carousel?.id)}
                    disabled={isDeleting}
                  >
                    <Trash className="w-3 h-3 mr-1" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))
          )}

          {/* Pagination controls */}
          {carousels.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-cardBackground text-textColor hover:bg-cardBackground border border-borderColor"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-3 h-3 mr-1 text-textColor" />
                Previous
              </Button>
              <span className="text-textColor">
                Page {currentPage} of {Math.ceil(carousels?.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-cardBackground text-textColor hover:bg-cardBackground border border-borderColor"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(carousels?.length / itemsPerPage)}
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
