import React, { useState } from "react";
import { Settings, FileText, Zap, Brain, Shield, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const MainSidebar = () => {
  const [slides, setSlides] = useState(5);
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div
      className={`fixed inset-y-0 z-10 flex flex-shrink-0 w-96 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg px-4 lg:z-auto lg:static lg:shadow-none`}
    >
      {/* Vertical Tab Navigation */}
      <aside className="flex flex-col items-center bg-white border-r shadow-lg w-16 py-4">
        <button
          className={`mb-4 p-2 ${
            activeTab === "settings" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={24} />
        </button>
        <button
          className={`mb-4 p-2 ${
            activeTab === "templates" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("templates")}
        >
          <FileText size={24} />
        </button>
        {/* Additional buttons for other tabs */}
        <button
          className={`mb-4 p-2 ${
            activeTab === "extra1" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("extra1")}
        >
          <Zap size={24} />
        </button>
        <button
          className={`mb-4 p-2 ${
            activeTab === "extra2" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("extra2")}
        >
          <Brain size={24} />
        </button>
        <button
          className={`mb-4 p-2 ${
            activeTab === "extra3" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("extra3")}
        >
          <Shield size={24} />
        </button>
        <button
          className={`mb-4 p-2 ${
            activeTab === "profile" ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <aside className="flex-1 bg-white overflow-hidden transition-all transform ">
        {activeTab === "settings" && (
          <form className="grid w-full items-start gap-6 p-4">
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
                  maxLength={300}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model" className="text-sm ">
                  Model
                </Label>
                <Select>
                  <SelectTrigger
                    id="model"
                    className="w-full p-2 border rounded-lg"
                  >
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
          </form>
        )}
        {activeTab === "templates" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Template Gallery</h2>
            <p>Select a template to start building your carousel.</p>
            {/* Add your template content here */}
          </div>
        )}
        {/* Additional tab content */}
        {activeTab === "extra1" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Extra Tab 1</h2>
            <p>Content for extra tab 1.</p>
          </div>
        )}
        {activeTab === "extra2" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Extra Tab 2</h2>
            <p>Content for extra tab 2.</p>
          </div>
        )}
        {activeTab === "extra3" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Extra Tab 3</h2>
            <p>Content for extra tab 3.</p>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <p>Profile settings.</p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MainSidebar;
