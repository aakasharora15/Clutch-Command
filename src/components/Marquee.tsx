import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: string;
  bgColor?: string;
  textColor?: string;
}

export default function Marquee({ 
  text, 
  speed = '20s', 
  bgColor = 'var(--lime)', 
  textColor = '#111' 
}: MarqueeProps) {
  // We duplicate the text multiple times so it fills the screen and scrolls seamlessly
  const repeatCount = 8;
  const content = Array(repeatCount).fill(text).join(' \u00A0\u00A0\u2022\u00A0\u00A0 ');

  return (
    <div className="marquee-container" style={{ background: bgColor, color: textColor }}>
      <div className="marquee-content" style={{ animationDuration: speed }}>
        {content}
      </div>
      <div className="marquee-content" style={{ animationDuration: speed }} aria-hidden="true">
        {content}
      </div>
    </div>
  );
}
