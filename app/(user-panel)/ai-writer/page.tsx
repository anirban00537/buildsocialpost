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
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <BackgroundEffect />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Left Column - Input Section */}
          <div className="h-[calc(100vh-6rem)] max-w-[800px] w-full mx-auto lg:mx-0">
            <Card className="border border-gray-200 shadow-md bg-white/95 backdrop-blur-xl rounded-xl h-full">
              <CardHeader className="pb-0 px-8 pt-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Create Content</h2>
                  <p className="text-sm text-gray-500">Generate engaging posts with AI assistance</p>
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
                <div className="text-xs mt-3 text-gray-500 flex justify-end items-center">
                  {characterCount > 0 && (
                    <span
                      className={`px-3 py-1 rounded-full ${
                        characterCount > 1000 
                          ? "bg-red-50 text-red-600" 
                          : "bg-gray-50"
                      }`}
                    >
                      {characterCount}/1000 characters
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Separator - Only visible on desktop */}
          <div className="hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center transform -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column - Preview Section */}
          <div className="h-[calc(100vh-6rem)] max-w-[800px] w-full mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="border border-gray-200 shadow-md bg-white/95 rounded-xl h-full">
                  <CardHeader className="pb-0 px-8 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Preview
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          See how your post will look
                        </p>
                      </div>
                      <div className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                        Single Post
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pt-6 pb-6 h-[calc(100%-7rem)] overflow-auto">
                    {!generatedPost || generatedPost.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center border border-dashed border-gray-200 rounded-xl p-8">
                        <div className="w-12 h-12 mb-3 rounded-full bg-blue-50 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <p className="text-base font-medium text-gray-900">
                          Your content preview will appear here
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
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
