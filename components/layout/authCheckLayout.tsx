"use client";
import { useAuthUser } from "@/hooks/useAuth";
import React, { ReactNode } from "react";
import FullScreenLoading from "../loading/fullscreen.loading";
import useAnalytics from "@/hooks/useAnalytics";

interface AuthCheckLayoutProps {
  children: ReactNode;
}

const AuthCheckLayout: React.FC<AuthCheckLayoutProps> = ({ children }) => {
  const { loading } = useAuthUser();

  useAnalytics();
  if (loading) return <FullScreenLoading />;
  return <div>{children}</div>;
};

export default AuthCheckLayout;
