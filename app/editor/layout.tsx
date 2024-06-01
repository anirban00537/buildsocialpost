"use client";
import React, { useState } from "react";
import {
  Home,
  FileText,
  Folder,
  Image,
  BarChart2,
  Settings,
  User,
  ChevronDown,
  Search,
  Bell,
  Grid,
  MoreVertical,
  LogOut,
  X,
  Github,
} from "lucide-react";
import MainSidebar from "@/components/editor/sidebar/main.sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const toggleSettingsPanel = () =>
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  const toggleSearchBox = () => setIsSearchBoxOpen(!isSearchBoxOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <MainSidebar />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
              <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
                BuildCarousel
              </span>
            </div>

            <div className="relative flex items-center space-x-3">
              <div className="hidden space-x-3 md:flex">
                <div className="relative">
                  <button className="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                      alt="User"
                    />
                  </button>
                  <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
                  <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
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

      {isSettingsPanelOpen && (
        <div
          className="fixed inset-y-0 right-0 flex flex-col bg-white shadow-lg bg-opacity-20 w-80"
          style={{ backdropFilter: "blur(14px)" }}
        >
          <div className="flex items-center justify-between flex-shrink-0 p-2">
            <h6 className="p-2 text-lg">Settings</h6>
            <button
              onClick={toggleSettingsPanel}
              className="p-2 rounded-md focus:outline-none focus:ring"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 max-h-full p-4 overflow-hidden hover:overflow-y-scroll">
            <span>Settings Content</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
