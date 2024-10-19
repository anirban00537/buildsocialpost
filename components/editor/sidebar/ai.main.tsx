import React from "react";
import { Sun, Moon, Sparkles, HelpCircle, ChevronDown } from "lucide-react";
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
  } = useGenerateContent();
  const { subscribed } = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-6 border-b border-borderColor/20">
        <h2 className="text-xl font-semibold text-textColor flex items-center gap-2">
          <Sparkles size={24} className="text-primary" />
          AI Content Generator
        </h2>
      </div>
      <form onSubmit={generateContent} className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          {/* Topic Input */}
          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-sm font-medium text-textColor/80 flex items-center"
            >
              Topic
              <HelpCircle
                data-tooltip-id="topic-tooltip"
                data-tooltip-content="Main subject for AI content"
                className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
              />
            </Label>
            <Textarea
              id="content"
              placeholder="Enter your topic..."
              className="min-h-[6rem] text-sm rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50 resize-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
              value={topic}
              maxLength={100}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Theme Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="theme"
                className="text-sm font-medium text-textColor/80 flex items-center"
              >
                Theme
                <HelpCircle
                  data-tooltip-id="theme-tooltip"
                  data-tooltip-content="Color theme for slides"
                  className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                />
              </Label>
              <Switch
                id="theme"
                checked={themeActive}
                onCheckedChange={() => setThemeActive(!themeActive)}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {themeActive && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  type="button"
                  variant={theme === "light" ? "default" : "outline"}
                  className="flex-1 text-xs"
                  onClick={() => setTheme("light")}
                >
                  <Sun size={14} className="mr-2" />
                  Light
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant={theme === "dark" ? "default" : "outline"}
                  className="flex-1 text-xs"
                  onClick={() => setTheme("dark")}
                >
                  <Moon size={14} className="mr-2" />
                  Dark
                </Button>
              </div>
            )}
          </div>

          {/* Number of Slides */}
          <div className="space-y-4">
            <Label
              htmlFor="slides"
              className="text-sm font-medium text-textColor/80 flex items-center"
            >
              Number of Slides
              <HelpCircle
                data-tooltip-id="slides-tooltip"
                data-tooltip-content="Select slide count"
                className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
              />
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                max={10}
                step={1}
                value={[numSlides]}
                onValueChange={(value) => setNumSlides(value[0])}
                className="flex-grow"
              />
              <span className="text-sm text-textColor font-medium w-8 text-center bg-cardBackground/50 rounded-md py-1">
                {numSlides}
              </span>
            </div>
          </div>

          {/* Other Settings */}
          <div className="space-y-6">
            {[
              {
                label: "Style",
                value: contentStyle,
                onChange: setContentStyle,
                options: ["Professional", "Casual", "Academic", "Storytelling"],
                tooltip: "Choose writing style",
              },
              {
                label: "Audience",
                value: targetAudience,
                onChange: setTargetAudience,
                options: ["General", "Experts", "Beginners", "Executives"],
                tooltip: "Select target audience",
              },
              {
                label: "Mood",
                value: mood,
                onChange: setMood,
                options: [
                  "Narrative",
                  "Creative",
                  "Happy",
                  "Curious",
                  "Fun",
                  "Neutral",
                ],
                tooltip: "Set content tone",
              },
              {
                label: "Language",
                value: language,
                onChange: setLanguage,
                options: [
                  { value: "en", label: "English" },
                  { value: "es", label: "Spanish" },
                  { value: "fr", label: "French" },
                  { value: "de", label: "German" },
                  { value: "zh", label: "Chinese" },
                ],
                tooltip: "Choose content language",
              },
            ].map((setting, index) => (
              <div key={index} className="space-y-2">
                <Label
                  htmlFor={setting.label.toLowerCase()}
                  className="text-sm font-medium text-textColor/80 flex items-center"
                >
                  {setting.label}
                  <HelpCircle
                    data-tooltip-id={`${setting.label.toLowerCase()}-tooltip`}
                    data-tooltip-content={setting.tooltip}
                    className="ml-2 h-4 w-4 text-textColor/60 hover:text-textColor cursor-help"
                  />
                </Label>
                <Select value={setting.value} onValueChange={setting.onChange}>
                  <SelectTrigger className="w-full h-10 text-sm rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50 focus:ring-2 focus:ring-primary/50 transition-all duration-300">
                    <SelectValue placeholder={setting.label} />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg">
                    {setting.options.map((option) => (
                      <SelectItem
                        key={typeof option === "string" ? option : option.value}
                        value={
                          typeof option === "string" ? option : option.value
                        }
                        className="text-sm py-2 hover:bg-primary/10 transition-colors duration-150"
                      >
                        {typeof option === "string" ? option : option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 mb-32 bg-background/80 backdrop-blur-sm border-t border-borderColor/50 mt-auto">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading || !subscribed}
            className="w-full text-sm font-semibold"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3"
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
                Generating Content...
              </>
            ) : !subscribed ? (
              <span className="flex items-center justify-center gap-2">
                <Image
                  src={"/premium.svg"}
                  width={20}
                  height={20}
                  alt="Premium"
                />
                Upgrade to Premium
              </span>
            ) : (
              "Generate Content"
            )}
          </Button>
        </div>
      </form>

      {/* React-Tooltip components */}
      <Tooltip
        id="topic-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
      <Tooltip
        id="theme-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
      <Tooltip
        id="slides-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
      <Tooltip
        id="style-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
      <Tooltip
        id="audience-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
      <Tooltip
        id="mood-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
      <Tooltip
        id="language-tooltip"
        place="left"
        className="z-50 text-xs bg-background/95 backdrop-blur-sm text-textColor border border-borderColor/50 rounded-md shadow-lg p-2"
      />
    </div>
  );
};

export default AiSettingsComponent;
