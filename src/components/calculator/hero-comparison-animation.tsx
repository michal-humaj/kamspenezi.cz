"use client";

import React from "react";

export function HeroComparisonAnimation() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-16 py-8 md:flex-row md:gap-24 md:py-12">
      
      {/* Scenario A (Left) */}
      <div className="flex flex-col items-center">
        {/* Floating 3D Object Placeholder */}
        <div className="h-48 w-48 rounded-3xl bg-orange-100 shadow-xl animate-float md:h-64 md:w-64 relative overflow-hidden flex items-center justify-center">
          {/* <img src="/assets/3d-house.png" alt="House 3D" className="w-full h-full object-contain" /> */}
          <span className="text-orange-300 font-bold opacity-30 text-xl">3D House</span>
        </div>
        
        {/* Label */}
        <div className="mt-8 text-center">
          <span className="font-medium text-gray-900 text-lg tracking-tight">
            Scénář A: Vlastní bydlení
          </span>
        </div>
      </div>

      {/* VS Connector */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-400 shadow-lg ring-4 ring-[var(--bg-base)]">
        VS
      </div>

      {/* Scenario B (Right) */}
      <div className="flex flex-col items-center">
        {/* Floating 3D Object Placeholder */}
        <div className="h-48 w-48 rounded-3xl bg-purple-100 shadow-xl animate-float delay-1000 md:h-64 md:w-64 relative overflow-hidden flex items-center justify-center">
          {/* <img src="/assets/3d-chart.png" alt="Investment 3D" className="w-full h-full object-contain" /> */}
          <span className="text-purple-300 font-bold opacity-30 text-xl">3D Coins</span>
        </div>
        
        {/* Label */}
        <div className="mt-8 text-center">
          <span className="font-medium text-gray-900 text-lg tracking-tight">
            Scénář B: Nájem a investování
          </span>
        </div>
      </div>
    </div>
  );
}
