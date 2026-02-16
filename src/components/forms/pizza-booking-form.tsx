"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function PizzaBookingForm() {
  const [submitted, setSubmitted] = useState(false);

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
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Integrate with Formspree or similar service
        setSubmitted(true);
      }}
    >
      <h3 className="font-heading text-2xl font-bold text-charcoal">
        Book a Pizza Truck
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-name">Name</Label>
          <Input id="p-name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-email">Email</Label>
          <Input id="p-email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-date">Event Date</Label>
          <Input id="p-date" type="date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-guests">Expected Guests</Label>
          <Input id="p-guests" type="number" placeholder="75" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-location">Event Location</Label>
        <Input id="p-location" placeholder="Address or venue name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-details">Additional Details</Label>
        <Textarea
          id="p-details"
          placeholder="Event type, duration, special requests..."
          rows={4}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        Book Pizza Truck
      </Button>
    </form>
  );
}
