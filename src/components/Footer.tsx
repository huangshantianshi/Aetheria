"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-aether-mist/15 py-8 mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-3">
        <p className="text-aether-whisper/60 text-xs font-mono flex items-center gap-1.5">
          Built with{" "}
          <Heart className="w-3 h-3 text-aether-petal/60" fill="currentColor" />{" "}
          for those who live forever in memory
        </p>
        <p className="text-aether-whisper/40 text-xs">
          Aetheria &copy; {new Date().getFullYear()} &mdash; Digital Immortality &middot; Palace of Memory
        </p>
      </div>
    </motion.footer>
  );
}
