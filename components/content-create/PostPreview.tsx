import { Avatar } from "@/components/ui/avatar";
import { MoreHorizontal, ThumbsUp, MessageCircle, Repeat2, Smartphone, Tablet, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface PostPreviewProps {
  title: string;
  content: string;
  isGenerating: boolean;
}

type ViewMode = "mobile" | "tablet" | "desktop";

const MIN_CHARS = 10;
const MAX_CHARS = 500;

export const PostPreview = ({
  title,
  content,
  isGenerating,
}: PostPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [hasMoreContent, setHasMoreContent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="space-y-4 w-full">
      {/* View Mode Selector */}
      <div className="flex items-center justify-end gap-1 px-2 md:px-0">
        <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded transition-all ${
              viewMode === 'mobile'
                ? 'bg-white shadow-sm text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
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

      {/* Post Container */}
      <div className="flex justify-center w-full">
        <div className={`${getViewportClass()} mx-auto`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                <Avatar className="h-12 w-12 rounded-full" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                      Anirban Roy
                    </span>
                    <span className="text-sm text-gray-500">• You</span>
                  </div>
                  <span className="text-xs text-gray-500 leading-tight">
                    Helping companies and others build SaaS | Currently building BuildSocialPost...
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <span>2d</span>
                    <span>•</span>
                    <span>🌐</span>
                  </div>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="h-5 w-5 text-gray-600" />
              </button>
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

            {/* Engagement Stats */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="h-4 w-4 rounded-full bg-blue-500 ring-1 ring-white" />
                    <div className="h-4 w-4 rounded-full bg-red-500 ring-1 ring-white" />
                    <div className="h-4 w-4 rounded-full bg-yellow-500 ring-1 ring-white" />
                  </div>
                  <span className="hover:text-blue-600 hover:underline cursor-pointer">
                    234 reactions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hover:text-blue-600 hover:underline cursor-pointer">
                    12 comments
                  </span>
                  <span>•</span>
                  <span className="hover:text-blue-600 hover:underline cursor-pointer">
                    59 reposts
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-200">
              <button className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 flex-1">
                <ThumbsUp className="h-5 w-5" />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 flex-1">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">Comment</span>
              </button>
              <button className="flex items-center gap-2 p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 flex-1">
                <Repeat2 className="h-5 w-5" />
                <span className="text-sm">Repost</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
