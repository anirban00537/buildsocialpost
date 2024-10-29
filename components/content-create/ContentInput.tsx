import {
  ArrowRight,
  Loader2,
  HelpCircle,
  Pencil,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Smile,
  Briefcase,
  Sparkles,
  Code,
  BookMarked,
  ArrowRightCircle,
  GraduationCap,
  Target,
  BarChart2,
  MessagesSquare,
  FileText,
  Zap,
} from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  postTone: string;
  setPostTone: (tone: string) => void;
  writingStyle: string;
  setWritingStyle: (style: string) => void;
}
const toneIcons = {
  Professional: <Briefcase className="h-3 w-3" />,
  Casual: <Smile className="h-3 w-3" />,
  Friendly: <MessageCircle className="h-3 w-3" />,
  Authoritative: <BookMarked className="h-3 w-3" />,
  Humorous: <Sparkles className="h-3 w-3" />,
  Formal: <FileText className="h-3 w-3" />,
  Inspirational: <Lightbulb className="h-3 w-3" />,
  Technical: <Code className="h-3 w-3" />,
};

const styleIcons = {
  Storytelling: <BookOpen className="h-3 w-3" />,
  Direct: <ArrowRightCircle className="h-3 w-3" />,
  Educational: <GraduationCap className="h-3 w-3" />,
  Persuasive: <Target className="h-3 w-3" />,
  Analytical: <BarChart2 className="h-3 w-3" />,
  Conversational: <MessagesSquare className="h-3 w-3" />,
  Descriptive: <FileText className="h-3 w-3" />,
  Engaging: <Zap className="h-3 w-3" />,
};

const MIN_CHARS = 10;
const MAX_CHARS = 500;

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
  postTone,
  setPostTone,
  writingStyle,
  setWritingStyle,
}: ContentInputProps) => {
  const isGeneratingContent =
    contentSource === "plain-prompt" ? isGeneratingLinkedinPosts : isGenerating;
  const onGenerate =
    contentSource === "plain-prompt" ? handleGenerateLinkedIn : handleGenerate;
  const onTextChange =
    contentSource === "plain-prompt"
      ? handleLinkedInTextChange
      : handleTextChange;

  const charCount = content.length;
  const isValidLength = charCount >= MIN_CHARS;

  return (
    <div className="space-y-6">
      {/* Content Input Section */}
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-600">
              Your Content
            </span>
            <div className="flex items-center gap-0.5 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                Describe what you want to write about. The more specific, the
                better the results.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Content Input */}
        <div className="space-y-1">
          <div
            className="bg-white ring-1 ring-gray-200 rounded-lg p-2 transition-all duration-200
            ${!isValidLength && charCount > 0 ? 'ring-red-200' : 'focus-within:ring-blue-200'}"
          >
            <textarea
              value={contentSource === "plain-prompt" ? content : undefined}
              onChange={onTextChange}
              className="w-full px-3 py-2 rounded-md h-[80px] max-h-[120px]
                       resize-none outline-none bg-white
                       placeholder:text-gray-400 text-gray-600 text-xs
                       border-none
                       transition-all duration-200
                       overflow-y-auto leading-relaxed"
              placeholder="What would you like to write about? Be specific to get better results..."
              maxLength={MAX_CHARS}
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              {charCount > 0 && !isValidLength && (
                <span className="text-[10px] text-red-500">
                  Minimum {MIN_CHARS} characters required
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400">
              {charCount}/{MAX_CHARS}
            </span>
          </div>
        </div>
      </div>

      {/* Post Settings Section */}
      <div className="space-y-5 rounded-xl p-4 border border-gray-100 ring-1 ring-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Content Style
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* Settings Grid */}
        <div className="grid gap-6">
          {/* Tone Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700">Tone</label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Select the tone that best matches your intended audience
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(toneIcons).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setPostTone(tone)}
                  className={`px-3 py-2 flex items-center gap-2 text-xs rounded-lg border transition-all duration-200
                      ${
                        tone === postTone
                          ? "border-blue-200 bg-blue-50 text-blue-600 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-white hover:shadow-sm"
                      }`}
                >
                  {toneIcons[tone as keyof typeof toneIcons]}
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Writing Style with similar improvements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700">
                Writing Style
              </label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Choose how you want your content to be written
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(styleIcons).map((style) => (
                <button
                  key={style}
                  onClick={() => setWritingStyle(style)}
                  className={`px-3 py-2 flex items-center gap-2 text-xs rounded-lg border transition-all
                      ${
                        style === writingStyle
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                >
                  {styleIcons[style as keyof typeof styleIcons]}
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <ShimmerButton
          onClick={onGenerate}
          disabled={isGeneratingContent || !isValidLength}
          className={`w-full mt-4 py-3 text-sm font-medium rounded-lg transition-all duration-300
            ${!isValidLength ? "opacity-50 cursor-not-allowed" : ""}
            ${
              isGeneratingContent
                ? "bg-gray-100"
                : "bg-blue-600 hover:bg-blue-700"
            }
            text-white flex items-center justify-center gap-2
            hover:shadow-md active:shadow-sm`}
          background="linear-gradient(to right, #3369e7, #2f5cc9)"
        >
          {isGeneratingContent ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating your content...</span>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>Generate Content</span>
              <div className="flex items-center gap-1 text-[10px] opacity-70 bg-white/10 px-1.5 py-0.5 rounded">
                <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
                <span>↵</span>
              </div>
            </div>
          )}
        </ShimmerButton>
      </div>
    </div>
  );
};
