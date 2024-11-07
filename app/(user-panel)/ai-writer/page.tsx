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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Left Column - Enhanced Input Section */}
          <div className="max-w-[800px] w-full mx-auto lg:mx-0">
            <Card
              className="border border-gray-200 shadow-md overflow-hidden rounded-2xl relative backdrop-blur-sm
                              bg-gradient-to-r from-white to-blue-50 hover:border-blue-200/30 transition-colors"
            >
              {/* Refined Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/30" />
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />

              <CardHeader className="relative pb-0 px-8 pt-6 border-b border-gray-100/80">
                <ContentSourceSelector
                  contentSource={contentSource}
                  setContentSource={setContentSource}
                  contentSources={contentSources}
                />
              </CardHeader>

              <CardContent className="relative px-8 py-6 h-[calc(100%-7rem)] overflow-auto">
                <ContentInput
                  {...{
                    contentSource,
                    isGenerating: isGeneratingLinkedinPosts,
                    handleGenerate: handleGenerateLinkedIn,
                    handleTextChange: handleLocalTextChange,
                    setContent,
                    isGeneratingLinkedinPosts,
                    handleGenerateLinkedIn,
                    handleLinkedInTextChange,
                    content,
                    postTone,
                    setPostTone,
                    writingStyle,
                    setWritingStyle,
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Section Separator with refined gradients */}
          <div className="hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-blue-50 shadow-md 
                       flex items-center justify-center transform -translate-x-1/2 backdrop-blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 
                            flex items-center justify-center shadow-md"
              >
                <Sparkles className="w-5 h-5 text-white" />
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
                <Card
                  className="border border-gray-200 shadow-md overflow-hidden rounded-2xl relative backdrop-blur-sm
                                  bg-gradient-to-br from-white via-transparent to-white/50 hover:border-blue-200/30 transition-colors"
                >
                  {/* Refined Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/30" />
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />

                  <CardContent className="relative px-8 py-6">
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
