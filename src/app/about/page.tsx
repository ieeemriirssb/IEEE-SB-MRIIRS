"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Eye,
  FlaskConical,
  Handshake,
  Lightbulb,
  Radio,
  Users,
  Cpu,
  BrainCircuit,
  Award,
  Search,
  MessageSquareQuote,
} from "lucide-react";

import aboutImage from "@/assets/Team.png";
import hero from "@/assets/hero.jpg";
import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { site } from "@/data/site";

const pillars = [
  {
    icon: FlaskConical,
    title: "Technical learning & research",
    body: "Workshops, reading groups and faculty-mentored research that take students from curiosity to publication.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & hackathons",
    body: "Rapid prototyping culture supported by project incubation, competitions and hands-on technical initiatives.",
  },
  {
    icon: Handshake,
    title: "Industry interaction",
    body: "Guest lectures, workshops and mentorship from engineers, researchers and professionals working across technology domains.",
  },
  {
    icon: Users,
    title: "Community & leadership",
    body: "Student-led initiatives that develop ownership, teamwork, communication, leadership and problem-solving skills.",
  },
];

const missionObjectives = [
  "Provide students with opportunities for technical and professional development.",
  "Bridge the gap between academic learning and real-world applications.",
  "Encourage innovation, research, and hands-on learning.",
  "Facilitate interaction with industry professionals, researchers, and experts.",
  "Develop leadership, teamwork, communication, and problem-solving skills.",
  "Create a collaborative environment where students can transform ideas into impactful solutions.",
];
const apFocus = [
  "Antennas & Propagation",
  "Electromagnetics",
  "RF & Microwave Engineering",
  "Wireless Communication",
  "Wearable & Reconfigurable Antennas",
  "Emerging Wireless Technologies",
];

