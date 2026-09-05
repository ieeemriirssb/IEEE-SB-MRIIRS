import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { site } from "@/data/site";

export function JoinCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-24 text-navy-foreground">
      <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
      <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" aria-hidden />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="container-page relative text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Become Part of the <span className="text-gradient-ieee">IEEE MRIIRS Community</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-navy-foreground/70">
            Join a global community of engineers, technologists, researchers and innovators.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="lg" className="group cursor-target">
              <a href={site.joinUrl} target="_blank" rel="noreferrer">
                Join IEEE <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outlineDark" size="lg" className="cursor-target">
              <a
                href="https://www.ieee.org/membership/students/index.html"
                target="_blank"
                rel="noreferrer"
              >
                Learn About Membership
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
