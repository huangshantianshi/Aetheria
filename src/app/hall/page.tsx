"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Flame, Clock, Heart } from "lucide-react";
import { memorials } from "@/data/memorials";
import Starfield from "@/components/Starfield";
import GlassCard from "@/components/GlassCard";

export default function HallPage() {
  const router = useRouter();

  return (
    <>
      <Starfield />

      <section className="relative min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aether-mist/30 bg-aether-dusk/30 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Flame className="w-3.5 h-3.5 text-aether-candle animate-flicker" />
              <span className="text-xs font-mono text-aether-whisper tracking-wider">
                {memorials.length} souls resting here
              </span>
            </motion.div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-aether-ghost mb-4">
              Memorial Hall
            </h1>
            <p className="text-aether-whisper max-w-lg mx-auto">
              Each card is a doorway into memory. Touch it, and you may meet the past once more.
            </p>
          </motion.div>

          {/* Memorial Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memorials.map((memorial, i) => (
              <GlassCard
                key={memorial.id}
                delay={0.1 + i * 0.08}
                onClick={() => router.push(`/profile/${memorial.id}`)}
                className="group"
              >
                {/* Avatar */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-aether-mist/30 group-hover:border-aether-glow/50 transition-colors duration-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={memorial.avatar}
                        alt={memorial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Glow indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-aether-glow/60 border-2 border-aether-deep animate-glow-pulse" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-aether-ghost group-hover:text-aether-spirit transition-colors duration-300">
                      {memorial.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-aether-whisper/60 text-xs font-mono">
                      <Clock className="w-3 h-3" />
                      <span>
                        {memorial.birthYear} — {memorial.deathYear}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Epitaph */}
                <p className="text-aether-whisper text-sm leading-relaxed mb-4 italic">
                  &ldquo;{memorial.epitaph}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-aether-mist/15">
                  <div className="flex items-center gap-1.5 text-aether-petal/60 text-xs">
                    <Heart className="w-3.5 h-3.5" fill="currentColor" />
                    <span>{memorial.tributes} tributes</span>
                  </div>
                  <span className="text-aether-glow/60 text-xs font-mono group-hover:text-aether-glow transition-colors duration-300">
                    Visit &rarr;
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
