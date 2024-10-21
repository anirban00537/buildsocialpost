"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import FullScreenLoading from "../loading/fullscreen.loading";
import useBranding from "@/hooks/useBranding";
import { setNewCarousel } from "@/state/slice/carousel.slice";
import { useDispatch } from "react-redux";

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  useBranding();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname) {
      dispatch(setNewCarousel());
    }
  }, [pathname]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
