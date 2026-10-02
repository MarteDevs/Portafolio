import React from 'react';
import { Sparkles, Code, FileCode, Palette, Globe, Server, Workflow, Database, Layers, Terminal, GitBranch, Box, Cloud, Cpu, ShieldAlert, Zap } from 'lucide-react';
import { skillsCategories } from '../../data/skillsData';
import HoloCard from '../ui/HoloCard';
import StatBar from '../ui/StatBar';

const iconMap = {
  Code,
  FileCode,
  Palette,
  Globe,
  Server,
  Workflow,
  Database,
  Layers,
  Terminal,
  GitBranch,
  Box,
  Cloud,
  Cpu,
  Sparkles
};

export default function SkillsSection() {
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="border-b border-[#272938] pb-5 space-y-1">
        <div className="text-xs font-mono text-[#FF007F] flex items-center gap-1.5 uppercase">
          <Sparkles className="w-4 h-4 text-[#FF007F]" />
          <span>ÁRBOL DE TALENTOS // SKILL TREE</span>
        </div>
        <h1 className="font-retro text-2xl sm:text-3xl text-[#E6EDF3]">
          MAESTRÍAS & <span className="text-[#FF007F] text-glow-magic">RUNAS</span>
        </h1>
      </div>

      {/* 3 Columns of Categories with HoloCards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skillsCategories.map((category) => (
          <HoloCard
            key={category.id}
            glowColor="mana"
            className="p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#272938] pb-3 mb-4">
                <h3 className="font-retro text-xs text-[#00FF88] tracking-wider">
                  {category.title}
                </h3>
                <span className="text-[10px] font-mono border border-[#00FF88]/40 px-1.5 py-0.5 text-[#00FF88]">
                  DESBLOQUEADO
                </span>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, idx) => {
                  const IconComp = iconMap[skill.icon] || Sparkles;
                  return (
                    <div key={idx} className="space-y-1 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#E6EDF3]">
                          <IconComp className="w-3.5 h-3.5 text-[#00FF88]" />
                          <span className="font-semibold">{skill.name}</span>
                        </div>
                        <span className="text-[10px] text-[#FFD700] px-1 border border-[#272938]">
                          {skill.tier}
                        </span>
                      </div>
                      <StatBar
                        current={skill.level}
                        max={100}
                        color={
                          skill.level >= 95 ? 'rpg-gold' :
                          skill.level >= 90 ? 'rpg-mana' :
                          skill.level >= 85 ? 'rpg-xp' : 'rpg-ember'
                        }
                        size="sm"
                        showValues={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </HoloCard>
        ))}
      </div>

      {/* Passive Perks Strip */}
      <div className="bg-[#12121A] border border-[#272938] p-4 font-mono">
        <div className="flex items-center gap-2 text-xs text-[#00D4FF] font-bold mb-3">
          <Zap className="w-4 h-4 text-[#FFD700]" /> HABILIDADES PASIVAS EQUIPADAS:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 bg-[#0A0A0F] border border-[#272938]">
            <span className="text-[#00FF88] font-bold">⚡ Clean Code:</span>
            <span className="text-[#8B949E] text-[11px] block mt-0.5">Arquitectura escalable sin deuda técnica</span>
          </div>
          <div className="p-2.5 bg-[#0A0A0F] border border-[#272938]">
            <span className="text-[#FF5E00] font-bold">🔥 60 FPS Engine:</span>
            <span className="text-[#8B949E] text-[11px] block mt-0.5">Renderizado fluido y UX sin lag</span>
          </div>
          <div className="p-2.5 bg-[#0A0A0F] border border-[#272938]">
            <span className="text-[#00D4FF] font-bold">🛡️ Test Shield:</span>
            <span className="text-[#8B949E] text-[11px] block mt-0.5">Resiliencia y cobertura defensiva</span>
          </div>
          <div className="p-2.5 bg-[#0A0A0F] border border-[#272938]">
            <span className="text-[#FF007F] font-bold">🌐 CI/CD Teleport:</span>
            <span className="text-[#8B949E] text-[11px] block mt-0.5">Despliegues automáticos a producción</span>
          </div>
        </div>
      </div>
    </section>
  );
}
