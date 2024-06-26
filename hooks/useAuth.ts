import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { account, databases, ID, Query } from "@/lib/appwrite";
import {
  logout,
  setEndDate,
  setLoading,
  setSubscribed,
  setUser,
} from "@/state/slice/user.slice";
import { useRouter } from "next/navigation";
import { RootState } from "@/state/store";
import { useQuery, useMutation, useQueryClient } from "react-query";
import colorPresets from "@/lib/color-presets";
import { setBackground } from "@/state/slice/carousel.slice";

// Function to fetch user data
const getUser = async () => {
  return await account.get();
};

// Function to fetch subscription status
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
    return { isSubscribed: !isExpired, endDate };
  } else {
    return { isSubscribed: false, endDate: null };
  }
};

// Hook for logging out the user
const useLogout = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const { mutate: logoutUser, isLoading: loading } = useMutation(
    async () => await account.deleteSession("current"),
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
      dispatch(setUser(data));
    },
    onError: (error: any) => {
      setError(error.message || "Failed to fetch the current user.");
    },
  });

  const userId = userData?.$id;

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

// Hook for sending a magic link to the user's email
const useMagicLinkLogin = () => {
  const [error, setError] = useState<string>("");

  const { mutate: sendMagicLink, isLoading: loading } = useMutation(
    async (email: string) => {
      const redirectURL = `${window.location.origin}/magic-url-callback`;
      await account.createMagicURLToken(ID.unique(), email, redirectURL);
    },
    {
      onError: (error: any) => {
        setError(
          error.message || "Failed to send magic link. Please try again."
        );
      },
    }
  );

  return { sendMagicLink, loading, error };
};

// Hook for handling the magic URL callback and creating a session
const useMagicURLCallback = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { fetchUser } = useAuthUser();

  const [loading, setLoadingState] = useState(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const createSessionFromURL = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get("secret");
      const userId = urlParams.get("userId");

      if (secret && userId) {
        try {
          await account.createSession(userId, secret);
          fetchUser();
          setSuccess("Logged in successfully!");
          router.push("/editor");
        } catch (error: any) {
          setError(error.message || "Failed to log in. Please try again.");
        } finally {
          setLoadingState(false);
        }
      } else {
        setError("Invalid login attempt.");
        setLoadingState(false);
      }
    };

    createSessionFromURL();
  }, [dispatch, router, fetchUser]);

  return { loading, success, error };
};

export { useMagicLinkLogin, useLogout, useAuthUser, useMagicURLCallback };
