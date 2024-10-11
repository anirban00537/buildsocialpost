"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FullScreenLoading from "../loading/fullscreen.loading";
import useBranding from "@/hooks/useBranding";

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  useBranding();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
