import React from "react";
import AiSettingsComponent from "./Ai.comp";
import BrandingSection from "./Branding.comp";
import TextSettingsSection from "./Text-Settings.comp";
import BackgroundColorsSection from "./Background.comp";
import BackgroundPatternsAndElements from "./Background-Patterns-Elements.comp";
import BackgroundImagesSection from "./Background-ImagesSection";
import Bottombar from "./Bottom-bar.comp";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MainSidebarProps {
  onCollapse: () => void;
  isCollapsed: boolean;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ onCollapse, isCollapsed }) => {
  const settingsSections = [
    {
      component: <AiSettingsComponent />,
    },
    {
      component: <BrandingSection />,
    },
    {
      component: <TextSettingsSection />,
    },
    {
      component: <BackgroundColorsSection />,
    },
    {
      component: <BackgroundPatternsAndElements />,
    },
    {
      component: <BackgroundImagesSection />,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Add collapse button */}
      <button
        onClick={onCollapse}
        className="absolute -left-10 top-4 p-2 bg-white rounded-l-lg shadow-md
          hover:bg-gray-50 transition-colors duration-200"
      >
        <ChevronLeft
          className={`w-5 h-5 text-gray-600 transition-transform duration-300
            ${isCollapsed ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {settingsSections.map((section, index) => (
            <div key={index} className="space-y-2">
              {section.component}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navbar */}
      <Bottombar />
    </div>
  );
};

export default MainSidebar;
