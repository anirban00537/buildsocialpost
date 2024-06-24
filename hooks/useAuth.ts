import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { account, ID } from "@/lib/appwrite";
import { logout, setLoading, setUser } from "@/state/slice/user.slice";
import { useRouter } from "next/navigation";
import { RootState } from "@/state/store";

const useLogout = () => {
  const [loading, setLoadingState] = useState(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      setLoadingState(true);
      await account.deleteSession("current");
      dispatch(logout());
    } catch (error: any) {
      setError(error.message || "Logout failed. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  return { logout: logoutUser, loading, error };
};

const useAuthUser = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const { loading, userinfo: user } = useSelector(
    (state: RootState) => state.user
  );

  const fetchUser = async () => {
    try {
      dispatch(setLoading(true));
      const user = await account.get();
      dispatch(setUser(user));
    } catch (error: any) {
      setError(error.message || "Failed to fetch the current user.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  return { error, user, loading, fetchUser };
};

const useMagicLinkLogin = () => {
  const [loading, setLoadingState] = useState(false);
  const [error, setError] = useState<string>("");
  const sendMagicLink = async (email: string) => {
    try {
      setLoadingState(true);
      const redirectURL = `${window.location.origin}/magic-url-callback`;
      await account.createMagicURLToken(ID.unique(), email, redirectURL);
    } catch (error: any) {
      setError(error.message || "Failed to send magic link. Please try again.");
    } finally {
      setLoadingState(false);
    }
  };

  return { sendMagicLink, loading, error };
};

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
  }, [dispatch, router]);

  return { loading, success, error };
};

export { useMagicLinkLogin, useLogout, useAuthUser, useMagicURLCallback };
