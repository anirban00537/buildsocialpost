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
  subtitle: string;
  description: string;
  imageUrl: string | null;

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
