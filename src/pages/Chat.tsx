import { useEffect, useRef, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { getChatHistory, readChatRoom, sendChat } from "../api/chat";
import { getRoomTts, postTts } from "../api/voices";
import AOS from "aos";
import ImageGenerateModal from "../components/ImageGenerateModal.tsx";
import { getRoomImages } from "../api/images.ts";

interface ChatProps {
  name?: string;
  description?: string;
  image?: string;
  audioStreamUrl?: string;
  createdAt?: string;
}

interface Message {
  content: string;
  isUser: boolean;
  createdAt?: string;
  bubble_id?: number;
}

const formatToKoreanTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12; // 0시를 12시로 표현
  return `${year}-${month}-${day} ${ampm} ${formattedHours}:${minutes}`;
};

const ChatHeader = ({ name, image }: ChatProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center space-y-8">
      <div className="flex flex-row space-x-8 justify-between px-[3%]">
        <div></div>
        <div className="flex flex-row space-x-8">
          <img
            src={image}
            alt={name}
            className={`rounded-full object-cover shadow-2xl size-16 my-auto`}
          />
          <p className="text-white my-auto text-3xl font-bold">{name}</p>
        </div>
        <div
          className="btn bg-transparent border-none my-auto ml-auto hover:bg-blue-500"
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
      <p className="text-muted-foreground text-lg text-center">
        채팅방에 입장하였습니다. {name} 과 대화를 나누어보세요.
      </p>
    </div>
  );
};

