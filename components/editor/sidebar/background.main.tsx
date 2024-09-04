import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  setBackground,
  setPattern,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
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

const BackgroundColorsSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const sharedSelectedElement = useSelector(
    (state: RootState) => state.slides.sharedSelectedElement
  );
  const [displayColorPicker, setDisplayColorPicker] = React.useState<{
    [key: string]: boolean;
  }>({
    color1: false,
    color2: false,
    color3: false,
    color4: false,
  });
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handlePatternChange = (value: string) => {
    dispatch(setPattern(value));
  };

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

  const patterns = [
    "/backgrounds/background1.svg",
    "/backgrounds/background2.svg",
    "/backgrounds/background3.svg",
    "/backgrounds/background4.svg",
    "/backgrounds/background5.svg",
    "/backgrounds/background6.svg",
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg overflow-y-auto h-full pb-20">
      <form className="grid gap-6  rounded-lg">
        <legend className="text-lg font-semibold text-gray-700">
          Background Colors
        </legend>
        <div className="border p-4 rounded-lg">
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
                        className="w-full h-10 border cursor-pointer rounded-md transition-transform transform hover:scale-110"
                        style={{
                          backgroundColor: background[colorKey],
                        }}
                        onClick={() => handleColorPickerClick(colorKey)}
                      />
                    </PopoverTrigger>
                    <PopoverContent
                      className="z-50 w-auto h-auto flex items-start justify-start bg-white rounded-lg p-2"
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

          <div className="mt-6">
            <label
              htmlFor="preset"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Light Presets
            </label>
            <div className="grid grid-cols-4 gap-2">
              {lightColorPresets.map(
                (preset: BackgroundColors, index: number) => (
                  <div
                    key={index}
                    className="w-full h-8 border cursor-pointer rounded-md grid grid-cols-4 transition-transform transform hover:scale-105 hover"
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
                )
              )}
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="preset"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dark Presets
            </label>
            <div className="grid grid-cols-4 gap-2">
              {darkColorPresets.map(
                (preset: BackgroundColors, index: number) => (
                  <div
                    key={index}
                    className="w-full h-8 border cursor-pointer rounded-md grid grid-cols-4 transition-transform transform hover:scale-105 hover"
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
                )
              )}
            </div>
          </div>
        </div>
      </form>

      <form className="grid gap-6 p-4 mt-6 bg-white rounded-lg">
        <legend className="text-lg font-semibold text-gray-700">Pattern</legend>
        <div className="border p-2 rounded-lg grid grid-cols-4 gap-4">
          <div
            className={`flex justify-center items-center p-2 rounded-lg ${
              selectedTemplate === null ? "bg-primary/20" : "bg-transparent"
            }`}
            onClick={() => {
              handlePatternChange("");
              setSelectedTemplate(null);
            }}
          >
            <CircleOff size={20} />
          </div>
          {patterns.map((pattern, index) => (
            <div
              key={index}
              className={`flex justify-center items-center p-2 rounded-lg ${
                selectedTemplate === pattern
                  ? "bg-primary/20"
                  : "bg-transparent"
              }`}
              onClick={() => {
                handlePatternChange(pattern);
                setSelectedTemplate(pattern);
              }}
            >
              <div
                className="w-full h-10 border rounded-md"
                style={{
                  background: `url(${pattern})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          ))}
        </div>
      </form>
      <form className="grid gap-6 p-4 mt-6 bg-white rounded-lg">
        <legend className="text-lg font-semibold text-gray-700">
          Shared Elements
        </legend>
        <div className="border p-2 rounded-lg grid grid-cols-4 gap-4">
          <div
            className={`flex justify-center items-center p-2 rounded-lg ${
              sharedSelectedElement?.id === 0
                ? "bg-primary/20"
                : "bg-transparent"
            }`}
            onClick={() => {
              dispatch(setSharedSelectedElementId(0));
              dispatch(setSharedSelectedElementOpacity(0.4));
            }}
          >
            <CircleOff size={20} />
          </div>
          {sharedElements.map((element) => (
            <div
              key={element?.id}
              className={`flex justify-center items-center p-2 rounded-lg ${
                sharedSelectedElement?.id === element?.id
                  ? "bg-primary/20"
                  : "bg-transparent"
              }`}
              onClick={() => {
                dispatch(setSharedSelectedElementId(element.id));
                dispatch(setSharedSelectedElementOpacity(0.4));
              }}
            >
              <element.component />
            </div>
          ))}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="opacity">Opacity</Label>
          <Slider
            max={1}
            step={0.01}
            value={[sharedSelectedElement?.opacity || 0]}
            onValueChange={(value) =>
              dispatch(setSharedSelectedElementOpacity(value[0]))
            }
          />
        </div>
      </form>
    </div>
  );
};

export default BackgroundColorsSection;
