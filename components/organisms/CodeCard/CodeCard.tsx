"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { yearsOfExperience } from "@/lib/content";
import { cx } from "@/lib/cx";
import s from "./CodeCard.module.scss";

const focusWords = ["architecture", "performance", "accessibility", "testing", "design-systems", "DX"];

function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIndex];
      if (deleting) {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        timer = setTimeout(tick, 45);
      } else {
        const next = words[wordIndex];
        charIndex++;
        setText(next.slice(0, charIndex));
        if (charIndex === next.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
        } else {
          timer = setTimeout(tick, 85);
        }
      }
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

/* ---------- Snippets ----------
 * Each line is a list of tokens: [kind, text]. Two special tokens:
 * ["years"] → years of experience, ["focus", quote] → the typewriter string. */
type Kind = "kw" | "str" | "prop" | "comp" | "dim" | "txt";
type Token = [Kind, string] | ["years"] | ["focus", string];
type Line = Token[];

export type Snippet = { id: string; file: string; lang: string; lines: Line[] };

const str = (v: string, q = '"'): Token => ["str", q + v + q];
const list = (items: string[], q = '"'): Token[] =>
  items.flatMap((v, i) => (i ? [["dim", ", "] as Token, str(v, q)] : [str(v, q)]));

const stack = ["Next.js", "React", "TS"];
const shipped = ["fizy", "TV+", "LCW"];
const tools = ["Claude Code", "Codex"];

export const snippets: Snippet[] = [
  {
    id: "tsx",
    file: "sade.tsx",
    lang: "TSX",
    lines: [
      [["kw", "export const "], ["comp", "Sade"], ["dim", " = () "], ["kw", "=>"], ["dim", " ("]],
      [["dim", "  <"], ["comp", "Developer"]],
      [["prop", "    role"], ["dim", "="], str("Frontend")],
      [["prop", "    based"], ["dim", "="], str("Istanbul, TR")],
      [["prop", "    stack"], ["dim", "={["], ...list(stack), ["dim", "]}"]],
      [["prop", "    shipped"], ["dim", "={["], ...list(shipped), ["dim", "]}"]],
      [["prop", "    tools"], ["dim", "={["], ...list(tools), ["dim", "]}"]],
      [["prop", "    experience"], ["dim", "={"], ["years"], ["dim", "} // years"]],
      [["prop", "    focus"], ["dim", "="], ["focus", '"']],
      [["dim", "  />"]],
      [["dim", ");"]],
    ],
  },
  {
    id: "js",
    file: "sade.js",
    lang: "JavaScript",
    lines: [
      [["kw", "const "], ["comp", "sade"], ["dim", " = {"]],
      [["prop", "  role"], ["dim", ": "], str("Frontend"), ["dim", ","]],
      [["prop", "  based"], ["dim", ": "], str("Istanbul, TR"), ["dim", ","]],
      [["prop", "  stack"], ["dim", ": ["], ...list(stack), ["dim", "],"]],
      [["prop", "  shipped"], ["dim", ": ["], ...list(shipped), ["dim", "],"]],
      [["prop", "  tools"], ["dim", ": ["], ...list(tools), ["dim", "],"]],
      [["prop", "  experience"], ["dim", ": "], ["years"], ["dim", ", // years"]],
      [["prop", "  focus"], ["dim", ": "], ["focus", '"'], ["dim", ","]],
      [["dim", "};"]],
      [],
      [["kw", "export default "], ["comp", "sade"], ["dim", ";"]],
    ],
  },
  {
    id: "vue",
    file: "Sade.vue",
    lang: "Vue",
    lines: [
      [["dim", "<"], ["kw", "template"], ["dim", ">"]],
      [["dim", "  <"], ["comp", "Developer"]],
      [["prop", "    role"], ["dim", "="], str("Frontend")],
      [["prop", "    based"], ["dim", "="], str("Istanbul, TR")],
      [["prop", "    :stack"], ["dim", '="['], ...list(stack, "'"), ["dim", ']"']],
      [["prop", "    :shipped"], ["dim", '="['], ...list(shipped, "'"), ["dim", ']"']],
      [["prop", "    :tools"], ["dim", '="['], ...list(tools, "'"), ["dim", ']"']],
      [["prop", "    :experience"], ["dim", '="'], ["years"], ["dim", '"']],
      [["prop", "    focus"], ["dim", "="], ["focus", '"']],
      [["dim", "  />"]],
      [["dim", "</"], ["kw", "template"], ["dim", ">"]],
    ],
  },
  {
    id: "angular",
    file: "sade.ts",
    lang: "Angular",
    lines: [
      [["kw", "@Component"], ["dim", "({ "], ["prop", "selector"], ["dim", ": "], str("app-sade", "'"), ["dim", " })"]],
      [["kw", "export class "], ["comp", "Sade"], ["dim", " {"]],
      [["prop", "  role"], ["dim", " = "], str("Frontend", "'"), ["dim", ";"]],
      [["prop", "  based"], ["dim", " = "], str("Istanbul, TR", "'"), ["dim", ";"]],
      [["prop", "  stack"], ["dim", " = ["], ...list(stack, "'"), ["dim", "];"]],
      [["prop", "  shipped"], ["dim", " = ["], ...list(shipped, "'"), ["dim", "];"]],
      [["prop", "  tools"], ["dim", " = ["], ...list(tools, "'"), ["dim", "];"]],
      [["prop", "  experience"], ["dim", " = "], ["years"], ["dim", "; // years"]],
      [["prop", "  focus"], ["dim", " = "], ["focus", "'"], ["dim", ";"]],
      [["dim", "}"]],
    ],
  },
];

