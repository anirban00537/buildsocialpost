"use client";
import { auth } from "@/services/firebase";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const plan = {
  name: "Pro plan",
  desc: "Access premium carousel building features for just $9.99 per month.",
  monthlyPrice: 9.99,
  yearlyPrice: 70,
  isMostPop: true,
  features: [
    "User-Friendly Editor",
    "Multiple Templates",
    "Cross-Platform Compatibility",
    "Data Security",
    "Unlimited manual carousel creation",
    "Access to free templates",
    "Basic analytics",
    "Community support",
  ],
};

const Pricing = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const router = useRouter();

  const buyProduct = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        const productId =
          selectedPlan === "monthly"
            ? process.env.NEXT_PUBLIC_MONTHLY_PRODUCT_ID
            : process.env.NEXT_PUBLIC_YEARLY_PRODUCT_ID;
        const response = await axios.post(
          "/api/purchaseProduct",
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, "response");
        // Open the checkout URL in a new tab
        window.open(response.data.checkoutUrl, "_blank", "noopener,noreferrer");
      } catch (error) {
        console.error("Error purchasing product:", error);
        alert(
          "An error occurred while purchasing the product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      router.push("/login");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white overflow-y-auto">
      <div className="flex-shrink-0 p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Pricing</h2>
        <p className="text-gray-300 mb-6">
          Upgrade your carousel building experience
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 pb-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="relative p-6">
              <div className="absolute top-0 right-0 bg-indigo-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{plan.desc}</p>

              <div className="flex justify-center mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    selectedPlan === "monthly" ? "bg-indigo-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    selectedPlan === "yearly" ? "bg-indigo-600" : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedPlan("yearly")}
                >
                  Yearly
                </button>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold">
                  $
                  {selectedPlan === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
                </span>
                <span className="text-gray-400">
                  /{selectedPlan === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <button
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition-colors"
                onClick={buyProduct}
                disabled={loading}
              >
                {loading ? "Processing..." : "Get Started"}
              </button>
            </div>

            <div className="bg-gray-900 p-6">
              <h4 className="font-medium mb-3">Features included:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-400"
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
