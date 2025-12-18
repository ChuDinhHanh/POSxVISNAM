import axios, { AxiosError, type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import HttpStatusCode from "../constants/httpStatusCode";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5038/api";

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor (nếu sau này cần token)
    this.instance.interceptors.request.use(
      (config) => {
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          if (error.response.status !== HttpStatusCode.UnprocessableEntity) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = error.response.data;
            const message = data?.message || error.message;
            toast.error(message);
          }
        } else if (error.request) {
          toast.error("Cannot connect to server");
        } else {
          toast.error(error.message);
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;
export default http;
export { API_BASE_URL };
