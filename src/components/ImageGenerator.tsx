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
  const [fontSize, setFontSize] = useState(30);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontStyle, setFontStyle] = useState("normal");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setBackgroundImage(img);
          drawCanvas(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontColor(e.target.value);
  };

  const handleFontStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontStyle(e.target.value);
  };

  const drawCanvas = (img?: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image if available
    const imageToDraw = img || backgroundImage;
    if (imageToDraw) {
      ctx.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);
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
    ctx.fillStyle = fontColor;
    ctx.font = `${fontStyle} ${fontSize}px Arial`;
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

  const handleSampleImageClick = (imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc + "?v=" + new Date().getTime();
    img.onload = () => {
      setBackgroundImage(img);
    };
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

  useEffect(() => {
    drawCanvas();
  }, [text, shouldDrawText, fontSize, fontColor, fontStyle]);

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
          <span className="label-text text-white text-base">
            이미지에 넣을 텍스트를 입력하세요
          </span>
        </div>
        <div className="flex flex-row justify-between space-x-2">
          <input
            type="text"
            className="input input-bordered w-full text-black"
            value={text}
            onChange={handleText}
          />
          <button
            onClick={() => {
              setShouldDrawText(true);
              drawCanvas();
            }}
            className="btn text-white rounded glass bg-glass bg-[#2196F3] bg-opacity-80 hover:bg-opacity-100 hover:bg-[#2196F3]"
          >
            입력
          </button>
        </div>
      </label>
      <div className="flex flex-row justify-between space-x-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-white">텍스트 크기 (px)</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full text-black"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-white">텍스트 스타일</span>
          </div>
          <select
            className="input input-bordered w-full text-black"
            value={fontStyle}
            onChange={handleFontStyleChange}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="bold">Bold</option>
            <option value="bold italic">Bold Italic</option>
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-white">텍스트 색상</span>
          </div>
          <input
            type="color"
            className="input input-bordered w-full text-black"
            value={fontColor}
            onChange={handleFontColorChange}
          />
        </label>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-between items-center">
          <p className="text-base text-white">이미지 선택</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn text-white rounded glass bg-glass text-sm bg-[#2196F3] bg-opacity-80 hover:bg-opacity-100 hover:bg-[#2196F3]"
          >
            파일 선택
          </button>
        </div>
        <div className="flex flex-row w-full justify-between overflow-x-auto">
          {sampleImages.map((image, i) => (
            <img
              src={image}
              alt={image}
              key={i}
              className="size-36 rounded shadow-lg"
              onClick={() => handleSampleImageClick(image)}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          onClick={downloadImage}
          className="w-full btn p-2 text-white rounded glass bg-[#2196F3] bg-opacity-80 hover:bg-opacity-100 hover:bg-[#2196F3]"
        >
          이미지 저장
        </button>
      </div>
    </div>
  );
};

export default ImageGenerator;
