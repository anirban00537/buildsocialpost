"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import { PostPreview } from "@/components/content-create/PostPreview";
import Link from "next/link";

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
    documentUrl,
  } = useContentPosting();

  const handleProfileSelect = useCallback(
    (profile: LinkedInProfileUI) => {
      console.log("Selecting profile:", profile);
      setSelectedProfile(profile);
    },
    [setSelectedProfile]
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-[1600px] mx-auto px-6 py-10">
        {/* Enhanced Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  {isEditing ? "Edit Content" : "Create Content"}
                </h1>
                <div className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100">
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
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Profile</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className={`
                      h-10 px-4 gap-2.5 transition-all duration-200 shadow-sm
                      ${
                        !selectedProfile
                          ? "text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"
                          : "border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                      }
                    `}
                  >
                    {selectedProfile ? (
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <Image
                            src={selectedProfile.avatarUrl}
                            alt={selectedProfile.name}
                            width={24}
                            height={24}
                            className="rounded-full ring-2 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                        </div>
                        <span className="text-sm font-medium truncate max-w-[150px]">
                          {selectedProfile.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2.5">
                        <Linkedin className="h-4 w-4 text-current" />
                        <span className="text-sm font-medium">
                          Select Profile
                        </span>
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[280px] p-2">
                  <div className="px-3 py-2 mb-1 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900">
                      LinkedIn Profiles
                    </h4>
                  </div>
                  {linkedinProfiles.length > 0 ? (
                    linkedinProfiles.map((profile) => (
                      <DropdownMenuItem
                        key={profile.id}
                        onClick={() => handleProfileSelect(profile)}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
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
                            width={32}
                            height={32}
                            className="rounded-full ring-2 ring-white"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                        </div>
                        <span className="text-sm font-medium">
                          {profile.name}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                        <Linkedin className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        No Profiles Connected
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-4 text-sm border-blue-200 text-blue-600 hover:bg-blue-50"
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
        {!selectedProfile ? (
          // No LinkedIn Profile Error State
          <div className="rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-red-100 p-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/linkedin-logo.webp"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="h-8 w-8 text-red-500"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                LinkedIn Profile Required
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Please connect your LinkedIn profile to start creating and
                managing content. This allows us to post directly to your
                LinkedIn account.
              </p>

              <div className="flex flex-col items-center gap-4">
                <Link href="/accounts">
                  <Button
                    variant="default"
                    size="lg"
                    className="h-11 px-6 gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                  >
                    <Image
                      src="/linkedin-logo.webp"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="h-5 w-5"
                    />
                    Connect LinkedIn Profile
                  </Button>
                </Link>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>
                    Your data is secure and we never post without your
                    permission
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Existing Content Grid
          <div className="grid grid-cols-2 gap-8">
            {isLoadingDraft ? (
              <div className="col-span-2 h-[600px] rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center animate-pulse">
                    <FileText className="w-8 h-8 text-blue-600 opacity-50" />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-base font-medium text-gray-900">
                      Loading Draft
                    </p>
                    <p className="text-sm text-gray-500">
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
                <PostPreview
                  title="Content Preview"
                  content={content}
                  isGenerating={isGenerating}
                  hideViewModeSelector={false}
                  selectedProfile={selectedProfile}
                  imageUrls={imageUrls}
                  documentUrl={documentUrl}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComposePage;
