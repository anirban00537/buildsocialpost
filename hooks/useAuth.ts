import { useEffect, useState } from "react";
import { account, ID } from "@/lib/appwrite";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const logout = async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
    } catch (error: any) {
      setError(error.message || "Logout failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};
const useAuthUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const user = await account.get();
        setUser(user);
      } catch (error: any) {
        setError(error.message || "Failed to fetch the current user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
const useMagicLinkLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const sendMagicLink = async (email: string) => {
    try {
      setLoading(true);
      const redirectURL = `${window.location.origin}/magic-url-callback`;
      await account.createMagicURLToken(ID.unique(), email, redirectURL);
    } catch (error: any) {
      setError(error.message || "Failed to send magic link. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { sendMagicLink, loading, error };
};
export { useMagicLinkLogin, useLogout, useAuthUser };
