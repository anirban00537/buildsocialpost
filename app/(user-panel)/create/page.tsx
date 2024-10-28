"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  Layout,
  FileText,
  Loader2,
  ChevronDown,
  Youtube,
  Globe,
} from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ContentCreationTools = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("text");
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);

  const contentSources = [
    { id: "text", label: "Text to Post", icon: FileText },
    { id: "youtube", label: "YouTube to Post", icon: Youtube },
    { id: "blog", label: "Blog to Post", icon: Globe },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 relative min-h-[80vh]">
      {/* Enhanced subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-[140px] opacity-[0.08]">
          <div className="aspect-square h-[400px] bg-blue-50 rounded-full" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 blur-[140px] opacity-[0.08]">
          <div className="aspect-square h-[400px] bg-gray-100 rounded-full" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-3"
      >
        <span className="inline-block text-xs font-medium text-gray-500 tracking-wider uppercase mb-2">
          AI Writing Assistant
        </span>
        <h1 className="text-5xl font-semibold text-gray-900 tracking-tight">
          Create AI-Powered LinkedIn Posts
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Transform your ideas into professional LinkedIn posts with AI-powered
          assistance
        </p>
      </motion.div>

      <Card className="shadow-md border border-gray-100/50 bg-white/80 backdrop-blur-xl">
        <CardHeader className="relative pb-0 space-y-6">
          {/* Post Type Section */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Post Type
            </span>
            <div className="flex gap-2 p-1 bg-gray-50/50 rounded-lg w-fit">
              {["text", "carousel"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ease-in-out
                    ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  {tab === "text" ? (
                    <FileText
                      className={`h-4 w-4 ${
                        activeTab === tab ? "text-blue-500" : ""
                      }`}
                    />
                  ) : (
                    <Layout
                      className={`h-4 w-4 ${
                        activeTab === tab ? "text-blue-500" : ""
                      }`}
                    />
                  )}
                  {tab === "text" ? "Single Post" : "Carousel Post"}
                </button>
              ))}
            </div>
          </div>

          {/* Source Selection Section */}
          <div className="space-y-2">
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              Content Source
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="h-8 flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg
                                            bg-white border border-gray-200 hover:bg-gray-50
                                            text-gray-700 transition-colors outline-none"
              >
                {React.createElement(
                  contentSources.find((source) => source.id === contentSource)
                    ?.icon || FileText,
                  { className: "h-4 w-4 text-gray-500" }
                )}
                <span>
                  {
                    contentSources.find((source) => source.id === contentSource)
                      ?.label
                  }
                </span>
                <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-trigger-width)] min-w-[12rem]">
                {contentSources.map((source) => (
                  <DropdownMenuItem
                    key={source.id}
                    onClick={() => setContentSource(source.id)}
                    className={`flex items-center gap-2 cursor-pointer
                               ${
                                 contentSource === source.id
                                   ? "bg-blue-50/50 text-blue-600"
                                   : ""
                               }`}
                  >
                    <source.icon className="h-4 w-4" />
                    {source.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${contentSource}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Content Input Section */}
              <div className="space-y-2">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  Your Content
                </span>
                <div className="rounded-2xl border border-gray-200 p-1.5">
                  <div className="flex items-start gap-4">
                    <textarea
                      className="flex-1 p-5 rounded-xl
                               resize-none outline-none bg-white
                               placeholder:text-gray-400 text-gray-600 text-sm
                               border-none focus:ring-2 focus:ring-blue-50 
                               focus:border-blue-100 transition-all duration-200"
                      placeholder={
                        contentSource === "text"
                          ? "What would you like to write about? Be specific to get better results..."
                          : contentSource === "youtube"
                          ? "Paste your YouTube video URL here..."
                          : "Paste your blog post URL here..."
                      }
                      onChange={handleTextChange}
                      maxLength={500}
                    />

                    <div className="pt-4 pr-3">
                      <ShimmerButton
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className={`group px-5 py-3 text-sm font-medium rounded-xl transition-all duration-300
                          ${
                            isGenerating
                              ? "bg-gray-100 text-gray-400"
                              : "bg-gray-900 hover:bg-gray-800"
                          } text-white`}
                        background="linear-gradient(to right, #18181B, #27272A)"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span className="text-gray-400">Converting...</span>
                          </>
                        ) : (
                          <>
                            Convert
                            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </ShimmerButton>
                    </div>
                  </div>

                  {/* Character count indicator */}
                  <div className="mt-3 px-2 flex justify-end">
                    <span className="text-xs text-gray-400">
                      {characterCount}/500 characters
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreationTools;
