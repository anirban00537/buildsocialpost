"use client";
import EditorBody from "@/components/editor/body/Body.editor.comp";
import React, { useState, useEffect } from "react";
import MainSidebar, { TabName } from "@/components/editor/sidebar/Main.comp";
import EditorNavbar from "@/components/editor/navbar/Editor-Navbar.comp";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("ai-settings");

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

  return (
    <div className="h-screen flex flex-col">
      <EditorNavbar />
      <div className="flex-1 pt-14">
        <div className="h-full relative">
          <EditorBody />
          <MainSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
