/**
 * Occasion and geo landing pages under /pizza-trucks/[topic].
 *
 * These are spokes off the /pizza-trucks hub, which already holds ranking
 * equity — never rename the parent slug. Each spoke targets a distinct query
 * cluster and must carry its own argument, not a reworded version of the hub.
 */

export interface PizzaTruckPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbName: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
  heroImage: string;
  /** The opening argument — the reason this page exists separately. */
  hook: { heading: string; body: string[] };
  blocksEyebrow: string;
  blocksHeading: string;
  blocks: { title: string; body: string }[];
  logistics: { heading: string; body: string[] };
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaButton: string;
  schemaName: string;
  schemaAreaServed: { type: "City" | "AdministrativeArea"; name: string }[];
  related: { href: string; label: string }[];
}

const NYC_AREAS: PizzaTruckPage["schemaAreaServed"] = [
  { type: "City", name: "New York" },
  { type: "AdministrativeArea", name: "Long Island" },
  { type: "AdministrativeArea", name: "Westchester County" },
  { type: "AdministrativeArea", name: "New Jersey" },
  { type: "AdministrativeArea", name: "Fairfield County" },
];

export const pizzaTruckPages: PizzaTruckPage[] = [
  {
    slug: "weddings",
    metaTitle: "Pizza Truck Weddings | Wedding Pizza Catering NYC",
    metaDescription:
      "A wood-fired pizza truck for your wedding — cocktail hour, late night, or the whole reception. 900°F ovens, 90-second pies. From $1,500.",
    breadcrumbName: "Weddings",
    eyebrow: "Weddings",
    h1: "Pizza Truck Weddings",
    heroSubtitle:
      "A wood-fired truck, a 900°F oven, and pies coming out every ninety seconds — for cocktail hour, for late night, or for the whole reception.",
    heroImage: "/trucks/nyc-neapolitan-pizza-truck.jpg",
    hook: {
      heading: "The Best-Reviewed Thing at Your Wedding Won't Be the Cake",
      body: [
        "Nobody remembers the third plated course. They remember standing around a truck at eleven at night in their good shoes, eating a margherita off a paper plate, still in the dress.",
        "That's the whole pitch. A pizza truck is the part of a wedding people actually talk about afterward — and it costs less than adding another catered course.",
      ],
    },
    blocksEyebrow: "How It Works",
    blocksHeading: "Three Ways Couples Use the Truck",
    blocks: [
      {
        title: "Cocktail hour",
        body: "Guests arrive, the oven's already hot, and nobody's standing around a dry bar waiting for photos to finish. Ten-inch personal pies work best here — one each, no sharing, no plates to manage.",
      },
      {
        title: "Late night",
        body: "The most common booking. The truck fires for an hour around ten and rescues everyone who's been dancing since eight. This is the one that ends up in the photos.",
      },
      {
        title: "The whole reception",
        body: "For backyard weddings, barns and farms without a real kitchen, the truck can carry the meal. Fourteen-inch pies, continuous service, 25 to 5,000 guests.",
      },
    ],
    logistics: {
      heading: "Why It Works Where a Kitchen Doesn't",
      body: [
        "The truck is fully self-contained. The oven runs on its own fuel, so we need no power from the venue. We need a level, accessible spot roughly the size of a parking space, and clearance for the crew to serve.",
        "That means barns, farms, vineyards, backyards, rooftops and estate lawns all work — the venues where a traditional caterer needs a whole tented kitchen build.",
      ],
    },
    faqs: [
      {
        q: "How much does a pizza truck cost for a wedding?",
        a: "Catering starts at $1,500, and the final number depends on guest count, service length and location. Call (516) 205-7629 with your date and headcount.",
      },
      {
        q: "How far in advance should we book?",
        a: "Four to eight weeks minimum, and considerably earlier for peak wedding dates. Spring, early summer and December fill first. If your date is sooner, ask anyway.",
      },
      {
        q: "Can the truck serve during cocktail hour and late night?",
        a: "Yes — that's a common booking. We'll price it as one continuous service or two windows depending on your timeline.",
      },
      {
        q: "Do you have vegetarian options?",
        a: "Yes. Margherita, Marinara, Bianca, Mushroom Truffle and Burrata are all vegetarian, and we take custom requests beyond the standard menu.",
      },
      {
        q: "What if our venue is indoors?",
        a: "The truck serves from outdoors — a driveway, lot, curbside, courtyard or lawn. For fully indoor venues we can discuss a portable oven setup. Send us the venue details.",
      },
    ],
    ctaTitle: "Check Your Date",
    ctaButton: "Check Your Wedding Date",
    schemaName: "Wedding Pizza Truck Catering",
    schemaAreaServed: NYC_AREAS,
    related: [
      { href: "/pizza-trucks/parties", label: "Pizza Truck for Parties" },
      { href: "/mobile-bar", label: "Mobile Bar & Bartenders" },
    ],
  },

  {
    slug: "parties",
    metaTitle: "Pizza Truck for Parties | NYC Party Pizza Catering",
    metaDescription:
      "Book a pizza truck for birthdays, block parties, graduations and backyard parties across NYC. 25 to 5,000 guests. From $1,500.",
    breadcrumbName: "Parties",
    eyebrow: "Parties",
    h1: "Pizza Truck for Parties",
    heroSubtitle:
      "Birthdays, block parties, graduations, backyard parties and sweet sixteens. The truck pulls up, the oven hits 900°F, and pies come out until everyone's done.",
    heroImage: "/trucks/mobile-pizza-truck-nyc.jpg",
    hook: {
      heading: "No Kitchen, No Cleanup, No Running Out",
      body: [
        "Here's what usually happens at a party: somebody spends the whole thing in the kitchen, and the food runs out an hour before the guests do.",
        "The truck fixes both. Pizza comes out continuously for as long as the party runs, so there's no last-tray moment. And when it's over we take the mess with us — the oven, the truck, the setup, all of it.",
      ],
    },
    blocksEyebrow: "Occasions",
    blocksHeading: "What We Show Up For",
    blocks: [
      {
        title: "Birthday parties",
        body: "Kids' parties work especially well with ten-inch personal pies — everyone gets their own and nobody negotiates over slices.",
      },
      {
        title: "Graduation parties",
        body: "May and June, backyard, big headcount, everyone eating at different times. Exactly the shape of event a truck handles better than trays.",
      },
      {
        title: "Block parties",
        body: "We scale to 5,000 guests. Tell us the block and we'll sort out where the truck sits and what permit the street needs.",
      },
      {
        title: "Sweet sixteens and bar mitzvahs",
        body: "The truck is usually as much the entertainment as the food.",
      },
      {
        title: "Backyard and pool parties",
        body: "Self-contained, so it needs no power from the house.",
      },
      {
        title: "Office and team parties",
        body: "Summer outings and client appreciation days. See [corporate catering](/corporate-catering).",
      },
    ],
    logistics: {
      heading: "What We Need From You",
      body: [
        "Not much. A level, accessible spot about the size of a parking space, and room for the crew to serve. The oven runs on its own fuel, so no outlet, no generator, nothing from the house.",
        "Driveways are easiest. Curbside works on most blocks. If you're on a narrow one-way in Brooklyn or Manhattan, tell us early and we'll tell you honestly whether it works.",
      ],
    },
    faqs: [
      {
        q: "How much does a pizza truck cost for a party?",
        a: "Catering starts at $1,500. The final number depends on guest count, how long you want service and where you are. Call (516) 205-7629.",
      },
      {
        q: "How many people can you serve?",
        a: "From about 25 guests up to 5,000. We fire continuously, so larger parties get longer service rather than a longer line.",
      },
      {
        q: "How far in advance should I book?",
        a: "Four to eight weeks is comfortable. Spring, early summer and December book fastest. Ask anyway if it's sooner.",
      },
      {
        q: "Can you come to a park or a block party?",
        a: "Yes, though public space usually needs a permit from the city. We'll tell you what's involved for your location.",
      },
      {
        q: "Do you have vegetarian options?",
        a: "Yes — Margherita, Marinara, Bianca, Mushroom Truffle and Burrata, plus custom requests beyond the standard menu.",
      },
    ],
    ctaTitle: "Check Your Party Date",
    ctaButton: "Check Your Party Date",
    schemaName: "Pizza Truck Catering for Parties",
    schemaAreaServed: NYC_AREAS,
    related: [
      { href: "/pizza-trucks/weddings", label: "Pizza Truck Weddings" },
      { href: "/catering", label: "Catering Menu" },
    ],
  },

  {
    slug: "long-island",
    metaTitle: "Long Island Pizza Truck | Nassau & Suffolk Catering",
    metaDescription:
      "Wood-fired pizza truck catering across Nassau and Suffolk. Driveways, backyards, beaches and country clubs. From $1,500.",
    breadcrumbName: "Long Island",
    eyebrow: "Long Island",
    h1: "Long Island Pizza Truck",
    heroSubtitle:
      "Wood-fired Neapolitan pizza catering across Nassau and Suffolk — backyards, driveways, country clubs and beach houses, out east through the season.",
    heroImage: "/trucks/pizza-truck-catering-nyc.jpg",
    hook: {
      heading: "Built for a Long Island Backyard",
      body: [
        "Everything that makes a pizza truck complicated in the city is simple out here. Driveways and lawns instead of one-way streets and alternate-side parking. Room for a queue that doesn't block a sidewalk. A place to put the truck that nobody needs a permit for.",
        "The oven is self-contained and runs on its own fuel, so it takes nothing from the house — no outlet, no generator, no hose. We pull in, fire up, and start handing out pizza.",
      ],
    },
    blocksEyebrow: "Occasions",
    blocksHeading: "What We Cater on the Island",
    blocks: [
      {
        title: "Graduation parties",
        body: "The island's signature booking, and the reason late May and June are the busiest weeks of our year. Book early — the good Saturdays go months ahead.",
      },
      {
        title: "Backyard and pool parties",
        body: "Continuous service for a crowd that eats over three hours rather than all at once.",
      },
      {
        title: "Weddings and engagement parties",
        body: "Backyard and tented weddings where there's no kitchen on site. See [pizza truck weddings](/pizza-trucks/weddings).",
      },
      {
        title: "Out east in season",
        body: "The Hamptons and the North Fork through the summer. Travel beyond the city may include a small fee, quoted upfront.",
      },
      {
        title: "Communions and christenings",
        body: "Spring fills first here, same as on Staten Island.",
      },
      {
        title: "Corporate and club events",
        body: "Country clubs, corporate outings and staff appreciation days across both counties.",
      },
    ],
    logistics: {
      heading: "What the Truck Needs",
      body: [
        "A level, accessible spot roughly the size of a parking space, and clearance for the crew to work. A driveway is ideal; a lawn with firm ground works; a soft or steeply sloped surface does not.",
        "If your venue is a club or a managed community, check its vendor rules before you book — some have insurance minimums or approved-vendor lists. Send us the requirements and we'll confirm we can meet them.",
      ],
    },
    faqs: [
      {
        q: "Is there a mobile pizza truck on Long Island?",
        a: "Yes. We cover all of Nassau and Suffolk, and out east through the Hamptons and North Fork in season. We also do [Long Island catering](/catering/long-island) more broadly.",
      },
      {
        q: "How much does a pizza truck cost for a party?",
        a: "Catering starts at $1,500. The final number depends on guest count, service length and how far out east you are. Call (516) 205-7629.",
      },
      {
        q: "How early should I book for a graduation party?",
        a: "As early as you can. Late May and June are our busiest weeks on the island and the popular Saturdays go months ahead.",
      },
      {
        q: "Is there a travel fee?",
        a: "There may be a small one depending on how far out you are. It goes in the quote upfront, never as a surprise on the invoice.",
      },
      {
        q: "Can the truck park on grass?",
        a: "On firm, level ground, yes. On soft or sloped ground, no — a driveway is always the safer choice. Send a photo if you're unsure.",
      },
    ],
    ctaTitle: "Check Your Long Island Date",
    ctaButton: "Check Your Date",
    schemaName: "Long Island Pizza Truck Catering",
    schemaAreaServed: [
      { type: "AdministrativeArea", name: "Nassau County" },
      { type: "AdministrativeArea", name: "Suffolk County" },
      { type: "AdministrativeArea", name: "Long Island" },
    ],
    related: [
      { href: "/catering/long-island", label: "Long Island Catering" },
      { href: "/pizza-trucks/parties", label: "Pizza Truck for Parties" },
    ],
  },

  {
    slug: "connecticut",
    metaTitle: "Connecticut Pizza Truck | Fairfield County Catering",
    metaDescription:
      "Neapolitan pizza truck catering in Fairfield County. Weddings, corporate and backyard parties. From $1,500.",
    breadcrumbName: "Connecticut",
    eyebrow: "Connecticut",
    h1: "Connecticut Pizza Truck",
    heroSubtitle:
      "Wood-fired Neapolitan pizza catering across Fairfield County — Greenwich, Stamford, Westport, Darien and the towns between.",
    heroImage: "/trucks/di-parma.jpg",
    hook: {
      heading: "Check the Venue's Vendor Rules First",
      body: [
        "Fairfield County has a high concentration of clubs, associations and managed communities, and many of them have firm rules about outside vendors — insurance minimums, approved-vendor lists, sometimes an outright exclusive with an in-house kitchen.",
        "It's worth establishing which applies to your venue before you shortlist anyone. Send us the requirements and we'll tell you plainly whether we can meet them. On a private driveway or lawn there's nothing to check, and the truck handles the rest.",
      ],
    },
    blocksEyebrow: "Occasions",
    blocksHeading: "What We Cater in Fairfield County",
    blocks: [
      {
        title: "Private home parties",
        body: "Milestone birthdays, garden parties and summer gatherings on properties with room to spare.",
      },
      {
        title: "Weddings and rehearsal dinners",
        body: "Home and tented weddings, plus the smaller dinner the night before. See [pizza truck weddings](/pizza-trucks/weddings).",
      },
      {
        title: "Corporate events in Stamford",
        body: "Team outings, client days and staff appreciation events. See [corporate catering](/corporate-catering).",
      },
      {
        title: "Graduation parties",
        body: "May and June fill first here too. Book ahead.",
      },
      {
        title: "Club and association events",
        body: "Where the venue permits an outside caterer, we'll work to its requirements.",
      },
      {
        title: "Shoreline and beach houses",
        body: "Rowayton, Westport, Fairfield. Firm, level ground is the only real requirement.",
      },
    ],
    logistics: {
      heading: "What the Truck Needs",
      body: [
        "A level, accessible spot roughly the size of a parking space, and clearance for the crew to serve. The oven runs on its own fuel — no power, gas or water needed from the property.",
        "Travel to Fairfield County may include a small fee depending on the town. It goes in the quote upfront.",
      ],
    },
    faqs: [
      {
        q: "How far into Connecticut do you travel?",
        a: "Fairfield County routinely — Greenwich, Stamford, Westport, Darien, New Canaan, Norwalk and the surrounding towns. Travel fees are quoted upfront.",
      },
      {
        q: "Our club has an approved vendor list. Can you work with that?",
        a: "Send us the requirements and we'll tell you honestly whether we can meet them. Better to know in week one than the week of the event.",
      },
      {
        q: "How much does the pizza truck cost?",
        a: "Catering starts at $1,500, depending on guest count, service length and location. Call (516) 205-7629.",
      },
      {
        q: "Do you carry liquor liability insurance for the bar?",
        a: "Yes. Our bartenders are TIPS-certified, we carry liquor liability insurance and we handle the Caterer's Alcohol Permit.",
      },
      {
        q: "How many guests can you serve?",
        a: "From about 25 up to 5,000. We fire continuously throughout the event.",
      },
    ],
    ctaTitle: "Check Your Connecticut Date",
    ctaButton: "Check Your Date",
    schemaName: "Connecticut Pizza Truck Catering",
    schemaAreaServed: [
      { type: "AdministrativeArea", name: "Fairfield County" },
      { type: "AdministrativeArea", name: "Connecticut" },
    ],
    related: [
      { href: "/catering/connecticut", label: "Connecticut Catering" },
      { href: "/pizza-trucks/weddings", label: "Pizza Truck Weddings" },
    ],
  },
];

export function getPizzaTruckPage(slug: string): PizzaTruckPage | undefined {
  return pizzaTruckPages.find((p) => p.slug === slug);
}
