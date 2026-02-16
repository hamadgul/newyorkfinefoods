import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { CTASection } from "@/components/sections/cta-section";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { teamMembers, stats } from "@/data/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about New York Fine Foods — our story, our values, and the passionate team behind NYC's premier catering company.",
};

const values = [
  {
    title: "Quality First",
    description:
      "We source the finest seasonal ingredients and never compromise on preparation or presentation.",
  },
  {
    title: "Personal Touch",
    description:
      "Every event is unique. We listen, customize, and deliver a truly personalized experience.",
  },
  {
    title: "Reliability",
    description:
      "From planning to cleanup, we execute with precision so you can enjoy every moment.",
  },
  {
    title: "Innovation",
    description:
      "We stay ahead of culinary trends while honoring the classic techniques that define great food.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80"
        title="Our Story"
        subtitle="Born in New York, driven by passion, defined by excellence."
      />

      {/* Brand Story */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                From One Kitchen to All of New York
              </h2>
              <p className="mt-6 leading-relaxed text-charcoal/70">
                New York Fine Foods was born in 2010 from a simple belief: that
                every event deserves restaurant-quality food. What started as a
                small catering operation out of a Brooklyn kitchen has grown into
                one of NYC&apos;s most trusted names in event dining.
              </p>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Today, our team of 50+ chefs, planners, and service
                professionals cater over 300 events each year — from intimate
                rooftop dinners to 1,000-guest corporate galas. And with our
                fleet of wood-fired pizza trucks, we bring the party to any
                corner of the city.
              </p>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
                alt="Chef preparing food"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-ivory md:text-4xl">
            What We Stand For
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg bg-ivory/5 p-8">
                <h3 className="font-heading text-xl font-bold text-gold">
                  {v.title}
                </h3>
                <p className="mt-3 text-ivory/70">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — commented out until real photos and descriptions are ready
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Meet the Team
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-gold">{member.role}</p>
                  <p className="mt-2 text-sm text-charcoal/60">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Stats */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-charcoal md:text-4xl">
            By the Numbers
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-gold md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-charcoal/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's Create Something Extraordinary"
        subtitle="Ready to bring your event vision to life? We'd love to hear from you."
        ctaText="Contact Us"
      />
    </>
  );
}
