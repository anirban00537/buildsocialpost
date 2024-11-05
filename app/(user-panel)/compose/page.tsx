"use client";
import React, { useState, useEffect, useCallback } from "react";
import { PostPreviewFullFeature } from "@/components/content-create/PostPreviewFullFeature";
import { ComposeSection } from "@/components/content-create/ComposeSection";
import { useContentPosting } from "@/hooks/useContent";
import { LinkedInProfileUI } from "@/types/post";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ComposePage = () => {
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
    selectedProfile,
    setSelectedProfile,
    linkedinProfiles,
  } = useContentPosting();

  const handleProfileSelect = useCallback((profile: LinkedInProfileUI) => {
    console.log('Selecting profile:', profile);
    setSelectedProfile(profile);
  }, [setSelectedProfile]);

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

          {/* LinkedIn Profile Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Post as:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-9 gap-2 ${!selectedProfile ? 'text-red-600 border-red-200 hover:border-red-300' : 'border-blue-200'}`}
                >
                  {selectedProfile ? (
                    <>
                      <Image
                        src={selectedProfile.avatarUrl}
                        alt={selectedProfile.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="text-sm">{selectedProfile.name}</span>
                    </>
                  ) : (
                    <>
                      <Linkedin className="h-4 w-4 text-current" />
                      <span>Select LinkedIn Profile</span>
                    </>
                  )}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                {linkedinProfiles.length > 0 ? (
                  linkedinProfiles.map((profile) => (
                    <DropdownMenuItem
                      key={profile.id}
                      onClick={() => handleProfileSelect(profile)}
                      className="flex items-center gap-2 cursor-pointer p-2"
                    >
                      <Image
                        src={profile.avatarUrl}
                        alt={profile.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{profile.name}</span>
                        <span className="text-xs text-gray-500">LinkedIn Profile</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-3 text-center">
                    <p className="text-sm text-gray-500">No LinkedIn profiles connected</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 text-blue-600"
                      onClick={() => {/* Add your LinkedIn connect logic */}}
                    >
                      Connect LinkedIn Account
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
              selectedLinkedInProfile={selectedProfile}
              onProfileSelect={setSelectedProfile}
            />
            <PostPreviewFullFeature
              isGenerating={isGenerating}
              generatedPost={content}
              showActions={false}
              title="Content Preview"
              selectedProfile={selectedProfile}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ComposePage;
