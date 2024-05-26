"use client";
import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSidebar from "../sidebar/main.sidebar";

// Dynamically import the Slider component from react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const EditorBody = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const slideStyle = {
    width: "30rem", // Adjusted width
    height: "35rem", // Adjusted height
    border: "1px solid black",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    margin: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
  };

  return (
    <main className="grid flex-1 bg-slate-100 overflow-auto md:grid-cols-2 lg:grid-cols-12">
      <MainSidebar />
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-10">
        <Slider {...settings}>
          <div className="px-2">
            <div style={slideStyle}>Slide 1</div>
          </div>
          <div className="px-2">
            <div style={slideStyle}>Slide 2</div>
          </div>
          <div className="px-2">
            <div style={slideStyle}>Slide 3</div>
          </div>
          <div className="px-2">
            <div style={slideStyle}>Slide 4</div>
          </div>
          <div className="px-2">
            <div style={slideStyle}>Slide 5</div>
          </div>
        </Slider>
      </div>
    </main>
  );
};

export default EditorBody;
