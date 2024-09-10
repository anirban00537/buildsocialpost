import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  logout,
  setEndDate,
  setLoading,
  setSubscribed,
  setUser,
  setToken,
} from "@/state/slice/user.slice";
import { useQuery, useMutation } from "react-query";
import { User } from "firebase/auth";
import { setBranding } from "@/state/slice/branding.slice";
import {
  signOut,
  signInWithGoogle,
  getCurrentUser,
} from "@/services/auth";
import {
  fetchSubscriptionStatus,
  fetchBrandingSettings,
} from "@/services/firestore";

// Hook for logging out the user
export const useLogout = () => {
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

export const useAuthUser = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const {
    data: authData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery<{ user: User | null; token: string | null }, Error>("user", getCurrentUser, {
    onSuccess: (data) => {
      if (data.user) {
        const { uid, email, displayName, photoURL } = data.user;
        dispatch(setUser({ uid, email, displayName, photoURL }));
        dispatch(setToken(data.token));
      } else {
        dispatch(logout());
      }
    },
    onError: (error: Error) => {
      setError(error.message || "Failed to fetch the current user.");
      dispatch(logout());
    },
  });

  const userId = authData?.user?.uid;
  const token = authData?.token;

  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    error: subscriptionError,
  } = useQuery(
    ["subscriptionStatus", userId],
    () =>
      userId && token
        ? fetchSubscriptionStatus(userId, token)
        : Promise.reject(new Error("User ID or token is undefined")),
    {
      enabled: !!userId && !!token,
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
      userId && token
        ? fetchBrandingSettings(userId, token)
        : Promise.reject(new Error("User ID or token is undefined")),
    {
      enabled: !!userId && !!token,
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
    user: authData?.user,
    token: authData?.token,
    loading: userLoading || subscriptionLoading || brandingLoading,
    fetchUser: refetchUser,
  };
};

export const useGoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { user, token } = await signInWithGoogle();
      if (user && user.uid) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
          })
        );
        setSuccess("Logged in successfully");
        router.push("/editor");
      } else {
        setError("Failed to retrieve user information");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading, error, success };
};

