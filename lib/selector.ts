/**
 * CSS-module classes are hashed — e.g. "i8YaKq_title" (Turbopack build),
 * "hero-module-scss-module__YiQCz__title" (dev), "hero_title__YiQCz" (webpack). Returns just "title".
 */
export function readableClass(c: string) {
  if (c.includes("-module__")) return c.split("__").pop()!;
  return c.match(/^[a-z-]+_(.+)__[\w-]+$/i)?.[1] ?? c.match(/^[\w-]{5,8}_(.+)$/)?.[1] ?? c;
}

/** DevTools-style label: tag#id.class1.class2 */
export function describeElement(el: Element) {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls = typeof el.className === "string" ? el.className.split(/\s+/).filter(Boolean).map(readableClass) : [];
  return `${tag}${id}${cls.length ? "." + cls.slice(0, 2).join(".") : ""}`;
}
