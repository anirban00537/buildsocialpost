"use client";
import React from "react";
import { useGoogleLogin } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const LoginPage: React.FC = () => {
  const {
    loginWithGoogle,
    loading: googleLoginLoading,
    error: googleLoginError,
    success: googleLoginSuccess,
  } = useGoogleLogin();

  const handleGoogleLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    loginWithGoogle();
  };

  return (
    <main className="w-full min-h-screen flex bg-gradient-to-r from-primary/10 to-secondary/10 flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border p-8 rounded-lg shadow-xl text-gray-600 space-y-6">
        <div className="text-center">
          <img src="/logo.svg" width={150} className="mx-auto" alt="Logo" />
          <div className="mt-5 space-y-2">
            <h1 className="text-gray-800 text-3xl font-bold sm:text-4xl">
              Log in to your account
            </h1>
            <p className="">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="relative my-6">
          <span className="block w-full h-px bg-gray-300"></span>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {googleLoginError && (
            <Alert variant="destructive">
              <AlertDescription>{googleLoginError}</AlertDescription>
            </Alert>
          )}
          {googleLoginSuccess && (
            <Alert>
              <AlertDescription>{googleLoginSuccess}</AlertDescription>
            </Alert>
          )}
          <Button
            className="w-full flex items-center justify-center gap-x-3 py-3"
            onClick={handleGoogleLogin}
            disabled={googleLoginLoading}
            aria-label="Sign in with Google"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {googleLoginLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Continue with Google"
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
