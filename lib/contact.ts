import type { Lang } from "./content";
import { saveMessage } from "./supabase";

export type ContactMessage = { name: string; email: string; message: string };

/** FormSubmit's JSON endpoint: forwards the form to `to` by email, no backend or key. */
export const formEndpoint = (to: string) => `https://formsubmit.co/ajax/${to}`;

/** Emails the message through FormSubmit. Resolves to `true` on success. */
export async function emailMessage(to: string, subject: string, msg: ContactMessage) {
  const res = await fetch(formEndpoint(to), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...msg, _subject: `${subject} — ${msg.name}`, _replyto: msg.email, _template: "table" }),
  });
  const data = (await res.json().catch(() => null)) as { success?: boolean | string } | null;
  return res.ok && String(data?.success) === "true";
}

/**
 * Sends a contact message two ways at once: saved in Supabase (so it's never
 * lost) and emailed through FormSubmit (so I'm notified). Counts as sent if
 * either one works.
 */
export async function sendContact(msg: ContactMessage, { to, subject, lang }: { to: string; subject: string; lang: Lang }) {
  const results = await Promise.allSettled([saveMessage({ ...msg, lang }), emailMessage(to, subject, msg)]);
  return results.some((r) => r.status === "fulfilled" && r.value);
}
