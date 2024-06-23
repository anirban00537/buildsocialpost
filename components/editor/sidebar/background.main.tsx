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

const BackgroundColorssSection = () => {
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

  return (
    <form className="grid w-full items-start gap-6 p-4 rounded-lg bg-white">
      <legend className="text-lg font-semibold mb-4">
        Background Settings
      </legend>
      <div className="grid grid-cols-4 gap-2">
        {(Object.keys(background) as Array<keyof BackgroundColors>).map(
          (colorKey) => (
            <div key={colorKey} className="flex flex-col items-center relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className="w-12 h-12 cursor-pointer"
                    style={{
                      backgroundColor: background[colorKey],
                      borderRadius: "50%",
                      border: "3px solid #e5e7eb",
                    }}
                    onClick={() => handleColorPickerClick(colorKey)}
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="z-50 w-auto h-auto flex items-start justify-start   bg-white rounded-lg border-none shadow-none"
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
    </form>
  );
};

export default BackgroundColorssSection;
