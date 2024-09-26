"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { HeroParallax } from "../ui/hero-parallax";
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "/carousels/slide-1.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "/carousels/slide-2.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "/carousels/slide-3.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "/carousels/slide-4.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "/carousels/slide-5.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "/carousels/slide-6.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "/carousels/slide-7.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "/carousels/slide-8.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "/carousels/slide-9.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "/carousels/slide-10.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "/carousels/slide-11.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "/carousels/slide-12.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "/carousels/slide-13.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "/carousels/slide-14.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "/carousels/slide-15.png",
  },
];
export function InfiniteCarouselsPreview() {
  return <HeroParallax products={products} />;
}

const imageUrls = [
  { url: "/carousels/slide-1.png" },
  { url: "/carousels/slide-2.png" },
  { url: "/carousels/slide-3.png" },
  { url: "/carousels/slide-4.png" },
  { url: "/carousels/slide-5.png" },
  { url: "/carousels/slide-6.png" },
];
