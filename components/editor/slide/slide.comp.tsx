import React from "react";
import { ChevronRight } from "lucide-react"; // Importing the right arrow icon
import { generalSettings, Slide } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface SlideProps {
  slide: Slide;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  slideNumber?: number;
}

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  index,
  updateSlide,
  slideNumber,
}) => {
  const { textSettings } = useSelector((state: RootState) => state.slides);
  const { generalSettings } = useSelector((state: RootState) => state.slides);
  const { alignment, fontSize } = textSettings;
  const backgroundImageStyle = slide.imageUrl
    ? { backgroundImage: `url(${slide.imageUrl})` }
    : {
        backgroundImage: `url('/backgrounds/background5.svg')`,
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
            alignment === "center"
              ? "center"
              : alignment === "left"
              ? "flex-start"
              : "flex-end",
          justifyContent: "center",
          textAlign: alignment,
          width: "100%",
          padding: "0 16px",
        }}
      >
        {slideNumber !== undefined && slide?.type === "slide" && (
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
              color: color2,
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
                backgroundColor: "transparent",
                border: "none",
                color: color2,
                outline: "none",
                wordBreak: "break-word",
                whiteSpace: "normal",
                resize: "none",
                textAlign: alignment,
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
                textAlign: alignment,
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
                textAlign: alignment,
              }}
            >
              {slide.description ||
                "Your introductory paragraph here. Describe your content briefly."}
            </div>
          )}
        </div>
      </div>
      {generalSettings.headshotUrl &&
        generalSettings.name &&
        generalSettings.handle &&
        slide?.type !== "slide" && (
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
                border: `2px solid ${color4}`,
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
                  color: color2,
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
          backgroundColor: color1,
          textAlign: "center",
          fontSize: "12px",
          padding: "4px",
          color: color2,
        }}
      >
        Created by{" "}
        <a
          href="https://buildcarousel.com"
          style={{ color: color2, textDecoration: "none", fontWeight: "bold" }}
        >
          buildcarousel.com
        </a>
      </div>
      {slide?.type === "intro" && (
        <div
          style={{
            position: "absolute",
            bottom: "42px",
            right: "26px",
            cursor: "pointer",
            borderRadius: "10px",
            backgroundColor: color4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            padding: "2px",
            paddingLeft: "12px",
            paddingRight: "8px",
            fontSize: "14px",
            color: color2,
          }}
        >
          Swipe
          <ChevronRight
            size={23}
            color={color2}
            className="hover:scale-110 transition-transform"
          />
        </div>
      )}
    </div>
  );
};

export default SlideComponent;
