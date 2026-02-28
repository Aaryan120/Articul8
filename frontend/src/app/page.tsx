/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Home = () => {
  const { isAuth } = useAppData();
  const [showReadingPrompt, setShowReadingPrompt] = useState(false);
  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl flex-col justify-between gap-10 px-6 py-10 md:gap-12 md:py-14">
        <div className="flex flex-1 flex-col gap-12 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
            Articul8 Journal
          </p>
          <h1 className="font-serif text-5xl leading-tight text-foreground sm:text-6xl md:text-7xl">
            Human stories &amp; ideas
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            A place to read, write, and deepen your understanding through calm,
            long-form essays.
          </p>
          <div className="flex flex-wrap gap-3">
            {isAuth ? (
              <Button asChild className="px-8">
                <Link href="/blogs">Start reading</Link>
              </Button>
            ) : (
              <Button
                className="px-8"
                onClick={() => setShowReadingPrompt(true)}
              >
                Start reading
              </Button>
            )}
            <Button asChild variant="outline" className="px-8">
              <Link href="/login">Get started</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative mx-auto h-[260px] w-full max-w-sm sm:h-[320px] md:h-[420px] md:max-w-md">
            <div className="absolute right-6 top-2 h-24 w-24 rounded-full bg-[#3aa25a] opacity-80 sm:top-4 sm:h-28 sm:w-28 md:h-32 md:w-32" />
            <div className="absolute right-0 top-20 h-36 w-36 rounded-3xl bg-[#2f9e44] sm:h-40 sm:w-40 md:top-28 md:h-44 md:w-44" />
            <div className="absolute left-4 top-10 h-32 w-44 rounded-[2rem] border border-foreground/10 bg-card/90 shadow-xl sm:left-6 sm:h-36 sm:w-48 md:h-40 md:w-52" />
            <div className="absolute bottom-4 left-10 h-20 w-20 rounded-full border border-foreground/10 bg-background shadow-lg sm:left-16 sm:h-24 sm:w-24" />
            <div className="absolute bottom-8 right-6 h-12 w-24 rounded-full border border-foreground/10 bg-background shadow-lg sm:bottom-10 sm:h-14 sm:w-28" />
          </div>
        </div>
        </div>
        <div className="border-t border-border/60">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-4">
              <span>About</span>
              <span>Careers</span>
              <span>Blog</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
            <span>Articul8 - Where Ideas Speak</span>
          </div>
        </div>
      </div>
      <Dialog open={showReadingPrompt} onOpenChange={setShowReadingPrompt}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-foreground">
              Sign in to start reading.
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button asChild className="w-full justify-between rounded-full px-6">
              <Link href="/login">
                Continue with Google
                <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
                  Secure
                </span>
              </Link>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-foreground underline">
                Sign in
              </Link>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
