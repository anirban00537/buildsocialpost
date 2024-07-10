"use client";
import { useAuthUser } from "@/hooks/useAuth";
import React from "react";
import FullScreenLoading from "../loading/fullscreen.loading";
const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuthUser();

  return (
    <div>
      {loading && <FullScreenLoading />}
      {children}
    </div>
  );
};

export default AuthCheckLayout;
