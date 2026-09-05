"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/cards";
import { Reveal } from "@/components/common/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { events, site } from "@/data/site";

import { useParams, notFound } from "next/navigation";

export default function EventDetail() {
  const params = useParams<{ slug: string }>();
  const event = events.find((e) => e.slug === params.slug);
  if (!event) return notFound();
  const related = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[52vh] min-h-80 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/70 to-navy/40" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-navy-foreground/75 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {event.category}
          </span>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-navy-foreground sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-xl font-bold">About this event</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </Reveal>

            {event.speakers.length > 0 && (
              <Reveal>
                <h2 className="text-xl font-bold">Speakers</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {event.speakers.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
                    >
                      <User className="mt-0.5 h-5 w-5 text-primary" />
                      <span>
                        <span className="block text-sm font-semibold">
                          {s.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {s.role}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal>
              <h2 className="text-xl font-bold">Agenda</h2>
              <ol className="mt-4 space-y-3">
                {event.agenda.map((a) => (
                  <li
                    key={a.time}
                    className="flex gap-5 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft"
                  >
                    <span className="w-24 shrink-0 text-sm font-semibold text-primary">
                      {a.time}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {a.item}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="text-xl font-bold">Requirements</h2>
              <ul className="mt-4 space-y-2">
                {event.requirements.map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {r}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="text-xl font-bold">FAQs</h2>
              <Accordion type="single" collapsible className="mt-4">
                {event.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-sm font-semibold">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {event.status}
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{event.dateLabel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-primary" />
                  <span>{event.organizer}</span>
                </div>
              </dl>
              <Button
                asChild={!event.past}
                variant="hero"
                size="lg"
                className="group mt-7 w-full cursor-target"
                disabled={event.past}
              >
                {event.status =="Upcoming" ? (<span>Open Soon</span>):event.past ? (
                  <span>Event completed</span>
                ) : (
                  <a href={site.joinUrl} target="_blank" rel="noreferrer">
                    Register Now
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                IEEE members attend free. Questions? Write to {site.email}.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Related events</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
