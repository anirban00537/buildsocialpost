"use client";

import { useMagicURLCallback } from "@/hooks/useAuth";

const MagicURLCallback = () => {
  const { loading, success, error } = useMagicURLCallback();

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
