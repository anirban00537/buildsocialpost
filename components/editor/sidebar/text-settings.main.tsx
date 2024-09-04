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
  setLayoutHeightAndWidth,
} from "@/state/slice/carousel.slice";
import { Slider } from "@/components/ui/slider";
import { carouselsSize } from "@/lib/coreConstants";

const TextSettingsSection = () => {
  const dispatch = useDispatch();
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
  const [fontStyle, setFontStyle] = useState(
    textSettings.fontStyle || "normal"
  );

  // Ensure fontWeight is a number
  const initialFontWeight =
    typeof textSettings.fontWeight === "number"
      ? textSettings.fontWeight
      : textSettings.fontWeight === "bold"
      ? 700
      : 400;
  const [fontWeight, setFontWeight] = useState<number>(initialFontWeight);

  const [selectedWeight, setSelectedWeight] = useState(
    fontWeight === 700 || fontWeight > 500 ? "bold" : "normal"
  );

  const handleSectionChange = (
    section: "title" | "description" | "tagline"
  ) => {
    setSelectedSection(section);
    const textSettings =
      section === "title"
        ? titleTextSettings
        : section === "description"
        ? descriptionTextSettings
        : taglineTextSettings;
    setFontSize(textSettings.fontSize);
    setFontStyle(textSettings.fontStyle);
    setFontWeight(
      typeof textSettings.fontWeight === "number"
        ? textSettings.fontWeight
        : textSettings.fontWeight === "bold"
        ? 700
        : 400
    );
    setSelectedWeight(textSettings.fontWeight === "bold" ? "bold" : "normal");
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({
            ...titleTextSettings,
            fontSize: size,
          })
        : selectedSection === "description"
        ? setDescriptionTextSettings({
            ...descriptionTextSettings,
            fontSize: size,
          })
        : setTaglineTextSettings({
            ...taglineTextSettings,
            fontSize: size,
          })
    );
  };

  const handleFontStyleChange = (style: "normal" | "italic") => {
    setFontStyle(style);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({
            ...titleTextSettings,
            fontStyle: style,
          })
        : selectedSection === "description"
        ? setDescriptionTextSettings({
            ...descriptionTextSettings,
            fontStyle: style,
          })
        : setTaglineTextSettings({
            ...taglineTextSettings,
            fontStyle: style,
          })
    );
  };

  const handleFontWeightChange = (weight: number) => {
    setFontWeight(weight);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({
            ...titleTextSettings,
            fontWeight: weight,
          })
        : selectedSection === "description"
        ? setDescriptionTextSettings({
            ...descriptionTextSettings,
            fontWeight: weight,
          })
        : setTaglineTextSettings({
            ...taglineTextSettings,
            fontWeight: weight,
          })
    );
  };

  const handleWeightTabChange = (weight: "normal" | "bold") => {
    setSelectedWeight(weight);
    const newWeight = weight === "bold" ? 700 : 400;
    setFontWeight(newWeight);
    dispatch(
      selectedSection === "title"
        ? setTitleTextSettings({
            ...titleTextSettings,
            fontWeight: newWeight,
          })
        : selectedSection === "description"
        ? setDescriptionTextSettings({
            ...descriptionTextSettings,
            fontWeight: newWeight,
          })
        : setTaglineTextSettings({
            ...taglineTextSettings,
            fontWeight: newWeight,
          })
    );
  };

  const handleAlignmentChange = (alignment: "left" | "center" | "right") => {
    dispatch(
      setTitleTextSettings({
        ...titleTextSettings,
        alignment,
      })
    );
    dispatch(
      setDescriptionTextSettings({
        ...descriptionTextSettings,
        alignment,
      })
    );
    dispatch(
      setTaglineTextSettings({
        ...taglineTextSettings,
        alignment,
      })
    );
  };

  return (
    <form className="grid w-full items-start gap-6 p-6 rounded-lg bg-white">
      <legend className="text-lg font-semibold text-gray-700">
        Text Settings
      </legend>
      <div className="grid gap-6 border p-4 bg-gray-50 rounded-lg ">
        <div className="flex gap-4">
          {["title", "description", "tagline"].map((section) => (
            <button
              key={section}
              type="button"
              className={`px-3 py-1 text-sm rounded-md ${
                selectedSection === section
                  ? "bg-blue-100 text-blue-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSectionChange(section as any)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-[14px] font-medium">Font Size</div>
          <div className="flex items-center gap-2">
            <Slider
              max={88}
              min={10}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => handleFontSizeChange(value[0])}
              className="flex-grow"
            />
            <span className="text-sm font-medium">{fontSize}px</span>
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-[14px] font-medium">Font Style</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                fontStyle === "normal"
                  ? "bg-blue-100 text-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFontStyleChange("normal")}
            >
              <BoldIcon size={20} />
            </button>
            <button
              type="button"
              className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                fontStyle === "italic"
                  ? "bg-blue-100 text-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFontStyleChange("italic")}
            >
              <ItalicIcon size={20} />
            </button>
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-[14px] font-medium">Font Weight</div>
          <div className="grid grid-cols-2 items-center gap-2">
            <button
              type="button"
              className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                selectedWeight === "normal"
                  ? "bg-blue-100 text-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleWeightTabChange("normal")}
            >
              Normal
            </button>
            <button
              type="button"
              className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                selectedWeight === "bold"
                  ? "bg-blue-100 text-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleWeightTabChange("bold")}
            >
              Bold
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-5 border p-4 bg-gray-50 rounded-lg ">
        <div className="text-[14px] font-medium">Text Alignment</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { alignment: "left" as "left", icon: <AlignLeftIcon size={20} /> },
            {
              alignment: "center" as "center",
              icon: <AlignCenterIcon size={20} />,
            },
            {
              alignment: "right" as "right",
              icon: <AlignRightIcon size={20} />,
            },
          ].map(
            ({
              alignment,
              icon,
            }: {
              alignment: "left" | "center" | "right";
              icon: JSX.Element;
            }) => (
              <button
                type="button"
                key={alignment}
                className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                  textSettings.alignment === alignment
                    ? "bg-blue-100 text-blue-500"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleAlignmentChange(alignment)}
              >
                {icon}
              </button>
            )
          )}
        </div>
      </div>
    </form>
  );
};

export default TextSettingsSection;
