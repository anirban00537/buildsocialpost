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

export interface DropdownItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

interface PostPreviewProps {
  title: string;
  content: string;
  isGenerating: boolean;
  hideViewModeSelector?: boolean;
  status?: 'scheduled' | 'draft' | 'published' | 'failed';
  dropdownItems?: DropdownItem[];
}

type ViewMode = "mobile" | "tablet" | "desktop";

const MIN_CHARS = 10;
const MAX_CHARS = 500;

export const PostPreview = ({
  title,
  content,
  isGenerating,
  hideViewModeSelector = false,
  status,
  dropdownItems,
}: PostPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Add selector for LinkedIn profile
  const { currentLinkedInProfile } = useSelector((state: RootState) => state.user);

  // Check if content needs "show more" button
  useEffect(() => {
    const checkLineCount = () => {
      const element = contentRef.current;
      if (!element) return;

      // Get line height and total height
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      const totalHeight = element.scrollHeight;
      const lines = Math.floor(totalHeight / lineHeight);

      setHasMoreContent(lines > 3);
    };

    checkLineCount();
    // Add resize listener for responsive behavior
    window.addEventListener("resize", checkLineCount);
    return () => window.removeEventListener("resize", checkLineCount);
  }, [content]);

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
      case 'scheduled':
        return {
          icon: <Calendar className="h-3.5 w-3.5" />,
          text: 'Scheduled',
          className: 'text-blue-600 bg-blue-50'
        };
      case 'draft':
        return {
          icon: <FileText className="h-3.5 w-3.5" />,
          text: 'Draft',
          className: 'text-gray-600 bg-gray-50'
        };
      case 'failed':
        return {
          icon: <XCircle className="h-3.5 w-3.5" />,
          text: 'Failed',
          className: 'text-red-600 bg-red-50'
        };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig(status);

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
                {currentLinkedInProfile ? (
                  <>
                    <Avatar className="h-12 w-12 rounded-full">
                      <img 
                        src={currentLinkedInProfile.avatarUrl} 
                        alt={currentLinkedInProfile.name}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                          {currentLinkedInProfile.name}
                        </span>
                        <span className="text-sm text-gray-500">• You</span>
                      </div>
                      {/* <span className="text-xs text-gray-500 leading-tight">
                        {currentLinkedInProfile. || "LinkedIn Professional"}
                      </span> */}
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <span>Draft</span>
                        <span>•</span>
                        <span>
                          <svg className="w-3 h-3 text-[#0A66C2] inline-block" viewBox="0 0 24 24" fill="currentColor">
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
                      {dropdownItems.map((item, index) => (
                        item.href ? (
                          // Use Link for navigation items
                          <Link key={index} href={item.href} passHref>
                            <DropdownMenuItem
                              className={`flex items-center gap-2 cursor-pointer ${item.className || ''}`}
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
                            className={`flex items-center gap-2 cursor-pointer ${item.className || ''}`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </DropdownMenuItem>
                        )
                      ))}
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
                <div className="relative">
                  <div
                    ref={contentRef}
                    className={`whitespace-pre-wrap break-words relative ${
                      !isExpanded && hasMoreContent ? "line-clamp-3" : ""
                    }`}
                    style={{ 
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      lineHeight: '1.5'
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
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
