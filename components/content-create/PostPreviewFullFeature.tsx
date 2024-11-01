import { PostPreview } from "./PostPreview";
import { motion } from "framer-motion";
import { Sparkles, BookmarkPlus, Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useContentPosting } from "@/hooks/useContent";
import { useRouter } from "next/navigation";

interface PostPreviewFullFeatureProps {
  isGenerating: boolean;
  generatedPost?: string;
  showActions?: boolean;
  title?: string;
}

export const PostPreviewFullFeature = ({
  isGenerating,
  generatedPost,
  showActions = true,
  title = "Your Generated Contents",
}: PostPreviewFullFeatureProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const post: string = generatedPost || "";
  const router = useRouter();

  const { handleCreateDraftFromGenerated, isCreatingDraft } =
    useContentPosting();

  const handleSave = async () => {
    try {
      setIsSaved(true);

      const draftId = await handleCreateDraftFromGenerated({
        content: post,
        postType: "text",
        imageUrls: [],
        videoUrl: "",
        documentUrl: "",
        hashtags: [],
        mentions: [],
      });

      if (draftId) {
        // Redirect to content editor with the draft ID
        router.push(`/compose?draft_id=${draftId}`);
      }
    } catch (err) {
      toast.error("Failed to save content");
      console.error("Save failed:", err);
    } finally {
      setIsSaved(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post);
      setIsCopied(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
      console.error("Copy failed:", err);
    }
  };

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
        {showActions && post && !isGenerating && (
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleSave}
              disabled={isCreatingDraft}
              className={`p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2 text-xs text-gray-600 ${
                isCreatingDraft ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Save content"
            >
              <BookmarkPlus
                className={`h-4 w-4 ${
                  isSaved ? "text-green-500" : "text-gray-500"
                }`}
              />
              <span>{isCreatingDraft ? "Saving..." : "Save and Edit"}</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2 text-xs text-gray-600"
              title="Copy content"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content Cards Container */}
      <div className="relative shadow-md rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-50/50 to-blue-100 border border-gray-200/80 p-4 pb-8">
        <div className="overflow-visible">
          <PostPreview title={""} content={post} isGenerating={isGenerating} />
        </div>
      </div>
    </div>
  );
};
