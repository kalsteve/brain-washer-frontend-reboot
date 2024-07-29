import { useEffect, useRef } from "react";

interface DialType {
  container: HTMLElement;
  size: number;
  strokeWidth: number;
  radius: number;
  value: number;
  direction: string;
  svg: SVGSVGElement | null;
  defs: SVGDefsElement | null;
  slice: SVGPathElement | null;
  overlay: SVGCircleElement | null;
  text: SVGTextElement | null;
  arrow: SVGPathElement | null;
  create(): void;
  createSvg(): void;
  createDefs(): void;
  createSlice(): void;
  createOverlay(): void;
  createText(): void;
  createArrow(): void;
  animateStart(): void;
  animateReset(): void;
  polarToCartesian(
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ): { x: number; y: number };
  describeArc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ): string;
  setValue(value: number): void;
}

const Dial = function (
  this: DialType,
  container: HTMLElement,
  size: number,
  value: number,
  direction: string,
) {
  this.container = container;
  this.size = size;
  this.strokeWidth = this.size / 8;
  this.radius = this.size / 2 - this.strokeWidth / 2;
  this.value = value;
  this.direction = direction;
  this.svg = null;
  this.defs = null;
  this.slice = null;
  this.overlay = null;
  this.text = null;
  this.arrow = null;
  this.create();
};

Dial.prototype.create = function () {
  this.createSvg();
  this.createDefs();
  this.createSlice();
  this.createOverlay();
  this.createText();
  this.createArrow();
  this.container.appendChild(this.svg);
};

Dial.prototype.createSvg = function () {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", this.size + "px");
  svg.setAttribute("height", this.size + "px");
  this.svg = svg;
};

Dial.prototype.createDefs = function () {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const linearGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  linearGradient.setAttribute("id", "gradient");
  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("stop-color", "#6E4AE2");
  stop1.setAttribute("offset", "0%");
  linearGradient.appendChild(stop1);
  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("stop-color", "#78F8EC");
  stop2.setAttribute("offset", "100%");
  linearGradient.appendChild(stop2);
  const linearGradientBackground = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  linearGradientBackground.setAttribute("id", "gradient-background");
  const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop3.setAttribute("stop-color", "rgba(0, 0, 0, 0.2)");
  stop3.setAttribute("offset", "0%");
  linearGradientBackground.appendChild(stop3);
  const stop4 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop4.setAttribute("stop-color", "rgba(0, 0, 0, 0.05)");
  stop4.setAttribute("offset", "100%");
  linearGradientBackground.appendChild(stop4);
  defs.appendChild(linearGradient);
  defs.appendChild(linearGradientBackground);
  this.svg.appendChild(defs);
  this.defs = defs;
};

Dial.prototype.createSlice = function () {
  const slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
  slice.setAttribute("fill", "none");
  slice.setAttribute("stroke", "url(#gradient)");
  slice.setAttribute("stroke-width", this.strokeWidth);
  slice.setAttribute("stroke-linecap", "round"); // 둥근 끝부분 추가
  slice.setAttribute(
    "transform",
    "translate(" + this.strokeWidth / 2 + "," + this.strokeWidth / 2 + ")",
  );
  slice.setAttribute("class", "animate-draw");
  this.svg.appendChild(slice);
  this.slice = slice;
};

Dial.prototype.createOverlay = function () {
  const r = this.size - this.size / 2 - this.strokeWidth / 2;
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle",
  );
  circle.setAttribute("cx", (this.size / 2).toString());
  circle.setAttribute("cy", (this.size / 2).toString());
  circle.setAttribute("r", r.toString());
  circle.setAttribute("fill", "url(#gradient-background)");
  this.svg.appendChild(circle);
  this.overlay = circle;
};

Dial.prototype.createText = function () {
  const fontSize = this.size / 3.5;
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

  text.setAttribute("x", (this.size / 2).toString());
  text.setAttribute("y", (this.size / 2 + fontSize / 4).toString());
  text.setAttribute("font-family", "sans-serif");
  text.setAttribute("font-size", fontSize.toString());
  text.setAttribute("fill", "#78F8EC");
  text.setAttribute("text-anchor", "middle");
  text.innerHTML = 0 + "%";
  this.svg.appendChild(text);
  this.text = text;
};

Dial.prototype.createArrow = function () {
  const arrowSize = this.size / 10;
  let arrowYOffset: number = 0;
  let m: number = 1;

  if (this.direction === "up") {
    arrowYOffset = arrowSize / 2;
    m = -1;
  } else if (this.direction === "down") {
    arrowYOffset = 0;
    m = 1;
  }
  const arrowPosX = this.size / 2 - arrowSize / 2;
  const arrowPosY = this.size - this.size / 3 + arrowYOffset;
  const arrowDOffset = m * (arrowSize / 1.5);
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrow.setAttribute(
    "d",
    "M 0 0 " +
      arrowSize +
      " 0 " +
      arrowSize / 2 +
      " " +
      arrowDOffset +
      " 0 0 Z",
  );
  arrow.setAttribute("fill", "#97F8F0");
  arrow.setAttribute("opacity", "0.6");
  arrow.setAttribute(
    "transform",
    "translate(" + arrowPosX + "," + arrowPosY + ")",
  );
  this.svg.appendChild(arrow);
  this.arrow = arrow;
};

Dial.prototype.animateStart = function () {
  let v = 0;
  const intervalOne = setInterval(() => {
    const p = +(v / this.value).toFixed(2);
    const a = p < 0.95 ? 2 - 2 * p : 0.05;
    v += a;
    // Stop
    if (v >= +this.value) {
      v = this.value;
      clearInterval(intervalOne);
    }
    this.setValue(v);
  }, 10);
};

Dial.prototype.animateReset = function () {
  this.setValue(0);
};

Dial.prototype.polarToCartesian = function (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

Dial.prototype.describeArc = function (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = this.polarToCartesian(x, y, radius, endAngle);
  const end = this.polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return d;
};

Dial.prototype.setValue = function (value: number) {
  let c = (value / 100) * 180;
  if (c === 360) c = 359.99;
  const xy = this.size / 2 - this.strokeWidth / 2;
  const d = this.describeArc(xy, xy, xy, 180, 180 + c);
  this.slice.setAttribute("d", d);
  this.text.innerHTML = Math.floor(value) + "%";
};

const SpicyDial = ({ data }: { data: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear existing SVG if any
      containerRef.current.innerHTML = "";

      const dial = new (Dial as any)(
        containerRef.current,
        containerRef.current.clientWidth,
        data,
        "up",
      );
      dial.animateStart();
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <p className="absolute inset-6 text-lg xl:text-xl 2xl:text-2xl text-gray-50">
        매운맛 지수
      </p>
      <div
        className="w-fit sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto chart"
        ref={containerRef}
      ></div>
    </div>
  );
};

export default SpicyDial;
