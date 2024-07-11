import { useEffect, useRef, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { useParams } from "react-router-dom";
import { sendChat } from "../api/chat";
import axios from "axios";

interface ChatProps {
  name?: string;
  description?: string;
  image?: string;
  audioStreamUrl?: string;
}

const ChatHeader = ({ name, image }: ChatProps) => {
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
        {/* 공간을 차지하게 하는 요소 */}
        <div className="btn bg-transparent border-none my-auto ml-auto hover:bg-blue-500">
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
              stroke-opacity="0.7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
  audioStreamUrl,
}: ChatProps & { message: string }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="w-full px-[3%] py-[5%] mb-auto">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full shadow-lg">
            <img alt="chat bubble component" src={image} />
          </div>
        </div>
        <div
          className="chat-bubble shadow-lg bg-glass max-w-lg px-[2%] py-[1%] text-lg"
          onClick={() => setIsShow(!isShow)}
        >
          {message}
          {audioStreamUrl && (
            <AudioPlayer audioStreamUrl={audioStreamUrl} content="content" />
          )}
          {isShow && (
            <div className="flex justify-end w-full my-[1rem]">
              <div className="flex flex-row gap-4">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M5 21.25L9.8396 16.8944C10.6303 16.1828 11.8396 16.2146 12.5917 16.9667L14.375 18.75L19.2108 13.9142C19.9918 13.1332 21.2582 13.1332 22.0392 13.9142L25 16.875M13.75 11.25C13.75 11.9404 13.1904 12.5 12.5 12.5C11.8096 12.5 11.25 11.9404 11.25 11.25C11.25 10.5596 11.8096 10 12.5 10C13.1904 10 13.75 10.5596 13.75 11.25ZM7 25H23C24.1046 25 25 24.1046 25 23V7C25 5.89543 24.1046 5 23 5H7C5.89543 5 5 5.89543 5 7V23C5 24.1046 5.89543 25 7 25Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M21.25 15L15 21.25M15 21.25L8.75 15M15 21.25V5M21.25 25H8.75"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatInput = ({
  chat_id,
  onNewMessage,
}: {
  chat_id: number | null;
  onNewMessage: (message: string) => void;
}) => {
  const [chatContent, setChatContent] = useState("");
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (contentEditableRef.current) {
      setChatContent(contentEditableRef.current.innerText);
    }
  };

  const handleSendChat = async () => {
    if (chat_id === null || chatContent.trim() === "") {
      console.error("Invalid chat ID or empty content");
      return;
    }

    try {
      const response = await sendChat(chat_id, chatContent);

      if (!response || !response.body) {
        console.error("No response body");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        // 청크를 디코딩하고 "data:" 접두사 제거
        const chunk = decoder.decode(value, { stream: true });
        const cleanChunk = chunk
          .split("\n")
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.replace(/^data:\s*/, ""))
          .join("\n");
        onNewMessage(cleanChunk); // 새로운 메시지를 부모 컴포넌트에 전달
      }
    } catch (error) {
      console.error("Error sending chat or receiving stream", error);
    }
  };

  return (
    <div className="chat-input mx-[3%] h-[25%] items-center shadow-lg flex">
      <div className="flex-grow w-full h-full bg-glass rounded-lg text-lg p-6 text-white flex items-center">
        <div
          contentEditable
          ref={contentEditableRef}
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.5003 14.8333C24.0296 14.8333 24.4587 15.2437 24.4587 15.7499L24.4587 32.2499C24.4587 32.7562 24.0296 33.1666 23.5003 33.1666C22.9711 33.1666 22.542 32.7562 22.542 32.2499L22.542 15.7499C22.542 15.2437 22.9711 14.8333 23.5003 14.8333Z"
            fill="white"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.822 15.1017C23.1963 14.7438 23.8031 14.7438 24.1773 15.1017L30.8857 21.5184C31.2599 21.8764 31.2599 22.4568 30.8857 22.8148C30.5114 23.1727 29.9046 23.1727 29.5304 22.8148L23.4997 17.0463L17.469 22.8148C17.0947 23.1727 16.488 23.1727 16.1137 22.8148C15.7394 22.4568 15.7394 21.8764 16.1137 21.5184L22.822 15.1017Z"
            fill="white"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
              <stop stop-color="#631C43" />
              <stop offset="1" stop-color="#C93988" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default function Chat({ name, description, image }: ChatProps) {
  const { chat_id } = useParams();
  // chat_id가 undefined가 아닌지 확인하고, number로 변환합니다.
  const chatIdNumber = chat_id ? parseInt(chat_id) : null;
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const handleNewMessage = (message: string) => {
    setCurrentMessage((prevMessage) => prevMessage + message);
  };

  const audioStreamUrl = "http://0.0.0.0:8000/api/v1/voices/tts/stream";
  return (
    <div className="flex flex-row w-screen h-screen px-[3%] py-[3%] gap-10">
      {/* 배경 */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-[url(https://i.ibb.co/s3QC5vr/3.jpg)] bg-cover bg-fixed z-10" />
      {/* 왼쪽 투명창 */}
      <div className=" justify-evenly flex flex-col basis-1/4 h-full backdrop-blur backdrop-filter bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10 relative z-10 rounded-xl shadow-xl">
        <div className="flex flex-col space-y-12">
          <img
            src={image}
            alt={name}
            className={`rounded-full object-cover shadow-2xl size-48 mx-auto`}
          />
          <div className="text-center space-y-2 mt-4">
            <h3 className="text-3xl font-semibold text-white">{name}</h3>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
        </div>
        <div className="px-[10%] space-x-12 mx-auto flex flex-row">
          <svg
            width="76"
            height="76"
            viewBox="0 0 76 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="38" cy="38" r="38" fill="url(#paint0_linear_602_544)" />
            <path
              d="M24.5 45.625L31.2146 39.5819C32.0053 38.8703 33.2146 38.9021 33.9667 39.6542L36.6875 42.375L43.3983 35.6642C44.1793 34.8832 45.4457 34.8832 46.2267 35.6642L50.5 39.9375M35.875 32.625C35.875 33.5225 35.1475 34.25 34.25 34.25C33.3525 34.25 32.625 33.5225 32.625 32.625C32.625 31.7275 33.3525 31 34.25 31C35.1475 31 35.875 31.7275 35.875 32.625ZM26.5 50.5H48.5C49.6046 50.5 50.5 49.6046 50.5 48.5V26.5C50.5 25.3954 49.6046 24.5 48.5 24.5H26.5C25.3954 24.5 24.5 25.3954 24.5 26.5V48.5C24.5 49.6046 25.3954 50.5 26.5 50.5Z"
              stroke="white"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                <stop stop-color="#8164A4" />
                <stop offset="1" stop-color="#40405B" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            width="76"
            height="76"
            viewBox="0 0 76 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="38" cy="38" r="38" fill="url(#paint0_linear_602_545)" />
            <g clip-path="url(#clip0_602_545)">
              <path
                d="M39 22.7678C29.0165 22.7678 23.3092 29.941 23.916 37.0226L24.4767 43.0921"
                stroke="white"
                stroke-width="3.17691"
              />
              <path
                d="M39 22.7678C48.9836 22.7678 54.6908 29.941 54.0839 37.0226L53.5234 43.0921"
                stroke="white"
                stroke-width="3.17691"
              />
              <path
                d="M43.6414 41.6042C43.8752 39.0105 46.231 37.0918 48.9035 37.3188L49.1716 37.3415C51.844 37.5685 53.8206 39.855 53.587 42.4488L53.1284 47.5356C52.8946 50.1294 50.5386 52.0481 47.8665 51.8211L47.5981 51.7982C44.9258 51.5712 42.949 49.2848 43.1828 46.691L43.6414 41.6042Z"
                fill="#4F378B"
                fill-opacity="0.16"
                stroke="white"
                stroke-width="3.17691"
              />
              <path
                d="M24.4133 42.4493C24.1795 39.8555 26.1563 37.569 28.8286 37.342L29.0969 37.3192C31.7692 37.0923 34.125 39.011 34.3588 41.6047L34.8174 46.6915C35.0512 49.2853 33.0744 51.5719 30.402 51.7987L30.1338 51.8216C27.4615 52.0486 25.1056 50.1298 24.8718 47.536L24.4133 42.4493Z"
                fill="#4F378B"
                fill-opacity="0.16"
                stroke="white"
                stroke-width="3.17691"
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
                <stop stop-color="#8164A4" />
                <stop offset="1" stop-color="#40405B" />
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
      </div>
      {/* 채팅창 */}
      <div className="basis-3/4 w-full h-full backdrop-blur backdrop-filter bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10 relative z-10 rounded-xl shadow-xl justify-between flex flex-col py-[2%]">
        <ChatHeader name={name} image={image} />
        <div className="flex flex-col space-y-4 overflow-auto">
          <ChatMessage message={currentMessage} image={image} />
        </div>
        <ChatInput chat_id={chatIdNumber} onNewMessage={handleNewMessage} />
      </div>
    </div>
  );
}
