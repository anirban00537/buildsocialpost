import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, ChevronDown, Sparkles } from "lucide-react";
import React from "react";

interface ContentSourceSelectorProps {
  contentSource: string;
  setContentSource: (source: string) => void;
  contentSources: Array<{
    id: string;
    label: string;
    description?: string; // Make description optional
    placeholder?: string; // Add placeholder as optional
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
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-gray-600">Choose Source</span>
        <div className="flex items-center gap-0.5 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
          <Sparkles className="h-3 w-3" />
          AI Optimized
        </div>
      </div>

      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg w-full
                    bg-white ring-1 ring-gray-200 hover:ring-gray-300
                    text-gray-900 transition-all duration-200 outline-none`}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="p-1.5 bg-blue-50 rounded-md">
              {React.createElement(
                contentSources.find((source) => source.id === contentSource)
                  ?.icon || FileText,
                { className: "h-3.5 w-3.5 text-blue-500" }
              )}
            </div>
            <div className="text-left min-w-0">
              <div className="font-medium truncate">
                {
                  contentSources.find((source) => source.id === contentSource)
                    ?.label
                }
              </div>
              <div className="text-[10px] text-gray-500 truncate">
                {contentSources.find((source) => source.id === contentSource)
                  ?.description ||
                  contentSources.find((source) => source.id === contentSource)
                    ?.placeholder}
              </div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[280px] p-1.5 bg-white rounded-lg shadow-lg border border-gray-200/80"
          align="end"
        >
          {contentSources.map((source) => (
            <DropdownMenuItem
              key={source.id}
              onClick={() => setContentSource(source.id)}
              className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg cursor-pointer
                         group transition-all duration-200 outline-none
                         ${
                           contentSource === source.id
                             ? "bg-blue-50 text-gray-900 ring-1 ring-blue-200"
                             : "text-gray-600 hover:bg-blue-500 hover:text-white"
                         }`}
            >
              <div
                className={`p-1.5 rounded-md transition-colors
                ${
                  contentSource === source.id
                    ? "bg-blue-100"
                    : "bg-gray-50 group-hover:bg-white/20"
                }`}
              >
                <source.icon
                  className={`h-3.5 w-3.5 ${
                    contentSource === source.id
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{source.label}</div>
                <div className="text-[10px] text-gray-500 truncate group-hover:text-white/80">
                  {source.description || source.placeholder}
                </div>
              </div>
              {contentSource === source.id && (
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
