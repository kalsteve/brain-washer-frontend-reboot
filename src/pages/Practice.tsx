// App.tsx
import React, { useState } from "react";

const App: React.FC = () => {
  const content = [
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
    {
      date: "24-07-08",
      text: "여행가서 낭비할 시간에 밤새서 개발하고 자소서 준비하고 면접을 대비해라!",
      leftImage: "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
      rightImages: [
        "https://i.postimg.cc/pXpzSxg7/Group-53.png",
        "https://i.postimg.cc/qBZCySzG/Group-54.png",
      ],
    },
  ];

  const [showTts, setShowTts] = useState(true);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.ibb.co/s3QC5vr/3.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 text-white overflow-y-auto">
        <div className="flex flex-col items-start p-6 px-[5%] ">
          <div className="flex flex-row">
            <img
              src="https://i.postimg.cc/rsr08G5r/Group-59.png"
              alt="Icon"
              className="w-16 h-16 my-auto"
            />

            <h1 className="text-4xl font-bold m-10 ">저장한 음성 및 이미지</h1>
          </div>
          <div
            role="tablist"
            className="tabs tabs-lifted bg-glass w-[100%] mt-5 flex justify-center"
          >
            <a
              role="tab"
              className={`tab h-12 w-[50%] ${
                showTts
                  ? "tab-active [--tab-bg:rgba(255,255,255,0.17)] [--tab-border:none]"
                  : " [--tab-border:none]"
              } text-white text-xl bg-glass text-center`}
              onClick={() => setShowTts(true)}
            >
              TTS
            </a>
            <a
              role="tab"
              className={`tab h-12 w-[50%] ${
                !showTts
                  ? "tab-active [--tab-bg:rgba(255,255,255,0.17)] [--tab-border:none]"
                  : " [--tab-border:none]"
              } text-white text-xl bg-glass text-center`}
              onClick={() => setShowTts(false)}
            >
              이미지
            </a>
          </div>

          <div className="bg-white bg-opacity-25 p-6 rounded-b-lg pb-[3%] mb-[10%] shadow-md w-full h-full ">
            <div className="flex justify-center space-x-8 mb-8 "></div>
            {showTts ? (
              <div className="grid grid-cols-2 gap-6 mx-[2%]">
                {content.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-[rgba(224,224,224,0.2)] to-[rgba(71,91,161,0.2)] shadow-lg shadow-black/25 backdrop-blur-[3px] rounded-[25px] bg-opacity-20  p-6 flex items-center justify-between text-white"
                  >
                    <img
                      src={item.leftImage}
                      alt="Profile"
                      className="w-16 h-18 rounded-full"
                    />
                    <div className="flex flex-col flex-grow mx-4">
                      <span className="text-sm text-gray-300">{item.date}</span>
                      <p className="text-left mt-2">{item.text}</p>
                    </div>
                    <div className="flex space-x-2">
                      {item.rightImages.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Right ${imgIndex}`}
                          className="w-8 h-8 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-5 pl-10 ">
                {content.slice(0, 10).map((_, index) => (
                  <div
                    key={index}
                    className=" w-[260px] bg-white bg-opacity-10  rounded-[20px] shadow-mdrounded-10g shadow-black/25 overflow-hidden mx-[10%] shadow-xl"
                  >
                    <div className="relative h-0 pb-[80%] mb-10">
                      <img
                        src={`https://i.postimg.cc/m2f2zXJP/Screenshot2024-07-08-165553-2.png${
                          index + 1
                        }`}
                        alt={`Image ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-55 object-cover"
                      />
                    </div>
                    <div className="p-4 flex">
                      <div className="w-full h-20 p-2 text-white">
                        밤새서 개발하고 자소서 준비하고 면접을 대비해라!
                      </div>
                      <button className="w-auto h-auto text-white rounded">
                        <img
                          src="https://i.postimg.cc/J7gRw6MT/Group-60.png"
                          alt="Button Icon"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
