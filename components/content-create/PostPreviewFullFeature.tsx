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
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import Image from "next/image";

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
      {/* Enhanced Title Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              LinkedIn Preview
            </span>
            <div className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-[10px] font-medium text-blue-600">
                Live Preview
              </span>
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger className="group">
              <HelpCircle className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">See how your post will look on LinkedIn</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {showActions && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-gray-600 hover:text-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(post);
                toast.success('Content copied to clipboard');
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Preview Container */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-indigo-100/30 rounded-2xl" />
        <div className="relative backdrop-blur-sm rounded-2xl border border-gray-200/80 shadow-md overflow-hidden">
          <div className="p-6">
            <PostPreview 
              title={""} 
              content={post} 
              isGenerating={isGenerating}
              selectedProfile={selectedProfile}
            />
          </div>
          
          {/* Preview Footer */}
          <div className="px-6 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Preview Mode
            </div>
            {selectedProfile && (
              <div className="flex items-center gap-2">
                <Image
                  src={selectedProfile.avatarUrl}
                  alt={selectedProfile.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-xs text-gray-600">{selectedProfile.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
