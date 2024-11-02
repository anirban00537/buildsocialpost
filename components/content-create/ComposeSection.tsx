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
import { Post } from "@/types/post";
import { useToast } from "@/components/ui/use-toast";

interface ComposeSectionProps {
  content: string;
  setContent: (content: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  isCreatingDraft: boolean;
  onSaveDraft: () => void;
  isScheduleModalOpen: boolean;
  setIsScheduleModalOpen: (isOpen: boolean) => void;
  scheduledDate: Date | null;
  onSchedule: (date: Date) => void;
  isEditing?: boolean;
  postDetails?: Post | null;
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
}: ComposeSectionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const characterCount = content.length;
  const { toast } = useToast();

  // Add validation function
  const canSaveDraft = () => {
    return content.trim().length > 0;
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  // Add useEffect for global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Save Draft: Cmd/Ctrl + Shift + S
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 's') {
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
        if (!isCreatingDraft) {
          onSaveDraft();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isCreatingDraft, onSaveDraft, content]);

  // Local keyboard handler for other shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Post Now: Cmd/Ctrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      // Add your post now logic here
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)] bg-white border border-gray-100 ring-1 ring-gray-200 rounded-xl overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-gray-700">Compose</span>
            <div className="flex items-center gap-0.5 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
              <Sparkles className="h-3 w-3" />
              AI Enhanced
            </div>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Write your content with AI assistance</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`text-xs px-2 py-1 rounded-md transition-colors flex items-center gap-1
              ${
                characterCount > CHAR_LIMIT
                  ? "text-red-600 bg-red-50"
                  : characterCount > CHAR_LIMIT * 0.9
                  ? "text-amber-600 bg-amber-50"
                  : "text-gray-600 bg-gray-50"
              }`}
          >
            <FileText className="h-3 w-3" />
            {characterCount}/{CHAR_LIMIT}
          </div>
          {characterCount > CHAR_LIMIT && (
            <span className="text-[10px] text-red-600 bg-red-50 px-2 py-1 rounded-md">
              Character limit exceeded
            </span>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-grow overflow-y-auto bg-white/80 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write something amazing..."
          className="w-full h-full min-h-[calc(100vh-400px)] px-6 py-4 resize-none focus:outline-none
                     text-gray-700 placeholder-gray-400 bg-transparent"
          style={{
            lineHeight: '1.5',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Updated Action Buttons */}
      <div className="flex flex-col gap-3 p-4 border-t border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="sm"
            className={`transition-all duration-200 h-9 rounded-lg w-full
              ${isCreatingDraft || !canSaveDraft()
                ? "bg-gray-100 text-gray-400"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            onClick={() => {
              if (!canSaveDraft()) {
                toast({
                  title: "Validation Error",
                  description: "Please add some content first",
                  variant: "destructive",
                });
                return;
              }
              onSaveDraft();
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
                <div className="ml-2 flex items-center gap-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded">
                  <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
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
                       transition-all duration-200 h-9 rounded-lg w-full"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button
            size="sm"
            className={`transition-all duration-200 h-9 rounded-lg w-full
              ${
                characterCount > CHAR_LIMIT
                  ? "bg-gray-100 text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            disabled={characterCount > CHAR_LIMIT}
          >
            <Send className="w-4 h-4 mr-2" />
            Post Now
            <div className="ml-2 flex items-center gap-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded">
              <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </Button>
        </div>

        {/* Keyboard shortcuts */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
          <div className="flex items-center gap-4">
            <span>⌘ + ⇧ + S to save draft</span>
            <span>⌘ + Enter to post</span>
          </div>
          <div>
            <span>⌘ + / for AI commands</span>
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
