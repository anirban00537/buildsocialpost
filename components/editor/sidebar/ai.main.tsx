import React from "react";
import { Sun, Moon, Sparkles, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useGenerateContent } from "@/hooks/useGenerateContent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const AiSettingsComponent = () => {
  const {
    generateContent,
    topic,
    setTopic,
    setNumSlides,
    numSlides,
    setLanguage,
    language,
    setMood,
    mood,
    loading,
    theme,
    setTheme,
    contentStyle,
    setContentStyle,
    targetAudience,
    setTargetAudience,
    themeActive,
    setThemeActive,
    remainingGenerations,
  } = useGenerateContent();
  const { subscribed } = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <form onSubmit={generateContent} className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-textColor flex items-center gap-2">
              <Sparkles size={20} />
              AI Content Generator
            </h2>
            {/* Topic Input */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Label
                  htmlFor="content"
                  className="text-sm font-medium text-textColor/80"
                >
                  Topic
                </Label>
                <HelpCircle
                  data-tooltip-id="topic-tooltip"
                  data-tooltip-content="Main subject for AI content"
                  className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                />
              </div>
              <Textarea
                id="content"
                placeholder="Enter your topic..."
                className="min-h-[3rem] text-sm rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50 resize-none"
                value={topic}
                maxLength={100}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            {/* Theme Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <Label htmlFor="theme" className="text-xs text-textColor/70">
                    Theme
                  </Label>
                  <HelpCircle
                    data-tooltip-id="theme-tooltip"
                    data-tooltip-content="Color theme for slides"
                    className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                  />
                </div>
                <Switch
                  id="theme"
                  checked={themeActive}
                  onCheckedChange={() => setThemeActive(!themeActive)}
                  size="md"
                />
              </div>

              {themeActive && (
                <div
                  className={`flex gap-2 ${
                    themeActive ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <Button
                    size="sm"
                    type="button"
                    className={`flex-1 text-xs border border-borderColor/50 text-textColor p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                      theme === "light"
                        ? "bg-primary/80 text-white"
                        : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={12} className="mr-1" />
                    Light
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    className={`flex-1 text-xs border border-borderColor/50 text-textColor p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                      theme === "dark"
                        ? "bg-primary/80 text-white"
                        : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={12} className="mr-1" />
                    Dark
                  </Button>
                </div>
              )}
            </div>

            {/* Number of Slides */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="slides" className="text-xs text-textColor/70">
                  Number of Slides
                </Label>
                <HelpCircle
                  data-tooltip-id="slides-tooltip"
                  data-tooltip-content="Select slide count"
                  className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                />
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  max={10}
                  step={1}
                  value={[numSlides]}
                  onValueChange={(value) => setNumSlides(value[0])}
                  className="flex-grow"
                />
                <span className="text-xs text-textColor/80 font-medium w-6 text-center">
                  {numSlides}
                </span>
              </div>
            </div>

            {/* Other Settings in Separate Columns */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="contentStyle"
                    className="text-xs text-textColor/70"
                  >
                    Style
                  </Label>
                  <HelpCircle
                    data-tooltip-id="style-tooltip"
                    data-tooltip-content="Choose writing style"
                    className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                  />
                </div>
                <Select value={contentStyle} onValueChange={setContentStyle}>
                  <SelectTrigger className="w-full h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground/90 text-textColor border border-borderColor/50">
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="targetAudience"
                    className="text-xs text-textColor/70"
                  >
                    Audience
                  </Label>
                  <HelpCircle
                    data-tooltip-id="audience-tooltip"
                    data-tooltip-content="Select target audience"
                    className="ml-2 h-4 w-4 text-sm text-textColor/60 hover:text-textColor cursor-help"
                  />
                </div>
                <Select
                  value={targetAudience}
                  onValueChange={setTargetAudience}
                >
                  <SelectTrigger className="w-full h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50">
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground/90 text-textColor border border-borderColor/50">
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Experts">Experts</SelectItem>
                    <SelectItem value="Beginners">Beginners</SelectItem>
                    <SelectItem value="Executives">Executives</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="mood" className="text-xs text-textColor/70">
                    Mood
                  </Label>
                  <HelpCircle
                    data-tooltip-id="mood-tooltip"
                    data-tooltip-content="Set content tone"
                    className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                  />
                </div>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="w-full h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50">
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground/90 text-textColor border border-borderColor/50">
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Happy">Happy</SelectItem>
                    <SelectItem value="Curious">Curious</SelectItem>
                    <SelectItem value="Fun">Fun</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="language"
                    className="text-xs text-textColor/70"
                  >
                    Language
                  </Label>
                  <HelpCircle
                    data-tooltip-id="language-tooltip"
                    data-tooltip-content="Choose content language"
                    className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                  />
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground/90 text-textColor border border-borderColor/50">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="py-4 bg-background/80 backdrop-blur-sm border-t pb-36 border-borderColor/50">
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={loading || (!subscribed && remainingGenerations <= 0)}
              className="w-full text-sm"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : !subscribed ? (
                remainingGenerations > 0 ? (
                  <>
                    Generate Content
                    <span className="ml-2 text-xs opacity-75">
                      ({remainingGenerations} left)
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    <Image
                      src={"/premium.svg"}
                      width={16}
                      height={16}
                      alt="Premium"
                    />
                    Upgrade to Premium
                  </span>
                )
              ) : (
                "Generate Content"
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* React-Tooltip components */}
      <Tooltip id="topic-tooltip" place="left" className="w-40 text-[8px]" />
      <Tooltip id="theme-tooltip" place="left" className="w-40 text-[8px]" />
      <Tooltip id="slides-tooltip" place="left" className="w-40 text-[8px]" />
      <Tooltip id="style-tooltip" place="left" className="w-40 text-[8px]" />
      <Tooltip id="audience-tooltip" place="left" className="w-40 text-[8px]" />
      <Tooltip id="mood-tooltip" place="left" className="w-40 text-[8px]" />
      <Tooltip id="language-tooltip" place="left" className="w-40 text-[8px]" />
    </div>
  );
};

export default AiSettingsComponent;