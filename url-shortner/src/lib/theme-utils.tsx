"use client";

import { useTheme } from "next-themes";

export function useThemeColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    // Heat map colors
    heatMapColors: {
      lowest: isDark ? "bg-cyan-950" : "bg-cyan-100",
      low: isDark ? "bg-cyan-900" : "bg-cyan-200",
      medium: isDark ? "bg-cyan-800" : "bg-cyan-300",
      high: isDark ? "bg-cyan-600" : "bg-cyan-500",
      highest: isDark ? "bg-cyan-500" : "bg-cyan-600",
    },
    // Map colors
    mapColors: {
      base: isDark ? "fill-neutral-800" : "fill-neutral-200",
      lowest: isDark ? "fill-cyan-900" : "fill-cyan-200",
      low: isDark ? "fill-cyan-800" : "fill-cyan-300",
      medium: isDark ? "fill-cyan-700" : "fill-cyan-400",
      high: isDark ? "fill-cyan-600" : "fill-cyan-500",
      highest: isDark ? "fill-cyan-500" : "fill-cyan-600",
    },
    // Stroke colors
    strokeColors: {
      base: isDark ? "stroke-neutral-700" : "stroke-neutral-300",
      highlight: isDark ? "stroke-white" : "stroke-black",
    },
  };
}
