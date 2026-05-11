"use client";

import { useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Flower2,
  Flame,
  BookOpen,
  Image as ImageIcon,
  Heart,
  Calendar,
} from "lucide-react";
import { memorials } from "@/data/memorials";
import Starfield from "@/components/Starfield";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";
import ParticleEffect from "@/components/ParticleEffect";
import ChatBox from "@/components/ChatBox";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [showParticles, setShowParticles] = useState(false);
  const [tributeCount, setTributeCount] = useState(0);
  const [particleOrigin, setParticleOrigin] = useState({ x: 0, y: 0 });
  const tributeRef = useRef<HTMLButtonElement>(null);

  const memorial = memorials.find((m) => m.id === params.id);

  const handleTribute = useCallback(() => {
    if (tributeRef.current) {
      const rect = tributeRef.current.getBoundingClientRect();
      setParticleOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setShowParticles(true);
    setTributeCount((c) => c + 1);
  }, []);

  if (!memorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-aether-whisper text-lg mb-4">Memorial not found</p>
          <Button variant="ghost" onClick={() => router.push("/hall")}>
            Back to Memorial Hall
          </Button>
        </div>
      </div>
    );
  }

  const totalTributes = memorial.tributes + tributeCount;

  return (
    <>
      <Starfield />
      <ParticleEffect
        trigger={showParticles}
        originX={particleOrigin.x}
        originY={particleOrigin.y}
        onComplete={() => setShowParticles(false)}
      />

      <section className="relative min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.push("/hall")}
            >
              Back to Memorial Hall
            </Button>
          </motion.div>

          {/* Profile Header */}
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-aether-mist/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={memorial.avatar}
                    alt={memorial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating glow */}
                <div className="absolute -inset-2 bg-aether-glow/5 rounded-3xl blur-xl pointer-events-none" />
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.h1
                  className="font-display text-3xl md:text-4xl font-bold text-aether-ghost mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {memorial.name}
                </motion.h1>

                <motion.div
                  className="flex items-center justify-center md:justify-start gap-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="flex items-center gap-1.5 text-aether-whisper/70 text-sm font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {memorial.birthYear} — {memorial.deathYear}
                  </span>
                  <span className="flex items-center gap-1.5 text-aether-petal/60 text-sm">
                    <Heart className="w-3.5 h-3.5" fill="currentColor" />
                    {totalTributes} tributes
                  </span>
                </motion.div>

                <motion.p
                  className="text-aether-ember italic text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  &ldquo;{memorial.epitaph}&rdquo;
                </motion.p>
              </div>
            </div>
          </GlassCard>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left column: Bio & Actions */}
            <div className="md:col-span-2 space-y-6">
              {/* AI Bio */}
              <GlassCard delay={0.2}>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-aether-glow" />
                  <h2 className="font-display text-lg font-medium text-aether-ghost">
                    Life Story
                  </h2>
                  <span className="text-xs font-mono text-aether-whisper/40 ml-auto">
                    AI Generated
                  </span>
                </div>
                <p className="text-aether-whisper text-sm leading-relaxed whitespace-pre-line">
                  {memorial.bio}
                </p>
              </GlassCard>

              {/* Photo Wall */}
              <GlassCard delay={0.3}>
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-4 h-4 text-aether-ember" />
                  <h2 className="font-display text-lg font-medium text-aether-ghost">
                    Digital Legacy
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {memorial.photos.map((photo, i) => (
                    <motion.div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden border border-aether-mist/20 hover:border-aether-glow/40 transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`${memorial.name} digital legacy ${i + 1}`}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right column: Actions */}
            <div className="space-y-6">
              {/* Tribute Card */}
              <GlassCard delay={0.25}>
                <div className="text-center space-y-4">
                  <Flame
                    className="w-8 h-8 text-aether-candle mx-auto animate-flicker"
                    strokeWidth={1.5}
                  />
                  <p className="text-aether-whisper text-sm">
                    Light a candle, lay a flower —
                    <br />
                    let your thoughts cross the void
                  </p>

                  <Button
                    ref={tributeRef}
                    variant="tribute"
                    size="md"
                    icon={<Flower2 className="w-4 h-4" />}
                    onClick={handleTribute}
                    className="w-full"
                  >
                    Leave a Tribute
                  </Button>

                  <AnimatePresence>
                    {tributeCount > 0 && (
                      <motion.p
                        className="text-aether-petal/60 text-xs font-mono"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        You&apos;ve left {tributeCount} tribute{tributeCount > 1 ? "s" : ""}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>

              {/* AI Chat */}
              <GlassCard delay={0.35}>
                <ChatBox
                  memorialId={memorial.id}
                  memorialName={memorial.name}
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
