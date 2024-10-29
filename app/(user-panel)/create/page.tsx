"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { BackgroundEffect } from "../../../components/content-create/BackgroundEffect";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { MultiPostPreview } from "../../../components/content-create/MultiPostPreview";
import { ContentSourceSelector } from "../../../components/content-create/ContentSourceSelector";
import { contentSources } from "@/lib/data";

const ContentCreationTools: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [contentSource, setContentSource] = useState("plain-prompt");

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "Enter") handleGenerate();
        if (e.key === "s") e.preventDefault(); // Prevent save
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
    setContent(e.target.value);
  };

  return (
    <div className="container max-w-[1200px] mx-auto px-6 relative min-h-screen">
      <BackgroundEffect />
      <Header />

      <div className="space-y-6">
        <Card className="border-none bg-white/95 backdrop-blur-xl">
          <CardHeader className="pb-0 px-6 pt-6">
            <div className="">
              <ContentSourceSelector
                contentSource={contentSource}
                setContentSource={setContentSource}
                contentSources={contentSources}
              />
            </div>
          </CardHeader>

          <CardContent className="px-6 py-6">
            <ContentInput
              contentSource={contentSource}
              isGenerating={isGenerating}
              handleGenerate={handleGenerate}
              handleTextChange={handleTextChange}
            />
            {/* Add visual feedback for content length */}
            <div className="text-xs mr-5 mt-3 text-gray-500 absolute right-2 bottom-2">
              {characterCount > 0 && (
                <span
                  className={`${characterCount > 1000 ? "text-red-500" : ""}`}
                >
                  {characterCount}/1000
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-none bg-white/95 backdrop-blur-xl">
              <CardHeader className="pb-0 px-6 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Preview
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      See how your post will look
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    Single Post
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pt-6">
                {!content ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-sm">
                      Your content preview will appear here
                    </p>
                    <p className="text-xs mt-1">
                      Start by creating your content above
                    </p>
                  </div>
                ) : (
                  <MultiPostPreview
                    content={content}
                    isGenerating={isGenerating}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"
            >
              Content generated successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-gray-500 hover:text-gray-900"
          >
            {showAdvanced ? "Hide" : "Show"} advanced options
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {/* Advanced options */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContentCreationTools;
