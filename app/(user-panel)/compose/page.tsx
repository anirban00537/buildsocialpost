"use client";
import React, { useState, useEffect, useCallback } from "react";
import { PostPreviewFullFeature } from "@/components/content-create/PostPreviewFullFeature";
import { ComposeSection } from "@/components/content-create/ComposeSection";
import { useContentPosting } from "@/hooks/useContent";
import { LinkedInProfileUI } from "@/types/post";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Linkedin, FileText } from "lucide-react";
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
    isAutoSaving,
    imageUrls,
    handleImageUrlsChange,
  } = useContentPosting();

  const handleProfileSelect = useCallback(
    (profile: LinkedInProfileUI) => {
      console.log("Selecting profile:", profile);
      setSelectedProfile(profile);
    },
    [setSelectedProfile]
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {isEditing ? "Edit Content" : "Create Content"}
                </h1>
                <div className="px-2 py-1 rounded-full bg-blue-50 border border-blue-100">
                  <span className="text-xs font-medium text-blue-600">
                    {isEditing ? "Draft" : "New Post"}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                {isEditing
                  ? "Refine your draft and prepare it for your LinkedIn audience."
                  : "Create engaging LinkedIn content with AI-powered assistance."}
              </p>
            </div>

            {/* Enhanced Profile Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                Profile:
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`
                      h-9 px-3 gap-2 transition-all duration-200
                      ${
                        !selectedProfile
                          ? "text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                          : "border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                      }
                    `}
                  >
                    {selectedProfile ? (
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Image
                            src={selectedProfile.avatarUrl}
                            alt={selectedProfile.name}
                            width={20}
                            height={20}
                            className="rounded-full ring-1 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white" />
                        </div>
                        <span className="text-sm font-medium truncate max-w-[120px]">
                          {selectedProfile.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-current" />
                        <span className="text-sm font-medium">
                          Select Profile
                        </span>
                      </div>
                    )}
                    <ChevronDown className="h-3.5 w-3.5 opacity-50 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px] p-2">
                  <div className="px-2 py-1.5 mb-1">
                    <h4 className="text-xs font-medium text-gray-900">
                      LinkedIn Profiles
                    </h4>
                  </div>
                  {linkedinProfiles.length > 0 ? (
                    linkedinProfiles.map((profile) => (
                      <DropdownMenuItem
                        key={profile.id}
                        onClick={() => handleProfileSelect(profile)}
                        className={`
                          flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer
                          ${
                            selectedProfile?.id === profile.id
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-gray-50"
                          }
                        `}
                      >
                        <div className="relative">
                          <Image
                            src={profile.avatarUrl}
                            alt={profile.name}
                            width={24}
                            height={24}
                            className="rounded-full ring-1 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-1 ring-white" />
                        </div>
                        <span className="text-sm font-medium">
                          {profile.name}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="text-xs font-medium text-gray-900 mb-1">
                        No Profiles Connected
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 h-8 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          /* Add your LinkedIn connect logic */
                        }}
                      >
                        Connect LinkedIn
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content Area with Enhanced Loading State */}
        <div className="grid grid-cols-2 gap-8">
          {isLoadingDraft ? (
            <div className="col-span-2 h-[600px] rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center animate-pulse">
                  <FileText className="w-8 h-8 text-blue-600 opacity-50" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    Loading Draft
                  </p>
                  <p className="text-xs text-gray-500">
                    Please wait while we fetch your content
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ComposeSection
                content={content}
                setContent={setContent}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
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
                isAutoSaving={isAutoSaving}
                imageUrls={imageUrls}
                onImageUrlsChange={handleImageUrlsChange}
              />
              <PostPreviewFullFeature
                isGenerating={isGenerating}
                generatedPost={content}
                showActions={false}
                title="Content Preview"
                selectedProfile={selectedProfile}
                imageUrls={imageUrls}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComposePage;
