"use client";
import React from "react";
import { PostPreviewFullFeature } from "@/components/content-create/PostPreviewFullFeature";
import { ComposeSection } from "@/components/content-create/ComposeSection";
import { useContentPosting } from "@/hooks/useContent";

const Compose = () => {
  const {
    content,
    setContent,
    isGenerating,
    setIsGenerating,
    isCreatingDraft,
    handleCreateDraft,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    scheduledDate,
    handleSchedule,
  } = useContentPosting();

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
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
      <div className="grid grid-cols-2 gap-6 mt-8">
        <ComposeSection
          content={content}
          setContent={setContent}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          isCreatingDraft={isCreatingDraft}
          onSaveDraft={handleCreateDraft}
          isScheduleModalOpen={isScheduleModalOpen}
          setIsScheduleModalOpen={setIsScheduleModalOpen}
          scheduledDate={scheduledDate}
          onSchedule={handleSchedule}
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
