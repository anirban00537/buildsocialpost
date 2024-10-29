import { ArrowRight, Loader2 } from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";

interface ContentInputProps {
  contentSource: string;
  isGenerating: boolean;
  handleGenerate: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setContent: (content: string) => void;
  isGeneratingLinkedinPosts: boolean;
  handleGenerateLinkedIn: () => void;
  handleLinkedInTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: string;
}

export const ContentInput = ({
  contentSource,
  isGenerating,
  handleGenerate,
  handleTextChange,
  setContent,
  isGeneratingLinkedinPosts,
  handleGenerateLinkedIn,
  handleLinkedInTextChange,
  content,
}: ContentInputProps) => {
  const isGeneratingContent =
    contentSource === "plain-prompt" ? isGeneratingLinkedinPosts : isGenerating;
  const onGenerate =
    contentSource === "plain-prompt" ? handleGenerateLinkedIn : handleGenerate;
  const onTextChange =
    contentSource === "plain-prompt"
      ? handleLinkedInTextChange
      : handleTextChange;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
          Your Content
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      <div className="rounded-xl border border-primary bg-white p-1.5 hover:border-primary/20 transition-colors">
        <div className="flex items-start gap-3">
          <textarea
            value={contentSource === "plain-prompt" ? content : undefined}
            onChange={onTextChange}
            className="flex-1 px-3.5 py-3 rounded-lg h-[60px] max-h-[64px]
                     resize-none outline-none bg-white
                     placeholder:text-gray-400 text-gray-600 text-sm
                     border-none focus:ring-1 focus:ring-blue-50/50
                     focus:border-blue-100 transition-all duration-200
                     overflow-y-auto leading-relaxed"
            placeholder={
              contentSource === "text"
                ? "What would you like to write about? Be specific to get better results..."
                : contentSource === "youtube"
                ? "Paste your YouTube video URL here..."
                : "Paste your blog post URL here..."
            }
          />

          <ShimmerButton
            onClick={onGenerate}
            disabled={isGeneratingContent}
            className={`group px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
              ${
                isGeneratingContent
                  ? "bg-gray-100"
                  : "bg-gray-900 hover:bg-gray-800"
              }
              text-white whitespace-nowrap h-[42px] flex items-center mt-[11px]
              hover:shadow-md active:shadow-sm`}
            background="linear-gradient(to right, #3369e7, #3369e7)"
          >
            {isGeneratingContent ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-gray-400">Converting...</span>
              </>
            ) : (
              <>
                Create
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};
