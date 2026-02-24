"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
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

  return (
    <form
      className="space-y-6 rounded-lg bg-white p-8 shadow-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const form = e.currentTarget;
        const data = new FormData(form);
        data.append("_form_type", "Contact Form");
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="serviceType">What are you booking?</Label>
        <select
          id="serviceType"
          name="serviceType"
          required
          className="flex h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-charcoal shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="Catering">Catering</option>
          <option value="Full Event Service">Full Event Service</option>
          <option value="Pizza Truck">Pizza Truck</option>
          <option value="All of the Above">All of the Above</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your event or inquiry..."
          rows={5}
          required
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-charcoal hover:bg-gold-light font-semibold"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
