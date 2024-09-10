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
import { setBranding } from "@/state/slice/branding.slice";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  fetchSubscriptionStatus,
  fetchBrandingSettings,
} from "@/services/firestore";

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
  const { data: session, status } = useSession();

  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    error: subscriptionError,
  } = useQuery(
    ["subscriptionStatus", session?.user?.id],
    () =>
      session?.user?.id
        ? fetchSubscriptionStatus(session.user.id, session.user.id)
        : Promise.reject(new Error("User ID is undefined")),
    {
      enabled: !!session?.user?.id,
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
    ["brandingSettings", session?.user?.id],
    () =>
      session?.user?.id
        ? fetchBrandingSettings(session.user.id, session.user.id)
        : Promise.reject(new Error("User ID is undefined")),
    {
      enabled: !!session?.user?.id,
      onSuccess: (data) => {
        dispatch(setBranding(data));
      },
      onError: (error: Error) => {
        setError(error.message || "Failed to fetch branding settings.");
      },
    }
  );

  useEffect(() => {
    dispatch(
      setLoading(status === "loading" || subscriptionLoading || brandingLoading)
    );
  }, [status, subscriptionLoading, brandingLoading, dispatch]);

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          uid: session.user.id,
          email: session.user.email || "",
          displayName: session.user.name || "",
          photoURL: session.user.image || "",
        })
      );
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return {
    error: error || subscriptionError?.message || brandingError?.message,
    user: session?.user,
    loading: status === "loading" || subscriptionLoading || brandingLoading,
  };
};

export const useGoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await signIn("google", { callbackUrl: "/editor" });
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess("Logged in successfully");
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
