"use client";
import EditorBody from "@/components/editor/body/Body.editor.comp";
import React, { useState, useEffect } from "react";
import MainSidebar from "@/components/editor/sidebar/Main.comp";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import FullScreenLoading from "@/components/utils-components/loading/Fullscreen.loading.comp";
import LoadingSection from "@/components/utils-components/loading/LoadingSection.comp";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoadingCarouselDetails } = useCarouselManager();
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsCollapsed(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!isLoadingCarouselDetails) setIsLoading(false);
  }, [isLoadingCarouselDetails]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex">
        {/* Main Content */}
        {isLoading ? (
          <LoadingSection />
        ) : (
          <main
            className={`flex-1 max-h-full p-5  overflow-hidden overflow-y-scroll main-bgs relative transition-all duration-300 ease-in-out`}
        >
          <div className="mt-2 w-full max-w-[calc(100vw-390px)] mx-auto">
            <EditorBody isCollapsed={isCollapsed} />
            </div>
          </main>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out
            ${isCollapsed ? "translate-x-full" : "translate-x-0"}
            w-[390px] shadow-lg z-50
          `}
        >
          <MainSidebar onCollapse={toggleSidebar} isCollapsed={isCollapsed} />
        </aside>

        {/* Overlay for mobile */}
        {!isCollapsed && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
