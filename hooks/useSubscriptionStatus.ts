// hooks/useSubscriptionStatus.ts
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "subscriptions", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStatus(data.status);
          setEndDate(new Date(data.endDate));
        } else {
          setStatus(null);
          setEndDate(null);
        }
      } else {
        setStatus(null);
        setEndDate(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { status, endDate, loading };
};

export default useSubscriptionStatus;
