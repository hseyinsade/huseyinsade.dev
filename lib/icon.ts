/**
 * Site icon: a "</>" code mark drawn with strokes (no text, so it never depends on fonts).
 * Used for the SVG favicon, the PNG fallback and the iOS home-screen icon.
 */
export const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0c0c0b"/><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.5"><path d="M21 20 9 32l12 12M43 20l12 12-12 12" stroke="#d2ff45"/><path d="M36.5 15 27.5 49" stroke="#edece6"/></g></svg>`;

export const iconDataUri = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;
