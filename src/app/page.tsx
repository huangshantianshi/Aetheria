"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Starfield from "@/components/Starfield";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      <Starfield />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Ambient glow behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-aether-glow/5 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.p
              className="text-aether-ember font-mono text-sm tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Digital Immortality &middot; Palace of Memory
            </motion.p>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-aether-ghost">Aetheria</span>
              <br />
              <span className="text-glow bg-gradient-to-r from-aether-glow via-aether-ember to-aether-petal bg-clip-text text-transparent">
                Let Memory Live Forever in Code
              </span>
            </h1>

            <motion.p
              className="text-aether-whisper text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Beyond the limits of physical space — a spiritual home for the digital age.
              <br />
              <span className="text-aether-whisper/60">
                Every memory deserves to be guarded for eternity.
              </span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => router.push("/hall")}
              >
                Enter the Memorial Hall
              </Button>
              <Button variant="ghost" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-aether-ghost mb-4">
              Redefining Remembrance
            </h2>
            <p className="text-aether-whisper max-w-xl mx-auto">
              In the permanence of the digital realm, build an immortal sanctuary for every soul
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard delay={0.1}>
              <div className="w-10 h-10 rounded-lg bg-aether-glow/15 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-aether-glow" />
              </div>
              <h3 className="font-display text-lg font-medium text-aether-ghost mb-2">
                AI Life Narrative
              </h3>
              <p className="text-aether-whisper text-sm leading-relaxed">
                Using artificial intelligence, fragmented memories are woven into a complete and moving life story — every experience gently and faithfully recorded.
              </p>
            </GlassCard>

            <GlassCard delay={0.2}>
              <div className="w-10 h-10 rounded-lg bg-aether-ember/15 flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-aether-ember" />
              </div>
              <h3 className="font-display text-lg font-medium text-aether-ghost mb-2">
                Digital Legacy Space
              </h3>
              <p className="text-aether-whisper text-sm leading-relaxed">
                Photos, writings, recordings — all precious digital keepsakes preserved forever in a virtual space, ready to be visited by loved ones at any time.
              </p>
            </GlassCard>

            <GlassCard delay={0.3}>
              <div className="w-10 h-10 rounded-lg bg-aether-petal/15 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-aether-petal" />
              </div>
              <h3 className="font-display text-lg font-medium text-aether-ghost mb-2">
                Eternal Guardianship
              </h3>
              <p className="text-aether-whisper text-sm leading-relaxed">
                Blockchain technology ensures data is never lost. Distributed storage guarantees every memory transcends time — protected forever.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs text-aether-whisper/50 tracking-widest uppercase mb-4">
              — In the ocean of bits, there is no true goodbye —
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-aether-ghost mb-8">
              Every longing is a light that leads to eternity
            </h2>
            <Button
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => router.push("/hall")}
            >
              Begin Exploring
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
