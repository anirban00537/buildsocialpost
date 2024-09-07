import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  logout,
  setEndDate,
  setLoading,
  setSubscribed,
  setUser,
} from "@/state/slice/user.slice";
import { useQuery, useMutation } from "react-query";
import { User } from "firebase/auth";
import { setBranding } from "@/state/slice/branding.slice";
import {
  signOut,
  signInWithGoogle,
  onAuthStateChange,
  getCurrentUser,
} from "@/services/auth";
import {
  fetchSubscriptionStatus,
  fetchBrandingSettings,
} from "@/services/firestore";

// Hook for logging out the user
const useLogout = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: logoutUser, isLoading: loading } = useMutation<void, Error>(
    async () => await signOut(),
    {
      onSuccess: () => {
        dispatch(logout());
        setSuccess("Logged out successfully");
        router.push("/login");
      },
      onError: (error: Error) => {
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
  } = useQuery<User | null, Error>("user", getCurrentUser, {
    onSuccess: (data) => {
      if (data) {
        const { uid, email, displayName, photoURL } = data;
        dispatch(setUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(logout());
      }
    },
    onError: (error: Error) => {
      setError(error.message || "Failed to fetch the current user.");
      dispatch(logout());
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
      onError: (error: Error) => {
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
      onError: (error: Error) => {
        setError(error.message || "Failed to fetch branding settings.");
      },
    }
  );

  useEffect(() => {
    dispatch(setLoading(userLoading || subscriptionLoading || brandingLoading));
  }, [userLoading, subscriptionLoading, brandingLoading, dispatch]);

  return {
    error:
      error ||
      userError?.message ||
      subscriptionError?.message ||
      brandingError?.message,
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

  const { mutate: loginWithGoogle, isLoading: loading } = useMutation<
    void,
    Error
  >(
    async () => {
      const result = await signInWithGoogle();
      const user = result.user;
      const { uid, email, displayName, photoURL } = user;
      dispatch(setUser({ uid, email, displayName, photoURL }));
    },
    {
      onSuccess: () => {
        setSuccess("Logged in successfully!");
        router.push("/editor");
      },
      onError: (error: Error) => {
        setError(
          error.message || "Failed to log in with Google. Please try again."
        );
      },
    }
  );

  return { loginWithGoogle, loading, error, success };
};

export { useLogout, useAuthUser, useGoogleLogin };
