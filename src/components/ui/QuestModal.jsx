import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import RetroButton from './RetroButton';
import { useAudio } from '../../context/AudioContext';

export default function QuestModal({ quest, onClose }) {
  const { playClick } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!quest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#12121A] border-2 border-[#00FF88] shadow-[0_0_30px_rgba(0,255,136,0.3)] p-6 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <div className="flex items-center justify-between border-b border-[#272938] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00FF88]" />
            <span className="font-retro text-xs text-[#00FF88]">
              QUEST ID: {quest.id}
            </span>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="text-[#8B949E] hover:text-[#FF2A4D] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] px-2 py-0.5 border border-[#FF5E00] text-[#FF5E00] font-mono">
                {quest.difficultyRank || 'A-Rank'}
              </span>
              <span className="text-[10px] px-2 py-0.5 border border-[#00D4FF] text-[#00D4FF] font-mono">
                {quest.category}
              </span>
            </div>
            <h2 className="font-retro text-base sm:text-lg text-[#E6EDF3]">
              {quest.title}
            </h2>
          </div>

          {/* Preview Image */}
          {quest.imageUrl && (
            <div className="border border-[#272938] overflow-hidden h-44 bg-[#0A0A0F]">
              <img
                src={quest.imageUrl}
                alt={quest.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Key Bullet Highlights (No dense paragraphs) */}
          <div className="space-y-2 bg-[#0A0A0F] border border-[#272938] p-3.5 font-mono text-xs">
            <div className="text-[#00FF88] font-bold text-[11px] mb-1">
              LOGROS CLAVE DE LA MISIÓN:
            </div>
            {quest.highlights ? (
              quest.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#E6EDF3]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p className="text-[#8B949E]">{quest.summary || quest.description}</p>
            )}
          </div>

          {/* Tech Runes */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-[#8B949E] uppercase">Runas Equipadas:</div>
            <div className="flex flex-wrap gap-1.5">
              {quest.technologies?.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 bg-[#161622] border border-[#272938] text-[#E6EDF3] font-mono"
                >
                  ⚡ {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#272938]">
            {quest.githubUrl && (
              <a href={quest.githubUrl} target="_blank" rel="noopener noreferrer">
                <RetroButton variant="neutral" size="sm" icon={Github}>
                  Código
                </RetroButton>
              </a>
            )}
            {quest.demoUrl && (
              <a href={quest.demoUrl} target="_blank" rel="noopener noreferrer">
                <RetroButton variant="mana" size="sm" icon={ExternalLink}>
                  Ver Demo
                </RetroButton>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
