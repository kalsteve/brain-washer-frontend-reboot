import { Link } from "react-router-dom";

interface CharacterCardProps {
  name: string;
  description: string;
  image: string;
}

const CharacterCard = ({ name, description, image }: CharacterCardProps) => {
  return (
    <Link
      to="#"
      className="transition-colors rounded-3xl p-6 flex flex-col items-center gap-4 cursor-pointer justify-evenly shadow-lg backdrop-filter backdrop-blur bg-gradient-to-t from-[#475aa12b] to-[#e0e0e00a] bg-opacity-5"
    >
      <img
        src={image}
        alt={name}
        className="rounded-full object-cover size-24 lg:size-32 xl:size-40 2xl:size-48 shadow-lg"
      />
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};

const CharacterSelect = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen text-white">
      <div className="w-[80%] h-[60%] px-6 py-12 sm:px-10 sm:py-16 rounded-3xl shadow-xl backdrop-filter backdrop-blur bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10">
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
            <CharacterCard
              name={"Andrew"}
              description={"특징설명"}
              image={"https://i.ibb.co/hFy5Cbz/2024-07-02-4-08-52.png"}
            />
            <CharacterCard
              name={"현우진"}
              description={"특징설명"}
              image={"https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png"}
            />
            <CharacterCard
              name={"전한길"}
              description={"특징설명"}
              image={"https://i.ibb.co/mhx194f/2024-07-02-2-51-19-1.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Main() {
  return (
    <div className="flex flex-row w-screen h-screen bg-[url(https://i.ibb.co/s3QC5vr/3.jpg)] bg-cover">
      {/* <Navbar /> */}
      <CharacterSelect />
    </div>
  );
}
