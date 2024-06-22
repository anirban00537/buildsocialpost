import { useState, useEffect } from "react";
import { account, ID } from "@/lib/appwrite";

// Custom hooks

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return user;
    } catch (error: any) {
      setError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      await account.create(ID.unique(), email, password, name);
      const user = await account.get();
      return user;
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

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

export { useLogin, useSignup, useLogout, useAuthUser };
