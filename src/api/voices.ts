import axiosInstance from "./axios";

// 채팅방 정보 읽어오기
const getAllTts = async () => {
  try {
    const response = await axiosInstance.get(`/voices`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
