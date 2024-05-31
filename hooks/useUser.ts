"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged, getIdTokenResult } from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  token: string | null;
  claims: { [key: string]: any } | null;
}

const useUser = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [claims, setClaims] = useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        setToken(idTokenResult.token);
        setClaims(idTokenResult.claims);
      } else {
        setToken(null);
        setClaims(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, token, claims };
};

export default useUser;
