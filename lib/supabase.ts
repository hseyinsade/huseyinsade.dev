/**
 * Tiny Supabase REST client — just the two calls the site needs, without
 * pulling in supabase-js. Both run in the browser with the publishable key;
 * Row Level Security (see `supabase/schema.sql`) decides what it may do.
 */
import type { Lang } from "./content";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://jthhxdxpglhxuxfklypv.supabase.co";
// Publishable keys are meant to be public; RLS protects the data.
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_gOzAgNaXsDbt3xb43IX7kw_ykngNVRh";

const rest = (path: string, init: RequestInit = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json", ...init.headers },
  });

export type NewMessage = { name: string; email: string; message: string; lang: Lang };

/** Stores a contact message. Resolves to `true` when Supabase accepted it. */
export async function saveMessage(msg: NewMessage) {
  const res = await rest("messages", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(msg) });
  return res.ok;
}

/** Whether I'm open to new projects, or `null` when it can't be read. */
export async function fetchAvailability(): Promise<boolean | null> {
  try {
    const res = await rest("site_status?id=eq.1&select=available");
    if (!res.ok) return null;
    const rows = (await res.json()) as { available?: unknown }[];
    return typeof rows[0]?.available === "boolean" ? rows[0].available : null;
  } catch {
    return null;
  }
}
