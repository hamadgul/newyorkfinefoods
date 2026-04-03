export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We hired NYFF to cater our company's annual dinner and it was flawless. Restaurant-quality food, impeccable service, and a team that handled every detail. We'll be booking them again.",
    name: "David Chen",
    role: "VP of Operations, Sterling Partners",
    service: "Corporate Catering",
  },
  {
    quote:
      "The pizza truck was an absolute hit at our rooftop party. Wood-fired Neapolitan pizza straight from the truck — guests were lining up all night. Totally worth it.",
    name: "Maria Rodriguez",
    role: "Private Client",
    service: "Pizza Truck",
  },
  {
    quote:
      "NYFF catered our product launch event for 200 guests. The presentation was stunning, the food was delicious, and the team was professional from start to finish.",
    name: "Ashley Park",
    role: "Head of Marketing, Vela Studio",
    service: "Corporate Catering",
  },
  {
    quote:
      "We brought in their pizza truck for a neighborhood block party and it was the talk of the summer. The crew was friendly, fast, and the pizza was genuinely some of the best I've had in New York.",
    name: "James Okafor",
    role: "Community Organizer",
    service: "Pizza Truck",
  },
];
