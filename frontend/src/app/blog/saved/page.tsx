"use client";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/loading";
import { useAppData } from "@/context/AppContext";
import React from "react";

const SavedBlogs = () => {
  const { blogs, savedBlogs } = useAppData();

  if (!blogs || !savedBlogs) {
    return <Loading />;
  }

  const filteredBlogs = blogs.filter((blog) =>
    savedBlogs.some((saved) => saved.blogid === blog.id.toString())
  );

  return (
    <div className="mx-auto flex w-full max-w-[780px] flex-col gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Your Library
        </p>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          Saved stories
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Keep the articles you want to revisit later.
        </p>
      </div>
      <div className="space-y-2">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((e, i) => {
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
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 bg-card/70 p-10 text-center">
            <p className="font-serif text-xl text-foreground">
              No saved stories yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Start bookmarking your favorite reads.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedBlogs;
