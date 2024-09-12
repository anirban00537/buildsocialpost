import React, { FC, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface CarouselListModalProps {
  carousels: any[];
  isViewAllModalOpen: boolean;
  setIsViewAllModalOpen: (isOpen: boolean) => void;
  createOrUpdateCarousel: (name: string, id?: string) => Promise<void>;
  deleteCarousel: (carouselId: string) => void;
  saveLoading: boolean;
}

const CarouselListModal: FC<CarouselListModalProps> = ({
  carousels,
  isViewAllModalOpen,
  setIsViewAllModalOpen,
  createOrUpdateCarousel,
  deleteCarousel,
  saveLoading,
}) => {
  const [selectedCarousel, setSelectedCarousel] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const handleOpenCarousel = (carousel: any) => {
    router.push(`?id=${carousel?.id}`);
    setIsViewAllModalOpen(false);
  };

  const handleDeleteCarousel = (carouselId: string) => {
    deleteCarousel(carouselId);
    setSelectedCarousel(null);
    setIsViewAllModalOpen(true); // Refresh the list
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedCarousels = carousels?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dialog open={isViewAllModalOpen} onOpenChange={setIsViewAllModalOpen}>
      <DialogContent className="bg-cardBackground border border-borderColor">
        <div className="flex flex-col gap-4 bg-cardBackground ">
          <h2 className="text-lg font-medium bg-cardBackground text-textColor">
            All Carousels
          </h2>
          {carousels.length === 0 && (
            <div className="flex justify-center items-center h-16 bg-cardBackground text-textColor">
              <p>No carousels found</p>
            </div>
          )}
          {paginatedCarousels?.map((carousel) => (
            <div
              key={carousel?.id}
              className="flex justify-between items-center p-2 bg-cardBackground text-textColor hover:bg-cardBackground rounded"
            >
              <>
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
                  >
                    <Trash className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </>
            </div>
          ))}

          {/* Pagination controls */}
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
              Page {currentPage} of{" "}
              {Math?.ceil(carousels?.length / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-cardBackground text-textColor hover:bg-cardBackground border border-borderColor"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math?.ceil(carousels?.length / itemsPerPage)
              }
            >
              Next
              <ChevronRight className="w-3 h-3 mr-" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarouselListModal;
