import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders inline `[label](/href)` links inside plain body copy.
 *
 * The service-area and pizza-truck page data are plain strings, which meant
 * cross-references like "See corporate catering" shipped as prose rather than
 * links — /corporate-catering was named on six pages and received no
 * keyword-anchored internal link from any of them. This lets the data carry
 * real links without turning every field into JSX.
 *
 * Internal paths only (must start with "/"); anything else is left as text.
 */
const LINK_PATTERN = /\[([^\]]+)\]\((\/[a-zA-Z0-9/\-]*)\)/g;

export function RichText({ children }: { children: string }) {
  const nodes: ReactNode[] = [];
  const re = new RegExp(LINK_PATTERN);
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(children)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(children.slice(lastIndex, match.index));
    }
    nodes.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        className="font-medium text-gold underline underline-offset-2 transition-colors hover:text-gold-light"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < children.length) {
    nodes.push(children.slice(lastIndex));
  }

  return <>{nodes}</>;
}
