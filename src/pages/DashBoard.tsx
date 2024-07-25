import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchCharacterDashBoard, fetchDashBoard } from "../api/characters.ts";

interface MenuProps {
  selectedMenu: string;
  setSelectedMenu: (selectedMenu: string) => void;
  selectedCharacter?: string;
  setSelectedCharacter: (selectedCharacter: string) => void;
}

interface Character {
  name: string;
  topic_frequency: {
    [key: string]: number;
  };
  spicy_frequency: {
    [key: string]: number;
  };
  chat_count: number;
}

interface CategoryData {
  name: string;
  [key: string]: string | number;
}

interface SpicyData {
  subject: string;
  [key: string]: string | number;
}

interface PopularData {
  name: string;
  total: number;
}

const SideMenu = ({
  selectedMenu,
  setSelectedMenu,
  setSelectedCharacter,
}: MenuProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/6 p-[1%] gap-4 text-gray-50">
      <img
        alt="Brain Washer logo"
        src="https://i.ibb.co/Mk5gYZq/brainwasher-logo-text.png"
        className="w-[80%]"
      />
      <p className="text-2xl ml-[3%] mt-[10%] font-bold">DashBoard</p>

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

        <div className="collapse-content ml-[5%] space-y-2 text-lg">
          <p
            className="w-full cursor-pointer p-2 rounded-lg   hover:backdrop-blur"
            onClick={() => {
              setSelectedCharacter("Andrew");
              setSelectedMenu("Character");
            }}
          >
            Andrew
          </p>
          <p
            className="w-full cursor-pointer p-2 rounded-lg   hover:backdrop-blur"
            onClick={() => {
              setSelectedCharacter("Hyunwoojin");
              setSelectedMenu("Character");
            }}
          >
            현우진
          </p>
          <p
            className="w-full cursor-pointer p-2 rounded-lg  hover:backdrop-blur"
            onClick={() => {
              setSelectedCharacter("Jeonhangil");
              setSelectedMenu("Character");
            }}
          >
            전한길
          </p>
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

const OverView = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDashBoard(); // 비동기 함수가 완료될 때까지

      setCategoryData(response.data.characters);
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded">
          <p className="label">{`채팅방 총합: ${payload[0].value}`}</p>
          <p className="intro"></p>
        </div>
      );
    }

    return null;
  };

  // CategoryChart 에 사용할 데이터를 가공하는 함수
  const processCategoryData = (data: Character[]): CategoryData[] => {
    if (!data) return [];
    const categories = ["취업", "학업", "인간관계", "연애"];
    const result = categories.map((category) => {
      const entry: CategoryData = { name: category };
      data.forEach((character) => {
        entry[character.name] = character.topic_frequency[category];
      });
      return entry;
    });

    return result;
  };

  // SpicyChart 에 사용할 데이터를 가공하는 함수
  const processSpicyData = (data: Character[]): SpicyData[] => {
    if (!data) return [];
    const categories = ["0-2", "2-4", "4-6", "6-8", "8-10"];
    const result = categories.map((category) => {
      const entry: SpicyData = { subject: category };
      data.forEach((character) => {
        entry[character.name] = character.spicy_frequency[category];
      });
      return entry;
    });
    return result;
  };

  // PopularChart 에 사용할 데이터를 가공하는 함수
  const processPopularData = (data: Character[]): PopularData[] => {
    return data.map((character) => {
      return {
        name: character.name,
        total: character.chat_count,
      };
    });
  };

  const CategoryChart = ({ data }: { data: CategoryData[] }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={750}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color취업" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color학업" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color인간관계" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color연애" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: "#cccccc" }}
            axisLine={{ stroke: "#cccccc" }}
          />
          <YAxis tick={{ fill: "#cccccc" }} axisLine={{ stroke: "#cccccc" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Andrew"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#color취업)"
          />
          <Area
            type="monotone"
            dataKey="Hyunwoojin"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#color학업)"
          />
          <Area
            type="monotone"
            dataKey="Jeonhangil"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#color인간관계)"
          />
          <Area
            type="monotone"
            dataKey="연애"
            stroke="#ff7300"
            fillOpacity={1}
            fill="url(#color연애)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const PopularChart = ({ data }: { data: PopularData[] }) => {
    const colors = ["#C93988", "#17B069", "#8979FF"];

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: "#cccccc" }}
            axisLine={{ stroke: "#cccccc" }}
          />
          <YAxis tick={{ fill: "#cccccc" }} axisLine={{ stroke: "#cccccc" }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(21,21,21,0.35)" }}
          />
          <Bar dataKey="total" barSize={60}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                fillOpacity={0.75}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const SpicyChart = ({ data }: { data: SpicyData[] }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 30]}
            tick={{ fill: "white" }}
          />
          <Radar
            name="Andrew"
            dataKey="Andrew"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Hyunwoojin"
            dataKey="Hyunwoojin"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Radar
            name="Jeonhangil"
            dataKey="Jeonhangil"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex flex-col basis-5/6 gap-8">
      <div className="flex flex-col w-full h-full gap-4 basis-1/2">
        <p className="text-2xl text-gray-50">카테고리</p>
        <div className="h-full bg-glass backdrop-blur rounded-xl shadow-2xl py-[1%]">
          <CategoryChart data={processCategoryData(categoryData)} />
        </div>
      </div>
      <div className="flex flex-row basis-1/2 gap-8">
        <div className="flex flex-col w-full h-full gap-4 basis-1/2">
          <p className="text-2xl text-gray-50">인기순위</p>
          <div className="h-full bg-glass backdrop-blur rounded-xl shadow-2xl py-[5%]">
            <PopularChart data={processPopularData(categoryData)} />
          </div>
        </div>
        <div className="flex flex-col w-full h-full gap-4 basis-1/2">
          <p className="text-2xl text-gray-50">매운맛 지수</p>
          <div className="h-full bg-glass backdrop-blur rounded-xl shadow-2xl py-[5%]">
            <SpicyChart data={processSpicyData(categoryData)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterChart = ({ character }: { character: string }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCharacterDashBoard(character);
      setData(response.data);
    };

    fetchData();
  }, [character]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="flex flex-col  basis-5/6 gap-8">
      <div className="basis-[40%]  flex flex-row gap-8">
        <div className="basis-3/5 bg-glass backdrop-blur rounded-xl shadow-2xl"></div>
        <div className="basis-2/5 bg-glass backdrop-blur rounded-xl shadow-2xl"></div>
      </div>
      <div className="flex flex-row basis-[60%] gap-8">
        <div className="basis-3/5 bg-glass backdrop-blur rounded-xl shadow-2xl"></div>
        <div className="basis-2/5  flex flex-col gap-8">
          <div className="bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/2"></div>
          <div className="bg-glass backdrop-blur rounded-xl shadow-2xl basis-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const DashBoard = () => {
  const menu = ["Overview", "Character"];
  const [selectedMenu, setSelectedMenu] = useState<string>(menu[0]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");
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
          setSelectedCharacter={setSelectedCharacter}
        />
        {/* 오른쪽 구간 */}
        {selectedMenu === menu[0] && <OverView />}
        {selectedMenu === menu[1] && (
          <CharacterChart character={selectedCharacter} />
        )}
      </div>
    </div>
  );
};

export default DashBoard;
