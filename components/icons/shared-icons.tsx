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
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="13 5 19 5 19 11"/>
    <polyline points="11 19 5 19 5 13"/>
    <line x1="19" x2="5" y1="5" y2="19"/>
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
      d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2v2"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22v-2"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m17 20.66-1-1.73"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 10.27 7 3.34"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m20.66 17-1.73-1"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m3.34 7 1.73 1"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 12h8"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12h2"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m20.66 7-1.73 1"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m3.34 17 1.73-1"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m17 3.34-1 1.73"
      stroke={color}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m11 13.73-4 6.93"
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

export const Bee: React.FC<IconProps> = ({
  color,
  size,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 3V4L15.3436 8.77793C15.766 9.24255 16 9.85471 16 10.4826C16 11.8633 14.8807 13 13.5 13C12.1193 13 11 11.8807 11 10.5V9.68629C11 9.79109 10.9979 9.89568 10.9939 10H5.00615C5.00206 9.89568 5 9.79109 5 9.68629V10.5C5 11.8807 3.88071 13 2.5 13C1.11929 13 0 11.8633 0 10.4826C0 9.85471 0.234044 9.24255 0.65643 8.77793L5 4V3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3ZM5 8H11V6H5V8Z"
      fill={color}
    />
    <path
      d="M8.65685 15.3431C9.59779 14.4022 10.2801 13.251 10.6581 12H5.34187C5.71987 13.251 6.40221 14.4022 7.34315 15.3431L8 16L8.65685 15.3431Z"
      fill={color}
    />
  </svg>
);
export const Calendar: React.FC<IconProps> = ({
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke={color} strokeWidth="2" />
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Tie: React.FC<IconProps> = ({
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
    <path d="M12 2L9 7H15L12 2Z" fill={color} />
    <path d="M10 8L12 22L14 8H10Z" fill={color} />
  </svg>
);

export const Briefcase: React.FC<IconProps> = ({
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
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" fill="none" stroke={color} strokeWidth="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" fill="none" stroke={color} strokeWidth="2" />
  </svg>
);

export const Chart: React.FC<IconProps> = ({
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
    <line x1="18" y1="20" x2="18" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="20" x2="21" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Lightbulb: React.FC<IconProps> = ({
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
    <path d="M9 18h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M10 22h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8c0-1-1-6-6-6S6 7 6 8c0 1.53.8 2.84 2.4 3.93.73.64 1.16 1.37 1.31 2.07" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const Palette: React.FC<IconProps> = ({
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
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
      fill={color}
    />
  </svg>
);

export const Shapes: React.FC<IconProps> = ({
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
    <circle cx="5" cy="5" r="3" fill={color} />
    <rect x="14" y="2" width="6" height="6" fill={color} />
    <polygon points="12,22 17,15 7,15" fill={color} />
  </svg>
);

export const Typography: React.FC<IconProps> = ({
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
      d="M9 7h6v2h-2v8h-2V9H9V7zm8 0h2v10h-2V7zM5 7h2v10H5V7z"
      fill={color}
    />
    <path d="M3 3h18v18H3V3zm2 2v14h14V5H5z" fill={color} />
  </svg>
);

export const Layout: React.FC<IconProps> = ({
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
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
    <line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth="2" />
    <line x1="9" y1="21" x2="9" y2="9" stroke={color} strokeWidth="2" />
  </svg>
);

export const ImageFrame: React.FC<IconProps> = ({
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
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
    <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <polyline
      points="21 15 16 10 5 21"
      fill="none"
      stroke={color}
      strokeWidth="2"
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
Bee.defaultProps = defaultProps;
Calendar.defaultProps = defaultProps;
Tie.defaultProps = defaultProps;
Briefcase.defaultProps = defaultProps;
Chart.defaultProps = defaultProps;
Lightbulb.defaultProps = defaultProps;
Palette.defaultProps = defaultProps;
Shapes.defaultProps = defaultProps;
Typography.defaultProps = defaultProps;
Layout.defaultProps = defaultProps;
ImageFrame.defaultProps = defaultProps;

