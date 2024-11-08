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
  generatedPost: string;
  showActions?: boolean;
  title?: string;
  selectedProfile: LinkedInProfileUI | null;
  imageUrls?: string[];
}

export const PostPreviewFullFeature = ({
  isGenerating,
  generatedPost,
  showActions = true,
  title = "Your Generated Contents",
  selectedProfile,
  imageUrls = [],
}: PostPreviewFullFeatureProps) => {
  return (
    <PostPreview
      title={title}
      content={generatedPost}
      isGenerating={isGenerating}
      hideViewModeSelector={false}
      selectedProfile={selectedProfile}
      imageUrls={imageUrls}
    />
  );
};
