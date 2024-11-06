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
      {/* Content Input Section with Clean Design */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Pencil className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Your Content
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">AI Assistant</span>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content Input */}
        <div className="space-y-2">
          <div
            className={`
            relative overflow-hidden rounded-xl bg-white border
            ${
              !isValidLength && charCount > 0
                ? "border-red-200"
                : "border-gray-200"
            }
            transition-all duration-200 group
          `}
          >
            <div className="absolute inset-0 bg-primary/5" />
            <textarea
              value={contentSource === "plain-prompt" ? content : undefined}
              onChange={onTextChange}
              className="relative w-full px-4 py-3 h-[100px] max-h-[150px]
                       resize-none outline-none bg-transparent
                       placeholder:text-gray-400 text-gray-600 text-sm
                       transition-all duration-200
                       overflow-y-auto leading-relaxed"
              placeholder="What would you like to write about? Be specific to get better results..."
              maxLength={MAX_CHARS}
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              {charCount > 0 && !isValidLength && (
                <span className="text-[10px] font-medium text-red-500">
                  Minimum {MIN_CHARS} characters required
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-gray-500">
              {charCount}/{MAX_CHARS}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Post Settings Section */}
      <div className="space-y-5 rounded-xl border border-gray-200 overflow-hidden">
        <div className="relative p-5 space-y-5">
          <div className="absolute inset-0 bg-primary/5" />

          {/* Section Header */}
          <div className="relative flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Content Style
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Customize your content's voice and style
              </p>
            </div>
          </div>

          {/* Settings Grid with Clean Design */}
          <div className="relative grid gap-6">
            {/* Tone Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-700">
                  Tone of Voice
                </label>
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
                    className={`
                      px-3 py-2 flex items-center gap-2 text-xs rounded-lg border transition-all duration-200
                      ${
                        tone === postTone
                          ? "border-primary/20 bg-primary/10 text-primary ring-1 ring-primary/20"
                          : "border-gray-200 hover:border-primary/20 text-gray-600 hover:bg-primary/5"
                      }
                    `}
                  >
                    {toneIcons[tone as keyof typeof toneIcons]}
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Writing Style with Clean Design */}
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
                    className={`
                      px-3 py-2 flex items-center gap-2 text-xs rounded-lg border transition-all duration-200
                      ${
                        style === writingStyle
                          ? "border-primary/20 bg-primary/10 text-primary ring-1 ring-primary/20"
                          : "border-gray-200 hover:border-primary/20 text-gray-600 hover:bg-primary/5"
                      }
                    `}
                  >
                    {styleIcons[style as keyof typeof styleIcons]}
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Generate Button */}
          <ShimmerButton
            onClick={onGenerate}
            disabled={isGeneratingContent || !isValidLength}
            className={`
              w-full py-3 text-sm font-medium rounded-lg transition-all duration-300
              ${!isValidLength ? "opacity-50 cursor-not-allowed" : ""}
              ${isGeneratingContent ? "bg-gray-100" : ""}
              text-white flex items-center justify-center gap-2
              hover:shadow-lg active:shadow-md
            `}
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
                <div className="flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  <span>
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            )}
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};
