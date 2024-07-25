// 채팅방 정보 읽어오기
import axiosInstance from "./axios.ts";

const fetchDashBoard = async () => {
  try {
    const response = await axiosInstance.get(`/characters/dashboards/total`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchCharacterDashBoard = async (character_name: string) => {
  try {
    const response = await axiosInstance.get(
      `/characters/dashboards/${character_name}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { fetchDashBoard, fetchCharacterDashBoard };
