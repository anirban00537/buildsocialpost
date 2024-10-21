import toast from "react-hot-toast";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
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

export const processApiResponse = (
  result: ApiResponse | ApiError
): any | null => {
  if ("success" in result) {
    if (result.success) {
      if (result.message) {
        toast.success(result.message);
      }
      return result.data || null;
    } else {
      toast.error(result.message || "An unexpected error occurred");
      return null;
    }
  } else {
    console.log(result, "result");
    if (result.response && result.response.data) {
      const { statusCode, message, error: errorType } = result.response.data;
      if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
      } else if (typeof message === "string") {
        toast.error(message);
      } else {
        toast.error(
          `${errorType || "Error"}: ${statusCode || "Unknown status"}`
        );
      }
    } else {
      toast.error(result.message || "An unexpected error occurred");
    }
    return null;
  }
};
