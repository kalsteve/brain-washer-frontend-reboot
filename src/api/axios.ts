import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 여기에 실제 API의 baseURL을 입력하세요.
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
