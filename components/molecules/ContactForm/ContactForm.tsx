"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/atoms/Icon";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import s from "./ContactForm.module.scss";

type Labels = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  error: string;
};

export type ContactFormMessage = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

type Props = {
  labels: Labels;
  /** Delivers the message. Resolve `true` on success; `false` or a throw shows the error. */
  onSend: (msg: ContactFormMessage) => Promise<boolean>;
};

/** Contact form with sending / sent / error states. How it's delivered is up to `onSend`. */
export function ContactForm({ labels, onSend }: Props) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot: only bots fill it
    const field = (k: keyof ContactFormMessage) => String(data.get(k) ?? "").trim();
    const msg = { name: field("name"), email: field("email"), message: field("message") };

    setStatus("sending");
    try {
      const ok = await onSend(msg);
      setStatus(ok ? "sent" : "error");
      track(ok ? "contact_form_submit" : "contact_form_error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
      track("contact_form_error");
    }
  };

  const sending = status === "sending";

  return (
    <form className={s.form} onSubmit={submit} aria-busy={sending}>
      <div className={s.row}>
        <label className={s.field}>
          <span>{labels.name}</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label className={s.field}>
          <span>{labels.email}</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className={s.field}>
        <span>{labels.message}</span>
        <textarea name="message" rows={5} required maxLength={4000} aria-describedby={`${id}-status`} />
      </label>
      <input type="checkbox" name="botcheck" className={s.honeypot} tabIndex={-1} autoComplete="off" aria-hidden />
      <div className={s.footer}>
        <button type="submit" className={s.submit} disabled={sending}>
          {sending ? labels.sending : labels.send}
          <Icon name="arrow-up-right" />
        </button>
        <p id={`${id}-status`} role="status" className={cx(s.status, status === "sent" && s.sent, status === "error" && s.error)}>
          {status === "sent" ? labels.sent : status === "error" ? labels.error : ""}
        </p>
      </div>
    </form>
  );
}
