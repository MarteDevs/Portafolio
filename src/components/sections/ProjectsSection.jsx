import React, { useState, useMemo } from 'react';
import { Swords, Sparkles, ExternalLink, Github, Eye } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import RetroButton from '../ui/RetroButton';
import HoloCard from '../ui/HoloCard';
import QuestModal from '../ui/QuestModal';
import { useAudio } from '../../context/AudioContext';

export default function ProjectsSection() {
  const { projects, loading, source } = useProjects();
  const { playClick, playHover } = useAudio();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category).filter(Boolean));
    return ['ALL', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchFeatured = !onlyFeatured || p.featured;
      return matchCat && matchFeatured;
    });
  }, [projects, selectedCategory, onlyFeatured]);

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 min-h-[calc(100vh-140px)]">
      {/* Visual Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#272938] pb-5">
        <div className="space-y-1">
          <div className="text-xs font-mono text-[#00D4FF] flex items-center gap-1.5 uppercase">
            <Swords className="w-4 h-4 text-[#00FF88]" />
            <span>TABLÓN DE MISIONES // QUEST BOARD</span>
          </div>
          <h1 className="font-retro text-2xl sm:text-3xl text-[#E6EDF3]">
            PROYECTOS & <span className="text-[#00FF88] text-glow-mana">ARTEFACTOS</span>
          </h1>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 text-xs font-mono border transition-all ${
                selectedCategory === cat
                  ? 'border-[#00FF88] text-[#00FF88] bg-[#00FF88]/10 shadow-[0_0_10px_rgba(0,255,136,0.3)]'
                  : 'border-[#272938] text-[#8B949E] hover:text-[#E6EDF3]'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => {
              playClick();
              setOnlyFeatured(!onlyFeatured);
            }}
            className={`px-3 py-1 text-xs font-mono border flex items-center gap-1.5 transition-all ${
              onlyFeatured
                ? 'border-[#FFD700] text-[#FFD700] bg-[#FFD700]/10'
                : 'border-[#272938] text-[#8B949E] hover:text-[#FFD700]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#FFD700]" />
            Legendarios
          </button>
        </div>
      </div>

      {/* Grid of 3D Tilt Cards */}
      {loading ? (
        <div className="py-20 text-center font-mono text-xs text-[#00FF88] space-y-3">
          <div className="animate-spin w-6 h-6 border-2 border-[#00FF88] border-t-transparent mx-auto rounded-full" />
          <p>Conjurando misiones...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((quest) => (
            <HoloCard
              key={quest.id}
              glowColor={quest.featured ? 'gold' : 'mana'}
              onMouseEnter={playHover}
              className="h-full group cursor-pointer"
            >
              {/* Image & Rank Badge */}
              <div className="relative h-44 w-full bg-[#0A0A0F] overflow-hidden border-b border-[#272938]">
                <img
                  src={quest.imageUrl}
                  alt={quest.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-[#0A0A0F]/90 border border-[#FF5E00] text-[#FF5E00] text-[10px] font-mono">
                    {quest.difficultyRank || 'A-Rank'}
                  </span>
                  {quest.featured && (
                    <span className="px-2 py-0.5 bg-[#0A0A0F]/90 border border-[#FFD700] text-[#FFD700] text-[10px] font-mono flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> S-TIER
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#0A0A0F]/90 text-[#8B949E] text-[10px] font-mono border border-[#272938]">
                  {quest.year}
                </div>
              </div>

              {/* Concise Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider mb-1">
                    {quest.category}
                  </div>
                  <h3 className="font-retro text-sm text-[#E6EDF3] group-hover:text-[#00FF88] transition-colors truncate">
                    {quest.title}
                  </h3>
                  <p className="text-xs text-[#8B949E] font-mono line-clamp-2 mt-1">
                    {quest.tagline || quest.summary}
                  </p>
                </div>

                {/* Tech Runes */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quest.technologies?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 bg-[#161622] border border-[#272938] text-[#E6EDF3] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {quest.technologies?.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-[#8B949E] font-mono">
                      +{quest.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-[#1A1C28]">
                  <RetroButton
                    variant="mana"
                    size="sm"
                    icon={Eye}
                    onClick={() => {
                      playClick();
                      setSelectedQuest(quest);
                    }}
                  >
                    Detalles
                  </RetroButton>

                  <div className="flex items-center gap-2">
                    {quest.githubUrl && (
                      <a
                        href={quest.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 border border-[#272938] text-[#8B949E] hover:text-[#00FF88] hover:border-[#00FF88] transition-colors"
                        title="Código"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {quest.demoUrl && (
                      <a
                        href={quest.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 border border-[#272938] text-[#8B949E] hover:text-[#00D4FF] hover:border-[#00D4FF] transition-colors"
                        title="Portal"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </HoloCard>
          ))}
        </div>
      )}

      {/* Quest Modal */}
      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </section>
  );
}
