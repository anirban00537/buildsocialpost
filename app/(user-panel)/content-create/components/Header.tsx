import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10 space-y-3"
    >
      <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 tracking-wider uppercase bg-gray-50/50 px-3 py-1 rounded-full mx-auto">
        <Sparkles className="h-3.5 w-3.5 text-blue-500" />
        AI Writing Assistant
      </span>
      <h1
        className="text-4xl font-semibold tracking-tight lg:text-5xl 
               bg-gradient-to-tr from-gray-900 via-blue-800 to-blue-600
               inline-block text-transparent bg-clip-text 
               [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]"
      >
        What would you like to write about?
      </h1>
      <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
        Transform your ideas into professional LinkedIn posts with AI-powered
        assistance
      </p>
    </motion.div>
  );
};
