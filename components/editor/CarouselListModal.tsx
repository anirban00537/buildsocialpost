import React, { FC, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, FileText, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { setName } from "@/state/slice/carousel.slice";
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
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenCarousel = (carousel: any) => {
    router.push(`?id=${carousel.id}`);
    setIsViewAllModalOpen(false);
  };

  const handleEditCarousel = (carousel: any) => {
    setSelectedCarousel(carousel);
    dispatch(setName(carousel.data.name));
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (selectedCarousel) {
      await createOrUpdateCarousel(
        selectedCarousel.data.name,
        selectedCarousel.id
      );
      setIsEditing(false);
      setSelectedCarousel(null);
    }
  };

  const handleDeleteCarousel = (carouselId: string) => {
    deleteCarousel(carouselId);
    setSelectedCarousel(null);
    setIsViewAllModalOpen(true); // Refresh the list
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedCarousels = carousels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dialog open={isViewAllModalOpen} onOpenChange={setIsViewAllModalOpen}>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">All Carousels</h2>
          {carousels.length === 0 && (
            <div className="flex justify-center items-center h-16">
              <p>No carousels found</p>
            </div>
          )}
          {paginatedCarousels.map((carousel) => (
            <div
              key={carousel.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
            >
              {isEditing && selectedCarousel?.id === carousel.id ? (
                <div className="flex w-full justify-between items-center">
                  <input
                    type="text"
                    value={carousel.data.name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                    className="border px-2 py-1 rounded flex-grow mr-2"
                    placeholder="Carousel Name"
                  />
                  <Button
                    onClick={handleSaveEdit}
                    disabled={saveLoading}
                    className="flex items-center gap-2"
                  >
                    {saveLoading ? (
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              ) : (
                <>
                  <span>{carousel.data.name || "Unnamed Carousel"}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenCarousel(carousel)}
                    >
                      <FileText className="w-4 h-4" />
                      Open
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCarousel(carousel)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCarousel(carousel.id)}
                    >
                      <Trash className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span>
              Page {currentPage} of {Math.ceil(carousels.length / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(carousels.length / itemsPerPage)
              }
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarouselListModal;
