"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import FullScreenLoading from "../loading/Fullscreen.loading.comp";
import useBranding from "@/hooks/useBranding";
import { setBackground, setNewCarousel } from "@/state/slice/carousel.slice";
import { useDispatch } from "react-redux";
import { darkColorPresets, lightColorPresets } from "@/lib/color-presets";

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  useBranding();
  const dispatch = useDispatch();

  const chooseColorFromColorPalette = useCallback(() => {
    const lightPreset =
      lightColorPresets[Math.floor(Math.random() * lightColorPresets.length)];
    const darkPreset =
      darkColorPresets[Math.floor(Math.random() * darkColorPresets.length)];
    const randomPreset = Math.random() < 0.5 ? lightPreset : darkPreset;
    dispatch(setBackground(randomPreset));
  }, [dispatch]);

  useEffect(() => {
    if (pathname) {
      dispatch(setNewCarousel());
      chooseColorFromColorPalette();
    }
  }, [pathname, dispatch, chooseColorFromColorPalette]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
