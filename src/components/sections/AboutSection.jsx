import React from 'react';
import { User, Shield, Zap, Sparkles, Trophy, Award } from 'lucide-react';
import { characterData } from '../../data/characterData';
import { useRpg } from '../../context/RpgContext';
import HoloCard from '../ui/HoloCard';
import StatBar from '../ui/StatBar';

export default function AboutSection() {
  const { level } = useRpg();
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="border-b border-[#272938] pb-5 space-y-1">
        <div className="text-xs font-mono text-[#00FF88] flex items-center gap-1.5 uppercase">
          <User className="w-4 h-4 text-[#00FF88]" />
          <span>FICHA TÁCTICA // CHARACTER SHEET</span>
        </div>
        <h1 className="font-retro text-2xl sm:text-3xl text-[#E6EDF3]">
          PERFIL DEL <span className="text-[#00FF88] text-glow-mana">HÉROE</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Holographic Collector Card (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <HoloCard
            glowColor="magic"
            className="w-full max-w-sm p-6 space-y-5 text-center cursor-pointer shadow-2xl border-2 border-[#FF007F]/40"
          >
            {/* Holographic Header */}
            <div className="flex justify-between items-center text-[10px] font-mono text-[#FF007F] border-b border-[#272938] pb-2">
              <span>SPECIAL EDITION CARD</span>
              <span className="font-retro">LVL {level}</span>
            </div>

            {/* Avatar Frame */}
            <div className="relative mx-auto w-36 h-36 border-2 border-[#00FF88] p-1 bg-[#0A0A0F] shadow-[0_0_20px_rgba(0,255,136,0.3)]">
              <img
                src={characterData.avatarUrl}
                alt={characterData.name}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#FF007F] text-white text-[9px] font-retro uppercase">
                {characterData.classBadge.split('//')[0]}
              </span>
            </div>

            {/* Character Info */}
            <div className="space-y-1">
              <h2 className="font-retro text-base text-[#E6EDF3]">
                {characterData.name}
              </h2>
              <div className="text-xs text-[#00D4FF] font-mono font-semibold">
                {characterData.roleTitle}
              </div>
            </div>

            {/* Vitals in Card */}
            <div className="space-y-2 pt-2 text-left font-mono">
              <StatBar
                label="HP (Salud de Código)"
                current={characterData.stats.hp.current}
                max={characterData.stats.hp.max}
                color="rpg-hp"
                size="sm"
              />
              <StatBar
                label="MP (Maná Creativo)"
                current={characterData.stats.mp.current}
                max={characterData.stats.mp.max}
                color="rpg-magic"
                size="sm"
              />
            </div>
          </HoloCard>
        </div>

        {/* Right Column: D&D Combat Attributes & Perks (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Attributes Matrix */}
          <div className="bg-[#12121A] border border-[#272938] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#272938] pb-2 text-xs font-mono">
              <span className="text-[#00D4FF] font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#00FF88]" /> ATRIBUTOS D&D (BASE 100)
              </span>
              <span className="text-[#8B949E]">STATUS: OPTIMIZADO</span>
            </div>

            <div className="space-y-3.5">
              {characterData.attributes.map((attr, idx) => (
                <div key={idx} className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#E6EDF3] font-semibold">
                      [{attr.key}] {attr.name}
                    </span>
                    <span className="text-[#00FF88] font-bold">
                      {attr.value}/100 ({attr.tier})
                    </span>
                  </div>
                  <StatBar
                    current={attr.value}
                    max={100}
                    color={idx % 2 === 0 ? 'rpg-mana' : 'rpg-ember'}
                    size="sm"
                    showValues={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Perks Grid */}
          <div className="space-y-3">
            <h3 className="font-retro text-xs text-[#FFD700] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFD700]" /> CONDECORACIONES OBTENIDAS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              {characterData.perks.map((perk, i) => (
                <div key={i} className="p-3 bg-[#12121A] border border-[#272938] flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-[#00FF88] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-[#E6EDF3] font-bold">{perk.title}</div>
                    <div className="text-[11px] text-[#8B949E] mt-0.5">{perk.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
