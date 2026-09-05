import Link from "next/link";
import {
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Github,
} from "lucide-react";
import IEEE_Logo from "@/assets/IEEE_Logo.png";

import { site } from "@/data/site";
import Image from "next/image";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Team", to: "/team" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

const external = [
  { label: "IEEE.org", url: "https://www.ieee.org" },
  { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org" },
  { label: "IEEE Spectrum", url: "https://spectrum.ieee.org" },
  { label: "IEEE Learning Network", url: "https://iln.ieee.org" },
];

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-navy-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <div className="relative h-19 w-19 shrink-0">
              <Image
                src={IEEE_Logo}
                alt="IEEE Student Branch MRIIRS"
                priority
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-sm font-bold leading-tight">
              {site.branchName}
              <span className="block text-[11px] font-normal uppercase tracking-[0.16em] opacity-70">
                {site.collegeName}
              </span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-navy-foreground/70">
            A student-led technical community advancing technology for humanity
            through workshops, research, projects and professional development.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { icon: Linkedin, url: site.social.linkedin, label: "LinkedIn" },
              {
                icon: Instagram,
                url: site.social.instagram,
                label: "Instagram",
              },
              { icon: Youtube, url: site.social.youtube, label: "Youtube" },
              { icon: Github, url: site.social.github, label: "X" },
            ].map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-foreground/20 text-navy-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-foreground/60">
            Navigation
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((l) => (
              <li key={l.to}>
                <Link
                  href={l.to}
                  className="text-navy-foreground/75 transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-foreground/60">
            Resources
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {external.map((l) => (
              <li key={l.label}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-navy-foreground/75 transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-foreground/60">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-navy-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-primary"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.branchName}, {site.collegeName}.
            All Rights Reserved.
          </p>
          <p>Designed &amp; Developed by Arpit Kansal, {site.branchName}</p>
        </div>
      </div>
    </footer>
  );
}
