import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  Type,
} from "lucide-react";
import React, { useState, useEffect } from "react";
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
  const titleTextSettings = useSelector(
    (state: RootState) => state.slides.titleTextSettings
  );
  const descriptionTextSettings = useSelector(
    (state: RootState) => state.slides.descriptionTextSettings
  );
  const taglineTextSettings = useSelector(
    (state: RootState) => state.slides.taglineTextSettings
  );

  const [selectedSection, setSelectedSection] = useState<
    "title" | "description" | "tagline"
  >("title");

  const textSettings =
    selectedSection === "title"
      ? titleTextSettings
      : selectedSection === "description"
      ? descriptionTextSettings
      : taglineTextSettings;

  const [fontSize, setFontSize] = useState(textSettings.fontSize);
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">("normal");
  const [fontWeight, setFontWeight] = useState<"normal" | "bold">("normal");

  useEffect(() => {
    setFontStyle(textSettings.fontStyle || "normal");
    setFontWeight(typeof textSettings.fontWeight === "number"
      ? textSettings.fontWeight >= 700 ? "bold" : "normal"
      : textSettings.fontWeight === "bold" ? "bold" : "normal");
  }, [selectedSection, textSettings]);

  const handleSectionChange = (
    section: "title" | "description" | "tagline"
  ) => {
    setSelectedSection(section);
    const newTextSettings =
      section === "title"
        ? titleTextSettings
        : section === "description"
        ? descriptionTextSettings
        : taglineTextSettings;
    setFontSize(newTextSettings.fontSize);
    setFontStyle(newTextSettings.fontStyle);
    setFontWeight(typeof newTextSettings.fontWeight === "number"
      ? newTextSettings.fontWeight >= 700 ? "bold" : "normal"
      : newTextSettings.fontWeight === "bold" ? "bold" : "normal");
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({ ...titleTextSettings, fontSize: size })
        : selectedSection === "description"
        ? setDescriptionTextSettings({
            ...descriptionTextSettings,
            fontSize: size,
          })
        : setTaglineTextSettings({ ...taglineTextSettings, fontSize: size })
    );
  };

  const handleFontStyleChange = (style: "normal" | "italic") => {
    setFontStyle(style);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({ ...titleTextSettings, fontStyle: style })
        : selectedSection === "description"
        ? setDescriptionTextSettings({
            ...descriptionTextSettings,
            fontStyle: style,
          })
        : setTaglineTextSettings({ ...taglineTextSettings, fontStyle: style })
    );
  };

  const handleFontWeightChange = (weight: "normal" | "bold") => {
    setFontWeight(weight);
    const newWeight = weight === "bold" ? 700 : 400;
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
    dispatch(
      setDescriptionTextSettings({ ...descriptionTextSettings, alignment })
    );
    dispatch(setTaglineTextSettings({ ...taglineTextSettings, alignment }));
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    dispatch(setFontFamily(fontFamily));
  };

  return (
    <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-6 border-b border-borderColor/20">
        <h2 className="text-xl font-semibold text-textColor flex items-center gap-2">
          <Type className="w-6 h-6 text-primary" />
          Typography
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-textColor/80">
              Text Element
            </label>
            <div className="flex gap-2 p-1 bg-cardBackground/30 rounded-lg">
              {["title", "description", "tagline"].map((section) => (
                <Button
                  key={section}
                  type="button"
                  size="sm"
                  variant={selectedSection === section ? "default" : "ghost"}
                  className={`flex-1 text-xs capitalize ${
                    selectedSection === section
                      ? "bg-white text-primary shadow-sm"
                      : "text-textColor hover:bg-white/50 hover:text-primary"
                  }`}
                  onClick={() => handleSectionChange(section as any)}
                >
                  {section}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-textColor/80">
                Font Size
              </label>
              <span className="text-xs font-medium text-textColor/60">
                {fontSize}px
              </span>
            </div>
            <Slider
              max={88}
              min={10}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => handleFontSizeChange(value[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-textColor/80">
              Style & Weight
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={fontStyle === "normal" ? "default" : "outline"}
                className="flex-1 text-xs"
                onClick={() => handleFontStyleChange("normal")}
              >
                Normal
              </Button>
              <Button
                size="sm"
                variant={fontStyle === "italic" ? "default" : "outline"}
                className="flex-1 text-xs"
                onClick={() => handleFontStyleChange("italic")}
              >
                <ItalicIcon size={14} className="mr-2" />
                Italic
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-textColor/80">
              Alignment
            </label>
            <div className="flex gap-2 p-1 bg-cardBackground/30 rounded-lg">
              {[
                {
                  alignment: "left" as "left",
                  icon: <AlignLeftIcon size={14} />,
                },
                {
                  alignment: "center" as "center",
                  icon: <AlignCenterIcon size={14} />,
                },
                {
                  alignment: "right" as "right",
                  icon: <AlignRightIcon size={14} />,
                },
              ].map(({ alignment, icon }) => (
                <Button
                  key={alignment}
                  type="button"
                  size="sm"
                  variant={
                    textSettings.alignment === alignment ? "default" : "ghost"
                  }
                  className={`flex-1 ${
                    textSettings.alignment === alignment
                      ? "bg-white text-primary shadow-sm"
                      : "text-textColor hover:bg-white/50 hover:text-primary"
                  }`}
                  onClick={() => handleAlignmentChange(alignment)}
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-textColor/80">
              Font Family
            </label>
            <Select onValueChange={handleFontFamilyChange} value={fontFamily}>
              <SelectTrigger className="w-full h-10 text-sm rounded-md border border-borderColor/50 text-textColor bg-cardBackground/50">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent className="bg-background text-textColor border border-borderColor/50">
                {fontOptions.map((font) => (
                  <SelectItem
                    key={font.slug}
                    className={`${font.font.className} text-textColor text-sm py-2`}
                    value={font.slug || "default"}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-textColor/80">
              Font Weight
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={fontWeight === "normal" ? "default" : "outline"}
                className="flex-1 text-xs"
                onClick={() => handleFontWeightChange("normal")}
              >
                Normal
              </Button>
              <Button
                size="sm"
                variant={fontWeight === "bold" ? "default" : "outline"}
                className="flex-1 text-xs"
                onClick={() => handleFontWeightChange("bold")}
              >
                <BoldIcon size={14} className="mr-2" />
                Bold
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSettingsSection;
