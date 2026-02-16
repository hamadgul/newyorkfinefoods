"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

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
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Integrate with Formspree or similar service
        setSubmitted(true);
      }}
    >
      <h3 className="font-heading text-2xl font-bold text-charcoal">
        Request a Quote
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="q-name">Name</Label>
          <Input id="q-name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="q-email">Email</Label>
          <Input id="q-email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="q-date">Event Date</Label>
          <Input id="q-date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="q-guests">Number of Guests</Label>
          <Input id="q-guests" type="number" placeholder="50" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="q-type">Event Type</Label>
        <Input id="q-type" placeholder="e.g. Wedding, Corporate Dinner, Birthday" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="q-details">Additional Details</Label>
        <Textarea
          id="q-details"
          placeholder="Dietary restrictions, preferred style, budget range..."
          rows={4}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        Request Quote
      </Button>
    </form>
  );
}
