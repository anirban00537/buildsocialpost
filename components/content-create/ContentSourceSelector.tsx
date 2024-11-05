import { FileText, ChevronDown, Sparkles, Check, Wand2 } from "lucide-react";
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
      {/* Enhanced Header with Gradient Icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Wand2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Content Source
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">
                Choose your content type
              </span>
              <div className="flex items-center gap-1 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                <Sparkles className="h-3 w-3" />
                <span>AI Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Source Selection with Gradient Cards */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {contentSources.map((source) => (
          <motion.button
            key={source.id}
            onClick={() => setContentSource(source.id)}
            className={`
              group relative flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200
              ${
                contentSource === source.id
                  ? "bg-gradient-to-br from-blue-50 to-indigo-50/30 ring-1 ring-blue-200"
                  : "bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50/10 ring-1 ring-gray-200 hover:ring-blue-200"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              w-full sm:w-auto
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`
              w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
              ${
                contentSource === source.id
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                  : "bg-gray-100 group-hover:bg-gray-200"
              }
            `}
            >
              <source.icon
                className={`
                  h-4 w-4 transition-all duration-200
                  ${
                    contentSource === source.id
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
                  }
                `}
              />
            </div>

            <span
              className={`
              text-xs font-medium whitespace-nowrap transition-colors
              ${
                contentSource === source.id
                  ? "text-blue-700"
                  : "text-gray-700 group-hover:text-gray-900"
              }
            `}
            >
              {source.label}
            </span>

            {contentSource === source.id && (
              <motion.div
                className="absolute -right-1 -top-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 
                         rounded-full flex items-center justify-center ring-2 ring-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Optional: Helper Text */}
      <div className="px-1">
        <p className="text-xs text-gray-500">
          Select the most appropriate source type for your content generation
          needs
        </p>
      </div>
    </div>
  );
};
