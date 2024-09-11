import { useEffect, useState } from "react";
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
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;
  const carouselId = searchParams?.get("id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllInitialData();
  }, [session, status, dispatch, carouselId]);

  const getAllInitialData = async () => {
    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      if (carouselId && session?.user) {
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
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return {
    user: session?.user,
    loading: isLoading || status === "loading",
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
