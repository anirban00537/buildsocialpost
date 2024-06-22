import { useEffect, useState } from "react";
import { account, databases, Query } from "@/lib/appwrite";
import { Models } from "appwrite";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface SubscriptionStatus {
  status: boolean | null;
  endDate: Date | null;
  loading: boolean;
}

const useSubscriptionStatus = (): SubscriptionStatus => {
  const [status, setStatus] = useState<boolean | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user: any = useSelector((state: RootState) => state.user.userinfo);

  const fetchSubscriptionStatus = async (userId: string) => {
    console.log("Fetching subscription status for user ID:", userId);
    try {
      const response = await databases.listDocuments(
        "6676798b000501b76612", // Database ID
        "6676a90d00019bc19abd", // Collection ID
        [
          Query.equal("userId", userId),
          Query.orderDesc("endDate"), // Order by endDate descending
          Query.limit(1), // Limit to the latest document
        ]
      );

      console.log("Subscription data fetched:", response.documents);

      if (response.documents.length > 0) {
        const data = response.documents[0];
        const endDate = new Date(data.endDate);
        const isExpired = endDate < new Date();
        console.log(isExpired, "isExpired");
        setStatus(!isExpired);
        setEndDate(endDate);
      } else {
        console.warn("No subscription found for user ID:", userId);
        setStatus(null);
        setEndDate(null);
      }
    } catch (error) {
      console.error("Error fetching subscription data:", error);
      setStatus(null);
      setEndDate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(user.$id, "useruseruser");
    if (user.$id) {
      fetchSubscriptionStatus(user.$id);
    }
  }, [user]);

  return { status, endDate, loading };
};

export default useSubscriptionStatus;
