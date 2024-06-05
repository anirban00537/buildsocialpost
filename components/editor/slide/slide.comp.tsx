import React from "react";
import { generalSettings, Slide } from "@/types";

interface SlideProps {
  slide: Slide;
  generalSettings: generalSettings;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number) => void;
}

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  index,
  generalSettings,
  updateSlide,
  deleteSlide,
}) => {
  const backgroundImageStyle = slide.imageUrl
    ? { backgroundImage: `url(${slide.imageUrl})` }
    : { background: "#feb47b" };

  return (
    <div
      style={{
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        ...backgroundImageStyle,
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, subtitle: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "1.125rem",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word", // Corrected here
              whiteSpace: "normal",
              resize: "none",
            }}
          >
            {slide.subtitle || "Subtitle"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, title: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "2.25rem",
              fontWeight: "bold",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word", // Corrected here
              whiteSpace: "normal",
              resize: "none",
            }}
          >
            {slide.title || "Title"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, description: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word", // Corrected here
              whiteSpace: "normal",
              resize: "none",
            }}
          >
            {slide.description || "Description"}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem", // Use gap for spacing
          padding: "0.5rem",
          borderRadius: "0.5rem",
        }}
      >
        {generalSettings.headshotUrl && (
          <img
            src={generalSettings.headshotUrl}
            alt="Headshot"
            style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "0.875rem", fontWeight: "600" }}>
            {generalSettings.name || "Anirban Roy"}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#d1d5db" }}>
            {generalSettings.handle || "@anirban00537"}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          fontSize: "0.75rem",
          padding: "0.25rem",
        }}
      >
        Created by{" "}
        <a
          href="https://buildcarousel.com"
          style={{ color: "white", textDecoration: "underline" }}
        >
          buildcarousel.com
        </a>
      </div>
    </div>
  );
};

export default SlideComponent;
