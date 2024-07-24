// 채팅방 정보 읽어오기
import axiosInstance from "./axios.ts";

const fetchDashBoard = async () => {
  try {
    const response = await axiosInstance.get(`/characters/dashboard/total`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchDashBoard };
