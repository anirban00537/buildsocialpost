"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import FullScreenLoading from "../loading/fullscreen.loading";
import useBranding from "@/hooks/useBranding";
import { setBackground, setNewCarousel } from "@/state/slice/carousel.slice";
import { useDispatch } from "react-redux";
import { darkColorPresets, lightColorPresets } from "@/lib/color-presets";

const AuthCheckLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useBranding();
  const dispatch = useDispatch();
  const editorParam = searchParams.get("editor");

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
      if (!editorParam) chooseColorFromColorPalette();
    }
  }, [pathname, searchParams, dispatch, chooseColorFromColorPalette]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};

export default AuthCheckLayout;
