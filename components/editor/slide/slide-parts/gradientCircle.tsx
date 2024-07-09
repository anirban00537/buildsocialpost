import React from "react";

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

export default GradientCircle;
