import React from "react";
import { ArrowRightCircle } from "lucide-react"; // Importing the right arrow icon
import { generalSettings, Slide } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface SlideProps {
  slide: Slide;
  generalSettings: generalSettings;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  textAlign?: "left" | "center" | "right";
  slideNumber?: number;
  fontSize?: number;
}

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  generalSettings,
  index,
  updateSlide,
  textAlign = "center",
  slideNumber,
  fontSize = 12,
}) => {
  const backgroundImageStyle = slide.imageUrl
    ? { backgroundImage: `url(${slide.imageUrl})` }
    : {
        backgroundImage: `url('/backgrounds/background1.svg')`,
        backgroundPosition: "center",
        opacity: 0.1,
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "initial",
        backgroundOrigin: "initial",
        backgroundClip: "initial",
      };

  const { color1, color2, color3, color4 } = useSelector(
    (state: RootState) => state.slides.background
  );

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
        color: color2,
        backgroundColor: color1,
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          ...backgroundImageStyle,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems:
            textAlign === "center"
              ? "center"
              : textAlign === "left"
              ? "flex-start"
              : "flex-end",
          justifyContent: "center",
          textAlign: textAlign,
          width: "100%",
          padding: "0 16px",
        }}
      >
        {slideNumber !== undefined && (
          <div
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "50%",
              backgroundColor: color4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: `${14}px`,
              fontWeight: "bold",
              color: color3,
              margin: "16px",
            }}
          >
            {slideNumber}
          </div>
        )}
        <div style={{ marginBottom: "16px", width: "100%", maxWidth: "768px" }}>
          {slide.tagline && (
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateSlide(index, { ...slide, tagline: e.target.innerText })
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "8px",
                fontSize: `${fontSize}px`,
                fontStyle: "italic",
                backgroundColor: "transparent",
                border: "none",
                color: color2,
                outline: "none",
                wordBreak: "break-word",
                whiteSpace: "normal",
                resize: "none",
                textAlign: textAlign,
              }}
            >
              {slide.tagline || "Your Tagline Here"}
            </div>
          )}
          {slide.title && (
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateSlide(index, { ...slide, title: e.target.innerText })
              }
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "8px",
                fontSize: `${fontSize + 24}px`,
                fontWeight: "bold",
                backgroundColor: "transparent",
                border: "none",
                color: color2,
                outline: "none",
                wordBreak: "break-word",
                whiteSpace: "normal",
                resize: "none",
                textAlign: textAlign,
              }}
            >
              {slide.title || "Title"}
            </div>
          )}
          {slide.description && (
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                updateSlide(index, {
                  ...slide,
                  description: e.target.innerText,
                })
              }
              style={{
                width: "100%",
                padding: "8px",
                fontSize: `${fontSize}px`,
                backgroundColor: "transparent",
                border: "none",
                color: color2,
                outline: "none",
                wordBreak: "break-word",
                whiteSpace: "normal",
                resize: "none",
                textAlign: textAlign,
              }}
            >
              {slide.description ||
                "Your introductory paragraph here. Describe your content briefly."}
            </div>
          )}
        </div>
      </div>
      {generalSettings.headshotUrl && (
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "8px",
          }}
        >
          <img
            src={generalSettings.headshotUrl}
            alt="Headshot"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: `14px`,
                fontWeight: "600",
                color: color2,
              }}
            >
              {generalSettings.name || "Anirban Roy"}
            </div>
            <div
              style={{
                fontSize: `12px`,
                fontStyle: "italic",
                color: color3,
              }}
            >
              {generalSettings.handle || "@anirban00537"}
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: color4,
          textAlign: "center",
          fontSize: "12px",
          padding: "4px",
          color: color3,
        }}
      >
        Created by{" "}
        <a
          href="https://buildcarousel.com"
          style={{ color: color3, textDecoration: "underline" }}
        >
          buildcarousel.com
        </a>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "42px",
          right: "26px",
          cursor: "pointer",
        }}
      >
        <ArrowRightCircle
          size={32}
          color={color3}
          className="hover:scale-110 transition-transform"
        />
      </div>
    </div>
  );
};

export default SlideComponent;
