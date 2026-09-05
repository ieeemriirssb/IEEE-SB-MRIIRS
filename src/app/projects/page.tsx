"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { PageHeader } from "@/components/common/PageHeader";
import { ProjectCard } from "@/components/cards";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { projectCategories, projects, site } from "@/data/site";
import { cn } from "@/lib/utils";



export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const list = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Ideas Into Impact"
        description="Working systems built by student teams — deployed on campus, open sourced and documented."
      />

      <section className="py-20">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={cn(
                  "cursor-pointer cursor-target rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {list.length === 0 && (
            <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No projects in this category yet — propose one at our next technical meet.
            </p>
          )}
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
