/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClickMetricsChart } from "@/components/ui/click-metric-chart";
import { columns } from "@/components/ui/column"; // Ensure path is correct
import { DataTable } from "@/components/ui/data-table";
import { HeatMapChart } from "@/components/ui/heat-map-chart";
import { api } from "@/libs/axios.api";
import { getCookies } from "@/libs/cookies";
import { Clock, Link, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Define the type for our URL data (matches columns.tsx)
interface UrlData {
  originalUrl: string;
  newUrl: string;
  shortId: string;
  country: string;
  browser: string;
  device: string;
}

export default function AnalyticsPage() {
  const [timeFrame, setTimeFrame] = useState("week");
  const [totalLinks, setTotalLinks] = useState(0);
  const [peakTime, setPeakTime] = useState("N/A");
  const [urlData, setUrlData] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getCookies();
      const res = await api.counter(token);
      console.log(res, "ram ram bhai sare ne ");

      // Set total links
      setTotalLinks(res.count);

      // Map API response to UrlData type
      const urls = (res.urls || []).map((url: any) => ({
        originalUrl: url.originalUrl,
        newUrl: url.newUrl,
        shortId: url.shortId,
        country: url.country,
        browser: url.browser,
        device: url.device,
        createdAt: url.createdAt, // ✅ include this
      }));
      setUrlData(urls);

      // Calculate average creation time
      if (urls.length > 0) {
        const totalHours = urls.reduce((sum: number, url: any) => {
          const date = new Date(url.createdAt); // Note: createdAt isn't in UrlData, but still in API data
          const hours = date.getUTCHours();
          return sum + hours + date.getUTCMinutes() / 60;
        }, 0);

        const avgHours = totalHours / urls.length;
        const avgHourInt = Math.floor(avgHours);
        const avgMinutes = Math.round((avgHours - avgHourInt) * 60);

        const period = avgHourInt >= 12 ? "PM" : "AM";
        const hour12 = avgHourInt % 12 || 12;
        const formattedTime = `${hour12}:${avgMinutes
          .toString()
          .padStart(2, "0")} ${period}`;
        setPeakTime(formattedTime);
      } else {
        setPeakTime("N/A");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-neutral-400">
            Track and analyze your shortened URL performance
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">
                Total Links Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalLinks}</div>
                <Users className="h-4 w-4 text-neutral-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalLinks}</div>
                <Link className="h-4 w-4 text-neutral-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">
                Peak Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{peakTime}</div>
                <Clock className="h-4 w-4 text-neutral-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Click Metrics Chart */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Click Metrics Over Time</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={timeFrame === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFrame("day")}
                  className={
                    timeFrame !== "day"
                      ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                      : ""
                  }
                >
                  Day
                </Button>
                <Button
                  variant={timeFrame === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFrame("week")}
                  className={
                    timeFrame !== "week"
                      ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                      : ""
                  }
                >
                  Week
                </Button>
                <Button
                  variant={timeFrame === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFrame("month")}
                  className={
                    timeFrame !== "month"
                      ? "bg-neutral-800 border-neutral-700 hover:bg-neutral-700"
                      : ""
                  }
                >
                  Month
                </Button>
              </div>
            </div>
            <CardDescription className="text-neutral-400">
              Track how your links are performing over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClickMetricsChart timeFrame={timeFrame} />
          </CardContent>
        </Card>

        {/* URL Data Table */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>URL Data</CardTitle>
            <CardDescription className="text-neutral-400">
              Manage and monitor your shortened URLs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={urlData} />
          </CardContent>
        </Card>

        {/* Heat Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle>Click Heat Map</CardTitle>
              <CardDescription className="text-neutral-400">
                Popular times of day and days of the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeatMapChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
