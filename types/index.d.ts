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

export interface generalSettings {
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
export interface CarouselState {
  name: string;
  slides: Slide[];
  generalSettings: generalSettings;
  background: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
  };
  textSettings: {
    alignment: "left" | "center" | "right";
    fontSize: number;
    fontStyle: "normal" | "italic";
    fontWeight: number | string;
  };
  layout: {
    height: number;
    width: number;
    pattern: string;
  };
}
