import { useState, useRef } from "react";
import gsap from "gsap";
import "../styles/test.css";

const images = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1543357530-d91dab30fa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
];

const Test = () => {
  const [clickedStates, setClickedStates] = useState(
    Array(images.length).fill(false)
  );
  const itemsRef = useRef(new Array(images.length));

  const expand = (index: number) => {
    const newStates = clickedStates.map((state, i) =>
      i === index ? !state : false
    );
    setClickedStates(newStates);

    itemsRef.current.forEach((item, idx) => {
      if (idx === index) {
        gsap.to(item, {
          width: newStates[index] ? "35vw" : "8vw",
          duration: 1.5,
          ease: "elastic(1, .3)",
        });
      } else {
        gsap.to(item, {
          width: "8vw",
          duration: 1.5,
          ease: "elastic(1, .3)",
        });
      }
    });
  };

  return (
    <div className="group">
      {images.map((url, index) => (
        <div
          key={index}
          className="item"
          ref={(el) => (itemsRef.current[index] = el)}
          style={{
            backgroundImage: `url(${url})`,
            width: clickedStates[index] ? "35vw" : "8vw",
            cursor: "pointer",
          }}
          onClick={() => expand(index)}
        />
      ))}
    </div>
  );
};

export default Test;
