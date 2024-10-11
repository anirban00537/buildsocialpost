import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, logout } from "@/state/slice/user.slice";
import { useEffect } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setUser({
          uid: session.user.id,
          email: session.user.email,
          displayName: session.user.name,
          photoURL: session.user.image,
        })
      );
    }
  }, [status, session, dispatch]);

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/editor" });
    } catch (error) {
      console.error("Failed to log in with Google", error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      dispatch(logout());
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    loginWithGoogle,
    logoutUser,
  };
};
