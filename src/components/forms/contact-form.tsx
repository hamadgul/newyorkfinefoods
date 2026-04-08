"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

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
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Thank You!
        </h3>
        <p className="mt-2 text-charcoal/70">
          We&apos;ve received your message and will get back to you within 24
          hours.
        </p>
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
      <div className="rounded-xl bg-white p-8 shadow-lg ring-1 ring-charcoal/5 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Book With Us
        </p>
        <h3 className="mt-2 font-heading text-2xl font-bold text-charcoal sm:text-3xl">
          What are you looking for?
        </h3>
        <p className="mt-2 text-charcoal/60">
          Select a service and we&apos;ll tailor the form to your needs.
        </p>
        <div className="mx-auto mt-2 h-px w-12 bg-gold/40" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setServiceType(option.value)}
              className="group rounded-xl border-2 border-charcoal/10 bg-ivory/30 p-6 text-left transition-all duration-200 hover:border-gold hover:bg-gold/5 hover:shadow-lg"
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

      <form className="space-y-6 rounded-lg bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          {serviceType === "Catering" && "Request a Catering Quote"}
          {serviceType === "Pizza Truck" && "Book a Pizza Truck"}
          {serviceType === "Mobile Bar" && "Book a Mobile Bar"}
        </h3>
        <p className="text-sm text-charcoal/50">
          {serviceType === "Catering" && "Tell us about your event and we'll prepare a custom proposal."}
          {serviceType === "Pizza Truck" && "Give us the details and we'll roll up to your event."}
          {serviceType === "Mobile Bar" && "Tell us about your event and we'll build a custom bar quote."}
        </p>

        {/* Common fields: Name, Email */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="c-name">Name</Label>
            <Input id="c-name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-email">Email</Label>
            <Input id="c-email" name="email" type="email" placeholder="you@email.com" required />
          </div>
        </div>

        {/* Common field: Phone */}
        <div className="space-y-2">
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" name="phone" type="tel" placeholder="(555) 000-0000" />
        </div>

        {/* Common fields: Date & Guests */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="c-date">Event Date</Label>
            <Input id="c-date" name="event_date" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-guests">Number of Guests</Label>
            <Input id="c-guests" name="guests" type="number" placeholder="50" required />
          </div>
        </div>

        {/* Catering-specific fields */}
        {serviceType === "Catering" && (
          <div className="space-y-2">
            <Label htmlFor="c-event-type">Event Type</Label>
            <Input id="c-event-type" name="event_type" placeholder="e.g. Wedding, Corporate Dinner, Birthday" required />
          </div>
        )}

        {/* Pizza Truck-specific fields */}
        {serviceType === "Pizza Truck" && (
          <div className="space-y-2">
            <Label htmlFor="c-location">Event Location</Label>
            <Input id="c-location" name="location" placeholder="Address or venue name" required />
          </div>
        )}

        {/* Mobile Bar-specific fields */}
        {serviceType === "Mobile Bar" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="c-mb-location">Event Location / Venue</Label>
              <Input id="c-mb-location" name="location" placeholder="Address or venue name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-mb-package">Package Interest</Label>
              <select
                id="c-mb-package"
                name="package_interest"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
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
        <div className="space-y-2">
          <Label htmlFor="c-details">Additional Details</Label>
          <Textarea
            id="c-details"
            name="details"
            placeholder={
              serviceType === "Catering"
                ? "Dietary restrictions, preferred style, budget range..."
                : "Event type, duration, special requests..."
            }
            rows={4}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
        >
          {loading
            ? "Sending..."
            : serviceType === "Catering"
              ? "Request Quote"
              : serviceType === "Mobile Bar"
                ? "Request a Bar Quote"
                : "Book Pizza Truck"
          }
        </Button>
      </form>
    </div>
  );
}
