import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#dcdcdc", // Example hex value, replace with actual values
        input: "#f5f5f5", // Example hex value, replace with actual values
        ring: "#c0c0c0", // Example hex value, replace with actual values
        background: "#ffffff", // Example hex value, replace with actual values
        foreground: "#000000", // Example hex value, replace with actual values
        primary: {
          DEFAULT: "#3490dc", // Example hex value, replace with actual values
          foreground: "#ffffff", // Example hex value, replace with actual values
        },
        secondary: {
          DEFAULT: "#F1F3F5", // Example hex value, replace with actual values
          foreground: "#000000", // Example hex value, replace with actual values
        },
        destructive: {
          DEFAULT: "#e3342f", // Example hex value, replace with actual values
          foreground: "#ffffff", // Example hex value, replace with actual values
        },
        muted: {
          DEFAULT: "#f5f5f5", // Example hex value, replace with actual values
          foreground: "#737373", // Example hex value, replace with actual values
        },
        accent: {
          DEFAULT: "#3490dc", // Example hex value, replace with actual values
          foreground: "#ffffff", // Example hex value, replace with actual values
        },
        popover: {
          DEFAULT: "#ffffff", // Example hex value, replace with actual values
          foreground: "#000000", // Example hex value, replace with actual values
        },
        card: {
          DEFAULT: "#f8f9fa", // Example hex value, replace with actual values
          foreground: "#212529", // Example hex value, replace with actual values
        },
      },
      borderRadius: {
        lg: "0.75rem", // Example value, replace with actual values
        md: "0.5rem", // Example value, replace with actual values
        sm: "0.25rem", // Example value, replace with actual values
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default config;
