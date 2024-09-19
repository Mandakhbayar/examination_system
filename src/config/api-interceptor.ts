import axios, { AxiosError } from "axios";
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
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem(Constants.ACCESS_TOKEN_KEY);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === ERROR_CODES.UNAUTHORIZED) {
        localStorage.removeItem(Constants.ACCESS_TOKEN_KEY);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
