"use client";

import * as React from "react";
import { formatMillionsCzk } from "@/lib/format";

export function RangeBarVisualization() {
  // Scenario A Data
  const scenarioA = {
    p10: 72000000,
    median: 79928678,
    p90: 85000000,
    color: "#C2410C", // Architectural Copper
  };

  // Scenario B Data
  const scenarioB = {
    p10: 15000000,
    median: 22144799,
    p90: 45000000,
    color: "#2F5C45", // Forest Green
  };

  // 1. Calculate the Scale (Global Max Optimistic)
  const maxP90 = Math.max(scenarioA.p90, scenarioB.p90);

  return (
    <div className="space-y-12 py-2">
      {/* Scenario A Block */}
      <div>
        {/* Semantic Header (Full Width) */}
        <div className="flex items-center mb-4">
          <div className="w-2 h-2 rounded-full bg-orange-700 mr-2" />
          <span className="text-xs font-bold tracking-wide text-slate-500 font-uiSans">
            Scénář A: Vlastní bydlení na hypotéku
          </span>
        </div>

        {/* Scalable Content Container */}
        <div style={{ width: `${Math.max((scenarioA.p90 / maxP90) * 100, 50)}%` }}>
          {/* The Data Grid (Scorecard) - Adapts to container width */}
          <div className="grid grid-cols-3 gap-2 mt-3 mb-2">
            {/* Column 1 (P10) - Left Aligned */}
            <div className="text-left pl-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-uiSans whitespace-nowrap">
                Pesimisticky (10 %)
              </span>
              <span className="text-sm font-medium text-slate-600 tabular-nums font-uiSans">
                {formatMillionsCzk(scenarioA.p10)} mil
              </span>
            </div>

            {/* Column 2 (Median) - Center Aligned */}
            <div className="bg-slate-50 rounded-lg -mx-2 px-2 py-1 text-center">
              <span 
                className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold block mb-1 font-uiSans"
                style={{ color: scenarioA.color }}
              >
                Očekávaný střed
              </span>
              <span className="text-2xl font-displaySerif font-bold text-slate-900 tracking-tight">
                {formatMillionsCzk(scenarioA.median)} mil
              </span>
            </div>

            {/* Column 3 (P90) - Right Aligned */}
            <div className="text-right pr-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-uiSans whitespace-nowrap">
                Optimisticky (90 %)
              </span>
              <span className="text-sm font-medium text-slate-600 tabular-nums font-uiSans">
                {formatMillionsCzk(scenarioA.p90)} mil
              </span>
            </div>
          </div>

          {/* Visual Bar - Fills the scaled container */}
          <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
            <div 
              className="h-full w-full rounded-full" 
              style={{ backgroundColor: scenarioA.color }} 
            />
          </div>
        </div>
      </div>

      {/* Scenario B Block */}
      <div>
        {/* Semantic Header (Full Width) */}
        <div className="flex items-center mb-4">
          <div className="w-2 h-2 rounded-full bg-[#2F5C45] mr-2" />
          <span className="text-xs font-bold tracking-wide text-slate-500 font-uiSans">
            Scénář B: Bydlení v nájmu a investování
          </span>
        </div>

        {/* Scalable Content Container */}
        <div style={{ width: `${Math.max((scenarioB.p90 / maxP90) * 100, 50)}%` }}>
          {/* The Data Grid (Scorecard) - Adapts to container width */}
          <div className="grid grid-cols-3 gap-2 mt-3 mb-2">
            {/* Column 1 (P10) - Left Aligned */}
            <div className="text-left pl-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-uiSans whitespace-nowrap">
                Pesimisticky (10 %)
              </span>
              <span className="text-sm font-medium text-slate-600 tabular-nums font-uiSans">
                {formatMillionsCzk(scenarioB.p10)} mil
              </span>
            </div>

            {/* Column 2 (Median) - Center Aligned */}
            <div className="bg-slate-50 rounded-lg -mx-2 px-2 py-1 text-center">
              <span 
                className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold block mb-1 font-uiSans"
                style={{ color: scenarioB.color }}
              >
                Očekávaný střed
              </span>
              <span className="text-2xl font-displaySerif font-bold text-slate-900 tracking-tight">
                {formatMillionsCzk(scenarioB.median)} mil
              </span>
            </div>

            {/* Column 3 (P90) - Right Aligned */}
            <div className="text-right pr-1">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-uiSans whitespace-nowrap">
                Optimisticky (90 %)
              </span>
              <span className="text-sm font-medium text-slate-600 tabular-nums font-uiSans">
                {formatMillionsCzk(scenarioB.p90)} mil
              </span>
            </div>
          </div>

          {/* Visual Bar - Fills the scaled container */}
          <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
            <div 
              className="h-full w-full rounded-full" 
              style={{ backgroundColor: scenarioB.color }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
