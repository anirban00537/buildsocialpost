import React from "react";
import { ChevronRight } from "lucide-react"; // Importing the right arrow icon
import { Slide } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

interface SlideProps {
  slide: Slide;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  slideNumber?: number;
}

interface TextProps {
  content: string;
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  fontSize: number;
  fontStyle: string;
  fontWeight: string | number;
  alignment: "left" | "center" | "right";
  placeholder: string;
}

const Text: React.FC<TextProps> = ({
  content,
  onBlur,
  fontSize,
  fontStyle,
  fontWeight,
  alignment,
  placeholder,
}) => {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={onBlur}
      style={{
        width: "100%",
        marginBottom: "8px",
        fontSize: `${fontSize}px`,
        fontStyle: fontStyle,
        fontWeight: fontWeight,
        backgroundColor: "transparent",
        border: "none",
        color: "inherit",
        outline: "none",
        wordBreak: "break-word",
        whiteSpace: "normal",
        resize: "none",
        textAlign: alignment,
      }}
    >
      {content || placeholder}
    </div>
  );
};

interface ImageProps {
  imageUrl: string | null;
}

const Image: React.FC<ImageProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexShrink: 1,
        overflow: "hidden",
      }}
    >
      <img
        src={imageUrl}
        alt="Slide image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          padding: "8px",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

interface BackgroundProps {
  backgroundImageStyle: React.CSSProperties;
  color1: string;
  pattern: string;
  backgroundImage?: string | null;
}

const Background: React.FC<BackgroundProps> = ({
  backgroundImageStyle,
  color1,
  pattern,
  backgroundImage,
}) => {
  return (
    <>
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
      {backgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            backgroundColor: color1,
            opacity: 0.5,
          }}
        />
      )}
    </>
  );
};

interface GeneralInfoProps {
  headshotUrl: string;
  name: string;
  handle: string;
  color2: string;
  color4: string;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  headshotUrl,
  name,
  handle,
  color2,
  color4,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        left: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <img
        src={headshotUrl}
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
          {name || "Anirban Roy"}
        </div>
        <div
          style={{
            fontSize: `12px`,
            fontStyle: "italic",
            color: color2,
          }}
        >
          {handle || "@anirban00537"}
        </div>
      </div>
    </div>
  );
};

interface GradientCircleProps {
  positionStyles: React.CSSProperties;
  color4: string;
}

const GradientCircle: React.FC<GradientCircleProps> = ({
  positionStyles,
  color4,
}) => {
  return (
    <div
      style={{
        ...positionStyles,
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 50%, ${color4} 0%, transparent 60%)`,
      }}
    ></div>
  );
};

const SlideComponent: React.FC<SlideProps> = ({
  slide,
  index,
  updateSlide,
  slideNumber,
}) => {
  const {
    titleTextSettings,
    descriptionTextSettings,
    taglineTextSettings,
    layout,
  } = useSelector((state: RootState) => state.slides);
  const { generalSettings } = useSelector((state: RootState) => state.slides);
  const { pattern } = layout;
  const backgroundImageStyle = slide.backgroundImage
    ? {
        backgroundImage: `url(${slide.backgroundImage})`,
        zIndex: 0,
      }
    : {
        backgroundImage: `url(${pattern})`,
        backgroundPosition: "center",
        opacity: 0.06,
        backgroundRepeat: "repeat",
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
      {index % 2 === 1 ? (
        <>
          <GradientCircle
            positionStyles={{
              left: "0px",
              transform: "translateX(-50%)",
              position: "absolute",
              bottom: "0px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
          />
          <GradientCircle
            positionStyles={{
              right: "0px",
              transform: "translateX(70%)",
              position: "absolute",
              top: "-140px",
              width: "420px",
              height: "420px",
            }}
            color4={color4}
          />
        </>
      ) : (
        <GradientCircle
          positionStyles={{
            right: "0px",
            transform: "translateX(50%)",
            position: "absolute",
            bottom: "0px",
            width: "320px",
            height: "320px",
          }}
          color4={color4}
        />
      )}

      <Background
        backgroundImageStyle={backgroundImageStyle}
        color1={color1}
        pattern={pattern}
        backgroundImage={slide.backgroundImage}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems:
            titleTextSettings.alignment === "center"
              ? "center"
              : titleTextSettings.alignment === "left"
              ? "flex-start"
              : "flex-end",
          justifyContent: "center",
          textAlign: titleTextSettings.alignment,
          width: "100%",
          height: "100%",
          padding: "42px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: "16px",
            width: "100%",
            maxWidth: "768px",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {slideNumber !== undefined && slide?.type === "slide" && (
            <p
              style={{
                height: "32px",
                width: "32px",
                minWidth: "32px",
                minHeight: "32px",
                borderRadius: "50%",
                backgroundColor: color4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: `${14}px`,
                fontWeight: "bold",
                color: color2,
                alignSelf:
                  titleTextSettings.alignment === "center"
                    ? "center"
                    : titleTextSettings.alignment === "left"
                    ? "flex-start"
                    : "flex-end",
              }}
            >
              {slideNumber}
            </p>
          )}
          {slide.tagline && (
            <Text
              content={slide.tagline}
              onBlur={(e) =>
                updateSlide(index, { ...slide, tagline: e.target.innerText })
              }
              fontSize={taglineTextSettings.fontSize}
              fontStyle={taglineTextSettings.fontStyle}
              fontWeight={taglineTextSettings.fontWeight}
              alignment={taglineTextSettings.alignment}
              placeholder="Your Tagline Here"
            />
          )}
          {slide.title && (
            <Text
              content={slide.title}
              onBlur={(e) =>
                updateSlide(index, { ...slide, title: e.target.innerText })
              }
              fontSize={titleTextSettings.fontSize}
              fontStyle={titleTextSettings.fontStyle}
              fontWeight={titleTextSettings.fontWeight}
              alignment={titleTextSettings.alignment}
              placeholder="Title"
            />
          )}
          {slide.description && (
            <Text
              content={slide.description}
              onBlur={(e) =>
                updateSlide(index, {
                  ...slide,
                  description: e.target.innerText,
                })
              }
              fontSize={descriptionTextSettings.fontSize}
              fontStyle={descriptionTextSettings.fontStyle}
              fontWeight={descriptionTextSettings.fontWeight}
              alignment={descriptionTextSettings.alignment}
              placeholder="Your introductory paragraph here. Describe your content briefly."
            />
          )}
          <Image imageUrl={slide.imageUrl || null} />
        </div>
      </div>
      {generalSettings.headshotUrl &&
        generalSettings.name &&
        generalSettings.handle &&
        slide?.type !== "slide" && (
          <GeneralInfo
            headshotUrl={generalSettings.headshotUrl}
            name={generalSettings.name}
            handle={generalSettings.handle}
            color2={color2}
            color4={color4}
          />
        )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: color3,
          textAlign: "center",
          fontSize: "12px",
          padding: "4px",
          color: color2,
          zIndex: 1,
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
