"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import IEEE_Logo from "@/assets/IEEE_Logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const transparent = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        transparent ? "bg-transparent py-3" : "glass-panel py-2 shadow-soft",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="container-page flex items-center justify-between gap-4 lg:px-0"
      >
        <Link
          href="/"
          className={cn(
            "group flex items-center gap-3 py-2",
            transparent ? "text-navy-foreground" : "text-foreground",
          )}
        >
          <div className="relative h-19 w-19 shrink-0">
            <Image
              src={IEEE_Logo}
              alt="IEEE Student Branch MRIIRS"
              priority
              className="object-contain rounded-full"
            />
          </div>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">
              {site.branchName}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.16em] opacity-70">
              Learn. Innovate. Impact
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => {
            const isActive =
              l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <li key={l.to}>
                <Link
                  href={l.to}
                  className={cn(
                    "relative inline-flex items-center cursor-target rounded-full px-3 py-2 text-sm font-medium leading-none transition-colors",
                    transparent
                      ? "text-navy-foreground/80 hover:text-navy-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    isActive &&
                      (transparent
                        ? "text-navy-foreground after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-current"
                        : "text-primary after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary"),
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle
            className={transparent ? "text-navy-foreground" : "text-foreground"}
          />
          <Button
            asChild
            variant="hero"
            size="sm"
            className="hidden cursor-target sm:inline-flex"
          >
            <a href={site.joinUrl} target="_blank" rel="noreferrer">
              Join IEEE{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/20 xl:hidden",
              transparent ? "text-navy-foreground" : "text-foreground",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="container-page mt-3 grid gap-1 rounded-2xl border border-border bg-card p-3 shadow-soft">
              {navLinks.map((l, i) => {
                const isActive =
                  l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      href={l.to}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent",
                        isActive && "bg-accent text-primary",
                      )}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="pt-2">
                <Button asChild variant="hero" className="w-full">
                  <a href={site.joinUrl} target="_blank" rel="noreferrer">
                    Join IEEE <ArrowRight />
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
