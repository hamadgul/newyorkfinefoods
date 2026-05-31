"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

const field = "border-charcoal/20 bg-ivory/40 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:ring-1 focus:ring-gold/20";
const lbl = "block text-xs font-semibold uppercase tracking-widest text-charcoal/50";

export function EventInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-charcoal/8 bg-white p-10 text-center shadow-md">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-charcoal">Inquiry Submitted!</h3>
        <p className="mt-2 text-charcoal/70">Our events team is excited to help bring your vision to life. Expect a response within 24 hours.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6 rounded-2xl border border-charcoal/8 bg-white p-8 shadow-md sm:p-10"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const data = new FormData(e.currentTarget);
        data.append("_form_type", "Event Inquiry");
        try {
          const res = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (res.ok) {
            setSubmitted(true);
          } else {
            setError("Something went wrong. Please try again.");
          }
        } catch {
          setError("Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="border-b border-charcoal/8 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Catering</p>
        <h3 className="mt-1 font-heading text-2xl font-bold text-charcoal">Event Inquiry</h3>
        <p className="mt-1.5 text-sm text-charcoal/60">Tell us about your event and we&apos;ll prepare a custom proposal.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="e-name" className={lbl}>Name</Label>
          <Input id="e-name" name="name" placeholder="Your name" required className={field} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="e-email" className={lbl}>Email</Label>
          <Input id="e-email" name="email" type="email" placeholder="you@email.com" required className={field} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="e-date" className={lbl}>Preferred Date</Label>
          <Input id="e-date" name="event_date" type="date" required className={field} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="e-guests" className={lbl}>Expected Guests</Label>
          <Input id="e-guests" name="guests" type="number" placeholder="100" required className={field} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="e-type" className={lbl}>Event Type</Label>
        <Input id="e-type" name="event_type" placeholder="e.g. Wedding, Corporate, Party, Festival" required className={field} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="e-venue" className={lbl}>Venue / Location</Label>
        <Input id="e-venue" name="venue" placeholder="Venue name or address" className={field} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="e-details" className={lbl}>Tell Us More</Label>
        <Textarea id="e-details" name="details" placeholder="Your vision, theme, special requirements..." rows={4} className={field} />
      </div>
      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-gold-light hover:shadow-md hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? <span className="inline-flex items-center justify-center gap-2"><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</span> : "Submit Inquiry"}
      </button>
    </form>
  );
}
