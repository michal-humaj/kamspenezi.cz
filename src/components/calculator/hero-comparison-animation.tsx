"use client";

import React from "react";
import Image from "next/image";

export function HeroComparisonAnimation() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-16 py-8 md:flex-row md:gap-24 md:py-12">
      
      {/* Scenario A (Left) */}
      <div className="flex flex-col items-center">
        {/* Floating 3D Object */}
        <div className="relative h-48 w-48 animate-float md:h-64 md:w-64">
          <Image 
            src="/house.png" 
            alt="Vlastní bydlení 3D" 
            width={300} 
            height={300}
            className="h-full w-full object-contain drop-shadow-2xl"
            priority
          />
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
        {/* Floating 3D Object */}
        <div className="relative h-48 w-48 animate-float delay-1000 md:h-64 md:w-64">
          <Image 
            src="/chart.png" 
            alt="Investování 3D" 
            width={300} 
            height={300}
            className="h-full w-full object-contain drop-shadow-2xl"
            priority
          />
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