const ChatMessage = ({
  message,
  image,
  isUser,
  createdAt,
  id,
  character,
  lastBubbleId,
}: ChatProps & {
  message: string;
  isUser: boolean;
  id?: number;
  character: string;
  lastBubbleId?: number;
}) => {
  const [isShow, setIsShow] = useState(false);

  const showModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const DownloadTts = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if (!id) {
      id = lastBubbleId;
    }
    const response = await postTts(id?.toString());
    const voiceUrl = await response.audio_url;
    // Check if the URL is from S3
    if (voiceUrl) {
      const a = document.createElement("a");
      a.href = voiceUrl;
      a.download = "tts.mp3"; // Set the desired file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const bubbleId = id ?? lastBubbleId;

  return (
    <div
      className={`w-full px-[3%] py-[5%] mb-auto ${
        isUser ? "chat chat-end" : "chat chat-start"
      }`}
    >
      {!isUser && (
        <div className="chat-image avatar">
          <div className="w-12 rounded-full shadow-lg">
            <img alt="chat bubble component" src={image} />
          </div>
        </div>
      )}
      <div
        className={`chat-bubble shadow-lg ${
          isUser ? "bg-[#2196F3] opacity-80 text-white" : "bg-glass"
        } max-w-lg px-[2%] py-[1%] text-lg`}
        onClick={() => setIsShow(!isShow)}
      >
        {message}
        {isShow && !isUser && (
          <div className="flex justify-end w-full my-[1rem]">
            <div className="flex flex-row gap-4">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showModal();
                }}
              >
                <path
                  d="M5 21.25L9.8396 16.8944C10.6303 16.1828 11.8396 16.2146 12.5917 16.9667L14.375 18.75L19.2108 13.9142C19.9918 13.1332 21.2582 13.1332 22.0392 13.9142L25 16.875M13.75 11.25C13.75 11.9404 13.1904 12.5 12.5 12.5C11.8096 12.5 11.25 11.9404 11.25 11.25C11.25 10.5596 11.8096 10 12.5 10C13.1904 10 13.75 10.5596 13.75 11.25ZM7 25H23C24.1046 25 25 24.1046 25 23V7C25 5.89543 24.1046 5 23 5H7C5.89543 5 5 5.89543 5 7V23C5 24.1046 5.89543 25 7 25Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {bubbleId && (
                <dialog
                  id="my_modal_3"
                  className="modal"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <ImageGenerateModal
                    content={message}
                    character={character}
                    bubbleId={bubbleId}
                  />
                </dialog>
              )}
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={(e) => DownloadTts(e)}
              >
                <path
                  d="M21.25 15L15 21.25M15 21.25L8.75 15M15 21.25V5M21.25 25H8.75"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
        {!isUser && (
          <div className="text-right text-sm text-gray-500 mt-1">
            {createdAt ? formatToKoreanTime(createdAt) : ""}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatInput = ({
  chat_id,
  onNewMessage,
  onUpdateResponse,
  setAudioData,
  setLastBubbleId,
}: {
  chat_id: number | null;
  onNewMessage: (message: Message) => void;
  onUpdateResponse: (message: string) => void;
  setAudioData: (audioData: Uint8Array[]) => void;
  setLastBubbleId: (bubbleId: number) => void;
}) => {
  const [chatContent, setChatContent] = useState("");
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (contentEditableRef.current) {
      setChatContent(contentEditableRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  const handleSendChat = async () => {
    if (chat_id === null || chatContent.trim() === "") {
      console.error("Invalid chat ID or empty content");
      return;
    }

    onNewMessage({ content: chatContent, isUser: true });
    setChatContent("");

    if (contentEditableRef.current) {
      contentEditableRef.current.innerText = "";
    }

    try {
      const response = await sendChat(chat_id, chatContent);

      if (!response || !response.body) {
        console.error("No response body");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedMessage = "";
      let done = false;
      let partialChunk = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value, { stream: true });
        partialChunk += chunk;

        const lines = partialChunk.split("\n");
        if (!done) {
          partialChunk = lines.pop() || "";
        } else {
          partialChunk = "";
        }

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonPart = line.substring(6).trim();
            if (jsonPart.length > 0) {
              try {
                const data = JSON.parse(jsonPart);

                if (data.message) {
                  accumulatedMessage += data.message;
                  onUpdateResponse(accumulatedMessage);
                }

                if (data.audio) {
                  const binaryData = hexToBinary(data.audio);
                  // console.log("binaryData: ", binaryData);
                  setAudioData((prevData) => [...(prevData || []), binaryData]);
                }
                if (data.bubble_id) {
                  setLastBubbleId(data.bubble_id);
                }
              } catch (error) {
                console.error("Error parsing JSON:", error, jsonPart);
              }
            }
          }
        }
      }

      onNewMessage({ content: accumulatedMessage, isUser: false });
      onUpdateResponse("");
    } catch (error) {
      console.error("Error sending chat or receiving stream", error);
    }
  };

  const hexToBinary = (hex) => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  };






  return (
    <div className="chat-input mx-[3%] h-[25%] items-center shadow-lg flex">
      <div className="flex-grow w-full h-full bg-glass rounded-lg text-lg p-6 text-white flex items-center">
        <div
          contentEditable
          ref={contentEditableRef}
          onKeyPress={handleKeyDown}
          onInput={handleInput}
          className="flex-grow bg-transparent outline-none h-full justify-start"
        />
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer hover:opacity-70 mb-auto transition-opacity duration-300 ease-in-out"
          onClick={handleSendChat}
        >
          <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_598_542)" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.5003 14.8333C24.0296 14.8333 24.4587 15.2437 24.4587 15.7499L24.4587 32.2499C24.4587 32.7562 24.0296 33.1666 23.5003 33.1666C22.9711 33.1666 22.542 32.7562 22.542 32.2499L22.542 15.7499C22.542 15.2437 22.9711 14.8333 23.5003 14.8333Z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.822 15.1017C23.1963 14.7438 23.8031 14.7438 24.1773 15.1017L30.8857 21.5184C31.2599 21.8764 31.2599 22.4568 30.8857 22.8148C30.5114 23.1727 29.9046 23.1727 29.5304 22.8148L23.4997 17.0463L17.469 22.8148C17.0947 23.1727 16.488 23.1727 16.1137 22.8148C15.7394 22.4568 15.7394 21.8764 16.1137 21.5184L22.822 15.1017Z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_598_542"
              x1="24"
              y1="0"
              x2="24"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#631C43" />
              <stop offset="1" stopColor="#C93988" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default function Chat({ description }: ChatProps) {
  const { chat_id } = useParams();
  const chatIdNumber = chat_id ? parseInt(chat_id) : null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [audioData, setAudioData] = useState<Uint8Array[]>([]);
  const [ttsList, setTtsList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const menuOptions = ["default", "ttsList", "imageList"];
  const [menu, setMenu] = useState(menuOptions[0]);
  const [name, setName] = useState("");
  const [chatName, setChatName] = useState("");
  const [lastBubbleId, setLastBubbleId] = useState<number>();
  const [playingId, setPlayingId] = useState(null);

  const images = [
    "https://i.ibb.co/hFy5Cbz/2024-07-02-4-08-52.png",
    "https://i.ibb.co/yBFH4tY/2024-07-02-2-53-32.png",
    "https://i.ibb.co/mhx194f/2024-07-02-2-51-19-1.png",
  ];
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);


  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const playAudio = (audioUrl, index) => {
    const audio = new Audio(audioUrl);
    audio.play();
    setPlayingId(index);
    audio.onended = () => setPlayingId(null); // 오디오가 끝나면 playingId를 null로 설정
  };

  const getSvgIcon = (index) => {
    if (playingId === index) {
      // 음성 재생 중일 때 SVG
      return (
        <div className="group rounded-full transition duration-300 ease-in-out">
          <svg
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 ease-in-out"
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
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 ease-in-out"
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

  useEffect(() => {
    AOS.init();
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  const handleNewMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleUpdateResponse = (message: string) => {
    setCurrentResponse(message);
  };

  const fetchChatHistory = async () => {
    if (chatIdNumber) {
      await readChatRoom(chatIdNumber);
      const response = await getChatHistory(chatIdNumber);
      const chatHistory = response.data.bubbles.map((bubble: any) => ({
        content: bubble.content,
        isUser: bubble.writer, // API 응답에 따라 이 값을 설정해야 합니다.
        createdAt: bubble.created_at,
        bubble_id: bubble.id,
      }));
      setMessages(chatHistory);
    }
  };

  useEffect(() => {
    const fetchChatRoomData = async () => {
      try {
        const response = await readChatRoom(chatIdNumber);
        setName(response.data.character_name);
        setChatName(response.data.name);
      } catch (error) {
        console.error("Error reading chat room:", error);
      }
    };
    fetchChatRoomData();
    fetchChatHistory();
  }, [chat_id]);

  useEffect(() => {
    if (name === "Andrew") {
      setImage(images[0]);
    } else if (name === "Hyunwoojin") {
      setImage(images[1]);
    } else if (name === "Jeonhangil") {
      setImage(images[2]);
    }
  }, [name, images]);
  return (
    <div className="flex flex-row w-screen h-screen px-[3%] py-[3%] gap-10">
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url(https://i.ibb.co/s3QC5vr/3.jpg)] bg-cover bg-fixed z-10" />
      <div className=" justify-evenly flex flex-col basis-1/4 h-full backdrop-blur backdrop-filter bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10 relative z-10 rounded-xl shadow-xl">
        <div data-aos="zoom-in" className="flex flex-col space-y-12">
          <img
            src={image}
            alt={name}
            className={`rounded-full object-cover shadow-2xl size-48 mx-auto`}
          />
          <AudioPlayer audioData={audioData} />
          <div className="text-center space-y-2 mt-4">
            <h3 className="text-3xl font-semibold text-white">{name}</h3>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="px-[10%] space-x-12 mx-auto flex flex-row"
        >
          <svg
            width="76"
            height="76"
            viewBox="0 0 76 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer duration-400 transform hover:scale-95 transition-transform drop-shadow-2xl"
            onClick={async () => {
              if (chatIdNumber) {
                const response = await getRoomTts(chatIdNumber);
                setTtsList(response.data.voices);
              }
              if (menu === menuOptions[1]) {
                setMenu(menuOptions[0]);
              } else {
                setMenu(menuOptions[1]);
              }
            }}
          >
            <circle cx="38" cy="38" r="38" fill="url(#paint0_linear_602_544)" />
            <path
              d="M24.5 45.625L31.2146 39.5819C32.0053 38.8703 33.2146 38.9021 33.9667 39.6542L36.6875 42.375L43.3983 35.6642C44.1793 34.8832 45.4457 34.8832 46.2267 35.6642L50.5 39.9375M35.875 32.625C35.875 33.5225 35.1475 34.25 34.25 34.25C33.3525 34.25 32.625 33.5225 32.625 32.625C32.625 31.7275 33.3525 31 34.25 31C35.1475 31 35.875 31.7275 35.875 32.625ZM26.5 50.5H48.5C49.6046 50.5 50.5 49.6046 50.5 48.5V26.5C50.5 25.3954 49.6046 24.5 48.5 24.5H26.5C25.3954 24.5 24.5 25.3954 24.5 26.5V48.5C24.5 49.6046 25.3954 50.5 26.5 50.5Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_602_544"
                x1="38"
                y1="0"
                x2="38"
                y2="76"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8164A4" />
                <stop offset="1" stopColor="#40405B" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            width="76"
            height="76"
            viewBox="0 0 76 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer duration-400 transform hover:scale-95 transition-transform drop-shadow-2xl"
            onClick={async () => {
              if (chatIdNumber) {
                const response = await getRoomImages(chatIdNumber);
                setImageList(response.data.images);
              }
              if (menu === menuOptions[2]) {
                setMenu(menuOptions[0]);
              } else {
                setMenu(menuOptions[2]);
              }
            }}
          >
            <circle cx="38" cy="38" r="38" fill="url(#paint0_linear_602_545)" />
            <g clipPath="url(#clip0_602_545)">
              <path
                d="M39 22.7678C29.0165 22.7678 23.3092 29.941 23.916 37.0226L24.4767 43.0921"
                stroke="white"
                strokeWidth="3.17691"
              />
              <path
                d="M39 22.7678C48.9836 22.7678 54.6908 29.941 54.0839 37.0226L53.5234 43.0921"
                stroke="white"
                strokeWidth="3.17691"
              />
              <path
                d="M43.6414 41.6042C43.8752 39.0105 46.231 37.0918 48.9035 37.3188L49.1716 37.3415C51.844 37.5685 53.8206 39.855 53.587 42.4488L53.1284 47.5356C52.8946 50.1294 50.5386 52.0481 47.8665 51.8211L47.5981 51.7982C44.9258 51.5712 42.949 49.2848 43.1828 46.691L43.6414 41.6042Z"
                fill="#4F378B"
                fillOpacity="0.16"
                stroke="white"
                strokeWidth="3.17691"
              />
              <path
                d="M24.4133 42.4493C24.1795 39.8555 26.1563 37.569 28.8286 37.342L29.0969 37.3192C31.7692 37.0923 34.125 39.011 34.3588 41.6047L34.8174 46.6915C35.0512 49.2853 33.0744 51.5719 30.402 51.7987L30.1338 51.8216C27.4615 52.0486 25.1056 50.1298 24.8718 47.536L24.4133 42.4493Z"
                fill="#4F378B"
                fillOpacity="0.16"
                stroke="white"
                strokeWidth="3.17691"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_602_545"
                x1="38"
                y1="0"
                x2="38"
                y2="76"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8164A4" />
                <stop offset="1" stopColor="#40405B" />
              </linearGradient>
              <clipPath id="clip0_602_545">
                <rect
                  width="34"
                  height="33"
                  fill="white"
                  transform="translate(22 21)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        {menu === menuOptions[1] && (
          <div
            data-aos="zoom-in"
            className="flex flex-col gap-5 mx-[10%] justify-start h-[40%]"
          >
            {/*<p className="text-white text-2xl  font-normal">저장한 이미지</p>*/}
            <div className="flex flex-col h-full rounded-2xl backdrop-blur backdrop-filter backdrop:shadow w-full">
            <ul className="grid grid-cols-4 gap-4 m-[5%] overflow-y-auto w-full text-2xl font-light text-white pr-10">
              {imageList.length > 0 ? (
                imageList.map((item, i) => (
                  <li key={i} className="w-full h-full">
                    <img
                      src={item.image_url}
                      alt={item.content}
                      className="w-24 h-24 object-cover cursor-pointer rounded-lg"
                      onClick={() => handleImageClick(item.image_url)}
                    />
                  </li>
                ))
              ) : (
                <li className="col-span-4 flex items-center justify-center">
                  <p className="text-center text-2xl font-light">
                    해당 채팅방에서 생성한 이미지가 없습니다
                  </p>
                </li>
              )}
            </ul>

              {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                  <div className="relative">
                    <button
                      className="absolute top-2 right-2 text-white text-2xl"
                      onClick={handleImageClose}
                    >
                      &times;
                    </button>
                    <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full" />
                  </div>
                </div>
              )}
            </div>
          
          </div>
        )}
        {menu === menuOptions[2] && (
          <div
            data-aos="zoom-in"
            className="flex flex-col gap-5 mx-[10%] justify-center h-[40%]"
          >
            {/*<p className="text-white text-2xl  font-normal">저장한 TTS</p>*/}
            <div className="flex flex-row h-full rounded-2xl backdrop-blur backdrop-filter backdrop:shadow w-full">
              <ul className="flex flex-col items-start w-full text-2xl font-light text-white space-y-5 m-[5%] overflow-y-auto no-scrollbar">
                {ttsList.length > 0 ? (
                  ttsList.map((item, i) => (
                    <li
                      key={i}
                      className="flex flex-row w-full justify-between  bg-white bg-opacity-10 px-5 py-2 rounded-xl text-lg"
                    >
                      <p className="truncate overflow-hidden whitespace-nowrap w-[13vw] p-1.5">
                        {item.content}
                      </p>

                      <div className="cursor-pointer hover:opacity-50 pt-0.5" onClick={() => playAudio(item.audio_url, i)}>
                        {getSvgIcon(i)}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="items-center text-center my-auto text-2xl font-light">
                    해당 채팅방에서 다운받은 TTS 가 없습니다
                  </p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="basis-3/4 w-full h-full backdrop-blur backdrop-filter bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10 relative z-10 rounded-xl shadow-xl justify-between flex flex-col py-[2%]">
        <ChatHeader name={chatName} image={image} />
        <div className="flex flex-col space-y-4 overflow-auto mb-auto">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.content}
              image={image}
              isUser={msg.isUser}
              createdAt={msg.createdAt}
              id={msg.bubble_id}
              character={name}
              lastBubbleId={lastBubbleId}
            />
          ))}
          {currentResponse && (
            <ChatMessage
              message={currentResponse}
              image={image}
              isUser={false}
              character={name}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput
          chat_id={chatIdNumber}
          onNewMessage={handleNewMessage}
          onUpdateResponse={handleUpdateResponse}
          setAudioData={setAudioData}
          setLastBubbleId={setLastBubbleId}
        />
      </div>
    </div>
  );
}
