"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <form
      className="space-y-6 rounded-lg bg-white p-8 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Integrate with Formspree or similar service
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="(555) 000-0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your event or inquiry..."
          rows={5}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        Send Message
      </Button>
    </form>
  );
}
