import Cookie from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;

interface RequestOptions extends RequestInit {
  data?: any;
}

const post = async (url: string, data: any, options: RequestOptions = {}) => {
  const token = Cookie.get("token");
  const headers = new Headers(options.headers || {});

  headers.set("Accept", "application/json");
  headers.set("apisecretkeycheck", API_SECRET || "");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let body: string | FormData;
  if (data instanceof FormData) {
    body = data;
    // Don't set Content-Type for FormData, browser will set it automatically with the correct boundary
  } else {
    body = JSON.stringify(data);
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...options,
    method: "POST",
    headers,
    body,
  };

  try {
    const response = await fetch(BASE_URL + url, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fRequest = {
  post,
  // You can add other methods (get, put, delete) here as needed
};

export default fRequest;
