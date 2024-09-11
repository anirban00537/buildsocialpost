import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { setUser, setLoading, logout } from "@/state/slice/user.slice";

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    dispatch(setLoading(status === "loading"));
    console.log(session, "sssssssssssssssssssssss");
    
    if (session?.user) {
      dispatch(setUser({
        uid: session.user.id,
        email: session.user.email || "",
        displayName: session.user.name || "",
        photoURL: session.user.image || "",
      }));
    } else if (status === "unauthenticated") {
      dispatch(logout());
    }
  }, [session, status, dispatch]);

  return {
    user: session?.user,
    loading: status === "loading",
  };
};

export const useGoogleLogin = () => {
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signIn("google", { callbackUrl: "/editor" });
      console.log(result, "result");
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
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      dispatch({ type: "user/logout" }); // Dispatch a plain object action
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { logout: logoutUser };
};
