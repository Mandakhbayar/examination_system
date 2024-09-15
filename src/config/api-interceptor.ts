import axios from "axios";
import { Constants } from "../utils/constants";

export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const axiosInterceptorInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`, // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use((response) => {
  return response;
});

export default axiosInterceptorInstance;
