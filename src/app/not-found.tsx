"use client";

import { motion } from "framer-motion";
import { Ghost } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";
import Starfield from "@/components/Starfield";

export default function NotFound() {
  return (
    <>
      <Starfield />
      <section className="relative min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Ghost className="w-16 h-16 text-aether-mist mx-auto mb-6 animate-float" />
          <h1 className="font-display text-3xl font-bold text-aether-ghost mb-3">
            此处空无一物
          </h1>
          <p className="text-aether-whisper mb-8">
            这片虚空中尚无记忆驻留
          </p>
          <Link href="/">
            <Button variant="primary">返回首页</Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
