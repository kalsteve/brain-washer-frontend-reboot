import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8000/api/v1", // 여기에 실제 API의 baseURL을 입력하세요.
  headers: {
    "Content-Type": "application/json",
  },
  // 필요에 따라 다른 설정을 추가할 수 있습니다.
});

export default axiosInstance;
