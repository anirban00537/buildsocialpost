"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteCarouselsPreview() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col  bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={imageUrls} direction="right" speed="slow" />
    </div>
  );
}

const imageUrls = [
  { url: "/carousels/slide-1.png" },
  { url: "/carousels/slide-2.png" },
  { url: "/carousels/slide-3.png" },
  { url: "/carousels/slide-4.png" },
  { url: "/carousels/slide-5.png" },
  { url: "/carousels/slide-6.png" },
];
