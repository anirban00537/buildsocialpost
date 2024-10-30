import { motion } from "framer-motion";
import { Sparkles, Cpu } from "lucide-react";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mt-10 space-y-3 relative"
    >
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl font-semibold tracking-tight lg:text-5xl 
                   bg-[linear-gradient(to_right,#18181B,#3F3F46,#71717A,#A1A1AA,#71717A,#3F3F46,#18181B)]
                   animate-ai-gradient
                   inline-block text-transparent bg-clip-text 
                   [text-shadow:_0_2px_3px_rgb(0_0_0_/_25%)]
                   relative z-10"
        >
          What would you like to write about?
        </motion.h1>
      </div>
    </motion.div>
  );
};
