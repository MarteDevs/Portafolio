import React from 'react';

export default function AsciiCard({ 
  children, 
  title, 
  badge,
  badgeColor = 'mana',
  className = '',
  glowing = false,
  cornerStyle = 'ascii' // 'ascii' | 'clean'
}) {
  const badgeColors = {
    mana: 'text-[#00FF88] border-[#00FF88]',
    ember: 'text-[#FF5E00] border-[#FF5E00]',
    magic: 'text-[#FF007F] border-[#FF007F]',
    gold: 'text-[#FFD700] border-[#FFD700]',
    xp: 'text-[#00D4FF] border-[#00D4FF]',
  };

  return (
    <div className={`relative bg-[#12121A] border border-[#272938] p-4 transition-all duration-300 ${glowing ? 'shadow-[0_0_15px_rgba(0,255,136,0.15)] border-[#00FF88]/40' : ''} ${className}`}>
      {/* ASCII Corner Marks */}
      {cornerStyle === 'ascii' && (
        <>
          <span className="absolute -top-2.5 -left-1.5 text-xs text-[#00FF88] font-mono select-none">╔</span>
          <span className="absolute -top-2.5 -right-1.5 text-xs text-[#00FF88] font-mono select-none">╗</span>
          <span className="absolute -bottom-2.5 -left-1.5 text-xs text-[#00FF88] font-mono select-none">╚</span>
          <span className="absolute -bottom-2.5 -right-1.5 text-xs text-[#00FF88] font-mono select-none">╝</span>
        </>
      )}

      {/* Header bar if title or badge exists */}
      {(title || badge) && (
        <div className="flex items-center justify-between border-b border-[#272938] pb-2.5 mb-3.5">
          {title && (
            <div className="flex items-center gap-2">
              <span className="text-[#00FF88] font-mono text-xs select-none">▶</span>
              <h3 className="font-retro text-xs sm:text-sm text-[#E6EDF3] tracking-wide">
                {title}
              </h3>
            </div>
          )}
          {badge && (
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 border ${badgeColors[badgeColor] || badgeColors.mana}`}>
              {badge}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
