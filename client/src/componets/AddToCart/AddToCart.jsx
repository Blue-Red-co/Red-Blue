import React, { useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import "./AddToCart.css";
import axios from "axios";

gsap.registerPlugin(MorphSVGPlugin);

const AddToCart = () => {
  const buttonRef = useRef(null);

  const handleClick = async (e) => {
    e.stopPropagation()
    e.preventDefault();
    const button = buttonRef.current;
    if (button.classList.contains("active")) return;
    button.classList.add("active");

    // Animate initial visual feedback (e.g. button press)
    gsap.to(button, { "--background-scale": 0.97, duration: 0.15 });

    try {
      // Replace with your actual API endpoint and payload
      const response = await axios.get('/user/getpassword',
        {
        param: "111" 
    }
      ) 
      const data = await response.json();
      console.log("API response:", data);
      // You can check response.ok or data.status to ensure success
      // For now, treat success and error similarly
    } catch (error) {
      console.error("API call failed: ", error);
    }

    // At this point the API call is complete.
    // Now run the full animation timeline.

    // 1. Background and initial feedback animation
    gsap.to(button, {
      keyframes: [
        { "--background-scale": 0.97, duration: 0.15 },
        {
          "--background-scale": 1,
          delay: 0.125,
          duration: 1.2,
          ease: "elastic.out(1, .6)",
        },
      ],
    });

    // 2. T‑shirt pop-up animation
    gsap.to(button, {
      keyframes: [
        {
          "--shirt-scale": 1,
          "--shirt-y": "-42px",
          "--cart-x": "0px",
          "--cart-scale": 1,
          duration: 0.4,
          ease: "power1.in",
        },
        { "--shirt-y": "-40px", duration: 0.3 },
        {
          "--shirt-y": "16px",
          "--shirt-scale": 0.9,
          duration: 0.25,
          ease: "none",
        },
        { "--shirt-scale": 0, duration: 0.3, ease: "none" },
      ],
    });

    // 3. Secondary shirt adjustment (if applicable)
    gsap.to(button, {
      "--shirt-second-y": "0px",
      delay: 0.835,
      duration: 0.12,
    });

    // 4. Cart animations—with an extra delay for the tick mark
    gsap.to(button, {
      keyframes: [
        {
          "--cart-clip": "12px",
          "--cart-clip-x": "3px",
          delay: 0.9,
          duration: 0.06,
        },
        { "--cart-y": "2px", duration: 0.1 },
        {
          // Delay here ensures the tick appears a bit later for confirmation
          "--cart-tick-offset": "0px",
          "--cart-y": "0px",
          delay: 0.3,
          duration: 0.2,
          onComplete() {
            button.style.overflow = "hidden";
          },
        },
        {
          "--cart-x": "52px",
          "--cart-rotate": "-15deg",
          duration: 0.2,
        },
        {
          "--cart-x": "104px",
          "--cart-rotate": "0deg",
          duration: 0.2,
          clearProps: true,
          onComplete() {
            button.style.overflow = "hidden";
            button.style.setProperty("--text-o", 0);
            button.style.setProperty("--text-x", "0px");
            button.style.setProperty("--cart-x", "-104px");
          },
        },
        {
          "--text-o": 1,
          "--text-x": "12px",
          "--cart-x": "-48px",
          "--cart-scale": 0.75,
          duration: 0.25,
          clearProps: true,
          onComplete() {
            button.classList.remove("active");
          },
        },
      ],
    });

    gsap.to(button, {
      keyframes: [{ "--text-o": 0, duration: 0.3 }],
    });

    // 5. Morph shape animation (background decoration)
    const morph = button.querySelector(".morph path");
    gsap.to(morph, {
      keyframes: [
        {
          morphSVG:
            "M0 12C6 12 20 10 32 0C43.9024 10 58 12 64 12V13H0V12Z",
          duration: 0.25,
          ease: "power1.out",
        },
        {
          morphSVG:
            "M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z",
          duration: 0.15,
          ease: "none",
        },
      ],
    });

    // 6. Shirt SVG paths animation
    const shirtPaths = button.querySelectorAll(".shirt svg > path");
    gsap.to(shirtPaths, {
      keyframes: [
        {
          morphSVG:
            "M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L18 22.5C18 22.5 14 21.5 12 21.5C10 21.5 5.99997 22.5 5.99997 22.5L4.99997 9.5L3.5 11L0.5 8L4.99997 3Z",
          duration: 0.25,
          delay: 0.25,
        },
        {
          morphSVG:
            "M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L23.5 8L20.5 11L19 9.5L18.5 22.5C18.5 22.5 13.5 22.5 12 22.5C10.5 22.5 5.5 22.5 5.5 22.5L4.99997 9.5L3.5 11L0.5 8L4.99997 3Z",
          duration: 0.85,
          ease: "elastic.out(1, .5)",
        },
        {
          morphSVG:
            "M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z",
          duration: 0,
          delay: 1.25,
        },
      ],
    });
  };

  return (
    // <div className="add-to-cart-wrapper">
      <button className="add-to-cart" ref={buttonRef} onClick={handleClick}>
        <span>Add to cart</span>
        <svg className="morph" viewBox="0 0 64 13">
          <path d="M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z" />
        </svg>
        <div className="shirt">
          <svg className="first" viewBox="0 0 24 24">
            <path d="M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z" />
          </svg>
          <svg className="second" viewBox="0 0 24 24">
            <path d="M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z" />
          </svg>
        </div>
        <div className="cart">
          <svg viewBox="0 0 36 26">
            <path className="shape" d="M1 2.5H6L10 18.5H25.5L28.5 7.5H7.5" />
            <path
              className="wheel"
              d="M11.5 25C12.6046 25 13.5 24.1046 13.5 23C13.5 21.8954 12.6046 21 11.5 21C10.3954 21 9.5 21.8954 9.5 23C9.5 24.1046 10.3954 25 11.5 25Z"
            />
            <path
              className="wheel"
              d="M24 25C25.1046 25 26 24.1046 26 23C26 21.8954 25.1046 21 24 21C22.8954 21 22 21.8954 22 23C22 24.1046 22.8954 25 24 25Z"
            />
            <path className="tick" d="M14.5 13.5L16.5 15.5L21.5 10.5" />
          </svg>
        </div>
      </button>
    // </div>
  );
};

export default AddToCart;
