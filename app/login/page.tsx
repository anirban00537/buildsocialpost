"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg border">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
        <div className="relative flex items-center justify-center w-full mt-6">
          <span className="absolute px-2 text-gray-500 bg-white">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded hover:from-red-600 hover:to-red-500 focus:outline-none focus:ring focus:ring-red-300"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
