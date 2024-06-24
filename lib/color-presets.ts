export type BackgroundColors = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
};

const colorPresets: BackgroundColors[] = [
  {
    color1: "#2c3e50", // Dark Blue - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2980b9", // Bright Blue - Background Color
  },
  {
    color1: "#27ae60", // Green - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2ecc71", // Bright Green - Background Color
  },
  {
    color1: "#8e44ad", // Purple - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#9b59b6", // Light Purple - Background Color
  },
  {
    color1: "#e74c3c", // Red - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#c0392b", // Dark Red - Background Color
  },
  {
    color1: "#1abc9c", // Turquoise - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#16a085", // Dark Turquoise - Background Color
  },
  {
    color1: "#f39c12", // Orange - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#e67e22", // Dark Orange - Background Color
  },
  {
    color1: "#3498db", // Light Blue - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2980b9", // Dark Blue - Background Color
  },
  {
    color1: "#34495e", // Dark Grey - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#2c3e50", // Very Dark Blue - Background Color
  },
  {
    color1: "#d35400", // Pumpkin - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#e67e22", // Carrot - Background Color
  },
  {
    color1: "#c0392b", // Red - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#e74c3c", // Light Red - Background Color
  },
  {
    color1: "#16a085", // Green - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#1abc9c", // Light Green - Background Color
  },
  {
    color1: "#2980b9", // Blue - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#3498db", // Light Blue - Background Color
  },
  {
    color1: "#7f8c8d", // Asbestos - Background Color
    color2: "#ecf0f1", // Light Grey - Text Color
    color3: "#bdc3c7", // Silver - Text Color
    color4: "#95a5a6", // Concrete - Background Color
  },
  {
    color1: "#ff6347", // Tomato - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#f0e68c", // Khaki - Text Color
    color4: "#ff4500", // OrangeRed - Background Color
  },
  {
    color1: "#556b2f", // DarkOliveGreen - Background Color
    color2: "#f5f5f5", // WhiteSmoke - Text Color
    color3: "#dcdcdc", // Gainsboro - Text Color
    color4: "#6b8e23", // OliveDrab - Background Color
  },
  {
    color1: "#4682b4", // SteelBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#b0c4de", // LightSteelBlue - Text Color
    color4: "#5f9ea0", // CadetBlue - Background Color
  },
  {
    color1: "#8b4513", // SaddleBrown - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#deb887", // BurlyWood - Text Color
    color4: "#a0522d", // Sienna - Background Color
  },
  {
    color1: "#ff1493", // DeepPink - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ff69b4", // HotPink - Text Color
    color4: "#ffb6c1", // LightPink - Background Color
  },
  {
    color1: "#2e8b57", // SeaGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#3cb371", // MediumSeaGreen - Text Color
    color4: "#66cdaa", // MediumAquamarine - Background Color
  },
  {
    color1: "#b22222", // FireBrick - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#cd5c5c", // IndianRed - Text Color
    color4: "#e9967a", // DarkSalmon - Background Color
  },
  {
    color1: "#4b0082", // Indigo - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#9370db", // MediumPurple - Text Color
    color4: "#8a2be2", // BlueViolet - Background Color
  },
  {
    color1: "#00ced1", // DarkTurquoise - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#20b2aa", // LightSeaGreen - Text Color
    color4: "#40e0d0", // Turquoise - Background Color
  },
  {
    color1: "#ff8c00", // DarkOrange - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffa07a", // LightSalmon - Text Color
    color4: "#ff4500", // OrangeRed - Background Color
  },
  {
    color1: "#1e90ff", // DodgerBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#87cefa", // LightSkyBlue - Text Color
    color4: "#4169e1", // RoyalBlue - Background Color
  },
  {
    color1: "#32cd32", // LimeGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#7cfc00", // LawnGreen - Text Color
    color4: "#228b22", // ForestGreen - Background Color
  },
  {
    color1: "#ff69b4", // HotPink - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffb6c1", // LightPink - Text Color
    color4: "#db7093", // PaleVioletRed - Background Color
  },
  {
    color1: "#00bfff", // DeepSkyBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#add8e6", // LightBlue - Text Color
    color4: "#87ceeb", // SkyBlue - Background Color
  },
  {
    color1: "#9932cc", // DarkOrchid - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ba55d3", // MediumOrchid - Text Color
    color4: "#dda0dd", // Plum - Background Color
  },
  {
    color1: "#ff7f50", // Coral - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffa07a", // LightSalmon - Text Color
    color4: "#ff6347", // Tomato - Background Color
  },
  {
    color1: "#00fa9a", // MediumSpringGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#98fb98", // PaleGreen - Text Color
    color4: "#00ff7f", // SpringGreen - Background Color
  },
  {
    color1: "#8b0000", // DarkRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#b22222", // FireBrick - Text Color
    color4: "#ff4500", // OrangeRed - Background Color
  },
  {
    color1: "#daa520", // GoldenRod - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffd700", // Gold - Text Color
    color4: "#ffc107", // Amber - Background Color
  },
  {
    color1: "#48d1cc", // MediumTurquoise - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#afeeee", // PaleTurquoise - Text Color
    color4: "#40e0d0", // Turquoise - Background Color
  },
  {
    color1: "#ff4500", // OrangeRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffa07a", // LightSalmon - Text Color
    color4: "#ff6347", // Tomato - Background Color
  },
  {
    color1: "#6a5acd", // SlateBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#836fff", // MediumSlateBlue - Text Color
    color4: "#7b68ee", // LightSlateBlue - Background Color
  },
  {
    color1: "#8b008b", // DarkMagenta - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#dda0dd", // Plum - Text Color
    color4: "#9400d3", // DarkViolet - Background Color
  },
  {
    color1: "#ffdead", // NavajoWhite - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#ffe4b5", // Moccasin - Text Color
    color4: "#ffebcd", // BlanchedAlmond - Background Color
  },
  {
    color1: "#483d8b", // DarkSlateBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#6a5acd", // SlateBlue - Text Color
    color4: "#7b68ee", // MediumSlateBlue - Background Color
  },
  {
    color1: "#ff4500", // OrangeRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffa07a", // LightSalmon - Text Color
    color4: "#ff6347", // Tomato - Background Color
  },
  {
    color1: "#5f9ea0", // CadetBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#b0e0e6", // PowderBlue - Text Color
    color4: "#4682b4", // SteelBlue - Background Color
  },
  {
    color1: "#00ff7f", // SpringGreen - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#98fb98", // PaleGreen - Text Color
    color4: "#00fa9a", // MediumSpringGreen - Background Color
  },
  {
    color1: "#dc143c", // Crimson - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ff69b4", // HotPink - Text Color
    color4: "#ff1493", // DeepPink - Background Color
  },
  {
    color1: "#556b2f", // DarkOliveGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#6b8e23", // OliveDrab - Text Color
    color4: "#808000", // Olive - Background Color
  },
  {
    color1: "#ff69b4", // HotPink - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffc0cb", // Pink - Text Color
    color4: "#ff1493", // DeepPink - Background Color
  },
  {
    color1: "#4682b4", // SteelBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#87ceeb", // SkyBlue - Text Color
    color4: "#5f9ea0", // CadetBlue - Background Color
  },
  {
    color1: "#8a2be2", // BlueViolet - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#9370db", // MediumPurple - Text Color
    color4: "#9400d3", // DarkViolet - Background Color
  },
  {
    color1: "#ff6347", // Tomato - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffa07a", // LightSalmon - Text Color
    color4: "#ff4500", // OrangeRed - Background Color
  },
  {
    color1: "#2e8b57", // SeaGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#3cb371", // MediumSeaGreen - Text Color
    color4: "#20b2aa", // LightSeaGreen - Background Color
  },
  {
    color1: "#d2691e", // Chocolate - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#cd853f", // Peru - Text Color
    color4: "#a0522d", // Sienna - Background Color
  },
  {
    color1: "#ff8c00", // DarkOrange - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ffa500", // Orange - Text Color
    color4: "#ff7f50", // Coral - Background Color
  },
  {
    color1: "#00ced1", // DarkTurquoise - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#40e0d0", // Turquoise - Text Color
    color4: "#48d1cc", // MediumTurquoise - Background Color
  },
  {
    color1: "#da70d6", // Orchid - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ee82ee", // Violet - Text Color
    color4: "#dda0dd", // Plum - Background Color
  },
  {
    color1: "#6495ed", // CornflowerBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#add8e6", // LightBlue - Text Color
    color4: "#4682b4", // SteelBlue - Background Color
  },
  {
    color1: "#5d3fd3", // Iris - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#9575cd", // MediumPurple - Text Color
    color4: "#7b5eb0", // LavenderIndigo - Background Color
  },
  {
    color1: "#ffb6c1", // LightPink - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#ff69b4", // HotPink - Text Color
    color4: "#ff1493", // DeepPink - Background Color
  },
  {
    color1: "#ff7f50", // Coral - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ff6347", // Tomato - Text Color
    color4: "#ff4500", // OrangeRed - Background Color
  },
  {
    color1: "#6b8e23", // OliveDrab - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#9acd32", // YellowGreen - Text Color
    color4: "#556b2f", // DarkOliveGreen - Background Color
  },
  {
    color1: "#b0e0e6", // PowderBlue - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#87ceeb", // SkyBlue - Text Color
    color4: "#4682b4", // SteelBlue - Background Color
  },
  {
    color1: "#dda0dd", // Plum - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#ee82ee", // Violet - Text Color
    color4: "#d8bfd8", // Thistle - Background Color
  },
  {
    color1: "#98fb98", // PaleGreen - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#8fbc8f", // DarkSeaGreen - Text Color
    color4: "#90ee90", // LightGreen - Background Color
  },
  {
    color1: "#ff4500", // OrangeRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ff6347", // Tomato - Text Color
    color4: "#ff8c00", // DarkOrange - Background Color
  },
  {
    color1: "#9932cc", // DarkOrchid - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ba55d3", // MediumOrchid - Text Color
    color4: "#9400d3", // DarkViolet - Background Color
  },
  {
    color1: "#8b0000", // DarkRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#cd5c5c", // IndianRed - Text Color
    color4: "#dc143c", // Crimson - Background Color
  },
  {
    color1: "#ffefd5", // PapayaWhip - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#ffe4e1", // MistyRose - Text Color
    color4: "#ffdab9", // PeachPuff - Background Color
  },
  {
    color1: "#8fbc8f", // DarkSeaGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#98fb98", // PaleGreen - Text Color
    color4: "#2e8b57", // SeaGreen - Background Color
  },
  {
    color1: "#deb887", // BurlyWood - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#d2b48c", // Tan - Text Color
    color4: "#f4a460", // SandyBrown - Background Color
  },
  {
    color1: "#3cb371", // MediumSeaGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#66cdaa", // MediumAquamarine - Text Color
    color4: "#2e8b57", // SeaGreen - Background Color
  },
  {
    color1: "#8a2be2", // BlueViolet - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#9400d3", // DarkViolet - Text Color
    color4: "#9932cc", // DarkOrchid - Background Color
  },
  {
    color1: "#48d1cc", // MediumTurquoise - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#40e0d0", // Turquoise - Text Color
    color4: "#00ced1", // DarkTurquoise - Background Color
  },
  {
    color1: "#7b68ee", // MediumSlateBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#6a5acd", // SlateBlue - Text Color
    color4: "#483d8b", // DarkSlateBlue - Background Color
  },
  {
    color1: "#00ff7f", // SpringGreen - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#3cb371", // MediumSeaGreen - Text Color
    color4: "#2e8b57", // SeaGreen - Background Color
  },
  {
    color1: "#ffa07a", // LightSalmon - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#fa8072", // Salmon - Text Color
    color4: "#e9967a", // DarkSalmon - Background Color
  },
  {
    color1: "#ff6347", // Tomato - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ff4500", // OrangeRed - Text Color
    color4: "#ff7f50", // Coral - Background Color
  },
  {
    color1: "#f08080", // LightCoral - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#fa8072", // Salmon - Text Color
    color4: "#e9967a", // DarkSalmon - Background Color
  },
  {
    color1: "#20b2aa", // LightSeaGreen - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#40e0d0", // Turquoise - Text Color
    color4: "#48d1cc", // MediumTurquoise - Background Color
  },
  {
    color1: "#87ceeb", // SkyBlue - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#add8e6", // LightBlue - Text Color
    color4: "#87cefa", // LightSkyBlue - Background Color
  },
  {
    color1: "#da70d6", // Orchid - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#dda0dd", // Plum - Text Color
    color4: "#ee82ee", // Violet - Background Color
  },
  {
    color1: "#ffdead", // NavajoWhite - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#ffe4b5", // Moccasin - Text Color
    color4: "#ffebcd", // BlanchedAlmond - Background Color
  },
  {
    color1: "#6495ed", // CornflowerBlue - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#4682b4", // SteelBlue - Text Color
    color4: "#5f9ea0", // CadetBlue - Background Color
  },
  {
    color1: "#ffd700", // Gold - Background Color
    color2: "#000000", // Black - Text Color
    color3: "#ffa500", // Orange - Text Color
    color4: "#ff8c00", // DarkOrange - Background Color
  },
  {
    color1: "#ff4500", // OrangeRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#ff6347", // Tomato - Text Color
    color4: "#ff7f50", // Coral - Background Color
  },
  {
    color1: "#ba55d3", // MediumOrchid - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#9370db", // MediumPurple - Text Color
    color4: "#8a2be2", // BlueViolet - Background Color
  },
  {
    color1: "#cd5c5c", // IndianRed - Background Color
    color2: "#ffffff", // White - Text Color
    color3: "#f08080", // LightCoral - Text Color
    color4: "#e9967a", // DarkSalmon - Background Color
  },
];
export default colorPresets;
