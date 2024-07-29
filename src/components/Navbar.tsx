import { Link } from "react-router-dom";

export default function Navbar({
  scrollToBottom,
}: {
  scrollToBottom: () => void;
}) {
  return (
    <div
      className="flex w-full px-[10%] items-center h-[10%] justify-between"
      data-aos="fade-down"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
    >
      <ul className=" flex flex-row w-fit">
        <img
          alt="Brain Washer logo"
          src="https://i.ibb.co/Mk5gYZq/brainwasher-logo-text.png"
          className="w-[70%] lg:w-[80%] xl:w-[90%] 2xl:w-full"
        />
      </ul>
      <ul className="flex justify-center text-base lg:text-lg xl:text-xl 2xl:text-2xl gap-20 cursor-pointer">
        <li className="text-gray-200" onClick={scrollToBottom}>
          시작하기
        </li>
        <li className="cursor-pointer text-gray-200">
          <Link to="/list_board">저장한 음성 및 이미지</Link>
        </li>
        <li className="cursor-pointer text-gray-200">
          <Link to="/dashboard">대시보드</Link>
        </li>
      </ul>
      <div className=""></div>
      {/* 이 부분은 오른쪽 공간을 확보하기 위해 추가합니다. */}
    </div>
  );
}
