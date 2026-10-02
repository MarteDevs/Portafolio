import React, { useState } from 'react';
import { Send, Mail, CheckCircle2, Shield, Github, Linkedin } from 'lucide-react';
import RetroButton from '../ui/RetroButton';
import HoloCard from '../ui/HoloCard';
import { useAudio } from '../../context/AudioContext';
import { useAnime } from '../../hooks/useAnime';
import { characterData } from '../../data/characterData';

export default function ContactSection() {
  const { playSuccess, playClick, playBeep } = useAudio();
  const { triggerConfetti } = useAnime();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    playBeep();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      playSuccess();
      triggerConfetti(0.5, 0.5);
    }, 800);
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-8 min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="border-b border-[#272938] pb-5 space-y-1">
        <div className="text-xs font-mono text-[#FF5E00] flex items-center gap-1.5 uppercase">
          <Mail className="w-4 h-4 text-[#FF5E00]" />
          <span>CANAL DE INVOCACIÓN // TRANSMITTER</span>
        </div>
        <h1 className="font-retro text-2xl sm:text-3xl text-[#E6EDF3]">
          ENVIAR <span className="text-[#FF5E00] text-glow-ember">PERGAMINO</span>
        </h1>
      </div>

      {submitted ? (
        <HoloCard glowColor="mana" className="p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#00FF88] mx-auto animate-bounce" />
          <h2 className="font-retro text-base sm:text-lg text-[#00FF88]">
            ¡MENSAJE ENVIADO CON ÉXITO!
          </h2>
          <p className="text-xs font-mono text-[#E6EDF3] max-w-sm mx-auto">
            La señal llegó al terminal del aventurero. Recibirás respuesta en <strong>{formData.email}</strong>.
          </p>
          <RetroButton
            variant="mana"
            size="sm"
            onClick={() => {
              playClick();
              setSubmitted(false);
              setFormData({ name: '', email: '', message: '' });
            }}
          >
            Nuevo Mensaje
          </RetroButton>
        </HoloCard>
      ) : (
        <HoloCard glowColor="ember" className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5 font-mono">
            <div className="space-y-1.5">
              <label className="text-xs text-[#E6EDF3] flex items-center gap-1.5">
                <span className="text-[#00FF88]">▶</span> Nombre o Gremio:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Gandalf / Reclutador Tech"
                className="w-full bg-[#0A0A0F] border border-[#272938] px-3 py-2 text-xs sm:text-sm text-[#E6EDF3] focus:border-[#00FF88] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#E6EDF3] flex items-center gap-1.5">
                <span className="text-[#00D4FF]">▶</span> Correo de Contacto:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contacto@gremio.com"
                className="w-full bg-[#0A0A0F] border border-[#272938] px-3 py-2 text-xs sm:text-sm text-[#E6EDF3] focus:border-[#00D4FF] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-[#E6EDF3] flex items-center gap-1.5">
                <span className="text-[#FF5E00]">▶</span> Mensaje de Misión:
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Detalles breves del proyecto o propuesta..."
                className="w-full bg-[#0A0A0F] border border-[#272938] px-3 py-2 text-xs sm:text-sm text-[#E6EDF3] focus:border-[#FF5E00] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-[#8B949E] flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#00FF88]" /> Canal Cifrado
              </div>
              <RetroButton
                type="submit"
                variant="ember"
                size="md"
                disabled={isSending}
                icon={Send}
              >
                {isSending ? 'Transmitiendo...' : 'Transmitir'}
              </RetroButton>
            </div>
          </form>
        </HoloCard>
      )}

      {/* Direct Contact Links */}
      <div className="flex justify-center gap-4 text-xs font-mono">
        <a
          href={characterData.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#272938] text-[#8B949E] hover:text-[#00FF88] hover:border-[#00FF88] transition-colors"
        >
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a
          href={characterData.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#272938] text-[#8B949E] hover:text-[#00D4FF] hover:border-[#00D4FF] transition-colors"
        >
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
        <a
          href={characterData.socialLinks.email}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[#272938] text-[#8B949E] hover:text-[#FF5E00] hover:border-[#FF5E00] transition-colors"
        >
          <Mail className="w-4 h-4" /> Email Directo
        </a>
      </div>
    </section>
  );
}
