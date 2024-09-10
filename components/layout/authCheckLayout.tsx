"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import FullScreenLoading from "../loading/fullscreen.loading";
import useAnalytics from "@/hooks/useAnalytics";

interface AuthCheckLayoutProps {
  children: ReactNode;
}

const AuthCheckLayout: React.FC<AuthCheckLayoutProps> = ({ children }) => {
  const { status } = useSession();

  useAnalytics();

  return (
    <div>
      {status === "loading" && <FullScreenLoading />}
      {children}
    </div>
  );
};

export default AuthCheckLayout;
