import React from 'react';
import { Github, Linkedin, Mail, Shield, Terminal, Heart } from 'lucide-react';
import { characterData } from '../../data/characterData';

export default function TerminalFooter() {
  return (
    <footer className="w-full bg-[#0A0A0F] border-t-2 border-[#272938] text-mono text-xs text-[#8B949E] py-8 px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Terminal Quest Log */}
        <div className="border border-[#272938] bg-[#12121A] p-4">
          <div className="flex items-center gap-2 text-[#00FF88] font-retro text-[10px] mb-2">
            <Terminal className="w-3.5 h-3.5" /> QUEST LOG STATUS
          </div>
          <p className="text-[11px] leading-relaxed mb-2 text-[#E6EDF3]">
            Campañas activas en constante desarrollo. Misiones completadas con arquitecturas limpias y tests unitarios.
          </p>
          <div className="text-[10px] text-[#FFD700]">
            STATUS: BUSCANDO NUEVAS MISIONES & GREMIOS
          </div>
        </div>

        {/* Guild Links */}
        <div className="border border-[#272938] bg-[#12121A] p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[#00D4FF] font-retro text-[10px] mb-2">
            <Shield className="w-3.5 h-3.5" /> ENLACES DE GREMIO
          </div>
          <div className="flex flex-wrap gap-3 my-2">
            <a
              href={characterData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#272938] text-[#E6EDF3] hover:border-[#00FF88] hover:text-[#00FF88] transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href={characterData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#272938] text-[#E6EDF3] hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a
              href={characterData.socialLinks.email}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#272938] text-[#E6EDF3] hover:border-[#FF5E00] hover:text-[#FF5E00] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> Correo
            </a>
          </div>
          <div className="text-[10px] text-[#8B949E]">
            Canal cifrado punto a punto
          </div>
        </div>

        {/* ASCII Signature */}
        <div className="border border-[#272938] bg-[#12121A] p-4 font-mono text-[10px] text-[#00FF88] overflow-x-auto select-none">
          <pre className="leading-tight">
{`  ╔══════════════════════════════╗
  ║  MARCO POLO SILVA            ║
  ║  LEVEL 28 CODE PALADIN       ║
  ║  XP: 8450 / 10000            ║
  ╚══════════════════════════════╝`}
          </pre>
          <div className="text-[#8B949E] mt-2 flex items-center gap-1">
            <span>Forjado con</span>
            <Heart className="w-3 h-3 text-[#FF2A4D] inline fill-[#FF2A4D]" />
            <span>y React + Tailwind</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center border-t border-[#1A1C28] pt-4 text-[11px] text-[#8B949E]">
        © 2026 {characterData.name} - Todos los derechos reservados bajo licencia RPG Aventurero.
      </div>
    </footer>
  );
}
