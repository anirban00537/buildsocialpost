import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import {
  setPattern,
  setSharedSelectedElementId,
  setSharedSelectedElementOpacity,
  setBackgroundOpacity,
} from "@/state/slice/carousel.slice";
import { backgroundPatterns, sharedElements } from "@/lib/core-constants";
import { Slider } from "@/components/ui/slider";
import {
  CircleOff,
  ChevronDown,
  ChevronUp,
  Grid,
  Layers,
  Palette,
} from "lucide-react";
import { getBackgroundPattern } from "@/components/shared-components/Backgrounds.comp";
import { motion, AnimatePresence } from "framer-motion";

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
    icon,
    isOpen,
    toggleOpen,
  }: {
    title: string;
    icon: React.ReactNode;
    isOpen: boolean;
    toggleOpen: () => void;
  }) => (
    <div
      className="cursor-pointer bg-background/50 backdrop-blur-sm rounded-md p-3 transition-all duration-200 hover:bg-background/70"
      onClick={toggleOpen}
    >
      <h3 className="text-sm font-semibold flex items-center justify-between text-textColor">
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-textColor/60" />
        ) : (
          <ChevronDown size={16} className="text-textColor/60" />
        )}
      </h3>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-6 border-b border-borderColor/20">
        <h2 className="text-xl font-semibold text-textColor flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          Patterns & Elements
        </h2>
      </div>
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {/* Pattern Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Pattern"
            icon={<Grid size={18} className="text-primary" />}
            isOpen={patternSectionOpen}
            toggleOpen={() => setPatternSectionOpen(!patternSectionOpen)}
          />
          <AnimatePresence>
            {patternSectionOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-4 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex justify-center items-center border p-2 rounded-md cursor-pointer transition-all duration-200 ${
                      pattern === 0
                        ? "bg-primary/20 border-primary shadow-inner"
                        : "hover:bg-background/70"
                    }`}
                    onClick={() => handlePatternChange(0)}
                  >
                    <CircleOff size={18} className="text-textColor/60" />
                  </motion.div>
                  {backgroundPatterns.map((patternItem) => (
                    <motion.div
                      key={patternItem.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex justify-center items-center border rounded-md cursor-pointer transition-all duration-200 overflow-hidden ${
                        pattern === patternItem.id
                          ? "border-primary shadow-md"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handlePatternChange(patternItem.id)}
                    >
                      <div
                        className="w-full h-12 rounded-md"
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
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 pb-2">
                  <label className="text-xs text-textColor/60 flex items-center justify-between">
                    Background Opacity
                    <span className="text-textColor font-medium">
                      {Math.round(layout.backgroundOpacity * 100)}%
                    </span>
                  </label>
                  <Slider
                    max={0.05}
                    step={0.01}
                    value={[layout.backgroundOpacity]}
                    onValueChange={(value) =>
                      dispatch(setBackgroundOpacity(value[0]))
                    }
                    className="my-4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Shared Elements Section */}
        <section className="space-y-4">
          <SectionHeader
            title="Shared Elements"
            icon={<Layers size={18} className="text-primary" />}
            isOpen={elementsSectionOpen}
            toggleOpen={() => setElementsSectionOpen(!elementsSectionOpen)}
          />
          <AnimatePresence>
            {elementsSectionOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-4 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex justify-center items-center p-2 border rounded-md cursor-pointer transition-all duration-200 ${
                      sharedSelectedElement?.id === 0
                        ? "bg-primary/20 border-primary shadow-inner"
                        : "hover:bg-background/70"
                    }`}
                    onClick={() => {
                      dispatch(setSharedSelectedElementId(0));
                      dispatch(setSharedSelectedElementOpacity(0.4));
                    }}
                  >
                    <CircleOff size={18} className="text-textColor/60" />
                  </motion.div>
                  {sharedElements.map((element) => (
                    <motion.div
                      key={element?.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex justify-center items-center p-2 rounded-md border cursor-pointer transition-all duration-200 ${
                        sharedSelectedElement?.id === element?.id
                          ? "bg-primary/20 border-primary shadow-inner"
                          : "hover:bg-background/70"
                      }`}
                      onClick={() => {
                        dispatch(setSharedSelectedElementId(element.id));
                        dispatch(setSharedSelectedElementOpacity(0.4));
                      }}
                    >
                      <element.component />
                    </motion.div>
                  ))}
                </div>
                <div className="space-y-2 pt-2 pb-2">
                  <label className="text-xs text-textColor/60 flex items-center justify-between">
                    Opacity
                    <span className="text-textColor font-medium">
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
                    className="my-4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default BackgroundPatternsAndElements;
