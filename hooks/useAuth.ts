import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db, auth } from "@/lib/firebase";
import {
  logout,
  setEndDate,
  setLoading,
  setSubscribed,
  setUser,
} from "@/state/slice/user.slice";
import { useQuery, useMutation } from "react-query";
import colorPresets from "@/lib/color-presets";
import { setBackground } from "@/state/slice/carousel.slice";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";

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

// Hook for logging out the user
const useLogout = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const { mutate: logoutUser, isLoading: loading } = useMutation(
    async () => await signOut(auth),
    {
      onSuccess: () => {
        dispatch(logout());
      },
      onError: (error: any) => {
        setError(error.message || "Logout failed. Please try again.");
      },
    }
  );

  return { logout: logoutUser, loading, error };
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

  useEffect(() => {
    const randomPreset =
      colorPresets[Math.floor(Math.random() * colorPresets.length)];
    dispatch(setBackground(randomPreset));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(userLoading || subscriptionLoading));
  }, [userLoading, subscriptionLoading, dispatch]);

  return {
    error: userError || subscriptionError,
    user: userData,
    loading: userLoading || subscriptionLoading,
    fetchUser: refetchUser,
  };
};

// Hook for Google login
const useGoogleLogin = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const { mutate: loginWithGoogle, isLoading: loading } = useMutation(
    async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { uid, email, displayName, photoURL } = user;
      dispatch(setUser({ uid, email, displayName, photoURL }));
    },
    {
      onError: (error: any) => {
        setError(
          error.message || "Failed to log in with Google. Please try again."
        );
      },
    }
  );

  return { loginWithGoogle, loading, error };
};

export { useLogout, useAuthUser, useGoogleLogin };
