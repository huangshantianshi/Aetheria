"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
  duration: number;
}

interface ParticleEffectProps {
  trigger: boolean;
  originX?: number;
  originY?: number;
  colors?: string[];
  count?: number;
  onComplete?: () => void;
}

export default function ParticleEffect({
  trigger,
  originX = 0,
  originY = 0,
  colors = ["#f0abfc", "#c4b5fd", "#a78bfa", "#fbbf24", "#6366f1"],
  count = 24,
  onComplete,
}: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: originX,
      y: originY,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
      distance: Math.random() * 120 + 60,
      duration: Math.random() * 1.2 + 0.8,
    }));

    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 2000);
  }, [originX, originY, colors, count, onComplete]);

  useEffect(() => {
    if (trigger) burst();
  }, [trigger, burst]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            zIndex: 50,
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance - 40,
            scale: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: p.duration,
            ease: "easeOut",
          }}
        />
      ))}
    </AnimatePresence>
  );
}
