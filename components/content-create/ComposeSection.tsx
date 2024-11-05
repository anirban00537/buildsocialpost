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
    <Card className="flex flex-col h-[calc(100vh-200px)] bg-white/90 backdrop-blur-sm border border-gray-100/50 ring-1 ring-blue-100/50 rounded-xl overflow-hidden shadow-lg">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/50 bg-gradient-to-r from-white to-blue-50/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              AI Editor
            </span>
            <div className="flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-100/50">
              <Sparkles className="h-3 w-3" />
              AI Enhanced
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-3.5 w-3.5 text-blue-400 hover:text-blue-500 transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                Enhanced with AI-powered writing assistance
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-grow overflow-y-auto bg-gradient-to-b from-white to-blue-50/10 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start writing or use AI commands (⌘ + /) to enhance your content..."
          className="w-full h-full min-h-[calc(100vh-400px)] px-6 py-4 resize-none focus:outline-none
                     text-gray-700 placeholder-gray-400/80 bg-transparent"
          style={{
            lineHeight: "1.6",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Updated Action Buttons */}
      <div className="flex flex-col gap-3 p-4 border-t border-gray-100/50 bg-gradient-to-b from-white to-blue-50/20">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="gradient"
            size="sm"
            className={`transition-all duration-200 h-9 rounded-lg w-full
              ${isCreatingDraft || !canSaveDraft() ? "opacity-50" : ""}`}
            onClick={() => {
              if (!canSaveDraft()) {
                toast({
                  title: "Validation Error",
                  description: "Please add some content first",
                  variant: "destructive",
                });
                return;
              }
              if (selectedLinkedInProfile?.id) {
                onSaveDraft(selectedLinkedInProfile.id);
              }
            }}
            disabled={isCreatingDraft || !canSaveDraft()}
          >
            {isCreatingDraft ? (
              <>
                <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving Draft...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
                <div className="ml-2 flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  <span>
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                  </span>
                  <span>⇧</span>
                  <span>S</span>
                </div>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white
                       transition-all duration-200 h-9 rounded-lg w-full backdrop-blur-sm"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className={`transition-all duration-200 h-9 rounded-lg w-full
              ${
                characterCount > CHAR_LIMIT || !canSaveDraft() || isPosting
                  ? "opacity-50"
                  : ""
              }`}
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
                <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Post Now
                <div className="ml-2 flex items-center gap-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                  <span>
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </>
            )}
          </Button>
        </div>

        {/* Keyboard shortcuts */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-1 px-1">
          <div className="flex items-center gap-4">
            <span className="text-blue-600/70">⌘ + ⇧ + S to save draft</span>
            <span className="text-blue-600/70">⌘ + Enter to post</span>
          </div>
          <div>
            <span className="text-blue-600/70">⌘ + / for AI commands</span>
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
