"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

const field = "border-charcoal/20 bg-ivory/40 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:ring-1 focus:ring-gold/20";
const lbl = "block text-xs font-semibold uppercase tracking-widest text-charcoal/50";
const sel = "h-10 w-full rounded-md border border-charcoal/20 bg-ivory/40 px-3 py-2 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20";

export function MobileBarInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-charcoal/8 bg-white p-10 text-center shadow-md">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-charcoal">Quote Request Received!</h3>
        <p className="mt-2 text-charcoal/70">Our bar team will review your details and get back to you within 24 hours.</p>
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
        data.append("_form_type", "Mobile Bar Inquiry");
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Mobile Bar</p>
        <h3 className="mt-1 font-heading text-2xl font-bold text-charcoal">Request a Bar Quote</h3>
        <p className="mt-1.5 text-sm text-charcoal/60">Tell us about your event and we&apos;ll build a custom quote.</p>
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="mb-name" className={lbl}>Name</Label>
          <Input id="mb-name" name="name" placeholder="Your name" required className={field} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="mb-email" className={lbl}>Email</Label>
          <Input id="mb-email" name="email" type="email" placeholder="you@email.com" required className={field} />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="mb-phone" className={lbl}>Phone</Label>
        <Input id="mb-phone" name="phone" type="tel" placeholder="(555) 000-0000" className={field} />
      </div>

      {/* Date + Guests */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="mb-date" className={lbl}>Event Date</Label>
          <Input id="mb-date" name="event_date" type="date" required className={field} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="mb-guests" className={lbl}>Number of Guests</Label>
          <Input id="mb-guests" name="guests" type="number" placeholder="75" min={1} required className={field} />
          <p className="text-xs text-charcoal/40">30 guest minimum</p>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <Label htmlFor="mb-location" className={lbl}>Event Location / Venue</Label>
        <Input id="mb-location" name="location" placeholder="Address or venue name" required className={field} />
      </div>

      {/* Package interest */}
      <div className="space-y-1.5">
        <Label htmlFor="mb-package" className={lbl}>Package Interest</Label>
        <select id="mb-package" name="package_interest" className={sel}>
          <option value="">Select a package...</option>
          <optgroup label="Full Open Bar (We Supply All Alcohol)">
            <option value="Full Open Bar – Beer &amp; Wine Only ($26/person)">Beer &amp; Wine Only — $26/person</option>
            <option value="Full Open Bar – Standard ($34/person)">Standard Open Bar — $34/person</option>
            <option value="Full Open Bar – Premium ($45/person)">Premium Open Bar — $45/person (Most Popular)</option>
            <option value="Full Open Bar – Ultra-Premium ($62/person)">Ultra-Premium Open Bar — $62/person</option>
          </optgroup>
          <optgroup label="Service Only / Dry Hire (You Supply Alcohol)">
            <option value="Service Only – Basic ($22/person)">Basic Service — $22/person</option>
            <option value="Service Only – Standard ($28/person)">Standard Service — $28/person (Most Popular)</option>
            <option value="Service Only – Premium ($35/person)">Premium Service — $35/person</option>
          </optgroup>
          <option value="Not sure yet">Not sure yet — help me choose</option>
        </select>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="mb-notes" className={lbl}>Additional Details</Label>
        <Textarea id="mb-notes" name="details" placeholder="Event type, add-ons you're interested in, any questions..." rows={4} className={field} />
      </div>

      {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="w-full rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-md hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? <span className="inline-flex items-center justify-center gap-2"><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</span> : "Request a Quote"}
      </button>
    </form>
  );
}
