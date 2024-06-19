"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import MainSidebar from "@/components/editor/sidebar/main.sidebar";
import EditorNavbar from "@/components/editor/navbar/navbar.editor";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const toggleSettingsPanel = () =>
    setIsSettingsPanelOpen(!isSettingsPanelOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <EditorNavbar />
        <div className="md:flex flex-col items-center justify-center md:items-start md:justify-start md:flex-grow-0 md:flex-basis-1/3 md:mt-[63px] md:fixed md:top-0 md:left-0 md:h-screen z-30">
          <MainSidebar />
        </div>
        <main className="flex-1 max-h-full p-5 ml-[390px]  overflow-hidden overflow-y-scroll">
          <div>{children}</div>
        </main>
      </div>
      <div>
        <button
          onClick={toggleSettingsPanel}
          className="fixed right-0 px-4 py-2 text-sm font-medium text-white uppercase transform rotate-90 translate-x-8 bg-gray-600 top-1/2 rounded-b-md"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Layout;
