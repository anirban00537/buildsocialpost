import useCarousel from "@/hooks/useCarousel";
import React from "react";

const TemplateSection = () => {
  return (
    <form className="grid w-full items-start gap-6 p-4">
      <legend className="-ml-1 px-1 text-2xl font-medium mb-4">Template</legend>
      <div className="grid gap-3">
        <div className="border p-3 text-center">theme 1</div>
        <div className="border p-3 text-center">theme 2</div>
        <div className="border p-3 text-center">theme 3</div>
        <div className="border p-3 text-center">theme 4</div>
        <div className="border p-3 text-center">theme 5</div>
      </div>
    </form>
  );
};

export default TemplateSection;
