import { motion } from "framer-motion";
import { Sparkles, Copy, Check, Wand2, Edit } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useContentPosting } from "@/hooks/useContent";
import { useRouter } from "next/navigation";

interface AIWritingPreviewProps {
  isGenerating: boolean;
  generatedPost?: string;
  title?: string;
}

export const AIWritingPreview = ({
  isGenerating,
  generatedPost,
  title = "AI Generated Content",
}: AIWritingPreviewProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const content = generatedPost || "";
  const router = useRouter();

  const { handleCreateDraftFromGenerated, isCreatingDraft } =
    useContentPosting();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
      console.error("Copy failed:", err);
    }
  };

  const handleSaveAndEdit = async () => {
    if (!content.trim()) {
      toast.error("Please generate content first");
      return;
    }

    try {
      const draftId = await handleCreateDraftFromGenerated({
        content: content.trim(),
      });

      if (draftId) {
        toast.success("Draft saved! Redirecting to editor...");
        router.push(`/compose?draft_id=${draftId}`);
      }
    } catch (error) {
      toast.error("Failed to save draft");
      console.error("Save draft error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Wand2 className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">
              AI-powered content generation
            </p>
          </div>
        </div>
        {content && !isGenerating && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-2 text-xs"
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveAndEdit}
              disabled={isCreatingDraft}
              className="gap-2 text-xs bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
            >
              {isCreatingDraft ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Edit className="h-3.5 w-3.5" />
                  Save & Edit
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">
        {isGenerating ? (
          <div className="space-y-4 p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>AI is writing...</span>
              </div>
            </div>
          </div>
        ) : content ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {content}
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3" />
                AI Enhanced
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-lg p-8">
            <div className="w-12 h-12 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <Wand2 className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Ready to Generate Content
            </h3>
            <p className="text-sm text-gray-500">
              Your AI-generated content will appear here
            </p>
          </div>
        )}
      </div>

      {/* Character Count */}
      {content && !isGenerating && (
        <div className="flex justify-end">
          <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            {content.length} characters
          </span>
        </div>
      )}
    </div>
  );
};
