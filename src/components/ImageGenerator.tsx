import { useEffect, useRef, useState } from "react";
import { getBackgroundList } from "../api/images.ts";

const ImageGenerator = ({
  content,
  character,
}: {
  content: string;
  character: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [text, setText] = useState(content);
  const [isDragging, setIsDragging] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [shouldDrawText, setShouldDrawText] = useState(false);
  const [sampleImages, setSampleImages] = useState([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setBackgroundImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image if available
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
      drawInitialText(ctx);
    }

    if (shouldDrawText) {
      drawText(ctx);
    }
  };

  const drawInitialText = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ececec";
    ctx.font = "20px Arial";
    ctx.fillText("이미지를 생성해보세요", 100, 200); // 캔버스 중앙에 텍스트를 표시하도록 좌표 조정
  };

  const drawText = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, textPosition.x - textWidth / 2, textPosition.y);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated-image.png";
    link.click();
  };

  const initializeCanvas = () => {
    drawCanvas();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const textWidth = ctx.measureText(text).width;
    setDragOffset({
      x: x - (textPosition.x - textWidth / 2),
      y: y - textPosition.y,
    });
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTextPosition({ x: x - dragOffset.x, y: y - dragOffset.y });

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      drawCanvas();
    }
  };

  useEffect(() => {
    initializeCanvas();
  }, [backgroundImage]);

  useEffect(() => {
    const fetchSampleImage = async () => {
      const response = await getBackgroundList(character);
      setSampleImages(response.data);
    };

    fetchSampleImage();
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
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="rounded-md"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />

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
          onChange={handleText}
        />
      </label>

      <input
        type="file"
        className="file-input w-full max-w-xs mx-auto"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => {
            setShouldDrawText(true);
            drawCanvas();
          }}
          className="p-2 bg-blue-500 text-white rounded glass"
        >
          이미지 생성
        </button>
        <button
          onClick={downloadImage}
          className="p-2 bg-green-500 text-white rounded glass"
        >
          이미지 저장
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
