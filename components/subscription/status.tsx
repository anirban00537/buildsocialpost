import React from "react";
import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import PricingModal from "./pricingModal.subscription";
import { Button } from "../ui/button";
import { Diamond } from "lucide-react";

const SubscriptionInfo = () => {
  const { status, endDate, loading } = useSubscriptionStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2 text-sm text-gray-500">
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
            className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Diamond className="w-4 h-4" />
            Remove watermark
          </Button>
        }
      />
    );
  }

  return (
    <div className="ml-auto flex items-center gap-2 px-4 py-2 text-sm text-white bg-gradient-to-r from-green-500 to-lime-500 rounded-md shadow hover:from-green-600 hover:to-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
      Subscribed until {endDate.toDateString()}
    </div>
  );
};

export default SubscriptionInfo;
