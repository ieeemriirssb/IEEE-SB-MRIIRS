"use client";

import { useState } from "react";

import {
  Youtube,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Github,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      next.email = "Enter a valid email.";
    if (form.subject.trim().length < 3) next.subject = "Add a short subject.";
    if (form.message.trim().length < 10)
      next.message = "Tell us a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});

      toast.success("Message sent successfully!", {
        description: "We usually reply within two working days.",
      });
    } catch (error) {
      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const field =
    "h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25";

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something together"
        description="Collaborations, speaking invitations, sponsorships or membership questions — we'd love to hear from you."
      />

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[380px_1fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="text-lg font-bold">{site.branchName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {site.collegeName}
              </p>
              <div className="mt-6 space-y-4 text-sm">
                <p className="flex gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {site.address}
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <a
                    href={`mailto:${site.email}`}
                    className="text-primary hover:underline"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                {[
                  {
                    icon: Linkedin,
                    url: site.social.linkedin,
                    label: "LinkedIn",
                  },
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border shadow-soft cursor-target">
              <iframe
                title="Campus location map"
                loading="lazy"
                className="h-72 w-full"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              />
            </div>
          </div>

          <form
            onSubmit={submit}
            noValidate
            className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10"
          >
            <h2 className="text-xl font-bold">Send us a message</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={set("name")}
                  className={`mt-2 cursor-target ${field}`}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  className={`mt-2 cursor-target ${field}`}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={set("subject")}
                  className={`mt-2 cursor-target ${field}`}
                />
                {errors.subject && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.subject}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={set("message")}
                  className="mt-2 cursor-target w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="mt-8 cursor-target"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send />}
              Send message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
