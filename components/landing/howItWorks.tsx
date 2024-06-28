import React from "react";
import { motion } from "framer-motion";
const HowItWorksSection: React.FC = () => {
  return (
    <motion.section
      id="how-it-works"
      className="py-28 bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our AI carousel maker simplifies the creation process into a few easy
          steps.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          <motion.div
            className="max-w-sm p-6 bg-white border rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl text-blue-500">
                <i className="fas fa-paint-brush"></i>
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 1: Choose a Template
            </h3>
            <p className="mt-4 text-gray-600">
              Select from a variety of professionally designed templates to
              start your carousel.
            </p>
          </motion.div>
          <motion.div
            className="max-w-sm p-6 bg-white border rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl text-green-500">
                <i className="fas fa-edit"></i>
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 2: Customize Your Design
            </h3>
            <p className="mt-4 text-gray-600">
              Use our dynamic color palettes and text customization features to
              make your carousel unique.
            </p>
          </motion.div>
          <motion.div
            className="max-w-sm p-6 bg-white border rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl text-red-500">
                <i className="fas fa-magic"></i>
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 3: Generate Content
            </h3>
            <p className="mt-4 text-gray-600">
              Let our AI generate engaging content for your carousel slides.
            </p>
          </motion.div>
          <motion.div
            className="max-w-sm p-6 bg-white border rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl text-purple-500">
                <i className="fas fa-download"></i>
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Step 4: Download and Share
            </h3>
            <p className="mt-4 text-gray-600">
              Download your carousel as an image or PDF and share it on your
              social media platforms.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
