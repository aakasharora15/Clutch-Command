"use client";
import React, { useState } from 'react';

const images = [
  "/bento_player_backhand_1783528140582.jpg",
  "/media__1783528047317.jpg",
  "/bento_player_celebrate_1783528150116.jpg",
  "/media__1783528039061.png",
  "/hero_tennis_court_1783528122643.jpg"
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(2);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const getPositionClass = (idx: number) => {
    const diff = (idx - currentIndex + images.length) % images.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'right-outer';
    if (diff === images.length - 1) return 'left';
    if (diff === images.length - 2) return 'left-outer';
    return 'hidden';
  };

  return (
    <>
      <div className="carousel-3d-container">
        {images.map((src, i) => (
          <div 
            key={i} 
            className={`carousel-3d-card ${getPositionClass(i)}`} 
            style={{ backgroundImage: `url('${src}')` }}
          ></div>
        ))}
      </div>
      <div className="carousel-nav">
        <button className="carousel-nav-btn" onClick={prev}>&larr;</button>
        <button className="carousel-nav-btn active" onClick={next}>&rarr;</button>
      </div>
    </>
  );
}
