import { Award } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { achievements, site } from "@/data/site";

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Milestones worth marking"
        description="From chartering the branch to national hackathon finals and our first research publication."
      />

      <section className="py-24">
        <div className="container-page">
          <ol className="relative mx-auto max-w-3xl border-l border-border pl-8 sm:pl-12">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <li className="relative pb-12">
                  <span className="absolute -left-10.25 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-ieee text-primary-foreground shadow-lift sm:-left-10.25">
                    <Award className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {a.year}
                  </span>
                  <h2 className="mt-2 text-lg font-bold">{a.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
