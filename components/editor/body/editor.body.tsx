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
    width: "30rem", // Width set to 30rem
    height: "35rem", // Height set to 35rem
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

  const sliderContainerStyle = {
    width: "calc(30rem * 5 + 5 * 1rem)", // Calculate the width to accommodate 5 slides and their margins
    overflow: "hidden", // Hide any overflow
  };

  const slideWrapperStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <main className="grid flex-1 bg-slate-100 overflow-auto md:grid-cols-2 lg:grid-cols-12">
      <MainSidebar />
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-10">
        <div style={sliderContainerStyle}>
          <Slider {...settings}>
            <div style={slideWrapperStyle}>
              <div style={slideStyle}>Slide 1</div>
            </div>
            <div style={slideWrapperStyle}>
              <div style={slideStyle}>Slide 2</div>
            </div>
            <div style={slideWrapperStyle}>
              <div style={slideStyle}>Slide 3</div>
            </div>
            <div style={slideWrapperStyle}>
              <div style={slideStyle}>Slide 4</div>
            </div>
            <div style={slideWrapperStyle}>
              <div style={slideStyle}>Slide 5</div>
            </div>
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default EditorBody;
