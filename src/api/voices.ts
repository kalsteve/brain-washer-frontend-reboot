import axiosInstance from "./axios";

// 모든 목소리 목록 조회
const getAllTts = async () => {
  try {
    const response = await axiosInstance.get(`/voices`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 채팅방 별 목소리 목록 조회
const getTtsByChatId = async (chatId) => {
  try {
    const response = await axiosInstance.get(`/voices/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 저장한 목소리 상세 조회
const getTtsById = async (voiceId) => {
  try {
    const response = await axiosInstance.get(`/voices/${voiceId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 저장한 목소리 소프트 삭제
const softDeleteTts = async (voiceId) => {
  try {
    const response = await axiosInstance.put(`/voices/${voiceId}`, {
      deleted: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 저장한 목소리 하드 삭제
const deleteTts = async (voiceId) => {
  try {
    const response = await axiosInstance.delete(`/voices/${voiceId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 사용자가 선택한 목소리 저장
const saveSelectedTts = async (bubbleId, selectedTtsData) => {
  try {
    const response = await axiosInstance.post(
      `/voices/${bubbleId}`,
      selectedTtsData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
