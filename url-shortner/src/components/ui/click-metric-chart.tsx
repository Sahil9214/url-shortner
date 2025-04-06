"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

// Generate sample data based on timeframe
const generateData = (timeFrame: string) => {
  if (timeFrame === "day") {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      clicks: Math.floor(Math.random() * 100) + 20,
    }));
  } else if (timeFrame === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      time: day,
      clicks: Math.floor(Math.random() * 500) + 100,
    }));
  } else {
    // month
    return Array.from({ length: 30 }, (_, i) => ({
      time: `${i + 1}`,
      clicks: Math.floor(Math.random() * 1000) + 200,
    }));
  }
};

interface ClickMetricsChartProps {
  timeFrame: string;
}

export function ClickMetricsChart({ timeFrame }: ClickMetricsChartProps) {
  const data = generateData(timeFrame);

  return (
    <ChartContainer
      config={{
        clicks: {
          label: "Clicks",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="time"
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
        />
      </LineChart>
    </ChartContainer>
  );
}
