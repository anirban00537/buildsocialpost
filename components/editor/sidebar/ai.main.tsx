import React from "react";
import { Sun, Moon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

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
    industry,
    setIndustry,
    targetAudience,
    setTargetAudience,
    contentStructure,
    setContentStructure,
    keyPoints,
    setKeyPoints,
    contentPurpose,
    setContentPurpose,
  } = useGenerateContent();
  const { subscribed } = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <form className="flex flex-col h-full" onSubmit={generateContent}>
        <legend className="text-lg font-semibold text-textColor mb-4">
          AI Settings
        </legend>
        <div className="flex-grow overflow-y-auto pr-2 mb-4">
          <fieldset className="grid gap-4 rounded-lg border border-borderColor p-4 bg-background">
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-textColor">
                Topic
              </Label>
              <Textarea
                id="content"
                placeholder="Enter your topic..."
                className="min-h-[3.5rem] rounded-lg border border-borderColor text-textColor bg-cardBackground"
                value={topic}
                maxLength={300}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="slides" className="text-textColor">
                Number of Slides
              </Label>
              <div className="flex items-center gap-2">
                <Slider
                  max={10}
                  step={1}
                  value={[numSlides]}
                  onValueChange={(value) => setNumSlides(value[0])}
                  className="flex-grow "
                />
                <span className="text-sm text-textColor font-medium">
                  {numSlides}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contentStyle" className="text-textColor">
                  Style
                </Label>
                <Select value={contentStyle} onValueChange={setContentStyle}>
                  <SelectTrigger className="w-full h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground text-textColor border border-borderColor">
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Storytelling">Storytelling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="industry" className="text-textColor">
                  Industry
                </Label>
                <Input
                  id="industry"
                  placeholder="Industry"
                  className="h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="targetAudience" className="text-textColor">
                  Audience
                </Label>
                <Select
                  value={targetAudience}
                  onValueChange={setTargetAudience}
                >
                  <SelectTrigger className="w-full h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground">
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground text-textColor border border-borderColor">
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Experts">Experts</SelectItem>
                    <SelectItem value="Beginners">Beginners</SelectItem>
                    <SelectItem value="Executives">Executives</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contentStructure" className="text-textColor">
                  Structure
                </Label>
                <Select
                  value={contentStructure}
                  onValueChange={setContentStructure}
                >
                  <SelectTrigger className="w-full h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground">
                    <SelectValue placeholder="Structure" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground text-textColor border border-borderColor">
                    <SelectItem value="Problem-Solution">
                      Problem-Solution
                    </SelectItem>
                    <SelectItem value="How-To">How-To</SelectItem>
                    <SelectItem value="List">List</SelectItem>
                    <SelectItem value="Comparison">Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="keyPoints" className="text-textColor">
                Key Points
              </Label>
              <Textarea
                id="keyPoints"
                placeholder="Enter key points (comma-separated)"
                className="min-h-[3.5rem] rounded-lg border border-borderColor text-textColor bg-cardBackground"
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contentPurpose" className="text-textColor">
                  Purpose
                </Label>
                <Select
                  value={contentPurpose}
                  onValueChange={setContentPurpose}
                >
                  <SelectTrigger className="w-full h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground">
                    <SelectValue placeholder="Purpose" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground text-textColor border border-borderColor">
                    <SelectItem value="Educate">Educate</SelectItem>
                    <SelectItem value="Entertain">Entertain</SelectItem>
                    <SelectItem value="Persuade">Persuade</SelectItem>
                    <SelectItem value="Inform">Inform</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mood" className="text-textColor">
                  Mood
                </Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="w-full h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground">
                    <SelectValue placeholder="Mood" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground text-textColor border border-borderColor">
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Happy">Happy</SelectItem>
                    <SelectItem value="Curious">Curious</SelectItem>
                    <SelectItem value="Fun">Fun</SelectItem>
                    <SelectItem value="Neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="language" className="text-textColor">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full h-8 rounded-lg border border-borderColor text-textColor bg-cardBackground">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-cardBackground text-textColor border border-borderColor">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="theme" className="text-textColor">
                  Theme
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    type="button"
                    className={`border border-borderColor text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                      theme === "light"
                        ? "bg-primary text-white"
                        : "hover:bg-primary text-textColor bg-cardBackground"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={16} className="mr-1" />
                    Light
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    className={`border border-borderColor text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                      theme === "dark"
                        ? "bg-primary text-white"
                        : "hover:bg-primary text-textColor bg-cardBackground"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={16} className="mr-1" />
                    Dark
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading || !subscribed}
              className="w-full"
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
                  Generating...
                </>
              ) : !subscribed ? (
                <span className="flex items-center gap-3">
                  <Image
                    src={"/premium.svg"}
                    width={20}
                    height={20}
                    alt="Premium"
                  />
                  Upgrade to Premium
                </span>
              ) : (
                "Generate"
              )}
            </Button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default AiSettingsComponent;
