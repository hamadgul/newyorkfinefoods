export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  event: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "New York Fine Foods made our wedding absolutely magical. Every guest raved about the food for weeks afterward. The attention to detail was extraordinary.",
    name: "Sarah & Michael",
    role: "Bride & Groom",
    event: "Wedding Reception",
  },
  {
    quote:
      "We've used NYFF for our annual corporate gala three years running. They consistently deliver restaurant-quality food at scale — a rare find in New York.",
    name: "David Chen",
    role: "VP of Events, Sterling Partners",
    event: "Corporate Gala",
  },
  {
    quote:
      "The pizza truck was the highlight of our block party! The team was professional, the pizza was incredible, and everyone had an amazing time.",
    name: "Maria Rodriguez",
    role: "Community Organizer",
    event: "Block Party",
  },
  {
    quote:
      "From the tasting to the final plate, the team was organized, responsive, and creative. They brought our vision to life beautifully.",
    name: "James & Priya",
    role: "Hosts",
    event: "Engagement Party",
  },
];
