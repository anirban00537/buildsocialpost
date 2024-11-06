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
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

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
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200
            bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Type className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Typography</div>
              <div className="text-xs text-gray-500">Customize text styles</div>
            </div>
          </div>
          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Typography Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Text Element Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Text Element
            </label>
            <div className="flex gap-2 p-1 bg-gray-50 rounded-lg">
              {["title", "description", "tagline"].map((section) => (
                <Button
                  key={section}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className={`flex-1 h-9 text-sm font-medium capitalize ${
                    selectedSection === section
                      ? "bg-white text-blue-700 ring-1 ring-blue-200 shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-gray-700"
                  }`}
                  onClick={() => handleSectionChange(section as any)}
                >
                  {section}
                </Button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Font Size
              </label>
              <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
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

          {/* Font Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Style
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className={`flex-1 h-9 text-sm font-medium ${
                  fontStyle === "normal"
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-blue-200"
                }`}
                onClick={() => handleFontStyleChange("normal")}
              >
                Normal
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={`flex-1 h-9 text-sm font-medium ${
                  fontStyle === "italic"
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-blue-200"
                }`}
                onClick={() => handleFontStyleChange("italic")}
              >
                <ItalicIcon size={16} className="mr-2" />
                Italic
              </Button>
            </div>
          </div>

          {/* Alignment */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Alignment
            </label>
            <div className="flex gap-2 p-1 bg-gray-50 rounded-lg">
              {[
                {
                  alignment: "left" as "left",
                  icon: <AlignLeftIcon size={16} />,
                },
                {
                  alignment: "center" as "center",
                  icon: <AlignCenterIcon size={16} />,
                },
                {
                  alignment: "right" as "right",
                  icon: <AlignRightIcon size={16} />,
                },
              ].map(({ alignment, icon }) => (
                <Button
                  key={alignment}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className={`flex-1 h-9 ${
                    textSettings.alignment === alignment
                      ? "bg-white text-blue-700 ring-1 ring-blue-200 shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-gray-700"
                  }`}
                  onClick={() => handleAlignmentChange(alignment)}
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Font Family
            </label>
            <Select onValueChange={handleFontFamilyChange} value={fontFamily}>
              <SelectTrigger className="w-full h-9 text-sm rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                {fontOptions.map((font) => (
                  <SelectItem
                    key={font.slug}
                    className={`${font.font.className} text-gray-700 text-sm py-2 hover:bg-gray-50`}
                    value={font.slug || "default"}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Weight
            </label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className={`flex-1 h-9 text-sm font-medium ${
                  fontWeight === "normal"
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-blue-200"
                }`}
                onClick={() => handleFontWeightChange("normal")}
              >
                Normal
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={`flex-1 h-9 text-sm font-medium ${
                  fontWeight === "bold"
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-blue-200"
                }`}
                onClick={() => handleFontWeightChange("bold")}
              >
                <BoldIcon size={16} className="mr-2" />
                Bold
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TextSettingsSection;
