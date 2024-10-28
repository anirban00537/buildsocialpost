import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, ChevronDown } from "lucide-react";
import React from "react";

interface ContentSourceSelectorProps {
  contentSource: string;
  setContentSource: (source: string) => void;
  contentSources: Array<{
    id: string;
    label: string;
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
      <div className="flex items-center gap-2 px-1 justify-end">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
          Content Source
        </span>
      </div>
      <div className="p-1 bg-cardBackground rounded-lg w-fit ml-auto hover:bg-cardBackground/90 transition-colors">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg
                      bg-white text-gray-900 transition-all duration-300 outline-none w-[200px]`}
          >
            {React.createElement(
              contentSources.find((source) => source.id === contentSource)?.icon ||
                FileText,
              { className: "h-4 w-4 text-blue-500" }
            )}
            <span>
              {
                contentSources.find((source) => source.id === contentSource)?.label
              }
            </span>
            <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[200px] p-1 bg-white rounded-lg shadow-md border border-gray-200/80"
            align="end"
          >
            {contentSources.map((source) => (
              <DropdownMenuItem
                key={source.id}
                onClick={() => setContentSource(source.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg cursor-pointer
                           transition-all duration-300 outline-none
                           ${
                             contentSource === source.id
                               ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                               : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                           }`}
              >
                <source.icon
                  className={`h-4 w-4 ${
                    contentSource === source.id ? "text-blue-500" : ""
                  }`}
                />
                {source.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
