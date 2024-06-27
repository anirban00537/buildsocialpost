import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  Shield,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  setLayoutHeightAndWidth,
  setTextSettings,
} from "@/state/slice/carousel.slice";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { carouselsSize } from "@/lib/coreConstants";

const SettingsSection = () => {
  const dispatch = useDispatch();
  const textSettings = useSelector(
    (state: RootState) => state.slides.textSettings
  );
  const [selectedAlignment, setSelectedAlignment] = useState(
    textSettings.alignment
  );
  const [fontSize, setFontSize] = useState(textSettings.fontSize);
  const [fontStyle, setFontStyle] = useState(
    textSettings.fontStyle || "normal"
  );
  const [fontWeight, setFontWeight] = useState(textSettings.fontWeight || 400);
  const [selectedWeight, setSelectedWeight] = useState(
    fontWeight > 500 ? "bold" : "normal"
  );

  const handleAlignmentChange = (alignment: "left" | "center" | "right") => {
    setSelectedAlignment(alignment);
    dispatch(setTextSettings({ alignment, fontSize, fontStyle, fontWeight }));
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    dispatch(
      setTextSettings({
        alignment: selectedAlignment,
        fontSize: size,
        fontStyle,
        fontWeight,
      })
    );
  };

  const handleFontStyleChange = (style: "normal" | "italic") => {
    setFontStyle(style);
    dispatch(
      setTextSettings({
        alignment: selectedAlignment,
        fontSize,
        fontStyle: style,
        fontWeight,
      })
    );
  };

  const handleFontWeightChange = (weight: number) => {
    setFontWeight(weight);
    dispatch(
      setTextSettings({
        alignment: selectedAlignment,
        fontSize,
        fontStyle,
        fontWeight: weight,
      })
    );
  };

  const handleWeightTabChange = (weight: "normal" | "bold") => {
    setSelectedWeight(weight);
    const newWeight = weight === "bold" ? 700 : 400;
    setFontWeight(newWeight);
    dispatch(
      setTextSettings({
        alignment: selectedAlignment,
        fontSize,
        fontStyle,
        fontWeight: newWeight,
      })
    );
  };

  const handleLayoutValueChange = (value: string) => {
    carouselsSize.find((size) => {
      if (String(size.id) === value) {
        dispatch(
          setLayoutHeightAndWidth({ height: size.height, width: size.width })
        );
      }
    });
  };

  return (
    <form className="grid w-full items-start gap-6 p-4 rounded-lg bg-white">
      <legend className="text-lg font-semibold">Text Settings</legend>
      <div className="grid gap-3">
        <div className="text-[14px] font-medium">Font Size</div>
        <div className="flex items-center gap-2">
          <Slider
            max={30}
            min={10}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => handleFontSizeChange(value[0])}
            className="flex-grow"
          />
          <span className="text-sm font-medium">{fontSize}px</span>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="text-[14px] font-medium">Font Style</div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
              fontStyle === "normal"
                ? "bg-primary text-white"
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
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleFontStyleChange("italic")}
          >
            <ItalicIcon size={20} />
          </button>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="text-[14px] font-medium">Font Weight</div>
        <div className="grid grid-cols-2 items-center gap-2">
          <button
            type="button"
            className={`border p-2 flex items-center justify-center rounded-md transition-all duration-150 ${
              selectedWeight === "normal"
                ? "bg-primary text-white"
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
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleWeightTabChange("bold")}
          >
            Bold
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Slider
            max={900}
            min={100}
            step={100}
            value={[fontWeight]}
            onValueChange={(value) => handleFontWeightChange(value[0])}
            className="flex-grow"
          />
          <span className="text-sm font-medium">{fontWeight}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="template" className="text-sm">
          Template Settings
        </Label>
        <Select onValueChange={handleLayoutValueChange}>
          <SelectTrigger id="template" className="w-full p-2 border rounded-lg">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {carouselsSize.map((size, index) => (
              <SelectItem key={index} value={size.id.toString()}>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Shield className="w-5 h-5" />
                  <div className="grid gap-0.5">
                    <p className="font-medium">{size.ratio}</p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
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
                  selectedAlignment === alignment
                    ? "bg-primary text-white"
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

export default SettingsSection;
