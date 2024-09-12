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
import { Button } from "@/components/ui/button";

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
    <form className="grid w-full items-start gap-6 p-6 rounded-lg  bg-background">
      <legend className="text-lg font-semibold text-textColor">
        Text Settings
      </legend>
      <div className="grid gap-6 border p-4 bg-background  border-borderColor rounded-lg ">
        <div className="flex gap-4">
          {["title", "description", "tagline"].map((section) => (
            <Button
              key={section}
              type="button"
              className={`px-3 py-1 text-sm border border-borderColor hover:border-borderColor hover:bg-primary rounded-md ${
                selectedSection === section
                  ? "bg-primary text-white"
                  : "bg-cardBackground  text-textColor"
              }`}
              onClick={() => handleSectionChange(section as any)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-[14px] font-medium text-textColor">
            Font Size
          </div>
          <div className="flex items-center gap-2">
            <Slider
              max={88}
              min={10}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => handleFontSizeChange(value[0])}
              className="flex-grow"
            />
            <span className="text-sm font-medium text-textColor">
              {fontSize}px
            </span>
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-[14px] font-medium text-textColor">
            Font Style
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              size="xs"
              type="button"
              className={`border border-borderColor text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                fontStyle === "normal"
                  ? "bg-primary text-white"
                  : "hover:bg-primary text-textColor bg-cardBackground"
              }`}
              onClick={() => handleFontStyleChange("normal")}
            >
              <BoldIcon size={20} />
            </Button>
            <Button
              size="xs"
              type="button"
              className={`border border-borderColor text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                fontStyle === "italic"
                  ? "bg-primary text-white"
                  : "hover:bg-primary text-textColor bg-cardBackground"
              }`}
              onClick={() => handleFontStyleChange("italic")}
            >
              <ItalicIcon size={20} />
            </Button>
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <div className="text-[14px] font-medium text-textColor">
            Font Weight
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <Button
              size="xs"
              type="button"
              className={`border border-borderColor text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                selectedWeight === "normal"
                  ? "bg-primary text-white"
                  : "hover:bg-primary text-textColor bg-cardBackground"
              }`}
              onClick={() => handleWeightTabChange("normal")}
            >
              Normal
            </Button>
            <Button
              size="xs"
              type="button"
              className={`border border-borderColor text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                selectedWeight === "bold"
                  ? "bg-primary text-white"
                  : "hover:bg-primary text-textColor bg-cardBackground"
              }`}
              onClick={() => handleWeightTabChange("bold")}
            >
              Bold
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-5 border border-borderColor p-4 bg-background rounded-lg ">
        <div className="text-[14px] font-medium text-textColor">
          Text Alignment
        </div>
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
              <Button
                size="xs"
                type="button"
                key={alignment}
                className={`border border-borderColor hover:border-borderColor hover:bg-primary text-textColor p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
                  textSettings.alignment === alignment
                    ? "bg-primary text-white border-borderColor"
                    : " text-textColor bg-cardBackground"
                }`}
                onClick={() => handleAlignmentChange(alignment)}
              >
                {icon}
              </Button>
            )
          )}
        </div>
      </div>
    </form>
  );
};

export default TextSettingsSection;
