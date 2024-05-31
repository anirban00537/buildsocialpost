import React from "react";
import useSubscriptionStatus from "@/hooks/useSubscriptionStatus";

const SubscriptionInfo = () => {
  const { status, endDate, loading } = useSubscriptionStatus();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!status || !endDate) {
    return <div>No active subscription</div>;
  }

  return (
    <div>
      <p>Subscription Status: {status}</p>
      <p>Subscription End Date: {endDate.toDateString()}</p>
    </div>
  );
};

export default SubscriptionInfo;
