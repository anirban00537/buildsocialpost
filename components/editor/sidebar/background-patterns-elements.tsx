import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  setPattern,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
  setGradient,
} from "@/state/slice/carousel.slice";
import { backgroundPatterns, sharedElements } from "@/lib/coreConstants";
import { Slider } from "@/components/ui/slider";
import { CircleOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getBackgroundPattern } from "@/components/shared-components/backgrounds";

const BackgroundPatternsAndElements = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const { pattern } = useSelector((state: RootState) => state.slides.layout);
  const sharedSelectedElement = useSelector(
    (state: RootState) => state.slides.sharedSelectedElement
  );
  const layout = useSelector((state: RootState) => state.slides.layout);

  const handlePatternChange = (value: number) => dispatch(setPattern(value));

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6 bg-background/50 backdrop-blur-sm">
      {/* Pattern Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-textColor/80">Pattern</h3>
        <div className="grid grid-cols-4 gap-2">
          <div
            className={`flex justify-center items-center border p-2 rounded-md ${
              pattern === 0
                ? "bg-primary/15 border border-primary"
                : ""
            }`}
            onClick={() => handlePatternChange(0)}
          >
            <CircleOff size={16} className="text-gray-500" />
          </div>
          {backgroundPatterns.map((patternItem) => (
            <div
              key={patternItem.id}
              className={`flex justify-center items-center  border rounded-md ${
                pattern === patternItem.id
                  ? "bg-primary/15 border border-primary"
                  : ""
              }`}
              onClick={() => handlePatternChange(patternItem.id)}
            >
              <div
                className="w-full h-6 rounded-md"
                style={{
                  backgroundImage: `url("${getBackgroundPattern(
                    patternItem.id,
                    background.color4
                  )}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
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
            max={0.05}
            step={0.01}
            value={[layout.backgroundOpacity]}
            onValueChange={(value) => dispatch(setBackgroundOpacity(value[0]))}
          />
        </div>
      </section>

      {/* Shared Elements Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-textColor/80">
          Shared Elements
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <div
            className={`flex justify-center items-center p-2 border  rounded-md ${
              sharedSelectedElement?.id === 0
                ? "border border-primary"
                : "bg-white "
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
              className={`flex justify-center items-center p-2 rounded-md border ${
                sharedSelectedElement?.id === element?.id
                  ? "bg-primary/15 border border-primary"
                  : ""
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
      </section>
    </div>
  );
};

export default BackgroundPatternsAndElements;
