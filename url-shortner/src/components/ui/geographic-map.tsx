"use client";

import { useThemeColors } from "@/lib/theme-utils";
import { useState } from "react";

// Sample data for country clicks
const countryData = [
  { id: "US", clicks: 1245, name: "United States" },
  { id: "GB", clicks: 873, name: "United Kingdom" },
  { id: "CA", clicks: 621, name: "Canada" },
  { id: "DE", clicks: 542, name: "Germany" },
  { id: "FR", clicks: 421, name: "France" },
  { id: "AU", clicks: 387, name: "Australia" },
  { id: "JP", clicks: 356, name: "Japan" },
  { id: "IN", clicks: 312, name: "India" },
  { id: "BR", clicks: 287, name: "Brazil" },
  { id: "MX", clicks: 245, name: "Mexico" },
];

export function GeographicMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const { mapColors, strokeColors } = useThemeColors();

  // Get color based on clicks
  const getCountryColor = (countryId: string) => {
    const country = countryData.find((c) => c.id === countryId);
    if (!country) return mapColors.base;

    // Scale based on clicks
    if (country.clicks > 1000) return mapColors.highest;
    if (country.clicks > 750) return mapColors.high;
    if (country.clicks > 500) return mapColors.medium;
    if (country.clicks > 250) return mapColors.low;
    return mapColors.lowest;
  };

  return (
    <div className="relative h-[400px] w-full">
      {/* Simple world map SVG */}
      <svg viewBox="0 0 1000 500" className="h-full w-full">
        {/* This would be a simplified world map SVG with country paths */}
        {/* Each path would have an id matching the country code */}
        {/* For demonstration, showing a few example countries */}
        <path
          id="US"
          d="M215,160 L300,160 L300,200 L215,200 Z"
          className={`${getCountryColor("US")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "US" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("US")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="CA"
          d="M215,120 L300,120 L300,155 L215,155 Z"
          className={`${getCountryColor("CA")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "CA" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("CA")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="GB"
          d="M470,150 L490,150 L490,160 L470,160 Z"
          className={`${getCountryColor("GB")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "GB" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("GB")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="DE"
          d="M500,160 L520,160 L520,175 L500,175 Z"
          className={`${getCountryColor("DE")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "DE" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("DE")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="FR"
          d="M485,175 L505,175 L505,190 L485,190 Z"
          className={`${getCountryColor("FR")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "FR" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("FR")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="IN"
          d="M650,220 L680,220 L680,250 L650,250 Z"
          className={`${getCountryColor("IN")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "IN" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("IN")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="JP"
          d="M800,180 L820,180 L820,200 L800,200 Z"
          className={`${getCountryColor("JP")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "JP" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("JP")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="AU"
          d="M780,320 L830,320 L830,350 L780,350 Z"
          className={`${getCountryColor("AU")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "AU" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("AU")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="BR"
          d="M330,280 L370,280 L370,320 L330,320 Z"
          className={`${getCountryColor("BR")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "BR" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("BR")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
        <path
          id="MX"
          d="M220,210 L260,210 L260,230 L220,230 Z"
          className={`${getCountryColor("MX")} ${
            strokeColors.base
          } stroke-[0.5] transition-colors duration-200 ${
            hoveredCountry === "MX" ? strokeColors.highlight + " stroke-1" : ""
          }`}
          onMouseEnter={() => setHoveredCountry("MX")}
          onMouseLeave={() => setHoveredCountry(null)}
        />
      </svg>

      {/* Tooltip */}
      {hoveredCountry && (
        <div className="absolute top-0 left-0 bg-popover text-popover-foreground px-3 py-2 rounded-md text-sm shadow-lg transform -translate-y-full pointer-events-none">
          {countryData.find((c) => c.id === hoveredCountry)?.name}:{" "}
          {countryData
            .find((c) => c.id === hoveredCountry)
            ?.clicks.toLocaleString()}{" "}
          clicks
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-0 right-0 bg-card/80 p-3 rounded-tl-md">
        <div className="text-xs text-muted-foreground mb-2">Clicks</div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${mapColors.lowest}`} />
          <span className="text-xs text-card-foreground">0-250</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${mapColors.low}`} />
          <span className="text-xs text-card-foreground">251-500</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${mapColors.medium}`} />
          <span className="text-xs text-card-foreground">501-750</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${mapColors.high}`} />
          <span className="text-xs text-card-foreground">751-1000</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-sm ${mapColors.highest}`} />
          <span className="text-xs text-card-foreground">1000+</span>
        </div>
      </div>
    </div>
  );
}
