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

// 특정 TTS 저장
const postTts = async (bubble_id: string | undefined) => {
  try {
    const response = await axiosInstance.post(`/voices/${bubble_id}`, {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 채팅방별 TTS 목록 조회
const getRoomTts = async (chat_id: number|null) => {
  try {
    const response = await axiosInstance.get(`/voices/chat/${chat_id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getAllTts, postTts, getRoomTts };
