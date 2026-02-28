"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "./ui/sidebar";
import { Input } from "./ui/input";
import { SlidersHorizontal } from "lucide-react";
import { blogCategories, useAppData } from "@/context/AppContext";

const SideBar = () => {
  const { debouncedQuery, category, setDebouncedQuery, setCategory } =
    useAppData();

  return (
    <Sidebar
      side="right"
      variant="floating"
      collapsible="offcanvas"
      className="top-16 h-[calc(100vh-4rem)]"
    >
      <SidebarHeader className="gap-1 border-b border-border/60 bg-sidebar/80 px-4 py-5">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <SlidersHorizontal size={16} />
          Refine feed
        </div>
        <p className="text-xs text-muted-foreground">
          Focus your reading with search and topics.
        </p>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar/80 px-4 pb-6">
        <SidebarGroup className="gap-3">
          <SidebarGroupLabel className="text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
            Search
          </SidebarGroupLabel>
          <Input
            type="text"
            value={debouncedQuery}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (value) setDebouncedQuery(e.target.value);
              else setDebouncedQuery("");
            }}
            placeholder="Search stories, topics, or authors"
          />

          <SidebarGroupLabel className="mt-4 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
            Categories
          </SidebarGroupLabel>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("")}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                category === ""
                  ? "border-foreground/20 bg-foreground/10 text-foreground"
                  : "border-border/70 bg-background/80 text-foreground hover:border-foreground/20 hover:bg-foreground/5"
              }`}
            >
              All
            </button>
            {blogCategories?.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
                  category === item
                    ? "border-foreground/20 bg-foreground/10 text-foreground"
                    : "border-border/70 bg-background/80 text-foreground hover:border-foreground/20 hover:bg-foreground/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
