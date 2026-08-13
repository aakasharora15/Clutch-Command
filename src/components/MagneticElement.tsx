"use client";
import React, { useRef, useState } from "react";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticElement({ children, className = "", strength = 20 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = Math.floor((clientX - centerX) * (strength / 100));
    const deltaY = Math.floor((clientY - centerY) * (strength / 100));
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.5s ease" : "transform 0.1s ease-out",
        display: "inline-block"
      }}
    >
      {children}
    </div>
  );
}
