"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function PizzaBookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h3 className="font-heading text-2xl font-bold text-charcoal">
          Booking Request Received!
        </h3>
        <p className="mt-2 text-charcoal/70">
          Our pizza truck team will confirm availability and send you a custom
          quote shortly.
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
        data.append("_form_type", "Pizza Truck Booking");
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
        Book a Pizza Truck
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-name">Name</Label>
          <Input id="p-name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-email">Email</Label>
          <Input id="p-email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-date">Event Date</Label>
          <Input id="p-date" name="event_date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-guests">Expected Guests</Label>
          <Input id="p-guests" name="guests" type="number" placeholder="75" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-location">Event Location</Label>
        <Input id="p-location" name="location" placeholder="Address or venue name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-details">Additional Details</Label>
        <Textarea
          id="p-details"
          name="details"
          placeholder="Event type, duration, special requests..."
          rows={4}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        {loading ? "Sending..." : "Book Pizza Truck"}
      </Button>
    </form>
  );
}
