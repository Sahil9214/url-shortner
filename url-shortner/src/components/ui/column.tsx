"use client";

import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";

// Define the type for our data based on API response and desired columns
export type Url = {
  originalUrl: string;
  newUrl: string;
  shortId: string;
  country: string;
  browser: string;
  device: string;
};

export const columns: ColumnDef<Url>[] = [
  {
    accessorKey: "shortId",
    header: "Short ID",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("shortId")}</div>;
    },
  },
  {
    accessorKey: "originalUrl",
    header: "Original URL",
    cell: ({ row }) => {
      const url = row.getValue("originalUrl") as string;
      const truncatedUrl = url.length > 40 ? url.substring(0, 40) + "..." : url;

      return (
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">{truncatedUrl}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "newUrl",
    header: "Short URL",
    cell: ({ row }) => {
      const url = row.getValue("newUrl") as string;

      return (
        <div className="flex items-center space-x-2">
          <span>{url}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-neutral-400 hover:text-white"
            onClick={() => {
              navigator.clipboard.writeText(url);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-copy"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "browser",
    header: "Browser",
  },
  {
    accessorKey: "device",
    header: "Device",
  },
];
