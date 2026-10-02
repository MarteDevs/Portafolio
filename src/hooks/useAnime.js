import { animate } from 'animejs';
import confetti from 'canvas-confetti';

export function useAnime() {
  // Animate a number counter smoothly using animejs v4
  const animateCounter = (targetRef, startVal, endVal, duration = 1200, decimals = 0) => {
    if (!targetRef.current) return;
    const obj = { val: startVal };
    animate(obj, {
      val: endVal,
      duration: duration,
      ease: 'outExpo',
      onUpdate: () => {
        if (targetRef.current) {
          targetRef.current.textContent = decimals > 0 ? obj.val.toFixed(decimals) : Math.floor(obj.val);
        }
      }
    });
  };

  // Pop / Pulse animation for buttons or badges
  const triggerPulse = (element) => {
    if (!element) return;
    animate(element, {
      scale: [1, 1.25, 1],
      duration: 350,
      ease: 'outElastic(1, .6)',
    });
  };

  // Confetti burst for level up / quest complete / message sent
  const triggerConfetti = (originX = 0.5, originY = 0.5) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ['#00FF88', '#00D4FF', '#FF007F', '#FFD700'],
      ticks: 200,
      shapes: ['square'],
      disableForReducedMotion: true,
    });
  };

  return {
    animateCounter,
    triggerPulse,
    triggerConfetti,
  };
}
