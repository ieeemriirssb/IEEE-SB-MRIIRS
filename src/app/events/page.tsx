"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import { Search } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EventCard } from "@/components/cards";
// import { Newsletter } from "@/components/sections/Newsletter";
import { eventCategories, pastEvents, site, upcomingEvents } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 3;

export default function EventsPage() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filteredUpcoming = useMemo(
    () =>
      upcomingEvents.filter((e) => filter === "All" || e.category === filter),
    [filter],
  );

  const filteredPast = useMemo(
    () =>
      [...pastEvents]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .filter(
          (e) =>
            (filter === "All" || e.category === filter) &&
            (e.title + e.excerpt).toLowerCase().includes(query.toLowerCase()),
        ),
    [filter, query],
  );

  return (
    <>
      <PageHeader
        eyebrow="What's happening"
        title="Events, Workshops & Competitions"
        description="Hands-on technical programming run by students, for students — from beginner bootcamps to 24-hour hackathons."
      />

      <section className="py-20">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((c) => (
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
              {filteredUpcoming.map((e, i) => (
                <motion.div
                  key={e.slug}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <EventCard event={e} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filteredUpcoming.length === 0 && (
            <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No upcoming events in this category yet. Check the archive below.
            </p>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-surface py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Archive"
              title="Past Events"
              description="Recaps, participation numbers and materials from everything we've run."
            />
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="event-search" className="sr-only">
                Search past events
              </label>
              <input
                id="event-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search past events"
                className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredPast.slice(0, visible).map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
          {filteredPast.length === 0 && (
            <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No past events match your search.
            </p>
          )}
          {visible < filteredPast.length && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="cursor-target"
              >
                Load more events
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* <Newsletter /> */}
    </>
  );
}
