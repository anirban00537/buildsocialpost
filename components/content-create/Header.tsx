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
        className="inline-flex items-center mb-5 gap-2 text-xs font-medium tracking-wider uppercase 
                 bg-gradient-to-r from-gray-900/10 via-gray-600/10 to-gray-400/10 
                 px-4 py-2 rounded-full mx-auto relative group
                 border border-gray-400/20 backdrop-blur-sm"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 via-gray-600/20 to-gray-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Cpu className="h-3.5 w-3.5 text-gray-700 animate-pulse" />
        <span className="bg-gradient-to-r from-gray-700 to-gray-500 inline-block text-transparent bg-clip-text">
          AI Content Creator
        </span>
        <Sparkles className="h-3.5 w-3.5 text-gray-600 animate-ai-glow" />
      </motion.span>

      <div className="relative">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -top-2 left-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent w-full"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-semibold tracking-tight lg:text-5xl 
                   bg-[linear-gradient(to_right,#18181B,#52525B,#A1A1AA,#D4D4D8,#52525B,#18181B)]
                   bg-[length:200%_auto] animate-ai-gradient
                   inline-block text-transparent bg-clip-text 
                   [text-shadow:_0_2px_2px_rgb(0_0_0_/_30%)]
                   relative z-10"
        >
          What would you like to write about?
        </motion.h1>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent w-full"
        />
      </div>

      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed relative group"
      >
        Transform your ideas into professional LinkedIn posts with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-600 font-medium">
          AI-powered assistance
        </span>
      </motion.p> */}
    </motion.div>
  );
};
