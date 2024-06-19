import React from "react";
import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import PricingModal from "./pricingModal.subscription";
import { Button } from "../ui/button";
import { DiamondPercent } from "lucide-react";

const SubscriptionInfo = () => {
  const { status, endDate, loading } = useSubscriptionStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2 text-sm text-gray-500 animate-pulse">
        Loading...
      </div>
    );
  }

  if (!status || !endDate) {
    return (
      <PricingModal
        buttonElement={
          <Button
            variant="outline"
            size="sm"
            className="ml-auto flex items-center gap-2 px-4 py-5 text-sm text-white bg-gradient-to-r from-primary to-teal-500 hover:from-blue-600 hover:to-teal-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DiamondPercent className="w-4 h-4" />
            Remove watermark
          </Button>
        }
      />
    );
  }

  return (
    <div className="ml-auto flex items-center gap-2 px-4 py-2 text-sm  border  border-primary rounded-md text-primary transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
      Subscribed until {endDate.toDateString()}
    </div>
  );
};

export default SubscriptionInfo;
