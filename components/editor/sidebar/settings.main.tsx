import React, { useState } from "react";
import { Zap, Brain, Shield } from "lucide-react";
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

const SettingsComponent = () => {
  const { generateContent, topic, setTopic } = useGenerateContent();
  const [slides, setSlides] = useState(0.5);
  return (
    <form
      className="grid w-full items-start gap-6 p-4"
      onSubmit={generateContent}
    >
      <fieldset className="grid gap-6 rounded-lg">
        <legend className="-ml-1 px-1 text-sm font-semibold mb-4">
          Settings
        </legend>
        <div className="grid gap-3">
          <Label htmlFor="content">Topic</Label>
          <Textarea
            id="content"
            placeholder="You are a..."
            className="min-h-[3.5rem]"
            value={topic}
            maxLength={300}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model" className="text-sm ">
            Model
          </Label>
          <Select>
            <SelectTrigger id="model" className="w-full p-2 border rounded-lg">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Zap className="size-5" />
                  <div className="grid gap-0.5">
                    <p>GPT 4o</p>
                    <p className="text-xs" data-description>
                      Intelligent and faster.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="explorer">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Brain className="size-5" />
                  <div className="grid gap-0.5">
                    <p>GPT 4</p>
                    <p className="text-xs" data-description>
                      Intelligent and efficient.
                    </p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="quantum">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Shield className="size-5" />
                  <div className="grid gap-0.5">
                    <p>GPT 3.5</p>
                    <p className="text-xs" data-description>
                      Fast and accurate.
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="template" className="text-sm ">
            Template Settings
          </Label>
          <Select>
            <SelectTrigger
              id="template"
              className="w-full p-2 border rounded-lg"
            >
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Zap className="size-5" />
                  <div className="grid gap-0.5">
                    <p>Linkedin Carousel</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="instagram">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Brain className="size-5" />
                  <div className="grid gap-0.5">
                    <p>Instagram Carousel</p>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="tiktok">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Shield className="size-5" />
                  <div className="grid gap-0.5">
                    <p>Tiktok</p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="slides">Slides</Label>
          <div className="flex items-center gap-2">
            <Slider
              max={10}
              step={1}
              value={[slides]}
              onValueChange={(value) => setSlides(value[0])}
              className="flex-grow"
            />
            <span className="text-sm font-medium">{slides}</span>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="mood">Mood</Label>
            <Select>
              <SelectTrigger id="mood">
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Narrative">Narrative</SelectItem>
                <SelectItem value="Creative">Creative</SelectItem>
                <SelectItem value="Happy">Happy</SelectItem>
                <SelectItem value="Curious">Curious</SelectItem>
                <SelectItem value="Fun">Fun</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="language">Language</Label>
          <Select>
            <SelectTrigger
              id="language"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>
      <button type="submit">Generate</button>
    </form>
  );
};

export default SettingsComponent;
