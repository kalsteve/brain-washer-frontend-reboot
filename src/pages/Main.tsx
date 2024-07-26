import Navbar from "../components/Navbar";
import CharacterCard from "../components/CharacterCard";
import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Trainsition.css";
import ImageSlide from "../components/ImageSlide.tsx";

const CharacterSelect = () => {
  return (
    <div
      className="flex w-full flex-col items-center justify-center h-full text-white"
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-easing="linear"
    >
      <div className="w-[80%] h-[60%] px-6 py-12 sm:px-10 sm:py-16 rounded-3xl shadow-xl backdrop-filter backdrop-blur bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10">
        <div className="grid gap-8 h-full">
          <div className="text-center my-auto">
            <h1 className="text-4xl">따끔한 말로 정신 좀 차리세요!</h1>
            <p className="text-muted-foreground text-2xl mt-2">
              캐릭터를 선택하세요
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <CharacterCard
              name={"Andrew"}
              description={"MZ 저격수"}
              image={"https://i.ibb.co/hFy5Cbz/2024-07-02-4-08-52.png"}
            />
            <CharacterCard
              name={"Hyunwoojin"}
              description={"특징설명"}
              image={"https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png"}
            />
            <CharacterCard
              name={"Jeonhangil"}
              description={"특징설명"}
              image={"https://i.ibb.co/mhx194f/2024-07-02-2-51-19-1.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Onboarding = () => {
  return (
    <div className="w-screen h-[90%] flex flex-col text-white items-start px-[10%] justify-evenly">
      <div
        className="flex flex-col w-[40%] space-y-4"
        data-aos="fade-down-right"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <h2 className="text-[4rem] m-0 font-bold">Brain Washer</h2>
        <h2 className="text-[1.75rem] m-0">
          당신의 목표 달성을 돕기 위해 설계된 동기부여 플랫폼입니다. <br />
          엄선된 멘토들의 날카로운 조언과 피드백을 통해
          <br /> 나태함을 깨뜨리고, 성장의 길로 나아가세요.
        </h2>
      </div>
      <div
        className="flex flex-row w-full self-end text-end space-x-10"
        data-aos="fade-up-left"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
      >
        <div className="flex flex-col space-y-4 justify-center w-[30%] ml-auto">
          <h2 className="text-[3rem] m-0 font-bold">독한 피드백</h2>
          <h2 className="text-[1.75rem] m-0">
            멘토의 생생한 목소리로 전달되는 강렬한 피드백을 통해, 진정한
            동기부여와 변화를 경험해보세요.
            <br /> 독한 말로 새로운 도전에 맞설 준비가 되셨나요?
          </h2>
        </div>
        <CharacterCard
          name="Andrew"
          description="MZ 저격수"
          image="https://i.ibb.co/hFy5Cbz/2024-07-02-4-08-52.png"
          className="w-fit-content h-fit-content px-[5%] py-[2%]"
          imageSizeClass="w-24 h-24 lg:w-32 lg:h-32 xl:w-48 xl:h-48 2xl:w-48 2xl:h-48"
        />
      </div>
      <div
        className="flex flex-row self-center space-x-4 animate-bounce"
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="2000"
        data-aos-easing="linear"
      >
        <p className="my-auto text-2xl">Scroll Down</p>
        <img
          src="https://i.ibb.co/cN37MBb/chevron-down.png"
          alt="Scroll Down"
          className="self-center size-10"
        />
      </div>
    </div>
  );
};

const TransitionPage = ({ onTransitionEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const animate = (star) => {
      star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
      star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

      star.style.animation = "none";
      star.offsetHeight;
      star.style.animation = "";
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const stars = document.getElementsByClassName("magic-star");
    Array.from(stars).forEach((star, index) => {
      setTimeout(() => {
        animate(star);
        setInterval(() => animate(star), 1000);
      }, index * 333); // interval/3 = 1000ms / 3
    });

    // 2.5초 후에 페이드 아웃 시작
    const fadeOutTimer = setTimeout(() => setFadeOut(true), 2500);

    // 3초 후에 onTransitionEnd를 호출하여 다른 컴포넌트를 렌더링하도록 함
    const endTimer = setTimeout(onTransitionEnd, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(endTimer);
    };
  }, [onTransitionEnd]);

  return (
    <div
      className={`w-screen h-screen relative flex flex-col justify-around items-center bg-black ${
        fadeOut ? "fade-out" : ""
      }`}
    >
      <h1
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
        className=" text-[3rem]"
      >
        새로운 시작을 도와드립니다 &nbsp;
        <span className="magic">
          <span className="magic-star">
            <svg viewBox="0 0 512 512">
              <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
            </svg>
          </span>
          <span className="magic-star">
            <svg viewBox="0 0 512 512">
              <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
            </svg>
          </span>
          <span className="magic-star">
            <svg viewBox="0 0 512 512">
              <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
            </svg>
          </span>
          <span className="magic-text">Brain Washer</span>
        </span>
        &nbsp; 마음의 준비 되셨나요?
      </h1>
    </div>
  );
};

export default function Main() {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url(https://i.ibb.co/W5LP6yn/Brain-Wahser.png)] bg-cover bg-fixed z-10 transform scale-y-[-1]" />
      {!isTransitionComplete && (
        <div className="relative z-10">
          <TransitionPage
            onTransitionEnd={() => setIsTransitionComplete(true)}
          />
        </div>
      )}
      {isTransitionComplete && (
        <>
          <div className="h-screen relative z-10">
            <Navbar scrollToBottom={scrollToBottom} />
            <Onboarding />
          </div>
          <div className="relative z-10">
            <ImageSlide />
          </div>
          <div className="h-screen relative overflow-auto z-10">
            <CharacterSelect />
          </div>
          <div ref={bottomRef}></div>
        </>
      )}
    </div>
  );
}
