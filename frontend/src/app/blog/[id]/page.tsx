/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  author_service,
  Blog,
  blog_service,
  useAppData,
  User,
} from "@/context/AppContext";
import axios from "axios";
import {
  Bookmark,
  BookmarkCheck,
  Edit,
  Heart,
  Share2,
  Trash2,
  Trash2Icon,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface Comment {
  id: string;
  userid: string;
  comment: string;
  create_at: string;
  username: string;
}

const BlogPage = () => {
  const { isAuth, user, fetchBlogs, savedBlogs, getSavedBlogs } = useAppData();
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);

  async function fetchComment() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/comment/${id}`);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComment();
  }, [id]);

  const [comment, setComment] = useState("");

  async function addComment() {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${blog_service}/api/v1/comment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setComment("");
      fetchComment();
    } catch (error) {
      toast.error("Problem while adding comment");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSingleBlog() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/blog/${id}`);
      setBlog(data.blog);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const deleteComment = async (id: string) => {
    if (confirm("Are you sure you want to delete this comment")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.delete(
          `${blog_service}/api/v1/comment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        fetchComment();
      } catch (error) {
        toast.error("Problem while deleting comment");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  async function deletBlog() {
    if (confirm("Are you sure you want to delete this blog")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.delete(
          `${author_service}/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        router.push("/blogs");
        setTimeout(() => {
          fetchBlogs();
        }, 4000);
      } catch (error) {
        toast.error("Problem while deleting comment");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (savedBlogs && savedBlogs.some((b) => b.blogid === id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedBlogs, id]);

  async function saveBlog() {
    const token = Cookies.get("token");
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${blog_service}/api/v1/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setSaved(!saved);
      getSavedBlogs();
    } catch (error) {
      toast.error("Problem while saving blog");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (!blog) {
    return <Loading />;
  }

  const createdAt = new Date(blog.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const contentText = blog.blogcontent
    ? blog.blogcontent.replace(/<[^>]*>/g, " ")
    : blog.description;
  const readTime = Math.max(
    1,
    Math.round(contentText.split(/\s+/).length / 180)
  );

  const shareBlog = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: blog.title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="mx-auto w-full max-w-[780px] px-4 pb-20 pt-8">
        <article className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {blog.category}
            </p>
            <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link
                className="flex items-center gap-2 text-foreground"
                href={`/profile/${author?._id}`}
              >
                <img
                  src={author?.image}
                  className="h-9 w-9 rounded-full object-cover"
                  alt={author?.name}
                />
                <span className="font-medium">{author?.name}</span>
              </Link>
              <span aria-hidden="true">•</span>
              <span>{createdAt}</span>
              <span aria-hidden="true">•</span>
              <span>{readTime} min read</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:hidden">
              {isAuth && (
                <Button variant="outline" onClick={saveBlog} disabled={loading}>
                  {saved ? <BookmarkCheck /> : <Bookmark />}
                  {saved ? "Saved" : "Save"}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setLiked((prev) => !prev)}
              >
                <Heart className={liked ? "fill-current" : ""} />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" onClick={shareBlog}>
                <Share2 />
                Share
              </Button>
              {blog.author === user?._id && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/blog/edit/${id}`)}
                  >
                    <Edit />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={deletBlog}
                    disabled={loading}
                  >
                    <Trash2Icon />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/60 shadow-sm">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-72 w-full object-cover md:h-96"
            />
          </div>

          <p className="text-lg text-foreground/80">{blog.description}</p>
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: blog.blogcontent }}
          />
        </article>

        {isAuth && (
          <section className="mt-12 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm">
            <h3 className="font-serif text-2xl text-foreground">
              Join the discussion
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share a thoughtful response with the community.
            </p>
            <div className="mt-4 space-y-3">
              <Label htmlFor="comment">Your comment</Label>
              <Input
                id="comment"
                placeholder="Write your response..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={addComment} disabled={loading}>
                {loading ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </section>
        )}

        <section className="mt-10 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h3 className="font-serif text-2xl text-foreground">Comments</h3>
          <div className="mt-4 space-y-4">
            {comments && comments.length > 0 ? (
              comments.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-4"
                  >
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <span className="rounded-full border border-border/70 p-1 text-muted-foreground">
                          <User2 />
                        </span>
                        {e.username}
                      </p>
                      <p className="mt-2 text-sm text-foreground/80">
                        {e.comment}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {new Date(e.create_at).toLocaleString()}
                      </p>
                    </div>
                    {e.userid === user?._id && (
                      <Button
                        onClick={() => deleteComment(e.id)}
                        variant="ghost"
                        disabled={loading}
                      >
                        <Trash2 />
                      </Button>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                No comments yet. Be the first to respond.
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="fixed right-8 top-1/3 hidden flex-col gap-3 xl:flex">
        {isAuth && (
          <Button variant="outline" onClick={saveBlog} disabled={loading}>
            {saved ? <BookmarkCheck /> : <Bookmark />}
          </Button>
        )}
        <Button variant="outline" onClick={() => setLiked((prev) => !prev)}>
          <Heart className={liked ? "fill-current" : ""} />
        </Button>
        <Button variant="outline" onClick={shareBlog}>
          <Share2 />
        </Button>
      </div>
    </div>
  );
};

export default BlogPage;
