import React, { FC, useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

interface CarouselListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarouselListModal: FC<CarouselListModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const {
    carousels,
    deleteCarousel,
    isDeleting,
    isFetchingAll,
    isAuthenticated,
  } = useCarouselManager();

  // Use React Query to fetch carousels
  const { data: fetchedCarousels, refetch } = useQuery(
    "carousels",
    () => carousels,
    {
      enabled: isOpen && isAuthenticated,
      refetchOnWindowFocus: false,
    }
  );

  const handleOpenCarousel = useCallback(
    (carousel: any) => {
      router.push(`?id=${carousel?.id}`);
      onClose();
    },
    [router, onClose]
  );

  const handleDeleteCarousel = useCallback(
    async (carouselId: string) => {
      try {
        await deleteCarousel(carouselId);
        toast.success("Carousel deleted successfully");
        refetch(); // Refresh the list
      } catch (error) {
        console.error("Error deleting carousel:", error);
        toast.error("Failed to delete carousel");
      }
    },
    [deleteCarousel, refetch]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const paginatedCarousels = fetchedCarousels?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-opacity-80 bg-background backdrop-filter backdrop-blur-md border border-borderColor rounded-lg text-white">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-white">All Carousels</h2>
          {isFetchingAll ? (
            <div className="flex justify-center items-center h-16 text-white">
              <p>Loading carousels...</p>
            </div>
          ) : fetchedCarousels?.length === 0 ? (
            <div className="flex justify-center items-center h-16 text-white">
              <p>No carousels found</p>
            </div>
          ) : (
            paginatedCarousels?.map((carousel) => (
              <div
                key={carousel?.id}
                className="flex justify-between items-center p-2 bg-opacity-60 bg-cardBackground hover:bg-opacity-70 rounded-lg transition-all duration-200"
              >
                <span className="text-white ml-5">
                  {carousel?.data?.name || "Unnamed Carousel"}
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
          {fetchedCarousels && fetchedCarousels.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Previous
              </Button>
              <span className="text-white">
                Page {currentPage} of{" "}
                {Math.ceil(fetchedCarousels.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="bg-opacity-70 bg-gray-700 text-white hover:bg-opacity-90 border border-gray-600 transition-all duration-200"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(fetchedCarousels.length / itemsPerPage)
                }
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
