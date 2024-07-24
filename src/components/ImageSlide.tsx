import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ImageSlide.css";

gsap.registerPlugin(ScrollTrigger);

const ImageSlide = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const images = wrapper.querySelectorAll<HTMLImageElement>(
      ".image-slide-images img",
    );

    images.forEach((img) => {
      gsap.fromTo(
        img,
        { y: 0 },
        {
          y: (_i, target) =>
            -ScrollTrigger.maxScroll(window) * target.dataset.speed,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top center",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    const clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

    gsap.to(images, {
      skewY: 0,
      scrollTrigger: {
        trigger: wrapper,
        start: "top center",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skew = clamp(velocity / -50);
          images.forEach((img) =>
            gsap.to(img, { skewY: skew, overwrite: "auto" }),
          );
        },
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="image-slide-wrapper" ref={wrapperRef}>
      <div className="image-slide-content">
        <h1 className="image-slide-text">재미있는 이미지를 생성해보세요</h1>
        <h1
          aria-hidden="true"
          className="image-slide-text image-slide-outline-text"
        >
          재미있는 이미지를 생성해보세요
        </h1>
        <h1
          aria-hidden="true"
          className="image-slide-text image-slide-filter-text"
        >
          재미있는 이미지를 생성해보세요
        </h1>

        <section className="image-slide-images">
          <img
            data-speed="0.8"
            src="https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="0.9"
            src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="1"
            src="https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="1.1"
            src="https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="0.9"
            src="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="1.2"
            src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="0.8"
            src="https://images.unsplash.com/photo-1588007375246-3ee823ef4851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="image-slide-img"
          />
          <img
            data-speed="1"
            src="https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            alt=""
            className="image-slide-img"
          />
        </section>
      </div>
    </div>
  );
};

export default ImageSlide;
