"use client";
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Trash,
  Calendar,
  Layout,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import toast from "react-hot-toast";

const CarouselsPage = () => {
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
    (carouselId: string) => {
      router.push(`/carousel-editor?id=${carouselId}`);
    },
    [router]
  );

  const handleDeleteCarousel = useCallback(
    async (carouselId: string) => {
      try {
        await deleteCarousel(carouselId);
        refetchCarousels();
        toast.success("Carousel deleted successfully");
      } catch (error) {
        toast.error("Failed to delete carousel");
      }
    },
    [deleteCarousel, refetchCarousels]
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Carousels</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and organize your carousel presentations
              </p>
            </div>
            <Button
              onClick={() => router.push("/carousel-editor")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Carousel
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search carousels..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-6">
        {isFetchingAll ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : !carousels || carousels.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Layout className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No carousels yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new carousel</p>
            <Button
              onClick={() => router.push("/carousel-editor")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Carousel
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Created</div>
              <div className="col-span-2">Slides</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {carousels.map((carousel: any) => (
                <div
                  key={carousel.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                >
                  <div className="col-span-4">
                    <h3 className="font-medium text-gray-900 truncate">
                      {carousel.data.name || "Unnamed Carousel"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      ID: {carousel.id.slice(0, 8)}...
                    </p>
                  </div>

                  <div className="col-span-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {new Date(carousel.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="col-span-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Layout className="w-4 h-4 mr-1.5" />
                      {carousel.data.slides.length} slides
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      Active
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end gap-2">
                    <Button
                      onClick={() => handleOpenCarousel(carousel.id)}
                      className="h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 ring-1 ring-blue-200 hover:ring-blue-300"
                    >
                      <FileText className="w-4 h-4 mr-1.5" />
                      Open
                    </Button>
                    <Button
                      onClick={() => handleDeleteCarousel(carousel.id)}
                      disabled={isDeleting}
                      variant="ghost"
                      className="h-8 text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, pagination.totalCount)} of{" "}
              {pagination.totalCount} results
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1.5" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <Button
                variant="ghost"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="h-8 text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselsPage;
