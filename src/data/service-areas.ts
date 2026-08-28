/**
 * Service-area landing pages under /catering/[area].
 *
 * Each area MUST carry material that is only true of that place — the venue
 * types, the access reality, the local milestones. Ten pages built from one
 * template with the name swapped is a doorway-page pattern and Google demotes
 * it. Test before shipping: if you could find-replace the area name and the
 * page still read correctly, it is not finished.
 */

export interface AreaSection {
  title: string;
  body: string;
}

export interface AreaFaq {
  q: string;
  a: string;
}

export interface ServiceArea {
  slug: string;
  /** Short name used in prose, e.g. "Brooklyn" */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  heroImage: string;
  /** schema.org areaServed */
  schemaAreaType: "City" | "AdministrativeArea";
  schemaAreaName: string;
  /** The argument that is true only of this area. */
  angle: { heading: string; body: string[] };
  /** What we cater here — occasions specific to this place. */
  cateringFor: AreaSection[];
  /** Real neighborhoods or towns, for the coverage answer. */
  places: string[];
  /** How the pizza truck plays in this specific area. */
  pizzaNote: { heading: string; body: string };
  faqs: AreaFaq[];
  /** Two sibling slugs, for lateral internal linking. */
  siblings: [string, string];
}

import { nycAreas } from "./areas-nyc";
import { triStateAreas } from "./areas-tristate";

export const serviceAreas: ServiceArea[] = [...nycAreas, ...triStateAreas];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}

/** Grid order for the /catering hub — highest search demand first. */
export const areaLinkOrder = [
  "brooklyn",
  "staten-island",
  "long-island",
  "new-jersey",
  "bronx",
  "queens",
  "westchester",
  "manhattan",
  "hudson-valley",
  "connecticut",
] as const;
