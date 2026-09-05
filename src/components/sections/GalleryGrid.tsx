"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ZoomIn } from "lucide-react";

import { gallery, galleryCategories } from "@/data/site";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const items = gallery.filter((g) => filter === "All" || g.category === filter);
  const activeItem = gallery.find((g) => g.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all",
              filter === c
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              onClick={() => setActive(item.id)}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-border shadow-soft"
              aria-label={`Open ${item.caption}`}
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className={cn(
                  "w-full object-cover transition-transform duration-700 group-hover:scale-105",
                  item.tall ? "aspect-[3/4]" : "aspect-[4/3]",
                )}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/85 via-navy/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ZoomIn className="mb-2 h-5 w-5 text-navy-foreground" />
                <p className="text-left text-sm font-medium text-navy-foreground">{item.caption}</p>
                <p className="text-left text-xs text-navy-foreground/70">{item.category}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4 backdrop-blur"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.caption}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close preview"
              className="absolute right-5 top-5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-navy-foreground/25 text-navy-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] w-full max-w-4xl overflow-hidden rounded-3xl"
            >
              <img
                src={activeItem.src}
                alt={activeItem.caption}
                className="max-h-[74vh] w-full object-contain"
              />
              <figcaption className="bg-card px-6 py-4 text-sm text-foreground">
                {activeItem.caption}
                <span className="ml-2 text-muted-foreground">· {activeItem.category}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
