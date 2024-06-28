"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import { useAuthUser, useLogout, useGoogleLogin } from "@/hooks/useAuth";

const LoginPage = () => {
  const [success, setSuccess] = useState<string>("");
  const dispatch = useDispatch();
  const {
    loginWithGoogle,
    loading: googleLoginLoading,
    error: googleLoginError,
  } = useGoogleLogin();
  const { logout, loading: logoutLoading, error: logoutError } = useLogout();
  const { loading: userLoading, error: userError } = useAuthUser();
  const user: any = useSelector((state: RootState) => state.user.userinfo);
  const loggedIn = useSelector((state: RootState) => state.user.loggedin);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setSuccess("Logged in successfully!");
    } catch (error) {
      setSuccess("");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setSuccess("");
    } catch (error) {
      setSuccess("");
    }
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        {loggedIn ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              Logged in as {user.email}
            </p>
            <Button
              className="w-full mt-4"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </Button>
            {success && <p className="mt-4 text-green-500">{success}</p>}
            {logoutError && <p className="mt-4 text-red-500">{logoutError}</p>}
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-800">
                Google Login
              </p>
            </div>
            {googleLoginError && (
              <p className="text-center text-red-500">{googleLoginError}</p>
            )}
            {success && <p className="text-center text-green-500">{success}</p>}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full"
              disabled={googleLoginLoading}
            >
              {googleLoginLoading
                ? "Logging in with Google..."
                : "Login with Google"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
