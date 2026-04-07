"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData, user_service } from "@/context/AppContext";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, setUser, logoutUser } = useAppData();

  if (!user) return redirect("/login");

  const logoutHandler = () => {
    logoutUser();
  };
  const InputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    bio: user?.bio || "",
  });

  const clickHandler = () => {
    InputRef.current?.click();
  };

  const changeHandler = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.post<any>(
          `${user_service}/api/v1/user/update/pic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        setLoading(false);
        Cookies.set("token", data.token, {
          expires: 5,
          secure: true,
          path: "/",
        });
        setUser(data.user);
      } catch (error) {
        toast.error("Image Update Failed");
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post<any>(
        `${user_service}/api/v1/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setLoading(false);
      Cookies.set("token", data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      setUser(data.user);
      setOpen(false);
    } catch (error) {
      toast.error("Update Failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
      {loading ? (
        <Loading />
      ) : (
        <Card className="w-full max-w-lg rounded-3xl border border-border/60 bg-card/90 p-8 shadow-xl">
          <CardHeader className="items-center text-center space-y-3">
            <CardTitle className="font-serif text-2xl text-foreground">
              Profile
            </CardTitle>
            <Avatar
              className="h-28 w-28 border-4 border-background shadow-lg cursor-pointer"
              onClick={clickHandler}
            >
              <AvatarImage src={user?.image} alt="profile pic" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={InputRef}
                onChange={changeHandler}
              />
            </Avatar>
          </CardHeader>
          <CardContent className="mt-2 space-y-5 text-center">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Name
              </p>
              <p className="text-lg font-medium text-foreground">
                {user?.name}
              </p>
            </div>

            {user?.bio && (
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Bio
                </p>
                <p className="text-sm text-foreground/80">{user.bio}</p>
              </div>
            )}

            <div className="flex justify-center gap-3">
              {user?.instagram && (
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-pink-600 shadow-sm"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}

              {user?.facebook && (
                <a
                  href={user.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}

              {user?.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-700 shadow-sm"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button onClick={logoutHandler} className="px-6">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/blog/new")}
                className="px-6"
              >
                Add Blog
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant={"outline"} className="px-6">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-3">
                    <div>
                      <Label className="mb-2">Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Bio</Label>
                      <Input
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-2">instagram</Label>
                      <Input
                        value={formData.instagram}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instagram: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Facebook</Label>
                      <Input
                        value={formData.facebook}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            facebook: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-2">Linkedin</Label>
                      <Input
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            linkedin: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Button onClick={handleFormSubmit} className="w-full mt-4">
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
