import { signIn, signOut as nextAuthSignOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

export const signInWithGoogle = () => signIn("google");

export const signOut = () => nextAuthSignOut();

export const useAuth = () => {
  const { data: session, status } = useSession();
  return {
    user: session?.user || null,
    loading: status === "loading",
  };
};

export const getCurrentUser = async (): Promise<Session["user"] | null> => {
  const { data: session } = useSession();
  return session?.user || null;
};

