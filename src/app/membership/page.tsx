"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Percent,
  Trophy,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Globe2,
    title: "Global Professional Network",
    description:
      "Connect with IEEE members, students, researchers, and professionals from around the world and build meaningful academic and professional relationships.",
  },
  {
    icon: BookOpen,
    title: "Technical Knowledge & Resources",
    description:
      "Stay updated with the latest developments in technology through IEEE publications, technical content, IEEE Xplore, IEEE Potentials, IEEE Spectrum, and other learning resources.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Career Development",
    description:
      "Access educational resources, professional-development programmes, mentoring opportunities, courses, and career tools designed to help students prepare for their professional journey.",
  },
  {
    icon: Trophy,
    title: "Competitions, Scholarships & Awards",
    description:
      "Explore opportunities such as IEEEXtreme, scholarships, awards, fellowships, and student travel grants that can help you develop your skills and gain recognition.",
  },
  {
    icon: Handshake,
    title: "Mentorship & Collaboration",
    description:
      "Learn directly from experienced engineers and technologists, collaborate with fellow IEEE members, and find communities aligned with your technical interests.",
  },
  {
    icon: Users,
    title: "Conferences & Events",
    description:
      "Participate in IEEE conferences, seminars, workshops, competitions, and student activities while gaining exposure to new technologies and professional communities.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career Opportunities",
    description:
      "Access IEEE career resources, job opportunities, professional networking, and tools that can help you transition from student life into your chosen profession.",
  },
  {
    icon: Percent,
    title: "Exclusive Member Discounts",
    description:
      "IEEE members receive discounts on selected conferences, publications, books, continuing-education courses, and other IEEE products and services.",
  },
  {
    icon: HeartHandshake,
    title: "Make an Impact",
    description:
      'Volunteer through your local Student Branch, participate in technical and community initiatives, and contribute to IEEE\'s mission of "Advancing Technology for Humanity."',
  },
];

const steps = [
  {
    number: "01",
    title: "Create an IEEE Account",
    description:
      "Visit IEEE and create your account or sign in if you already have one.",
  },
  {
    number: "02",
    title: "Choose Student Membership",
    description:
      "Select IEEE Student Membership and review the available membership options.",
  },
  {
    number: "03",
    title: "Complete Your Details",
    description:
      "Provide your academic and personal information and select your institution.",
  },
  {
    number: "04",
    title: "Become an IEEE Member",
    description:
      "Complete the membership process and start exploring the benefits available to you.",
  },
];

const localBenefits = [
  "Technical workshops and expert sessions",
  "Training and internship opportunities",
  "Student-led technical projects",
  "Professional networking",
  "Leadership and volunteering opportunities",
  "Community and CSR initiatives",
];

export default function MembershipPage() {
  return (
    <div className="">
      <PageHeader
        eyebrow="IEEE Membership"
        title="Build Your Future With IEEE"
        description="Join a global community of technology professionals, researchers, and students while gaining opportunities to learn, collaborate, build your network, and advance your career."
      />

      {/* Intro */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-page px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
                Why IEEE?
              </span>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                More than a membership
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8">
                IEEE membership gives students access to a worldwide
                professional community and the resources needed to grow
                technically, professionally, and personally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container-page px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
              Membership Benefits
            </p>

            <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Opportunities that move you forward
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.article
                  key={benefit.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    margin: "-60px",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  className="group h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift sm:rounded-3xl sm:p-6 md:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 text-base font-bold leading-6 sm:mt-6 sm:text-lg">
                    {benefit.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local Student Branch Benefits */}
      <section className="border-y border-border bg-muted/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-page px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
                IEEE SB MRIIRS
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Grow with your local IEEE community
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base">
                Being an IEEE member also gives you the opportunity to get
                involved with IEEE Student Branch MRIIRS and participate in
                activities designed around learning, innovation, leadership, and
                collaboration.
              </p>

              <Link
                href="/events"
                className="group mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 sm:mt-7"
              >
                Explore our events
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2">
              {localBenefits.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift sm:gap-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>

                  <p className="text-sm font-medium leading-6">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container-page px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm sm:tracking-[0.2em]">
              How to Join
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Start your IEEE journey
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:mt-4 sm:text-base">
              Becoming a member is simple. Follow these steps to get started.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 md:mt-12 md:gap-6 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                }}
                className="relative h-full rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift sm:rounded-3xl sm:p-6 md:p-7"
              >
                <span className="text-3xl font-black text-primary/20 sm:text-4xl">
                  {step.number}
                </span>

                <h3 className="mt-4 text-base font-bold leading-6 sm:mt-5 sm:text-lg">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="https://www.ieee.org/membership/join/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-target min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:w-auto sm:px-6"
            >
              Join IEEE
              <ArrowRight className="h-4 w-4" />
            </a>

            <Button
              asChild
              variant="outlineDark"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a
                href="https://www.ieee.org/membership/students/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sm:hidden">Learn More</span>
                <span className="hidden sm:inline cursor-target">
                  Learn More About Membership
                </span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
