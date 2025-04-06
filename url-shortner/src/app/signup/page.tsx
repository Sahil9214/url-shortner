/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  Sun,
  Upload,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../libs/axios.api";
import { setCookies } from "../../libs/cookies";
export default function SignupPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    try {
      const res = await api.signup(payload);
      if (res.token) {
        setCookies(res.token);
        toast.success("Account created successfully");
        router.push("/");
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const res = await api.googleCallback();
      console.log("google signup", res);
    } catch (error) {
      console.log("google signup error", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
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
            Create an account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <User size={18} />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock size={18} />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
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

            <div className="space-y-2">
              <Label htmlFor="verifyPassword">Verify Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Lock size={18} />
                </div>
                <Input
                  id="verifyPassword"
                  name="verifyPassword"
                  type={showVerifyPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                  onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                >
                  {showVerifyPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div
                className={`relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-input hover:bg-accent/10"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {profileImage ? (
                  <div className="relative h-24 w-24">
                    <Image
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile preview"
                      className="h-24 w-24 rounded-full object-cover"
                      width={96}
                      height={96}
                    />
                    <button
                      type="button"
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white hover:bg-destructive/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium text-foreground">
                      <span className="font-semibold text-primary">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or GIF (max. 2MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="relative flex items-center justify-center">
            <Separator className="absolute w-full" />
            <span className="relative bg-card px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign up with Google
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
