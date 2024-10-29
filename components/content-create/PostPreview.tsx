import { Avatar } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageCircle, Repeat2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

interface PostPreviewProps {
  title: string;
  content: string;
  isGenerating: boolean;
}

export const PostPreview = ({
  title,
  content,
  isGenerating,
}: PostPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = async () => {
    try {
      const textToCopy = title ? `${title}\n\n${content}` : content;
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
      console.error("Copy failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-gray-200 bg-white p-3 space-y-2.5 relative group"
    >
      {/* Add copy button */}
      {!isGenerating && content && (
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
          title="Copy content"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <Avatar className="h-10 w-10 rounded-full border border-gray-200" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              Anirban Roy
            </span>
            <span className="text-xs text-gray-500">
              Helping companies and others build SaaS |
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <span>now</span>
              <span>•</span>
              <span>🌐</span>
            </div>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-50 rounded-full transition-colors">
          <Star className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Content */}
      <div className="text-sm text-gray-600">
        {isGenerating ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        ) : (
          <>
            {title && (
              <div className="font-semibold mb-2 text-gray-900">{title}</div>
            )}
            <div 
              className={`whitespace-pre-line ${isExpanded ? "" : "line-clamp-3"}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {content ||
                ""}
            </div>
          </>
        )}
      </div>

      {/* See more/less button */}
      {!isGenerating && content && (
        <button
          onClick={toggleExpand}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isExpanded ? "...see less" : "...see more"}
        </button>
      )}

      {/* Engagement Stats */}
      <div className="pt-1.5 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="h-4 w-4 rounded-full bg-blue-500 ring-1 ring-white" />
              <div className="h-4 w-4 rounded-full bg-red-500 ring-1 ring-white" />
              <div className="h-4 w-4 rounded-full bg-yellow-500 ring-1 ring-white" />
            </div>
            <span>234 reactions</span>
          </div>
          <div className="flex items-center gap-2">
            <span>12 comments</span>
            <span>•</span>
            <span>59 reposts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-600">
          <ThumbsUp className="h-4 w-4" />
          <span className="text-xs">Like</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-600">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">Comment</span>
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors text-gray-600">
          <Repeat2 className="h-4 w-4" />
          <span className="text-xs">Repost</span>
        </button>
      </div>
    </motion.div>
  );
};
