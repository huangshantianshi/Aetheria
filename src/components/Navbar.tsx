"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Home, LayoutGrid } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 border-b border-aether-mist/20"
      style={{
        background: "rgba(10, 10, 15, 0.7)",
        backdropFilter: "blur(20px)",
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Flame
              className="w-6 h-6 text-aether-glow group-hover:text-aether-ember transition-colors duration-300"
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 w-6 h-6 bg-aether-glow/20 rounded-full blur-md group-hover:bg-aether-ember/30 transition-colors duration-300" />
          </div>
          <span className="font-display font-semibold text-lg text-aether-ghost tracking-wide">
            Aetheria
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavLink
            href="/hall"
            icon={<LayoutGrid className="w-4 h-4" />}
            label="Memorial Hall"
          />
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-aether-whisper hover:text-aether-ghost hover:bg-aether-dusk/50 transition-all duration-200"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
