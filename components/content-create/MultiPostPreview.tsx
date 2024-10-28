import { PostPreview } from "./PostPreview";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface MultiPostPreviewProps {
  content: string;
  isGenerating: boolean;
}

export const MultiPostPreview = ({
  content,
  isGenerating,
}: MultiPostPreviewProps) => {
  // Simulate multiple posts with dummy data
  const dummyPosts = [
    {
      id: 1,
      content:
        content ||
        "Hustle is a dirty word. It's become synonymous with overwork, burnout, and being glued to your screen 24/7...",
    },
    {
      id: 2,
      content:
        "Productivity hack for indie hackers: Treat every day like a launch 🚀 Work hard, but don't burn out....",
    },
    {
      id: 3,
      content:
        "You're building a SaaS? That's not the hard part. Getting traction? That's the hard part....",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
          Your Generated Contents
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-gray-100 via-blue-400 to-gray-100" />
      </div>

      {/* Content Cards Container */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-50/50 to-blue-100 border border-gray-200/80 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut"
              }}
              className="group"
            >
              <PostPreview
                content={index === 0 ? content : post.content}
                isGenerating={index === 0 ? isGenerating : false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
