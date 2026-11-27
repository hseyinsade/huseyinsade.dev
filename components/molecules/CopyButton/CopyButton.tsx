"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import s from "./CopyButton.module.scss";

type Props = {
  value: string;
  label: string;
  copiedLabel: string;
  /** Optional `data-track` event name for analytics. */
  track?: string;
};

/** Copies `value` to the clipboard and confirms for a moment. */
export function CopyButton({ value, label, copiedLabel, track }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the mailto link still works.
    }
  };

  return (
    <button type="button" onClick={copy} className={s.button} data-track={track} aria-live="polite">
      <Icon name={copied ? "check" : "copy"} />
      {copied ? copiedLabel : label}
    </button>
  );
}
