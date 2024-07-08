import { useState, useRef } from "react";
import gsap from "gsap";
import "../styles/test.css";

const images = [
  "https://i.ibb.co/xYY0XZ9/2024-07-02-2-53-32.png",
  "https://i.ibb.co/q1qXwj0/2024-07-02-4-08-52.png",
  "https://i.ibb.co/WpB8JVC/2024-07-02-2-51-19.png",
];

const Test = () => {
  const [clickedStates, setClickedStates] = useState(
    Array(images.length).fill(false)
  );
  const itemsRef = useRef(new Array(images.length));

  const expand = (index: number) => {
    const newStates = clickedStates.map((state, i) =>
      i === index ? !state : false
    );
    setClickedStates(newStates);

    itemsRef.current.forEach((item, idx) => {
      if (idx === index) {
        gsap.to(item, {
          width: newStates[index] ? "35vw" : "25vw",
          duration: 1.5,
          ease: "elastic(1, .3)",
        });
      } else {
        gsap.to(item, {
          width: "25vw",
          duration: 1.5,
          ease: "elastic(1, .3)",
        });
      }
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-evenly items-center">
      <p className="text-[4rem] text-white">따끔한 말로 정신 좀 차려볼까요?</p>
      <div className="group">
        {images.map((url, index) => (
          <div
            key={index}
            className="item shadow-lg"
            ref={(el) => (itemsRef.current[index] = el)}
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover", // 이미지가 div 크기에 맞춰 조절되도록 설정
              backgroundPosition: "center", // 이미지가 div 중앙에 위치하도록 설정
              backgroundRepeat: "no-repeat", // 이미지가 반복되지 않도록 설정
              width: clickedStates[index] ? "35vw" : "25vw",
              cursor: "pointer",
            }}
            onClick={() => expand(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Test;
