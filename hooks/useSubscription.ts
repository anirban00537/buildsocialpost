import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const createSubscription = async (subscriptionData: any, token: string) => {
  const response = await fetch("/api/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscriptionData),
  });

  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  return response.json();
};

export const useSubscription = () => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const token = useSelector((state: RootState) => state.user.token);

  const { mutate: subscribe, isLoading: isSubscribing } = useMutation(
    (subscriptionData: any) => {
      if (!token) {
        throw new Error("User is not authenticated");
      }
      return createSubscription(subscriptionData, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subscriptionStatus", user?.uid]);
        setError(null);
      },
      onError: (error: Error) => {
        setError(error.message || "An error occurred while subscribing");
      },
    }
  );

  const handleSubscribe = (subscriptionData: any) => {
    if (!token) {
      setError("User is not authenticated");
      return;
    }
    subscribe(subscriptionData);
  };

  return { subscribe: handleSubscribe, isSubscribing, error };
};
