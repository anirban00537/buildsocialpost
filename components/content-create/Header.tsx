import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center pb-4 relative"
    >
      <div className="relative space-y-4">
        {/* Icon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-gradient-to-r from-blue-50 to-indigo-50
                     border border-blue-100"
        >
          <Wand2 className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            AI-Powered Writing
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl 
                        bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900
                        inline-block text-transparent bg-clip-text"
          >
            What would you like to write about?
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-500 max-w-2xl mx-auto text-lg"
        >
          Transform your ideas into engaging content with AI-powered assistance
        </motion.p>
      </div>
    </motion.div>
  );
};
