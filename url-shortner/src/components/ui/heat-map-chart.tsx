/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeColors } from "@/lib/theme-utils";
import { useState } from "react";

// Generate sample heat map data
const generateHeatMapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayData = days.map((day) => {
    return {
      day,
      hours: hours.map((hour) => {
        // Generate more realistic data - higher during work hours
        let intensity = Math.random();
        if (hour >= 9 && hour <= 17) {
          intensity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
        } else if (hour >= 18 && hour <= 22) {
          intensity = Math.random() * 0.3 + 0.3; // 0.3 to 0.6
        } else {
          intensity = Math.random() * 0.3; // 0 to 0.3
        }
        return {
          hour,
          intensity,
        };
      }),
    };
  });

  return dayData;
};

export function HeatMapChart() {
  const [view, setView] = useState("day");
  const heatMapData = generateHeatMapData();
  const { heatMapColors } = useThemeColors();

  // Get color based on intensity
  const getColor = (intensity: number) => {
    if (intensity < 0.2) return heatMapColors.lowest;
    if (intensity < 0.4) return heatMapColors.low;
    if (intensity < 0.6) return heatMapColors.medium;
    if (intensity < 0.8) return heatMapColors.high;
    return heatMapColors.highest;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="day" onValueChange={setView} className="w-full">
        <TabsList>
          <TabsTrigger value="day">Day of Week</TabsTrigger>
          <TabsTrigger value="hour">Hour of Day</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="mt-4">
          <div className="flex flex-col space-y-2">
            {heatMapData.map((dayRow, index) => (
              <div key={index} className="flex items-center">
                <div className="w-10 text-sm text-muted-foreground">
                  {dayRow.day}
                </div>
                <div className="flex flex-1 gap-1">
                  {dayRow.hours.map((hourData, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`h-6 flex-1 rounded-sm ${getColor(
                        hourData.intensity
                      )}`}
                      title={`${dayRow.day} ${
                        hourData.hour
                      }:00 - Intensity: ${Math.round(
                        hourData.intensity * 100
                      )}%`}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center pt-2">
              <div className="w-10" />
              <div className="flex flex-1 justify-between text-xs text-neutral-500">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>12 AM</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hour" className="mt-4">
          <div className="flex flex-col space-y-4">
            {/* Aggregate by hour of day */}
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }, (_, hour) => {
                // Calculate average intensity for this hour across all days
                const avgIntensity =
                  heatMapData.reduce((sum, day) => {
                    return sum + day.hours[hour].intensity;
                  }, 0) / 7;

                return (
                  <div key={hour} className="flex flex-col items-center">
                    <div
                      className={`w-full h-20 rounded-md ${getColor(
                        avgIntensity
                      )}`}
                      title={`${hour}:00 - Average intensity: ${Math.round(
                        avgIntensity * 100
                      )}%`}
                    />
                    <div className="mt-1 text-xs text-muted-foreground">
                      {hour === 0
                        ? "12 AM"
                        : hour === 12
                        ? "12 PM"
                        : hour > 12
                        ? `${hour - 12} PM`
                        : `${hour} AM`}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${heatMapColors.lowest} rounded-sm`} />
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${heatMapColors.medium} rounded-sm`} />
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 ${heatMapColors.highest} rounded-sm`}
                />
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
