"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

export function CountryBreakdown() {
  // Sort data by clicks in descending order
  const sortedData = [...countryData].sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            horizontal={false}
          />
          <XAxis
            type="number"
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value) => [`${value} clicks`, "Clicks"]}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar
            dataKey="clicks"
            fill="hsl(var(--chart-1))"
            radius={[0, 4, 4, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
