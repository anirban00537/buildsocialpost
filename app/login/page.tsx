"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import { useAuthUser, useLogout, useMagicLinkLogin } from "@/hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string>("");
  const dispatch = useDispatch();
  const {
    sendMagicLink,
    loading: magicLinkLoading,
    error: magicLinkError,
  } = useMagicLinkLogin();
  const { logout, loading: logoutLoading, error: logoutError } = useLogout();
  const { loading: userLoading, error: userError } = useAuthUser();
  const user: any = useSelector((state: RootState) => state.user.userinfo);
  const loggedIn = useSelector((state: RootState) => state.user.loggedin);

  const handleSendMagicLink = async () => {
    try {
      await sendMagicLink(email);
      setSuccess("Magic link sent! Check your email.");
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
                Magic Link Login
              </p>
            </div>
            {magicLinkError && (
              <p className="text-center text-red-500">{magicLinkError}</p>
            )}
            {success && <p className="text-center text-green-500">{success}</p>}
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
              <Button
                type="button"
                onClick={handleSendMagicLink}
                className="w-full"
                disabled={magicLinkLoading}
              >
                {magicLinkLoading ? "Sending magic link..." : "Send Magic Link"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