const academicCollaborations = [
  "School of Computer Applications, MRIIRS",
  "School of Engineering & Technology, MRIIRS",
  "Department of Electronics & Communication Engineering",
  "Internal Quality Assurance Cell, MRIIRS",
];
const ieeeEngagements = [
  "IEEE Delhi Section",
  "IEEE Young Professionals Delhi Section",
  "IEEE Antennas & Propagation Society",
];
const focusAreas = [
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence & Machine Learning",
    description:
      "Exploring intelligent systems, machine learning, generative AI, and practical AI applications.",
  },
  {
    icon: Award,
    title: "Data Science & Analytics",
    description:
      "Developing skills in data analysis, visualization, business intelligence, and data-driven decision-making.",
  },
  {
    icon: Search,
    title: "Computer Vision",
    description:
      "Hands-on exploration of image processing, object detection, facial recognition, and computer vision applications.",
  },
  {
    icon: Cpu,
    title: "Internet of Things",
    description:
      "Learning connected systems, embedded programming, sensors, microcontrollers, and IoT applications through practical projects.",
  },
  {
    icon: Radio,
    title: "Antennas, RF & Wireless Communication",
    description:
      "Exploring antennas, electromagnetics, RF systems, propagation, and emerging wireless technologies through the IEEE AP-S chapter.",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description:
      "Encouraging research skills, publication awareness, emerging technology exploration, and practical innovation.",
  },
  {
    icon: Users,
    title: "Professional Development",
    description:
      "Building communication, teamwork, leadership, problem-solving, and industry-readiness through expert interactions and student-led initiatives.",
  },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <>
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div className="lg:px-28 lg:grid gap-10 bg-gradient-navy  lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* Content */}
        <div
          className=" max-lg:hidden grid-lines absolute inset-0 opacity-40"
          aria-hidden
        />

        <PageHeader
          eyebrow="About us"
          title="Building the Next Generation of Innovators"
          description={`The ${site.branchName} is a student-driven community at ${site.collegeName}, dedicated to fostering technical excellence, innovation, professional development, and leadership. Through workshops, expert talks, competitions, internships, industry interactions, and collaborative initiatives, the branch provides students with opportunities to learn, explore emerging technologies, and turn ideas into meaningful impact.`}
        />

        {/* Image */}
        <div className=" max-lg:hidden group overflow-hidden rounded-2xl  sm:rounded-3xl">
          <img
            src={hero.src}
            alt="IEEE student members working together in a lab"
            loading="lazy"
            className="
            aspect-4/3
          object-contain
          transition-transform
          duration-700
          group-hover:scale-105
          "
          />
        </div>
      </div>
      {/* =========================================================
          MISSION
      ========================================================= */}
      <section className="py-24">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div
            ref={ref}
            className="relative overflow-hidden rounded-3xl border border-border shadow-lift"
          >
            <motion.img
              style={{ y }}
              src={aboutImage.src}
              alt="Students collaborating in an engineering lab"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full scale-100 object-cover"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="Our mission"
              title="To empower MRIIRS students to innovate and lead in emerging technologies."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                    <p.icon className="h-6 w-6 text-primary" />

                    <h3 className="mt-4 text-base font-bold">{p.title}</h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Button
              asChild
              variant="hero"
              size="lg"
              className="group mt-8 cursor-target"
            >
              <Link href="/team">
                Meet the team
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION OBJECTIVES
      ========================================================= */}
      <section className="border-y border-border bg-surface py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we aim to achieve"
            title="Turning our mission into action"
            description="Our initiatives are designed to give students meaningful opportunities to learn, experiment, collaborate and grow."
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
            {missionObjectives.map((objective, index) => (
              <Reveal key={objective} delay={index * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {objective}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNEY & VISION
      ========================================================= */}
      <section className="py-24">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Our Journey */}
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Our Journey
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                  Growing through learning, innovation and collaboration
                </h2>

                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Founded in 2025
                  </strong>
                  , IEEE Student Branch MRIIRS was established to create a
                  dynamic platform where students can explore technology,
                  develop professional skills, collaborate with peers and
                  experts, and engage with the global IEEE community.
                </p>

                <p className="mt-5 text-base leading-8 text-muted-foreground">
                  Since its establishment, the branch has focused on building a
                  culture of{" "}
                  <strong className="font-semibold text-foreground">
                    learning, innovation, leadership, research, and
                    collaboration
                  </strong>{" "}
                  through technical and professional initiatives.
                </p>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal delay={0.1}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 md:p-10">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    Our Vision
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                    Empowering tomorrow&apos;s technology leaders
                  </h2>

                  <p className="mt-6 text-base leading-8 text-muted-foreground">
                    Our vision is to build a vibrant student community that
                    encourages curiosity, innovation, leadership, and continuous
                    learning, empowering students to become capable technology
                    leaders who create meaningful impact.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {["Curiosity", "Innovation", "Leadership", "Learning"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-border bg-background/60 px-3 py-3 text-center text-xs hover:-translate-y-1 hover:border-primary/40 font-semibold"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          COUNSELLOR MESSAGE
      ========================================================= */}
      <section className="border-y border-border bg-surface py-24">
        <div className="container-page">
          <Reveal>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <MessageSquareQuote className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                      Leadership message
                    </p>

                    <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                      Message from the Branch Counsellor
                    </h2>
                  </div>
                </div>

                <blockquote className="mt-8 border-l-2 border-primary/40 pl-6 text-base leading-8 text-muted-foreground md:text-lg">
                  IEEE Student Branch MRIIRS provides students with a platform
                  to explore beyond the classroom, engage with emerging
                  technologies, and develop the skills needed to thrive in a
                  rapidly evolving world. Through learning, collaboration, and
                  innovation, we encourage our students to grow into confident
                  professionals and responsible technology leaders.
                </blockquote>

                <div className="mt-8">
                  <p className="font-bold text-foreground">
                    — Er. Sunita Joshi
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    IEEE Student Branch Counsellor, MRIIRS
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Chapters & Societies */}
      <section className="border-y border-border bg-surface py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="IEEE Chapters & Societies"
            title="Connecting students with specialised technical communities"
            description="Our student branch works within the wider IEEE ecosystem, providing students with opportunities for technical learning, research, professional development, and collaboration."
            align="center"
          />

          <div className="mt-14">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="bg-primary/5 p-8 lg:p-10">
                    <div className="inline-flex rounded-2xl bg-primary/10 p-3">
                      <Radio className="h-7 w-7 text-primary" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">
                      IEEE Antennas and Propagation Society Student Branch
                      Chapter
                    </h3>

                    <p className="mt-5 leading-relaxed text-muted-foreground">
                      The IEEE Antennas and Propagation Society (AP-S) Student
                      Branch Chapter at MRIIRS operates under the IEEE Student
                      Branch and focuses on education, research, and
                      professional development in antennas, electromagnetic wave
                      propagation, RF and microwave engineering, and modern
                      wireless communication systems.
                    </p>
                  </div>

                  <div className="p-8 lg:p-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Key Areas
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {apFocus.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-border bg-surface p-4 text-sm font-medium hover:-translate-y-1 hover:border-primary/40"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <p className="mt-8 leading-relaxed text-muted-foreground">
                      The chapter conducts technical sessions, expert talks,
                      hands-on activities, student competitions, and
                      research-oriented initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Collaborations & Partnerships"
            title="Building bridges across academia, IEEE and industry"
            description="IEEE Student Branch MRIIRS actively works across academic, professional, and industry ecosystems to provide students with broader learning and networking opportunities."
            align="center"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-primary/40 shadow-soft">
                <div className="inline-flex rounded-xl bg-primary/10 p-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Academic Collaborations
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Collaborations with departments and academic units within
                  MRIIRS help create interdisciplinary learning opportunities.
                </p>

                <div className="mt-6 space-y-3">
                  {academicCollaborations.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-surface p-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  The branch's Expert Talk Series on research and publication
                  was conducted with participation from the School of Computer
                  Applications and the Internal Quality Assurance Cell.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-primary/40 shadow-soft">
                <div className="inline-flex rounded-xl bg-primary/10 p-3">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-5 text-xl font-bold">IEEE Community</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The branch operates within the wider IEEE ecosystem and
                  engages with professional communities and societies.
                </p>

                <div className="mt-6 space-y-3">
                  {ieeeEngagements.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-surface p-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  The branch has also been involved in the IEEE YP Delhi Summit
                  1.0, serving as an organizing partner alongside the IEEE Young
                  Professionals Delhi Section.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-primary/40 shadow-soft">
                <div className="inline-flex rounded-xl bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Industry & Professional Engagement
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Industry professionals, trainers, researchers, and domain
                  experts contribute to the branch’s programs through:
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Expert talks",
                    "Technical workshops",
                    "Internship and training programs",
                    "Industry-oriented sessions",
                    "Research and publication sessions",
                    "Emerging technology initiatives",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl hover:-translate-y-1 hover:border-primary/40 border border-border p-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Technical Focus Areas */}
      <section className="border-y border-border bg-surface py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Key Areas of Technical Focus"
            title="Explore. Experiment. Build."
            description="Our initiatives span emerging technologies, research, innovation, and professional development, giving students multiple pathways to discover their interests."
            align="center"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, index) => (
              <Reveal key={area.title} delay={index * 0.06}>
                <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:scale-110">
                    <area.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold">{area.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          JOIN CTA
      ========================================================= */}
      <JoinCTA />
    </>
  );
}
