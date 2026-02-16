"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function EventInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Inquiry Submitted!
        </h3>
        <p className="mt-2 text-charcoal/70">
          Our events team is excited to help bring your vision to life. Expect a
          response within 24 hours.
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
        Event Inquiry
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="e-name">Name</Label>
          <Input id="e-name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="e-email">Email</Label>
          <Input id="e-email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="e-date">Preferred Date</Label>
          <Input id="e-date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="e-guests">Expected Guests</Label>
          <Input id="e-guests" type="number" placeholder="100" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-type">Event Type</Label>
        <Input id="e-type" placeholder="e.g. Wedding, Corporate, Party, Festival" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-venue">Venue / Location</Label>
        <Input id="e-venue" placeholder="Venue name or address" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-details">Tell Us More</Label>
        <Textarea
          id="e-details"
          placeholder="Your vision, theme, special requirements..."
          rows={4}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        Submit Inquiry
      </Button>
    </form>
  );
}
