import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const PricingSection = () => {
  const plan = {
    name: "Basic Plan",
    price: 9.99,
    description: "Everything you need to create stunning carousels",
    features: [
      "User-Friendly Editor",
      "Multiple Templates",
      "Cross-Platform Compatibility",
      "Data Security",
      "Unlimited manual carousel creation",
      "Access to free templates",
      "Basic analytics",
      "Community support",
      "AI-Generated Content",
      "Dynamic Color Palettes",
      "Modern Backgrounds",
      "Text Customization",
      "PDF Download",
      "Image Download",
      "Pre-made Templates",
    ],
  };

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-textColor mb-4">
            Simple Pricing for Everyone
          </h2>
          <p className="text-xl text-textColor/70 max-w-2xl mx-auto">
            One plan, all features. Start creating amazing carousels today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-cardBackground rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-textColor/70 mb-6">{plan.description}</p>
                <div className="text-5xl font-bold text-primary mb-6">
                  ${plan.price}{" "}
                  <span className="text-xl font-normal text-textColor/70">
                    /month
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 px-6 rounded-full font-semibold text-textColor bg-primary hover:bg-primary-dark transition-colors duration-300 text-lg flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            <div className="bg-cardBackground p-10">
              <h4 className="text-lg font-semibold text-textColor mb-4">
                What's included:
              </h4>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center text-textColor/70"
                  >
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-textColor/70 mb-2">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Contact our support team
            <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </motion.div> */}
      </div>
    </section>
  );
};

export default PricingSection;
