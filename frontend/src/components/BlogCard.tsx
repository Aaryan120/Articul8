/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { Calendar } from "lucide-react";
import moment from "moment";

interface BlogCardProps {
  image: string;
  title: string;
  desc: string;
  id: string;
  time: string;
  author?: string;
  category?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  desc,
  id,
  time,
  author,
  category,
}) => {
  const readTime = Math.max(1, Math.round(desc.split(" ").length / 180));
  const authorLabel =
    author && author.length > 24 ? "Staff Writer" : author || "Staff Writer";
  return (
    <Link href={`/blog/${id}`}>
      <Card className="group !gap-0 !p-0 border-0 bg-transparent shadow-none">
        <div className="flex flex-col gap-4 border-b border-border/60 py-6 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                {category || "Editorial"}
              </span>
              <span className="font-medium text-foreground/80">{authorLabel}</span>
            </div>
            <h2 className="font-serif text-2xl leading-snug text-foreground">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {desc}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {moment(time).format("DD MMM YYYY")}
              </span>
              <span aria-hidden="true">•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
          <div className="sm:w-48">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
