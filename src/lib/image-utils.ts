const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/** Dark charcoal shimmer — use on images with dark overlays (heroes, galleries) */
export const darkBlur = `data:image/svg+xml;base64,${toBase64(
  `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="#1A1A1A"/></svg>`
)}`;

/** Cream shimmer — use on light-background sections */
export const creamBlur = `data:image/svg+xml;base64,${toBase64(
  `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="#FAF7F0"/></svg>`
)}`;
