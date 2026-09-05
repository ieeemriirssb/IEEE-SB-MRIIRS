import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Github,
  Linkedin,
  MapPin,
  Users,
} from "lucide-react";
import type { EventItem, Member, Post, Project } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CategoryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
      {children}
    </span>
  );
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <CategoryPill>{event.category}</CategoryPill>
        </div>
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur",
            event.status === "Completed"
              ? "bg-navy/70 text-navy-foreground"
              : "bg-background/85 text-primary",
          )}
        >
          {event.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.excerpt}
        </p>
        <dl className="mt-5 grid gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{event.dateLabel}</span>
          </div>
          {/* <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div> */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
          {event.participants && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{event.participants} participants</span>
            </div>
          )}
        </dl>
        <div className="mt-6 flex-1" />
        <Button
          asChild
          variant={event.past ? "outline" : "hero"}
          className="w-full cursor-target"
        >
          <Link href={`/events/${event.slug}`}>
            {event.status == "Upcoming"
              ? "View Event Details"
              : event.past
                ? "View Recap"
                : "Register Now"}
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <CategoryPill>{project.category}</CategoryPill>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((t) => (
            <li
              key={t}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary cursor-target"
          >
            View project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <CategoryPill>{post.category}</CategoryPill>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span aria-hidden>•</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {post.author}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary cursor-target"
          >
            Read{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function TeamCard({
  member,
  onOpen,
}: {
  member: Member;
  onOpen: (m: Member) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onOpen(member)}
        className="block w-full cursor-pointer text-left"
        aria-label={`View profile of ${member.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/85 to-transparent opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-navy-foreground">
            <h3 className="text-xl text-center font-bold">{member.name}</h3>
            <p className="text-md text-center uppercase tracking-[0.14em] opacity-80">
              {member.position}
            </p>
            {member.membershipId && (
              <p className="text-md text-center uppercase tracking-[0.14em] opacity-80">
                Id: {member.membershipId}
              </p>
            )}
          </div>
        </div>
      </button>
      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-xs text-muted-foreground">{member.department}</p>
        <div className="flex gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              aria-label={`${member.name} on LinkedIn`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              aria-label={`${member.name} on GitHub`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
