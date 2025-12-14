"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroComparisonAnimation() {
  const [activeScenario, setActiveScenario] = useState<"A" | "B">("A");

  // Mobile: Auto-swap every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev === "A" ? "B" : "A"));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* MOBILE: Deck Swap Animation */}
      <div className="relative mx-auto flex h-[280px] w-full max-w-[320px] items-center justify-center md:hidden">
        <AnimatePresence mode="wait">
          {activeScenario === "A" ? (
            <motion.div
              key="card-a"
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <CardA />
            </motion.div>
          ) : (
            <motion.div
              key="card-b"
              initial={{ opacity: 0, scale: 0.95, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <CardB />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating VS Badge for Mobile (Optional, or just use dots) */}
        {/* We'll use just dots to keep it clean, as the toggle implies vs */}
        <div className="absolute -bottom-6 flex gap-3">
          <div className={`h-2 w-2 rounded-full transition-colors duration-300 ${activeScenario === 'A' ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`} />
          <div className={`h-2 w-2 rounded-full transition-colors duration-300 ${activeScenario === 'B' ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`} />
        </div>
      </div>

      {/* DESKTOP: Side-by-Side */}
      <div className="hidden relative flex-col items-center justify-center gap-6 py-10 md:flex md:flex-row md:gap-10">
        {/* Connector Line */}
        <div className="absolute left-1/2 top-1/2 h-0.5 w-64 -translate-x-1/2 -translate-y-1/2 bg-gray-200" />

        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           whileHover={{ y: -4 }}
           className="relative z-10"
        >
          <CardA />
        </motion.div>

        {/* VS Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
          className="z-20 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-uiSans font-bold text-white shadow-lg ring-8 ring-[var(--bg-base)]"
        >
          vs
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
           whileHover={{ y: -4 }}
           className="relative z-10"
        >
          <CardB />
        </motion.div>
      </div>
    </div>
  );
}

function CardA() {
  return (
    <div className="flex h-full w-full max-w-[300px] flex-col items-center gap-5 rounded-[24px] bg-[var(--scenario-a-bg)] px-6 pb-8 pt-10 text-center shadow-[var(--shadow-card-soft)] transition-shadow hover:shadow-[var(--shadow-card-hover)] mx-auto">
      <div className="absolute top-0 -translate-y-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[var(--scenario-a-dot)] shadow-sm ring-1 ring-black/5">
        SCÉNÁŘ A
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-white/50">
        <Home className="h-8 w-8 text-[var(--scenario-a-dot)]" strokeWidth={2.5} />
      </div>
      <div className="space-y-1">
        <h3 className="font-displaySerif text-2xl font-bold leading-tight text-[var(--color-primary)]">
          Vlastní bydlení
        </h3>
        <p className="font-uiSans text-sm font-medium text-[var(--color-primary)]/70">
          na hypotéku
        </p>
      </div>
    </div>
  );
}

function CardB() {
  return (
    <div className="flex h-full w-full max-w-[300px] flex-col items-center gap-5 rounded-[24px] bg-[var(--scenario-b-bg)] px-6 pb-8 pt-10 text-center shadow-[var(--shadow-card-soft)] transition-shadow hover:shadow-[var(--shadow-card-hover)] mx-auto">
      <div className="absolute top-0 -translate-y-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[var(--scenario-b-dot)] shadow-sm ring-1 ring-black/5">
        SCÉNÁŘ B
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-white/50">
        <TrendingUp className="h-8 w-8 text-[var(--scenario-b-dot)]" strokeWidth={2.5} />
      </div>
      <div className="space-y-1">
        <h3 className="font-displaySerif text-2xl font-bold leading-tight text-[var(--color-primary)]">
          Nájem & Investice
        </h3>
        <p className="font-uiSans text-sm font-medium text-[var(--color-primary)]/70">
          bydlení v nájmu
        </p>
      </div>
    </div>
  );
}
