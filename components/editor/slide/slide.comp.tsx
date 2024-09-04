import React from "react";
import { ChevronRight } from "lucide-react";
import { Slide } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { setBackgroundOpacity } from "@/state/slice/carousel.slice";
import SharedElementsComponent from "./slide-parts/sharedElements";
import Text from "./slide-parts/text"; // Updated import
import Image from "./slide-parts/image";
import Background from "./slide-parts/background";
import GeneralInfo from "./slide-parts/generalInfo";
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
  const dispatch = useDispatch();
  const {
    titleTextSettings,
    descriptionTextSettings,
    taglineTextSettings,
    layout,
    sharedSelectedElement,
  } = useSelector((state: RootState) => state.slides);
  const { handle, headshot, name } = useSelector(
    (state: RootState) => state.branding
  );
  const { pattern, backgroundOpacity } = layout;
  const backgroundImageStyle = slide.backgroundImage
    ? {
        backgroundImage: `url(${slide.backgroundImage})`,
        zIndex: 0,
        opacity: backgroundOpacity,
      }
    : {
        backgroundImage: `url(${pattern})`,
        backgroundPosition: "center",
        opacity: 0.07 * backgroundOpacity,
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
          <SharedElementsComponent
            positionStyles={{
              left: "0px",
              transform: "translateX(-50%)",
              position: "absolute",
              top: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
          <SharedElementsComponent
            positionStyles={{
              right: "0px",
              transform: "translateX(50%)",
              position: "absolute",
              bottom: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
        </>
      ) : (
        <>
          <SharedElementsComponent
            positionStyles={{
              right: "0px",
              transform: "translateX(50%)",
              position: "absolute",
              top: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
          <SharedElementsComponent
            positionStyles={{
              left: "0px",
              transform: "translateX(-50%)",
              position: "absolute",
              bottom: "-60px",
              width: "320px",
              height: "320px",
            }}
            color4={color4}
            id={sharedSelectedElement?.id}
            opacity={sharedSelectedElement?.opacity}
          />
        </>
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
          padding: "32px",
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
                marginBottom: "8px",
                fontWeight: "bold",
                // color: color2,
                color: "white",
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
              onBlur={(content: string) =>
                updateSlide(index, { ...slide, tagline: content })
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
              onBlur={(content: string) =>
                updateSlide(index, { ...slide, title: content })
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
              onBlur={(content: string) =>
                updateSlide(index, {
                  ...slide,
                  description: content,
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
        {slide?.type !== "slide" && (
          <GeneralInfo
            headshot={headshot}
            name={name}
            handle={handle}
            color2={color2}
            color4={color4}
            slide={slide}
          />
        )}
      </div>

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
    </div>
  );
};

export default SlideComponent;
