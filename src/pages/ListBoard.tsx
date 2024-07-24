// App.tsx
import React, { useState, useEffect } from "react";
import { getAllTts } from "../api/voices";
import { getAllImages } from "../api/images";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const [showTts, setShowTts] = useState(true);
  const [voices, setVoices] = useState([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState(null);
  const [Images, setImages] = useState([]);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const data = await getAllTts();
        setVoices(data.data.voices); // 응답 데이터의 data 배열 설정
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching voices:", error);
      }
    };

    fetchVoices();
  }, []);

  const handlePlayAudio = async (audio_url: string, index) => {
    try {
      // 현재 오디오와 같은 URL이거나 오디오가 없는 경우
      if (audio && currentAudioUrl === audio_url) {
        if (playingId == index) {
          // 현재 오디오가 재생 중이면 일시 정지
          audio.pause();
          setPlayingId(null);
        } else {
          // 현재 오디오가 일시 정지 상태이면 재생
          audio.play();
          setPlayingId(index);

          // 음성이 끝나면 상태를 업데이트합니다.
          audio.onended = () => {
            setPlayingId(null);
          };
        }
      } else {
        // 다른 오디오가 재생 중이거나 새로운 오디오 URL인 경우
        if (audio) {
          // 기존 오디오가 있을 경우 정리
          audio.pause();
          setAudio(null);
        }

        // 새로운 오디오 객체 생성 및 재생
        const newAudio = new Audio(audio_url);
        setAudio(newAudio);
        setCurrentAudioUrl(audio_url);
        newAudio
          .play()
          .then(() => {
            // setIsPlaying(true);
            setPlayingId(index);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
   
  };

  const getSvgIcon = (index) => {
    if (playingId == index) {
      // 음성 재생 중일 때 SVG
      return (
        <div className="group rounded-full transition duration-300 ease-in-out">
          <svg
            className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 ease-in-out"
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_847_393)">
              <circle
                cx="21.5"
                cy="18.5"
                r="18.5"
                fill="url(#paint0_linear_847_393)"
              />
            </g>
            <rect
              x="16"
              y="11"
              width="4.36364"
              height="13.5"
              rx="2.18182"
              fill="white"
            />
            <rect
              x="23.6362"
              y="11"
              width="4.36364"
              height="13.5"
              rx="2.18182"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_847_393"
                x="0"
                y="0"
                width="43"
                height="43"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_847_393"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_847_393"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_847_393"
                x1="21.5"
                y1="0"
                x2="21.5"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#631C43" />
                <stop offset="1" stop-color="#C93988" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    } else {
      // 음성 일시 정지 중일 때 SVG
      return (
        <div className="group rounded-full transition duration-300 ease-in-out">
          <svg
            className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 ease-in-out"
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_599_393)">
              <circle
                cx="21.5"
                cy="18.6"
                r="18.5"
                fill="url(#paint0_linear_599_393)"
              />
            </g>
            <g filter="url(#filter1_d_599_393)">
              <path
                d="M18.3441 10.9871C17.2886 10.3662 15.958 11.1273 15.958 12.3519V22.6485C15.958 23.8731 17.2886 24.6341 18.3441 24.0133L27.0963 18.8649C28.137 18.2527 28.137 16.7477 27.0963 16.1355L18.3441 10.9871Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_599_393"
                x="0"
                y="0"
                width="43"
                height="43"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_599_393"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_599_393"
                  result="shape"
                />
              </filter>
              <filter
                id="filter1_d_599_393"
                x="8"
                y="8"
                width="27"
                height="27"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_599_393"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_599_393"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_599_393"
                x1="21.5"
                y1="0"
                x2="21.5"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#631C43" />
                <stop offset="1" stop-color="#C93988" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    //const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    //const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };
  

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await getAllImages();
        setImages(response.data.images);
        console.log(response);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY);
    }
  }, []);

  const kakaoShare = async (
    voiceId: number,
    content: string,
    character_image: number
  ) => {
    try {
      // Kakao SDK 초기화 상태 체크
      if (!Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY);
      }

      // 공유할 내용과 URL 설정
      const url = `http://localhost:5173/play?v=${voiceId}`;
      const shareContent = {
        title: "Brain Washer | 브레인 워셔",
        description: content,
        imageUrl: character_image,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      };

      // 카카오톡 공유하기
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: shareContent,
        buttons: [
          {
            title: "음성 듣기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error sharing to KakaoTalk:", error);
    }
  };

  const kakaoImageShare = async (content: string, imageUrl: string) => {
    try {
      // Kakao SDK 초기화 상태 체크
      if (!Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY);
      }

      // 공유할 내용과 URL 설정
      const url = `http://localhost:5173`;
      const shareContent = {
        title: "Brain Washer | 브레인 워셔",
        description: content,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      };

      // 카카오톡 공유하기
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: shareContent,
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error sharing to KakaoTalk:", error);
    }
  };

    const downloadAudio = (audioUrl) => {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'audio.mp3'; // 다운로드할 파일명 지정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://i.ibb.co/s3QC5vr/3.jpg')" }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 text-white overflow-hidden">
        <div className="flex flex-col items-start p-6 px-[5%] ">
          <div className="flex flex-row">
            <Link to="/" className="inline-block mt-3">
              <img
                src="https://i.postimg.cc/rsr08G5r/Group-59.png"
                alt="Icon"
                className="w-16 h-16 my-auto"
              />
            </Link>

            <h1 className="text-3xl font-bold mt-7 mb-6 ml-7 ">
              저장한 음성 및 이미지
            </h1>
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

          <div className="bg-white bg-opacity-25 px-6 pt-[0.5%] rounded-b-lg pb-[2%] mb-[10%] shadow-md w-full h-full ">
            <div className="flex justify-center space-x-8 mb-8 "></div>
            {showTts ? (
              <div className="grid grid-cols-2 gap-6 mx-[2%] max-h-[660px] overflow-y-auto overflow-x-hidden">
                {voices.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-[rgba(224,224,224,0.2)] to-[rgba(71,91,161,0.2)] shadow-lg shadow-black/25 backdrop-blur-[3px] rounded-[25px] bg-opacity-20  p-6 flex items-center justify-between text-white"
                  >
                    <img
                      src={item.character_image}
                      alt="Profile"
                      className="w-16 h-18 rounded-full"
                    />
                    <div className="flex flex-col flex-grow mx-4">
                      <span className="text-sm text-gray-300">
                      {formatDateTime(item.created_at)}
                      </span>
                      <p
                        className="text-left mt-2"
                        style={{
                          maxWidth: "550px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.content}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="w-auto h-auto text-white rounded"
                        onClick={() => handlePlayAudio(item.audio_url, index)}
                      >
                        {getSvgIcon(index)}
                      </button>

                      <button
                      className="w-auto h-auto text-white rounded"
                      onClick={() => downloadAudio(item.audioUrl)}
                    >
                      <div className="group rounded-full transition duration-300 ease-in-out">
                        <svg
                          className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                          width="45"
                          height="45"
                          viewBox="0 0 45 45"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_d_924_519)">
                            <circle
                              cx="22.5"
                              cy="18.5"
                              r="18.5"
                              fill="url(#paint0_linear_924_519)"
                            />
                          </g>
                          <path
                            d="M28.4168 17.9999L23.0002 23.4166M23.0002 23.4166L17.5835 17.9999M23.0002 23.4166V9.33325M28.4168 26.6666H17.5835"
                            stroke="white"
                            stroke-width="2.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <filter
                              id="filter0_d_924_519"
                              x="0"
                              y="0"
                              width="45"
                              height="45"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="2" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_924_519"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_924_519"
                                result="shape"
                              />
                            </filter>
                            <linearGradient
                              id="paint0_linear_924_519"
                              x1="22.5"
                              y1="0"
                              x2="22.5"
                              y2="37"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#631C43" />
                              <stop offset="1" stop-color="#C93988" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </button>


                      <button
                        className="w-auto h-auto text-white rounded"
                        onClick={() =>
                          kakaoShare(
                            item.id,
                            item.content,
                            item.character_image
                          )
                        }
                      >
                        <div className="group rounded-full transition duration-300 ease-in-out">
                          <svg
                            className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                            width="45"
                            height="45"
                            viewBox="0 0 45 45"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_d_599_396)">
                              <circle
                                cx="22.5"
                                cy="18.5"
                                r="18.5"
                                fill="url(#paint0_linear_599_396)"
                              />
                            </g>
                            <g filter="url(#filter1_d_599_396)">
                              <path
                                d="M24.8752 13.75L22.5002 11.375M22.5002 11.375L20.1252 13.75M22.5002 11.375V20.875M25.6668 16.9167H26.0418C27.1464 16.9167 28.0418 17.8121 28.0418 18.9167V22.8333C28.0418 23.9379 27.1464 24.8333 26.0418 24.8333H18.9585C17.8539 24.8333 16.9585 23.9379 16.9585 22.8333V18.9167C16.9585 17.8121 17.8539 16.9167 18.9585 16.9167H19.3335"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_d_599_396"
                                x="0"
                                y="0"
                                width="45"
                                height="45"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_599_396"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_599_396"
                                  result="shape"
                                />
                              </filter>
                              <filter
                                id="filter1_d_599_396"
                                x="9"
                                y="9"
                                width="27"
                                height="27"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_599_396"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_599_396"
                                  result="shape"
                                />
                              </filter>
                              <linearGradient
                                id="paint0_linear_599_396"
                                x1="22.5"
                                y1="0"
                                x2="22.5"
                                y2="37"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#631C43" />
                                <stop offset="1" stop-color="#C93988" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </button>

                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-y-auto h-[695px]">
  <div className="grid grid-cols-5 gap-x-0.5 gap-y-8">
    {Images.map((image, index) => (
      <div
        key={index}
        className="w-[250px] bg-white bg-opacity-10 rounded-[20px] shadow-md shadow-black/25 mx-[15%]"
      >
        <div className="relative h-0 pb-[100%] mb-15">
          <img
            src={image.image_url} // 발췌이미지의 URL 사용
            alt={`Image ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="px-3 py-0 flex">
          <div
            className="w-full h-20 p-1 pt-4 text-white overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {image.content} {/* 발췌이미지에 대한 설명 표시 */}
          </div>

          <button
            className="w-auto h-auto text-white rounded"
            onClick={() => kakaoImageShare(image.content, image.image_url)}
          >
            <div className="group rounded-full transition duration-300 ease-in-out">
              <svg
                className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_599_396)">
                  <circle
                    cx="22.5"
                    cy="18.5"
                    r="18.5"
                    fill="url(#paint0_linear_599_396)"
                  />
                </g>
                <g filter="url(#filter1_d_599_396)">
                  <path
                    d="M24.8752 13.75L22.5002 11.375M22.5002 11.375L20.1252 13.75M22.5002 11.375V20.875M25.6668 16.9167H26.0418C27.1464 16.9167 28.0418 17.8121 28.0418 18.9167V22.8333C28.0418 23.9379 27.1464 24.8333 26.0418 24.8333H18.9585C17.8539 24.8333 16.9585 23.9379 16.9585 22.8333V18.9167C16.9585 17.8121 17.8539 16.9167 18.9585 16.9167H19.3335"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_599_396"
                    x="0"
                    y="0"
                    width="45"
                    height="45"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_599_396"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_599_396"
                      result="shape"
                    />
                  </filter>
                  <filter
                    id="filter1_d_599_396"
                    x="9"
                    y="9"
                    width="27"
                    height="27"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_599_396"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_599_396"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_599_396"
                    x1="22.5"
                    y1="0"
                    x2="22.5"
                    y2="37"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#631C43" />
                    <stop offset="1" stop-color="#C93988" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
