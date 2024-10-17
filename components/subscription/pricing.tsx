"use client";
import React, { useState } from "react";
import { createCheckout } from "@/services/subscription";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const plan = {
  name: "Pro plan",
  desc: "Access premium carousel building features",
  monthlyPrice: 9.99,
  yearlyPrice: 69.99,
  isMostPop: true,
  features: [
    "User-Friendly Editor",
    "Multiple Templates",
    "Unlimited manual carousel creation",
    "Unlimited AI carousel creation",
    "Access to Color Palette",
  ],
};

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const { loggedin } = useSelector((state: RootState) => state.user);

  const buyProduct = async () => {
    setLoading(true);
    if (loggedin) {
      try {
        const productId =
          selectedPlan === "monthly"
            ? process.env.NEXT_PUBLIC_MONTHLY_PRODUCT_ID
            : process.env.NEXT_PUBLIC_YEARLY_PRODUCT_ID;

        if (!productId) {
          throw new Error("Product ID is not defined");
        }

        const response = await createCheckout({
          productId,
          redirectUrl: window.location.origin,
        });
        window.open(response.checkoutUrl, "_blank", "noopener,noreferrer");
      } catch (error) {
        console.error("Error purchasing product:", error);
        alert(
          "An error occurred while purchasing the product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 overflow-y-auto">
      <div className="flex-shrink-0 p-6 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Pricing</h2>
        <p className="text-gray-600 mb-6">
          Upgrade your carousel building experience
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 pb-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="relative p-6">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{plan.desc}</p>

              <div className="flex justify-center mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-l-md transition-colors ${
                    selectedPlan === "monthly"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-r-md transition-colors ${
                    selectedPlan === "yearly"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedPlan("yearly")}
                >
                  Yearly
                </button>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${selectedPlan === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-600">
                  /{selectedPlan === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <button
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium transition-colors"
                onClick={buyProduct}
                disabled={loading}
              >
                {loading ? "Processing..." : "Get Started"}
              </button>
            </div>

            <div className="bg-gray-50 p-6">
              <h4 className="font-medium mb-3 text-gray-900">Features included:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
