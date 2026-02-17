export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Marco DiNapoli",
    role: "Executive Chef & Founder",
    bio: "With 20 years of experience in NYC's top kitchens, Marco founded NYFF to bring fine dining quality to every event, no matter the scale.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
  },
  {
    name: "Elena Vasquez",
    role: "Head of Events",
    bio: "Elena's meticulous planning and creative vision have shaped over 500 successful events across the tri-state area.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "James Park",
    role: "Pastry Chef",
    bio: "A Culinary Institute of America graduate, James brings artistry and innovation to every dessert course and custom cake.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Sofia Romano",
    role: "Pizza Truck Manager",
    bio: "Sofia oversees our mobile fleet, bringing authentic Neapolitan-style pizza and infectious energy to events across New York.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
];

export const stats = [
  { value: "2,500+", label: "Events Catered" },
  { value: "30+", label: "Years of Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Team Members" },
];
