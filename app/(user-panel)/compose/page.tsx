"use client";
import React from "react";
import { PostPreviewFullFeature } from "@/components/content-create/PostPreviewFullFeature";
import { ComposeSection } from "@/components/content-create/ComposeSection";

const Compose = () => {
  const [content, setContent] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  return (
    <div className="mx-auto p-6 space-y-8 ">
      {/* Title and Description */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Create Content
            </h1>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-2xl">
              Write and generate engaging content for your social media platforms.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6">
        <ComposeSection 
          content={content} 
          setContent={setContent}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <PostPreviewFullFeature 
          isGenerating={isGenerating}
          generatedPost={content}
        />
      </div>
    </div>
  );
};

export default Compose;
