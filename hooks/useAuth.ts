import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  setUser,
  setLoading,
  logout,
  setSubscribed,
  setEndDate,
} from "@/state/slice/user.slice";
import { useCarouselManager } from "./useCarouselManager";

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const { getCarouselDetailsById, loading: saveLoading } = useCarouselManager();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const carouselId = searchParams.get("id");

  useEffect(() => {
    getAllInitialData();
  }, [session, status, dispatch, carouselId]);
  const getAllInitialData = async () => {
    await dispatch(setLoading(status === "loading"));
    if (carouselId) {
      await getCarouselDetailsById(carouselId);
    }
    if (session?.user) {
      await dispatch(
        setUser({
          uid: session.user.id,
          email: session.user.email || "",
          displayName: session.user.name || "",
          photoURL: session.user.image || "",
        })
      );
      await fetchSubscriptionStatus(session.user.id, dispatch);
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
    await dispatch(setLoading(false));
  };
  return {
    user: session?.user,
    loading: status === "loading",
  };
};

const fetchSubscriptionStatus = async (userId: string, dispatch: any) => {
  try {
    const response = await fetch(`/api/subscriptions?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch subscription status");
    }
    const data = await response.json();
    dispatch(setSubscribed(data.isSubscribed));
    dispatch(setEndDate(data.endDate));
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    dispatch(setSubscribed(false));
    dispatch(setEndDate(null));
  }
};
export const useGoogleLogin = () => {
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/editor" });
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { loginWithGoogle };
};

export const useLogout = () => {
  const router = useRouter();

  const logoutUser = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return { logout: logoutUser };
};
