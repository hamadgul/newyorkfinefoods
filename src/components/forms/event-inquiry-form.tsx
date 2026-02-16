"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function EventInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const data = new FormData(e.currentTarget);
        data.append("_form_type", "Event Inquiry");
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
        Event Inquiry
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="e-name">Name</Label>
          <Input id="e-name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="e-email">Email</Label>
          <Input id="e-email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="e-date">Preferred Date</Label>
          <Input id="e-date" name="event_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="e-guests">Expected Guests</Label>
          <Input id="e-guests" name="guests" type="number" placeholder="100" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-type">Event Type</Label>
        <Input id="e-type" name="event_type" placeholder="e.g. Wedding, Corporate, Party, Festival" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-venue">Venue / Location</Label>
        <Input id="e-venue" name="venue" placeholder="Venue name or address" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-details">Tell Us More</Label>
        <Textarea
          id="e-details"
          name="details"
          placeholder="Your vision, theme, special requirements..."
          rows={4}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        {loading ? "Sending..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
