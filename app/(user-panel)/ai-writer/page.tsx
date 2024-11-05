"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { AIWritingPreview } from "@/components/content-create/AIWritingPreview";
import { ContentSourceSelector } from "../../../components/content-create/ContentSourceSelector";
import { contentSources } from "@/lib/data";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";
import { Sparkles, Linkedin } from "lucide-react";

const ContentCreationTools: React.FC = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [contentSource, setContentSource] = useState("plain-prompt");

  const {
    content,
    setContent,
    generatedPost,
    isGeneratingLinkedinPosts,
    handleGenerateLinkedIn,
    handleLinkedInTextChange,
    postTone,
    setPostTone,
    writingStyle,
    setWritingStyle,
  } = useGenerateLinkedInPosts();

  const handleLocalTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
    handleLinkedInTextChange(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                AI Writer
              </h1>
              <p className="text-sm text-gray-600">
                Transform your ideas into engaging LinkedIn content
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Left Column - Enhanced Input Section */}
          <div className="max-w-[800px] w-full mx-auto lg:mx-0">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
              <CardHeader className="pb-0 px-8 pt-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Create Content
                    </h2>
                    <p className="text-sm text-gray-500">
                      Generate engaging posts with AI assistance
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {characterCount > 0 && (
                      <span
                        className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${
                          characterCount > 1000
                            ? "bg-red-50 text-red-600"
                            : "bg-gray-50 text-gray-600"
                        }
                      `}
                      >
                        {characterCount}/1000
                      </span>
                    )}
                  </div>
                </div>

                <ContentSourceSelector
                  contentSource={contentSource}
                  setContentSource={setContentSource}
                  contentSources={contentSources}
                />
              </CardHeader>

              <CardContent className="px-8 py-6 relative h-[calc(100%-7rem)] overflow-auto">
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
                  postTone={postTone}
                  setPostTone={setPostTone}
                  writingStyle={writingStyle}
                  setWritingStyle={setWritingStyle}
                />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Section Separator */}
          <div className="hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transform -translate-x-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Enhanced Preview Section */}
          <div className="max-w-[800px] w-full mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                  <CardHeader className="px-8 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      {isGeneratingLinkedinPosts && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm font-medium text-blue-700">
                            Generating...
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 py-6">
                    <AIWritingPreview
                      isGenerating={isGeneratingLinkedinPosts}
                      generatedPost={generatedPost}
                      title="AI Generated LinkedIn Post"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCreationTools;
