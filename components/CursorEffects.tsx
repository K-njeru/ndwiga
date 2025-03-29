"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorEffects() {
  const cursorSize = 24; // Prominent but balanced
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Smooth mouse movement
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  // Hover state for interactivity
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX - cursorSize / 2);
      mouse.y.set(e.clientY - cursorSize / 2);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-hover]"));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouse.x, mouse.y]);

  return (
    <>
      {/* Core Cursor - Blue-400 Neon Pulse */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full mix-blend-difference"
        style={{
          width: cursorSize,
          height: cursorSize,
          x: smoothMouse.x,
          y: smoothMouse.y,
          background: "radial-gradient(circle, hsl(217, 71%, 53%, 0.9) 0%, transparent 70%)",
          boxShadow: "0 0 12px hsl(217, 71%, 53%)",
        }}
        animate={{
          scale: isHovering ? [1.4, 1.6, 1.4] : [1, 1.2, 1],
          opacity: [0.9, 0.7, 0.9],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner Ripple Wave - Blue-400 Tint */}
      <motion.div
        className="fixed pointer-events-none z-40 rounded-full mix-blend-screen"
        style={{
          width: cursorSize * 2,
          height: cursorSize * 2,
          x: smoothMouse.x,
          y: smoothMouse.y,
          background: "radial-gradient(circle, hsl(217, 71%, 53%, 0.4) 0%, transparent 80%)",
        }}
        animate={{
          scale: isHovering ? [1, 2.8, 1] : [1, 2.2, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: isHovering ? 0.9 : 1.6,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Outer Echo Wave - Blue-400 Faint */}
      <motion.div
        className="fixed pointer-events-none z-30 rounded-full mix-blend-screen"
        style={{
          width: cursorSize * 3,
          height: cursorSize * 3,
          x: smoothMouse.x,
          y: smoothMouse.y,
          background: "radial-gradient(circle, hsl(217, 71%, 53%, 0.2) 0%, transparent 90%)",
        }}
        animate={{
          scale: isHovering ? [1, 3.5, 1] : [1, 2.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: isHovering ? 1.2 : 2,
          repeat: Infinity,
          delay: 0.4, // Delayed for wave layering
          ease: "easeOut",
        }}
      />
    </>
  );
}