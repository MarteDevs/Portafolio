import React from 'react';
import { useAudio } from '../../context/AudioContext';

export default function CRTOverlay() {
  const { scanlinesActive } = useAudio();

  if (!scanlinesActive) return null;

  return (
    <div 
      className="fixed inset-0 crt-overlay crt-vignette z-50 pointer-events-none opacity-25 transition-opacity duration-300" 
      aria-hidden="true" 
    />
  );
}
