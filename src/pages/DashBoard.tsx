import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface MenuProps {
  selectedMenu: string;
  setSelectedMenu: (selectedMenu: string) => void;
}

const SideMenu = ({ selectedMenu, setSelectedMenu }: MenuProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/6 py-[1%] px-[1%] gap-4 text-gray-50">
      <img
        alt="Brain Washer logo"
        src="https://i.ibb.co/Mk5gYZq/brainwasher-logo-text.png"
        className="w-[80%]"
      />
      <p className="text-xl mt-[10%] font-bold">DashBoard</p>

      <div
        className={`collapse hover:glass hover:bg-glass hover:backdrop-filter hover:backdrop-blur transition-all duration-300 ease-linear rounded-lg border-none
        ${selectedMenu === "Overview" ? "glass" : ""}`}
        onClick={() => {
          setSelectedMenu("Overview");
        }}
      >
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          <div className="flex flex-row gap-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 14.5C12.5 13.3954 13.3954 12.5 14.5 12.5H23C24.1046 12.5 25 13.3954 25 14.5V23C25 24.1046 24.1046 25 23 25H14.5C13.3954 25 12.5 24.1046 12.5 23V14.5Z"
                fill="white"
              />
              <path
                d="M35 14.5C35 13.3954 35.8954 12.5 37 12.5H45.5C46.6046 12.5 47.5 13.3954 47.5 14.5V23C47.5 24.1046 46.6046 25 45.5 25H37C35.8954 25 35 24.1046 35 23V14.5Z"
                fill="white"
              />
              <path
                d="M12.5 37C12.5 35.8954 13.3954 35 14.5 35H23C24.1046 35 25 35.8954 25 37V45.5C25 46.6046 24.1046 47.5 23 47.5H14.5C13.3954 47.5 12.5 46.6046 12.5 45.5V37Z"
                fill="white"
              />
              <path
                d="M35 37C35 35.8954 35.8954 35 37 35H45.5C46.6046 35 47.5 35.8954 47.5 37V45.5C47.5 46.6046 46.6046 47.5 45.5 47.5H37C35.8954 47.5 35 46.6046 35 45.5V37Z"
                fill="white"
              />
              <path
                d="M12.5 14.5C12.5 13.3954 13.3954 12.5 14.5 12.5H23C24.1046 12.5 25 13.3954 25 14.5V23C25 24.1046 24.1046 25 23 25H14.5C13.3954 25 12.5 24.1046 12.5 23V14.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 14.5C35 13.3954 35.8954 12.5 37 12.5H45.5C46.6046 12.5 47.5 13.3954 47.5 14.5V23C47.5 24.1046 46.6046 25 45.5 25H37C35.8954 25 35 24.1046 35 23V14.5Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 37C12.5 35.8954 13.3954 35 14.5 35H23C24.1046 35 25 35.8954 25 37V45.5C25 46.6046 24.1046 47.5 23 47.5H14.5C13.3954 47.5 12.5 46.6046 12.5 45.5V37Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 37C35 35.8954 35.8954 35 37 35H45.5C46.6046 35 47.5 35.8954 47.5 37V45.5C47.5 46.6046 46.6046 47.5 45.5 47.5H37C35.8954 47.5 35 46.6046 35 45.5V37Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="my-auto">Overview</p>
          </div>
        </div>
      </div>
      <div
        className={`collapse collapse-arrow hover:glass hover:bg-glass hover:backdrop-filter hover:backdrop-blur transition-all duration-300 ease-linear rounded-lg border-none
        ${selectedMenu === "Character" ? "glass" : ""}`}
        onClick={() => setSelectedMenu("Character")}
      >
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          <div className="flex flex-row gap-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.6667 21.6667C31.6667 29.0305 25.6971 35 18.3333 35C10.9695 35 5 29.0305 5 21.6667C5 14.3029 10.9695 8.33333 18.3333 8.33333M18.3333 19.6667V6C18.3333 5.44771 18.7821 4.99688 19.3335 5.02951C27.7417 5.52716 34.4728 12.2583 34.9705 20.6665C35.0031 21.2179 34.5523 21.6667 34 21.6667H20.3333C19.2288 21.6667 18.3333 20.7712 18.3333 19.6667Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="my-auto">캐릭터별 통계</p>
          </div>
        </div>

        <div className="collapse-content">
          <p>Andrew</p>
          <p>현우진</p>
          <p>전한길</p>
        </div>
      </div>
      <div
        className="btn bg-transparent border-none mt-auto ml-auto hover:bg-blue-500"
        onClick={() => navigate("/")}
      >
        <svg
          width="35"
          height="35"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.7083 35.8333H35.625C36.7296 35.8333 37.625 34.9378 37.625 33.8333V9.16659C37.625 8.06202 36.7296 7.16659 35.625 7.16659H19.7083M5.375 21.4999H25.0833M25.0833 21.4999L19.7083 26.8749M25.0833 21.4999L19.7083 16.1249"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const DashBoard = () => {
  const menu = ["Overview", "Character"];
  const [selectedMenu, setSelectedMenu] = useState<string>(menu[0]);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-[3%] py-[2%]">
      {/* 배경이미지 */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url(https://i.ibb.co/s3QC5vr/3.jpg)] bg-cover bg-fixed" />
      {/* 대시보드 */}
      <div className="h-full w-full flex flex-row z-10 rounded-lg gap-8">
        {/* 메뉴 */}
        <SideMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        {/* 오른쪽 구간 */}
        <div className="flex flex-col  basis-5/6 gap-8">
          <div className="basis-1/2 bg-glass backdrop-blur rounded-xl shadow-2xl">
            카테고리통계
          </div>
          <div className="flex flex-row basis-1/2 gap-8">
            <div className="basis-1/2 bg-glass backdrop-blur rounded-xl shadow-2xl">
              캐릭터 순위
            </div>
            <div className="basis-1/2 bg-glass backdrop-blur rounded-xl shadow-2xl">
              매운맛 점수
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
