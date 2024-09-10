"use client";
import { signInWithGoogle } from "@/services/auth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const plan = {
  name: "Pro plan",
  desc: "Access premium carousel building features for just $9.99 per month.",
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

const Pricing: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { subscribe, isSubscribing, error: subscriptionError } = useSubscription();
  const user = useSelector((state: RootState) => state.user.userinfo);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      if (!user) {
        const result = await signInWithGoogle();
        if (!result.user) {
          throw new Error("Failed to sign in");
        }
      }
      
      // Here you would typically integrate with a payment provider like Stripe
      // For this example, we'll just create a subscription without payment
      const subscriptionData = {
        userId: user?.uid,
        planId: "pro_plan",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      };
      
      await subscribe(subscriptionData);
      router.push("/editor");
    } catch (error) {
      console.error('Error during subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex items-center justify-center  text-white">
      <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
        <div className="relative max-w-xl space-y-3 px-4 md:px-0 text-center">
          <h3 className="text-white font-semibold">Pricing</h3>
          <p className="text-xl font-semibold sm:text-xl">
            Upgrade your carousel building experience
          </p>
          <div className="max-w-xl mx-auto">
            <p className="text-xs">
              Our carousel builder allows you to create engaging content for
              LinkedIn, Instagram, and TikTok. Use our AI-powered features for a
              small fee or manually create carousels for free.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex flex-col border-y max-w-lg rounded-xl border  bg-white text-gray-800">
            <div className="p-6 md:p-8 border-b">
              <div className="justify-between flex">
                <div className="max-w-xs">
                  <span className="text-3xl font-semibold">{plan.name}</span>
                  <p className="mt-3 text-sm">{plan.desc}</p>
                </div>
                <div className="flex-none text-3xl font-semibold">
                  ${plan.price} <span className="text-xl font-normal">/mo</span>
                </div>
              </div>
              <button
                className="mt-6 px-5 py-3 rounded-lg w-full font-semibold text-sm duration-150 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md"
                onClick={handleSubscribe}
                disabled={loading || isSubscribing}
              >
                {loading || isSubscribing ? "Processing..." : "Buy"}
              </button>
              {subscriptionError && (
                <p className="text-red-500 mt-2">{subscriptionError}</p>
              )}
            </div>
            <div className="p-6 md:p-8">
              <div className="pb-2 font-medium">
                <p className="text-lg">Features</p>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-xs gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-500"
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

export default Pricing;
