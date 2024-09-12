import React, { useState } from "react";
import { Airplay, PenTool, Type, Image } from "lucide-react";
import AiSettingsComponent from "./ai.main";
import BrandingSection from "./branding.main";
import TextSettingsSection from "./text-settings.main";
import BackgroundColorsSection from "./background.main";

const MainSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ai-settings");

  return (
    <aside className="flex flex-col md:flex-row h-screen w-full md:w-[420px] border border-borderColor bg-background">
      <div className="md:sticky md:top-0 w-full md:w-[70px] order-first md:order-first border-r border-borderColor bg-background shadow-md">
        <div className="flex md:flex-col w-full h-full justify-start items-center md:border-r border-b md:border-b-0 border-borderColor">
          {[
            { name: "ai-settings", icon: <Airplay size={24} /> },
            { name: "branding", icon: <PenTool size={24} /> },
            { name: "text-settings", icon: <Type size={24} /> },
            { name: "background", icon: <Image size={24} /> },
          ].map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center justify-center p-4 w-full md:w-auto transition-colors my-2 rounded-lg duration-200 ${
                activeTab === tab.name
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              <span className="md:hidden ml-2 capitalize">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      <aside className="flex-1 border border-borderColor border-l-0 bg-background overflow-hidden transition-all transform">
        {activeTab === "ai-settings" && <AiSettingsComponent />}
        {activeTab === "branding" && <BrandingSection />}
        {activeTab === "text-settings" && <TextSettingsSection />}
        {activeTab === "background" && <BackgroundColorsSection />}
      </aside>
    </aside>
  );
};

export default MainSidebar;
