/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useAppData, user_service } from "@/context/AppContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import Loading from "@/components/loading";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const { isAuth, setIsAuth, loading, setLoading, setUser } = useAppData();

  if (isAuth) return redirect("/blogs");

  const responseGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result:any = await axios.post(`${user_service}/api/v1/login`, {
        code: authResult["code"],
      });

      Cookies.set("token", result.data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      toast.success(result.data.message);
      setIsAuth(true);
      setLoading(false);
      setUser(result.data.user);
    } catch (error) {
      console.log("error", error);
      toast.error("Problem while logging in");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-[rgba(255,214,170,0.35)] blur-3xl" />
            <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[rgba(255,255,255,0.8)] blur-3xl" />
          </div>
          <div className="relative z-10 grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Articul8 Journal
              </p>
              <h1 className="font-serif text-4xl text-foreground md:text-5xl">
                A quiet place for deep reading.
              </h1>
              <p className="max-w-md text-base text-muted-foreground md:text-lg">
                Follow your favorite authors, save meaningful essays, and build a
                writing practice that lasts.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border/60 px-3 py-1">
                  Save stories
                </span>
                <span className="rounded-full border border-border/60 px-3 py-1">
                  Follow authors
                </span>
                <span className="rounded-full border border-border/60 px-3 py-1">
                  Write with focus
                </span>
              </div>
            </div>
            <Card className="w-full max-w-md justify-self-center rounded-3xl border border-border/60 bg-card/90 p-3 shadow-xl">
              <CardHeader className="space-y-3 px-6 pb-3">
                <CardTitle className="font-serif text-3xl text-foreground">
                  Welcome back to Articul8
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Sign in to save stories, follow authors, and write your own.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-7">
                <Button
                  onClick={googleLogin}
                  className="w-full justify-between rounded-full px-5"
                >
                  Continue with Google
                  <img
                    src={"/google.png"}
                    className="h-6 w-6"
                    alt="google icon"
                  />
                </Button>
                <p className="mt-5 text-xs text-muted-foreground">
                  By continuing, you agree to our community guidelines and
                  thoughtful discourse.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
