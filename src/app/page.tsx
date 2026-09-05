"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  BookOpen,
  Hammer,
  Network,
  Rocket,
  Trophy,
  TrendingUp,
  Volume2,
  VolumeX,
} from "lucide-react";
// import heroImage from "@/assets/hero-network.jpg";
import aboutImage from "@/assets/about-students.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatsCounter } from "@/components/common/StatsCounter";
import { BlogCard, EventCard, ProjectCard } from "@/components/cards";
import { JoinCTA } from "@/components/sections/JoinCTA";
// import { Newsletter } from "@/components/sections/Newsletter";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { posts, projects, site, stats, upcomingEvents } from "@/data/site";
import Lightfall from "@/components/Lightfall";

const whyCards = [
  {
    icon: BookOpen,
    title: "Learn Beyond the Classroom",
    body: "Participate in workshops, training programs, technical sessions, seminars, competitions, and hands-on learning opportunities designed to complement your academic journey.",
  },
  {
    icon: Hammer,
    title: "Turn Ideas into Innovation",
    body: "Get opportunities to work on projects, explore emerging technologies, collaborate with peers, and transform your ideas into practical solutions",
  },
  {
    icon: Network,
    title: "Connect with a Global Community",
    body: "Be part of one of the world's largest professional communities in technology and engineering, and connect with students, professionals, researchers, and innovators from around the world.",
  },
  {
    icon: Rocket,
    title: "Get Involved & Lead",
    body: "Take an active role in organizing events, managing initiatives, leading teams, and contributing to the growth of the IEEE Student Branch.",
  },
  {
    icon: Trophy,
    title: "Develop Skills That Matter",
    body: "Strengthen not only your technical knowledge but also your communication, teamwork, leadership, problem-solving, and project-management skills.",
  },
  {
    icon: TrendingUp,
    title: "Build Your Network",
    body: "Meet students from different disciplines, interact with industry professionals and experts, and build meaningful connections that can support your academic and professional growth.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };
  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-gradient-navy pt-32 text-navy-foreground"
      >
        <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />

        <motion.div
          style={{ scale: visualScale }}
          className="
          pointer-events-none max-lg:hidden absolute inset-0
          block
          lg:inset-y-0 lg:left-auto lg:right-0 lg:w-1/2
        "
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="
          h-full w-full
          object-cover
          object-center
          opacity-50
          sm:opacity-60
          lg:opacity-80
        "
          >
            <source src="videos/Intro.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div
            className="
        pointer-events-none absolute inset-0
        bg-gradient-to-b from-navy/80 via-navy/60 to-navy
        lg:bg-gradient-to-r lg:from-navy lg:via-navy/50 lg:to-transparent
        "
          />

          {/* Sound button */}
          <div
            className="
              pointer-events-auto absolute
              bottom-6 right-4 z-20
              sm:bottom-8 sm:right-6
              lg:bottom-8 lg:right-8
            "
          >
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
              className="
        cursor-target
        flex items-center gap-2
        rounded-full
        border border-cyan-300/40
        bg-primary/90
        px-3 py-2
        text-sm
        text-primary-foreground
        shadow-[0_0_10px_rgba(0,190,255,0.5),0_0_25px_rgba(0,190,255,0.3)]
        backdrop-blur-md
        transition-all duration-300
        hover:scale-105
        hover:shadow-[0_0_12px_rgba(0,210,255,0.9),0_0_35px_rgba(0,190,255,0.6)]
        sm:px-4 sm:py-2
        "
            >
              {isMuted ? (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Sound Off</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
        <div
          className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
          aria-hidden
        />

        <div className="container-page relative grid items-center gap-14 pb-28 lg:grid-cols-2 lg:pb-36">
          <motion.div style={{ y: contentY }}>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 px-4 py-1.5 text-xs font-semibold max-sm:mt-4 uppercase tracking-[0.18em] text-navy-foreground/80"
            >
              <span className="h-1.5 w-1.5 max-sm:w-3 rounded-full bg-primary" />
              {site.collegeName}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 text-4xl font-bold leading-[1.03] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Empowering Minds
              <span className="block text-gradient-ieee">
                Shaping the Future
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg"
            >
              {site.branchName} at {site.collegeName} - a student driven
              community empowering innovation, learning, and technological
              growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                variant="hero"
                size="lg"
                className="group cursor-target"
              >
                <Link href="/events">
                  Explore Events
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outlineDark"
                size="lg"
                className="cursor-target"
              >
                <a href={site.joinUrl} target="_blank" rel="noreferrer">
                  Join IEEE
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: fade }}
          className="absolute inset-x-0 bottom-8 flex justify-center"
        >
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-navy-foreground/60">
            Scroll to explore
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </span>
        </motion.div>
      </section>
      <section className="border-b border-border bg-surface py-16">
        <div className="container-page grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <p className="text-4xl font-bold text-gradient-ieee sm:text-5xl">
                <StatsCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="About the branch"
            title="Learn. Innovate. Impact"
            description="IEEE Student Branch MRIIRS is a community for students who want to learn beyond the classroom, explore emerging technologies, connect with like-minded peers, and turn ideas into meaningful impact.
As part of the IEEE community, you gain access to a global network dedicated to “Advancing Technology for Humanity”—while experiencing that community right here at MRIIRS.
"
          />
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
              <img
                src={aboutImage.src}
                alt="IEEE student members working together in a lab"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
        <div className="container-page mt-10">
          <Button
            asChild
            variant="hero"
            size="lg"
            className="group cursor-target"
          >
            <Link href="/about">
              Learn more{" "}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Membership"
            title="Why Join IEEE?"
            description="Six reasons students stay with the branch through their whole degree."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lift">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-ieee text-primary-foreground shadow-lift">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-6 text-lg font-bold">{c.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Events"
              title="What's Happening"
              description="Register early — technical sessions fill quickly."
            />
            <Button
              asChild
              variant="outline"
              className="group self-start cursor-target"
            >
              <Link href="/events">
                View all events
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.slice(0, 3).map((e, i) => (
              <Reveal key={e.slug} delay={i * 0.08}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Projects"
              title="Ideas Into Impact"
              description="Student-built systems, from campus IoT deployments to open-source security tooling."
            />
            <Button
              asChild
              variant="outline"
              className="group self-start cursor-target"
            >
              <Link href="/projects">
                All projects
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Blog"
              title="From our members"
              description="Technical writing by the students running the branch."
            />
            <Button
              asChild
              variant="outline"
              className="group self-start cursor-target"
            >
              <Link href="/blog">
                Read the blog
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <JoinCTA />
      <TestimonialCarousel />
      {/* <Newsletter /> */}
    </>
  );
}
