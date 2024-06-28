import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <i className="fas fa-paint-brush text-blue-500"></i>,
    title: "Step 1: Choose a Template",
    description:
      "Select from a variety of professionally designed templates to start your carousel.",
    color: "text-blue-500",
  },
  {
    icon: <i className="fas fa-edit text-green-500"></i>,
    title: "Step 2: Customize Your Design",
    description:
      "Use our dynamic color palettes and text customization features to make your carousel unique.",
    color: "text-green-500",
  },
  {
    icon: <i className="fas fa-magic text-red-500"></i>,
    title: "Step 3: Generate Content",
    description:
      "Let our AI generate engaging content for your carousel slides.",
    color: "text-red-500",
  },
  {
    icon: <i className="fas fa-download text-purple-500"></i>,
    title: "Step 4: Download and Share",
    description:
      "Download your carousel as an image or PDF and share it on your social media platforms.",
    color: "text-purple-500",
  },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: "spring" },
  },
};

const HowItWorksSection: React.FC = () => {
  return (
    <motion.section
      id="how-it-works"
      className="py-28 bg-gradient-to-r from-blue-50 to-teal-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our AI carousel maker simplifies the creation process into a few easy
          steps.
        </p>
        <motion.div className="mt-12 flex flex-wrap justify-center gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="max-w-sm p-6 bg-white rounded-lg"
              variants={itemVariants}>
              <div className="flex items-center justify-center mb-4">
                <span className={`text-5xl ${step.color}`}>{step.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-4 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
