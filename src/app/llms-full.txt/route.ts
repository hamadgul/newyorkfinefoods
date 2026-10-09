import { readFileSync } from "fs";
import path from "path";
import { getAllPosts } from "@/lib/blog";
import { serviceAreas, areaLinkOrder, getServiceArea } from "@/data/service-areas";
import { pizzaTruckPages } from "@/data/pizza-truck-pages";
import { BASE_URL } from "@/lib/schema";

/**
 * /llms-full.txt — the full text of the area, pizza-truck and guide pages,
 * generated at build time from the same data the pages render, so it can't
 * drift from the site. /llms.txt (public/) is the curated index.
 */
export const dynamic = "force-static";

/** Page copy carries inline `[label](/path)` links — make them absolute. */
const absolutize = (text: string) => text.replaceAll("](/", `](${BASE_URL}/`);

function faqBlock(faqs: { q: string; a: string }[]) {
  return faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");
}

export function GET() {
  const index = readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf-8").trim();
  const sections: string[] = [index];

  sections.push("# Pizza truck pages");
  for (const page of pizzaTruckPages) {
    sections.push(
      [
        `## ${page.h1}`,
        `URL: ${BASE_URL}/pizza-trucks/${page.slug}`,
        page.heroSubtitle,
        `### ${page.hook.heading}`,
        ...page.hook.body,
        `### ${page.blocksHeading}`,
        ...page.blocks.map((b) => `- **${b.title}:** ${b.body}`),
        `### ${page.logistics.heading}`,
        ...page.logistics.body,
        "### Questions",
        faqBlock(page.faqs),
      ].join("\n\n"),
    );
  }

  sections.push("# Catering by area");
  const areas = areaLinkOrder
    .map((slug) => getServiceArea(slug))
    .filter((a): a is (typeof serviceAreas)[number] => Boolean(a));
  for (const area of areas) {
    sections.push(
      [
        `## ${area.h1}`,
        `URL: ${BASE_URL}/catering/${area.slug}`,
        area.heroSubtitle,
        `### ${area.angle.heading}`,
        ...area.angle.body,
        "### What we cater here",
        ...area.cateringFor.map((c) => `- **${c.title}:** ${c.body}`),
        `Areas covered: ${area.places.join(", ")}.`,
        `### ${area.pizzaNote.heading}`,
        area.pizzaNote.body,
        "### Questions",
        faqBlock(area.faqs),
      ].join("\n\n"),
    );
  }

  sections.push("# Guides");
  for (const post of getAllPosts()) {
    sections.push(
      [
        `## ${post.title}`,
        `URL: ${BASE_URL}/blog/${post.slug}`,
        `Published: ${post.date}${post.updated ? ` · Updated: ${post.updated}` : ""}`,
        post.content.trim(),
      ].join("\n\n"),
    );
  }

  return new Response(absolutize(sections.join("\n\n---\n\n")) + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
