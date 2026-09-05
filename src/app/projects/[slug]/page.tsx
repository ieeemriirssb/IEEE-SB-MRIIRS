"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards";
import { projects, site } from "@/data/site";



import { useParams, notFound } from "next/navigation";



export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[46vh] min-h-72 overflow-hidden">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-navy-foreground/75 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {project.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-navy-foreground sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{project.description}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">{project.longDescription}</p>
          </div>
          <aside className="space-y-8 rounded-3xl border border-border bg-card p-7 shadow-soft lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Technologies
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Team
              </h2>
              <ul className="mt-3 space-y-1 text-sm">
                {project.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="hero" className="cursor-target">
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github /> View source
                </a>
              </Button>
              {project.demo && (
                <Button asChild variant="outline" className="cursor-target">
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <ExternalLink /> Live demo
                  </a>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold">More projects</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
