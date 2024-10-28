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

const ContentCreationTools: React.FC = () => {
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
    <div className="container max-w-5xl mx-auto px-4 py-8 relative min-h-[80vh]">
      {/* Enhanced background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-[140px] opacity-[0.08]">
          <div className="aspect-square h-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 blur-[140px] opacity-[0.08]">
          <div className="aspect-square h-[400px] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full" />
        </div>
      </div>

      {/* Enhanced Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-3"
      >
        <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 tracking-wider uppercase bg-gray-50/50 px-3 py-1 rounded-full mx-auto">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          AI Writing Assistant
        </span>
        <h1 className="text-4xl font-semibold text-gray-950 tracking-tight lg:text-5xl">
          What would you like to write about?
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
          Transform your ideas into professional LinkedIn posts with AI-powered
          assistance
        </p>
      </motion.div>

      <Card className="shadow-lg border border-gray-200/80 bg-white/95 backdrop-blur-xl">
        <CardHeader className="relative pb-0">
          <div className="space-y-6">
            {" "}
            {/* Increased spacing */}
            {/* Header with Post Type and Dropdown */}
            <div className="flex justify-between items-start gap-6">
              {" "}
              {/* Increased gap */}
              {/* Post Type Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Post Type
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />{" "}
                  {/* Decorative line */}
                </div>
                <div className="flex gap-1.5 p-1 bg-card rounded-lg w-fit">
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
                <div className="flex items-center gap-2 px-1 justify-end">
                  <div className="h-px flex-1 bg-gray-100" />{" "}
                  {/* Decorative line */}
                  <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Content Source
                  </span>
                </div>
                <div className="p-1 bg-cardBackground rounded-lg w-fit ml-auto hover:bg-cardBackground/90 transition-colors">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg
                                bg-white text-gray-900  transition-all duration-300 outline-none w-[200px]`}
                    >
                      {React.createElement(
                        contentSources.find(
                          (source) => source.id === contentSource
                        )?.icon || FileText,
                        { className: "h-4 w-4 text-blue-500" }
                      )}
                      <span>
                        {
                          contentSources.find(
                            (source) => source.id === contentSource
                          )?.label
                        }
                      </span>
                      <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[200px] p-1 bg-white rounded-lg shadow-md border border-gray-200/80"
                      align="end"
                    >
                      {contentSources.map((source) => (
                        <DropdownMenuItem
                          key={source.id}
                          onClick={() => setContentSource(source.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer
                                     transition-all duration-300 outline-none
                                     ${
                                       contentSource === source.id
                                         ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                     }`}
                        >
                          <source.icon
                            className={`h-4 w-4 ${
                              contentSource === source.id ? "text-blue-500" : ""
                            }`}
                          />
                          {source.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            {/* Enhanced Content Input Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                  Your Content
                </span>
                <div className="h-px flex-1 bg-gray-100" />{" "}
                {/* Decorative line */}
              </div>
              <div className="rounded-xl border border-gray-200/80 bg-white p-1.5 hover:border-gray-300/50 transition-colors">
                <div className="flex items-start gap-3">
                  <textarea
                    className="flex-1 px-3.5 py-3 rounded-lg h-[64px] max-h-[64px]
                             resize-none outline-none bg-white
                             placeholder:text-gray-400 text-gray-600 text-sm
                             border-none focus:ring-1 focus:ring-blue-50/50
                             focus:border-blue-100 transition-all duration-200
                             overflow-y-auto leading-relaxed"
                    placeholder={
                      contentSource === "text"
                        ? "What would you like to write about? Be specific to get better results..."
                        : contentSource === "youtube"
                        ? "Paste your YouTube video URL here..."
                        : "Paste your blog post URL here..."
                    }
                    onChange={handleTextChange}
                    rows={2}
                  />

                  <ShimmerButton
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`group px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                      ${
                        isGenerating
                          ? "bg-gray-100"
                          : "bg-gray-900 hover:bg-gray-800"
                      }
                      text-white whitespace-nowrap h-[42px] flex items-center mt-[11px]
                      hover:shadow-md active:shadow-sm`}
                    background="linear-gradient(to right, #3369e7, #3369e7)"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span className="text-gray-400">Converting...</span>
                      </>
                    ) : (
                      <>
                        Create
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${contentSource}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreationTools;
