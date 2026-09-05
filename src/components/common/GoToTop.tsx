"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function GoToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            width: hovered ? 145 : 48,
          }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          whileTap={{ scale: 0.92 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            group  fixed bottom-6 right-6 z-50
            flex h-12 items-center
            overflow-hidden
            rounded-full
            border border-cyan-300/40
            bg-primary
            text-primary-foreground
            shadow-[0_0_10px_rgba(0,190,255,0.5),0_0_25px_rgba(0,190,255,0.3)]
            hover:shadow-[0_0_12px_rgba(0,210,255,0.9),0_0_35px_rgba(0,190,255,0.6)]
            cursor-pointer
          "
        >
          {/* Shiny sweep */}
          <motion.span
            className="
              pointer-events-none absolute inset-y-0 -left-10 w-8
              rotate-[20deg]
              bg-white/40 blur-md
            "
            animate={{
              left: ["-20%", "120%"],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* Icon */}
          <span className="relative flex h-12 w-12 shrink-0  items-center justify-center">
            <ArrowUp
              className="
                h-5 w-5
                transition-all duration-300
                group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]
              "
            />
          </span>

          {/* Hover text */}
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : -8,
            }}
            transition={{ duration: 0.2 }}
            className="
              relative whitespace-nowrap pr-5
              text-sm font-semibold tracking-wide
            "
          >
            Back to top
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
