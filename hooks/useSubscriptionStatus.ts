// hooks/useSubscriptionStatus.ts
import { useEffect, useState } from "react";
import { account, databases } from "@/lib/appwrite";
import { Models } from "appwrite";

interface SubscriptionStatus {
  status: string | null;
  endDate: Date | null;
  loading: boolean;
}

const useSubscriptionStatus = (): SubscriptionStatus => {
  const [status, setStatus] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscriptionStatus = async (userId: string) => {
      try {
        const response = await databases.getDocument(
          "6676798b000501b76612", // Replace with your actual database ID
          "6676799900328c7c1974", // Replace with your actual collection ID
          userId
        );

        const data = response;
        setStatus(data.status);
        setEndDate(new Date(data.endDate));
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setStatus(null);
        setEndDate(null);
      } finally {
        setLoading(false);
      }
    };

    const getUser = async () => {
      try {
        const user: Models.User<Models.Preferences> = await account.get();
        fetchSubscriptionStatus(user.$id);
      } catch (error) {
        console.error("Error fetching user:", error);
        setStatus(null);
        setEndDate(null);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { status, endDate, loading };
};

export default useSubscriptionStatus;
