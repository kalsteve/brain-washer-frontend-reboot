import Card from "../components/Card";

export default function Text2() {
  const cards = [
    {
      link: "",
      coverImage: "https://i.ibb.co/PTtGvCY/2.png",
      titleImage: "",
      characterImage: "https://i.ibb.co/bF4T3Fx/1.png",
      altText: "현우진",
    },
    {
      link: "",
      coverImage: "https://i.ibb.co/4fkm9j0/611211110014826118-1.jpg",
      titleImage: "",
      characterImage: "https://i.ibb.co/1LbBF91/image.png",
      altText: "전한길",
    },
    {
      link: "",
      coverImage: "https://i.ibb.co/4fkm9j0/611211110014826118-1.jpg",
      titleImage: "",
      characterImage: "https://i.ibb.co/1LbBF91/image.png",
      altText: "전한길",
    },
  ];

  return (
    <div
      className="app"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("https://i.ibb.co/s3QC5vr/3.jpg")',
        backgroundSize: "cover", // 배경 이미지가 컨테이너를 꽉 채우도록 설정
        backgroundPosition: "center", // 이미지를 중앙에 위치시키기
      }}
    >
      <div className="flex flex-col bg-glass w-[80%] h-[80%] rounded-xl backdrop-blur items-center justify-evenly shadow-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-[3rem] text-white">
            따끔한 말로 정신 좀 차려볼까요?
          </h1>
          <p className="text-muted-foreground text-xl mt-2">
            캐릭터를 선택하세요
          </p>
        </div>
        <div className="flex flex-row items-center justify-center">
          {cards.map((card) => (
            <Card key={card.link} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
