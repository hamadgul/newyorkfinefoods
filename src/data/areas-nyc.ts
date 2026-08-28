import type { ServiceArea } from "./service-areas";

/** The five boroughs. */
export const nycAreas: ServiceArea[] = [
  {
    slug: "brooklyn",
    name: "Brooklyn",
    metaTitle: "Brooklyn Catering",
    metaDescription:
      "Catering in Brooklyn for brownstones, backyards, lofts and rooftops. We handle the stairs, the parking and the cleanup. Call (516) 205-7629.",
    h1: "Brooklyn Catering",
    heroSubtitle:
      "Hot trays, party heros and full-service events across every Brooklyn neighborhood — from a third-floor walk-up in Bushwick to a rooftop in Williamsburg.",
    heroImage: "/catering/1.jpg",
    schemaAreaType: "City",
    schemaAreaName: "Brooklyn",
    angle: {
      heading: "Catering That Can Handle Your Brooklyn Walk-Up",
      body: [
        "Brooklyn is not a catering problem, it's a logistics problem. Four flights with no elevator. A one-way street where the truck can't idle. Alternate-side parking that turns a twenty-minute drop-off into a ticket.",
        "We plan for it before we quote it. When you tell us the address, we ask which floor, whether there's an elevator, and where the truck can actually sit. Then we staff for it. Nobody's asking your guests to help carry trays up the stoop.",
      ],
    },
    cateringFor: [
      {
        title: "Garden and backyard parties",
        body: "Brooklyn backyards are small and worth using. We set up compact, keep the service line tight, and take everything with us when we go.",
      },
      {
        title: "Brownstone dinners and milestones",
        body: "Birthdays, engagements, christenings, graduations, and the family gatherings that fill a parlor floor. Half and full trays so you're not guessing at quantities.",
      },
      {
        title: "Loft and industrial venues",
        body: "DUMBO, Gowanus, Industry City, Greenpoint. Most of these spaces have no kitchen at all — we bring everything, including the warming setup.",
      },
      {
        title: "Rooftops",
        body: "Williamsburg, Bushwick, Downtown Brooklyn. Roof access is usually the constraint, not the food. Tell us how we get up there and we'll work it out.",
      },
    ],
    places: [
      "Williamsburg",
      "Park Slope",
      "Bushwick",
      "Bed-Stuy",
      "Greenpoint",
      "DUMBO",
      "Bay Ridge",
      "Sunset Park",
      "Crown Heights",
      "Carroll Gardens",
      "Prospect Heights",
      "Sheepshead Bay",
    ],
    pizzaNote: {
      heading: "Or Bring the Pizza Truck",
      body: "Brooklyn block parties and backyard weddings are the pizza truck's best room. Wood-fired Neapolitan pies at 900°F, ninety seconds each, served from a curbside spot or a driveway. It works for [parties](/pizza-trucks/parties) and [weddings](/pizza-trucks/weddings) alike. Parking is the only real question in Brooklyn, and we'll answer it honestly before you book — some blocks work, some don't.",
    },
    faqs: [
      {
        q: "What if my building has no elevator?",
        a: "Tell us when you book and we staff for it. Walk-ups are normal here. What we can't do is find out about a fourth-floor walk-up when the truck is already double-parked.",
      },
      {
        q: "Can you cater a backyard wedding in Brooklyn?",
        a: "Yes, and the pizza truck is a strong option for one — it handles cocktail hour or late night without needing a kitchen on site.",
      },
      {
        q: "Where will the truck park on my block?",
        a: "That depends on the block. Send us the cross streets when you enquire and we'll tell you honestly whether curbside works or whether we should plan a carry-in instead.",
      },
    ],
    siblings: ["queens", "staten-island"],
  },

  {
    slug: "staten-island",
    name: "Staten Island",
    metaTitle: "Staten Island Catering",
    metaDescription:
      "Staten Island catering for communions, graduations and backyard parties. Hot trays, party heros, and pizza truck service. Call (516) 205-7629.",
    h1: "Staten Island Catering",
    heroSubtitle:
      "Communions, graduations, christenings, and the backyard parties that run until the neighbors join. Plus a wood-fired pizza truck that fits right in your driveway.",
    heroImage: "/catering/2.jpg",
    schemaAreaType: "City",
    schemaAreaName: "Staten Island",
    angle: {
      heading: "The Borough That Actually Has a Driveway",
      body: [
        "Everything that makes catering hard in Manhattan is easy here. Real backyards. Room to park. A driveway the pizza truck can pull straight into without a permit conversation.",
        "That means Staten Island gets the full setup without the workarounds — the truck fires pies where your guests are standing, and the trays come in through a back door instead of up four flights.",
      ],
    },
    cateringFor: [
      {
        title: "Communions and confirmations",
        body: "Spring books up first. These are the events Staten Island does better than anywhere else in the city, and the food is expected to be serious.",
      },
      {
        title: "Graduation parties",
        body: "May and June, backyard, sixty people, everyone eating at once. Trays are the right answer.",
      },
      {
        title: "Christenings and family parties",
        body: "Half and full pans, party heros by the foot, side salads by the pound. Built for a table that stays loaded all afternoon.",
      },
      {
        title: "Block parties and fundraisers",
        body: "We scale to 5,000 guests, and there's usually somewhere sensible to put the truck.",
      },
    ],
    places: [
      "Great Kills",
      "Tottenville",
      "St. George",
      "New Dorp",
      "Todt Hill",
      "Annadale",
      "West Brighton",
      "Eltingville",
      "Huguenot",
      "Grasmere",
    ],
    pizzaNote: {
      heading: "Pizza Truck in the Driveway",
      body: "Pull-in access, no curbside permit conversation, no idling on a one-way. The oven runs on its own fuel, so we need nothing from the house. 900°F, ninety seconds a pie, fourteen-inch and ten-inch personal. See [pizza truck for parties](/pizza-trucks/parties) — catering starts at $1,500.",
    },
    faqs: [
      {
        q: "Do you do communions and confirmations?",
        a: "Yes, and they're our busiest spring bookings. Book four to eight weeks out for April through June dates.",
      },
      {
        q: "Can the pizza truck fit in my driveway?",
        a: "Almost always. It needs about a standard parking space and clearance for the crew to work. Send us a photo if you're unsure.",
      },
      {
        q: "What's the average catering cost for 100 people?",
        a: "It depends on drop-off versus staffed service and on the menu. Tray pricing is on the catering menu — call (516) 205-7629 with your numbers and we'll quote it properly rather than give you a range that means nothing.",
      },
    ],
    siblings: ["brooklyn", "new-jersey"],
  },

  {
    slug: "queens",
    name: "Queens",
    metaTitle: "Queens Catering",
    metaDescription:
      "Catering across Queens — Astoria, Jackson Heights, Forest Hills, Long Island City. Backyard parties to office lunches. Call (516) 205-7629.",
    h1: "Queens Catering",
    heroSubtitle:
      "Backyard parties in Astoria, family gatherings in Forest Hills, office lunches in Long Island City. One kitchen, a lot of different tables.",
    heroImage: "/gallery/1.jpg",
    schemaAreaType: "City",
    schemaAreaName: "Queens",
    angle: {
      heading: "Cooking for the Most Demanding Food Borough in America",
      body: [
        "Queens is the most linguistically diverse place on earth, and the food expectations follow. A guest list here routinely spans four cuisines' worth of standards, and half the room has a better version of something at home.",
        "So we ask more questions before we quote. Who's coming, what do they actually eat, and what's the dish that has to be right. Vegetarian, vegan, gluten-free, halal and kosher-style requests are normal for us, not an accommodation — and we label the trays so nobody has to ask what's in what.",
      ],
    },
    cateringFor: [
      {
        title: "Backyard and driveway parties",
        body: "Much of Queens still has the space for it — Bayside, Whitestone, Middle Village, Forest Hills. We set up outside and keep the food coming.",
      },
      {
        title: "Large family gatherings",
        body: "Engagements, graduations, birthdays and religious milestones for a headcount that keeps growing after you send the invite. Trays scale better than plated service here.",
      },
      {
        title: "Long Island City offices",
        body: "Working lunches and team dinners across the LIC towers and the Astoria studios. See [corporate catering](/corporate-catering).",
      },
      {
        title: "Apartment and co-op parties",
        body: "Elevator buildings across Rego Park, Sunnyside and Jackson Heights. Tell us the building rules and we'll work inside them.",
      },
    ],
    places: [
      "Astoria",
      "Long Island City",
      "Jackson Heights",
      "Forest Hills",
      "Flushing",
      "Bayside",
      "Sunnyside",
      "Ridgewood",
      "Whitestone",
      "Rego Park",
      "Middle Village",
      "Woodside",
    ],
    pizzaNote: {
      heading: "The Pizza Truck in Queens",
      body: "Driveways in Bayside and Whitestone, park permits in Astoria, a lot on a commercial block in LIC — the truck works in most of Queens, and the constraint is almost always where it parks rather than whether it fits. Tell us the address and we'll sort it out.",
    },
    faqs: [
      {
        q: "Do you handle halal, kosher-style, vegan and gluten-free together?",
        a: "Yes, and in Queens that's a normal booking rather than a special one. Give us the counts when you book and we label every tray.",
      },
      {
        q: "Do you cater in Long Island City offices?",
        a: "Yes. Recurring team lunches and client dinners across LIC and Astoria. We'll send a certificate of insurance to building management ahead of the date.",
      },
      {
        q: "How much notice do you need?",
        a: "A few days for drop-off trays. Four to eight weeks for staffed events and anything in graduation season.",
      },
    ],
    siblings: ["brooklyn", "long-island"],
  },

  {
    slug: "bronx",
    name: "The Bronx",
    metaTitle: "Bronx Catering",
    metaDescription:
      "Bronx catering for family parties, block parties and offices. Real Italian cooking, delivered hot. Call (516) 205-7629.",
    h1: "Bronx Catering",
    heroSubtitle:
      "Family parties, block parties and office lunches across the Bronx — cooked to a standard that holds up in the borough that already knows what good Italian food tastes like.",
    heroImage: "/trucks/margherita.jpg",
    schemaAreaType: "City",
    schemaAreaName: "The Bronx",
    angle: {
      heading: "You Live Ten Minutes From Arthur Avenue",
      body: [
        "That's a hard room to cater. The Bronx has the best Italian food market in New York and a population that shops there, which means nobody here is impressed by a tray of baked ziti on principle.",
        "We take that as the standard rather than a problem. Hand-stretched dough, real mozzarella, sauce that tastes like tomatoes. If it wouldn't hold up against what your aunt makes, we don't put it on the truck.",
      ],
    },
    cateringFor: [
      {
        title: "Big family parties",
        body: "Communions, graduations, anniversaries and birthdays for a guest list that runs long. Half and full trays, party heros by the foot.",
      },
      {
        title: "Block parties and street fairs",
        body: "We scale to 5,000 guests. Public street events usually need a city permit, and we'll tell you what's involved for your block.",
      },
      {
        title: "Riverdale and Country Club houses",
        body: "The parts of the borough with driveways and gardens, where a full outdoor setup works without any workarounds.",
      },
      {
        title: "Offices and institutions",
        body: "Fordham, the Hub, the medical centres and the Yankee Stadium corridor. Working lunches, staff appreciation days and holiday parties.",
      },
    ],
    places: [
      "Riverdale",
      "Throggs Neck",
      "City Island",
      "Pelham Bay",
      "Country Club",
      "Morris Park",
      "Belmont",
      "Fordham",
      "Kingsbridge",
      "Castle Hill",
    ],
    pizzaNote: {
      heading: "The Pizza Truck in the Bronx",
      body: "Block parties are where the truck earns its keep here — continuous service, no kitchen needed, and a line that becomes part of the party. Driveway setups work easily in Riverdale, Throggs Neck and City Island.",
    },
    faqs: [
      {
        q: "Can you cater a block party in the Bronx?",
        a: "Yes. We've scaled to 5,000 guests. Street closures need a permit from the city — tell us the block and the date and we'll walk you through what's needed.",
      },
      {
        q: "Do you deliver to City Island?",
        a: "Yes, and to Riverdale, Throggs Neck, Pelham Bay and the rest of the borough.",
      },
      {
        q: "What's on the menu?",
        a: "Hot trays by the half or full pan, tossed salads, side salads by the pound, and party heros by the foot. The full catering menu has everything.",
      },
    ],
    siblings: ["manhattan", "westchester"],
  },

  {
    slug: "manhattan",
    name: "Manhattan",
    metaTitle: "Manhattan Catering",
    metaDescription:
      "Manhattan catering with COI on file, freight-elevator delivery and on-time drop-off. Offices, lofts and rooftop terraces. Call (516) 205-7629.",
    h1: "Manhattan Catering",
    heroSubtitle:
      "Offices, lofts and rooftop terraces below 125th Street. Certificate of insurance filed before we arrive, and a delivery window we actually hit.",
    heroImage: "/catering-service.jpg",
    schemaAreaType: "City",
    schemaAreaName: "Manhattan",
    angle: {
      heading: "The Building Is the Hard Part, Not the Food",
      body: [
        "In Manhattan the catering rarely fails on the cooking. It fails because the vendor didn't have a certificate of insurance on file, or missed the freight elevator window, or turned up at a loading dock that closes at four.",
        "We treat that paperwork as part of the job. Send us the building management contact when you book and the COI goes to them directly, naming the building as additional insured. We confirm the freight window in writing, and we arrive inside it.",
      ],
    },
    cateringFor: [
      {
        title: "Office lunches and client meetings",
        body: "Midtown, Flatiron, FiDi, Hudson Yards. Set delivery window, rotating menu if it's recurring. See [corporate catering](/corporate-catering).",
      },
      {
        title: "Loft and gallery events",
        body: "Product launches, private views and receptions in spaces with no kitchen. We bring the warming setup and the staff.",
      },
      {
        title: "Rooftop terraces and penthouses",
        body: "Access is the constraint. Tell us the service elevator situation and how much of the route is stairs, and we'll staff to match.",
      },
      {
        title: "Apartment and co-op parties",
        body: "Doorman buildings with strict vendor rules. We've done the paperwork enough times to make it uneventful.",
      },
    ],
    places: [
      "Midtown",
      "Flatiron",
      "Chelsea",
      "SoHo",
      "Tribeca",
      "Financial District",
      "Upper East Side",
      "Upper West Side",
      "Hudson Yards",
      "Greenwich Village",
      "Murray Hill",
      "Harlem",
    ],
    pizzaNote: {
      heading: "Can the Pizza Truck Come to Manhattan?",
      body: "Sometimes, and we'll be straight with you about when. The truck needs a legal, level spot roughly the size of a parking space — which rules out a lot of Manhattan streets and rules in loading zones, private lots, plazas, and building forecourts. If the truck won't work at your address, drop-off or staffed catering will, and we'll say so rather than take the booking and improvise.",
    },
    faqs: [
      {
        q: "Do you provide a certificate of insurance?",
        a: "Yes. Most Manhattan buildings require one from any vendor, and we send it to building management ahead of the date. Give us the management contact when you book.",
      },
      {
        q: "Can you work within a freight elevator window?",
        a: "Yes, and we confirm it in writing beforehand. Tell us the window when you book rather than on the day.",
      },
      {
        q: "Can you deliver to an office without a loading dock?",
        a: "Yes. We'll plan the carry-in and staff for it. It just changes how many people we send, which is why we ask.",
      },
    ],
    siblings: ["brooklyn", "bronx"],
  },
];
