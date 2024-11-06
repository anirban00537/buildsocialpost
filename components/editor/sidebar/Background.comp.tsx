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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BackgroundColors,
  lightColorPresets,
  darkColorPresets,
} from "@/lib/color-presets";
import { Switch } from "@/components/ui/switch";
import { Palette, Sun, Moon, Droplet, Check, ChevronRight } from "lucide-react";
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
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200
            bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-200"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Palette className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">Background</div>
              <div className="flex items-center gap-1 mt-1">
                {Object.values(background).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-sm ring-1 ring-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">Background Settings</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Gradient Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-blue-600" />
                Gradient
              </h3>
              <Switch
                checked={layout.gradient}
                onCheckedChange={(checked) => dispatch(setGradient(checked))}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </section>

          {/* Custom Background Colors */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600" />
              Custom Colors
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(background) as Array<keyof BackgroundColors>).map(
                (colorKey) => (
                  <Popover key={colorKey}>
                    <PopoverTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full aspect-square ring-1 ring-gray-200 hover:ring-blue-200 cursor-pointer rounded-lg shadow-sm overflow-hidden transition-all duration-200"
                        style={{ backgroundColor: background[colorKey] }}
                      >
                        <div className="w-full h-full flex items-center justify-center hover:bg-black/5 transition-colors duration-200">
                          <Palette className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </motion.div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 bg-white border-0 ring-1 ring-gray-200 rounded-lg shadow-lg">
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

          {/* Presets */}
          <div className="space-y-6">
            {/* Light Presets */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Sun className="w-4 h-4 text-blue-600" />
                Light Presets
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {lightColorPresets.map((preset: BackgroundColors, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-square ring-1 ring-gray-200 hover:ring-blue-200 cursor-pointer rounded-lg grid grid-cols-2 shadow-sm overflow-hidden relative transition-all duration-200"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {Object.values(preset).map((color, colorIndex) => (
                      <div key={colorIndex} style={{ backgroundColor: color }} />
                    ))}
                    <div className="absolute inset-0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Dark Presets */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Moon className="w-4 h-4 text-blue-600" />
                Dark Presets
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {darkColorPresets.map((preset: BackgroundColors, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-square ring-1 ring-gray-200 hover:ring-blue-200 cursor-pointer rounded-lg grid grid-cols-2 shadow-sm overflow-hidden relative transition-all duration-200"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {Object.values(preset).map((color, colorIndex) => (
                      <div key={colorIndex} style={{ backgroundColor: color }} />
                    ))}
                    <div className="absolute inset-0 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BackgroundColorsSection;
