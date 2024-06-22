"use client";
import { Button } from "@/components/ui/button";
import { useLogin, useLogout, useSignup, useAuthUser } from "@/hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { signup, loading: signupLoading, error: signupError } = useSignup();
  const { logout, loading: logoutLoading, error: logoutError } = useLogout();
  const {
    user: loggedInUser,
    loading: userLoading,
    error: userError,
  } = useAuthUser();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      setSuccess("Login successful!");
    } catch (error) {
      setSuccess("");
    }
  };

  const handleSignup = async () => {
    try {
      const user = await signup(email, password, name);
      setSuccess("Registration successful! Logging you in...");
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
        {loggedInUser ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              Logged in as {loggedInUser.name}
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
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-2 font-semibold transition-colors duration-300 ${
                  activeTab === "login"
                    ? "text-blue-600 border-b-4 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 font-semibold transition-colors duration-300 ${
                  activeTab === "register"
                    ? "text-blue-600 border-b-4 border-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </div>
            {loginError && (
              <p className="text-center text-red-500">{loginError}</p>
            )}
            {signupError && (
              <p className="text-center text-red-500">{signupError}</p>
            )}
            {success && <p className="text-center text-green-500">{success}</p>}
            {activeTab === "login" ? (
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                />
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="w-full"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            ) : (
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                />
                <Button
                  type="button"
                  onClick={handleSignup}
                  className="w-full"
                  disabled={signupLoading}
                >
                  {signupLoading ? "Registering..." : "Register"}
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
