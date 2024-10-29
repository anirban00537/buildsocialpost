"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../components/content-create/Header";
import { BackgroundEffect } from "../../../components/content-create/BackgroundEffect";
import { ContentInput } from "../../../components/content-create/ContentInput";
import { PostPreviewFullFeature } from "../../../components/content-create/PostPreviewFullFeature";
import { ContentSourceSelector } from "../../../components/content-create/ContentSourceSelector";
import { contentSources } from "@/lib/data";
import { useGenerateLinkedInPosts } from "@/hooks/useGenerateLinkedInPosts";

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
    <div className="min-h-screen">
      <Header />
      <BackgroundEffect />

      <div className=" mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            <Card className="border-none bg-white/95 backdrop-blur-xl">
              <CardHeader className="pb-0 px-6 pt-6">
                <ContentSourceSelector
                  contentSource={contentSource}
                  setContentSource={setContentSource}
                  contentSources={contentSources}
                />
              </CardHeader>

              <CardContent className="px-6 py-6 relative">
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
                <div className="text-xs mr-5 mt-3 text-gray-500 absolute right-2 bottom-2">
                  {characterCount > 0 && (
                    <span
                      className={`${
                        characterCount > 1000 ? "text-red-500" : ""
                      }`}
                    >
                      {characterCount}/1000
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Separator - Only visible on desktop */}
          <div className="hidden lg:block absolute right-1/2 top-0 bottom-0">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 border border-gray-200">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
                →
              </div>
            </div>
          </div>

          {/* Right Column - Preview Section */}
          <div className="lg:sticky lg:top-6 h-[calc(100vh-15rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card className="border-none bg-white/95 border border-gray-500 rounded-lg h-full flex flex-col">
                  <CardHeader className="pb-0 px-6 pt-6 flex-shrink-0">
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
                  <CardContent className="px-6 pt-6 flex-grow overflow-y-auto">
                    {!generatedPost || generatedPost.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p className="text-sm">
                          Your content preview will appear here
                        </p>
                        <p className="text-xs mt-1">
                          Start by creating your content above
                        </p>
                      </div>
                    ) : (
                      <PostPreviewFullFeature
                        isGenerating={isGeneratingLinkedinPosts}
                        generatedPost={generatedPost}
                      />
                    )}
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
