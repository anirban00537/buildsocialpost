import React from "react";

interface GradientCircleProps {
  positionStyles: React.CSSProperties;
  color4: string;
  color2: string;
}

const GradientCircle: React.FC<GradientCircleProps> = ({
  positionStyles,
  color4,
  color2,
}) => {
  return (
    <div
      style={{
        ...positionStyles,
        borderRadius: "50%",
        // background: `radial-gradient(circle at 50% 50%, ${color4} -30%, transparent 50%)`,
        display: "flex",
        justifyContent: "center",
        opacity: 0.5,
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <svg
        width="50%"
        height="50%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: 0.9,
        }}
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke={color4}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default GradientCircle;
