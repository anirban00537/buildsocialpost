"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { BackgroundEffect } from "../../../components/content-create/BackgroundEffect";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { MultiPostPreview } from "../../../components/content-create/MultiPostPreview";
import { ContentSourceSelector } from "../../../components/content-create/ContentSourceSelector";
import { contentSources } from "@/lib/data";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";

const ContentCreationTools: React.FC = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [contentSource, setContentSource] = useState("plain-prompt");

  const {
    content,
    setContent,
    generatedPosts,
    isGeneratingLinkedinPosts,

    handleGenerateLinkedIn,
    handleLinkedInTextChange,
  } = useGenerateLinkedInPosts();

  const handleLocalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
    handleLinkedInTextChange(e);
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
              isGenerating={isGeneratingLinkedinPosts}
              handleGenerate={handleGenerateLinkedIn}
              handleTextChange={handleLocalTextChange}
              setContent={setContent}
              isGeneratingLinkedinPosts={isGeneratingLinkedinPosts}
              handleGenerateLinkedIn={handleGenerateLinkedIn}
              handleLinkedInTextChange={handleLinkedInTextChange}
              content={content}
            />
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
                {!generatedPosts || generatedPosts.length === 0 ? (
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
                    isGenerating={isGeneratingLinkedinPosts}
                    generatedPosts={generatedPosts}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
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
