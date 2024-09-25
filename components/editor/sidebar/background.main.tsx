import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  setBackground,
  setPattern,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
} from "@/state/slice/carousel.slice";
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
import { sharedElements } from "@/lib/coreConstants";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const BackgroundColorsSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const { pattern } = useSelector((state: RootState) => state.slides.layout);
  const sharedSelectedElement = useSelector(
    (state: RootState) => state.slides.sharedSelectedElement
  );
  const layout = useSelector((state: RootState) => state.slides.layout);

  const [displayColorPicker, setDisplayColorPicker] = useState<{
    [key: string]: boolean;
  }>({
    color1: false,
    color2: false,
    color3: false,
    color4: false,
  });
  const [showAllLightPresets, setShowAllLightPresets] = useState(false);
  const [showAllDarkPresets, setShowAllDarkPresets] = useState(false);

  const visibleLightPresets = showAllLightPresets
    ? lightColorPresets
    : lightColorPresets.slice(0, 12);
  const visibleDarkPresets = showAllDarkPresets
    ? darkColorPresets
    : darkColorPresets.slice(0, 12);

  const handlePatternChange = (value: string) => dispatch(setPattern(value));
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

  const patterns = [
    "/backgrounds/background1.svg",
    "/backgrounds/background2.svg",
    "/backgrounds/background3.svg",
    "/backgrounds/background4.svg",
    "/backgrounds/background5.svg",
    "/backgrounds/background6.svg",
    "/backgrounds/background7.svg",
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col bg-background/50 backdrop-blur-sm">
      <legend className="text-base font-semibold text-textColor mb-3">
        Background Settings
      </legend>
      <div className="flex-grow overflow-y-auto pr-2 mb-4 space-y-6">
        {/* Custom Background Colors */}
        <div className="space-y-2">
          <label className="text-sm text-textColor/80">
            Custom Background Color
          </label>
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
        </div>

        {/* Light Presets */}
        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Light Presets</label>
          <div className="grid grid-cols-4 gap-2">
            {visibleLightPresets.map(
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
          {lightColorPresets.length > 12 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAllLightPresets(!showAllLightPresets)}
              className="w-full text-xs border border-borderColor  bg-cardBackground/60 text-textColor"
            >
              {showAllLightPresets ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>

        {/* Dark Presets */}
        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Dark Presets</label>
          <div className="grid grid-cols-4 gap-2">
            {visibleDarkPresets.map(
              (preset: BackgroundColors, index: number) => (
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
              )
            )}
          </div>
          {darkColorPresets.length > 12 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAllDarkPresets(!showAllDarkPresets)}
              className="w-full text-xs border border-borderColor/50 text-textColor bg-cardBackground/60"
            >
              {showAllDarkPresets ? "Show Less" : "Show More"}
            </Button>
          )}
        </div>

        {/* Pattern */}
        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Pattern</label>
          <div className="grid grid-cols-4 gap-2">
            <div
              className={`flex justify-center items-center p-2 rounded-md ${
                pattern === ""
                  ? "bg-blue-200 border border-blue-500"
                  : "bg-gray-300"
              }`}
              onClick={() => handlePatternChange("")}
            >
              <CircleOff size={16} className="text-gray-500" />
            </div>
            {patterns.map((patternItem, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-2 rounded-md ${
                  pattern === patternItem
                    ? "bg-blue-200 border border-blue-500"
                    : "bg-gray-300"
                }`}
                onClick={() => handlePatternChange(patternItem)}
              >
                <div
                  className="w-full h-6 rounded-md"
                  style={{
                    background: `url(${patternItem})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-xs text-textColor/70">
              Background Opacity
            </label>
            <Slider
              max={2}
              step={0.01}
              value={[layout.backgroundOpacity]}
              onValueChange={(value) =>
                dispatch(setBackgroundOpacity(value[0]))
              }
            />
          </div>
        </div>

        {/* Shared Elements */}
        <div className="space-y-2">
          <label className="text-sm text-textColor/80">Shared Elements</label>
          <div className="grid grid-cols-4 gap-2">
            <div
              className={`flex justify-center items-center p-2 rounded-md ${
                sharedSelectedElement?.id === 0
                  ? "bg-blue-200 border border-blue-500"
                  : "bg-gray-300"
              }`}
              onClick={() => {
                dispatch(setSharedSelectedElementId(0));
                dispatch(setSharedSelectedElementOpacity(0.4));
              }}
            >
              <CircleOff size={16} className="text-textColor" />
            </div>
            {sharedElements.map((element) => (
              <div
                key={element?.id}
                className={`flex justify-center items-center p-2 rounded-md ${
                  sharedSelectedElement?.id === element?.id
                    ? "bg-blue-200 border border-blue-500"
                    : "bg-gray-300"
                }`}
                onClick={() => {
                  dispatch(setSharedSelectedElementId(element.id));
                  dispatch(setSharedSelectedElementOpacity(0.4));
                }}
              >
                {/* blue color */}
                <element.component />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-xs text-textColor/70">Opacity</label>
            <Slider
              max={1}
              step={0.01}
              value={[sharedSelectedElement?.opacity || 0]}
              onValueChange={(value) =>
                dispatch(setSharedSelectedElementOpacity(value[0]))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundColorsSection;
