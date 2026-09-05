"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { testimonials } from "@/data/site";
import { SectionHeading } from "@/components/common/SectionHeading";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index]!;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our community says"
          description="Students, faculty and industry partners on what the branch has meant to them."
          align="center"
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
            <Quote className="h-9 w-9 text-primary/30" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <p className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">
                  “{item.quote}”
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  {/* <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover"
                  /> */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 cursor-pointer rounded-full transition-all ${
                    i === index ? "w-8 bg-primary" : "w-3 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
