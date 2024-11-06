import React, { useState } from "react";
import {
  Sun,
  Moon,
  Sparkles,
  FileText,
  Settings2,
  ChevronRight,
} from "lucide-react";
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
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdvancedSettingsModal = ({
  contentStyle,
  setContentStyle,
  targetAudience,
  setTargetAudience,
  mood,
  setMood,
  language,
  setLanguage,
}: {
  contentStyle: string;
  setContentStyle: (style: string) => void;
  targetAudience: string;
  setTargetAudience: (audience: string) => void;
  mood: string;
  setMood: (mood: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <motion.button
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200
          bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-200"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Settings2 className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              Advanced Settings
            </div>
            <div className="text-xs text-gray-500">
              Style, Audience, Mood & Language
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-500" />
      </motion.button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Advanced Settings</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        {[
          {
            label: "Style",
            value: contentStyle,
            onChange: setContentStyle,
            options: ["Professional", "Casual", "Academic", "Storytelling"],
          },
          {
            label: "Audience",
            value: targetAudience,
            onChange: setTargetAudience,
            options: ["General", "Experts", "Beginners", "Executives"],
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
          },
        ].map((setting, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-sm font-medium">{setting.label}</Label>
            <Select value={setting.value} onValueChange={setting.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={setting.label} />
              </SelectTrigger>
              <SelectContent>
                {setting.options.map((option) => (
                  <SelectItem
                    key={typeof option === "string" ? option : option.value}
                    value={typeof option === "string" ? option : option.value}
                  >
                    {typeof option === "string" ? option : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

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

  const { subscription } = useSelector((state: RootState) => state.user);
  const isSubscribed =
    subscription.isSubscribed && subscription.subscription?.status === "active";

  const getButtonState = () => {
    if (loading) {
      return {
        disabled: true,
        content: (
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
        ),
        className: "bg-blue-600 text-white hover:bg-blue-700",
      };
    }

    if (!isSubscribed) {
      return {
        disabled: true,
        content: (
          <span className="flex items-center justify-center gap-2">
            <Image src={"/premium.svg"} width={20} height={20} alt="Premium" />
            Upgrade to {subscription.subscription?.productName || "Premium"}
          </span>
        ),
        className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
      };
    }

    return {
      disabled: false,
      content: "Generate Content",
      className: "bg-blue-600 text-white hover:bg-blue-700",
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="space-y-6">
      {/* AI Title Section */}
      <div className="flex items-center justify-center gap-3 p-2 bg-gradient-to-r from-blue-50/80 to-blue-100/50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <h2 className="text-md font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            AI Carousel Generator
          </h2>
        </div>
      </div>

      <form onSubmit={generateContent} className="space-y-6">
        {/* Topic Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <Label
              htmlFor="content"
              className="text-sm font-medium text-gray-900"
            >
              Topic
            </Label>
          </div>
          <Textarea
            id="content"
            placeholder="What would you like to create content about?"
            className="min-h-[5rem] text-sm rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            value={topic}
            maxLength={100}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Theme Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-blue-600" />
              <Label className="text-sm font-medium text-gray-900">Theme</Label>
            </div>
            <Switch
              checked={themeActive}
              onCheckedChange={() => setThemeActive(!themeActive)}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          {themeActive && (
            <div className="flex gap-2">
              <motion.button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-200
                  ${
                    theme === "light"
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200"
                  }`}
                onClick={() => setTheme("light")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sun className="h-4 w-4" />
                <span className="text-sm font-medium">Light</span>
              </motion.button>
              <motion.button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-200
                  ${
                    theme === "dark"
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                      : "bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200"
                  }`}
                onClick={() => setTheme("dark")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Moon className="h-4 w-4" />
                <span className="text-sm font-medium">Dark</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Number of Slides */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <Label className="text-sm font-medium text-gray-900">
              Number of Slides
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Slider
              max={10}
              step={1}
              value={[numSlides]}
              onValueChange={(value) => setNumSlides(value[0])}
              className="flex-grow"
            />
            <span className="text-sm font-medium w-8 text-center bg-blue-50 text-blue-700 rounded-lg py-1 ring-1 ring-blue-200">
              {numSlides}
            </span>
          </div>
        </div>

        {/* Advanced Settings Modal */}
        <AdvancedSettingsModal
          contentStyle={contentStyle}
          setContentStyle={setContentStyle}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          mood={mood}
          setMood={setMood}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Generate Button */}
        <motion.button
          type="submit"
          disabled={buttonState.disabled}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${buttonState.className}`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {buttonState.content}
        </motion.button>
      </form>
    </div>
  );
};

export default AiSettingsComponent;
