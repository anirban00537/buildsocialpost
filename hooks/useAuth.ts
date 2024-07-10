// hooks/useAuthUser.ts
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { db, auth } from "@/lib/firebase";
import {
  logout,
  setEndDate,
  setLoading,
  setSubscribed,
  setUser,
} from "@/state/slice/user.slice";
import { useQuery, useMutation } from "react-query";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { setBranding } from "@/state/slice/branding.slice";

// Function to fetch user data
const getUser = async (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Function to fetch subscription status
const fetchSubscriptionStatus = async (userId: string) => {
  try {
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
      const endDate = new Date(data.endDate).toISOString(); // Convert Date to string
      const isExpired = new Date(endDate) < new Date();
      return { isSubscribed: !isExpired, endDate };
    } else {
      return { isSubscribed: false, endDate: null };
    }
  } catch (error: any) {
    console.error("Error fetching subscription status:", error);
    return { isSubscribed: false, endDate: null, error: error.message };
  }
};

// Function to fetch branding settings
const fetchBrandingSettings = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        name: data.branding?.name || "",
        handle: data.branding?.handle || "",
        headshot: data.branding?.headshot || null,
      };
    } else {
      return { name: "", handle: "", headshot: null };
    }
  } catch (error: any) {
    console.error("Error fetching branding settings:", error);
    return { name: "", handle: "", headshot: null, error: error.message };
  }
};

// Hook for logging out the user
const useLogout = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: logoutUser, isLoading: loading } = useMutation(
    async () => await signOut(auth),
    {
      onSuccess: () => {
        dispatch(logout());
        setSuccess("");
        router.push("/login");
      },
      onError: (error: any) => {
        setError(error.message || "Logout failed. Please try again.");
      },
    }
  );

  return { logout: logoutUser, loading, error, success };
};

// Hook for fetching authenticated user and their subscription status
const useAuthUser = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery("user", getUser, {
    onSuccess: (data) => {
      if (data) {
        const { uid, email, displayName, photoURL } = data;
        dispatch(setUser({ uid, email, displayName, photoURL }));
      }
    },
    onError: (error: any) => {
      setError(error.message || "Failed to fetch the current user.");
    },
  });

  const userId = userData?.uid;

  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    error: subscriptionError,
  } = useQuery(
    ["subscriptionStatus", userId],
    () =>
      userId
        ? fetchSubscriptionStatus(userId)
        : Promise.reject(new Error("User ID is undefined")),
    {
      enabled: !!userId,
      onSuccess: (data) => {
        dispatch(setSubscribed(data.isSubscribed));
        dispatch(setEndDate(data.endDate));
      },
      onError: (error: any) => {
        setError(error.message || "Failed to fetch subscription status.");
        dispatch(setSubscribed(false));
        dispatch(setEndDate(null));
      },
    }
  );

  const {
    data: brandingData,
    isLoading: brandingLoading,
    error: brandingError,
  } = useQuery(
    ["brandingSettings", userId],
    () =>
      userId
        ? fetchBrandingSettings(userId)
        : Promise.reject(new Error("User ID is undefined")),
    {
      enabled: !!userId,
      onSuccess: (data) => {
        dispatch(setBranding(data));
      },
      onError: (error: any) => {
        setError(error.message || "Failed to fetch branding settings.");
      },
    }
  );

  useEffect(() => {
    dispatch(setLoading(userLoading || subscriptionLoading || brandingLoading));
  }, [userLoading, subscriptionLoading, brandingLoading, dispatch]);

  return {
    error: userError || subscriptionError || brandingError,
    user: userData,
    loading: userLoading || subscriptionLoading || brandingLoading,
    fetchUser: refetchUser,
  };
};

// Hook for Google login
const useGoogleLogin = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: loginWithGoogle, isLoading: loading } = useMutation(
    async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { uid, email, displayName, photoURL } = user;
      dispatch(setUser({ uid, email, displayName, photoURL }));
    },
    {
      onSuccess: () => {
        setSuccess("Logged in successfully!");
        router.push("/editor");
      },
      onError: (error: any) => {
        setError(
          error.message || "Failed to log in with Google. Please try again."
        );
      },
    }
  );

  return { loginWithGoogle, loading, error, success };
};

export { useLogout, useAuthUser, useGoogleLogin };
