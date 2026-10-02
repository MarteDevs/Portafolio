import React from 'react';

export default function StatBar({ 
  label, 
  current, 
  max, 
  color = 'rpg-mana', 
  showValues = true, 
  size = 'md',
  className = '' 
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / max) * 100)));

  const colorVariants = {
    'rpg-hp': 'bg-[#FF2A4D] shadow-[0_0_10px_rgba(255,42,77,0.5)]',
    'rpg-mana': 'bg-[#00FF88] shadow-[0_0_10px_rgba(0,255,136,0.5)]',
    'rpg-xp': 'bg-[#00D4FF] shadow-[0_0_10px_rgba(0,212,255,0.5)]',
    'rpg-ember': 'bg-[#FF5E00] shadow-[0_0_10px_rgba(255,94,0,0.5)]',
    'rpg-magic': 'bg-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.5)]',
    'rpg-gold': 'bg-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]',
  };

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5',
  };

  const activeColor = colorVariants[color] || colorVariants['rpg-mana'];

  return (
    <div className={`w-full font-mono text-xs ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1 text-[#E6EDF3]">
          <span className="font-semibold tracking-wider">{label}</span>
          {showValues && (
            <span className="text-[#8B949E] text-[11px]">
              {current}/{max} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-[#12121A] border border-[#272938] p-[2px] ${heightClasses[size] || 'h-3.5'}`}>
        <div
          className={`h-full transition-all duration-500 ease-out ${activeColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
