"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Send, Clock, Sparkles, HelpCircle } from "lucide-react";
import { ScheduleModal } from "./ScheduleModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkedInProfile, Post } from "@/types/post";
import { LinkedInProfileUI } from "@/types/post";
import dynamic from "next/dynamic";
import data from "@emoji-mart/data";
import {
  Image as ImageIcon,
  Smile,
  Link2,
  FileText,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ImageUploadModal from "../editor/Image_upload_modal/Image-Upload-Modal.comp";
import { X } from "lucide-react";

interface ComposeSectionProps {
  content: string;
  setContent: (content: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (isOpen: boolean) => void;
  scheduledDate: Date | null;
  onSchedule: (date: Date) => void;
  isEditing?: boolean;
  postDetails?: Post | null;
  onPostNow: (linkedinProfileId: number) => void;
  isPosting: boolean;
  selectedLinkedInProfile: LinkedInProfileUI | null;
  onProfileSelect: (profile: LinkedInProfileUI) => void;
  isAutoSaving?: boolean;
  imageUrls: string[];
  onImageUrlsChange: (urls: string[]) => void;
}

const CHAR_LIMIT = 3000;

// Dynamic import of EmojiPicker to avoid SSR issues
const Picker = dynamic(() => import("@emoji-mart/react"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-[320px] bg-white animate-pulse rounded-lg" />
  ),
});

export const ComposeSection = ({
  content,
  setContent,
  isGenerating,
  setIsGenerating,
  isScheduleModalOpen,
  setIsScheduleModalOpen,
  scheduledDate,
  onSchedule,
  isEditing,
  postDetails,
  onPostNow,
  isPosting,
  selectedLinkedInProfile,
  onProfileSelect,
  isAutoSaving,
  imageUrls,
  onImageUrlsChange,
}: ComposeSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const characterCount = content.length;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  // Local keyboard handler for other shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Post Now: Cmd/Ctrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (
        !isPosting &&
        content.trim().length > 0 &&
        characterCount <= CHAR_LIMIT &&
        selectedLinkedInProfile?.id
      ) {
        onPostNow(selectedLinkedInProfile.id);
      }
    }
  };

  const onEmojiSelect = (emoji: any) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const updatedContent =
      content.slice(0, cursorPosition) +
      emoji.native +
      content.slice(cursorPosition);
    setContent(updatedContent);
    setShowEmojiPicker(false);
  };

  const handleImageSelect = (url: string) => {
    onImageUrlsChange([...imageUrls, url]);
    setIsImageModalOpen(false);
  };

  return (
    <div className="flex flex-col  bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
      {/* Editor Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-gray-800">
              Create Post
            </h2>
            <div
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                isAutoSaving
                  ? "bg-blue-50 text-blue-600"
                  : "bg-green-50 text-green-600"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isAutoSaving ? "bg-blue-500 animate-pulse" : "bg-green-500"
                )}
              />
              {isAutoSaving ? "Saving..." : "Saved"}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div className="px-5 py-2.5 border-b border-gray-100 flex items-center gap-2">
        <div className="flex items-center gap-1 p-1 bg-gray-50/80 rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-white rounded-md transition-all"
                onClick={() => setIsImageModalOpen(true)}
              >
                <ImageIcon className="w-4 h-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Image</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-white rounded-md transition-all"
              >
                <Video className="w-4 h-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Video</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-white rounded-md transition-all"
              >
                <FileText className="w-4 h-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Document</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1 p-1 bg-gray-50/80 rounded-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-white rounded-md transition-all"
              >
                <Link2 className="w-4 h-4 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Link</TooltipContent>
          </Tooltip>

          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white rounded-md transition-all"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-4 h-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Emoji</TooltipContent>
            </Tooltip>

            {showEmojiPicker && (
              <div className="absolute top-full mt-1 left-0 z-50">
                <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-100">
                  <Picker
                    data={data}
                    onEmojiSelect={onEmojiSelect}
                    theme="light"
                    previewPosition="none"
                    skinTonePosition="none"
                    searchPosition="none"
                    perLine={8}
                    maxFrequentRows={1}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 gap-1.5 ml-auto text-blue-600 hover:bg-blue-50/80 hover:text-blue-700"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">AI Assist</span>
        </Button>
      </div>

      {/* Editor Content */}
      <div className="flex-grow relative bg-gradient-to-b from-white to-gray-50/20">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What would you like to share?"
          className="w-full h-full px-5 py-4 resize-none focus:outline-none
                   text-gray-700 placeholder-gray-400/80 bg-transparent
                   text-base leading-relaxed"
          style={{ minHeight: "200px" }}
        />

        {/* Character Counter */}
        <div className="absolute bottom-4 right-5">
          <div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              characterCount > CHAR_LIMIT
                ? "bg-red-50 text-red-600"
                : characterCount > CHAR_LIMIT * 0.9
                ? "bg-amber-50 text-amber-600"
                : "bg-gray-50/80 text-gray-500"
            )}
          >
            {characterCount}/{CHAR_LIMIT}
          </div>
        </div>
      </div>

      {/* Image Preview Section - Moved here */}
      {imageUrls.length > 0 && (
        <div className="px-5 py-4 border-t border-gray-100 bg-white">
          <div className="flex flex-wrap gap-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    const newUrls = imageUrls.filter((_, i) => i !== index);
                    onImageUrlsChange(newUrls);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Footer */}
      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 gap-2 bg-white hover:bg-primary/10 transition-all hover:text-primary"
            onClick={() => setIsScheduleModalOpen(true)}
            disabled={!selectedLinkedInProfile || !content.trim()}
          >
            <Clock className="w-4 h-4" />
            Schedule
          </Button>

          <Button
            variant="default"
            size="sm"
            className={cn(
              "h-9 px-4 gap-2",
              (!selectedLinkedInProfile ||
                characterCount > CHAR_LIMIT ||
                !content.trim() ||
                isPosting) &&
                "opacity-50"
            )}
            disabled={
              !selectedLinkedInProfile ||
              characterCount > CHAR_LIMIT ||
              !content.trim() ||
              isPosting
            }
            onClick={() =>
              selectedLinkedInProfile?.id &&
              onPostNow(selectedLinkedInProfile.id)
            }
          >
            {isPosting ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Publish Now
              </>
            )}
          </Button>
        </div>
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
        isScheduling={isPosting}
      />

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};
