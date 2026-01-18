"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppData } from "@/context/AppContext";
import { Filter } from "lucide-react";
import React from "react";

const Blogs = () => {
  const { toggleSidebar } = useSidebar();
  const { loading, blogLoading, blogs } = useAppData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto flex w-full max-w-[780px] flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Articul8 Journal
              </p>
              <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
                Latest stories & thoughtful essays
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                A calm space for deep reading and fresh perspectives.
              </p>
            </div>
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <Filter size={18} />
              <span>Filter</span>
            </Button>
          </div>
          {blogLoading ? (
            <Loading />
          ) : (
            <div className="space-y-2">
              {blogs?.length === 0 && (
                <div className="rounded-3xl border border-dashed border-border/70 bg-card/70 p-10 text-center">
                  <p className="font-serif text-xl text-foreground">
                    No stories yet.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Check back soon for new writing.
                  </p>
                </div>
              )}
              {blogs &&
                blogs.map((e, i) => {
                  return (
                    <BlogCard
                      key={i}
                      image={e.image}
                      title={e.title}
                      desc={e.description}
                      id={e.id}
                      time={e.created_at}
                      author={e.author}
                      category={e.category}
                    />
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
