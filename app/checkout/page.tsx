"use client";
import { auth } from "@/lib/firebase";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const plan = {
  name: "Pro plan",
  desc: "Access basic carousel building features for free.",
  price: 9.99,
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

const PricingPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const buyProduct = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        const response = await axios.post(
          "/api/purchaseProduct",
          {
            productId: "399160",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response, "response");
        window.open(response.data.checkoutUrl, "_blank");
      } catch (error) {
        console.error("Error purchasing product:", error);
        alert(
          "An error occurred while purchasing the product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      alert("User not authenticated");
      router.push("/signin");
      setLoading(false);
    }
  };

  return (
    <section className="relative py-14 bg-primary-50 flex items-center justify-center min-h-screen">
      <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
        <div className="relative max-w-xl space-y-3 px-4 md:px-0 text-center">
          <h3 className="text-primary-600 font-semibold">Pricing</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Upgrade your carousel building experience
          </p>
          <div className="max-w-xl mx-auto">
            <p>
              Our carousel builder allows you to create engaging content for
              LinkedIn, Instagram, and TikTok. Use our AI-powered features for a
              small fee or manually create carousels for free.
            </p>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <div className="flex flex-col border-y max-w-lg rounded-xl border shadow-lg bg-white">
            <div className="p-4 py-8 border-b md:p-8">
              <div className="justify-between flex">
                <div className="max-w-xs">
                  <span className="text-2xl text-gray-800 font-semibold sm:text-3xl">
                    {plan.name}
                  </span>
                  <p className="mt-3 sm:text-sm">{plan.desc}</p>
                </div>
                <div className="flex-none text-gray-800 text-2xl font-semibold sm:text-3xl">
                  ${plan.price}{" "}
                  <span className="text-xl text-gray-600 font-normal">/mo</span>
                </div>
              </div>
              <button
                className="mt-4 px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-primary hover:bg-primary-500 active:bg-primary-700"
                onClick={buyProduct}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy"}
              </button>
            </div>
            <div className="p-4 md:p-8">
              <div className="pb-2 text-gray-800 font-medium">
                <p>Features</p>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
