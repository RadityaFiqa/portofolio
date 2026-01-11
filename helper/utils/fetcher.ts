import axios, { AxiosRequestConfig, AxiosError } from "axios";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Generic API response interface
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
}

/**
 * Generic API error interface
 */
export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Generic fetcher function for making API requests
 * @param url - The URL to fetch
 * @param config - Optional axios request config
 * @returns Promise with the response data
 */
export async function fetcher<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw {
      message: axiosError.message || "An error occurred while fetching data",
      status: axiosError.response?.status,
    } as ApiError;
  }
}

/**
 * POST request fetcher
 * @param url - The URL to post to
 * @param data - The data to send
 * @param config - Optional axios request config
 * @returns Promise with the response data
 */
export async function postFetcher<T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw {
      message: axiosError.message || "An error occurred while posting data",
      status: axiosError.response?.status,
    } as ApiError;
  }
}

export default axiosInstance;
