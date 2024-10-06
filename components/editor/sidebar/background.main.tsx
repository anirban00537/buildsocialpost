import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setBackground, setGradient } from "@/state/slice/carousel.slice";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  BackgroundColors,
  lightColorPresets,
  darkColorPresets,
} from "@/lib/color-presets";
import { Switch } from "@/components/ui/switch";

const BackgroundColorsSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const layout = useSelector((state: RootState) => state.slides.layout);

  const [displayColorPicker, setDisplayColorPicker] = useState<{
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
    dispatch(setBackground({ ...background, [colorKey]: colorValue }));
  };
  const handleColorPickerClick = (colorKey: keyof BackgroundColors) => {
    setDisplayColorPicker({
      ...displayColorPicker,
      [colorKey]: !displayColorPicker[colorKey],
    });
  };
  const handleColorPickerClose = (colorKey: keyof BackgroundColors) => {
    setDisplayColorPicker({ ...displayColorPicker, [colorKey]: false });
  };
  const handlePresetSelect = (preset: BackgroundColors) =>
    dispatch(setBackground(preset));

  return (
    <div className="w-full h-full p-6 flex flex-col bg-background/50 backdrop-blur-sm">
      <h2 className="text-base font-semibold text-textColor mb-4">
        Background Settings
      </h2>
      <div className="flex-grow pb-40 overflow-y-auto space-y-6">
        {/* Gradient Section */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-textColor/80">
              Gradient
            </h3>
            <Switch
              checked={layout.gradient}
              onCheckedChange={(checked) => dispatch(setGradient(checked))}
            />
          </div>
        </section>

        {/* Custom Background Colors */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-textColor/80">
            Custom Background Color
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(background) as Array<keyof BackgroundColors>).map(
              (colorKey) => (
                <Popover key={colorKey}>
                  <PopoverTrigger asChild>
                    <div
                      className="w-full h-8 border border-borderColor/50 cursor-pointer rounded-md transition-all hover:scale-105"
                      style={{ backgroundColor: background[colorKey] }}
                      onClick={() => handleColorPickerClick(colorKey)}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-none"
                    onMouseLeave={() => handleColorPickerClose(colorKey)}
                  >
                    <HexColorPicker
                      color={background[colorKey]}
                      onChange={(color) => handleColorChange(colorKey, color)}
                    />
                  </PopoverContent>
                </Popover>
              )
            )}
          </div>
        </section>

        {/* Light Presets */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-textColor/80">
            Light Presets
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {lightColorPresets.map(
              (preset: BackgroundColors, index: number) => (
                <div
                  key={index}
                  className="w-full h-8 border border-borderColor/50 cursor-pointer rounded-md grid grid-cols-4 transition-all hover:scale-105"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {Object.values(preset).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className={`transition-colors duration-200 ease-in-out ${
                        colorIndex === 0
                          ? "rounded-l-md"
                          : colorIndex === 3
                          ? "rounded-r-md"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </section>

        {/* Dark Presets */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-textColor/80">
            Dark Presets
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {darkColorPresets.map((preset: BackgroundColors, index: number) => (
              <div
                key={index}
                className="w-full h-8 border border-borderColor  cursor-pointer rounded-md grid grid-cols-4 transition-all hover:scale-105"
                onClick={() => handlePresetSelect(preset)}
              >
                {Object.values(preset).map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className={`transition-colors duration-200 ease-in-out ${
                      colorIndex === 0
                        ? "rounded-l-md"
                        : colorIndex === 3
                        ? "rounded-r-md"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BackgroundColorsSection;
