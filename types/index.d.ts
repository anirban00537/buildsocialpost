export interface Purchase {
  userId: string;
  productId: string;
  checkoutUrl: string;
  status: string;
  createdAt: string;
}

export interface Subscription {
  userId: string;
  orderId: string;
  status: string;
  createdAt: string;
}

export interface Slide {
  title: string;
  tagline?: string;
  description: string;
  imageUrl?: string | null;
  backgroundImage?: string | null;
  type: "intro" | "slide" | "outro";
}

export interface GeneralSettings {
  headshotUrl: string;
  name: string;
  handle: string;
}

export interface IntroSlide {
  tagline: string;
  title: string;
  paragraph: string;
  imageUrl: string | null;
}

export interface TextSettings {
  alignment: "left" | "center" | "right";
  fontSize: number;
  fontStyle: "normal" | "italic";
  fontWeight: "normal" | "bold" | number;
}

export interface BackgroundColors {
  color1: string; // Background Color
  color2: string; // Text Color
  color3: string; // Tint Color
  color4: string; // Accent Color
}

export interface LayoutSettings {
  height: number;
  width: number;
  pattern: string;
}

export interface CarouselState {
  name: string;
  slides: Slide[];
  generalSettings: GeneralSettings;
  background: BackgroundColors;
  titleTextSettings: TextSettings;
  descriptionTextSettings: TextSettings;
  taglineTextSettings: TextSettings;
  layout: LayoutSettings;
}

export interface FirestoreCarouselState extends CarouselState {
  userId: string;
}
