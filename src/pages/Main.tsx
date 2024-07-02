import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Main() {
  return (
    <div className="flex flex-row w-screen h-screen">
      <Navbar />
      <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212] text-white">
        <div className="w-[80%] h-[60%] px-6 py-12 sm:px-10 sm:py-16 bg-[#1e1e1e] rounded-2xl shadow-lg">
          <div className="grid gap-8 h-full">
            <div className="text-center my-auto">
              <h1 className="text-3xl font-bold">
                따끔한 말로 정신 좀 차리세요!
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                캐릭터를 선택하세요
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Link
                to="#"
                className="bg-[#2a2a2a] hover:bg-[#333333] transition-colors rounded-lg p-6 flex flex-col items-center gap-4 cursor-pointer justify-evenly"
              >
                <img
                  src="https://i.ibb.co/hFy5Cbz/2024-07-02-4-08-52.png"
                  alt="앤드류"
                  className="rounded-full object-cover size-48"
                />
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold">Andrew Park</h3>
                  <p className="text-muted-foreground">특징 설명</p>
                </div>
              </Link>
              <Link
                to="#"
                className="bg-[#2a2a2a] hover:bg-[#333333] transition-colors rounded-lg p-6 flex flex-col items-center gap-4 cursor-pointer justify-evenly"
              >
                <img
                  src="https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png"
                  alt="현우진"
                  className="rounded-full object-cover size-48"
                />
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold">현우진</h3>
                  <p className="text-muted-foreground">특징 설명</p>
                </div>
              </Link>
              <Link
                to="#"
                className="bg-[#2a2a2a] hover:bg-[#333333] transition-colors rounded-lg p-6 flex flex-col items-center gap-4 cursor-pointer justify-evenly"
              >
                <img
                  src="https://i.ibb.co/mhx194f/2024-07-02-2-51-19-1.png"
                  alt="전한길"
                  className="rounded-full object-cover size-48"
                />
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-semibold">전한길</h3>
                  <p className="text-muted-foreground">특징 설명</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
