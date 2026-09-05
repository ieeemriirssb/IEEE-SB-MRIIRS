"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Github, Linkedin, X } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { TeamCard } from "@/components/cards";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { team, type Member } from "@/data/site";

const teamGroups = ["Faculty", "Session 2026-27", "Session 2025-26"];

export default function TeamPage() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="Meet the People Behind IEEE"
        description="A faculty-guided, student-led team of volunteers who plan, build and run everything the branch does."
      />

      <section className="py-20">
        <div className="container-page space-y-20">
          {teamGroups.map((group) => {
            const members = team.filter((member) => member.group === group);

            if (!members.length) return null;

            return (
              <div key={group}>
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold sm:text-2xl">{group}</h2>

                  <span className="h-px flex-1 bg-border" />

                  <span className="text-sm text-muted-foreground">
                    {members.length}
                  </span>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.slug}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{
                        once: true,
                        margin: "-60px",
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                      }}
                    >
                      <TeamCard member={member} onOpen={setActive} />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name} profile`}
            className="fixed inset-0 z-100 flex items-center justify-center bg-navy/85 p-4 backdrop-blur"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.98,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-lift"
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close profile"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>

              <img
                src={active.image}
                alt={active.name}
                className="h-64 w-full object-contain"
              />

              <div className="p-7">
                <h3 className="text-xl font-bold">{active.name}</h3>

                <p className="mt-1 text-sm font-medium text-primary">
                  {active.position}
                </p>

                <p className="text-xs text-muted-foreground">
                  {active.department}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {active.bio}
                </p>

                <div className="mt-6 flex gap-3">
                  {active.linkedin && active.linkedin !== "#" && (
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${active.name} on LinkedIn`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}

                  {active.github && active.github !== "#" && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${active.name} on GitHub`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <JoinCTA />
    </>
  );
}
