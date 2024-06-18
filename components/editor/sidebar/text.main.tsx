import {
  TextCursorIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
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
import { carouselsSize } from "@/lib/coreConstants";

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
    <form className="grid w-full items-start gap-6 p-4">
      <legend className="-ml-1 px-1 text-2xl font-medium mb-4">
        Text Settings
      </legend>
      <div className="grid gap-3">
        <div className="text-[12px] font-medium">Font Size</div>
        <div className="grid grid-cols-3 gap-3">
          {[12, 14, 16].map((size) => (
            <button
              type="button"
              key={size}
              className={`border p-2 flex items-center justify-center rounded-md ${
                fontSize === size ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleFontSizeChange(size)}
            >
              <TextCursorIcon size={size} />
            </button>
          ))}
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
                  <Shield className="size-5" />
                  <div className="grid gap-0.5">
                    <p>{size.ratio}</p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3 ">
        <div className="text-[12px] font-medium">Text Alignment</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { alignment: "left" as "left", icon: <AlignLeftIcon size={12} /> },
            {
              alignment: "center" as "center",
              icon: <AlignCenterIcon size={12} />,
            },
            {
              alignment: "right" as "right",
              icon: <AlignRightIcon size={12} />,
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
                className={`border p-2 flex items-center justify-center rounded-md ${
                  selectedAlignment === alignment ? "bg-primary text-white" : ""
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
