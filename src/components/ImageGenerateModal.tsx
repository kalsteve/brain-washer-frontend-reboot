import ImageGenerator from "./ImageGenerator.tsx";

const ImageGenerateModal = ({
  content,
  character,
  bubbleId,
}: {
  content: string;
  character: string;
  bubbleId: number;
}) => {
  return (
    <div
      className="modal-box flex flex-col justify-between space-y-2 backdrop-blur backdrop-filter bg-gradient-to-t from-[#7a7a7a1e] to-[#e0e0e024] bg-opacity-20"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h3 className="font-bold text-lg text-white">이미지 생성</h3>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          ✕
        </button>
      </form>
      <ImageGenerator
        content={content}
        character={character}
        bubbleId={bubbleId}
      />
    </div>
  );
};

export default ImageGenerateModal;
