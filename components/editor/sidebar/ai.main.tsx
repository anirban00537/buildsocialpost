import React from "react";
import { Zap, Brain, Diamond } from "lucide-react";
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

const AiSettingsComponent = () => {
  const {
    generateContent,
    topic,
    setTopic,
    setNumSlides,
    numSlides,
    setTemperature,
    temperature,
    setLanguage,
    language,
    // setModel,
    // model,
    setMood,
    mood,
    loading,
  } = useGenerateContent();
  const { subscribed } = useSelector((state: RootState) => state.user);

  return (
    <form
      className="grid w-full items-start gap-6 p-4 rounded-lg bg-white"
      onSubmit={generateContent}
    >
      <legend className="text-lg font-semibold">AI Settings</legend>
      <fieldset className="grid gap-6 rounded-lg">
        <div className="grid gap-3">
          <Label htmlFor="content">Topic</Label>
          <Textarea
            id="content"
            placeholder="Enter your topic..."
            className="min-h-[3.5rem]"
            value={topic}
            maxLength={300}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="model" className="text-sm">
            Model
          </Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model" className="w-full p-2 border rounded-lg">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Zap className="size-5" />
                  <div className="grid gap-0.5">
                    <p>GPT-4o</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="gpt-3.5-turbo">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Brain className="size-5" />
                  <div className="grid gap-0.5">
                    <p>GPT-3.5 Turbo</p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <div className="grid gap-3">
          <Label htmlFor="slides">Slides</Label>
          <div className="flex items-center gap-2">
            <Slider
              max={10}
              step={1}
              value={[numSlides]}
              onValueChange={(value) => {
                setNumSlides(value[0]);
              }}
              className="flex-grow"
            />
            <span className="text-sm font-medium">{numSlides}</span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="mood">Mood</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger id="mood">
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent>
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

        <div className="grid gap-3">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger
              id="language"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>

      <Button
        type="submit"
        variant="default"
        size="lg"
        disabled={loading || !subscribed}
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
            <Image src={"/premium.svg"} width={20} height={20} alt="Premium" />
            Upgrade to Premium
          </span>
        ) : (
          "Generate"
        )}
      </Button>
    </form>
  );
};

export default AiSettingsComponent;
