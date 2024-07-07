import React, { useState } from "react";
import { motion } from "framer-motion";

const PlanSection: React.FC = () => {
  const plan = {
    name: "Basic plan",
    desc: "Get started with our free carousel building service.",
    price: 9.99,
    isMostPop: true,
  };

  const checkIcon = (
    <svg
      className="w-5 h-5 mx-auto text-indigo-600"
      fill="currentColor"
      viewBox="0 0 20 20">
      <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
    </svg>
  );

  const tables = [
    {
      label: "Features",
      label_icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      items: [
        {
          name: "User-Friendly Editor",
          basic: true,
        },
        {
          name: "Multiple Templates",
          basic: true,
        },
        {
          name: "Cross-Platform Compatibility",
          basic: true,
        },
        {
          name: "Data Security",
          basic: true,
        },
        {
          name: "Unlimited manual carousel creation",
          basic: true,
        },
        {
          name: "Access to free templates",
          basic: true,
        },
        {
          name: "Basic analytics",
          basic: true,
        },
        {
          name: "Community support",
          basic: true,
        },
        {
          name: "AI-Generated Content",
          basic: true,
        },
        {
          name: "Dynamic Color Palettes",
          basic: true,
        },
        {
          name: "Modern Backgrounds",
          basic: true,
        },
        {
          name: "Text Customization",
          basic: true,
        },
        {
          name: "PDF Download",
          basic: true,
        },
        {
          name: "Image Download",
          basic: true,
        },
        {
          name: "Pre-made Templates",
          basic: true,
        },
      ],
    },
  ];

  return (
    <section className="py-14 text-gray-600">
      <div className="relative max-w-xl mx-auto space-y-3 px-4 sm:text-center md:px-0">
        <h3 className="text-indigo-600 font-semibold">Pricing</h3>
        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Choose the best plan for you
        </p>
        <div className="max-w-xl mx-auto text-center text-gray-500">
          <p>
            Get started with our free carousel building service and enjoy a
            range of features to enhance your projects.
          </p>
        </div>
      </div>
      <div className="mt-16">
        <div className="max-w-screen-md mx-auto">
          <motion.div
            className="p-6 rounded-lg shadow bg-white text-center transition-shadow duration-300 ease-in-out hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h4 className="text-2xl font-semibold text-gray-700">
              {plan.name}
            </h4>
            <p className="mt-2 text-4xl font-extrabold text-gray-800">
              ${plan.price}{" "}
              <span className="text-xl text-gray-600 font-normal">/mo</span>
            </p>
            <p className="mt-4 text-gray-500">{plan.desc}</p>
            <button className="mt-6 px-6 py-3 rounded-lg font-semibold text-white bg-primary hover:bg-primary-dark transition duration-150">
              Get Started
            </button>
          </motion.div>
        </div>
        <div className="max-w-screen-xl mx-auto mt-10 space-y-4 px-4 overflow-auto md:overflow-visible md:px-8">
          {tables.map((table, idx) => (
            <motion.table
              key={idx}
              className="w-full table-auto text-sm text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <thead className="text-gray-600 font-medium border-b">
                <tr>
                  <th className="z-20 top-12 py-6 lg:sticky bg-white">
                    <div className="flex items-center gap-x-3">
                      <div className="w-12 h-12 text-indigo-600 rounded-full border flex items-center justify-center">
                        {table.label_icon}
                      </div>
                      <h4 className="text-gray-800 text-xl font-medium">
                        {table.label}
                      </h4>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {table.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      {item.basic ? checkIcon : ""}
                    </td>
                    <td className="text-center w-[250px] px-6 py-4 whitespace-nowrap lg:hidden">
                      {item.basic ? checkIcon : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
