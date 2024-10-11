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

const fetchSubscription = async (
  userId: string
): Promise<SubscriptionResponse> => {
  const { data } = await axios.get<SubscriptionResponse>(
    `/api/check-subscription?userId=${userId}`
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
    ["subscription", session?.user?.id],
    () => fetchSubscription(session?.user?.id as string),
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
    () => signIn("google", { callbackUrl: "/editor" }),
    {
      onSuccess: () => {
        if (session?.user) {
          dispatch(
            setUser({
              uid: session.user.id,
              email: session.user.email,
              displayName: session.user.name,
              photoURL: session.user.image,
            })
          );
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

  const loginWithGoogle = () => {
    loginMutation.mutate();
  };

  const logoutUser = () => {
    logoutMutation.mutate();
  };

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
