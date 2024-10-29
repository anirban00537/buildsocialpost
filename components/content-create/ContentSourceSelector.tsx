import { FileText, ChevronDown, Sparkles } from "lucide-react";
import React from "react";

interface ContentSourceSelectorProps {
  contentSource: string;
  setContentSource: (source: string) => void;
  contentSources: Array<{
    id: string;
    label: string;
    description?: string;
    placeholder?: string;
    icon: any;
  }>;
}

export const ContentSourceSelector = ({
  contentSource,
  setContentSource,
  contentSources,
}: ContentSourceSelectorProps) => {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-gray-600">Choose Source</span>
        <div className="flex items-center gap-0.5 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
          <Sparkles className="h-3 w-3" />
          AI Optimized
        </div>
      </div>

      {/* Tab-like Source Selection */}
      <div className="flex gap-2">
        {contentSources.map((source) => (
          <button
            key={source.id}
            onClick={() => setContentSource(source.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap
              ${
                contentSource === source.id
                  ? "bg-blue-50 ring-1 ring-blue-200"
                  : "bg-white hover:bg-gray-50 ring-1 ring-gray-200"
              }
            `}
          >
            <source.icon 
              className={`h-3.5 w-3.5 ${
                contentSource === source.id 
                  ? "text-blue-500" 
                  : "text-gray-400"
              }`} 
            />
            <div className="text-xs font-medium text-gray-900">
              {source.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
