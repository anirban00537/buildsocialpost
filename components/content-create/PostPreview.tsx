import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Calendar,
  FileText,
  CheckCircle2,
  XCircle,
  Tablet,
  Smartphone,
  Monitor,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { LinkedInProfileUI } from "@/types/post";
import { Viewer, SpecialZoomLevel, Worker } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  documentUrl?: string;
}

interface PostPreviewProps {
  title: string;
  content: string;
  isGenerating: boolean;
  hideViewModeSelector?: boolean;
  status?: "scheduled" | "draft" | "published" | "failed";
  dropdownItems?: DropdownItem[];
  selectedProfile: LinkedInProfileUI | null;
  imageUrls?: string[];
  documentUrl?: string;
}

type ViewMode = "mobile" | "tablet" | "desktop";

const MIN_CHARS = 10;

export const PostPreview = ({
  title,
  content,
  isGenerating,
  hideViewModeSelector = false,
  status,
  dropdownItems,
  selectedProfile,
  imageUrls = [],
  documentUrl,
}: PostPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case "mobile":
        return "w-full max-w-[380px]";
      case "tablet":
        return "w-full max-w-[600px]";
      default:
        return "w-full max-w-[680px]";
    }
  };

  const charCount = content.length;
  const isValidLength = charCount >= MIN_CHARS;

  const getStatusConfig = (status: string | undefined) => {
    switch (status) {
      case "scheduled":
        return {
          icon: <Calendar className="h-3.5 w-3.5" />,
          text: "Scheduled",
          className: "text-blue-600 bg-blue-50",
        };
      case "draft":
        return {
          icon: <FileText className="h-3.5 w-3.5" />,
          text: "Draft",
          className: "text-gray-600 bg-gray-50",
        };
      case "failed":
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          text: "Failed",
          className: "text-red-600 bg-red-50",
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig(status);

  useEffect(() => {
    // Reset states when documentUrl changes
    setNumPages(0);
    setPageNumber(1);
    setIsLoading(true);
    setError(null);
  }, [documentUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF Load Error:", error);
    setError("Failed to load PDF");
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const pageNavigationPluginInstance = pageNavigationPlugin({});
  const { CurrentPageLabel, NumberOfPages, jumpToPage } =
    pageNavigationPluginInstance;

  const handleDocumentLoad = (e: any) => {
    setNumPages(e.doc.numPages);
    setIsLoading(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      jumpToPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages - 1) {
      jumpToPage(currentPage + 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevPage();
    } else if (e.key === "ArrowRight") {
      handleNextPage();
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* View Mode Selector - Now conditional */}
      {!hideViewModeSelector && (
        <div className="flex items-center justify-end gap-1 px-2 md:px-0">
          <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-1.5 rounded transition-all ${
                viewMode === "mobile"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Mobile view"
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("tablet")}
              className={`p-1.5 rounded transition-all ${
                viewMode === "tablet"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Tablet view"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-1.5 rounded transition-all ${
                viewMode === "desktop"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Desktop view"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Post Container - Updated for grid view */}
      <div className="flex justify-center w-full h-full">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-gray-200 bg-white p-4 space-y-3 h-full"
          >
            {/* Header with Status and Options */}
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                {selectedProfile ? (
                  <>
                    <Avatar className="h-12 w-12 rounded-full">
                      <img
                        src={selectedProfile.avatarUrl}
                        alt={selectedProfile.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                          {selectedProfile.name}
                        </span>
                        <span className="text-sm text-gray-500">• You</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <span>Draft</span>
                        <span>•</span>
                        <span>
                          <svg
                            className="w-3 h-3 text-[#0A66C2] inline-block"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48A1.56,1.56,0,1,1,8.15,6.92,1.57,1.57,0,0,1,6.59,8.48ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Avatar className="h-12 w-12 rounded-full" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900">
                          No LinkedIn Account Connected
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Please connect your LinkedIn account to post
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Status Badge */}
                {status && statusConfig && (
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}
                  >
                    {statusConfig.icon}
                    <span>{statusConfig.text}</span>
                  </div>
                )}

                {/* Dropdown Menu - Only show if there are items */}
                {dropdownItems && dropdownItems.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      {dropdownItems.map((item, index) =>
                        item.href ? (
                          // Use Link for navigation items
                          <Link key={index} href={item.href} passHref>
                            <DropdownMenuItem
                              className={`flex items-center gap-2 cursor-pointer ${
                                item.className || ""
                              }`}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </DropdownMenuItem>
                          </Link>
                        ) : (
                          // Use button for action items
                          <DropdownMenuItem
                            key={index}
                            onClick={item.onClick}
                            className={`flex items-center gap-2 cursor-pointer ${
                              item.className || ""
                            }`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="text-sm text-gray-900">
              {isGenerating ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div
                      ref={contentRef}
                      className={`whitespace-pre-wrap break-words relative ${
                        !isExpanded && hasMoreContent ? "line-clamp-3" : ""
                      }`}
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        lineHeight: "1.5",
                      }}
                    >
                      {content}
                    </div>

                    {/* Show more/less button */}
                    {hasMoreContent && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-700 hover:underline text-sm font-medium mt-1"
                      >
                        {isExpanded ? "...see less" : "...see more"}
                      </button>
                    )}
                  </div>

                  {/* Replace the Image Preview Grid with PDF Preview when documentUrl exists */}
                  {documentUrl ? (
                    <div className="mt-4">
                      <div className="relative bg-white rounded-lg shadow-lg">
                        {/* Navigation Buttons */}
                        {!isLoading && (
                          <>
                            {currentPage > 0 && (
                              <button
                                onClick={handlePrevPage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all"
                              >
                                <FiChevronLeft className="w-6 h-6 text-gray-800" />
                              </button>
                            )}

                            {currentPage < numPages - 1 && (
                              <button
                                onClick={handleNextPage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all"
                              >
                                <FiChevronRight className="w-6 h-6 text-gray-800" />
                              </button>
                            )}

                            {/* Page Counter */}
                            <div className="absolute top-4 right-4 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                              {currentPage + 1} / {numPages}
                            </div>
                          </>
                        )}

                        {/* PDF Viewer */}
                        <div
                          className="h-[600px] overflow-hidden select-none"
                          style={{
                            touchAction: "none", // Disable touch scrolling
                            userSelect: "none", // Disable text selection
                          }}
                        >
                          <Worker
                            workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}
                          >
                            <Viewer
                              fileUrl={documentUrl}
                              plugins={[pageNavigationPluginInstance]}
                              defaultScale={SpecialZoomLevel.PageFit}
                              enableSmoothScroll={false}
                              onPageChange={(e) =>
                                setCurrentPage(e.currentPage)
                              }
                              onDocumentLoad={(e) => {
                                setNumPages(e.doc.numPages);
                                setIsLoading(false);
                              }}
                              renderLoader={(percentages) => (
                                <div className="h-full flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4" />
                                    <p className="text-gray-600">
                                      Loading... {Math.round(percentages)}%
                                    </p>
                                  </div>
                                </div>
                              )}
                            />
                          </Worker>
                        </div>

                        {/* Page Indicators */}
                        {!isLoading && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {Array.from({ length: numPages }, (_, i) => (
                              <button
                                key={i}
                                onClick={() => jumpToPage(i)}
                                className={`transition-all duration-200 rounded-full ${
                                  currentPage === i
                                    ? "w-4 h-2 bg-blue-600"
                                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Existing image grid code
                    imageUrls.length > 0 && (
                      <div className="mt-4">
                        <div
                          className={`grid gap-2 ${
                            imageUrls.length === 1
                              ? "grid-cols-1"
                              : imageUrls.length === 2
                              ? "grid-cols-2"
                              : imageUrls.length === 3
                              ? "grid-cols-2"
                              : "grid-cols-2"
                          }`}
                        >
                          {imageUrls.map((url, index) => (
                            <div
                              key={index}
                              className={`relative rounded-lg overflow-hidden ${
                                imageUrls.length === 3 && index === 0
                                  ? "row-span-2"
                                  : ""
                              }`}
                            >
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                                style={{
                                  aspectRatio:
                                    imageUrls.length === 1 ? "16/9" : "1/1",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
