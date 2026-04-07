/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CircleUserRoundIcon, LogIn, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppData } from "@/context/AppContext";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWritePrompt, setShowWritePrompt] = useState(false);
  const pathname = usePathname();
  const { loading, isAuth, user, searchQuery, setSearchQuery } = useAppData();
  const showSearch = pathname?.startsWith("/blogs");
  const hideWrite = pathname === "/login";

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={"/"} className="text-xl font-semibold tracking-tight">
          <span className="font-serif">Articul8</span>
        </Link>

        {showSearch && (
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search thoughtful reads"
                className="pl-11"
              />
            </div>
          </div>
        )}

        <div className="hidden items-center gap-3 md:flex">
          {!hideWrite &&
            (isAuth ? (
              <Button asChild variant="ghost">
                <Link href="/blog/new">Write</Link>
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowWritePrompt(true)}
              >
                Write
              </Button>
            ))}
          {loading ? null : isAuth ? (
            <Link href={"/profile"} className="flex items-center">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                />
              ) : (
                <CircleUserRoundIcon className="h-6 w-6" />
              )}
            </Link>
          ) : (
            <Button asChild>
              <Link href={"/login"} className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-4 border-t border-border/60 bg-background/95 px-4 py-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search thoughtful reads"
                className="pl-11"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href={"/blogs"} className="rounded-full px-4 py-2 hover:bg-accent">
              Home
            </Link>
            {isAuth && (
              <Link
                href={"/blog/saved"}
                className="rounded-full px-4 py-2 hover:bg-accent"
              >
                Saved Blogs
              </Link>
            )}
            {loading ? null : isAuth ? (
              <Link
                href={"/profile"}
                className="rounded-full px-4 py-2 hover:bg-accent"
              >
                Profile
              </Link>
            ) : (
              <Link
                href={"/login"}
                className="rounded-full px-4 py-2 hover:bg-accent"
              >
                Sign in
              </Link>
            )}
            {!hideWrite &&
              (isAuth ? (
                <Link
                  href="/blog/new"
                  className="rounded-full bg-primary px-4 py-2 text-primary-foreground"
                >
                  Write
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowWritePrompt(true)}
                  className="rounded-full bg-primary px-4 py-2 text-primary-foreground"
                >
                  Write
                </button>
              ))}
          </div>
        </div>
      </div>
      <Dialog open={showWritePrompt} onOpenChange={setShowWritePrompt}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-foreground">
              Create an account to start writing.
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
    </nav>
  );
};

export default Navbar;
