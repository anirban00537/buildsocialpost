import React from "react";
import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";
import PricingModal from "./pricingModal.subscription";
import { Button } from "../ui/button";

const SubscriptionInfo = () => {
  const { status, endDate, loading } = useSubscriptionStatus();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!status || !endDate) {
    return (
      <PricingModal
        buttonElement={
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            Remove watermark
          </Button>
        }
      />
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto gap-1.5 text-sm"
      disabled
    >
      Subscribed until {endDate.toDateString()}
    </Button>
  );
};

export default SubscriptionInfo;
