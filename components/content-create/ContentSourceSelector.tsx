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
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Choose Source</span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            <Sparkles className="h-3 w-3" />
            <span>AI Optimized</span>
          </div>
        </div>
      </div>

      {/* Tab-like Source Selection */}
      <div className="flex flex-wrap gap-2">
        {contentSources.map((source) => (
          <button
            key={source.id}
            onClick={() => setContentSource(source.id)}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap
              ${
                contentSource === source.id
                  ? "bg-blue-50 ring-1 ring-blue-200 shadow-sm"
                  : "bg-white hover:bg-gray-50 hover:ring-blue-200 ring-1 ring-gray-200"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              active:scale-95
            `}
            title={source.description}
          >
            <source.icon 
              className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                contentSource === source.id 
                  ? "text-blue-500" 
                  : "text-gray-400 group-hover:text-gray-500"
              }`} 
            />
            <div className={`text-sm font-medium transition-colors ${
              contentSource === source.id
                ? "text-blue-700"
                : "text-gray-700 group-hover:text-gray-900"
            }`}>
              {source.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
