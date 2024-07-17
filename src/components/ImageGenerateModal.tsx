import ImageGenerator from "./ImageGenerator.tsx";

const ImageGenerateModal = () => {
  return (
    <div
      className="modal-box"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
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
      <h3 className="font-bold text-lg text-black">이미지 생성</h3>
      <ImageGenerator />
    </div>
  );
};

export default ImageGenerateModal;
