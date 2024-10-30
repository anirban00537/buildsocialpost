"use client";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { 
  Wand2, Send, Clock, Save, Sparkles, 
  HelpCircle, FileText, ArrowRight 
} from "lucide-react";
import { EditorToolbar } from "./EditorToolbar";
import { ScheduleModal } from "./ScheduleModal";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ComposeSectionProps {
  content: string;
  setContent: (content: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const CHAR_LIMIT = 3000;

export const ComposeSection = ({
  content,
  setContent,
  isGenerating,
  setIsGenerating,
}: ComposeSectionProps) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
      CharacterCount.configure({
        limit: CHAR_LIMIT,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getText());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none h-full min-h-[calc(100vh-400px)] px-6 py-4',
      },
    },
  });

  const characterCount = editor?.storage.characterCount.characters() ?? 0;

  const handleSchedule = (date: Date) => {
    setScheduledDate(date);
    console.log("Post scheduled for:", format(date, "PPP 'at' HH:mm"));
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
              ${characterCount > CHAR_LIMIT 
                ? 'text-red-600 bg-red-50' 
                : characterCount > CHAR_LIMIT * 0.9
                ? 'text-amber-600 bg-amber-50'
                : 'text-gray-600 bg-gray-50'
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

      {/* Editor Toolbar */}
      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/80">
        <EditorToolbar editor={editor} />
      </div>

      {/* Editor Content */}
      <div className="flex-grow overflow-y-auto bg-white/80">
        <EditorContent editor={editor} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                       transition-all duration-200 h-9 px-4 rounded-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                       transition-all duration-200 h-9 px-4 rounded-lg
                       flex items-center gap-2"
            onClick={() => setIsScheduleModalOpen(true)}
          >
            <Clock className="w-4 h-4" />
            {scheduledDate 
              ? format(scheduledDate, "MMM d 'at' HH:mm")
              : "Schedule"}
            {scheduledDate && (
              <div className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">
                Scheduled
              </div>
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`transition-all duration-200 h-9 px-4 rounded-lg
              ${isGenerating || characterCount > CHAR_LIMIT
                ? 'text-gray-400 border-gray-200 bg-gray-50'
                : 'text-blue-600 border-blue-200 hover:bg-blue-50'
              }`}
            onClick={() => setIsGenerating(true)}
            disabled={isGenerating || characterCount > CHAR_LIMIT}
          >
            <Wand2 className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
          <Button
            size="sm"
            className={`transition-all duration-200 h-9 px-4 rounded-lg flex items-center gap-2
              ${characterCount > CHAR_LIMIT
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            onClick={() => {}}
            disabled={characterCount > CHAR_LIMIT}
          >
            <Send className="w-4 h-4" />
            Post Now
            <div className="flex items-center gap-1 text-[10px] bg-white/10 px-1.5 py-0.5 rounded">
              <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </Button>
        </div>
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleSchedule}
      />
    </Card>
  );
}; 