import { setPattern } from "@/state/slice/carousel.slice";
import React from "react";
import { useDispatch } from "react-redux";

const DesignSection = () => {
  const dispatch = useDispatch();
  const handlePatternChange = (value: string) => {
    dispatch(setPattern(value));
  };
  return (
    <form className="grid w-full items-start gap-6 p-4  rounded-lg">
      <legend className="text-lg font-semibold">Template</legend>
      <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm transform transition duration-500 hover:scale-105"
              style={{
                background: `url('/backgrounds/background${index + 1}.svg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "50px",
              }}
              onClick={() =>
                handlePatternChange(`/backgrounds/background${index + 1}.svg`)
              }
            />
          ))}
      </div>
    </form>
  );
};

export default DesignSection;
