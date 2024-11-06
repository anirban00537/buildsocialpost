"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Send,
  Clock,
  Save,
  Sparkles,
  HelpCircle,
  FileText,
  ArrowRight,
} from "lucide-react";
import { ScheduleModal } from "./ScheduleModal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkedInProfile, Post } from "@/types/post";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Linkedin } from "lucide-react";
import Image from "next/image";
import { LinkedInProfileUI } from "@/types/post";

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
}

const CHAR_LIMIT = 3000;

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
}: ComposeSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const characterCount = content.length;
  const { toast } = useToast();
  const { linkedinProfiles } = useSelector<
    RootState,
    { linkedinProfiles: LinkedInProfileUI[] }
  >((state) => ({
    linkedinProfiles: state.user.linkedinProfiles,
  }));

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

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)] bg-white shadow-md border border-gray-200/80 rounded-2xl backdrop-blur-sm overflow-hidden">
      {/* Enhanced Editor Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {/* Status & Character Count */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    Content Editor
                  </span>
                  {isAutoSaving ? (
                    <span className="text-xs text-blue-600 flex items-center gap-1">
                      <span className="w-2 h-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Auto-saving...
                    </span>
                  ) : (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      All changes saved
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`text-xs ${
                      characterCount > CHAR_LIMIT
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {characterCount}/{CHAR_LIMIT} characters
                  </div>
                  {characterCount > CHAR_LIMIT * 0.9 && (
                    <span className="text-xs text-amber-600">
                      {CHAR_LIMIT - characterCount} characters remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant Quick Access */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={() => {
              /* Toggle AI Assistant */
            }}
          >
            <Sparkles className="w-4 h-4" />
            AI Assist
            <kbd className="ml-2 text-[10px] px-1.5 py-0.5 bg-blue-50 rounded">
              ⌘/
            </kbd>
          </Button>
        </div>
      </div>

      {/* Enhanced Editor Content */}
      <div className="flex-grow overflow-y-auto bg-gradient-to-b from-white to-blue-50/5 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start writing or use AI commands (⌘ + /) to enhance your content..."
          className="w-full h-full min-h-[calc(100vh-400px)] px-6 py-4 resize-none focus:outline-none
                   text-gray-700 placeholder-gray-400/80 bg-transparent text-base leading-relaxed"
          style={{
            lineHeight: "1.8",
            fontFamily: "inherit",
          }}
        />

        {/* Character limit warning */}
        {characterCount > CHAR_LIMIT * 0.9 && (
          <div
            className={`
            absolute bottom-4 right-4 px-3 py-2 rounded-lg shadow-md
            flex items-center gap-2 text-sm
            ${
              characterCount > CHAR_LIMIT
                ? "bg-red-50 text-red-600"
                : "bg-yellow-50 text-yellow-600"
            }
          `}
          >
            <span className="font-medium">
              {characterCount > CHAR_LIMIT
                ? "Character limit exceeded"
                : "Approaching character limit"}
            </span>
            <span className="text-xs opacity-75">
              {CHAR_LIMIT - characterCount} remaining
            </span>
          </div>
        )}
      </div>

      {/* Enhanced Action Footer */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex flex-col gap-4">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-10 gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors duration-200"
                  onClick={() => setIsScheduleModalOpen(true)}
                  disabled={!selectedLinkedInProfile || !content.trim()}
                >
                  <Clock className="w-4 h-4" />
                  Schedule Post
                  <kbd className="ml-2 text-[10px] px-1.5 py-0.5 bg-blue-50 rounded">⌘S</kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Schedule your post for later</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className={`
                    flex-1 h-10 gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200
                    ${!selectedLinkedInProfile || characterCount > CHAR_LIMIT || !content.trim() || isPosting
                      ? "opacity-50 cursor-not-allowed"
                      : "shadow-sm hover:shadow-md"
                    }
                  `}
                  disabled={!selectedLinkedInProfile || characterCount > CHAR_LIMIT || !content.trim() || isPosting}
                  onClick={() => selectedLinkedInProfile?.id && onPostNow(selectedLinkedInProfile.id)}
                >
                  {isPosting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Now</span>
                      <kbd className="ml-2 text-[10px] px-1.5 py-0.5 bg-white/20 rounded">⌘↵</kbd>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Publish your post immediately</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Enhanced Keyboard Shortcuts & Help */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {/* Left: Quick Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 hover:shadow-sm hover:text-blue-700 rounded-md">
                <kbd className="text-[10px] font-medium text-gray-500">⌘/</kbd>
                <span className="text-xs text-gray-600 hover:text-blue-700 transition-colors duration-200">AI Assistant</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md">
                <kbd className="text-[10px] font-medium text-gray-500">⌘↵</kbd>
                <span className="text-xs text-gray-600">Quick Publish</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md">
                <kbd className="text-[10px] font-medium text-gray-500">Tab</kbd>
                <span className="text-xs text-gray-600">Navigate</span>
              </div>
            </div>

            {/* Right: Help Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  <span className="text-xs">View All Shortcuts</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">See all available keyboard shortcuts</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSchedule={onSchedule}
        />
      </div>
    </Card>
  );
};
