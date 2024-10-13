import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setUser,
  logout,
  setSubscribed,
  setEndDate,
} from "@/state/slice/user.slice";
import { useEffect } from "react";

interface Subscription {
  id: string;
  status: string;
  productName: string;
  variantName: string;
  endDate: string;
  subscriptionLengthInMonths: number;
}

interface SubscriptionResponse {
  hasActiveSubscription: boolean;
  subscription: Subscription | null;
}

const fetchSubscription = async (): Promise<SubscriptionResponse> => {
  const { data } = await axios.get<SubscriptionResponse>(
    `/api/subscriptions/check-subscription`
  );
  return data;
};

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    refetch: refetchSubscription,
  } = useQuery<SubscriptionResponse, Error>(
    ["subscription"],
    fetchSubscription,
    {
      enabled: !!session?.user?.id,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      onSuccess: (data: SubscriptionResponse) => {
        dispatch(setSubscribed(data.hasActiveSubscription));
        dispatch(setEndDate(data.subscription?.endDate || null));
      },
      onError: (error: Error) => {
        toast.error(`Failed to fetch subscription: ${error.message}`);
      },
    }
  );

  const loginMutation = useMutation(
    () => signIn("google", { callbackUrl: "/editor", redirect: false }),
    {
      onSuccess: (result) => {
        if (result?.error) {
          toast.error(`Failed to log in: ${result.error}`);
        } else if (result?.ok) {
          toast.success("Logged in successfully");
          // Optionally, you can refresh the session here
          // router.push('/editor');
        }
      },
      onError: (error: Error) => {
        toast.error(`Failed to log in with Google: ${error.message}`);
      },
    }
  );

  const logoutMutation = useMutation(() => signOut({ callbackUrl: "/" }), {
    onSuccess: () => {
      queryClient.clear(); // Clear all queries on logout
      dispatch(logout());
      toast.success("Logged out successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to log out: ${error.message}`);
    },
  });

  const loginWithGoogle = async () => {
    await loginMutation.mutateAsync();
  };

  const logoutUser = () => {
    logoutMutation.mutate();
  };
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setUser({
          uid: session.user.email,
          email: session.user.email,
          displayName: session.user.name,
          photoURL: session.user.image,
        })
      );
    }
  }, [status, session, dispatch]);
  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    loginWithGoogle,
    logoutUser,
    subscriptionData,
    isSubscriptionLoading,
    refetchSubscription,
    isLoginLoading: loginMutation.isLoading,
    isLogoutLoading: logoutMutation.isLoading,
  };
};
