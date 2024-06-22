"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

const MagicURLCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const createSessionFromURL = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get("secret");
      const userId = urlParams.get("userId");

      if (secret && userId) {
        try {
          await account.createSession(userId, secret);
          setSuccess("Logged in successfully!");
          router.push("/");
        } catch (error: any) {
          setError(error.message || "Failed to log in. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid login attempt.");
        setLoading(false);
      }
    };

    createSessionFromURL();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        {success && <p className="text-center text-green-500">{success}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default MagicURLCallback;
