/**
 * Shared JSON-LD building blocks. The business is ONE entity (#organization)
 * so every Service.provider, Article.publisher and WebSite.publisher resolves
 * to the same node that carries the LocalBusiness data.
 */

export const BASE_URL = "https://www.newyorkfinefoods.com";
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

/** Reference to the business entity — use as provider / publisher / author. */
export const ORG_REF = { "@id": ORG_ID } as const;

/**
 * Full service region, in schema.org form. Single source of truth — the five
 * boroughs plus every tri-state area that has a /catering/[area] page.
 */
export const REGION_AREA_SERVED = [
  { "@type": "City", name: "Manhattan" },
  { "@type": "City", name: "Brooklyn" },
  { "@type": "City", name: "Queens" },
  { "@type": "City", name: "The Bronx" },
  { "@type": "City", name: "Staten Island" },
  { "@type": "AdministrativeArea", name: "Long Island" },
  { "@type": "AdministrativeArea", name: "Westchester County" },
  { "@type": "AdministrativeArea", name: "Hudson Valley" },
  { "@type": "State", name: "New Jersey" },
  { "@type": "State", name: "Connecticut" },
] as const;

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.path}`,
      })),
    ],
  };
}
