import { useEffect, useRef, useState } from "react";

const ImageGenerator = ({ content }: { content: string }) => {
  const canvasRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [text, setText] = useState(content);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setBackgroundImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image if available
    if (backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawText(ctx);
      };
    } else {
      // Draw text without background image
      drawText(ctx);
    }
  };

  const drawInitialText = (ctx) => {
    ctx.fillStyle = "#ececec";
    ctx.font = "20px Arial";
    ctx.fillText("이미지를 생성해보세요", 100, 200); // 캔버스 중앙에 텍스트를 표시하도록 좌표 조정
  };

  const drawText = (ctx) => {
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText(text, 50, 50);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated-image.png";
    link.click();
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawInitialText(ctx);
  };

  useEffect(() => {
    initializeCanvas();
  }, []);

  useEffect(() => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.addEventListener("show", initializeCanvas);
    }
    return () => {
      if (modal) {
        modal.removeEventListener("show", initializeCanvas);
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full space-y-6">
      <canvas ref={canvasRef} width={400} height={400} className="rounded-md" />

      {/*<input type="text" placeholder={content}/>*/}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-white">
            이미지에 넣을 텍스트를 입력하세요
          </span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full text-black"
          value={text}
          onChange={(e) => {
            handleText(e);
          }}
        />
      </label>

      <input
        type="file"
        className="file-input w-full max-w-xs mx-auto"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div className="flex space-x-2 justify-center">
        <button
          onClick={() => {
            drawImage();
          }}
          className="p-2 bg-blue-500 text-white rounded"
        >
          이미지 생성
        </button>
        <button
          onClick={downloadImage}
          className="p-2 bg-green-500 text-white rounded"
        >
          이미지 저장
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
