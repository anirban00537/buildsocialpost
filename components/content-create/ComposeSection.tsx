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
  isCreatingDraft: boolean;
  onSaveDraft: (linkedinProfileId: number) => void;
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
}

const CHAR_LIMIT = 3000;

export const ComposeSection = ({
  content,
  setContent,
  isGenerating,
  setIsGenerating,
  isCreatingDraft,
  onSaveDraft,
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

  // Add validation function
  const canSaveDraft = () => {
    return content.trim().length > 0;
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  // Add useEffect for global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Save Draft: Cmd/Ctrl + Shift + S
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "s"
      ) {
        e.preventDefault(); // Prevent browser's save dialog

        // Check if we can save
        if (!canSaveDraft()) {
          toast({
            title: "Validation Error",
            description: "Please add some content first",
            variant: "destructive",
          });
          return;
        }

        // Only trigger if not already saving
        if (!isCreatingDraft && selectedLinkedInProfile?.id) {
          onSaveDraft(selectedLinkedInProfile.id);
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isCreatingDraft, onSaveDraft, content]);

  // Local keyboard handler for other shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Post Now: Cmd/Ctrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (
        !isPosting &&
        canSaveDraft() &&
        characterCount <= CHAR_LIMIT &&
        selectedLinkedInProfile?.id
      ) {
        onPostNow(selectedLinkedInProfile.id);
      }
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)] bg-white border-0 shadow-xl rounded-2xl overflow-hidden">
      {/* Enhanced Editor Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  AI Editor
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    <Sparkles className="h-3 w-3" />
                    AI Enhanced
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {characterCount}/{CHAR_LIMIT} characters
                  </span>
                </div>
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger className="group">
                <div className="p-2 rounded-full hover:bg-gray-50 transition-colors">
                  <HelpCircle className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-3 shadow-lg border border-gray-100">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    AI-Powered Editor
                  </p>
                  <p className="text-xs text-gray-600 max-w-xs">
                    Enhanced with AI writing assistance. Use commands to
                    generate and improve your content.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
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
            absolute bottom-4 right-4 px-3 py-2 rounded-lg shadow-lg
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

      {/* Enhanced Action Buttons */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`
                flex-1 h-10 gap-2 transition-all duration-200
                ${
                  isCreatingDraft || !canSaveDraft()
                    ? "opacity-50"
                    : "hover:border-blue-300 hover:bg-blue-50"
                }
              `}
              onClick={() => {
                if (canSaveDraft() && selectedLinkedInProfile?.id) {
                  onSaveDraft(selectedLinkedInProfile.id);
                }
              }}
              disabled={isCreatingDraft || !canSaveDraft()}
            >
              {isCreatingDraft ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Draft
                  <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-gray-100 rounded">
                    ⌘⇧S
                  </kbd>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-10 gap-2 hover:border-primary hover:bg-primary/10 text-primary"
              onClick={() => setIsScheduleModalOpen(true)}
            >
              <Clock className="w-4 h-4" />
              Schedule Post
            </Button>

            <Button
              variant="default"
              size="sm"
              className={`
                flex-1 h-10 gap-2 bg-blue-600 hover:bg-blue-700
                ${
                  characterCount > CHAR_LIMIT || !canSaveDraft() || isPosting
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              `}
              disabled={
                characterCount > CHAR_LIMIT || !canSaveDraft() || isPosting
              }
              onClick={() => {
                if (selectedLinkedInProfile?.id) {
                  onPostNow(selectedLinkedInProfile.id);
                }
              }}
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
                  <kbd className="ml-auto text-[10px] px-1.5 py-0.5 bg-blue-500 rounded">
                    ⌘↵
                  </kbd>
                </>
              )}
            </Button>
          </div>

          {/* Enhanced Keyboard Shortcuts */}
          <div className="flex items-center justify-between px-1 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-gray-100 rounded">
                  ⌘/
                </kbd>
                <span className="text-xs text-gray-500">AI Commands</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-gray-100 rounded">
                  Tab
                </kbd>
                <span className="text-xs text-gray-500">Navigate</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Need help?</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-blue-600"
              >
                View Shortcuts
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={onSchedule}
      />
    </Card>
  );
};
