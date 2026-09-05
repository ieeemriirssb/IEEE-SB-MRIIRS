"use client";

import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!valid) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're subscribed", {
        description: "We'll send event announcements to your inbox.",
      });
    }, 800);
  };

  return (
    <section className="border-y border-border bg-surface py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-ieee text-primary-foreground shadow-lift">
            <Mail className="h-5 w-5" />
          </span>
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Stay Connected</h2>
          <p className="mt-4 text-muted-foreground">
            Get updates about upcoming events, workshops, competitions and opportunities.
          </p>
          <form onSubmit={submit} noValidate className="mx-auto mt-8 max-w-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-invalid={!!error}
                  className="h-12 w-full rounded-full border border-border bg-background px-5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Send />}
                Subscribe
              </Button>
            </div>
            {error && (
              <p role="alert" className="mt-3 animate-in fade-in text-left text-sm text-destructive">
                {error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
