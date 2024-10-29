export interface Purchase {
  userId: string;
  productId: string;
  checkoutUrl: string;
  status: string;
  createdAt: string;
}
export interface BackgroundColors {
  color1: string; // Background Color
  color2: string; // Text Color
  color3: string; // Tint Color
  color4: string; // Accent Color
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
  showImage: boolean;
  showTagline: boolean;
  showTitle: boolean;
  showDescription: boolean;
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

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    [key: string]: any;
  };
}

interface ApiError {
  response?: {
    data?: {
      statusCode?: number;
      message?: string | string[];
      error?: string;
    };
  };
  message?: string;
}
export interface LayoutSettings {
  height: number;
  width: number;
  pattern: number;
  backgroundOpacity: number;
  gradient: boolean;
}

export interface CarouselState {
  name: string;
  slides: Slide[];
  background: BackgroundColors;
  titleTextSettings: TextSettings;
  descriptionTextSettings: TextSettings;
  taglineTextSettings: TextSettings;
  layout: LayoutSettings;
  sharedSelectedElement: {
    id: number;
    opacity: number;
  };
  fontFamily: string;
  createdAt?: string;
  updatedAt?: string;
  globalBackground?: string | null;
}

export interface FirestoreCarouselState extends CarouselState {
  userId: string;
}
export interface ResponseData {
  data: any;
  message: string;
  success: boolean;
}
export interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_name: string;
  unique_code: string;
  phone: string | null;
  photo: string | null;
  country: string | null;
  birth_date: string | null;
  role: number;
  status: number;
  is_subscribed: number;
  email_verified: number;
  phone_verified: number;
  gender: number;
  createdAt: string;
  updatedAt: string;
  login_provider: string;
}
interface Workspace {
  createdAt: string;
  description: string | null;
  id: number;
  isDefault: boolean;
  name: string;
  updatedAt: string;
}
interface UserState {
  userinfo: UserInfo | null;
  loggedin: boolean;
  loading: boolean;
  carouselDownloading: boolean;
  subscribed: boolean;
  endDate: string | null;
  currentWorkspace: Workspace | null;
}
export interface GenerateLinkedInPostsDTO {
  prompt: string;
  numPosts: number;
  language?: string;
  tone?: string;
}
