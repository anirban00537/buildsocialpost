import React from "react";
import { Wand2, User, Type, Palette, Shapes, Image, X, ImageIcon } from "lucide-react";
import AiSettingsComponent from "./Ai.comp";
import BrandingSection from "./Branding.comp";
import TextSettingsSection from "./Text-Settings.comp";
import BackgroundColorsSection from "./Background.comp";
import BackgroundPatternsAndElements from "./Background-Patterns-Elements.comp";
import BackgroundImagesSection from "./Background-ImagesSection";

export type TabName = "ai-settings" | "branding" | "text-settings" | "background" | "patterns-elements" | "background-images";

export const EDITOR_TABS = [
  { name: "ai-settings" as TabName, icon: <Wand2 size={20} />, label: "AI" },
  { name: "branding" as TabName, icon: <User size={20} />, label: "Brand" },
  { name: "text-settings" as TabName, icon: <Type size={20} />, label: "Text" },
  { name: "background" as TabName, icon: <Palette size={20} />, label: "Color" },
  { name: "patterns-elements" as TabName, icon: <Shapes size={20} />, label: "Elements" },
  { name: "background-images" as TabName, icon: <Image size={20} />, label: "Images" },
] as const;

interface MainSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
}) => {
  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
    setIsCollapsed(false);
  };

  return (
    <div className="fixed left-[288px] z-50 top-0 h-screen flex">
      {/* Tools Bar - Vertical */}
      <div className="w-[60px] h-full bg-white border-r border-gray-100 flex flex-col items-center py-4">
        {EDITOR_TABS.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`w-10 h-10 mb-2 rounded-lg flex items-center justify-center transition-all duration-200
              ${activeTab === tab.name 
                ? "bg-blue-50 text-blue-600" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Content Panel - Slides out */}
      {!isCollapsed && activeTab && (
        <div className="w-[380px] h-full bg-white border-r border-gray-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              {EDITOR_TABS.find(tab => tab.name === activeTab)?.icon}
              <span className="text-sm font-medium">
                {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="p-4">
              {activeTab === "ai-settings" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">AI Content Generator</h3>
                  <AiSettingsComponent />
                </div>
              )}
              {activeTab === "branding" && <BrandingSection />}
              {activeTab === "text-settings" && <TextSettingsSection />}
              {activeTab === "background" && <BackgroundColorsSection />}
              {activeTab === "patterns-elements" && <BackgroundPatternsAndElements />}
              {activeTab === "background-images" && <BackgroundImagesSection />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
