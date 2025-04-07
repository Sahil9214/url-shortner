/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Eye, EyeOff, Lock, Mail, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../libs/axios.api";
import { setCookies, setProfileImage } from "../../libs/cookies";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    console.log(payload, "login page");
    try {
      const res = await api.login(payload);
      console.log("login page", res);
      if (res.token) {
        setCookies(res.token);
        setProfileImage(res.user.profileImage);
        toast.success("Login successfully");

        router.push("/");
      }
    } catch (error: any) {
      console.log("login page error", error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
    // Simulate API call
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-card p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Mail size={18} />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="relative flex items-center justify-center">
            <Separator className="absolute w-full" />
            <span className="relative bg-card px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            Don&apos;t have an account?
          </span>{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
