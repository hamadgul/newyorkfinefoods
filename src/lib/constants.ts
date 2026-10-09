export const SITE_NAME = "New York Fine Foods";
export const SITE_TAGLINE = "Elevating Every Event with Exceptional Cuisine";
export const SITE_DESCRIPTION =
  "NYC's premier catering, pizza truck, and mobile bar company. From intimate gatherings to grand celebrations, we bring fine dining and exceptional bar service to every occasion.";

export const CONTACT_EMAIL = "info@newyorkfinefoods.com";
export const CONTACT_PHONE = "(516) 205-7629";
/** E.164-style form for structured data. */
export const CONTACT_PHONE_INTL = "+1-516-205-7629";
// export const CONTACT_ADDRESS = "245 West 29th Street, New York, NY 10001";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pizza Trucks", href: "/pizza-trucks" },
  { label: "Catering", href: "/catering" },
  { label: "Corporate", href: "/corporate-catering" },
  { label: "Mobile Bar", href: "/mobile-bar" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const INSTAGRAM_HANDLE = "@newyorkfinefoods";
export const INSTAGRAM_URL = "https://www.instagram.com/newyorkfinefoods";

/**
 * Third-party profiles of THIS business, for schema.org sameAs. Only add
 * profiles that exist and are claimed — add Google Business Profile, Yelp,
 * The Knot etc. here as each one goes live.
 */
export const SAME_AS_PROFILES = [
  INSTAGRAM_URL,
  "https://www.zola.com/wedding-vendors/wedding-catering/new-york-fine-foods",
  "https://www.bestfoodtrucks.com/truck/new-york-fine-foods",
] as const;

// Formspree endpoint — override via NEXT_PUBLIC_FORMSPREE_ENDPOINT env var
export const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/mnjbdepb';

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/newyorkfinefoods",
  facebook: "https://facebook.com/newyorkfinefoods",
  twitter: "https://twitter.com/nyfinefoods",
} as const;
