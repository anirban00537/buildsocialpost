import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "react-query";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

interface SubscriptionStatus {
  status: boolean | null;
  endDate: Date | null;
  loading: boolean;
}

const fetchSubscriptionStatus = async (userId: string) => {
  const q = query(
    collection(db, "subscriptions"),
    where("userId", "==", userId),
    orderBy("endDate", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
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
    ["subscriptionStatus", user?.uid],
    () => fetchSubscriptionStatus(user.uid),
    {
      enabled: !!user?.uid, // Only run query if user ID is available
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
