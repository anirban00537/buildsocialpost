import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/state/store";
import { setBackgroundSettings } from "@/state/slice/carousel.slice";

const BackgroundColorssSection = () => {
  const dispatch = useDispatch();
  const background = useSelector((state: RootState) => state.slides.background);

  const handleBackgroundTypeChange = (type: "color" | "image" | "gradient") => {
    dispatch(setBackgroundSettings({ type }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBackgroundSettings({ type: "color", color: e.target.value }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBackgroundSettings({ type: "image", imageUrl: e.target.value })
    );
  };

  const handleGradientChange = (index: number, color: string) => {
    const newGradient = [...background.gradient];
    newGradient[index] = color;
    dispatch(
      setBackgroundSettings({ type: "gradient", gradient: newGradient })
    );
  };

  return (
    <form className="grid w-full items-start gap-6 p-4 rounded-lg bg-white">
      <legend className="text-lg font-semibold">Background Settings</legend>
      <div className="grid gap-3">
        <div className="text-[14px] font-medium">Type</div>
        <select
          value={background.type}
          onChange={(e) =>
            handleBackgroundTypeChange(
              e.target.value as "color" | "image" | "gradient"
            )
          }
          className="p-2 border rounded-lg"
        >
          <option value="color">Color</option>
          <option value="image">Image</option>
          <option value="gradient">Gradient</option>
        </select>
      </div>
      {background.type === "color" && (
        <div className="grid gap-3">
          <div className="text-[14px] font-medium">Color</div>
          <input
            type="color"
            value={background.color}
            onChange={handleColorChange}
            className="p-2 border rounded-lg"
          />
        </div>
      )}
      {background.type === "image" && (
        <div className="grid gap-3">
          <div className="text-[14px] font-medium">Image URL</div>
          <input
            type="text"
            value={background.imageUrl}
            onChange={handleImageUrlChange}
            className="p-2 border rounded-lg"
            placeholder="Enter image URL"
          />
        </div>
      )}
      {background.type === "gradient" && (
        <div className="grid gap-3">
          <div className="text-[14px] font-medium">Gradient Colors</div>
          {background.gradient.map((color, index) => (
            <input
              key={index}
              type="color"
              value={color}
              onChange={(e) => handleGradientChange(index, e.target.value)}
              className="p-2 border rounded-lg mb-2"
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default BackgroundColorssSection;
