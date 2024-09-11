import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";

const createSubscription = async (subscriptionData: any) => {
  const response = await fetch("/api/purchaseProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const { data: session } = useSession();

  const { mutate: subscribe, isLoading: isSubscribing } = useMutation(
    (subscriptionData: any) => {
      if (!session) {
        throw new Error("User is not authenticated");
      }
      return createSubscription(subscriptionData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["subscriptionStatus", session?.user.id]);
        setError(null);
        // Redirect to the checkout URL
        window.location.href = data.checkoutUrl;
      },
      onError: (error: Error) => {
        setError(error.message || "An error occurred while subscribing");
      },
    }
  );

  const handleSubscribe = (productId: string) => {
    if (!session) {
      setError("User is not authenticated");
      return;
    }
    subscribe({ productId });
  };

  return { subscribe: handleSubscribe, isSubscribing, error };
};
