import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  setPattern,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
} from "@/state/slice/carousel.slice";
import { backgroundPatterns, sharedElements } from "@/lib/coreConstants";
import { Slider } from "@/components/ui/slider";
import { CircleOff, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { getBackgroundPattern } from "@/components/shared-components/backgrounds";

const BackgroundPatternsAndElements = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);
  const { pattern } = useSelector((state: RootState) => state.slides.layout);
  const sharedSelectedElement = useSelector(
    (state: RootState) => state.slides.sharedSelectedElement
  );
  const layout = useSelector((state: RootState) => state.slides.layout);

  const [patternSectionOpen, setPatternSectionOpen] = useState(true);
  const [elementsSectionOpen, setElementsSectionOpen] = useState(true);

  const handlePatternChange = (value: number) => dispatch(setPattern(value));

  const SectionHeader = ({
    title,
    isOpen,
    toggleOpen,
  }: {
    title: string;
    isOpen: boolean;
    toggleOpen: () => void;
  }) => (
    <div
      className={`cursor-pointer ${
        !isOpen ? "border-b border-gray-200 pb-2" : ""
      }`}
      onClick={toggleOpen}
    >
      <h3 className="text-sm font-semibold flex items-center justify-between text-textColor/80">
        {title}
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronRight size={16} className="text-gray-400" />
        )}
      </h3>
    </div>
  );

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6 bg-white text-gray-800">
      {/* Pattern Section */}
      <section className="space-y-4">
        <SectionHeader
          title="Pattern"
          isOpen={patternSectionOpen}
          toggleOpen={() => setPatternSectionOpen(!patternSectionOpen)}
        />
        {patternSectionOpen && (
          <>
            <div className="grid grid-cols-4 gap-2">
              <div
                className={`flex justify-center items-center border p-2 rounded-md cursor-pointer transition-all duration-200 ${
                  pattern === 0
                    ? "bg-blue-100 border-blue-500 shadow-inner"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handlePatternChange(0)}
              >
                <CircleOff size={16} className="text-gray-500" />
              </div>
              {backgroundPatterns.map((patternItem) => (
                <div
                  key={patternItem.id}
                  className={`flex justify-center items-center border rounded-md cursor-pointer transition-all duration-200 ${
                    pattern === patternItem.id
                      ? "bg-blue-100 border-blue-500 shadow-inner"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handlePatternChange(patternItem.id)}
                >
                  <div
                    className="w-full h-8 rounded-md"
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
              <label className="text-xs text-gray-500 flex items-center justify-between">
                Background Opacity
                <span className="text-gray-700 font-medium">
                  {Math.round(layout.backgroundOpacity * 100)}%
                </span>
              </label>
              <Slider
                max={0.05}
                step={0.01}
                value={[layout.backgroundOpacity]}
                onValueChange={(value) => dispatch(setBackgroundOpacity(value[0]))}
                className="my-2"
              />
            </div>
          </>
        )}
      </section>

      {/* Shared Elements Section */}
      <section className="space-y-4">
        <SectionHeader
          title="Shared Elements"
          isOpen={elementsSectionOpen}
          toggleOpen={() => setElementsSectionOpen(!elementsSectionOpen)}
        />
        {elementsSectionOpen && (
          <>
            <div className="grid grid-cols-4 gap-2">
              <div
                className={`flex justify-center items-center p-2 border rounded-md cursor-pointer transition-all duration-200 ${
                  sharedSelectedElement?.id === 0
                    ? "bg-blue-100 border-blue-500 shadow-inner"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  dispatch(setSharedSelectedElementId(0));
                  dispatch(setSharedSelectedElementOpacity(0.4));
                }}
              >
                <CircleOff size={16} className="text-gray-500" />
              </div>
              {sharedElements.map((element) => (
                <div
                  key={element?.id}
                  className={`flex justify-center items-center p-2 rounded-md border cursor-pointer transition-all duration-200 ${
                    sharedSelectedElement?.id === element?.id
                      ? "bg-blue-100 border-blue-500 shadow-inner"
                      : "hover:bg-gray-100"
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
              <label className="text-xs text-gray-500 flex items-center justify-between">
                Opacity
                <span className="text-gray-700 font-medium">
                  {Math.round((sharedSelectedElement?.opacity || 0) * 100)}%
                </span>
              </label>
              <Slider
                max={1}
                step={0.01}
                value={[sharedSelectedElement?.opacity || 0]}
                onValueChange={(value) =>
                  dispatch(setSharedSelectedElementOpacity(value[0]))
                }
                className="my-2"
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default BackgroundPatternsAndElements;
