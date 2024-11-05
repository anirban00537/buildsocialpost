import { PostPreview } from "./PostPreview";
import { motion } from "framer-motion";
import { Sparkles, BookmarkPlus, Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useContentPosting } from "@/hooks/useContent";
import { useRouter } from "next/navigation";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { LinkedInProfileUI } from "@/types/post";

interface PostPreviewFullFeatureProps {
  isGenerating: boolean;
  generatedPost?: string;
  showActions?: boolean;
  title?: string;
  selectedProfile: LinkedInProfileUI | null;
}

export const PostPreviewFullFeature = ({
  isGenerating,
  generatedPost,
  showActions = true,
  title = "Your Generated Contents",
  selectedProfile,
}: PostPreviewFullFeatureProps) => {
  const post: string = generatedPost || "";


  return (
    <div className="space-y-6">
      {/* Title Section with Action Buttons */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
            {title}
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-100 via-blue-400 to-gray-100" />
        </div>
      </div>

      {/* Content Cards Container */}
      <div className="relative shadow-md rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-50/50 to-blue-100 border border-gray-200/80 p-4 pb-8">
        <div className="overflow-visible">
          <PostPreview 
            title={""} 
            content={post} 
            isGenerating={isGenerating}
            selectedProfile={selectedProfile}
          />
        </div>
      </div>
    </div>
  );
};
