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
import { Palette, Sun, Moon, Droplet, Check } from "lucide-react";
import { motion } from "framer-motion";

const BackgroundColorsSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const layout = useSelector((state: RootState) => state.slides.layout);

  const handleColorChange = (
    colorKey: keyof BackgroundColors,
    colorValue: string
  ) => {
    dispatch(setBackground({ ...background, [colorKey]: colorValue }));
  };

  const handlePresetSelect = (preset: BackgroundColors) =>
    dispatch(setBackground(preset));

  return (
    <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-6 border-b border-borderColor/20">
        <h2 className="text-xl font-semibold text-textColor flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          Background Settings
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto p-6 space-y-8 pb-32">
        {/* Gradient Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-textColor/80 flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              Gradient
            </h3>
            <Switch
              checked={layout.gradient}
              onCheckedChange={(checked) => dispatch(setGradient(checked))}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </section>

        {/* Custom Background Colors */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-textColor/80 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Custom Background Color
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {(Object.keys(background) as Array<keyof BackgroundColors>).map(
              (colorKey) => (
                <Popover key={colorKey}>
                  <PopoverTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full h-12 border border-borderColor/50 cursor-pointer rounded-md shadow-sm overflow-hidden"
                      style={{ backgroundColor: background[colorKey] }}
                    >
                      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200">
                        <Palette className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-3 border-none rounded-lg shadow-lg"
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
          <h3 className="text-sm font-semibold text-textColor/80 flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Light Presets
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {lightColorPresets.map(
              (preset: BackgroundColors, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full h-12 border border-borderColor/50 cursor-pointer rounded-md grid grid-cols-4 shadow-sm overflow-hidden relative"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {Object.values(preset).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* Dark Presets */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-textColor/80 flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Dark Presets
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {darkColorPresets.map((preset: BackgroundColors, index: number) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full h-12 border border-borderColor/50 cursor-pointer rounded-md grid grid-cols-4 shadow-sm overflow-hidden relative"
                onClick={() => handlePresetSelect(preset)}
              >
                {Object.values(preset).map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BackgroundColorsSection;
