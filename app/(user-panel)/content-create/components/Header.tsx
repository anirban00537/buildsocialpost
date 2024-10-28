import { motion } from "framer-motion";
import { Sparkles, Cpu } from "lucide-react";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-10 space-y-3 relative"
    >
      <motion.span
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase 
                 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 
                 px-4 py-2 rounded-full mx-auto relative group
                 border border-blue-200/20 backdrop-blur-sm"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Cpu className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text">
          AI Writing Assistant
        </span>
        <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-ai-glow" />
      </motion.span>

      <div className="relative">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-2 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-semibold tracking-tight lg:text-5xl 
                   bg-[linear-gradient(to_right,#1E3A8A,#3B82F6,#60A5FA,#93C5FD,#3B82F6,#1E3A8A)]
                   bg-[length:200%_auto] animate-ai-gradient
                   inline-block text-transparent bg-clip-text 
                   [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]
                   relative z-10"
        >
          What would you like to write about?
        </motion.h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed
                 relative group"
      >
        <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 
                      group-hover:blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
        Transform your ideas into professional LinkedIn posts with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium">
          AI-powered assistance
        </span>
      </motion.p>

      {/* Decorative elements */}
      <div className="absolute -z-10 inset-0">
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-blue-500/20 rounded-full animate-ai-particle" />
        <div className="absolute bottom-5 right-1/3 w-2 h-2 bg-indigo-500/20 rounded-full animate-ai-particle delay-150" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-500/20 rounded-full animate-ai-particle delay-300" />
      </div>
    </motion.div>
  );
};
