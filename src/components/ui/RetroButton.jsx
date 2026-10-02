import React from 'react';
import { useAudio } from '../../context/AudioContext';

export default function RetroButton({
  children,
  onClick,
  variant = 'mana', // mana | ember | magic | ghost | neutral
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  icon: Icon,
  ...props
}) {
  const { playClick, playHover } = useAudio();

  const handleMouseEnter = () => {
    if (!disabled) playHover();
  };

  const handleClick = (e) => {
    if (!disabled) {
      playClick();
      if (onClick) onClick(e);
    }
  };

  const variantStyles = {
    mana: 'border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-[#0A0A0F] hover:shadow-[0_0_15px_rgba(0,255,136,0.6)]',
    ember: 'border-[#FF5E00] text-[#FF5E00] hover:bg-[#FF5E00] hover:text-[#0A0A0F] hover:shadow-[0_0_15px_rgba(255,94,0,0.6)]',
    magic: 'border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F] hover:text-[#0A0A0F] hover:shadow-[0_0_15px_rgba(255,0,127,0.6)]',
    xp: 'border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#0A0A0F] hover:shadow-[0_0_15px_rgba(0,212,255,0.6)]',
    neutral: 'border-[#272938] text-[#E6EDF3] hover:border-[#00FF88] hover:text-[#00FF88]',
    ghost: 'border-transparent text-[#8B949E] hover:text-[#00FF88] hover:bg-[#12121A]',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center font-mono uppercase tracking-wider
        border transition-all duration-150 active:translate-y-[1px]
        disabled:opacity-40 disabled:pointer-events-none
        ${variantStyles[variant] || variantStyles.mana}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}
