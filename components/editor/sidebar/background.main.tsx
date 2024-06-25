import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setBackground } from "@/state/slice/carousel.slice";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import colorPresets, { BackgroundColors } from "@/lib/color-presets";

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
    <form className="grid w-full items-start gap-4 p-3 pb-36 rounded-lg bg-white shadow-lg max-h-screen overflow-y-auto">
      <legend className="text-lg font-semibold ">Background</legend>
      <div className="border p-2 rounded-lg">
        <label
          htmlFor="color1"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          Custom Background Color
        </label>

        <div className="grid grid-cols-4 gap-4 mb-4">
          {(Object.keys(background) as Array<keyof BackgroundColors>).map(
            (colorKey) => (
              <div
                key={colorKey}
                className="flex flex-col items-center relative"
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="w-full h-10 border cursor-pointer rounded-md transition-transform transform hover:scale-110 shadow-sm"
                      style={{
                        backgroundColor: background[colorKey],
                      }}
                      onClick={() => handleColorPickerClick(colorKey)}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="z-50 w-auto h-auto flex items-start justify-start bg-white rounded-lg shadow-lg p-2"
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
              className="w-full h-8 border p-1 cursor-pointer rounded-md grid grid-cols-4 transition-transform transform hover:scale-105 hover:shadow-lg"
              onClick={() => handlePresetSelect(preset)}
            >
              <div
                className="transition-colors duration-200 ease-in-out rounded-l-md"
                style={{
                  backgroundColor: preset.color1,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                className="transition-colors duration-200 ease-in-out"
                style={{
                  backgroundColor: preset.color2,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                className="transition-colors duration-200 ease-in-out"
                style={{
                  backgroundColor: preset.color3,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                className="transition-colors duration-200 ease-in-out rounded-r-md"
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
