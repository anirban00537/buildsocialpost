import React from "react";
import {
  Cpu,
  Palette,
  Layers,
  Type,
  FileText,
  DownloadCloud,
  BookTemplate,
} from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      name: "AI-Generated Content",
      description:
        "Automatically generate engaging and relevant content for your carousels.",
      icon: <Cpu className="w-8 h-8" />,
    },
    {
      name: "Dynamic Color Palettes",
      description:
        "Customize your projects with a wide range of dynamic color schemes.",
      icon: <Palette className="w-8 h-8" />,
    },
    {
      name: "Modern Backgrounds",
      description:
        "Access a library of contemporary background designs to enhance your visuals.",
      icon: <Layers className="w-8 h-8" />,
    },
    {
      name: "Text Customization",
      description:
        "Easily adjust font styles, sizes, and alignment for clear, impactful text.",
      icon: <Type className="w-8 h-8" />,
    },
    {
      name: "PDF Download",
      description:
        "Download your designs in PDF format for easy sharing and printing.",
      icon: <FileText className="w-8 h-8" />,
    },
    {
      name: "Image Download",
      description:
        "Save your carousel images directly to your device in high resolution.",
      icon: <DownloadCloud className="w-8 h-8" />,
    },
  ];

  return (
    <motion.section
      id="features"
      className="py-24 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-primary/70 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute top-48 left-36 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-gradient-to-br from-primary/70 to-transparent rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute top-40 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-52 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-44 right-0 w-1/3 h-1/6 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Explore the key features that make our AI-powered tool uniquely
            equipped to help you design professional carousels efficiently.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="bg-cardBackground/40 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out border border-borderColor/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  {React.cloneElement(feature.icon, {
                    className: "w-6 h-6 text-primary",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
