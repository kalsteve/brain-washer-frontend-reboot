interface ChatProps {
  name: string;
  description?: string;
  image: string;
}
const ChatHeader = ({ name, image }: ChatProps) => {
  return (
    <div className="flex flex-col justify-center space-y-8">
      <div className="flex flex-row space-x-8 justify-center">
        <img
          src={image}
          alt={name}
          className={`rounded-full object-cover shadow-2xl size-16 my-auto`}
        />
        <p className="text-white my-auto text-3xl font-bold">{name}</p>
      </div>
      <p className="text-muted-foreground text-lg text-center">
        채팅방에 입장하였습니다. {name} 과 대화를 나누어보세요.
      </p>
    </div>
  );
};

const ChatMessage = ({ message, image }: ChatProps & { message: string }) => {
  return (
    <div className="w-full px-[3%] py-[5%] mb-auto">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-12 rounded-full shadow-lg">
            <img alt="chat bubble component" src={image} />
          </div>
        </div>
        <div className="chat-bubble shadow-lg bg-glass">{message}</div>
      </div>
    </div>
  );
};

const ChatInput = () => {
  return (
    <div className="chat-input mx-[3%] h-[25%] items-center shadow-lg">
      <textarea
        className="flex-grow w-full h-full bg-glass rounded-lg text-lg p-6 resize-none text-white"
        placeholder="메시지를 입력하세요."
      />
    </div>
  );
};
export default function Chat({ name, description, image }: ChatProps) {
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
        <div className="px-[10%] space-x-12 mx-auto">
          <button className="btn">버튼</button>
          <button className="btn">버튼</button>
        </div>
      </div>
      {/* 채팅창 */}
      <div className="basis-3/4 h-full backdrop-blur backdrop-filter bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-10 relative z-10 rounded-xl shadow-xl justify-between flex flex-col py-[2%]">
        <ChatHeader name={name} image={image} />
        <ChatMessage name={name} image={image} message={"안녕하세요!"} />
        <ChatInput />
      </div>
    </div>
  );
}
