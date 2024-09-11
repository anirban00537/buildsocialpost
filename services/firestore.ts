import { db } from "./firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export const fetchSubscriptionStatus = async (userId: string) => {
  try {
    const response = await fetch(`/api/subscriptions?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching subscription status:", error);
    return { isSubscribed: false, endDate: null, error: error.message };
  }
};

export const fetchBrandingSettings = async (userId: string) => {
  try {
    const response = await fetch(`/api/branding?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch branding settings');
    }
    const data = await response.json();
    return {
      name: data.name || "",
      handle: data.handle || "",
      headshot: data.headshot || null,
    };
  } catch (error: any) {
    console.error("Error fetching branding settings:", error);
    return { name: "", handle: "", headshot: null, error: error.message };
  }
};

export const updateBrandingSettings = async (userId: string, brandingData: any) => {
  try {
    const response = await fetch('/api/branding', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...brandingData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update branding settings');
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error updating branding settings:", error);
    throw error;
  }
};
