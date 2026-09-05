"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px]">
      {/* Main glowing line */}
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{
          width: progressPercent,
          background: "linear-gradient(90deg, #00aeea, #22d3ee, #ffffff)",
          boxShadow:
            "0 0 5px #00bfff, 0 0 12px #00bfff, 0 0 25px rgba(0,191,255,0.8)",
        }}
      />

      {/* Shining tip */}
      <motion.div
        className="absolute top-0 h-[3px] w-20"
        style={{
          left: progressPercent,
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, transparent, white, transparent)",
          filter: "blur(1px)",
        }}
      />
    </div>
  );
}
