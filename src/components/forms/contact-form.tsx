"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

const field = "border-charcoal/20 bg-ivory/40 text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:ring-1 focus:ring-gold/20";
const lbl = "block text-xs font-semibold uppercase tracking-widest text-charcoal/50";
const sel = "h-10 w-full rounded-md border border-charcoal/20 bg-ivory/40 px-3 py-2 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/20";

type ServiceType = "" | "Catering" | "Pizza Truck" | "Mobile Bar";

const serviceOptions: { value: ServiceType; label: string; description: string }[] = [
  { value: "Catering", label: "Catering", description: "Chef-crafted menus for your event" },
  { value: "Pizza Truck", label: "Pizza Truck", description: "Neopolitan-fired pizza at your doorstep" },
  { value: "Mobile Bar", label: "Mobile Bar", description: "Professional bartenders & full bar setup for your event" },
];

export function ContactForm() {
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-charcoal/8 bg-white p-10 text-center shadow-md">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10">
          <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-charcoal">Thank You!</h3>
        <p className="mt-2 text-charcoal/70">We&apos;ve received your message and will get back to you within 24 hours.</p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);
    data.append("_form_type", `${serviceType} Inquiry`);
    data.append("serviceType", serviceType);
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
  }

  // Step 1: Service selection
  if (!serviceType) {
    return (
      <div className="rounded-2xl border border-charcoal/8 bg-white p-8 shadow-md sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Book With Us
        </p>
        <h3 className="mt-2 font-heading text-2xl font-bold text-charcoal sm:text-3xl">
          What are you looking for?
        </h3>
        <p className="mt-2 text-sm text-charcoal/60">Select a service and we&apos;ll tailor the form to your needs.</p>
        <div className="mt-2 h-px w-10 bg-gold/40" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setServiceType(option.value)}
              className="group rounded-xl border-2 border-charcoal/10 bg-ivory/30 p-6 text-left transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <span className="block font-heading text-lg font-bold text-charcoal transition-colors group-hover:text-gold">
                {option.label}
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-charcoal/50">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Service-specific form
  return (
    <div className="space-y-4">
      {/* Back / change selection */}
      <button
        type="button"
        onClick={() => setServiceType("")}
        className="inline-flex items-center gap-1 text-sm font-medium text-charcoal/60 transition-colors hover:text-gold"
      >
        <span>←</span> Change service
      </button>

      <form className="space-y-6 rounded-2xl border border-charcoal/8 bg-white p-8 shadow-md sm:p-10" onSubmit={handleSubmit}>
        <div className="border-b border-charcoal/8 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{serviceType}</p>
          <h3 className="mt-1 font-heading text-2xl font-bold text-charcoal">
            {serviceType === "Catering" && "Request a Catering Quote"}
            {serviceType === "Pizza Truck" && "Book a Pizza Truck"}
            {serviceType === "Mobile Bar" && "Book a Mobile Bar"}
          </h3>
          <p className="mt-1.5 text-sm text-charcoal/60">
            {serviceType === "Catering" && "Tell us about your event and we\u2019ll prepare a custom proposal."}
            {serviceType === "Pizza Truck" && "Give us the details and we\u2019ll roll up to your event."}
            {serviceType === "Mobile Bar" && "Tell us about your event and we\u2019ll build a custom bar quote."}
          </p>
        </div>

        {/* Common fields: Name, Email */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="c-name" className={lbl}>Name</Label>
            <Input id="c-name" name="name" placeholder="Your name" required className={field} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email" className={lbl}>Email</Label>
            <Input id="c-email" name="email" type="email" placeholder="you@email.com" required className={field} />
          </div>
        </div>

        {/* Common field: Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="c-phone" className={lbl}>Phone</Label>
          <Input id="c-phone" name="phone" type="tel" placeholder="(555) 000-0000" className={field} />
        </div>

        {/* Common fields: Date & Guests */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="c-date" className={lbl}>Event Date</Label>
            <Input id="c-date" name="event_date" type="date" required className={field} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-guests" className={lbl}>Number of Guests</Label>
            <Input id="c-guests" name="guests" type="number" placeholder="50" required className={field} />
          </div>
        </div>

        {/* Catering-specific fields */}
        {serviceType === "Catering" && (
          <div className="space-y-1.5">
            <Label htmlFor="c-event-type" className={lbl}>Event Type</Label>
            <Input id="c-event-type" name="event_type" placeholder="e.g. Wedding, Corporate Dinner, Birthday" required className={field} />
          </div>
        )}

        {/* Pizza Truck-specific fields */}
        {serviceType === "Pizza Truck" && (
          <div className="space-y-1.5">
            <Label htmlFor="c-location" className={lbl}>Event Location</Label>
            <Input id="c-location" name="location" placeholder="Address or venue name" required className={field} />
          </div>
        )}

        {/* Mobile Bar-specific fields */}
        {serviceType === "Mobile Bar" && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="c-mb-location" className={lbl}>Event Location / Venue</Label>
              <Input id="c-mb-location" name="location" placeholder="Address or venue name" required className={field} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-mb-package" className={lbl}>Package Interest</Label>
              <select id="c-mb-package" name="package_interest" className={sel}>
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
          </>
        )}

        {/* Details / Message */}
        <div className="space-y-1.5">
          <Label htmlFor="c-details" className={lbl}>Additional Details</Label>
          <Textarea
            id="c-details"
            name="details"
            placeholder={serviceType === "Catering" ? "Dietary restrictions, preferred style, budget range..." : "Event type, duration, special requests..."}
            rows={4}
            className={field}
          />
        </div>

        {error && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-full bg-gold py-3.5 text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-gold-light hover:shadow-md hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-60">
          {loading
            ? <span className="inline-flex items-center justify-center gap-2"><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</span>
            : serviceType === "Catering" ? "Request Quote" : serviceType === "Mobile Bar" ? "Request a Bar Quote" : "Book Pizza Truck"
          }
        </button>
      </form>
    </div>
  );
}
