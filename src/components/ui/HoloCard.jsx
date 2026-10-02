import React, { useRef, useState } from 'react';

export default function HoloCard({ 
  children, 
  className = '', 
  glowColor = 'mana', // mana | ember | magic | xp | gold
  onMouseEnter,
  onClick
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const glowStyles = {
    mana: 'hover:border-[#00FF88] hover:shadow-[0_0_25px_rgba(0,255,136,0.3)]',
    ember: 'hover:border-[#FF5E00] hover:shadow-[0_0_25px_rgba(255,94,0,0.3)]',
    magic: 'hover:border-[#FF007F] hover:shadow-[0_0_25px_rgba(255,0,127,0.3)]',
    xp: 'hover:border-[#00D4FF] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)]',
    gold: 'hover:border-[#FFD700] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]',
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt max 12 deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`
        relative bg-[#12121A] border border-[#272938] overflow-hidden
        transition-shadow duration-300
        ${glowStyles[glowColor] || glowStyles.mana}
        ${className}
      `}
    >
      {/* Dynamic Holographic Sheen Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      />

      {/* Retro Corner Accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00FF88] z-10" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00FF88] z-10" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00FF88] z-10" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00FF88] z-10" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
