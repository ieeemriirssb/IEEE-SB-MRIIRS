"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, BookOpenText } from "lucide-react";

import { BlogCard } from "@/components/cards";
import { posts, site } from "@/data/site";

export default function PostPage() {
  const params = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-ieee transition-[width]"
        style={{ width: `${progress}%` }}
        aria-hidden
      />
      <section className="relative h-[46vh] min-h-72 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-navy-foreground/75 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold text-navy-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-navy-foreground/70">
            {post.author} · {post.date} · {post.readingTime}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              On this page
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {post.content.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${s.heading.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-2">
              <a
                href={post.link}
                aria-label={post.title}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <BookOpenText className="h-4 w-4" />
                <span>Read Blog</span>
              </a>
            </div>
          </aside>

          <article className="max-w-2xl">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            {post.content.map((s) => (
              <section
                key={s.heading}
                id={s.heading.toLowerCase().replace(/[^a-z]+/g, "-")}
              >
                <h2 className="mt-12 text-2xl font-bold">{s.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </section>
            ))}
            <div className="mt-14 rounded-3xl border border-border bg-card p-7 shadow-soft">
              <p className="text-sm font-semibold">Written by {post.author}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Member of the {site.branchName} at {site.collegeName}.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Related articles</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
