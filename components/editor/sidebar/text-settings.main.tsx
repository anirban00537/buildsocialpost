import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  setTitleTextSettings,
  setDescriptionTextSettings,
  setTaglineTextSettings,
  setFontFamily,
} from "@/state/slice/carousel.slice";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fontOptions } from "@/lib/fonts";

const TextSettingsSection = () => {
  const dispatch = useDispatch();
  const fontFamily = useSelector((state: RootState) => state.slides.fontFamily);
  const titleTextSettings = useSelector((state: RootState) => state.slides.titleTextSettings);
  const descriptionTextSettings = useSelector((state: RootState) => state.slides.descriptionTextSettings);
  const taglineTextSettings = useSelector((state: RootState) => state.slides.taglineTextSettings);

  const [selectedSection, setSelectedSection] = useState<"title" | "description" | "tagline">("title");

  const textSettings =
    selectedSection === "title"
      ? titleTextSettings
      : selectedSection === "description"
      ? descriptionTextSettings
      : taglineTextSettings;

  const [fontSize, setFontSize] = useState(textSettings.fontSize);
  const [fontStyle, setFontStyle] = useState(textSettings.fontStyle || "normal");
  const [fontWeight, setFontWeight] = useState<number>(
    typeof textSettings.fontWeight === "number" ? textSettings.fontWeight : textSettings.fontWeight === "bold" ? 700 : 400
  );
  const [selectedWeight, setSelectedWeight] = useState(fontWeight === 700 || fontWeight > 500 ? "bold" : "normal");

  const handleSectionChange = (section: "title" | "description" | "tagline") => {
    setSelectedSection(section);
    const newTextSettings = section === "title" ? titleTextSettings : section === "description" ? descriptionTextSettings : taglineTextSettings;
    setFontSize(newTextSettings.fontSize);
    setFontStyle(newTextSettings.fontStyle);
    setFontWeight(typeof newTextSettings.fontWeight === "number" ? newTextSettings.fontWeight : newTextSettings.fontWeight === "bold" ? 700 : 400);
    setSelectedWeight(newTextSettings.fontWeight === "bold" ? "bold" : "normal");
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({ ...titleTextSettings, fontSize: size })
        : selectedSection === "description"
        ? setDescriptionTextSettings({ ...descriptionTextSettings, fontSize: size })
        : setTaglineTextSettings({ ...taglineTextSettings, fontSize: size })
    );
  };

  const handleFontStyleChange = (style: "normal" | "italic") => {
    setFontStyle(style);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({ ...titleTextSettings, fontStyle: style })
        : selectedSection === "description"
        ? setDescriptionTextSettings({ ...descriptionTextSettings, fontStyle: style })
        : setTaglineTextSettings({ ...taglineTextSettings, fontStyle: style })
    );
  };

  const handleWeightTabChange = (weight: "normal" | "bold") => {
    setSelectedWeight(weight);
    const newWeight = weight === "bold" ? 700 : 400;
    setFontWeight(newWeight);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({ ...titleTextSettings, fontWeight: newWeight })
        : selectedSection === "description"
        ? setDescriptionTextSettings({ ...descriptionTextSettings, fontWeight: newWeight })
        : setTaglineTextSettings({ ...taglineTextSettings, fontWeight: newWeight })
    );
  };

  const handleAlignmentChange = (alignment: "left" | "center" | "right") => {
    dispatch(setTitleTextSettings({ ...titleTextSettings, alignment }));
    dispatch(setDescriptionTextSettings({ ...descriptionTextSettings, alignment }));
    dispatch(setTaglineTextSettings({ ...taglineTextSettings, alignment }));
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    dispatch(setFontFamily(fontFamily));
  };

  return (
    <div className="w-full h-full p-4 flex flex-col bg-background/50 backdrop-blur-sm">
      <legend className="text-base font-semibold text-textColor mb-3">Text Settings</legend>
      <div className="flex-grow overflow-y-auto pr-2 mb-4 space-y-4">
        <div className="flex gap-2">
          {["title", "description", "tagline"].map((section) => (
            <Button
              key={section}
              type="button"
              size="sm"
              className={`text-xs px-2 py-1 border border-borderColor/50 rounded-md ${
                selectedSection === section
                  ? "bg-primary/80 text-white"
                  : "bg-cardBackground/50 text-textColor hover:bg-primary/20"
              }`}
              onClick={() => handleSectionChange(section as any)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Font Size</label>
          <div className="flex items-center gap-2">
            <Slider
              max={88}
              min={10}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => handleFontSizeChange(value[0])}
              className="flex-grow"
            />
            <span className="text-xs font-medium text-textColor/80 w-8 text-right">{fontSize}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Font Style</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              type="button"
              className={`text-xs border border-borderColor/50 p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                fontStyle === "normal"
                  ? "bg-primary/80 text-white"
                  : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
              }`}
              onClick={() => handleFontStyleChange("normal")}
            >
              <BoldIcon size={14} />
            </Button>
            <Button
              size="sm"
              type="button"
              className={`text-xs border border-borderColor/50 p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                fontStyle === "italic"
                  ? "bg-primary/80 text-white"
                  : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
              }`}
              onClick={() => handleFontStyleChange("italic")}
            >
              <ItalicIcon size={14} />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Font Weight</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              type="button"
              className={`text-xs border border-borderColor/50 p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                selectedWeight === "normal"
                  ? "bg-primary/80 text-white"
                  : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
              }`}
              onClick={() => handleWeightTabChange("normal")}
            >
              Normal
            </Button>
            <Button
              size="sm"
              type="button"
              className={`text-xs border border-borderColor/50 p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                selectedWeight === "bold"
                  ? "bg-primary/80 text-white"
                  : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
              }`}
              onClick={() => handleWeightTabChange("bold")}
            >
              Bold
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Text Alignment</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { alignment: "left" as "left", icon: <AlignLeftIcon size={14} /> },
              { alignment: "center" as "center", icon: <AlignCenterIcon size={14} /> },
              { alignment: "right" as "right", icon: <AlignRightIcon size={14} /> },
            ].map(({ alignment, icon }) => (
              <Button
                size="sm"
                type="button"
                key={alignment}
                className={`text-xs border border-borderColor/50 p-1 flex items-center justify-center rounded-md transition-all duration-150 ${
                  textSettings.alignment === alignment
                    ? "bg-primary/80 text-white"
                    : "hover:bg-primary/20 text-textColor bg-cardBackground/50"
                }`}
                onClick={() => handleAlignmentChange(alignment)}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Font Family</label>
          <Select onValueChange={handleFontFamilyChange} value={fontFamily}>
            <SelectTrigger className="w-full h-8 text-xs rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent className="bg-cardBackground/90 text-textColor border border-borderColor/50">
              {fontOptions.map((font) => (
                <SelectItem
                  key={font.slug}
                  className={`${font.font.className} text-textColor text-xs`}
                  value={font.slug || "default"}
                >
                  <span className="text-textColor">{font.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TextSettingsSection;
