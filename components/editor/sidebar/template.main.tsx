import useCarousel from "@/hooks/useCarousel";
import React from "react";

const TemplateSection = () => {
  const { selectedTheme, handleThemeChange } = useCarousel();
  return (
    <form className="grid w-full items-start gap-6 p-4">
      <legend className="-ml-1 px-1 text-2xl font-medium mb-4">Template</legend>
      <div className="grid gap-3">
        <div
          className="border p-3 text-center"
          onClick={() => handleThemeChange("theme1")}
        >
          theme 1
        </div>
        <div
          className="border p-3 text-center"
          onClick={() => handleThemeChange("theme2")}
        >
          theme 2
        </div>
        <div
          className="border p-3 text-center"
          onClick={() => handleThemeChange("theme3")}
        >
          theme 3
        </div>
        <div
          className="border p-3 text-center"
          onClick={() => handleThemeChange("theme4")}
        >
          theme 4
        </div>
        <div
          className="border p-3 text-center"
          onClick={() => handleThemeChange("theme5")}
        >
          theme 5
        </div>
      </div>
    </form>
  );
};

export default TemplateSection;
