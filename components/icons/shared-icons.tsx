import React from "react";

interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

const defaultProps: IconProps = {
  color: "currentColor",
  size: 24,
  className: "",
};

export const ArrowRight: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      d="M12 4l8 8-8 8M4 12h16"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CircularProgress: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeDasharray="62.8 62.8"
      strokeDashoffset="15.7"
    />
  </svg>
);

export const PlayButton: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <polygon points="5,3 19,12 5,21" fill={color} />
  </svg>
);

export const Heart: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
    />
  </svg>
);

export const Star: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={color}
    />
  </svg>
);

export const Fullscreen: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Settings: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="3" fill={color} />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Share: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <circle cx="18" cy="5" r="3" fill={color} />
    <circle cx="6" cy="12" r="3" fill={color} />
    <circle cx="18" cy="19" r="3" fill={color} />
    <line
      x1="8.59"
      y1="13.51"
      x2="15.42"
      y2="17.49"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="15.41"
      y1="6.51"
      x2="8.59"
      y2="10.49"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

ArrowRight.defaultProps = defaultProps;
CircularProgress.defaultProps = defaultProps;
PlayButton.defaultProps = defaultProps;
Heart.defaultProps = defaultProps;
Star.defaultProps = defaultProps;
Fullscreen.defaultProps = defaultProps;
Settings.defaultProps = defaultProps;
Share.defaultProps = defaultProps;
