import React from "react";
import { Paintbrush, Sliders, Sparkles, Share2 } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Paintbrush className="w-8 h-8" />,
      number: "01",
      title: "Choose a Template",
      description:
        "Select from a variety of professionally designed templates to start your carousel.",
    },
    {
      icon: <Sliders className="w-8 h-8" />,
      number: "02",
      title: "Customize Your Design",
      description:
        "Use our dynamic color palettes and text customization features to make your carousel unique.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      number: "03",
      title: "Generate Content",
      description:
        "Let our AI generate engaging content for your carousel slides.",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      number: "04",
      title: "Download and Share",
      description:
        "Download your carousel as an image or PDF and share it on your social media platforms.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-textColor sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-textColor/70 max-w-3xl mx-auto">
            Our AI carousel maker simplifies the creation process into a few
            easy steps.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-primary mb-2">
                  Step {step.number}
                </div>
                <h4 className="text-xl font-semibold text-textColor mb-2">
                  {step.title}
                </h4>
                <p className="text-textColor/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
