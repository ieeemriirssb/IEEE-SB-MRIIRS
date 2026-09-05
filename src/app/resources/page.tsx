
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { resources, site } from "@/data/site";



export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Everything we recommend, in one place"
        description="Curated by our technical team — the research access, learning paths and career material we actually use."
      />

      <section className="py-20">
        <div className="container-page space-y-16">
          {resources.map((group) => (
            <div key={group.group}>
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold sm:text-2xl">{group.group}</h2>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.05}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base font-bold">{item.title}</h3>
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
