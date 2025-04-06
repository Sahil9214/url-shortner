"use client";

import { motion } from "framer-motion";
import { ChartArea, Scissors, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
interface NavbarProps {
  userImage?: string | null;
}

export function Navbar({ userImage }: NavbarProps) {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b">
      <Link href="/" className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: -20 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Scissors className="h-6 w-6 text-primary" />
        </motion.div>
        <span className="font-bold text-xl">LinkCut</span>
      </Link>
      <div className="flex items-center gap-4 mr-10 cursor-pointer">
        <Button variant="outline" size="icon" aria-label="Toggle theme">
          {!userImage ? (
            <User className="h-5 w-5" />
          ) : (
            <Image src={userImage} alt="avatar" width={24} height={24} />
          )}
        </Button>
        <Link href="/analytics">
          <Button variant="outline" size="icon" aria-label="Toggle theme">
            <ChartArea className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
