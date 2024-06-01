import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/editor");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/editor");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    handleLogin,
    handleGoogleLogin,
    error,
    setEmail,
    setPassword,
    email,
    password,
  };
};

const useSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/editor");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { handleSignup, error, setEmail, setPassword, email, password };
};
const useLogout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Error logging out: ", err.message);
    }
  };

  return { handleLogout };
};

export { useLogin, useSignup, useLogout };
