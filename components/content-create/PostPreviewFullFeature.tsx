import { PostPreview } from "./PostPreview";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Post {
  title: string;
  content: string;
}

interface PostPreviewFullFeatureProps {
  isGenerating: boolean;
  generatedPost?: string;
}

export const PostPreviewFullFeature = ({
  isGenerating,
  generatedPost,
}: PostPreviewFullFeatureProps) => {
  const post: string = generatedPost || "";

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
          Your Generated Contents
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-gray-100 via-blue-400 to-gray-100" />
      </div>

      {/* Content Cards Container */}
      <div className="shadow-md rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-50/50 to-blue-100 border border-gray-200/80 p-6">
        <PostPreview title={""} content={post} isGenerating={isGenerating} />
      </div>
    </div>
  );
};
