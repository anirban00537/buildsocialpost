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

const FeaturesSection: React.FC = () => {
  const features = [
    {
      name: "AI-Generated Content",
      description:
        "Automatically generate engaging and relevant content for your carousels.",
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      name: "Dynamic Color Palettes",
      description:
        "Customize your projects with a wide range of dynamic color schemes.",
      icon: <Palette className="w-6 h-6" />,
    },
    {
      name: "Modern Backgrounds",
      description:
        "Access a library of contemporary background designs to enhance your visuals.",
      icon: <Layers className="w-6 h-6" />,
    },
    {
      name: "Text Customization",
      description:
        "Easily adjust font styles, sizes, and alignment for clear, impactful text.",
      icon: <Type className="w-6 h-6" />,
    },
    {
      name: "PDF Download",
      description:
        "Download your designs in PDF format for easy sharing and printing.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      name: "Image Download",
      description:
        "Save your carousel images directly to your device in high resolution.",
      icon: <DownloadCloud className="w-6 h-6" />,
    },
    {
      name: "Pre-made Templates",
      description:
        "Start quickly with professional templates designed for various needs.",
      icon: <BookTemplate className="w-6 h-6" />,
    },
  ];

  return (
    <motion.section
      id="features"
      className="py-14 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore the key features that make our AI-powered tool uniquely
          equipped to help you design professional carousels efficiently.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}>
              <div className="p-4 border rounded-full text-blue-600 bg-gray-100">
                {item.icon}
              </div>
              <p className="mt-4 text-lg font-medium">{item.name}</p>
              <p className="mt-2 text-sm text-gray-500 max-w-xs text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