export function CodeCard() {
  const focus = useTypewriter(focusWords);
  const years = yearsOfExperience;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const snippet = snippets[active];

  const select = (i: number, focusTab = false) => {
    const next = (i + snippets.length) % snippets.length;
    if (next !== active) track("code_tab", { label: snippets[next].id });
    setActive(next);
    const tab = tabRefs.current[next];
    if (!tab) return;
    if (focusTab) tab.focus({ preventScroll: true });
    // Keep the selected tab visible when the tab row scrolls sideways (narrow screens).
    const row = tab.parentElement!;
    const left = tab.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + tab.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: left - 16, behavior: "smooth" });
    }
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") select(active + 1, true);
    else if (e.key === "ArrowLeft") select(active - 1, true);
    else if (e.key === "Home") select(0, true);
    else if (e.key === "End") select(snippets.length - 1, true);
    else return;
    e.preventDefault();
  };

  const render = (t: Token, i: number) => {
    if (t[0] === "years") return <span key={i} className={s.kw}>{years}</span>;
    if (t[0] === "focus")
      return (
        <span key={i} className={s.str}>
          {t[1]}
          {focus}
          <span className={s.caret} />
          {t[1]}
        </span>
      );
    const [kind, text] = t;
    return kind === "txt" ? text : <span key={i} className={s[kind]}>{text}</span>;
  };

  return (
    <div className={s.card}>
      <div className={s.bar}>
        <span className={s.dots} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <div className={s.tabs} role="tablist" aria-label="Code examples" onKeyDown={onKeyDown}>
          {snippets.map((sn, i) => (
            <button
              key={sn.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${sn.id}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={cx(s.tab, i === active && s.active)}
              onClick={() => select(i)}
            >
              {sn.file}
            </button>
          ))}
        </div>
      </div>
      <pre
        className={s.code}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${snippet.id}`}
      >
        <code>
          {snippet.lines.map((line, i) => (
            <span key={`${snippet.id}-${i}`} className={s.line}>
              {line.map(render)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
      <div className={s.status} aria-hidden>
        <span>{snippet.lang}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
