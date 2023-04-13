import axios from "axios";
import { getAuthToken, getRefreshToken } from "../utils/token";

const BACKEND_URL =
  (process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5555/") + "api";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = getAuthToken();
    if (token && token != "undefined" && token != "null") {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  (error) => {
    if (
      error.response?.status == 401 ||
      error.response?.data.message === "401 Unauthorized"
    ) {
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return {
      success: true,
      data: response.data,
    };
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status == 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAuthToken = getRefreshToken();
      axios.defaults.headers.common["Authorization"] = `Bearer ${newAuthToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.resolve({
      success: false,
      error: error.response.data.error,
    });
  }
);

export default axiosInstance;
