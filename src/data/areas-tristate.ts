import type { ServiceArea } from "./service-areas";

/** Long Island, Westchester, New Jersey, Hudson Valley, Connecticut. */
export const triStateAreas: ServiceArea[] = [
  {
    slug: "long-island",
    name: "Long Island",
    metaTitle: "Long Island Catering",
    metaDescription:
      "Long Island catering for graduations, backyard parties and weddings across Nassau and Suffolk. Pizza truck available. Call (516) 205-7629.",
    h1: "Long Island Catering",
    heroSubtitle:
      "Graduations, backyard parties, pool parties and weddings across Nassau and Suffolk — plus a wood-fired pizza truck that pulls straight onto the driveway.",
    heroImage: "/gallery/2.jpg",
    schemaAreaType: "AdministrativeArea",
    schemaAreaName: "Long Island",
    angle: {
      heading: "Graduation Season Is a Logistics Problem",
      body: [
        "Late May through June, half of Nassau and Suffolk throws a party on the same four Saturdays. Every caterer on the island is booked, and the good dates go months ahead.",
        "That's the one thing worth knowing when you plan a Long Island graduation: the food is easy, the date is not. If you're reading this in April for a June party, call now rather than after the invitations go out.",
      ],
    },
    cateringFor: [
      {
        title: "Graduation parties",
        body: "The island's signature event. Big headcount, outdoors, everyone eating at staggered times. Trays and a truck both work better than plated service.",
      },
      {
        title: "Backyard and pool parties",
        body: "Space is the one thing Long Island has that the city doesn't. We set up outside, run a proper service line, and clear it all afterward.",
      },
      {
        title: "Weddings and engagement parties",
        body: "Backyard and tented weddings across both counties, where there's no kitchen on site and the caterer has to bring one. A [pizza truck wedding](/pizza-trucks/weddings) solves that outright.",
      },
      {
        title: "Summer out east",
        body: "The Hamptons and the North Fork through the season. Travel beyond the city may include a small fee — we'll put it in the quote rather than the invoice.",
      },
    ],
    places: [
      "Great Neck",
      "Garden City",
      "Manhasset",
      "Huntington",
      "Smithtown",
      "Babylon",
      "Islip",
      "Massapequa",
      "Port Washington",
      "Riverhead",
      "Southampton",
      "East Hampton",
    ],
    pizzaNote: {
      heading: "The Pizza Truck on Long Island",
      body: "This is the truck's easiest room. Driveways, decks and lawns instead of one-way streets and parking permits, and an oven that runs on its own fuel so it needs nothing from the house. See the [Long Island pizza truck](/pizza-trucks/long-island) page for how it works.",
    },
    faqs: [
      {
        q: "Do you cover both Nassau and Suffolk?",
        a: "Yes, and out east through the Hamptons and the North Fork in season. Travel beyond NYC may include a small fee, quoted upfront.",
      },
      {
        q: "How early should I book a graduation party?",
        a: "As early as you can. Late May and June are the busiest weeks of our year on the island, and the good Saturdays go months ahead.",
      },
      {
        q: "Can you cater a backyard wedding with no kitchen?",
        a: "Yes. That's a large part of what we do out here — we bring the equipment, the staff and, if you want it, the pizza truck.",
      },
    ],
    siblings: ["queens", "westchester"],
  },

  {
    slug: "westchester",
    name: "Westchester",
    metaTitle: "Westchester Catering",
    metaDescription:
      "Westchester catering for private estates, corporate campuses and weddings. Full service or drop-off. Call (516) 205-7629.",
    h1: "Westchester Catering",
    heroSubtitle:
      "Private homes, corporate campuses and country club events across Westchester — full-service staffing when the room calls for it, drop-off when it doesn't.",
    heroImage: "/gallery/3.jpg",
    schemaAreaType: "AdministrativeArea",
    schemaAreaName: "Westchester County",
    angle: {
      heading: "Two Very Different Bookings, One County",
      body: [
        "Westchester runs on two calendars. There are the corporate campuses along the I-287 corridor, where catering is a recurring weekday operation with security desks, visitor passes and a delivery window. And there are the private houses and clubs, where a Saturday event is staffed, plated and expected to look considered.",
        "We quote those differently because they are different jobs. Tell us which one you're planning and we'll scope it properly instead of sending you a menu and hoping.",
      ],
    },
    cateringFor: [
      {
        title: "Private homes and estates",
        body: "Long driveways, large gardens and real kitchens to stage from. Staffed service with servers and bartenders where you want it.",
      },
      {
        title: "Corporate campuses",
        body: "Recurring lunches, all-hands and client days along the White Plains and Purchase corridor. Certificate of insurance and visitor logistics handled ahead of the date.",
      },
      {
        title: "Weddings and rehearsal dinners",
        body: "Home and tented weddings across the county, plus rehearsal dinners the night before at a smaller headcount.",
      },
      {
        title: "Country club and club-adjacent events",
        body: "Where the venue has its own rules about outside vendors, we'll work to them — send us the club's requirements and we'll confirm what we can do.",
      },
    ],
    places: [
      "White Plains",
      "Scarsdale",
      "Rye",
      "Bronxville",
      "New Rochelle",
      "Harrison",
      "Purchase",
      "Chappaqua",
      "Larchmont",
      "Mamaroneck",
      "Yonkers",
      "Dobbs Ferry",
    ],
    pizzaNote: {
      heading: "The Pizza Truck in Westchester",
      body: "Estates and campuses both suit the truck — there's room to park and a crowd that eats over a long window rather than all at once. It's a strong choice for a corporate summer outing or a graduation party where nobody wants to be stuck plating.",
    },
    faqs: [
      {
        q: "Do you serve corporate campuses in Westchester?",
        a: "Yes, including recurring weekly lunches. We handle the certificate of insurance and visitor logistics ahead of the date — see [corporate catering](/corporate-catering) for how we work with companies.",
      },
      {
        q: "Can you staff a full-service event at a private home?",
        a: "Yes — servers, bartenders, setup and full breakdown. TIPS-certified bartenders with liquor liability insurance if you want the bar too.",
      },
      {
        q: "Is there a travel fee to Westchester?",
        a: "There may be a small one depending on where you are. It goes in the quote upfront, never as a surprise on the invoice.",
      },
    ],
    siblings: ["bronx", "hudson-valley"],
  },

  {
    slug: "new-jersey",
    name: "New Jersey",
    metaTitle: "New Jersey Catering",
    metaDescription:
      "Catering across northern New Jersey — Bergen, Hudson and Essex counties. Backyard parties, offices and weddings. Call (516) 205-7629.",
    h1: "New Jersey Catering",
    heroSubtitle:
      "Backyard parties, office lunches and weddings across Bergen, Hudson and Essex — with the kind of access that makes a full outdoor setup straightforward.",
    heroImage: "/catering/1.jpg",
    schemaAreaType: "AdministrativeArea",
    schemaAreaName: "New Jersey",
    angle: {
      heading: "We Build the Crossing Into the Timing",
      body: [
        "Everything about catering northern New Jersey is easy except one thing: getting there. The George Washington Bridge and the Lincoln and Holland tunnels do not care about your six o'clock start.",
        "So we plan backwards from the crossing, not from the kitchen. That usually means leaving earlier than strictly necessary and arriving before you expect us, which is the correct failure mode. What we won't do is quote you a delivery time that only works if traffic behaves.",
      ],
    },
    cateringFor: [
      {
        title: "Backyard parties",
        body: "Driveways, decks and real yards across Bergen and Essex. The truck pulls in, the trays come through the side gate, and nothing has to go up a flight of stairs.",
      },
      {
        title: "Jersey City and Hoboken offices",
        body: "Working lunches and team events along the waterfront. Certificate of insurance to building management ahead of the date.",
      },
      {
        title: "Weddings and showers",
        body: "Home weddings, engagement parties and bridal showers where the venue has no kitchen and the caterer brings one.",
      },
      {
        title: "Graduations and communions",
        body: "Spring and early summer fill first here, same as on the island. Book ahead for May and June.",
      },
    ],
    places: [
      "Hoboken",
      "Jersey City",
      "Fort Lee",
      "Englewood",
      "Hackensack",
      "Montclair",
      "Ridgewood",
      "Teaneck",
      "Paramus",
      "Weehawken",
      "Bayonne",
      "Newark",
    ],
    pizzaNote: {
      heading: "The Pizza Truck in New Jersey",
      body: "Suburban New Jersey is close to ideal for the truck — driveway access, room for a queue, and no permit conversation for a private property. The one variable is the crossing, which we build into the arrival time rather than hope around.",
    },
    faqs: [
      {
        q: "How far into New Jersey do you travel?",
        a: "Bergen, Hudson and Essex counties routinely, and further for larger events. Travel beyond NYC may include a small fee, quoted upfront.",
      },
      {
        q: "Will bridge traffic affect my delivery time?",
        a: "We plan around it rather than through it — we leave early and arrive early. If a crossing is genuinely closed we'll call you, not go quiet.",
      },
      {
        q: "Do you cater offices in Jersey City and Hoboken?",
        a: "Yes, including recurring weekly lunches. See [corporate catering](/corporate-catering) for how we work with companies.",
      },
    ],
    siblings: ["staten-island", "manhattan"],
  },

  {
    slug: "hudson-valley",
    name: "the Hudson Valley",
    metaTitle: "Hudson Valley Catering",
    metaDescription:
      "Hudson Valley catering for barn weddings, farm venues and outdoor events. We bring the kitchen with us. Call (516) 205-7629.",
    h1: "Hudson Valley Catering",
    heroSubtitle:
      "Barn weddings, farm venues and outdoor events across the valley — at the kind of venue that has a beautiful view and no kitchen whatsoever.",
    heroImage: "/trucks/nyc-neapolitan-pizza-truck.jpg",
    schemaAreaType: "AdministrativeArea",
    schemaAreaName: "Hudson Valley",
    angle: {
      heading: "Most of These Venues Have No Kitchen",
      body: [
        "That's the whole brief up here. A barn, a field, a converted dairy, a vineyard with a view — venues chosen for how they look, not for what they can cook. Many have no gas, limited power, and a water supply that was not designed for a hundred covers.",
        "We arrive self-sufficient. The pizza truck in particular solves this outright: the oven runs on its own fuel and needs nothing from the venue at all. For tray and staffed service we bring the warming equipment with us and stage from whatever flat surface exists.",
      ],
    },
    cateringFor: [
      {
        title: "Barn and farm weddings",
        body: "The valley's signature booking. No kitchen, an outdoor timeline, and weather that has an opinion. We plan for all three.",
      },
      {
        title: "Vineyard and orchard events",
        body: "Long lunches and receptions where the venue supplies the drink and we supply everything else.",
      },
      {
        title: "Weekend house parties",
        body: "Milestone birthdays and family weekends at a second home, where the local options thin out fast on a Saturday.",
      },
      {
        title: "Outdoor events with a rain plan",
        body: "We'll ask what the wet-weather plan is before we quote. Not having one is fine — not having discussed it is not.",
      },
    ],
    places: [
      "Beacon",
      "Cold Spring",
      "Poughkeepsie",
      "Rhinebeck",
      "New Paltz",
      "Kingston",
      "Hudson",
      "Nyack",
      "Garrison",
      "Millbrook",
    ],
    pizzaNote: {
      heading: "Why the Truck Works Up Here",
      body: "A wood-fired truck is close to the perfect answer for a venue with no kitchen. Fully self-contained, no power or gas needed from the site, continuous service for as long as the event runs, and it doubles as something for guests to gather around between the ceremony and the dancing. See [pizza truck weddings](/pizza-trucks/weddings).",
    },
    faqs: [
      {
        q: "Our venue has no kitchen. Is that a problem?",
        a: "No — it's the normal case up here. We bring what we need, and the pizza truck needs nothing from the venue at all.",
      },
      {
        q: "How far up the valley do you travel?",
        a: "Regularly as far as Rhinebeck and Hudson. Travel beyond NYC may include a fee, and for the far end of the valley we'll be upfront about what that is before you commit.",
      },
      {
        q: "What happens if it rains?",
        a: "We'll ask about your wet-weather plan when you book. The truck serves from outdoors but the crew works under cover, and guests queue under whatever you've arranged.",
      },
    ],
    siblings: ["westchester", "connecticut"],
  },

  {
    slug: "connecticut",
    name: "Connecticut",
    metaTitle: "Connecticut Catering",
    metaDescription:
      "Fairfield County catering — Greenwich, Stamford, Westport. Private events and corporate. Call (516) 205-7629.",
    h1: "Connecticut Catering",
    heroSubtitle:
      "Private events and corporate catering across Fairfield County — Greenwich, Stamford, Westport, Darien and the towns between.",
    heroImage: "/trucks/pizza-truck-catering-nyc.jpg",
    schemaAreaType: "AdministrativeArea",
    schemaAreaName: "Fairfield County",
    angle: {
      heading: "Check the Club's Vendor Rules Before You Book Anyone",
      body: [
        "Fairfield County has a high concentration of clubs, associations and managed communities, and a lot of them have firm rules about outside caterers — approved vendor lists, insurance minimums, staff-to-guest ratios, sometimes an outright exclusive with an in-house kitchen.",
        "It's worth finding out which applies to your venue before you shortlist caterers at all. Send us the requirements and we'll tell you plainly whether we can meet them. We would rather lose the booking early than discover a restriction the week of your event.",
      ],
    },
    cateringFor: [
      {
        title: "Private homes",
        body: "Dinners, milestone birthdays and garden parties across the shoreline towns, staffed to whatever level the evening calls for.",
      },
      {
        title: "Corporate offices in Stamford",
        body: "Recurring lunches, client days and holiday parties in the Stamford business district. See [corporate catering](/corporate-catering).",
      },
      {
        title: "Weddings and rehearsal dinners",
        body: "Home and tented weddings, plus the smaller rehearsal dinner the night before.",
      },
      {
        title: "Club and association events",
        body: "Where the venue permits an outside caterer, we'll work to its vendor requirements. Send them over and we'll confirm.",
      },
    ],
    places: [
      "Greenwich",
      "Stamford",
      "Westport",
      "Darien",
      "New Canaan",
      "Norwalk",
      "Fairfield",
      "Wilton",
      "Ridgefield",
      "Rowayton",
    ],
    pizzaNote: {
      heading: "The Pizza Truck in Fairfield County",
      body: "Private properties here have the space for it and then some. The same club caveat applies — if your venue has vendor rules, check them first. On a private driveway or lawn there's nothing to check, and the truck handles the rest. See the [Connecticut pizza truck](/pizza-trucks/connecticut) page.",
    },
    faqs: [
      {
        q: "How far into Connecticut do you travel?",
        a: "Fairfield County routinely — Greenwich, Stamford, Westport, Darien, New Canaan and the surrounding towns. Travel fees are quoted upfront.",
      },
      {
        q: "Our club has an approved vendor list. Can you work with that?",
        a: "Send us the requirements and we'll tell you honestly whether we can meet them. Some clubs are open, some are exclusive to an in-house kitchen, and it's better to know in week one.",
      },
      {
        q: "Do you carry liquor liability insurance?",
        a: "Yes. Our bartenders are TIPS-certified, we carry liquor liability insurance, and we handle the Caterer's Alcohol Permit.",
      },
    ],
    siblings: ["westchester", "hudson-valley"],
  },
];
