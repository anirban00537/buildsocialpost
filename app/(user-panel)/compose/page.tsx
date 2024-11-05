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
    isLoadingDraft,
    handleCreateUpdateDraft,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    scheduledDate,
    handleSchedule,
    postDetails,
    isEditing,
    handlePostNow,
    isPosting,
  } = useContentPosting();

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      {/* Title and Description */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              {isEditing ? "Edit Content" : "Create Content"}
            </h1>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-2xl">
              {isEditing
                ? "Edit your draft content and prepare it for publishing."
                : "Write and generate engaging content for your social media platforms."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        {isLoadingDraft ? (
          <div className="col-span-2 flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <span className="loading loading-spinner loading-lg" />
              <p className="text-gray-600">Loading draft content...</p>
            </div>
          </div>
        ) : (
          <>
            <ComposeSection
              content={content}
              setContent={setContent}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              isCreatingDraft={isCreatingDraft}
              onSaveDraft={handleCreateUpdateDraft}
              isScheduleModalOpen={isScheduleModalOpen}
              setIsScheduleModalOpen={setIsScheduleModalOpen}
              scheduledDate={scheduledDate}
              onSchedule={handleSchedule}
              isEditing={isEditing}
              postDetails={postDetails}
              onPostNow={handlePostNow}
              isPosting={isPosting}
            />
            <PostPreviewFullFeature
              isGenerating={isGenerating}
              generatedPost={content}
              showActions={false}
              title="Content Preview"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Compose;
