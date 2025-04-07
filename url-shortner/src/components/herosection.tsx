// app/page.tsx (Home Page)
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/libs/axios.api";
import { getCookies } from "@/libs/cookies";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Copy,
  ExternalLink,
  LinkIcon,
  Scissors,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { UAParser } from "ua-parser-js";
interface UrlResponse {
  newUrl: string;
  expiresAt: string;
  country?: string;
  browser?: string;
  device?: string;
}
const newUrl = "https://url-shortner-2-jwar.onrender.com";
//In order to get the country, we need to use the ip address of the user.

export default function Home() {
  const [browser, setBrowser] = useState("Unknown");
  const [device, setDevice] = useState("Desktop");
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<UrlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setBrowser(result.browser.name || "Unknown");
    setDevice(result.device.type || "Desktop");
  }, []);

  const getLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_name || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const token = await getCookies();
    if (!token) {
      toast.error("Please login to shorten your URL");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const countryName = await getLocation();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const response = await api.shorten({
        originalUrl: url,
        expiresAt: expiresAt.toISOString(),
        country: countryName,
        browser,
        device,
      });

      const newShortUrl = `${newUrl}/url/${response.shortId}`;
      setShortUrl({
        newUrl: newShortUrl,
        expiresAt: response.expiresAt,
        country: countryName,
        browser,
        device,
      });
    } catch (err) {
      console.error("Error creating short URL:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  console.log("herosection shorturl", shortUrl);
  const copyToClipboard = () => {
    if (!shortUrl) return;
    console.log("herosection shorturl", shortUrl);
    navigator.clipboard.writeText(shortUrl.newUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 dark:bg-neutral-950">
      <Toaster position="top-center" reverseOrder={false} />
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="relative h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Scissors className="h-8 w-8 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tight"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Cut the <span className="text-primary">Link</span>
            </motion.h1>

            <motion.p
              className="mt-3 text-muted-foreground"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Transform lengthy URLs into concise, shareable links in seconds.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Shorten Your URL</CardTitle>
                <CardDescription>
                  Paste your long URL below to generate a short link.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="https://example.com/very/long/url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      className="flex-1"
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !url}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Shorten URL <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {shortUrl && (
                  <motion.div
                    className="mt-4 p-3 bg-muted rounded-md"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1">
                        <h2 className="truncate">
                          Short URL: {shortUrl.newUrl}
                        </h2>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                          className="h-8 px-2"
                        >
                          {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        className="h-8 px-2"
                      >
                        <Link href={shortUrl.newUrl} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <p>
                        Expires:{" "}
                        {new Date(shortUrl.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center text-xs text-muted-foreground">
                Your shortened URLs are available for 30 days
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
