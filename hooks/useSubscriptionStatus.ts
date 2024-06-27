import { account, databases, Query } from "@/lib/appwrite";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "react-query";

interface SubscriptionStatus {
  status: boolean | null;
  endDate: Date | null;
  loading: boolean;
}

const fetchSubscriptionStatus = async (userId: string) => {
  const response = await databases.listDocuments(
    "6676798b000501b76612", // Database ID
    "6676a90d00019bc19abd", // Collection ID
    [
      Query.equal("userId", userId),
      Query.orderDesc("endDate"), // Order by endDate descending
      Query.limit(1), // Limit to the latest document
    ]
  );

  if (response.documents.length > 0) {
    const data = response.documents[0];
    const endDate = new Date(data.endDate);
    const isExpired = endDate < new Date();
    return { status: !isExpired, endDate };
  } else {
    return { status: null, endDate: null };
  }
};

const useSubscriptionStatus = (): SubscriptionStatus => {
  const user: any = useSelector((state: RootState) => state.user.userinfo);

  const { data, isLoading } = useQuery(
    ["subscriptionStatus", user?.$id],
    () => fetchSubscriptionStatus(user.$id),
    {
      enabled: !!user?.$id, // Only run query if user ID is available
      refetchOnWindowFocus: false, // Adjust according to your needs
    }
  );

  return {
    status: data?.status ?? null,
    endDate: data?.endDate ?? null,
    loading: isLoading,
  };
};

export default useSubscriptionStatus;
