"use client";
import { useGoogleLogin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { loginWithGoogle } = useGoogleLogin();

  return (
    <main className="w-full min-h-screen flex bg-gradient-to-r from-primary/10 to-secondary/10 flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border p-8 rounded-lg shadow-xl text-gray-600 space-y-6">
        <div className="text-center">
          <img src="/logo.svg" width={150} className="mx-auto" alt="Logo" />
          <h1 className="text-gray-800 text-3xl font-bold sm:text-4xl">
            Log in to your account
          </h1>
        </div>
        <Button onClick={loginWithGoogle} className="w-full">
          Sign in with Google
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
