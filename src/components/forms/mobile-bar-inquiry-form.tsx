"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FORMSPREE_ENDPOINT } from "@/lib/constants";

export function MobileBarInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Quote Request Received!
        </h3>
        <p className="mt-2 text-charcoal/70">
          Our bar team will review your details and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-6 rounded-lg bg-white p-8 shadow-sm"
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
      <div>
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Request a Bar Quote
        </h3>
        <p className="mt-1 text-sm text-charcoal/50">
          Tell us about your event and we&apos;ll build a custom quote.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mb-name">Name</Label>
          <Input id="mb-name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mb-email">Email</Label>
          <Input id="mb-email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="mb-phone">Phone</Label>
        <Input id="mb-phone" name="phone" type="tel" placeholder="(555) 000-0000" />
      </div>

      {/* Date + Guests */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mb-date">Event Date</Label>
          <Input id="mb-date" name="event_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mb-guests">Number of Guests</Label>
          <Input
            id="mb-guests"
            name="guests"
            type="number"
            placeholder="75"
            min={1}
            required
          />
          <p className="text-xs text-charcoal/40">30 guest minimum</p>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="mb-location">Event Location / Venue</Label>
        <Input id="mb-location" name="location" placeholder="Address or venue name" required />
      </div>

      {/* Package interest */}
      <div className="space-y-2">
        <Label htmlFor="mb-package">Package Interest</Label>
        <select
          id="mb-package"
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

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="mb-notes">Additional Details</Label>
        <Textarea
          id="mb-notes"
          name="details"
          placeholder="Event type, add-ons you're interested in, any questions..."
          rows={4}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        {loading ? "Sending..." : "Request a Quote"}
      </Button>
    </form>
  );
}
