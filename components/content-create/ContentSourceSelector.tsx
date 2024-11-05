import { FileText, ChevronDown, Sparkles, Check } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

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
    <div className="space-y-4">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Content Source</span>
            <div className="flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              <Sparkles className="h-3 w-3" />
              <span>AI Optimized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Source Selection */}
      <div className="flex flex-wrap gap-2">
        {contentSources.map((source) => (
          <motion.button
            key={source.id}
            onClick={() => setContentSource(source.id)}
            className={`
              group relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200
              ${contentSource === source.id
                ? "bg-blue-50 ring-1 ring-blue-200"
                : "bg-white hover:bg-gray-50 ring-1 ring-gray-200 hover:ring-blue-200"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <source.icon 
              className={`
                h-4 w-4 transition-all duration-200
                ${contentSource === source.id
                  ? "text-blue-600"
                  : "text-gray-400 group-hover:text-gray-500"
                }
              `}
            />
            
            <span className={`
              text-sm font-medium whitespace-nowrap transition-colors
              ${contentSource === source.id
                ? "text-blue-700"
                : "text-gray-700 group-hover:text-gray-900"
              }
            `}>
              {source.label}
            </span>

            {contentSource === source.id && (
              <motion.div
                className="absolute -right-1 -top-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-2.5 h-2.5 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
