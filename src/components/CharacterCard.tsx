import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../api/chat";

interface CharacterCardProps {
  name: string;
  description: string;
  image: string;
  className?: string; // 추가된 className 프롭스
  imageSizeClass?: string; // 이미지 크기를 조정하기 위한 프롭스
}

const CharacterCard = ({
  name,
  description,
  image,
  className = "",
  imageSizeClass = "w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48",
}: CharacterCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`transition-transform hover:scale-105 duration-200 ease-linear rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer justify-evenly shadow-lg backdrop-filter backdrop-blur bg-gradient-to-t from-[#475aa12b] to-[#e0e0e00a] bg-opacity-5 ${className}`}
      onClick={async () => {
        const response = await createChatRoom(name, name);
        navigate(`/chat/${response.data.chat_id}`);
      }}
    >
      <img
        src={image}
        alt={name}
        className={`rounded-full object-cover shadow-lg ${imageSizeClass}`}
      />
      <div className="text-center space-y-2 mt-4">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
