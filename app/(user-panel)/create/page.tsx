import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import ShimmerButton from "@/components/magicui/Shimmer-Button.comp";

const ContentCreationTools = () => {
  return (
    <div className="container max-w-5xl mx-auto p-6 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-20">
          <div className="aspect-square h-[400px] bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 rounded-full" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 blur-[100px] opacity-20">
          <div className="aspect-square h-[400px] bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-600 rounded-full" />
        </div>
      </div>

      <div className="text-center mb-6 space-y-3">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 via-gray-500 to-gray-900 text-transparent bg-clip-text">
          What would you like to create today?
        </h1>
      </div>

      {/* Enhanced Input Card */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-md relative overflow-hidden w-full transform transition-all hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-50" />

        <CardHeader className="relative pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            Generate LinkedIn Posts
            <Wand2 className="h-5 w-5 text-gray-500 animate-bounce" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white/50 backdrop-blur-sm p-2 hover:border-gray-300/80 transition-all duration-300">
            <textarea
              className="w-full min-h-[80px] p-3 rounded-lg 
                       resize-none focus:outline-none
                       bg-transparent transition-all
                       placeholder:text-gray-400 text-sm"
              placeholder="What would you like to write about? (e.g., Leadership lessons, Industry insights, Professional growth)"
            />
            <ShimmerButton
              className="px-5 py-2.5 text-sm font-medium mr-2"
              background="linear-gradient(to right, #000, #000, #000)"
            >
              Generate
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </ShimmerButton>
          </div>

          {/* Feature Pills */}
          <div className="flex gap-2 mt-3 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 border border-gray-200/50 backdrop-blur-sm">
              <span>✨ AI-Powered</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 border border-gray-200/50 backdrop-blur-sm">
              <span>🚀 5 Variations</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/50 border border-gray-200/50 backdrop-blur-sm">
              <span>⚡️ Instant</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreationTools;
