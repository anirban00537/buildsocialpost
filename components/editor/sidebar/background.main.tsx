import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setBackground } from "@/state/slice/carousel.slice";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type BackgroundColors = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
};

const colorPresets: BackgroundColors[] = [
  {
    color1: "#2c3e50", // Dark Blue - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2980b9", // Bright Blue - Background Color
  },
  {
    color1: "#27ae60", // Green - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2ecc71", // Bright Green - Background Color
  },
  {
    color1: "#8e44ad", // Purple - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#9b59b6", // Light Purple - Background Color
  },
  {
    color1: "#e74c3c", // Red - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#c0392b", // Dark Red - Background Color
  },
  {
    color1: "#1abc9c", // Turquoise - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#16a085", // Dark Turquoise - Background Color
  },
  {
    color1: "#f39c12", // Orange - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#e67e22", // Dark Orange - Background Color
  },
  {
    color1: "#3498db", // Light Blue - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2980b9", // Dark Blue - Background Color
  },
  {
    color1: "#34495e", // Dark Grey - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2c3e50", // Very Dark Blue - Background Color
  },
  {
    color1: "#d35400", // Pumpkin - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#e67e22", // Carrot - Background Color
  },
  {
    color1: "#c0392b", // Red - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#e74c3c", // Light Red - Background Color
  },
  {
    color1: "#16a085", // Green - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#1abc9c", // Light Green - Background Color
  },
  {
    color1: "#2980b9", // Blue - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#3498db", // Light Blue - Background Color
  },
  {
    color1: "#7f8c8d", // Asbestos - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#95a5a6", // Concrete - Background Color
  },
];

const BackgroundColorsSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const [displayColorPicker, setDisplayColorPicker] = React.useState<{
    [key: string]: boolean;
  }>({
    color1: false,
    color2: false,
    color3: false,
    color4: false,
  });

  const handleColorChange = (
    colorKey: keyof BackgroundColors,
    colorValue: string
  ) => {
    dispatch(
      setBackground({
        ...background,
        [colorKey]: colorValue,
      })
    );
  };

  const handleColorPickerClick = (colorKey: keyof BackgroundColors) => {
    setDisplayColorPicker({
      ...displayColorPicker,
      [colorKey]: !displayColorPicker[colorKey],
    });
  };

  const handleColorPickerClose = (colorKey: keyof BackgroundColors) => {
    setDisplayColorPicker({
      ...displayColorPicker,
      [colorKey]: false,
    });
  };

  const handlePresetSelect = (preset: BackgroundColors) => {
    dispatch(setBackground(preset));
  };

  return (
    <form className="grid w-full items-start gap-2 p-4 rounded-lg bg-white">
      <legend className="text-sm font-medium">Background</legend>
      <div className="border p-3 rounded-lg">
        <label
          htmlFor="color1"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          Custom Background Color
        </label>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {(Object.keys(background) as Array<keyof BackgroundColors>).map(
            (colorKey) => (
              <div
                key={colorKey}
                className="flex flex-col items-center relative"
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="w-full h-7 border p-4 cursor-pointer rounded-md"
                      style={{
                        backgroundColor: background[colorKey],
                      }}
                      onClick={() => handleColorPickerClick(colorKey)}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="z-50 w-auto h-auto flex items-start justify-start bg-white rounded-lg border-none shadow-none"
                    sideOffset={8}
                    align="center"
                    onMouseLeave={() => handleColorPickerClose(colorKey)}
                  >
                    <HexColorPicker
                      color={background[colorKey]}
                      onChange={(color) => handleColorChange(colorKey, color)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )
          )}
        </div>

        <label
          htmlFor="preset"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Color Preset
        </label>
        <div className="grid grid-cols-4 gap-2">
          {colorPresets.map((preset, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-4 h-5 border rounded-md cursor-pointer"
              onClick={() => handlePresetSelect(preset)}
            >
              <div
                style={{
                  backgroundColor: preset.color1,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: preset.color2,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: preset.color3,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: preset.color4,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default BackgroundColorsSection;
