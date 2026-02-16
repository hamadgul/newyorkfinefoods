"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function QuoteForm() {
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
          Our catering team will prepare a custom proposal and reach out within
          48 hours.
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
        data.append("_form_type", "Catering Quote Request");
        try {
          const res = await fetch("https://formspree.io/f/mnjbdepb", {
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
      <h3 className="font-heading text-2xl font-bold text-charcoal">
        Request a Quote
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="q-name">Name</Label>
          <Input id="q-name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="q-email">Email</Label>
          <Input id="q-email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="q-date">Event Date</Label>
          <Input id="q-date" name="event_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="q-guests">Number of Guests</Label>
          <Input id="q-guests" name="guests" type="number" placeholder="50" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="q-type">Event Type</Label>
        <Input id="q-type" name="event_type" placeholder="e.g. Wedding, Corporate Dinner, Birthday" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q-details">Additional Details</Label>
        <Textarea
          id="q-details"
          name="details"
          placeholder="Dietary restrictions, preferred style, budget range..."
          rows={4}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        {loading ? "Sending..." : "Request Quote"}
      </Button>
    </form>
  );
}
