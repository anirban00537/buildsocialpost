import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Wand2, Edit, ArrowRight } from "lucide-react";
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
  const { handleCreateDraftFromGenerated, isCreatingDraft } = useContentPosting();

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
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">AI-powered content</span>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-500">{content.length} characters</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {content && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={`
                  h-8 gap-2 text-xs transition-all duration-200
                  ${isCopied ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </Button>

              <Button
                variant="default"
                size="sm"
                onClick={handleSaveAndEdit}
                disabled={isCreatingDraft}
                className="h-8 gap-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
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
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Content Area */}
      <div className="relative rounded-xl overflow-hidden">
        {isGenerating ? (
          <div className="relative space-y-4 p-6 bg-white border border-gray-100">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-100 rounded-full w-3/4" />
              <div className="h-4 bg-gray-100 rounded-full w-1/2" />
              <div className="h-4 bg-gray-100 rounded-full w-5/6" />
              <div className="h-4 bg-gray-100 rounded-full w-2/3" />
            </div>
            <div className="absolute inset-0 backdrop-blur-sm bg-white/50 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium text-blue-700">Generating content...</span>
              </div>
            </div>
          </div>
        ) : content ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -left-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {content}
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
                <Sparkles className="h-3 w-3" />
                AI Enhanced
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[300px] flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50/50"
          >
            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Wand2 className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Ready to Generate
            </h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Use the editor on the left to start generating AI-powered content
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
