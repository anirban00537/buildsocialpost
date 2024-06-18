import {
  TextCursorIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setTextSettings } from "@/state/slice/carousel.slice";

const TextSettingsSection = () => {
  const dispatch = useDispatch();
  const textSettings = useSelector(
    (state: RootState) => state.slides.textSettings
  );
  const [selectedAlignment, setSelectedAlignment] = useState(
    textSettings.alignment
  );
  const [fontSize, setFontSize] = useState(textSettings.fontSize);

  const handleAlignmentChange = (alignment: "left" | "center" | "right") => {
    setSelectedAlignment(alignment);
    dispatch(setTextSettings({ alignment, fontSize }));
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    dispatch(setTextSettings({ alignment: selectedAlignment, fontSize: size }));
  };
  return (
    <form className="grid w-full items-start gap-6 p-4">
      <legend className="-ml-1 px-1 text-2xl font-medium mb-4">
        Text Settings
      </legend>
      <div className="grid gap-3">
        <div className="">Font Size</div>
        <div className="grid grid-cols-3 gap-3">
          {[12, 14, 16].map((size) => (
            <button
              type="button"
              key={size}
              className={`border p-2 flex items-center justify-center rounded-md ${
                fontSize === size ? "bg-gray-300" : ""
              }`}
              onClick={() => handleFontSizeChange(size)}
            >
              <TextCursorIcon size={size} />
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 mt-4">
        <div className="">Text Alignment</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { alignment: "left" as "left", icon: <AlignLeftIcon /> },
            { alignment: "center" as "center", icon: <AlignCenterIcon /> },
            { alignment: "right" as "right", icon: <AlignRightIcon /> },
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
                className={`border p-2 flex items-center justify-center rounded-md ${
                  selectedAlignment === alignment ? "bg-gray-300" : ""
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
